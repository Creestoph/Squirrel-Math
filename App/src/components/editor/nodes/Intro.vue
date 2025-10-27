<template>
    <node-view-wrapper>
        <div class="intro">
            <node-view-content />
        </div>
    </node-view-wrapper>
</template>

<script setup lang="ts">
import { NodeViewContent, NodeViewWrapper } from '@tiptap/vue-2';
</script>

<style scoped>
.intro {
    margin-bottom: 55px;
}
</style>
