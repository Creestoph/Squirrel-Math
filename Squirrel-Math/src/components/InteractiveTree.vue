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

<script lang="ts">
import { Component } from 'vue-property-decorator';
import graphLessons from '@/assets/current_lesson_graph.json'
import graphCoordinates from '@/assets/current_graph_coordinates.json'
import Tooltip from '@/components/utils/Tooltip.vue'
import Vue from 'vue';
import Point from './utils/point';
import paper, { ToolEvent } from "paper"

class Lesson {
  title: string = "";
  requires: string[] = [];
  isRequiredBy: string[] = [];
  field?: string; 
  level?: string; 
}

@Component({
  components: {
    Tooltip
  }
})
export default class InteractiveTree extends Vue {

  lessons: {[name: string]: Lesson} = {};
  positions: {[lesson: string]: Point} = {};

  clickedObject: paper.Item | null = null;
  hoveredObject: paper.Item | null = null;
  boldLesson: string | null = null;

  mypaper: paper.PaperScope = new paper.PaperScope();
  nodes: {[name: string]: paper.PointText} = {};
  edges: {[from: string]: {[to: string]: paper.Path}} = {};

  editMode: boolean = false;
  displayLesson: any = null;

  mounted() {
    this.initialize();
    this.loadLessons();
    this.loadGraph();
    this.setBoldLesson();
    this.displayLessons();
  }

  setBoldLesson() {
    for (let l of Object.values(this.lessons))
      if (l.title == this.$route.params.sourceFile)
        this.boldLesson = l.title;
  }

  download(data: any, filename: string, type: string) {
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
  }

  enableEdit() {
    this.editMode = true;
  }

  save(){
    this.editMode = false;
    var t = [];
    for (let name in this.lessons) {
      t.push([name, this.positions[name].x, this.positions[name].y]);
    }
    this.download(JSON.stringify(t), 'current_graph_coordinates.json', 'application/json')
  }

  discard(){
    this.editMode = false;
    this.centerGraph();
    this.displayLessons();
  }

  addEventHandlers() {
    var hitOptions = { segments: false, stroke: false, fill: true, tolerance: 5 };
    this.mypaper.tool = new paper.Tool();

    this.mypaper.view.onResize = () => {
      this.centerGraph();
      this.displayLessons();
    }

    this.mypaper.tool.onMouseMove = (event: ToolEvent) => {
      var hitResult = this.mypaper.project!.hitTest(event.point!, hitOptions);
      if (!hitResult || hitResult.type != 'fill')
        this.clearHoveredLesson();
      else {
        (this.$refs.canvas as HTMLElement).style.cursor = "pointer";
        if (!this.hoveredObject) {
          const redColor = new paper.Color('#dd3333');
          this.hoveredObject = hitResult.item;
          this.hoveredObject!.style!.fillColor = redColor;
          let lessonName = (hitResult.item as paper.PointText).content!;
          this.displayLesson = this.lessons[lessonName];
          for (let req of this.lessons[lessonName].requires) {
            this.edges[lessonName][req].style!.strokeColor = redColor;
            this.edges[lessonName][req].bringToFront();
          }
        }
      }
    }
    
    this.mypaper.tool.onMouseDown = (event: ToolEvent) => {
      this.clickedObject = null;
      var hitResult = this.mypaper.project!.hitTest(event.point!, hitOptions);
      if (!hitResult || hitResult.type != "fill")
        return;
      if (this.editMode)
        this.clickedObject = hitResult.item;
      else {
        if (this.boldLesson)
          this.nodes[this.boldLesson].style!.fontWeight = 'normal';
        this.boldLesson = (hitResult.item as paper.PointText).content!;
        this.nodes[this.boldLesson].style!.fontWeight = 'bold';
        if ((event as any).event.button === 0)
          this.$router.replace({ name: 'lesson', params: { sourceFile: this.lessons[this.boldLesson].title } }).catch(() => {});
        else if ((event as any).event.button === 1) {
          let url = this.$router.resolve('/lesson/' + this.lessons[this.boldLesson].title);
          window.open(url.href, '_blank');
        }
        this.clearHoveredLesson();
      }
    }

    this.mypaper.tool.onMouseDrag = (event: ToolEvent) => {
      if (this.clickedObject) {
        let clickedTitle = (this.clickedObject as paper.PointText).content!;
        let deltaX = event.delta!.x!;
        let deltaY = event.delta!.y!;
        this.clickedObject.position = new paper.Point(this.clickedObject.position!.x! + deltaX, this.clickedObject.position!.y! + deltaY);
        this.positions[clickedTitle].x = this.clickedObject.position.x!;
        this.positions[clickedTitle].y = this.clickedObject.position.y!;
        for (let path of Object.values(this.edges[clickedTitle])) {
          let segments = path.segments as paper.Segment[];
          
          if (segments.length == 4) {            
            segments[0].point!.x! += deltaX;
            segments[0].point!.y! += deltaY;
            segments[1].point!.x! += deltaX;
          } 
          else {            
            segments[0].point!.x! += deltaX;
            segments[0].point!.y! += deltaY;
            segments[1].point!.x! += deltaX;
            segments[3].point!.x = (segments[1].point!.x! + segments[4].point!.x!) / 2;
            segments[2].point!.x = (segments[1].point!.x! + segments[4].point!.x!) / 2;
          }
        }
        for (let upper of this.lessons[clickedTitle].isRequiredBy) {
          let segments = this.edges[upper][clickedTitle].segments as paper.Segment[];
          if (segments.length == 4) {
            segments[3].point!.x! += deltaX;
            segments[3].point!.y! += deltaY;
            segments[2].point!.x! += deltaX;
            if (segments[3].point!.y! < segments[2].point!.y! + 5) {
              segments[2].point!.y = segments[3].point!.y! - 5;
              segments[1].point!.y = segments[3].point!.y! - 5;
            }
          }
          else {
            segments[5].point!.y! += deltaY;
            segments[5].point!.x! += deltaX;
            segments[4].point!.y! += deltaY;
            segments[4].point!.x! += deltaX;
            segments[3].point!.y! += deltaY;
            segments[3].point!.x = (segments[1].point!.x! + segments[4].point!.x!) / 2;
            segments[2].point!.x = (segments[1].point!.x! + segments[4].point!.x!) / 2;
          }
        }
      }
    }

    this.mypaper.tool.onMouseUp = () => {
      if (this.editMode) {
        for (let pos of Object.values(this.positions)) {
          pos.x = Math.floor((pos.x + 5) / 10)*10;
          pos.y = Math.floor((pos.y + 5) / 10)*10;
        }
        this.displayLessons();
      }
    }
  }

