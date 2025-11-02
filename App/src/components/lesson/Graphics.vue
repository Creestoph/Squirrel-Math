<template>
    <img :src="src" :alt="title" :title="title" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { lessonImages } from '../editor/shared-state';

const props = defineProps<{ attrs: { key: string } }>();
const src = ref('');
const title = ref('');

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
