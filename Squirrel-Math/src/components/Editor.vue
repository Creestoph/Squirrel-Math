<template>
  <lesson>
    <lesson-title>Edytor</lesson-title>

    <lesson-intro>
      Jakoś dużo tu nie ma...
    </lesson-intro>
  </lesson>
</template>

<script>
import LessonTitle from "./lesson/LessonTitle";
import LessonIntro from "./lesson/LessonIntro";
import LessonChapter from "./lesson/chapter/LessonChapter";
import Lesson from "./lesson/Lesson";

export default {
  name: "Editor",
  data() {
    return {
      chapters: []
    };
  },
  components: {
    LessonIntro,
    LessonTitle,
    LessonChapter,
    Lesson
  }
};
</script>

<style scoped>
</style>
