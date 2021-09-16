<template>
  <button ref="geometryEditor" class="geometry-editor" @focus="focused = true" @blur="onBlur($event)">
    <div v-if="focused" class="geometry-toolbar-wrapper">
      <div class="geometry-toolbar">
        <button @mousedown="addSquare($event)"><icon>crop_square</icon></button>
        <button @mousedown="addTriangle($event)"><icon>change_history</icon></button>
        <button @mousedown="addCircle($event)"><icon>circle</icon></button>
        <button @mousedown="addLine($event)"><icon>show_chart</icon></button>
        <button @mousedown="addTextArea($event)"><span class="T-icon">T</span></button>
        <template v-if="selectedShapes.length">
          <color-picker :color="fillColor" @mousedown.native="$event.preventDefault()" @selected="setFillColor($event)">wypełnienie</color-picker>
          <color-picker v-if="canAnyHaveBorder(selectedShapes)" :color="borderColor" @mousedown.native="$event.preventDefault()" @selected="setBorderColor($event)">krawędź</color-picker>
          <color-picker v-if="canAnyHaveText(selectedShapes)" :color="textColor" @mousedown.native="$event.preventDefault()" @selected="setTextColor($event)">tekst</color-picker>
          <button v-if="canAnyHaveText(selectedShapes)" @mousedown="setAlign('top')" :class="{ active: align == 'top' }"><icon>align_top</icon></button>
          <button v-if="canAnyHaveText(selectedShapes)" @mousedown="setAlign('middle')" :class="{ active: align == 'middle' }"><icon>align_vertically</icon></button>
          <button v-if="canAnyHaveText(selectedShapes)" @mousedown="setAlign('bottom')" :class="{ active: align == 'bottom' }"><icon>align_bottom</icon></button>
          <span v-if="selectedRectangle() || selectedCircle()">szerokość <input type="number" v-model="selectedShapes[0].width"></span>
          <span v-if="selectedRectangle() || selectedCircle()">wysokość <input type="number" v-model="selectedShapes[0].height"></span>
          <button v-if="selectedLine()" @mousedown="toggleLineEdit()">{{ selectedShapes[0].editing ? 'zatwierdź' : 'edytuj' }}</button>
        </template>
      </div>
    </div>
    <div class="canvas-wrapper" ref="canvasWrapper">
      <canvas ref="canvas" width="800" height="500" resize="true"></canvas>
      <div ref="content" @mousedown="forwardClickEventToCanvas($event)"></div>
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
import TextArea from './TextAreaShape';
import ColorPicker from '../../ColorPicker.vue';

let copiedShapes = null;

