<template>
    <div class="chapter-mask" ref="chapterMask">
        <div class="chapter-body" ref="chapterBody">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onBeforeUnmount, ref, watch } from 'vue';

const props = defineProps<{ zipped: boolean }>();
const emits = defineEmits<{ (event: 'animation', value: boolean): void }>();

const chapterMask = ref<HTMLElement>(null!);
const chapterBody = ref<HTMLElement>(null!);

let maskHeight = 0;
let animationFrame: number | null = null;

onMounted(async () => {
    await nextTick();
    const mask = chapterMask.value;
    const body = chapterBody.value;

    maskHeight = mask.offsetHeight || body.offsetHeight;

    if (props.zipped) {
        body.style.position = body.style.position || 'relative';
        body.style.top = `${-maskHeight}px`;
        mask.style.overflow = 'hidden';
        mask.style.height = '0px';
    }
});

onBeforeUnmount(() => cancelAnimation());

function cancelAnimation() {
    if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
    }
}

function easeInOutQuad(t: number): number {
    t *= 2;
    return t < 0.417 ? 2 * t ** 2 : 1 - 0.104 * (t - 2) ** 4;
}

watch(
    () => props.zipped,
    (zipped) => {
        const mask = chapterMask.value;
        const body = chapterBody.value;

        cancelAnimation();
        emits('animation', true);

        body.style.position = body.style.position || 'relative';

        const fromHeight = mask.offsetHeight;
        let toHeight: number;

        if (zipped) {
            maskHeight = mask.offsetHeight || body.offsetHeight || maskHeight;
            toHeight = 0;
        } else {
            mask.style.height = 'auto';
            toHeight = mask.offsetHeight || body.offsetHeight || maskHeight;
            mask.style.height = `${fromHeight}px`;
            maskHeight = toHeight;
        }

        const fromTop = parseFloat(getComputedStyle(body).top || '0') || 0;
        const toTop = zipped ? fromTop - maskHeight : 0;

        mask.style.overflow = 'hidden';

        const start = performance.now();
        const deltaTop = toTop - fromTop;
        const deltaHeight = toHeight - fromHeight;

        function step(now: number) {
            const elapsed = now - start;
            const duration = 2000;
            const t = Math.min(1, elapsed / duration);
            const eased = easeInOutQuad(t);

            const currentTop = fromTop + deltaTop * eased;
            const currentHeight = fromHeight + deltaHeight * eased;

            body.style.top = `${currentTop}px`;
            mask.style.height = `${currentHeight}px`;

            if (t < 1) {
                animationFrame = requestAnimationFrame(step);
            } else {
                body.style.top = `${toTop}px`;
                if (!zipped) {
                    mask.style.height = '';
                }
                mask.style.overflow = zipped ? 'hidden' : 'visible';
                animationFrame = null;
                emits('animation', false);
            }
        }

        animationFrame = requestAnimationFrame(step);
    },
);
</script>

<style scoped lang="scss">
@use '@/style/chapter';
</style>
