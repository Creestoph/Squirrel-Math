<template>
  <div class="row">
    <div class="col">
      <lesson-title></lesson-title>
      <lesson-chapter
        v-for="(chapter, index) in chapters"
        :key="index"
        v-model="chapter">
      </lesson-chapter>
    </div>
  </div>

</template>

<script>
  import LessonTitle from './LessonTitle'
  import LessonIntro from './LessonIntro'
  import LessonChapter from './LessonChapter'

  export default {
    name: "Lesson",
    data() {
      return {
        chapters: []
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
