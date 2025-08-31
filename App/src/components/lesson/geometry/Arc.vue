<template>
    <canvas ref="canvas"></canvas>
</template>

<script lang="ts">
import paper from 'paper';
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';
import { ArcAttributes } from '@/components/editor/nodes/Canvas/ArcNode';

@Component
export default class GeometryArc extends Vue {
    @Prop() attrs!: ArcAttributes;

    mounted() {
        const paperScope = new paper.PaperScope();
        paperScope.setup(this.$refs.canvas as HTMLCanvasElement);
        paperScope.activate();

        const center = new paper.Point(this.attrs.center);
        const arm1End = new paper.Point(this.attrs.arms[0]);
        const arm2End = new paper.Point(this.attrs.arms[1]);
        const arm1 = arm1End.subtract(center);
        const arm2 = arm2End.subtract(center);
        let mid = arm1End.add(arm2End).multiply(0.5).subtract(center);
        if (Math.round(((arm2.angle! - arm1.angle! + 360) % 360) * 100) / 100 > 180) {
            mid = mid.multiply(-1);
        }
        mid = mid.add(arm1End.subtract(arm2End).rotate(90, new paper.Point(0, 0)).normalize(1));

        const arcStart = center.add(arm1.normalize(this.attrs.radius));
        const arcMiddle = center.add(mid.normalize(this.attrs.radius));
        const arcEnd = center.add(arm2.normalize(this.attrs.radius));

        const arcFill = new paper.Path.Arc(arcStart, arcMiddle, arcEnd);
        arcFill.add(center);
        arcFill.fillColor = new paper.Color(this.attrs.color);

        const arcStroke = new paper.Path.Arc(arcStart, arcMiddle, arcEnd);
        arcStroke.strokeColor = new paper.Color(this.attrs.borderColor);
        arcStroke.style!.strokeWidth = 3;
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
