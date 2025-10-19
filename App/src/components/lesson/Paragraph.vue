<template>
    <p :style="`text-align: ${attrs.textAlign}`"><slot /></p>
</template>

<script setup lang="ts">
defineProps<{ attrs: { textAlign: string } }>();
</script>
