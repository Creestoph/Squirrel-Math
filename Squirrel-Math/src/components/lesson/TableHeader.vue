<template>
    <th :colspan="attrs.colspan" :rowspan="attrs.rowspan" :colwidth="attrs.colwidth"
      :style="`background: ${attrs.background}; border-color: ${attrs.borderColor}; border-width: ${attrs.borderSize}px`">
      <slot/>
    </th>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';

@Component
export default class TableHeader extends Vue { 
    @Prop() attrs?: any;  
}
</script>

<style scoped lang="scss">
@import "@/style/global";
th {
  padding: 0 7px;
  width: 26px;
  position: relative;
  border-style: solid;
  p {
    margin: 7px 0;
  }
}
</style>
