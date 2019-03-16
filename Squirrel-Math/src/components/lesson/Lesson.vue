<template>
  <div class="row">
    <div class="col">
      <lesson-title>Title</lesson-title>
      <lesson-intro>intro</lesson-intro>
      <!--<lesson-chapter-->
        <!--v-for="(chapter, index) in chapters"-->
        <!--:key="index"-->
        <!--v-model="chapter">-->
      <!--</lesson-chapter>-->
      <lesson-chapter title = "dhwaukdwa" body="dwjaukdhkuwad"></lesson-chapter>
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
