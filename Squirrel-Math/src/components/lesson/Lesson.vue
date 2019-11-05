<template>
  <div id="whole">
    <div class="lesson">
      <lesson-version-button 
      v-if="routeShortVersion && routeLongVersion" 
      :routeLongVersion="routeLongVersion" 
      :routeShortVersion="routeShortVersion"></lesson-version-button>
      <div class="lesson-content">
        <slot></slot>
      </div>
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
    // LessonIntro,
    // LessonTitle,
    // LessonChapter,
    LessonVersionButton
  }
};
</script>

<style scoped>
#whole {
  background-color: #cccccc;
  /*background-image: url(".images/background.png");
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;*/
  margin: 0;
}

  .lesson {
    position: relative;
    font-family: "Verdana";
    font-size: 1.08em;
    color: #000000;
    background: #fefefe;
    clear: both;
  }

@media screen and (max-width: 1200px) {
  .lesson-content {
      padding: 35px calc(6% + 25px) 35px calc(6% + 25px);
  }
}

@media screen and (max-width: 500px) {
  .lesson-content {
    padding: 100px 25px 35px 25px;
  }
}

@media screen and (min-width: 1200px) {
  .lesson {
    margin-right: 14%;
    line-height: 1.7em;
    border-right: 3px solid black;
  }

  .lesson-content {
    padding: 35px calc(7% + 25px) 35px calc(23% + 25px);
  }
}



</style>
