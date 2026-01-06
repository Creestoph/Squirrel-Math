<template>
    <div class="chapter">
        <chapter-title
            @click.native="onToggleZip()"
            :class="{ grayed: optional && bodyZipped }"
            :title="optional ? 'Opcjonalny temat rozszerzony' : ''"
            ref="title"
        >
            <icon v-if="optional && bodyZipped" class="block">block</icon><slot name="title" />
        </chapter-title>
        <chapter-body ref="body" :zipped="bodyZipped" @animation="isBodyAnimating = $event">
            <slot />
        </chapter-body>
    </div>
</template>

<script setup lang="ts">
import ChapterTitle from './ChapterTitle.vue';
import ChapterBody from './ChapterBody.vue';
import { ComponentPublicInstance, nextTick, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const props = withDefaults(defineProps<{ optional?: boolean }>(), { optional: false });
const bodyZipped = ref(props.optional);
const isBodyAnimating = ref(false);
const title = ref<ComponentPublicInstance>(null!);
const route = useRoute();

onMounted(() =>
    nextTick(() => {
        const titleElement = title.value.$el as HTMLDivElement;
        const chapterTitle = titleElement.innerText;
        title.value.$el.id = chapterTitle; // used by router scrollBehavior
        if (route.hash === `#${chapterTitle}` && props.optional) {
            setTimeout(() => (bodyZipped.value = false), 1000);
            setTimeout(() => titleElement.scrollIntoView({ behavior: 'smooth', block: 'start' }), 1500);
        }
    }),
);

function onToggleZip() {
    if (!isBodyAnimating.value) {
        bodyZipped.value = !bodyZipped.value;
    }
}
</script>

<style scoped lang="scss">
@use '@/style/chapter';
@use '@/style/colors';

.block {
    width: 30px;
    height: 30px;
    margin-right: 10px;
}
.grayed {
    color: colors.$dark-gray;

    &:hover {
        color: black;
    }
}
</style>
