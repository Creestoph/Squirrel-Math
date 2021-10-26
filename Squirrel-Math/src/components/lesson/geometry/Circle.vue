<template>
    <canvas ref="canvas"></canvas>
</template>

<script lang="ts">
import paper from "paper";
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';
import { CircleAttributes } from "@/components/editor/nodes/Canvas/CircleNode";

@Component
export default class GeometryCircle extends Vue {
    @Prop() attrs!: CircleAttributes;

    mounted() {
        const paperScope = new paper.PaperScope();
        paperScope.setup(this.$refs.canvas as HTMLCanvasElement);
        paperScope.activate();
        let center = new paper.Point(this.attrs.center.x, this.attrs.center.y);
        let size = new paper.Size(this.attrs.size.width, this.attrs.size.height);
        let circle = new paper.Shape.Ellipse(new paper.Rectangle(center.add(new paper.Point(-size.width! / 2, -size.height! / 2)), size));
        circle.fillColor = new paper.Color(this.attrs.color);
        circle.strokeColor = new paper.Color(this.attrs.borderColor);
        circle.style!.strokeWidth = circle.strokeColor.alpha! > 0 ? 3 : 0;
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
