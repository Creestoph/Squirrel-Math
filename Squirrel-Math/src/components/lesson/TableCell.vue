<template>
    <td :colspan="attrs.colspan" :rowspan="attrs.rowspan" :colwidth="attrs.colwidth" :background="attrs.background">
      <slot/>
    </td>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';

@Component
export default class TableCell extends Vue { 
    @Prop() attrs?: any;  
}
</script>

<style scoped lang="scss">
@import "@/style/global";
td 
{
  border: solid thin $dark-gray;
  min-width: 50px;
  padding: 0 10px;
}
</style>
