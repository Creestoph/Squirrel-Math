<template>
    <table class="default-table">
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
  margin: 0 auto;
}
</style>
