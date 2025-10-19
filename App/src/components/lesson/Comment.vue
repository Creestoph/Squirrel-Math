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
            >help</icon
        >
        <tooltip class="comment-window no-selection" :visible="popup" :timeout="0" :offset="{ x: 15, y: -55 }">{{
            commentText
        }}</tooltip>
        <slot />
    </span>
</template>

<script lang="ts">
import Tooltip from '@/components/utils/Tooltip.vue';
import { Prop, Component } from 'vue-property-decorator';
import Vue from 'vue';

@Component({
    components: {
        Tooltip,
    },
})
export default class Comment extends Vue {
    static allComments: { [id: string]: { text: string; hidden: boolean } } = {};

    popup: boolean = false;
    @Prop() text?: string;
    @Prop({ default: true }) hidden?: string;
    @Prop() attrs?: { id: string };

    commentText? = '';
    visible? = false;

    mounted() {
        if (this.attrs && this.attrs.id) {
            this.commentText = Comment.allComments[this.attrs.id].text;
            this.visible = !Comment.allComments[this.attrs.id].hidden;
        } else {
            this.commentText = this.text;
            this.visible = !this.hidden;
        }
    }
}
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
