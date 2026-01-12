<template>
    <node-view-wrapper class="image-node" :style="imgStyle">
        <img ref="img" :src="image.src" :alt="image.name" :style="imgStyle" />
        <span
            v-if="height > 50"
            class="image-resize-handle image-resize-handle-right"
            @pointerdown="onPointerDown('right', $event)"
            @pointermove="onPointerMove"
            @pointerup="onPointerUp"
            @pointercancel="onPointerUp"
        />
        <span
            v-if="width > 50"
            class="image-resize-handle image-resize-handle-bottom"
            @pointerdown="onPointerDown('bottom', $event)"
            @pointermove="onPointerMove"
            @pointerup="onPointerUp"
            @pointercancel="onPointerUp"
        />
        <span
            class="image-resize-handle image-resize-handle-corner"
            @pointerdown="onPointerDown('corner', $event)"
            @pointermove="onPointerMove"
            @pointerup="onPointerUp"
            @pointercancel="onPointerUp"
        />
    </node-view-wrapper>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3';
import { globalImages, lessonImages } from '../shared-state';

const props = defineProps(nodeViewProps);

const img = ref<HTMLImageElement | null>(null);
let resizeDirection: 'right' | 'bottom' | 'corner' | null = null;
let pointerId: number | null = null;
let startX = 0;
let startY = 0;
let startWidth = 0;
let startHeight = 0;
const liveWidth = ref<number | null>(null);
const liveHeight = ref<number | null>(null);

const image = computed(() => {
    const key = props.node.attrs.key;
    return lessonImages.value[key] || globalImages.value[key];
});

const width = computed(() => liveWidth.value ?? props.node.attrs.width);
const height = computed(() => liveHeight.value ?? props.node.attrs.height);

const imgStyle = computed(() => {
    const style: Record<string, string> = {};
    if (width.value) {
        style.width = `${Math.round(width.value)}px`;
    }
    if (height.value) {
        style.height = `${Math.round(height.value)}px`;
    }
    return style;
});

function onPointerDown(direction: 'right' | 'bottom' | 'corner', event: PointerEvent) {
    const target = img.value;
    if (!target) {
        return;
    }

    event.preventDefault();
    event.stopPropagation();

    const startRect = target.getBoundingClientRect();
    resizeDirection = direction;
    pointerId = event.pointerId;
    startX = event.clientX;
    startY = event.clientY;
    startWidth = startRect.width;
    startHeight = startRect.height;
    liveWidth.value = startRect.width;
    liveHeight.value = startRect.height;

    const handle = event.currentTarget as HTMLElement | null;
    handle?.setPointerCapture(event.pointerId);
}

function onPointerMove(event: PointerEvent) {
    if (pointerId !== event.pointerId || !resizeDirection) {
        return;
    }

    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;

    if (resizeDirection === 'right' || resizeDirection === 'corner') {
        liveWidth.value = Math.max(20, startWidth + deltaX);
    }

    if (resizeDirection === 'bottom' || resizeDirection === 'corner') {
        liveHeight.value = Math.max(20, startHeight + deltaY);
    }
}

function onPointerUp(event: PointerEvent) {
    if (pointerId !== event.pointerId) {
        return;
    }
    const handle = event.currentTarget as HTMLElement | null;
    handle?.releasePointerCapture(event.pointerId);

    if (liveWidth.value && liveHeight.value) {
        props.updateAttributes({
            width: Math.round(liveWidth.value),
            height: Math.round(liveHeight.value),
        });
    }

    resizeDirection = null;
    pointerId = null;
    liveWidth.value = null;
    liveHeight.value = null;
}
</script>

<style scoped lang="scss">
@use '@/style/colors';

.image-node {
    position: relative;
    display: block;
    width: fit-content;
    max-width: 100%;
    margin: 20px auto;
}

.image-node img {
    display: block;
    max-width: 100%;
}

.image-node.ProseMirror-selectednode {
    outline: 4px dotted colors.$main-red;
}

.image-resize-handle {
    position: absolute;
    background: colors.$main-red;
    border: 2px solid #fff;
    box-sizing: border-box;
    display: none;
}

.ProseMirror-selectednode .image-resize-handle {
    display: block;
}

.image-resize-handle-right {
    top: 50%;
    right: -7px;
    width: 10px;
    height: 24px;
    transform: translateY(-50%);
    cursor: ew-resize;
}

.image-resize-handle-bottom {
    left: 50%;
    bottom: -6px;
    width: 24px;
    height: 10px;
    transform: translateX(-50%);
    cursor: ns-resize;
}

.image-resize-handle-corner {
    right: -4px;
    bottom: -4px;
    cursor: nwse-resize;
    background: transparent;
    border-top: none;
    border-right: none;
    border-left: 20px solid transparent;
    border-bottom: 20px solid colors.$main-red;
}
</style>
