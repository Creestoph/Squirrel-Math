<template>
  <div class="area" :style="{
    left: (x + 0.5) + 'px', 
    top: (y + 2) + 'px', 
    background: fillColor,
    color: textColor,
    outline: focused ? '3px dotted #cccccc' : 'none',
    border: `4px solid ${borderColor}`,
    width: width + 'px', 
    height: height + 'px',
   }">
    <div class="align-wrapper" :style="{
      'vertical-align': align
    }">
      <div ref="content" class="content"></div>
    </div>
    <div class="top border-overlay"></div>
    <div class="bottom border-overlay"></div>
    <div class="left border-overlay"></div>
    <div class="right border-overlay"></div>
  </div>
</template>

<script>
import paper from "paper";
import { Shape } from './Shape';

export default {
  props: ["node", "updateAttrs", "view", "getPos"],
  data() {
    return {
      focused: false,
      canHaveBorder: true,
      resizing: "",
    }
  },
  computed: {
    x: {
      get() { return this.node.attrs.x; },
      set(x) { this.updateAttrs({ x }); }
    },
    y: {
      get() { return this.node.attrs.y; },
      set(y) { this.updateAttrs({ y }); }
    },
    width: {
      get() { return this.node.attrs.width; },
      set(width) { this.updateAttrs({ width }); }
    },
    height: {
      get() { return this.node.attrs.height; },
      set(height) { this.updateAttrs({ height }); }
    },
    borderColor: {
      get() { return this.node.attrs.borderColor; },
      set(borderColor) { this.updateAttrs({ borderColor }); }
    },
    textColor: {
      get() { return this.node.attrs.textColor; },
      set(textColor) { this.updateAttrs({ textColor }); }
    },
    fillColor: {
      get() { return this.node.attrs.fillColor; },
      set(fillColor) { this.updateAttrs({ fillColor }); }
    },
    align: {
      get() { return this.node.attrs.align; },
      set(align) { this.updateAttrs({ align }); }
    },
    selected: {
      get() { return null; },
      set(value) { this.focused = value; }
    }
  },
  methods: {   
    save() {

    },
    
    handleResize(width, height) {
    
    },

    getPosition() {
      return new paper.Point(this.x, this.y);
    },

    move(shift) {
      this.x += shift.x;
      this.y += shift.y;
    },

    containedInBounds(bounds) {
      return new paper.Rectangle(new paper.Point(this.x, this.y), new paper.Size(this.width, this.height)).intersects(bounds);
    },

    getSnapPoints() {
      return [new paper.Point(this.x, this.y), new paper.Point(this.x + this.width, this.y + this.height)];
    },

    onDelete() {

    },

    onMouseMove(event, hitResult, cursorStyle) {

    },

    onMouseDown(event, hitResult) {
      const mousePosition = event.point;
      const boundingBox = new paper.Rectangle(new paper.Point(this.x, this.y), new paper.Size(this.width, this.height));
      const inbounds = mousePosition.x > boundingBox.left - 3 && mousePosition.x < boundingBox.right + 3 && mousePosition.y > boundingBox.top - 3 && mousePosition.y < boundingBox.bottom + 3;
      this.resizing = "";
      if (!inbounds)
        return false;
      if (Math.abs(boundingBox.left - mousePosition.x) < 3)
        this.resizing = "left";
      else if (Math.abs(boundingBox.right - mousePosition.x) < 3)
        this.resizing = "right";
      else if (Math.abs(boundingBox.top - mousePosition.y) < 3)
        this.resizing = "top";
      else if (Math.abs(boundingBox.bottom - mousePosition.y) < 3)
        this.resizing = "bottom";
      return true;
    },

    onMouseDrag(event, snapPoints) {
      if (!this.resizing)
        return false;

      const mousePosition = event.point;
      const boundingBox = new paper.Rectangle(new paper.Point(this.x, this.y), new paper.Size(this.width, this.height));

      let snapShift = event.modifiers.shift ? Shape.snapShift([mousePosition], snapPoints) : new paper.Point(0, 0);

      const minHeight = 44;
      const minWidth = 44;
      if (this.resizing == "left") {
        const width = (mousePosition.x > boundingBox.right - minWidth) ? minWidth : boundingBox.right - mousePosition.add(snapShift).x;
        this.width = width;
        this.x = boundingBox.right - width;
      }
      if (this.resizing == "right") {
        this.width = (mousePosition.x < boundingBox.left + minWidth) ? minWidth : mousePosition.add(snapShift).x - boundingBox.left;
      }
      if (this.resizing == "top") {
        const height = (mousePosition.y > boundingBox.bottom - minHeight) ? minHeight : boundingBox.bottom - mousePosition.add(snapShift).y;
        this.height = height;
        this.y = boundingBox.bottom - height;
      }
      if (this.resizing == "bottom") {
        this.height = (mousePosition.y < boundingBox.top + minHeight) ? minHeight : mousePosition.add(snapShift).y - boundingBox.top;
      }

      return true;
    },

    onMouseUp() {
      
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/style/global";
.area {
  position: absolute;
  cursor: move;
  box-sizing: border-box;
  display: table;

  .content {
    box-sizing: border-box;
    padding: 5px;
    outline: none;
  }

  .align-wrapper {
    display: table-cell;
  }

  .border-overlay {
    position: absolute;
  }
  .top {
    left: 0;
    top: -6px;
    width: 100%;
    height: 4px;
    cursor: ns-resize;
  }
  .bottom {
    left: 0;
    bottom: -6px;
    width: 100%;
    height: 4px;
    cursor: ns-resize;
  }
  .left {
    top: 0;
    left: -6px;
    height: 100%;
    width: 4px;
    cursor: ew-resize;
  }
  .right {
    top: 0;
    right: -6px;
    height: 100%;
    width: 4px;
    cursor: ew-resize;
  }
}
</style>
<style lang="scss">
.area p {
  margin: 0;
}
</style>
