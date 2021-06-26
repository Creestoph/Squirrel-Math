<template>
  <button ref="geometryEditor" class="geometry-editor" @focus="focused = true" @blur="onBlur($event)">
    <div v-if="focused" class="geometry-toolbar-wrapper">
      <div class="geometry-toolbar">
        <button @mousedown="addSquare($event)"><icon>crop_square</icon></button>
        <button @mousedown="addTriangle($event)"><icon>change_history</icon></button>
        <button @mousedown="addCircle($event)"><icon>circle</icon></button>
        <button @mousedown="addLine($event)"><icon>show_chart</icon></button>
        <template v-if="selectedShapes.length">
          <color-picker :color="fillColor" @mousedown.native="$event.preventDefault()" @selected="setFillColor($event)">wypełnienie</color-picker>
          <button v-if="canAnyHaveBorder(selectedShapes)" @mousedown="toggleBorder($event)">
            <input type="checkbox" :checked="allSelectedHaveBorder()"> obrys
          </button>
          <span v-if="selectedRectangle() || selectedCircle()">szerokość <input type="number" v-model="selectedShapes[0].width"></span>
          <span v-if="selectedRectangle() || selectedCircle()">wysokość <input type="number" v-model="selectedShapes[0].height"></span>
        </template>
      </div>
    </div>
    <div class="canvas-wrapper" ref="canvasWrapper">
      <canvas ref="canvas" width="800" height="500" resize="true"></canvas>
    </div>
  </button>
</template>

<script>
import paper from "paper";
import { Shape } from './Shape';
import Rectangle from './Rectangle';
import Triangle from './Triangle';
import Circle from './Circle';
import Line from './Line';
import ColorPicker from '../../ColorPicker.vue';

let copiedShapes = null;

