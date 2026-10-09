<template>
    <div class="chapter-name">
        <div>
            <slot />
        </div>
        <hr />
    </div>
</template>

<style scoped lang="scss">
@use '@/style/chapter';

.chapter-name > div {
    display: flex;
}
</style>
