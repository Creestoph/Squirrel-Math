<template>
  <lesson routeShortVersion="/wielomiany-short" routeLongVersion="/wielomiany">
    <lesson-title-short>Wielomiany</lesson-title-short>

	<lesson-chapter><template #title>Co to są równania kwadratowe?</template>

	</lesson-chapter>

  </lesson>
</template>

<script>
import LessonTitleShort from "../../../lesson/LessonTitleShort";
import LessonIntro from "../../../lesson/LessonIntro";
import LessonChapter from "../../../lesson/chapter/LessonChapter";
import Lesson from "../../../lesson/Lesson.vue";

export default {
  name: "WielomianyShort",
  data() {
    return {
      chapters: []
    };
  },
  components: {
    LessonIntro,
    LessonTitleShort,
    LessonChapter,
    Lesson,
  }
};
</script>

<style scoped lang="scss">

</style>