export default {
  components: { ColorPicker },
  props: ["node", "updateAttrs", "view", "getPos"],

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
      resizeObserver: null,
      lastTextAreaClickEvent: null,
      hitOptions: {
        segments: true,
        stroke: true,
        fill: true,
        tolerance: 5
      }
    }
  },

  computed: {
    shapes: {
      get() { return this.node.attrs.shapes; },
      set(shapes) { this.updateAttrs({ shapes }); }
    },
    canvas: {
      get() { return this.node.attrs.canvas; },
      set(canvas) { this.updateAttrs({ canvas }); }
    },
    fillColor: {
      get() {
        return this.selectedShapes.every(shape => shape.fillColor == this.selectedShapes[0].fillColor) ? this.selectedShapes[0].fillColor : false;
      }
    },
    borderColor: {
      get() {
        return this.selectedShapes.filter(shape => shape.canHaveBorder).every(shape => shape.borderColor == this.selectedShapes[0].borderColor) ? this.selectedShapes[0].borderColor : false;
      }
    },
    textColor: {
      get() {
        return this.selectedShapes.filter(shape => shape instanceof TextArea).every(shape => shape.textColor == this.selectedShapes[0].textColor) ? this.selectedShapes[0].textColor : false;
      }
    },
    align: {
      get() {
        return this.selectedShapes.filter(shape => shape instanceof TextArea).every(shape => shape.align == this.selectedShapes[0].align) ? this.selectedShapes[0].align : false;
      }
    }
  },

  mounted() {
    this.paperScope = new paper.PaperScope();
    this.paperScope.setup(this.$refs.canvas);

    this.initializeFromAttributes();

    (this.resizeObserver = new ResizeObserver(this.handleResize)).observe(this.$refs.canvas)

    this.paperScope.activate();
    this.paperScope.tool = new paper.Tool();
    this.paperScope.tool.onMouseMove = this.handleMouseMove;
    this.paperScope.tool.onMouseDown = this.handleMouseDown;
    this.paperScope.tool.onMouseDrag = this.handleMouseDrag;
    this.paperScope.tool.onMouseUp = this.handleMouseUp;
    this.paperScope.tool.onKeyDown = this.handleKeyDown;
  },

  destroyed() {
    this.resizeObserver.disconnect();
  },

  methods: {
    initializeFromAttributes() {
      if (this.shapes) 
        this.$nextTick(() => {
          this.paperScope.activate();
          this.shapes.forEach(shape => {
            switch (shape.type) {
              case 'rectangle': this.canvasShapes.push(new Rectangle(shape)); break;
              case 'triangle': this.canvasShapes.push(new Triangle(shape)); break;
              case 'circle': this.canvasShapes.push(new Circle(shape)); break;
              case 'line': this.canvasShapes.push(new Line(shape)); break;
            }
          })
          this.node.content.content.forEach((_, i) => {
            this.canvasShapes.push(TextArea.fromExisting(this.$refs.content.children[i].__vue__ , this.view, () => this.getPos() + 1));
          });
        });
      if (this.canvas) {      
        this.$refs.canvas.width = this.canvas.width;
        this.$refs.canvas.height = this.canvas.height;
        this.$refs.canvasWrapper.style.width = this.canvas.width + 'px';
        this.$refs.canvasWrapper.style.height = this.canvas.height + 'px';
      }
    },

    handleResize() {
      this.paperScope.view.setViewSize(new paper.Size(this.$refs.canvas.offsetWidth, this.$refs.canvas.offsetHeight));
      this.canvas = { width: this.$refs.canvas.offsetWidth, height: this.$refs.canvas.offsetHeight };
    },

    handleMouseMove(event) {
      this.$refs.canvas.style.cursor = "default";
      let hitResult = this.paperScope.project.hitTest(event.point, this.hitOptions);
      this.canvasShapes.forEach(shape => shape.onMouseMove(event, hitResult, this.$refs.canvas.style));
    },

    handleMouseDown(event) {
      this.$refs.geometryEditor.focus();
      let hitResult = this.paperScope.project.hitTest(event.point, this.hitOptions);

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
        if (!clickedShape) {
          this.deselectAll();
        }
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
    },

    handleMouseDrag(event) {
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
    },

    handleMouseUp() {
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
    },

    handleKeyDown(event) {
      const anyTextAreaSelected = this.selectedShapes.some(shape => shape instanceof TextArea);

      if (this.selectedShapes.length > 0) {
        let catchedEvent = true;
        if (event.key == 'delete') {
          this.selectedShapes.forEach(shape => {
            shape.onDelete();
            this.canvasShapes.splice(this.canvasShapes.findIndex(canvasShape => canvasShape == shape), 1);
          });
          this.selectedShapes = [];
          this.recalculateSnapPoints();
          this.$nextTick(() => {
            for (const shape of this.canvasShapes)
              if (shape instanceof TextArea && !shape.component)
                this.canvasShapes.splice(this.canvasShapes.findIndex(canvasShape => canvasShape == shape), 1);
          })
        }
        else if (event.key == 'up' && !anyTextAreaSelected)
          this.selectedShapes.forEach(shape => shape.move(new paper.Point(0, -1)));
        else if (event.key == 'down' && !anyTextAreaSelected)
          this.selectedShapes.forEach(shape => shape.move(new paper.Point(0, 1)));
        else if (event.key == 'left' && !anyTextAreaSelected)
          this.selectedShapes.forEach(shape => shape.move(new paper.Point(-1, 0)));
        else if (event.key == 'right' && !anyTextAreaSelected)
          this.selectedShapes.forEach(shape => shape.move(new paper.Point(1, 0)));
        else if (event.key == 'escape')
          this.onBlur();
        else if (event.key == 'c' && event.modifiers.control)
          copiedShapes = this.selectedShapes;
        else 
          catchedEvent = false;
        if (catchedEvent)
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
      else if (event.key == 'backspace') {
        this.$nextTick(() => {
          for (const shape of this.canvasShapes)
            if (shape instanceof TextArea && !shape.component)
              this.canvasShapes.splice(this.canvasShapes.findIndex(canvasShape => canvasShape == shape), 1);
        })
      }
    },

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
      this.addShape(() => {
        const line = new Line();
        line.editing = true;
        return line;
      }, event);
    },

    addTextArea(event) {
      this.addShape(() => new TextArea({ 
        view: this.view, 
        canvasEditorPos: () => this.getPos() + 1,
        width: 160, 
        height: 44, 
        x: this.canvas.width / 2 - 80, 
        y: this.canvas.height / 2 - 20,
      }), event);
    },

    setFillColor(color) {
      this.selectedShapes.forEach(shape => shape.fillColor = color);
    },

    canAnyHaveBorder(shapes) {
      return shapes.some(shape => shape.canHaveBorder);
    },

    canAnyHaveText(shapes) {
      return shapes.some(shape => shape instanceof TextArea);
    },

    setBorderColor(color) {
      this.selectedShapes.filter(shape => shape.canHaveBorder).forEach(shape => shape.borderColor = color);
    },

    setTextColor(color) {
      this.selectedShapes.filter(shape => shape instanceof TextArea).forEach(shape => shape.textColor = color);
    },

    setAlign(align) {
      this.selectedShapes.filter(shape => shape instanceof TextArea).forEach(shape => shape.align = align);
    },

    toggleLineEdit() {
      this.selectedShapes[0].editing = !this.selectedShapes[0].editing;
    },

    selectedRectangle() {
      return this.selectedShapes.length == 1 && this.selectedShapes[0] instanceof Rectangle;
    },

    selectedLine() {
      return this.selectedShapes.length == 1 && this.selectedShapes[0] instanceof Line;
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
      this.shapes = this.canvasShapes.map(shape => shape.toJSON()).filter(json => !!json);
      this.canvas = { width: this.$refs.canvas.offsetWidth, height: this.$refs.canvas.offsetHeight };
    },

    onBlur(event) {
      if (!event) {
        this.deselectAll();
      }
      else if (event.relatedTarget && !this.$refs.geometryEditor.contains(event.relatedTarget) &&
        (!this.lastTextAreaClickEvent || event.timeStamp > this.lastTextAreaClickEvent.timeStamp + 10)) {
        this.deselectAll();
        this.focused = false;
      }
      this.save();
    },

    forwardClickEventToCanvas(event) {
      const copiedEvent = new Event('mousedown');
      copiedEvent.pageX = event.pageX;
      copiedEvent.pageY = event.pageY;
      this.$refs.canvas.dispatchEvent(copiedEvent);
      this.lastTextAreaClickEvent = event;
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

  > div {
    position: absolute;
    top: 0;
    // width: 100%;
    // height: 100%;
    // overflow: hidden;
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
  z-index: 1;
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

    &:hover {
      background: $gray;
    }

     &.active {
      background: $dark-gray;
    }

    &.active:hover {
      background: $dark-gray;
      outline: 1px solid $darker-gray;
      outline-offset: -1px;
    }
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
.T-icon {
  font-style: italic;
  font-weight: bold;
  font-family: 'Times New Roman', Times, serif;
}
</style>
