<template>
  <div class="chapter_name">
    <div>
      <slot />
    </div>
    <hr>
  </div>
</template>

<script>
    export default {
        name: "ChapterTitle"
    }
</script>

<style scoped lang="scss">
@import "@/style/chapter";
</style>
