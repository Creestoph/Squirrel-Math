<template>
  <lesson>
    <lesson-title>Editor</lesson-title>
    <geometry-editor></geometry-editor>
  </lesson>
</template>

<script lang="ts">
import LessonTitle from '@/components/lesson/LessonTitle.vue';
import LessonIntro from '@/components/lesson/LessonIntro.vue';
import LessonChapter from '@/components/lesson/chapter/LessonChapter.vue';
import Lesson from '@/components/lesson/Lesson.vue';
import GeometryEditor from '@/components/geometry_editor/GeometryEditor.vue';
import { Component } from 'vue-property-decorator';
import Vue from 'vue';

@Component({
  components: {
    LessonIntro,
    LessonTitle,
    LessonChapter,
    Lesson,
    GeometryEditor
  }
})
export default class Editor extends Vue { }
</script>

<style scoped>
</style>
