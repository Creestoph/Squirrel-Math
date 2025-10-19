<template>
    <div class="chapter">
        <chapter-title
            @click.native="onZip()"
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
import { nextTick, onMounted, ref } from 'vue';

const props = withDefaults(defineProps<{ optional?: boolean }>(), { optional: false });
const bodyZipped = ref(props.optional);
const isBodyAnimating = ref(false);
const title = ref<Vue>();

onMounted(() => nextTick(() => (title.value!.$el.id = (title.value!.$el as HTMLDivElement).innerText)));

function onZip() {
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
