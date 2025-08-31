<template>
    <div :class="{ disabled: disabled }"><slot></slot></div>
</template>

<script>
export default {
    name: 'DropdownOption',
    props: ['disabled'],
};
</script>

<style scoped lang="scss">
@import '@/style/global';
div {
    padding: 5px 10px;
    white-space: nowrap;
    text-align: left;
    background: $gray;
    &:hover {
        background: $darker-gray;
    }
}
.disabled {
    pointer-events: none;
    color: $half-gray !important;
}
</style>
