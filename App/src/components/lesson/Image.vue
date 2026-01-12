<template>
    <img :src="src" :alt="title" :title="title" :style="style" />
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { lessonImages } from '../editor/shared-state';

const props = defineProps<{ attrs: { key: string; width?: number; height?: number } }>();
const src = ref('');
const title = ref('');

const style = computed(() => {
    const style: Record<string, string> = {};
    if (props.attrs.width) {
        style.width = `${Math.round(props.attrs.width)}px`;
    }
    if (props.attrs.height) {
        style.height = `${Math.round(props.attrs.height)}px`;
    }
    return style;
});

onMounted(() => {
    const scopedImage = lessonImages.value[props.attrs.key];
    src.value = scopedImage?.src || require(`@/assets/global-images/${props.attrs.key}`);
    title.value = scopedImage?.name || props.attrs.key;
});
</script>

<style scoped lang="scss">
img {
    display: block;
    margin: 20px auto;
    max-width: 100%;
}
</style>
<style lang="scss">
table img {
    margin: 0 !important;
}
</style>
