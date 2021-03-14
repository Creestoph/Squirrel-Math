<template>
    <table>
      <slot/>
    </table>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';

@Component
export default class DefaultTable extends Vue { 
    @Prop() attrs?: any;  
}
</script>

<style scoped lang="scss">
table {
  width: 100%;
}
</style>
