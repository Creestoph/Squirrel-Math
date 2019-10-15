<template>
    <lesson-chapter :contenteditable="true">
        <template #title>{{data.title}}</template>
        {{data.nodes}}
    </lesson-chapter> 
</template>

<script>
import LessonChapter from "../lesson/chapter/LessonChapter";

export default {
  name: "LessonChapterDynamic",
  props: ["data"],
  components: {
    LessonChapter
  }
};
</script>

<style scoped>
</style>
