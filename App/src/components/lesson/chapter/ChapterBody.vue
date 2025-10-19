<template>
    <div class="chapter-mask" ref="chapterMask">
        <div class="chapter-body" ref="chapterBody">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
import $ from 'jquery';
import { nextTick, onMounted, ref, watch } from 'vue';

const props = defineProps<{ zipped: boolean }>();
const emits = defineEmits<{ (e: 'animation', value: boolean): void }>();
const chapterMask = ref<HTMLElement | null>();
const chapterBody = ref<HTMLElement | null>();

let maskHeight = 0;
let mask!: JQuery<Element>;
let body!: JQuery<Element>;

onMounted(() => {
    mask = $(chapterMask.value!);
    body = $(chapterBody.value!);
    nextTick(() => {
        if (props.zipped) {
            maskHeight = mask.height()!;
            body.css('top', -maskHeight);
            mask.css('height', -maskHeight);
            mask.css('overflow', 'hidden');
        }
    });
});

watch(
    () => props.zipped,
    () => {
        emits('animation', true);
        if (props.zipped) {
            maskHeight = mask.height()!;
            body.animate({ top: '+=' + -maskHeight }, 1100, 'swing', () => emits('animation', false));
            mask.animate({ height: '+=' + -maskHeight }, 1100, 'swing', () => mask.css('overflow', 'hidden'));
        } else {
            body.animate({ top: 0 }, 1100, 'swing', () => emits('animation', false));
            mask.animate({ height: '+=' + maskHeight }, 1100, 'swing', () => {
                mask.css('overflow', 'visible');
                mask.css('height', '');
            });
        }
    },
);
</script>

<style scoped lang="scss">
@use '@/style/chapter';
</style>
