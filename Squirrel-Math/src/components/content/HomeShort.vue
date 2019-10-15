<template>
  <lesson routeShortVersion="/home-short" routeLongVersion="/">
    <lesson-title>Do roboty!</lesson-title>
	
			<br><br><br>
			<center><img src="./.images/squirrel.png" width="60%"></center>
			<br><br><br><br>
	
  </lesson>
</template>

<script>
import LessonTitle from "../lesson/LessonTitle";
import LessonIntro from "../lesson/LessonIntro";
import LessonChapter from "../lesson/chapter/LessonChapter";
import Lesson from "../lesson/Lesson";

export default {
  name: "Home",
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
