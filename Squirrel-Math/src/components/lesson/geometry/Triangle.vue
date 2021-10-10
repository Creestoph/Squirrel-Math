<template>
    <canvas ref="canvas"></canvas>
</template>

<script lang="ts">
import paper from "paper";
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';
import { TriangleAttributes } from "@/components/editor/nodes/Canvas/TriangleNode";

@Component
export default class GeometryTriangle extends Vue {
    @Prop() attrs!: TriangleAttributes;

    mounted() {
        const paperScope = new paper.PaperScope();
        paperScope.setup(this.$refs.canvas as HTMLCanvasElement);
        paperScope.activate();
        let triangle = new paper.Path(this.attrs.vertices.map(v => [v.x, v.y]));
        triangle.fillColor = new paper.Color(this.attrs.color);
        triangle.strokeColor = new paper.Color(this.attrs.borderColor);
        triangle.style!.strokeWidth = triangle.strokeColor.alpha! > 0 ? 4 : 0;    
  }
}
</script>

<style lang="scss" scoped>
canvas {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}
</style>
