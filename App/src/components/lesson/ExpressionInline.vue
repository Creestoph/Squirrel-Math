<template>
    <latex-render :latex="attrs.mathJax" />
</template>

<script setup lang="ts">
import LatexRender from '../utils/latex-utils/LatexRender.vue';

defineProps<{ attrs: { mathJax: string } }>();
</script>
