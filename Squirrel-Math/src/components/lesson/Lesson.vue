<template>
  <div>
    <div id="whole">
      <div ref="lesson" class="lesson">
        <lesson-version-button 
        v-if="routeShortVersion && routeLongVersion" 
        :routeLongVersion="routeLongVersion" 
        :routeShortVersion="routeShortVersion"></lesson-version-button>
        <button ref="expandButton" id="expand-button" @click="lessonHidden ? expandLesson() : hideLesson()">&lt;</button>
        <div class="lesson-content">
          <slot></slot>
        </div>
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
    LessonIntro,
    LessonTitle,
    LessonChapter,
    LessonVersionButton
  },
  methods: {
    hideLesson() {
      if (!this.lessonHidden) {
        this.$refs.lesson.style.transform = "translateX(-92%)";
        this.lessonHidden = true;
        setTimeout(() => this.$refs.expandButton.innerHTML = ">", 1000);
      }
    },
    expandLesson() {
      if (this.lessonHidden) {
        this.$refs.lesson.style.transform = "translateX(0)";
        this.lessonHidden = false;
        setTimeout(() => this.$refs.expandButton.innerHTML = "<", 1000);
      }
    },
    moveExpandButton(event) {
      this.$refs.expandButton.style.marginTop = "" + window.scrollY + "px";
    }
  },
  mounted() {
    this.expandLesson();
    window.addEventListener("scroll", this.moveExpandButton);
  },
  destroyed() {
    window.removeEventListener("scroll", this.moveExpandButton);
  },
  data() {
    return {
      lessonHidden: true
    }
  }
};
</script>

<style scoped>
#whole {
  background-color: #cccccc;
  margin: 0;
}

#expand-button {
  position: absolute;
  width: 70px;
  height: 70px;
  background: #dd0000;
  right: -40px;
  top: 300px;
  border: 5px solid #990000;
  border-radius: 40px;
  color: #ffffff;
  font-size: 3em;
  line-height: 0.5em;
  text-align: center;
  font-family: Consolas;
  padding: 0;
  box-shadow: none;
}

.lesson {
  position: relative;
  font-family: "Segoe UI";
  color: #000000;
  background: #fefefe;
  clear: both;
  transform: translateX(-92%);
  transition: transform 1s;
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
    box-shadow: 0 0 40px 20px rgba(0,0,0,0.3);
  }

  .lesson-content {
    padding: 35px calc(7% + 25px) 35px calc(23% + 25px);
  }
}



</style>
