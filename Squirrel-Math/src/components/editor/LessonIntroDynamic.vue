<template>
    <lesson-intro>
        <!-- todo temporary solution components should handle data on their own -->
        <component v-for="(node, i) in data.data" :key="i" :is="node.name">{{node.data}}</component> 
    </lesson-intro> 
</template>

<script>
import LessonIntro from "../lesson/LessonIntro";

export default {
  name: "LessonIntroDynamic",
  props: ["data"],
  components: {
    LessonIntro
  }
};
</script>

<style scoped>
</style>
