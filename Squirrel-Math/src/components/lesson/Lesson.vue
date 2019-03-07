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
        chapters: [],
        robert: 'a',
        ks: [1,2,3,4,5]
      }
    },
    methods: {
      robertize(){
        this.robert = 'roberto'
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
