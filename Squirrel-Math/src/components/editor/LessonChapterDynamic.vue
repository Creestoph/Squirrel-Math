<template>
    <lesson-chapter :contenteditable="true" @focus.native="data.focused=true" @blur.native="data.focused=false">
        <template v-slot:title>{{data.data.title}}</template>
        {{data.data.nodes}}
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
