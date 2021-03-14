<template>
    <div class="type">{{ attrs.tags.join(" | ") }}</div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';

@Component
export default class SemanticTag extends Vue { 
    @Prop() attrs?: any;  
}
</script>

<style scoped lang="scss">
</style>
