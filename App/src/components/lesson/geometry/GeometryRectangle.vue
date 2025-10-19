<template>
    <canvas ref="canvas"></canvas>
</template>

<script setup lang="ts">
import paper from 'paper';
import { onMounted, ref } from 'vue';
import { RectangleAttributes } from '@/components/editor/nodes/Canvas/RectangleNode';

const props = defineProps<{ attrs: RectangleAttributes }>();
const canvas = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
    const paperScope = new paper.PaperScope();
    paperScope.setup(canvas.value!);
    paperScope.activate();
    let center = new paper.Point(props.attrs.center.x, props.attrs.center.y);
    let size = new paper.Size(props.attrs.size.width, props.attrs.size.height);
    let rectangle = new paper.Shape.Rectangle(
        new paper.Rectangle(center.add(new paper.Point(-size.width! / 2, -size.height! / 2)), size),
    );
    rectangle.fillColor = new paper.Color(props.attrs.color);
    rectangle.strokeColor = new paper.Color(props.attrs.borderColor);
    rectangle.style!.strokeWidth = rectangle.strokeColor.alpha! > 0 ? 3 : 0;
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
