<template>    
  <div id="tree-container">
    <canvas
      ref="canvas"
      resize="true"
    />
    <div id="tree-tools">
      <button
        v-if="!editMode"
        @click="enableEdit()"
      >
        Edit
      </button>
      <button
        v-if="editMode"
        @click="save()"
      >
        Save
      </button>
      <button
        v-if="editMode"
        @click="discard()"
      >
        Discard
      </button>
    </div>   
    <tooltip
      id="lessonSummary"
      :visible="displayLesson"
      timeout="750"
      :offset="{x: 50, y: -50}"
    >
      <div v-if="displayLesson">
        <div id="displaylessonTitle">
          {{ displayLesson.title }}
        </div>
        <b>Dział:</b> {{ displayLesson.field }}<br>
        <b>Poziom:</b> {{ displayLesson.level }}<br>
        <b>Wymagane:</b>
        <div
          v-for="(item, i) in displayLesson.requires"
          :key="i"
        >
          {{ item }}<br>
        </div>
      </div>
    </tooltip>
  </div>
</template>

<script>
import graphLessons from "../../assets/current_lesson_graph.json"
import graphCoordinates from "../../assets/current_graph_coordinates.json"
import paper from "paper"
import Tooltip from "../utils/Tooltip"

export default {
  name: "InteractiveTree",
  methods: {
    download(data, filename, type) {
      var file = new Blob([data], {type: type});
      if (window.navigator.msSaveOrOpenBlob) // IE10+
          window.navigator.msSaveOrOpenBlob(file, filename);
      else { // Others
          var a = document.createElement("a"),
                  url = URL.createObjectURL(file);
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          setTimeout(function() {
              document.body.removeChild(a);
              window.URL.revokeObjectURL(url);  
          }, 0); 
      }
    },  
    enableEdit() {
      this.editMode = true;
    },
    save(){
      this.editMode = false;
      var t = [];
      for (let name in this.lessons) {
        t.push([name, this.positions[name].x, this.positions[name].y]);
      }
      this.download(JSON.stringify(t), 'current_graph_coordinates.json', 'application/json')
    },
    discard(){
      this.editMode = false;
      this.centerGraph();
      this.displayLessons();
    },
    addEventHandlers() {
      var hitOptions = { segments: false, stroke: false, fill: true, tolerance: 5 };
      const component = this;
      const canvas = this.$refs.canvas
      this.mypaper.tool = new paper.Tool();
      const redColor = '#dd3333';

      this.mypaper.view.onResize = function(event) {
        component.centerGraph();
        component.displayLessons();
      }

      this.mypaper.tool.onMouseMove = function(event) {
        var hitResult = component.mypaper.project.hitTest(event.point, hitOptions);
        if (!hitResult || hitResult.type != 'fill') {
          canvas.style.cursor = "default";
          if (component.hoveredObject) {
            component.hoveredObject.style.fillColor = 'black';
            var lessonName = component.hoveredObject.content
            for (let req of component.lessons[lessonName].requires)
              component.edges[lessonName][req].style.strokeColor = 'black';
            component.hoveredObject = null;
            component.displayLesson = null;
          }
        }
        else {
          canvas.style.cursor = "pointer";
          if (!component.hoveredObject) {
            component.hoveredObject = hitResult.item;
            component.hoveredObject.style.fillColor = redColor;
            let lessonName = hitResult.item.content;
            component.displayLesson = component.lessons[lessonName];
            for (let req of component.lessons[lessonName].requires)
            {
              component.edges[lessonName][req].style.strokeColor = redColor;
              component.edges[lessonName][req].bringToFront();
            }
          }
        }
      }
      
      this.mypaper.tool.onMouseDown = function(event) {
        component.clickedObject = null;
        var hitResult = component.mypaper.project.hitTest(event.point, hitOptions);
        if (!hitResult || hitResult.type != "fill")
          return;
        if (component.editMode)
          component.clickedObject = hitResult.item;
        else {
          if (this.boldOne)
            this.boldOne.style.fontWeight = 'normal';
          this.boldOne = hitResult.item;
          this.boldOne.style.fontWeight = 'bold';
          component.$router.push(component.lessons[this.boldOne.content].url);
        }
      }

      this.mypaper.tool.onMouseDrag = function(event) {
        if (component.clickedObject) {
          var clickedTitle = component.clickedObject.content;
          var deltaX = event.delta.x;
          var deltaY = event.delta.y;
          component.clickedObject.position = new paper.Point(component.clickedObject.position.x + deltaX, component.clickedObject.position.y + deltaY);
          component.positions[clickedTitle].x = component.clickedObject.position.x;
          component.positions[clickedTitle].y = component.clickedObject.position.y;
          for (let path of Object.values(component.edges[clickedTitle])) {
            if (path.segments.length == 4) {            
              path.segments[0].point.x += deltaX;
              path.segments[0].point.y += deltaY;
              path.segments[1].point.x += deltaX;
            } 
            else {            
              path.segments[0].point.x += deltaX;
              path.segments[0].point.y += deltaY;
              path.segments[1].point.x += deltaX;
              path.segments[3].point.x = (path.segments[1].point.x + path.segments[4].point.x) / 2;
              path.segments[2].point.x = (path.segments[1].point.x + path.segments[4].point.x) / 2;
            }
          }
          for (let upper of component.lessons[clickedTitle].isRequiredBy) {
            let path = component.edges[upper][clickedTitle];
            if (path.segments.length == 4) {
              path.segments[3].point.x += deltaX;
              path.segments[3].point.y += deltaY;
              path.segments[2].point.x += deltaX;
              if (path.segments[3].point.y < path.segments[2].point.y + 5) {
                path.segments[2].point.y = path.segments[3].point.y - 5;
                path.segments[1].point.y = path.segments[3].point.y - 5;
              }
            }
            else {
              path.segments[5].point.y += deltaY;
              path.segments[5].point.x += deltaX;
              path.segments[4].point.y += deltaY;
              path.segments[4].point.x += deltaX;
              path.segments[3].point.y += deltaY;
              path.segments[3].point.x = (path.segments[1].point.x + path.segments[4].point.x) / 2;
              path.segments[2].point.x = (path.segments[1].point.x + path.segments[4].point.x) / 2;
            }
          }
        }
      }

      this.mypaper.tool.onMouseUp = function(event) {
        if (component.editMode) {
          for (let pos of Object.values(component.positions)) {
            pos.x = Math.floor((pos.x + 5) / 10)*10;
            pos.y = Math.floor((pos.y + 5) / 10)*10;
          }
          component.displayLessons();
        }
      }
    },
    initialize() {
      this.mypaper = new paper.PaperScope()
      this.mypaper.setup(this.$refs.canvas);
      this.mypaper.activate();
      this.addEventHandlers();
    },
    loadLessons() {
      for (let lesson of graphLessons)
        this.lessons[lesson.title] = {
          title: lesson.title,
          requires: lesson.requires, 
          isRequiredBy: [], 
          field: lesson.field, 
          level: lesson.level, 
          url: lesson.url,
        };
      for (let lesson of graphLessons)
        for (let req of lesson.requires)
          this.lessons[req].isRequiredBy.push(lesson.title);  
    },
    centerGraph() {
      var minX = 10000, maxX = 0, minY = 10000, maxY = 0;
      for (let lesson of graphCoordinates) {
        minX = Math.min(minX, lesson[1]);
        maxX = Math.max(maxX, lesson[1]);
        minY = Math.min(minY, lesson[2]);
        maxY = Math.max(maxY, lesson[2]);
      }
      var centerX = (minX + maxX) / 2;
      var centerY = (minY + maxY) / 2;
      for (let lesson of graphCoordinates)
        this.positions[lesson[0]] = { x: this.mypaper.view.center.x + lesson[1] - centerX, y: 130 + lesson[2] - minY };
    },
    loadGraph() {
      for (let lesson of graphLessons)
        this.positions[lesson.title] = {x: 100, y: 100};
      this.centerGraph();
    },     
    displayLessons() {
      this.mypaper.project.clear();

      //add text edges
      var fontSize = 16;
      for (let name in this.lessons) {
        let text = new paper.PointText(this.positions[name].x, this.positions[name].y);
        text.content = name;
        text.style.justification = 'center';
        text.style.fontFamily = 'Segoe UI';
        text.style.fontSize = fontSize;
        this.edges[name] = [];   
      }
      
      //add edges
      for (var name in this.lessons) {
        for (let req of this.lessons[name].requires) {
          var edge = new paper.Path();
          edge.style.strokeColor = 'black';
          edge.style.strokeWidth = 3;
          this.edges[name][req] = edge;
          if (this.lessons[name].requires.length == 1) {
            edge.add(new paper.Point(this.positions[name].x, this.positions[name].y + 5))
            edge.add(new paper.Point(this.positions[name].x, this.positions[req].y - fontSize - 10))
            edge.add(new paper.Point(this.positions[req].x, this.positions[req].y - fontSize - 10))
            edge.add(new paper.Point(this.positions[req].x, this.positions[req].y - fontSize))
          }
          else if (this.lessons[req].isRequiredBy.length == 1) {
            edge.add(new paper.Point(this.positions[name].x, this.positions[name].y + 5))
            edge.add(new paper.Point(this.positions[name].x, this.positions[name].y + 15))
            edge.add(new paper.Point(this.positions[req].x, this.positions[name].y + 15))
            edge.add(new paper.Point(this.positions[req].x, this.positions[req].y - fontSize))
          }
          else {
            edge.add(new paper.Point(this.positions[name].x, this.positions[name].y + 5))
            edge.add(new paper.Point(this.positions[name].x, this.positions[name].y + 15))
            edge.add(new paper.Point((this.positions[name].x + this.positions[req].x)/2, this.positions[name].y + 15))
            edge.add(new paper.Point((this.positions[name].x + this.positions[req].x)/2, this.positions[req].y - fontSize - 10))
            edge.add(new paper.Point(this.positions[req].x, this.positions[req].y - fontSize - 10))
            edge.add(new paper.Point(this.positions[req].x, this.positions[req].y - fontSize))
          }
        }
      }
      this.mypaper.view.draw();
    }
  },
  data() {
    return {
      lessons: [],
      positions: [],
      clickedObject: null,
      hoveredObject: null,
      boldOne: null,
      edges: [],
      editMode: false,
      displayLesson: null,
      mypaper: null
    } 
  },
  mounted() {
    this.initialize();
    this.loadLessons();
    this.loadGraph();
    this.displayLessons();
  },
  components: {
    Tooltip
  }
}
</script>

<style scoped lang="scss">
@import "@/style/global";

canvas[resize] {
  width: 100%;
  height: 100%;
  position: fixed;
  background: $light-gray;
}

#tree-container {
  position: relative;
}

#tree-tools {
  position: fixed;
  right: 0px;
}

#tree-tools button{
  display: block;
  width: 80px;
  padding-top: 7px;
  padding-bottom: 0px;
  background: none;
  font-size: 0.8em;
  color: $half-gray;
}

#tree-tools button:hover{
  box-shadow: none;
  text-decoration: underline;
}

#lessonSummary {
  border: 2px solid black;
  background: white;
  padding: 10px;
  font-size: 0.8em;
  font-family: "Segoe UI";
}

#displaylessonTitle {
  font-weight: bold;
  font-size: 1.7em;
  font-family: "Corbel";
  margin-bottom: 10px;
}
</style>
