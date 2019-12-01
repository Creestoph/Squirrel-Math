<template>
  <lesson routeShortVersion="/rownania-kwadratowe-short" routeLongVersion="/rownania-kwadratowe">
    <lesson-title-short>Równania kwadratowe</lesson-title-short>

    <lesson-intro>   
    <p>
        Pierwszym i najprostszym rodzajem równań, które rozpracujemy <comment text="a może raczej od $x$ do $x$">od $a$ do $z$</comment> są równania liniowe.
        Ich rozwiązywanie jest tak proste, jak podejmowanie decyzji w grach z liniową fabułą.
	</p>
    </lesson-intro>   
	<lesson-chapter><template #title>Gdzie jest ta linia?</template>
    <p class = "type">
		Intuicje
	</p>


	</lesson-chapter>

  </lesson>
</template>

<script>
import LessonTitleShort from "../../../lesson/LessonTitleShort";
import LessonIntro from "../../../lesson/LessonIntro";
import LessonChapter from "../../../lesson/chapter/LessonChapter";
import Lesson from "../../../lesson/Lesson";

export default {
  name: "RownaniaKwadratoweShort",
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
