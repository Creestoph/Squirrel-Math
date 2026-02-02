<script lang="ts" setup>
import { useLatexRenderer } from '.';
defineProps<{
    latex: string;
    displayMode?: boolean;
}>();

const latexRenderer = useLatexRenderer();
</script>
<template>
    <span v-html="latexRenderer.render(latex, displayMode ?? false)"></span>
</template>