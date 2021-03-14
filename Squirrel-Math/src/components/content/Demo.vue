<template>
  <lesson content="demo_lesson">
  </lesson>
</template>

<script>
import Lesson from "../lesson/Lesson.vue";

export default {
  name: "Demo",
  data() {
    return {
      chapters: []
    };
  },
  components: {
    Lesson
  }
};
</script>

<style scoped>
</style>
