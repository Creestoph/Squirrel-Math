<template>
  <lesson-chapter
    :contenteditable="true"
    @focus.native="data.focused=true"
    @blur.native="data.focused=false"
  >
    <template v-slot:title>
      {{ data.title }}
    </template>
    <component
      v-for="node in data.nodes"
      :key="node.id"
      :is="node.name"
      :data="node"
    /> 
  </lesson-chapter>
</template>

<script lang="ts">
import LessonChapter from "@/components/lesson/chapter/LessonChapter.vue";
import ParagraphNode from './ParagraphNode.vue'
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import * as data from './data';

@Component({
  components: {
    LessonChapter,
    ParagraphNode
  }
})
export default class LessonChapterNode extends Vue {
  @Prop()
  data!: data.LessonChapterNodeData
}
</script>

<style scoped>
</style>
