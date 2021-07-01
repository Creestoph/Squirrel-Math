<template>
    <table class="default-table">
      <colgroup>
        <col v-for="(width, i) in attrs.columnWidths" :key="i" :style="{ width: width + 'px' }">
      </colgroup>
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
