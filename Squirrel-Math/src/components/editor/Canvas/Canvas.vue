<template>
  <button ref="geometryEditor" class="geometry-editor" @blur="onBlur($event)">
    <div class="geometry-toolbar">
      <button @mousedown="addSquare($event)">kwadrat</button>
      <button @mousedown="addTriangle($event)">trójkąt</button>
      <button @mousedown="addCircle($event)">koło</button>
      <button @mousedown="addLine($event)">linia</button>
      <template v-if="selectedShape">
        <color-picker :color="fillColor" @mousedown.native="$event.preventDefault()" @selected="setFillColor($event)">wypełnienie</color-picker>
        <button v-if="canHaveBorder(selectedShape)" @mousedown="toggleBorder($event)">
          <input type="checkbox" :checked="selectedShape.hasBorder"> obrys
        </button>
        <span v-if="selectedRectangle() || selectedCircle()">szerokość <input type="number" v-model="selectedShape.width"></span>
        <span v-if="selectedRectangle() || selectedCircle()">wysokość <input type="number" v-model="selectedShape.height"></span>
      </template>
    </div>
    <canvas ref="canvas" width="800" height="500"></canvas>
  </button>
</template>

<script>
import paper from "paper";
import Rectangle from './Rectangle';
import Triangle from './Triangle';
import Circle from './Circle';
import Line from './Line';
import ColorPicker from '../ColorPicker.vue';

export default {
  components: { ColorPicker },
  props: ["node", "updateAttrs", "view"],
  data() {
    return {
      paperScope: null,
      selectedShapeVariable: null,
      canvasShapes: [],
      snapPoints: []
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
    },
    selectedShape: {
      get() {
        return this.selectedShapeVariable;
      },
      set(shape) {
        this.selectedShapeVariable = shape;
        if (shape)
          this.snapPoints = this.canvasShapes.filter(s => s != shape).flatMap(shape => shape.getSnapPoints());
      }
    }
  },
  mounted() {
    this.paperScope = new paper.PaperScope();
    this.paperScope.setup(this.$refs.canvas);
    this.paperScope.tool = new paper.Tool();
    if (this.shapes)
      this.shapes.forEach(shape => {
        switch (shape.type) {
          case 'rectangle': this.canvasShapes.push(new Rectangle(this.paperScope, shape)); break;
          case 'triangle': this.canvasShapes.push(new Triangle(this.paperScope, shape)); break;
          case 'circle': this.canvasShapes.push(new Circle(this.paperScope, shape)); break;
          case 'line': this.canvasShapes.push(new Line(this.paperScope, shape)); break;
        }
      })

    const hitOptions = {
      segments: true,
      stroke: true,
      fill: true,
      tolerance: 5
    };

    this.paperScope.tool.onMouseMove = (event) => {
      this.$refs.canvas.style.cursor = "default";
      let hitResult = this.paperScope.project.hitTest(event.point, hitOptions);
      this.canvasShapes.forEach(shape => shape.onMouseMove(hitResult, this.$refs.canvas.style));
    };

    this.paperScope.tool.onMouseDown = (event) => {
      this.$refs.geometryEditor.focus();
      this.selectedShape = null;
      let hitResult = this.paperScope.project.hitTest(event.point, hitOptions);
      this.canvasShapes.forEach(shape => {
        if (shape.onMouseDown(event, hitResult)) {
          this.selectedShape = shape;
          shape.selected = true;
        }
        else
          shape.selected = false;
      });
    };

    this.paperScope.tool.onMouseDrag = (event) => {
      this.canvasShapes.forEach(shape => shape.onMouseDrag(event, this.snapPoints));
    };

    this.paperScope.tool.onMouseUp = () => {
      this.canvasShapes.forEach(shape => shape.onMouseUp());
    };

    this.paperScope.tool.onKeyDown = (event) => {
      if (this.selectedShape) {
        if (event.key == 'delete') {
          this.selectedShape.onDelete();
          this.canvasShapes.splice(this.canvasShapes.findIndex(shape => this.selectedShape == shape), 1);
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
        else if (event.key == 'escape') {
          this.onBlur();
        }
        event.preventDefault();
      }
    }
  },
  methods: {
    addShape(shape, event) {
      this.canvasShapes.push(shape);
      this.canvasShapes.forEach(shape => shape.selected = false);
      this.canvasShapes[this.canvasShapes.length - 1].selected = true;
      this.selectedShape = this.canvasShapes[this.canvasShapes.length - 1];
      event.preventDefault();
    },
    addSquare(event) {
      this.addShape(new Rectangle(this.paperScope), event);
    },
    addTriangle(event) {
      this.addShape(new Triangle(this.paperScope), event);
    },
    addCircle(event) {
      this.addShape(new Circle(this.paperScope), event);
    },
    addLine(event) {
      this.addShape(new Line(this.paperScope), event);
    },
    setFillColor(color) {
      if (this.selectedShape) 
        this.selectedShape.fillColor = color;
    },
    canHaveBorder(shape) {
      return shape instanceof Rectangle || shape instanceof Triangle || shape instanceof Circle;
    },
    toggleBorder(event) {
      this.selectedShape.hasBorder = !this.selectedShape.hasBorder;
      event.preventDefault();
    },
    selectedRectangle() {
      return this.selectedShape instanceof Rectangle;
    },
    selectedCircle() {
      return this.selectedShape instanceof Circle;
    },
    deselectAll() {
      this.canvasShapes.forEach(shape => shape.selected = false);
      this.selectedShape = null;
    },
    saveShapes() {
      this.shapes = this.canvasShapes.map(shape => shape.toJSON());
    },
    onBlur(event) {
      if (!this.$refs.geometryEditor.contains(event.relatedTarget)) 
        this.deselectAll();
      this.saveShapes();
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
  top: -47px;
  background: $light-gray;

  > * {
    padding: 0 10px;
    height: 47px;
    width: max-content;
    line-height: 47px;
    float: left;
    display: flex;
    align-items: center;
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
input[type="checkbox"] {
  width: 15px;
}
input[type="number"] {
  width: 50px;
}
</style>
