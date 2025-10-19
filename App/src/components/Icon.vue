<template>
    <span ref="container"><slot></slot></span>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const container = ref<HTMLElement | null>(null);

onMounted(() => {
    container.value!.style.webkitMask = `url(${require('@/assets/icons/' + container.value!.innerHTML + '.svg')})`;
    container.value!.innerHTML = '.';
});
</script>

<style scoped lang="scss">
span {
    display: inline-block;
    width: 24px;
    height: 24px;
    background-color: currentColor;
    mask-repeat: no-repeat !important;
    mask-size: cover !important;
}
</style>
