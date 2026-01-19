<template>
    <div class="mathjax-container">$${{ attrs.mathJax }}$$</div>
</template>

<script setup lang="ts">
defineProps<{ attrs: { mathJax: string } }>();
</script>

<style scoped lang="scss">
.mathjax-container {
    overflow-x: auto;
    overflow-y: hidden;
}
</style>
