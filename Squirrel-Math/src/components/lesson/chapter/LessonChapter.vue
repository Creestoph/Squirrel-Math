<template>
    <div class="chapter">
        <chapter-title
            @click.native="bodyZip()"
            :class="{ grayed: optional && bodyZipped }"
            :title="optional ? 'Opcjonalny temat rozszerzony' : ''"
            ref="title"
        >
            <icon v-if="optional && bodyZipped" class="block">block</icon
            ><slot name="title" />
        </chapter-title>
        <chapter-body
            ref="body"
            :initiallyZipped="optional"
            @zipped="bodyZipped = $event"
        >
            <slot />
        </chapter-body>
    </div>
</template>

<script lang="ts">
import ChapterTitle from './ChapterTitle.vue';
import ChapterBody from './ChapterBody.vue';

import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';

@Component({
    components: {
        ChapterTitle,
        ChapterBody,
    },
})
export default class LessonChapter extends Vue {
    @Prop({ default: false }) optional!: boolean;
    bodyZipped = false;

    mounted() {
        this.$nextTick(() => {
            const titleElement = this.$refs.title as Vue;
            titleElement.$el.id = (
                titleElement.$el as HTMLDivElement
            ).innerText;
        });
    }

    bodyZip() {
        (this.$refs.body as ChapterBody).toggleZip();
    }
}
</script>

<style scoped lang="scss">
@import '@/style/chapter';
.block {
    width: 30px;
    height: 30px;
    margin-right: 10px;
}
.grayed {
    color: $dark-gray;

    &:hover {
        color: black;
    }
}
</style>
