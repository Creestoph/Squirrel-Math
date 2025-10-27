<template>
    <node-view-wrapper>
        <div>
            <h1 class="lesson-title-short" ref="content">
                <node-view-content />
            </h1>

            <p class="lesson-subtitle">w pigułce</p>
        </div>
    </node-view-wrapper>
</template>

<script setup lang="ts">
import { NodeViewContent, NodeViewWrapper } from '@tiptap/vue-2';
</script>

<style scoped lang="scss">
@use '@/style/global';
@use '@/style/fonts';

.lesson-title-short {
    text-align: center;
    font-size: 3.2em;
    font-weight: bold;
    font-family: fonts.$secondary-font;
    margin: 50px auto 0 auto;
    clear: both;
    line-height: 1em;
}

.lesson-subtitle {
    text-align: center;
    font-size: 1.6em;
    font-weight: bold;
    font-family: fonts.$secondary-font;
    margin: 0 auto 50px auto;
    clear: both;
}
</style>
