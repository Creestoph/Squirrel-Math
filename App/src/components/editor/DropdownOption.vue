<template>
    <div :class="{ disabled }" dropdown-option><slot></slot></div>
</template>

<script setup lang="ts">
defineProps<{ disabled?: boolean }>();
</script>

<style scoped lang="scss">
@use '@/style/global';
@use '@/style/colors';

div {
    padding: 5px 10px;
    white-space: nowrap;
    text-align: left;
    &:hover {
        background: #d1baba;
    }
}
.disabled {
    pointer-events: none;
    color: colors.$half-gray !important;
}
</style>
