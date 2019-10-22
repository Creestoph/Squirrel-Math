<template>
    <lesson 
    :routeShortVersion="data.routeShortVersion"
    :routeLongVersion="data.routeLongVersion"
    >
    <lesson-title-dynamic :data="data.title"></lesson-title-dynamic>
    <lesson-intro-dynamic :data="data.intro"></lesson-intro-dynamic>
    <lesson-chapter-dynamic v-for="(chapter, i) in data.chapters" :key="i" :data="chapter"></lesson-chapter-dynamic>
    </lesson>
</template>

<script>
import Lesson from "../lesson/Lesson";
import LessonTitleDynamic from "./LessonTitleDynamic";
import LessonIntroDynamic from "./LessonIntroDynamic";
import LessonChapterDynamic from "./LessonChapterDynamic";

export default {
  name: "LessonDynamic",
  props: ["data"],
  components: {
    Lesson,
    LessonTitleDynamic,
    LessonIntroDynamic,
    LessonChapterDynamic
  }
};
</script>

<style scoped>
</style>
