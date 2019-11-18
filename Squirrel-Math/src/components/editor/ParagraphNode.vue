<template>
<p
  contenteditable="true"
>{{data.data}}</p>
</template>

<script lang="ts">
import { EventBus } from "@/event-bus.js"
import Vue from 'vue'
import {Prop, Component} from 'vue-property-decorator'
import * as data from './data'

@Component({
  name: "paragraph-node"
})
export default class ParagraphNode extends Vue {
    @Prop()
    data!: data.ParagraphNodeData

  // mounted() {
  //   EventBus.$on('editor-save', () => {
  //     this.data.data = ((this.$refs['main'] as Vue).$el as HTMLInputElement).innerText
  //     })
  // }
}
</script>

<style scoped>
</style>
