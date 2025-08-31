<template>
    <canvas ref="canvas"></canvas>
</template>

<script lang="ts">
import paper from 'paper';
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';
import { PolygonAttributes } from '@/components/editor/nodes/Canvas/PolygonNode';

@Component
export default class GeometryPolygon extends Vue {
    @Prop() attrs!: PolygonAttributes;

    mounted() {
        const paperScope = new paper.PaperScope();
        paperScope.setup(this.$refs.canvas as HTMLCanvasElement);
        paperScope.activate();
        let polygon = new paper.Path(
            this.attrs.vertices.map((v) => [v.x, v.y]),
        );
        polygon.closed = true;
        polygon.fillColor = new paper.Color(this.attrs.color);
        polygon.strokeColor = new paper.Color(this.attrs.borderColor);
        polygon.style!.strokeWidth = polygon.strokeColor.alpha! > 0 ? 3 : 0;
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
