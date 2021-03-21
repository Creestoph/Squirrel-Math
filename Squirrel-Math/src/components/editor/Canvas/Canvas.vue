<template>
  <button ref="geometryEditor" class="geometry-editor">
    <div class="geometry-toolbar">
      <button @mousedown="addSquare($event)">kwadrat</button>
      <button @mousedown="addTriangle($event)">trójkąt</button>
      <button @mousedown="addCircle($event)">koło</button>
      <button @mousedown="addLine($event)">linia</button>
      <color-picker v-if="selectedShape" :color="fillColor" @mousedown.native="$event.preventDefault()" @selected="setFillColor($event)">wypełnienie</color-picker>
    </div>
    <canvas ref="canvas" width="800" height="500"></canvas>
  </button>
</template>

<script>
import paper from "paper";
import Rectangle from './Rectangle';
import Triangle from './Triangle';
import ColorPicker from '../ColorPicker.vue';

export default {
  components: { ColorPicker },
  props: ["node", "updateAttrs", "view"],
  data() {
    return {
      paperScope: null,
      selectedShape: null,
      rectangles: [],
      triangles: []
    }
  },
  computed: {
    shapes: {
      get() {
        return this.node.attrs.shapes;
      },
      set(shapes) {
        this.updateAttrs({ shapes });
      }
    },
    fillColor: {
      get() {
        return this.selectedShape ? this.selectedShape.fillColor : 'black';
      }
    }
  },
  mounted() {
    this.paperScope = new paper.PaperScope();
    this.paperScope.setup(this.$refs.canvas);
    this.paperScope.tool = new paper.Tool();
  
    const hitOptions = {
      segments: true,
      stroke: false,
      fill: true,
      tolerance: 5
    };

    this.paperScope.tool.onMouseMove = (event) => {
      this.$refs.canvas.style.cursor = "default";
      let hitResult = this.paperScope.project.hitTest(event.point, hitOptions);
      this.rectangles.forEach(rect => rect.onMouseMove(hitResult, this.$refs.canvas.style));
      this.triangles.forEach(triangle => triangle.onMouseMove(hitResult, this.$refs.canvas.style));
    };

    this.paperScope.tool.onMouseDown = (event) => {
      this.$refs.geometryEditor.focus();
      this.selectedShape = null;
      let hitResult = this.paperScope.project.hitTest(event.point, hitOptions);
      if (!hitResult)
        return;
      this.rectangles.forEach(rect => {
        if (rect.onMouseDown(hitResult))
          this.selectedShape = rect;
      });
      this.triangles.forEach(triangle => {
        if (triangle.onMouseDown(hitResult))
          this.selectedShape = triangle;
      });
    };

    this.paperScope.tool.onMouseDrag = (event) => {
      this.rectangles.forEach(rect => rect.onMouseDrag(event));
      this.triangles.forEach(triangle => triangle.onMouseDrag(event));
    };

    this.paperScope.tool.onMouseUp = () => {
      this.rectangles.forEach(rect => rect.onMouseUp());
      this.triangles.forEach(triangle => triangle.onMouseUp());
    };

    this.paperScope.tool.onKeyDown = (event) => {
      if (this.selectedShape) {
        if (event.key == 'delete') {
          this.selectedShape.onDelete();
          if (this.selectedShape instanceof Rectangle)
            this.rectangles.splice(this.rectangles.findIndex(rect => this.selectedShape == rect), 1);
          else if (this.selectedShape instanceof Triangle)
            this.triangles.splice(this.triangles.findIndex(triangle => this.selectedShape == triangle), 1);
          this.selectedShape = null;
        }
        else if (event.key == 'up')
          this.selectedShape.move(new paper.Point(0, -1));
        else if (event.key == 'down')
          this.selectedShape.move(new paper.Point(0, 1));
        else if (event.key == 'left')
          this.selectedShape.move(new paper.Point(-1, 0));
        else if (event.key == 'right')
          this.selectedShape.move(new paper.Point(1, 0));
        event.preventDefault();
      }
    }
  },
  methods: {
    addSquare(event) {
      this.rectangles.push(new Rectangle(this.paperScope));
      event.preventDefault();
    },
    addTriangle(event) {
      this.triangles.push(new Triangle(this.paperScope));
      event.preventDefault();
    },
    addCircle(event) {
      this.paperScope.activate();
      let circle = new paper.Path.Circle(new paper.Point(100, 70), 50);
      circle.fillColor = mainRedColor; 
      circle.strokeColor = darkRed; 
      circle.style.strokeWidth = 3; 
      event.preventDefault();
    },
    addLine(event) {
      this.paperScope.activate();
      let edge = new paper.Path();
      edge.style = new paper.Style({
        strokeColor: mainRedColor,
        strokeWidth: 3
      });
      edge.add(new paper.Point(20, 50));
      edge.add(new paper.Point(70, 150));
      event.preventDefault();
    },
    setFillColor(color) {
        if (this.selectedShape) 
          this.selectedShape.fillColor = color;
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/style/global";

.geometry-editor {
  display: block;
  margin: 0 auto;
  padding: 0;
  background: none;
  position: relative;
  cursor: initial;

  canvas {
    display: block;
    border: 2px $gray dashed;
  }
}

.geometry-editor:hover canvas {
  border: 2px $darker-gray dashed;
}

.geometry-editor:focus canvas {
  border: 2px black dashed;
}

.geometry-toolbar {
  width: 100%;
  // display: none;
  position: absolute;
  top: -44px;
  background: $light-gray;

  > * {
    padding: 0 10px;
    height: 47px;
    width: max-content;
    line-height: 47px;
    float: left;
  }

  > *:hover {
    background: $gray;
  }
}

.geometry-editor:focus .geometry-toolbar {
  display: block;
}

.color-picker-wrapper {
  >div {
    float: left;
    display: flex;
    align-items: center;
    height: 47px;
    line-height: 47px;
  }
}
.color-picker {
  width: 20px;
  height: 20px;
  border: 2px solid black;
  background: yellow;
  margin-left: 5px;
}

</style>
