<template>
    <span ref="container"><slot></slot></span>
</template>

<script>
export default {
    name: 'Icon',
    mounted() {
        this.$refs.container.style.webkitMask = `url(${require('@/assets/icons/' + this.$refs.container.innerHTML + '.svg')})`;
        this.$refs.container.innerHTML = '.';
    },
};
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
