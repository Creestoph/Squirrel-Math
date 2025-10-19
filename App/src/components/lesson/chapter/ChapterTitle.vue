<template>
    <div class="chapter-name">
        <div>
            <slot />
        </div>
        <hr />
    </div>
</template>

<script>
export default {
    name: 'ChapterTitle',
};
</script>

<style scoped lang="scss">
@use '@/style/chapter';
</style>
