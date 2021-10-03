<template>
  <button class="geometry-editor">
    <canvas ref="canvas" :width="attrs.canvas.width" :height="attrs.canvas.height"></canvas>
    <div class="text-area-wrapper"><slot/></div>
  </button>
</template>

<script>
import paper from "paper";
import Rectangle from './Rectangle';
import Triangle from './Triangle';
import Circle from './Circle';
import Line from './Line';

export default {
  props: ["attrs"],
  mounted() {
    this.paperScope = new paper.PaperScope();
    this.paperScope.setup(this.$refs.canvas);
    this.paperScope.tool = new paper.Tool();
    if (this.attrs.shapes)
      this.attrs.shapes.forEach(shape => {
        switch (shape.type) {
          case 'rectangle': new Rectangle(this.paperScope, shape); break;
          case 'triangle': new Triangle(this.paperScope, shape); break;
          case 'circle': new Circle(this.paperScope, shape); break;
          case 'line': new Line(this.paperScope, shape); break;
        }
      })
  }
};
</script>

<style scoped lang="scss">
.geometry-editor {
  display: block;
  margin: 0 auto;
  padding: 0;
  background: none;
  position: relative;
  cursor: initial;
}

.text-area-wrapper {
  position: absolute;
  top: 0;
}
</style>
