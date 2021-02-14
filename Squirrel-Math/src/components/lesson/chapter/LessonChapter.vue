<template>
  <div class="chapter">
    <chapter-title @click.native="bodyZip()">
      <slot name="title" />
    </chapter-title>
    <chapter-body ref="body">
      <slot />
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
  methods: {
    bodyZip() {
      this.$refs.body.toggleZip();
    }
  }
};
</script>

<style scoped>
.chapter {
  position: relative;
}
</style>
