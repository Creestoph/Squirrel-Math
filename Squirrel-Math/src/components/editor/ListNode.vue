<template>
<ul
  contenteditable="true"
><li v-for="(node, i) in data.nodes" :key="node + i">{{node}}</li></ul>
</template>

<script lang="ts">
import Vue from 'vue'
import {Prop, Component} from 'vue-property-decorator'
import * as data from './data'

@Component({
  name: "list-node"
})
export default class ListNode extends Vue {
    @Prop()
    data!: data.ListNodeData

  // mounted() {
  //   EventBus.$on('editor-save', () => {
  //     this.data.data = ((this.$refs['main'] as Vue).$el as HTMLInputElement).innerText
  //     })
  // }
}
</script>

<style scoped>
</style>
