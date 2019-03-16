<template>
  <div class="row">
    <div class="col">
      <chapter-title>{{title}}</chapter-title>
      <chapter-body>{{body}}</chapter-body>
    </div>
  </div>
</template>

<script>
  import ChapterTitle from './ChapterTitle'
  import ChapterBody from './ChapterBody'

  export default {
    name: "LessonChapter",
    props: ['title', 'body'],
    components: {
      ChapterTitle,
      ChapterBody
    }
  }
</script>

<style scoped>

</style>
