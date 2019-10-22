<template>
    <lesson-title ref="main" contenteditable="true">
    {{data.data}}
    </lesson-title> 
</template>

<script>
import LessonTitle from "../lesson/LessonTitle";
import { EventBus } from "@/event-bus.js"

export default {
  name: "LessonTitleDynamic",
  props: ["data"],
  components: {
    LessonTitle
  },
  mounted() {
    EventBus.$on('editor-save', () => {
      this.data.data = this.$refs.main.$el.innerText
      })
  }
};
</script>

<style scoped>
</style>
