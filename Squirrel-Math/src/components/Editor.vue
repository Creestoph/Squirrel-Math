<template>
  <lesson>
    <lesson-title :serializer="titleSerializer" contenteditable="true"><span style="color: red">a</span> Dodawanie</lesson-title>
    <lesson-intro :serializer="introSerializer" contenteditable="true">
      <p>Intro</p>
    </lesson-intro>
    <lesson-chapter>
      <template #title>Dodawanie, czyli łączenie składników</template>costam
    </lesson-chapter>
    <button @click="serialize()">serialize</button>
  </lesson>
</template>

<script>

import LessonTitle from "./lesson/LessonTitle";
import LessonIntro from "./lesson/LessonIntro";
import LessonChapter from "./lesson/chapter/LessonChapter";
import Lesson from "./lesson/Lesson";
import {Serializer} from "../scripts/serializer";

export default {
  name: "Editor",
  data() {
    return {
      titleSerializer: new Serializer('lesson-title'),
      introSerializer: new Serializer('lesson-intro'),
    };
  },
  methods: {
    serialize() {
      let str = 
      this.titleSerializer.serialize() + 
      this.introSerializer.serialize();
      console.log(str);
    }
  },
  components: {
    LessonIntro,
    LessonTitle,
    LessonChapter,
    Lesson
  }
};
</script>

<style scoped>
</style>
