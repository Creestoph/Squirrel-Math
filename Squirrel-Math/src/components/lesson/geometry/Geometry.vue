<template>
  <button class="geometry" :style="{ width: attrs.canvas.width + 'px', height: attrs.canvas.height + 'px' }">
    <slot/>
  </button>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';

@Component
export default class Geometry extends Vue {
    @Prop() attrs!: { canvas: { width: number, height: number } };
}
</script>

<style scoped lang="scss">
.geometry {
  display: block;
  margin: 0 auto;
  padding: 0;
  background: none;
  position: relative;
  cursor: initial;
}
</style>
