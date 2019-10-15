<template>
  <div class="lesson">
   <lesson-version-button 
      v-if="routeShortVersion && routeLongVersion" 
      :routeLongVersion="routeLongVersion" 
      :routeShortVersion="routeShortVersion"></lesson-version-button>
    <div class="main">
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
    padding: 35px calc(6% + 25px) 35px calc(6% + 25px);
    font-family: "Verdana";
    font-size: 1.08em;
    color: #000000;
    background: #fefefe;
  }
}

@media screen and (max-width: 500px) {
  .main {
    padding: calc(35px + 2em) 25px 35px 25px;
    clear: both;
  }
}

@media screen and (min-width: 1200px) {
  .main {
    max-width: 1100px;
    position: relative;
    margin-right: 14%;
    padding: 35px calc(6.5% + 25px) 35px calc(19.5% + 25px);
    font-family: "Verdana";
    font-size: 1.08em;
    line-height: 1.7em;
    color: #000000;
    background: #fefefe;
    border-right: 3px solid black;
  }
}


</style>
