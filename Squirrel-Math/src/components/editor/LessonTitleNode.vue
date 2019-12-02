<template>
  <lesson-title
    ref="main"
    contenteditable="true"
  >
    {{ data.data }}
  </lesson-title>
</template>

<script lang="ts">
import LessonTitle from "@/components/lesson/LessonTitle.vue";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import * as data from './data'

@Component({
  components: {
    LessonTitle
  }
})
export default class LessonTitleNode extends Vue{
  @Prop()
  data!: data.LessonTitleNodeData
  mounted() {
    //@ts-ignore
    this.$eventBus.$on('editor-save', () => {
      this.data.data = ((this.$refs.main as Vue).$el as HTMLInputElement).innerText
      })
  }
}
</script>

<style scoped>
</style>
