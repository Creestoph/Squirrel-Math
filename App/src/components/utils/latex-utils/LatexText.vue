<script lang="ts" setup>
import { computed } from 'vue';
import temml from 'temml';
import splitAtDelimiters from './splitAtDelimeters';

const props = defineProps<{
    text: string;
}>();

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

const renderedHtml = computed(() => {
    if (!props.text) {
        return '';
    }

    const parts = splitAtDelimiters(props.text, delimiters);

    return parts.map(part => {
        if (part.type === 'text') {
            return escapeHtml(part.data);
        } else {
            try {
                return temml.renderToString(part.data, { displayMode: part.display });
            } catch (e) {
                console.error('Temml render error:', e);
                return escapeHtml(part.rawData ?? part.data);
            }
        }
    }).join('');
});
</script>

<template>
    <span v-html="renderedHtml"></span>
</template>
