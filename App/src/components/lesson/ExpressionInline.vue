<template>
    <span>${{ attrs.mathJax }}$</span>
</template>

<script setup lang="ts">
defineProps<{ attrs: { mathJax: string } }>();
</script>
