<template>
  <lesson
    :route-short-version="data.routeShortVersion"
    :route-long-version="data.routeLongVersion"
  >
    <lesson-title-node :data="data.title" />
    <lesson-intro-node :data="data.intro" />
    <lesson-chapter-node
      v-for="chapter in data.chapters"
      :key="chapter.id"
      :data="chapter"
    />
  </lesson>
</template>

<script lang="ts">
import Lesson from "@/components/lesson/Lesson.vue";
import LessonTitleNode from "./LessonTitleNode.vue";
import LessonIntroNode from "./LessonIntroNode.vue";
import LessonChapterNode from "./LessonChapterNode.vue";
import Vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';
import * as data from './data'

@Component({
  components: {
    Lesson,
    LessonTitleNode,
    LessonIntroNode,
    LessonChapterNode
  }
})
export default class LessonNode extends Vue {
  @Prop()
  data!: data.LessonNodeData
}
</script>

<style scoped>
</style>
