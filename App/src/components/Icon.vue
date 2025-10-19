<template>
    <span ref="container"><slot></slot></span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Icon',
    mounted() {
        const container = this.$refs.container as HTMLElement;
        container.style.webkitMask = `url(${require('@/assets/icons/' + container.innerHTML + '.svg')})`;
        container.innerHTML = '.';
    },
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
