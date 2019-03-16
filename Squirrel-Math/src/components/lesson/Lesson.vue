<template>
  <div class="lesson">
    <div class="main">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import LessonTitle from './LessonTitle'
  import LessonIntro from './LessonIntro'
  import LessonChapter from './chapter/LessonChapter'

  export default {
    name: "Lesson",
    data() {
      return {
        chapters: [],
      }
    },
    components:{
      LessonIntro,
      LessonTitle,
      LessonChapter
    }
  }
</script>

<style scoped>

</style>
