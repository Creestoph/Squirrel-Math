<template>
  <div class="chapter">
    <chapter-title @click.native="trigger.call()">
      <slot name="title"></slot>
    </chapter-title>
    <chapter-body :trigger="trigger">
      <slot></slot>
    </chapter-body>
  </div>
</template>

<script>
import ChapterTitle from "./ChapterTitle";
import ChapterBody from "./ChapterBody";

export default {
  name: "LessonChapter",
  components: {
    ChapterTitle,
    ChapterBody
  },
  data() {
    return {
      trigger: { call: function() {} }
    };
  }
};
</script>

<style scoped>
.chapter {
  position: relative;
}
</style>