  private clearHoveredLesson() {
    (this.$refs.canvas as HTMLElement).style.cursor = "default";
    if (this.hoveredObject) {
      this.hoveredObject.style!.fillColor = new paper.Color('black');
      var lessonName = (this.hoveredObject as paper.PointText).content!;
      for (let req of this.lessons[lessonName].requires)
        this.edges[lessonName][req].style!.strokeColor = new paper.Color('black');
      this.hoveredObject = null;
      this.displayLesson = null;
    }
  }

  initialize() {
    this.mypaper.setup(this.$refs.canvas as HTMLCanvasElement);
    this.mypaper.activate();
    this.addEventHandlers();
  }

  loadLessons() {
    for (let lesson of graphLessons)
      this.lessons[lesson.title] = {
        title: lesson.title,
        requires: lesson.requires, 
        isRequiredBy: [], 
        field: lesson.field, 
        level: lesson.level, 
      };
    for (let lesson of graphLessons)
      for (let req of lesson.requires)
        this.lessons[req].isRequiredBy.push(lesson.title);  
  }

  centerGraph() {
    var minX = 10000, maxX = 0, minY = 10000, maxY = 0;
    for (let lesson of graphCoordinates) {
      minX = Math.min(minX, lesson[1] as number);
      maxX = Math.max(maxX, lesson[1] as number);
      minY = Math.min(minY, lesson[2] as number);
      maxY = Math.max(maxY, lesson[2] as number);
    }
    var centerX = (minX + maxX) / 2;
    var centerY = (minY + maxY) / 2;
    for (let lesson of graphCoordinates)
      this.positions[lesson[0]] = { x: this.mypaper.view.center!.x! + (lesson[1] as number) - centerX, y: 130 + (lesson[2] as number) - minY };
  }

  loadGraph() {
    for (let lesson of graphLessons)
      this.positions[lesson.title] = {x: 100, y: 100};
    this.centerGraph();
  }

  displayLessons() {
    this.mypaper.project!.clear();

    //add text edges
    var fontSize = 16;
    for (let name in this.lessons) {
      let text = new paper.PointText(new paper.Point(this.positions[name].x, this.positions[name].y));
      text.content = name;
      text.style = new paper.Style({
        justification: 'center',
        fontFamily: "Segoe UI, sans",
        fontSize: fontSize,
        fontWeight: this.boldLesson == name ? 'bold' : 'normal'
      });
      this.nodes[name] = text;
      this.edges[name] = {};   
    }
    
    //add edges
    for (var name in this.lessons) {
      for (let req of this.lessons[name].requires) {
        var edge = new paper.Path();
        edge.style = new paper.Style({
          strokeColor: 'black',
          strokeWidth: 3
        });
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
    //this.mypaper.view.draw();
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
  font-family: $main-font;
}

#displaylessonTitle {
  font-weight: bold;
  font-size: 1.7em;
  font-family: $secondary-font;
  margin-bottom: 10px;
}
</style>
