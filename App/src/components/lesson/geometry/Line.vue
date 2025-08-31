<template>
    <canvas ref="canvas"></canvas>
</template>

<script lang="ts">
import paper from 'paper';
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';
import { LineAttributes } from '@/components/editor/nodes/Canvas/LineNode';

@Component
export default class GeometryLine extends Vue {
    @Prop() attrs!: LineAttributes;

    mounted() {
        const paperScope = new paper.PaperScope();
        paperScope.setup(this.$refs.canvas as HTMLCanvasElement);
        paperScope.activate();
        let line = new paper.Path();
        this.attrs.points.forEach((p) => line.add(new paper.Point(p)));
        if (this.attrs.smooth) {
            line.smooth({ type: 'continuous' });
        }
        line.style!.strokeWidth = 3;
        line.strokeColor = new paper.Color(this.attrs.color);
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
