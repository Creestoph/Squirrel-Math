<template>
    <node-view-wrapper>
        <h1 ref="content"><node-view-content /></h1>
    </node-view-wrapper>
</template>

<script setup lang="ts">
import { NodeViewContent, NodeViewWrapper } from '@tiptap/vue-3';
</script>

<style scoped lang="scss">
@use '@/style/global';
@use '@/style/fonts';

h1 {
    text-align: center;
    font-size: 3.2em;
    font-weight: bold;
    font-family: fonts.$secondary-font;
    margin: 50px auto;
    clear: both;
    line-height: 1em;
}
</style>
