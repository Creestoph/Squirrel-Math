<template>
    <node-view-wrapper>
        <div class="intro">
            <node-view-content />
        </div>
    </node-view-wrapper>
</template>

<script>
import { NodeViewContent, NodeViewWrapper } from '@tiptap/vue-2';
import Vue from 'vue';

export default Vue.extend({
    components: {
        NodeViewWrapper,
        NodeViewContent,
    },
});
</script>

<style scoped>
.intro {
    margin-bottom: 55px;
}
</style>
