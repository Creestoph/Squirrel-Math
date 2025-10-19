<template>
    <transition name="fade" v-show="visible">
        <div class="sm-tooltip" v-show="privVisible" :style="{ top: mousePos.y + 'px', left: mousePos.x + 'px' }">
            <slot />
        </div>
    </transition>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import type { Point } from '@/components/utils/point';

const props = withDefaults(
    defineProps<{
        offset: Point;
        timeout: number;
        visible: boolean;
    }>(),
    {
        offset: () => ({ x: 0, y: 0 }),
        timeout: 0,
        visible: false,
    },
);

const mousePos = ref<Point>({ x: 0, y: 0 });
const privVisible = ref(false);
let currentTimeout: number | null = null;

watch(
    () => props.visible,
    (val) => {
        if (val) {
            currentTimeout = window.setTimeout(() => (privVisible.value = props.visible), props.timeout);
        } else {
            if (currentTimeout !== null) {
                clearTimeout(currentTimeout);
            }
            privVisible.value = false;
        }
    },
);

onMounted(() => window.addEventListener('mousemove', onMouseOver));
onUnmounted(() => window.removeEventListener('mousemove', onMouseOver));

function onMouseOver(event: MouseEvent) {
    mousePos.value = {
        x: Math.floor(event.clientX + props.offset.x),
        y: Math.floor(event.clientY + props.offset.y),
    };
}
</script>

<style scoped lang="scss">
.sm-tooltip {
    position: fixed;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>
