<template>
    <node-view-wrapper class="chapter_name">
        <node-view-content />
        <div
            class="hidden-button"
            :class="{ hidden: isHidden }"
            @click="isHidden = !isHidden"
            :title="
                isHidden
                    ? 'Rozdział będzie domyślnie zwinięty. Kliknij by był domyślnie rozwinięty.'
                    : 'Rozdział będzie domyślnie rozwinięty. Kliknij by był domyślnie zwinięty.'
            "
        >
            <icon style="width: 40px; height: 40px">visibility_off</icon>
        </div>
        <hr />
    </node-view-wrapper>
</template>

<script>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-2';
import Vue from 'vue';

export default Vue.extend({
    components: {
        NodeViewWrapper,
        NodeViewContent,
    },
    props: nodeViewProps,
    computed: {
        isHidden: {
            get() {
                return this.node.attrs.isHidden;
            },
            set(isHidden) {
                this.updateAttributes({ isHidden });
            },
        },
    },
});
</script>

<style scoped lang="scss">
@use '@/style/global';
@use '@/style/colors';

.hidden-button {
    display: none;
    position: absolute;
    left: -50px;
    padding-right: 20px;
    top: -12px;
    cursor: pointer !important;

    color: colors.$gray;
    &.hidden {
        color: black;
        display: inline-block;
    }

    span {
        font-size: 1.2em;
    }

    .chapter_name:hover &,
    &:hover {
        display: inline-block;
    }
}
</style>
