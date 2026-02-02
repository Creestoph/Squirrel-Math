<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import splitAtDelimiters from './splitAtDelimeters';
import { useLatexRenderer } from '.';

const props = defineProps<{
    text: string;
}>();

const { render } = useLatexRenderer();
const containerRef = ref<HTMLElement>();
const renderedHtml = ref<string>('');
const isRendered = ref(false);

let idleCallbackId: number | null = null;
let observer: IntersectionObserver | null = null;

const delimiters = [
    { left: '$$', right: '$$', display: true },
    { left: '$', right: '$', display: false },
    { left: '\\(', right: '\\)', display: false },
    { left: '\\[', right: '\\]', display: true },
    { left: '\\begin{equation}', right: '\\end{equation}', display: true },
    { left: '\\begin{align}', right: '\\end{align}', display: true },
    { left: '\\begin{alignat}', right: '\\end{alignat}', display: true },
    { left: '\\begin{gather}', right: '\\end{gather}', display: true },
    { left: '\\begin{CD}', right: '\\end{CD}', display: true },
];

function escapeHtml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function doRender() {
    if (isRendered.value || !props.text) {
        return;
    }

    try {
        const parts = splitAtDelimiters(props.text, delimiters);

        renderedHtml.value = parts.map(part => {
            if (part.type === 'text') {
                return escapeHtml(part.data);
            } else {
                try {
                    return render(part.data, part.display);
                } catch (e) {
                    console.error('KaTeX render error:', e);
                    return escapeHtml(part.rawData ?? part.data);
                }
            }
        }).join('');

        isRendered.value = true;
    } catch (e) {
        console.error('Render error:', e);
        renderedHtml.value = escapeHtml(props.text);
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

watch(() => props.text, () => {
    isRendered.value = false;
    doRender();
});
</script>

<template>
    <span ref="containerRef" v-html="renderedHtml || text"></span>
</template>
