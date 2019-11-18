<template>
  <lesson-intro>
    <component
      v-for="node in data.nodes"
      :key="node.id"
      :is="node.name"
      :data="node"
    /> 
  </lesson-intro> 
</template>

<script lang="ts">
import LessonIntro from "@/components/lesson/LessonIntro.vue";
import ParagraphNode from './ParagraphNode.vue'
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Vue from 'vue';
import * as data from './data'

@Component({
  components: {
    LessonIntro,
    ParagraphNode
  }
})
export default class LessonIntroNode extends Vue {
  @Prop()
  data!: data.LessonIntroNodeData
}
</script>

<style scoped>
</style>
