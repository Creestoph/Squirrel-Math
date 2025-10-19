<template>
    <canvas ref="canvas"></canvas>
</template>

<script setup lang="ts">
import paper from 'paper';
import { PolygonAttributes } from '@/components/editor/nodes/Canvas/PolygonNode';
import { onMounted, ref } from 'vue';

const props = defineProps<{ attrs: PolygonAttributes }>();
const canvas = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
    const paperScope = new paper.PaperScope();
    paperScope.setup(canvas.value!);
    paperScope.activate();
    let polygon = new paper.Path(props.attrs.vertices.map((v) => [v.x, v.y]));
    polygon.closed = true;
    polygon.fillColor = new paper.Color(props.attrs.color);
    polygon.strokeColor = new paper.Color(props.attrs.borderColor);
    polygon.style!.strokeWidth = polygon.strokeColor.alpha! > 0 ? 3 : 0;
});
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
