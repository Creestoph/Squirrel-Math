<template>
    <node-view-wrapper class="chapter-name">
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

<script setup lang="ts">
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3';
import { computed } from 'vue';

const props = defineProps(nodeViewProps);

const isHidden = computed({
    get() {
        return props.node.attrs.isHidden;
    },
    set(isHidden) {
        props.updateAttributes({ isHidden });
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
    padding-right: 9px;
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

    .chapter-name:hover &,
    &:hover {
        display: inline-block;
    }
}
</style>
