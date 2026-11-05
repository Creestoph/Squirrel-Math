<template>
    <div class="example">
        <slot />
    </div>
</template>

<style scoped lang="scss">
@use '@/style/example';
@use '@/style/colors';

.example:hover {
    background-color: colors.$example-background-darker;
}
</style>
