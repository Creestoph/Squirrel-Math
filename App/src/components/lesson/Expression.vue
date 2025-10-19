<template>
    <div>$${{ attrs.mathJax }}$$</div>
</template>

<script setup lang="ts">
defineProps<{ attrs: { mathJax: string } }>();
</script>
