<template>
    <th :colspan="attrs.colspan" :rowspan="attrs.rowspan" :colwidth="attrs.colwidth" :background="attrs.background">
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
</style>
