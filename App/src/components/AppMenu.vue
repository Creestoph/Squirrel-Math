<template>
    <div>
        <div class="menu-trapeze" :class="{ 'menu-small': isSmall }">
            <router-link to="/" class="menu-segment" :class="{ 'menu-small': isSmall }">
                <div class="logo">
                    <div>
                        <div class="logo-black-cell" style="float: left" />
                        <div class="logo-container-cell" style="float: left">
                            <div class="logo-red-cell" style="float: left" />
                            <div class="logo-red-cell" style="float: left" />
                            <div class="logo-red-cell" style="float: left" />
                            <div class="logo-red-cell" style="float: left" />
                        </div>
                        <div class="logo-black-cell" style="float: left; clear: left" />
                        <div class="logo-black-cell" style="float: left" />
                    </div>
                </div>
                <div class="menu-text" v-if="showText">
                    <span class="logo-text-1">squirrel</span>
                    <span class="logo-text-2">math</span>
                </div>
            </router-link>
            <div v-if="isMobileLayout" class="menu-segment show-tree menu-small" @click="isLessonPanelExpanded = !isLessonPanelExpanded">
                <icon v-if="isLessonPanelExpanded" class="icon">lan</icon>
                <icon v-if="!isLessonPanelExpanded" class="icon">document_with_image</icon>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useWindowSize } from './utils/rwd';
import { useRoute } from 'vue-router';
import { useLessonExpandedInfo } from './utils/menu-bus';

const scrolled = ref(false);
const showText = ref(true);
const restoreTimeout = ref<number | null>(null);
const { windowWidth, isMobileLayout } = useWindowSize();
const route = useRoute()
const { isLessonPanelExpanded } = useLessonExpandedInfo();

const isEditor = computed(() => route.path.startsWith('/editor'));
const isSmall = computed(() => scrolled.value || windowWidth.value < 700 || (isEditor.value && windowWidth.value < 1100));

watch(() => isSmall.value, (value) => {
    if (value) {
        showText.value = false;
        if (restoreTimeout.value) {
            clearTimeout(restoreTimeout.value);
        }
    } else {
        restoreTimeout.value = setTimeout(() => (showText.value = !isSmall.value), 500);
    }
}, { immediate: true });

onMounted(() => {
    addEventListener('scroll', resizeLogo);
    resizeLogo();
});
onUnmounted(() => {
    removeEventListener('scroll', resizeLogo);
});
function resizeLogo() {
    scrolled.value = (document.body.scrollTop > 5 || document.documentElement.scrollTop > 5);
}
</script>

<style scoped lang="scss">
@use '@/style/global';
@use '@/style/colors';
@use '@/style/fonts';

$transition-length: 0.7s;

.menu-trapeze {
    position: fixed;
    top: 0px;
    left: -160px;
    z-index: 100000;
    transform: skew(-45deg);
    padding-left: 100px;
    transition: left $transition-length;
}

.menu-segment {
    width: 300px;
    background: white;
    border-bottom: 7px solid black;
    border-right: 9.9px solid black;
    float: left;
    height: 100px;
    transition: all $transition-length;
    padding: 15px 10px 15px 40px;
    line-height: 100px;

    > * {
        transform: skew(45deg);
    }
}

.menu-segment.show-tree {
    background: colors.$main-red;
    border-color: colors.$darker-creamy;
    color: white;
    display: flex;
    align-items: center;
    width: 90px;
    cursor: pointer;

    &:hover {
        background: colors.$intense-red;
        border-color: colors.$creamy;
    }

    .icon {
        width: 50px;
        height: 50px;
    }
}

.logo {
    float: left;
    margin-right: 60px;

    > div {
        transform: translateX(60px) translateY(24px) rotate(45deg);
    }

    .logo-black-cell {
        height: 30px;
        width: 30px;
        background: black;
        border: 0px solid white;
        padding: 4px 4px 0 0;
        margin: 2px;
        transition: all $transition-length;
    }

    .logo-container-cell {
        height: 30px;
        width: 30px;
        padding: 4px 4px 0 0;
        margin: 2px;
        background: none;
        border: none;
        transition: all $transition-length;
    }

    .logo-red-cell {
        height: 40%;
        width: 40%;
        background: colors.$logo-red;
        border: none;
        margin: 10% 10% 0 0;
    }
}

.menu-text {
    font-family: fonts.$main-font;
    font-weight: bold;
    font-size: 1.5em;
    transition: all $transition-length;
}

.logo-text-1 {
    color: colors.$logo-red;
}

.logo-text-2 {
    color: black;
}

.menu-trapeze.menu-small {
    left: -160px;
}

.menu-segment.menu-small {
    border-bottom-width: 4px;
    border-right-width: 5.65px;
    height: 90px;
    padding: 0 20px 0 30px;

    &:first-child {
        width: 120px;
    }

    &:nth-child(2) {
        width: 60px;
    }

    .logo-black-cell,
    .logo-container-cell {
        height: 20px;
        width: 20px;
        padding: 3px 3px 0 0;
        margin: 2px;
        transition: all $transition-length;
    }
}
</style>
