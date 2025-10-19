<template>
    <canvas ref="canvas"></canvas>
</template>

<script setup lang="ts">
import paper from 'paper';
import { onMounted, ref } from 'vue';
import { LineAttributes } from '@/components/editor/nodes/Canvas/LineNode';

const props = defineProps<{ attrs: LineAttributes }>();
const canvas = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
    const paperScope = new paper.PaperScope();
    paperScope.setup(canvas.value!);
    paperScope.activate();
    let line = new paper.Path();
    props.attrs.points.forEach((p) => line.add(new paper.Point(p)));
    if (props.attrs.smooth) {
        line.smooth({ type: 'continuous' });
    }
    line.style!.strokeWidth = 3;
    line.strokeColor = new paper.Color(props.attrs.color);
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
