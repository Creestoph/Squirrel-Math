<template>
    <lesson-title>
    {{data}}
    </lesson-title> 
</template>

<script>
import LessonTitle from "../lesson/LessonTitle";

export default {
  name: "LessonTitleDynamic",
  props: ["data"],
  components: {
    LessonTitle
  }
};
</script>

<style scoped>
</style>
