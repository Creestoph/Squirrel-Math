<script lang="ts" setup>
import { useLatexRenderer } from '.';
defineProps<{
    latex: string;
}>();

const latexRenderer = useLatexRenderer();
</script>
<template>
    <span v-html="latexRenderer.render(latex, false)"></span>
</template>