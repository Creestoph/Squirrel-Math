<template>
    <div class="intro" ref="content">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'LessonIntro',
};
</script>

<style scoped>
.intro {
    margin-bottom: 55px;
}
</style>
