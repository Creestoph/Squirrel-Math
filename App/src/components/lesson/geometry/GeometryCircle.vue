<template>
    <canvas ref="canvas"></canvas>
</template>

<script setup lang="ts">
import paper from 'paper';
import { onMounted, ref } from 'vue';
import { CircleAttributes } from '@/components/editor/nodes/Canvas/CircleNode';

const props = defineProps<{ attrs: CircleAttributes }>();
const canvas = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
    const paperScope = new paper.PaperScope();
    paperScope.setup(canvas.value!);
    paperScope.activate();
    let center = new paper.Point(props.attrs.center.x, props.attrs.center.y);
    let size = new paper.Size(props.attrs.size.width, props.attrs.size.height);
    let circle = new paper.Shape.Ellipse(
        new paper.Rectangle(center.add(new paper.Point(-size.width! / 2, -size.height! / 2)), size),
    );
    circle.fillColor = new paper.Color(props.attrs.color);
    circle.strokeColor = new paper.Color(props.attrs.borderColor);
    circle.style!.strokeWidth = circle.strokeColor.alpha! > 0 ? 3 : 0;
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
