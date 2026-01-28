<template>
    <div class="mathjax-container">
        <latex-render :latex="attrs.mathJax" :display-mode="true" />
    </div>
</template>

<script setup lang="ts">
import LatexRender from '../utils/latex-utils/LatexRender.vue';
defineProps<{ attrs: { mathJax: string } }>();
</script>

<style scoped lang="scss">
.mathjax-container {
    overflow-x: auto;
    overflow-y: hidden;
}
</style>
