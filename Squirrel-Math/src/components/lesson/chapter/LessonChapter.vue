<template>
  <div class="chapter">
    <chapter-title :serializer="titleSerializer" :editable="editable"> 
      <slot name="title"></slot>
    </chapter-title>
    <chapter-body :serializer="bodySerializer" :editable="editable">
      <slot></slot>
    </chapter-body>
  </div>
</template>

<script>
import ChapterTitle from "./ChapterTitle";
import ChapterBody from "./ChapterBody";
import {Serializer} from "../../../scripts/serializer"

export default {
  name: "LessonChapter",
  props: ["serializer", "editable"],
  data() {
    return {
      titleSerializer: new Serializer("chapter-title"),
      bodySerializer: new Serializer("chapter-body")
    }
  },
  mounted() {
    if (this.serializer) {
      const t = this;
      this.serializer.get = function() {
        return "<template #title>" + t.titleSerializer.get() + "</template>" + t.bodySerializer.get();
      };
    }
  },
  components: {
    ChapterTitle,
    ChapterBody
  }
};
</script>

<style scoped>
</style>
