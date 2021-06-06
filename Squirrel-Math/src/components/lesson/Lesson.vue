<template>
  <div>
    <div id="whole">
      <div ref="lesson" class="lesson">
        <lesson-version-button 
          v-if="routeShortVersion && routeLongVersion" 
          :route-long-version="routeLongVersion" 
          :route-short-version="routeShortVersion"
        />
        <button ref="expandButton" id="expand-button" class="no-selection" @click="lessonHidden ? expandLesson() : hideLesson()">
          &lt;
        </button>
        <button v-if="content" id="edit-button" @click="editLesson()">
          Edytuj lekcję
          <svg><path d="M7.127 22.564l-7.126 1.436 1.438-7.125 5.688 5.689zm-4.274-7.104l5.688 5.689 15.46-15.46-5.689-5.689-15.459 15.46z"/></svg>
        </button>
        <div class="lesson-content">
          <slot>
            <lesson-title>{{ title }}</lesson-title>
            <lesson-intro>
              <block-element v-for="(block, i) in introElements" :key="i" :content="block"></block-element>
            </lesson-intro>
            <lesson-chapter v-for="(chapter, i) in chapters" :key="i">
              <template #title>{{ chapter[0].content[0].text }}</template>  
              <block-element v-for="(block, j) in chapter[1].content" :key="j" :content="block"></block-element>
            </lesson-chapter>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';
import LessonTitle from "./LessonTitle.vue";
import LessonIntro from "./LessonIntro.vue";
import LessonVersionButton from "./LessonVersionButton.vue";
import LessonChapter from "./chapter/LessonChapter.vue";
import BlockElement from "./BlockElement.vue";
import Comment from './Comment.vue';
import Graphics from './Graphics.vue';
declare var MathJax:any

@Component({
  components: {
    LessonVersionButton,
    LessonTitle,
    LessonIntro,
    LessonChapter,
    BlockElement
  }
})
export default class Lesson extends Vue { 
  @Prop() routeLongVersion!: string;
  @Prop() routeShortVersion!: string;
  @Prop() content?: string;
  lessonHidden = true
  
  title = "";
  introElements = [];
  chapters = [];

  constructor() {
    super();
  }

  mounted() {
    this.expandLesson();
    window.addEventListener("scroll", this.moveExpandButton);
    this.setContent();
    // MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
  }
  destroyed() {
    window.removeEventListener("scroll", this.moveExpandButton);
  }

  setContent() {
    if (this.content) {
      import(`@/assets/lessons/${this.content}`).then(json => {
        this.title = json.content[0].content[0].text;
        this.introElements = json.content[1].content;
        this.chapters = json.content.filter((item: any, position: any) => position > 1).map((item: any) => item.content);
        Comment.allComments = json.comments;
        Graphics.lessonImages = json.images;
      })
    }
  }
  hideLesson() {
    if (!this.lessonHidden) {
      (this.$refs.lesson as HTMLElement).style.left = '-80%';
      this.lessonHidden = true;
      setTimeout(() => {
        if (this.$refs.expandButton)
          (this.$refs.expandButton as HTMLElement).innerHTML = ">";
      }, 1000);
    }
  }
  expandLesson() {
    if (this.lessonHidden) {
      (this.$refs.lesson as HTMLElement).style.left = '0';
      this.lessonHidden = false;
      setTimeout(() => {
        if (this.$refs.expandButton)
          (this.$refs.expandButton as HTMLElement).innerHTML = "<";
      }, 1000);    }
  }
  editLesson() {
    this.$router.push({name: 'editor', params: { sourceFile: this.content! }});
  }
  moveExpandButton() {
    (this.$refs.expandButton as HTMLElement).style.marginTop = "" + window.scrollY + "px";
  }
}
</script>

<style scoped lang="scss">
@import "@/style/global";

#whole {
  background-color: $dark-gray;
  margin: 0;
}

#expand-button {
  position: absolute;
  width: 70px;
  height: 70px;
  background: $main-red;
  right: -40px;
  top: 300px;
  border: 5px solid $dark-red;
  border-radius: 40px;
  color: white;
  font-size: 3em;
  line-height: 0.5em;
  text-align: center;
  font-family: $geometric-font;
  padding: 0;
  box-shadow: none;
  transition: margin-top 0.5s;
}
#edit-button {
  position: absolute;
  top: 110px;
  right: 30px;
  background: none;
  color: $dark-gray;
  &:hover {
    color: $darker-gray;
    svg {
      fill: $darker-gray;
    }
  }

  svg {
    width: 24px;
    height: 24px;
    fill: $dark-gray;
    transform: scale(0.7);
  }
}

.lesson {
  position: relative;
  font-family: $main-font;//"Segoe UI";
  color: black;
  background: white;
  clear: both;
  left: -80%;
  transition: left 1s;
}

@media screen and (max-width: 500px) {
  .lesson-content {
    padding: 100px 25px 35px 25px;
  }
}

@media screen and (max-width: 1200px) {
  .lesson-content {
      padding: 100px calc(6% + 25px) 35px calc(6% + 25px);
  }
  #expand-button {
    display: none;
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
    padding: 120px calc(7% + 25px) 35px calc(23% + 25px);
    margin: auto;
    max-width: 970px;
    min-height: 899px;
  }
}



</style>
