<template>
  <div class="lesson">
    <div class="main">
      <lesson-version-button 
      v-if="routeShortVersion && routeLongVersion" 
      :routeLongVersion="routeLongVersion" 
      :routeShortVersion="routeShortVersion"></lesson-version-button>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import LessonTitle from "./LessonTitle";
import LessonIntro from "./LessonIntro";
import LessonVersionButton from "./LessonVersionButton";
import LessonChapter from "./chapter/LessonChapter";

export default {
  name: "Lesson",
  props: ["routeLongVersion", "routeShortVersion"],
  components: {
    LessonIntro,
    LessonTitle,
    LessonChapter,
    LessonVersionButton
  }
};
</script>

<style scoped>
.lesson {
  background-color: #cccccc;
  /*background-image: url(".images/background.png");
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;*/
  margin: 0;
}

@media screen and (max-width: 1200px) {
  .main {
    position: relative;
    padding: 35px 6% 35px 6%;
    font-family: "Verdana";
    font-size: 1.08em;
    color: #000000;
    background: #fefefe;
  }
}

@media screen and (max-width: 500px) {
  .main {
    padding: 35px 0 35px 0;
  }
}

@media screen and (min-width: 1200px) {
  .main {
    max-width: 1100px;
    position: relative;
    margin-right: 14%;
    padding: 35px 6.5% 35px 19.5%;
    font-family: "Verdana";
    font-size: 1.08em;
    line-height: 1.7em;
    color: #000000;
    background: #fefefe;
    border-right: 3px solid black;
  }
}

</style>