export default {
  components: { ColorPicker },
  props: ["node", "updateAttrs", "view"],
  data() {
    return {
      paperScope: null,
      selectedShapes: [],
      canvasShapes: [],
      snapPoints: [],
      dragStartPoint: null,
      shapeDragged: null,
      shapeDragStartPosition: null,
      selectionBox: null,
      selectionBoxAnchor: null,
      focused: false,
      resizeObserver: null
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
    canvas: {
      get() {
        return this.node.attrs.canvas;
      },
      set(canvas) {
        this.updateAttrs({ canvas });
      }
    },
    fillColor: {
      get() {
        return this.selectedShapes.every(shape => shape.fillColor == this.selectedShapes[0].fillColor) ? this.selectedShapes[0].fillColor : 'rgba(0, 0, 0, 0)';
      }
    }
  },
  mounted() {
    this.paperScope = new paper.PaperScope();
    this.paperScope.setup(this.$refs.canvas);
    this.paperScope.tool = new paper.Tool();
    this.paperScope.activate();
    if (this.shapes) 
      this.shapes.forEach(shape => {
        switch (shape.type) {
          case 'rectangle': this.canvasShapes.push(new Rectangle(shape)); break;
          case 'triangle': this.canvasShapes.push(new Triangle(shape)); break;
          case 'circle': this.canvasShapes.push(new Circle(shape)); break;
          case 'line': this.canvasShapes.push(new Line(shape)); break;
        }
      })
    if (this.canvas) {      
      this.$refs.canvas.width = this.canvas.width;
      this.$refs.canvas.height = this.canvas.height;
      this.$refs.canvasWrapper.style.width = this.canvas.width + 'px';
      this.$refs.canvasWrapper.style.height = this.canvas.height + 'px';
    }

    const hitOptions = {
      segments: true,
      stroke: true,
      fill: true,
      tolerance: 5
    };

    this.resizeObserver = new ResizeObserver(() => {
      this.paperScope.view.setViewSize(new paper.Size(this.$refs.canvas.offsetWidth, this.$refs.canvas.offsetHeight));
      this.canvas = { width: this.$refs.canvas.offsetWidth, height: this.$refs.canvas.offsetHeight };
    });
    this.resizeObserver.observe(this.$refs.canvas)

    this.paperScope.tool.onMouseMove = (event) => {
      this.$refs.canvas.style.cursor = "default";
      let hitResult = this.paperScope.project.hitTest(event.point, hitOptions);
      this.canvasShapes.forEach(shape => shape.onMouseMove(hitResult, this.$refs.canvas.style));
    };

    this.paperScope.tool.onMouseDown = (event) => {
      this.$refs.geometryEditor.focus();
      let hitResult = this.paperScope.project.hitTest(event.point, hitOptions);

      let clickedShape = null;
      if (event.modifiers.control || event.modifiers.shift) {
        this.canvasShapes.forEach(shape => {
          if (shape.onMouseDown(event, hitResult)) {
            clickedShape = shape;
            if (!this.selectedShapes.includes(shape))
              this.select(shape);
          } 
        });
      }
      else {
        this.canvasShapes.forEach(shape => {
          if (shape.onMouseDown(event, hitResult))
            clickedShape = shape;
        });
        if (!clickedShape)
          this.deselectAll();
        if (clickedShape && !this.selectedShapes.some(shape => shape == clickedShape)) {
          this.deselectAll();
          this.select(clickedShape);
        }
      }

      if (clickedShape) {
        this.dragStartPoint = event.point;
        this.shapeDragStartPosition = clickedShape.position.clone();
        this.shapeDragged = clickedShape;
        this.selectionBox = null;
      }
      else {
        this.shapeDragged = null;
        this.selectionBox = new paper.Shape.Rectangle(new paper.Rectangle(event.point, event.point));
        this.selectionBox.fillColor = new paper.Color(0, 0, 0, 0.4);
        this.selectionBox.strokeColor = new paper.Color(0, 0, 0, 0.6);
        this.selectionBox.style.strokeWidth = 1;
        this.selectionBoxAnchor = event.point;
      }
    };

    this.paperScope.tool.onMouseDrag = (event) => {
      let moveObjects = true;
      this.canvasShapes.forEach(shape => {
        if (shape.onMouseDrag(event, this.snapPoints)) {
          moveObjects = false;
        }
      });
      if (moveObjects && this.shapeDragged) {
        let deltaToCurrentPosition = event.point.subtract(this.dragStartPoint).add(this.shapeDragStartPosition).subtract(this.shapeDragged.position);
        if (event.modifiers.shift) {
          let futurePositions = this.selectedShapes.flatMap(shape => shape.getSnapPoints().map(p => p.add(deltaToCurrentPosition)));
          let snapShift = Shape.snapShift(futurePositions, this.snapPoints);
          deltaToCurrentPosition = deltaToCurrentPosition.add(snapShift);
        }
        this.selectedShapes.forEach(shape => shape.move(deltaToCurrentPosition));
      }
      else if (this.selectionBox) {
        this.selectionBox.position = event.point.add(this.selectionBoxAnchor).multiply(0.5);
        this.selectionBox.size = new paper.Size(Math.abs(event.point.x - this.selectionBoxAnchor.x), Math.abs(event.point.y - this.selectionBoxAnchor.y));
      }
    };

    this.paperScope.tool.onMouseUp = () => {
      this.canvasShapes.forEach(shape => shape.onMouseUp());
      if (this.selectionBox) {
        this.canvasShapes.forEach(shape => {
          if (shape.containedInBounds(this.selectionBox.bounds)) {
            this.select(shape);
          }
        })
        this.selectionBox.remove();
        this.selectionBox = null;
      }
    };

    this.paperScope.tool.onKeyDown = (event) => {
      if (this.selectedShapes.length > 0) {
        if (event.key == 'delete') {
          this.selectedShapes.forEach(shape => {
            shape.onDelete();
            this.canvasShapes.splice(this.canvasShapes.findIndex(canvasShape => canvasShape == shape), 1);
          });
          this.selectedShapes = [];
          this.recalculateSnapPoints();
        }
        else if (event.key == 'up')
          this.selectedShapes.forEach(shape => shape.move(new paper.Point(0, -1)));
        else if (event.key == 'down')
          this.selectedShapes.forEach(shape => shape.move(new paper.Point(0, 1)));
        else if (event.key == 'left')
          this.selectedShapes.forEach(shape => shape.move(new paper.Point(-1, 0)));
        else if (event.key == 'right')
          this.selectedShapes.forEach(shape => shape.move(new paper.Point(1, 0)));
        else if (event.key == 'escape')
          this.onBlur();
        else if (event.key == 'c' && event.modifiers.control)
          copiedShapes = this.selectedShapes;
        event.preventDefault();
      }
      if (event.key == 'v' && event.modifiers.control && copiedShapes) {
        this.deselectAll();
        copiedShapes.forEach(copied => {
          let cloned = copied.clone();
          cloned.move(new paper.Point(40, 40));
          this.canvasShapes.push(cloned);
          this.select(cloned);
        });
        event.preventDefault();
      }
      else if (event.key == 'a' && event.modifiers.control) {
        this.deselectAll();
        this.canvasShapes.forEach(shape => this.select(shape));
        event.preventDefault();
      }
    }
  },
  destroyed() {
    this.resizeObserver.disconnect();
  },
  methods: {
    addShape(createShape, event) {
      this.deselectAll();
      this.paperScope.activate();
      let shape = createShape();
      this.canvasShapes.push(shape);
      this.select(shape);
      event.preventDefault();
    },
    addSquare(event) {
      this.addShape(() => new Rectangle({ center: { x: this.canvas.width / 2, y: this.canvas.height / 2 }}), event);
    },
    addTriangle(event) {
      this.addShape(() => Triangle.createEquilateral({ x: this.canvas.width / 2, y: this.canvas.height / 2 }), event);
    },
    addCircle(event) {
      this.addShape(() => new Circle({ center: { x: this.canvas.width / 2, y: this.canvas.height / 2 }}), event);
    },
    addLine(event) {
      this.addShape(() => new Line(), event);
    },
    setFillColor(color) {
      this.selectedShapes.forEach(shape => shape.fillColor = color);
    },
    canHaveBorder(shape) {
      return shape instanceof Rectangle || shape instanceof Triangle || shape instanceof Circle;
    },
    canAnyHaveBorder(shapes) {
      return shapes.some(shape => this.canHaveBorder(shape));
    },
    toggleBorder(event) {
      let newBorderStatus = !this.allSelectedHaveBorder(this.selectedShapes);
      this.selectedShapes.forEach(shape => {
        if (this.canHaveBorder(shape))
          shape.hasBorder = newBorderStatus;
      });
      event.preventDefault();
    },
    allSelectedHaveBorder() {
      return this.selectedShapes.every(shape => (shape instanceof Rectangle || shape instanceof Triangle || shape instanceof Circle) ? shape.hasBorder : true);
    },
    selectedRectangle() {
      return this.selectedShapes.length == 1 && this.selectedShapes[0] instanceof Rectangle;
    },
    selectedCircle() {
      return this.selectedShapes.length == 1 && this.selectedShapes[0] instanceof Circle;
    },
    select(shape) {
      shape.selected = true;
      this.selectedShapes.push(shape);
      this.recalculateSnapPoints();
    },
    deselectAll() {
      this.canvasShapes.forEach(shape => shape.selected = false);
      this.selectedShapes = [];
      this.snapPoints = [];
    },
    recalculateSnapPoints() {
      this.snapPoints = this.canvasShapes.filter(s => !this.selectedShapes.includes(s)).flatMap(shape => shape.getSnapPoints());
    },
    save() {
      this.shapes = this.canvasShapes.map(shape => shape.toJSON());
      this.canvas = { width: this.$refs.canvas.offsetWidth, height: this.$refs.canvas.offsetHeight };
    },
    onBlur(event) {
      if (!event) {
        this.deselectAll();
      }
      else if (!this.$refs.geometryEditor.contains(event.relatedTarget)) {
        this.deselectAll();
        this.focused = false;
      }
      this.save();
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
}

.canvas-wrapper {
  border: 2px $gray dashed;
  resize: both;
  overflow: hidden;

  canvas {
    width: 100%;
    height: 100%;
  }
}

.canvas-wrapper:hover {
  border: 2px $darker-gray dashed;
}

.canvas-wrapper:focus {
  border: 2px black dashed;
}

.geometry-toolbar-wrapper {
  width: 100%;
  height: 0;
  position: absolute;
}

.geometry-toolbar {
  background: $light-gray;
  transform: translateY(-100%);
  &::after { //clearfix
    content: "";
    clear: both;
    display: table;
  }
  
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

.color-picker-wrapper {
  > div {
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
