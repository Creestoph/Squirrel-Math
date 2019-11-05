<template>    
<div>
<button @click="save()">SAVE</button>
<canvas id="tree-canvas" width = "3000px" height = "3000px"></canvas>
</div>
</template>

<script>
import graphLessons from "../../assets/lesson_graph.json"
import paper from "paper"

export default {
  name: "InteractiveTree",
  methods: {
    loadLessons() {
      for (var lesson of graphLessons)
        this.lessons[lesson.title] = {requires: lesson.requires, isRequiredBy: [], field: lesson.field, level: lesson.level};
      for (var lesson of graphLessons)
        for (var req of lesson.requires)
          this.lessons[req].isRequiredBy.push(lesson.title);  
    },
    calculateGraph() {
      var allCalculated = false;
      while (!allCalculated) {
        allCalculated = true;
      for (var name in this.lessons)
        if (!this.positions[name]) {
          allCalculated = false;
          if (this.lessons[name].requires.length == 0)
            this.positions[name] = {x: 800, y: 2000};
          var highestRequiredY = 10000;
          var highestRequiredX;
          for (var j = 0; j < this.lessons[name].requires.length; j++) {
            if (!this.positions[this.lessons[name].requires[j]])
              break;
            if (this.positions[this.lessons[name].requires[j]].y < highestRequiredY)
              highestRequiredY = this.positions[this.lessons[name].requires[j]].y
              highestRequiredX = this.positions[this.lessons[name].requires[j]].x
          }
          if (highestRequiredY < 10000)
            this.positions[name] = {x: highestRequiredX + Math.random()*200 - 100, y: highestRequiredY - 40};
        }
      }

    },      
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
    save(){
      var t = []
      for (var name in this.lessons) {
        t.push([name, this.positions[name].x, this.positions[name].y]);
      }
      this.download(JSON.stringify(t), 'lolek.json', 'application/json')
    },
    displayLessons() {
      var canvas = document.getElementById("tree-canvas");
      paper.setup(canvas);
      var tool = new paper.Tool();
      paper.install(window);
      
      //add text nodes
      for (var name in this.lessons) {
        var text = new paper.PointText(this.positions[name].x, this.positions[name].y);
        text.content = name;
        text.style.justification = 'center';
        this.nodes[name] = [];   
      }
      
      //add edges
      for (var name in this.lessons) {
        for (var req of this.lessons[name].requires) {
          var edge = new paper.Path();
          edge.strokeColor = 'black';
          var randomization = Math.random()*10 - 5;
          edge.add(new paper.Point(this.positions[name].x, this.positions[name].y + 5))
          edge.add(new paper.Point(this.positions[name].x, this.positions[name].y + 10))
          edge.add(new paper.Point(this.positions[req].x + randomization, this.positions[name].y + 10))
          edge.add(new paper.Point(this.positions[req].x + randomization, this.positions[req].y - 10))
          this.nodes[name][req] = [
            edge.segments[edge.segments.length - 4], 
            edge.segments[edge.segments.length - 3], 
            edge.segments[edge.segments.length - 2], 
            edge.segments[edge.segments.length - 1]
          ];                   
        }
      }
      paper.view.draw();

      var hitOptions = {
        segments: false,
        stroke: false,
        fill: true,
        tolerance: 5
      };

      const component = this;

      tool.onMouseDown = function(event) {
        component.clickedObject = null;
        var hitResult = paper.project.hitTest(event.point, hitOptions);
        if (!hitResult || hitResult.type != "fill")
          return;
        component.clickedObject = hitResult.item;
      }

      tool.onMouseDrag = function(event) {
        if (component.clickedObject) {
          var clickedTitle = component.clickedObject.content;
          component.clickedObject.position = new Point(component.clickedObject.position.x + event.delta.x, component.clickedObject.position.y + event.delta.y);
          component.positions[clickedTitle].x = component.clickedObject.position.x;
          component.positions[clickedTitle].y = component.clickedObject.position.y;
          for (var path of Object.values(component.nodes[clickedTitle])) {
            path[0].point.x += event.delta.x;
            path[0].point.y += event.delta.y;
            path[1].point.x += event.delta.x;
          }
          for (var upper of component.lessons[clickedTitle].isRequiredBy) {
            var path = component.nodes[upper][clickedTitle];
            path[1].point.y += event.delta.y;
            path[2].point.x += event.delta.x;
            path[2].point.y += event.delta.y;
            path[3].point.x += event.delta.x;
            path[3].point.y += event.delta.y;
          }
        }
      }
    }
  },
  data() {
    return {
      lessons: [],
      positions: [],
      clickedObject: null,
      nodes: []
    } 
  },
  mounted() {
    this.loadLessons();
    this.calculateGraph();
    this.displayLessons();
  }
}
</script>

<style scoped>

</style>
