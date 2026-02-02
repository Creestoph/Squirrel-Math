<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useLatexRenderer } from '.';

const props = defineProps<{
    latex: string;
    displayMode?: boolean;
}>();

const { render } = useLatexRenderer();
const containerRef = ref<HTMLElement>();
const renderedHtml = ref<string>('');
const isRendered = ref(false);

let idleCallbackId: number | null = null;
let observer: IntersectionObserver | null = null;

function doRender() {
    if (isRendered.value) {
        return;
    } 
    try {
        renderedHtml.value = render(props.latex, props.displayMode ?? false);
        isRendered.value = true;
    } catch (e) {
        console.error('KaTeX render error:', e);
        renderedHtml.value = props.latex;
    }
}

function scheduleBackgroundRender() {
    if ('requestIdleCallback' in window) {
        idleCallbackId = requestIdleCallback(() => doRender(), { timeout: 2000 });
    } else {
        setTimeout(() => doRender(), 100);
    }
}

onMounted(() => {
    observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting && !isRendered.value) {
                if (idleCallbackId !== null) {
                    cancelIdleCallback(idleCallbackId);
                    idleCallbackId = null;
                }
                doRender();
            }
        },
        { rootMargin: '100px' }
    );

    if (containerRef.value) {
        observer.observe(containerRef.value);
    }

    scheduleBackgroundRender();
});

onUnmounted(() => {
    if (observer) {
        observer.disconnect();
    }
    if (idleCallbackId !== null) {
        cancelIdleCallback(idleCallbackId);
    }
});

watch(() => props.latex, () => {
    isRendered.value = false;
    doRender();
});
</script>

<template>
    <div v-if="displayMode" ref="containerRef" class="katex-display" v-html="renderedHtml || latex"></div>
    <span v-else ref="containerRef" v-html="renderedHtml || latex"></span>
</template>
