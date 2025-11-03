<template>
    <node-view-wrapper>
        <div class="intro">
            <node-view-content />
        </div>
    </node-view-wrapper>
</template>

<script setup lang="ts">
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3';
defineProps(nodeViewProps);
</script>

<style scoped>
.intro {
    margin-bottom: 55px;
}
</style>
