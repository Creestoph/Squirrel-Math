<template>
  <div class="chapter">
    <chapter-title><slot name="title"></slot></chapter-title>
    <chapter-body><slot></slot></chapter-body>
  </div>
</template>

<script>
  import ChapterTitle from './ChapterTitle'
  import ChapterBody from './ChapterBody'

  export default {
    name: "LessonChapter",
    components: {
      ChapterTitle,
      ChapterBody
    }
  }
</script>

<style scoped>
  .chapter
  {
    position: relative;
  }
</style>
