<template>
    <span
        class="comment"
        :class="{ visible }"
        @mouseover="popup = true"
        @mouseout="popup = false"
        :style="{ background: popup ? 'rgba(0, 0, 0, 0.09)' : '' }"
    >
        <icon
            @mouseover="popup = true"
            @mouseout="popup = false"
            v-if="visible"
            class="question-mark"
            :style="{ color: popup ? '#aa0000' : '' }"
        >
            help
        </icon>
        <tooltip class="comment-window no-selection" :visible="popup" :timeout="0" :offset="{ x: 15, y: -55 }">
            {{ commentText }}
        </tooltip>
        <slot />
    </span>
</template>

<script setup lang="ts">
import Tooltip from '@/components/utils/Tooltip.vue';
import { onMounted, ref } from 'vue';
import { allComments } from '../editor/shared-state';

const props = withDefaults(
    defineProps<{
        text?: string;
        hidden?: boolean;
        attrs?: { id: string };
    }>(),
    { hidden: true },
);

const commentText = ref<string | undefined>('');
const visible = ref(false);
const popup = ref(false);

onMounted(() => {
    if (props.attrs?.id) {
        commentText.value = allComments.value[props.attrs.id].text;
        visible.value = !allComments.value[props.attrs.id].hidden;
    } else {
        commentText.value = props.text;
        visible.value = !props.hidden;
    }
});
</script>

<style scoped lang="scss">
@use '@/style/global';
@use '@/style/colors';
@use '@/style/fonts';

.comment.visible {
    cursor: help;
}

.comment-window {
    background: rgba(0, 0, 0, 0.4);
    color: colors.$light-gray;
    backdrop-filter: blur(7px);
    color: white;
    padding: 6px;
    font-family: fonts.$main-font;
    font-size: 0.9em;
    font-weight: normal;
    font-style: normal;
    text-decoration: none;
    line-height: 1em;
    z-index: 10000;
    pointer-events: none;
}

.question-mark {
    display: inline-block;
    position: absolute;
    left: -50px;
    color: colors.$darker-main-red;
    font-family: fonts.$geometric-font;
    font-size: 1.3em;
    cursor: help;
}
</style>
