<template>
    <div :class="{ hidden: !isLessonPanelExpanded }">
        <div class="backdrop" @click="isLessonPanelExpanded = false"></div>
        <div class="lesson-with-footer" :style="{ left: lessonLeftPos }">
            <div class="lesson" @click="isLessonPanelExpanded = true">
                <lesson-version-button v-if="showVersionButton" @click.native="toggleMode()" :shortMode="shortMode" />
                <router-link v-if="content" class="edit-button" :to="'/editor/' + content">
                    Edytuj lekcję <icon>edit</icon>
                </router-link>

                <button
                    class="expand-button no-selection"
                    :title="isLessonPanelExpanded ? 'Pokaż drzewo lekcji' : 'Pokaż treść lekcji'"
                    :style="{ left: lessonLeftPos }"
                    @click="
                        isLessonPanelExpanded = !isLessonPanelExpanded;
                        $event.stopPropagation();
                    "
                >
                    {{ expandButtonContent }}
                </button>

                <div class="lesson-content" v-if="shortMode" :key="short.title.text + 'short'">
                    <slot>
                        <lesson-title-short>
                            <block-element :content="short.title"></block-element>
                        </lesson-title-short>
                        <lesson-intro v-if="short.introElements.length">
                            <block-element
                                v-for="(block, i) in short.introElements"
                                :key="i"
                                :content="block"
                            ></block-element>
                        </lesson-intro>
                        <lesson-chapter
                            v-for="(chapter, i) in short.chapters"
                            :key="i"
                            :optional="chapter[0].attrs?.isHidden"
                        >
                            <template #title>
                                <block-element
                                    v-for="(block, i) in chapter[0].content"
                                    :key="i"
                                    :content="block"
                                ></block-element>
                            </template>
                            <block-element
                                v-for="(block, j) in chapter[1].content"
                                :key="j"
                                :content="block"
                            ></block-element>
                        </lesson-chapter>
                    </slot>
                </div>

                <div class="lesson-content" v-if="!shortMode" :key="long.title.text + 'long'">
                    <slot>
                        <lesson-title>
                            <block-element :content="long.title"></block-element>
                        </lesson-title>
                        <lesson-intro v-if="long.introElements.length">
                            <block-element
                                v-for="(block, i) in long.introElements"
                                :key="i"
                                :content="block"
                            ></block-element>
                        </lesson-intro>
                        <lesson-chapter
                            v-for="(chapter, i) in long.chapters"
                            :key="i"
                            :optional="chapter[0].attrs?.isHidden"
                        >
                            <template #title>
                                <block-element
                                    v-for="(block, i) in chapter[0].content"
                                    :key="i"
                                    :content="block"
                                ></block-element>
                            </template>
                            <block-element
                                v-for="(block, j) in chapter[1].content"
                                :key="j"
                                :content="block"
                            ></block-element>
                        </lesson-chapter>
                    </slot>
                </div>
            </div>
            <div class="footer-container" @click="isLessonPanelExpanded = true">
                <div class="footer no-selection">
                    <h1>
                        <a href="mailto: oblicze.calki@gmail.com">
                            Skontaktuj się z nami!<br />
                            oblicze.calki@gmail.com
                        </a>
                    </h1>
                    Strona jest nadal w trakcie rozwoju. <br />
                    Jeśli podoba Ci się inicjatywa i chciałbyś wesprzeć proces tworzenia Squirrel-Math, masz
                    jakiekolwiek pytania lub sugestie - ślij do nas maila. <br />
                    Jesteśmy otwarci na każdą pomoc.
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, onMounted, onUnmounted, Ref, ref, watch } from 'vue';
import LessonTitle from './LessonTitle.vue';
import LessonTitleShort from './LessonTitleShort.vue';
import LessonIntro from './LessonIntro.vue';
import LessonVersionButton from './LessonVersionButton.vue';
import LessonChapter from './chapter/LessonChapter.vue';
import BlockElement from './BlockElement.vue';
import { LessonData, NodeData, NodeType } from '@/models/lesson';
import { allComments, lessonImages } from '../editor/shared-state';
import { useLessonExpandedInfo } from '../utils/menu-bus';
import { deepClone } from '@/utils/utils';

interface LessonElements {
    title: { type: NodeType; text: string };
    introElements: NodeData[];
    chapters: NodeData[][];
}

const props = defineProps<{ inputContent?: string }>();
const proxy = getCurrentInstance()!.proxy!;
const { isLessonPanelExpanded, lessonLeftPos } = useLessonExpandedInfo();

const shortMode = ref(false);
const expandButtonContent = ref('<');
const expandButtonPosition = ref<number>(undefined!);

const long = ref<LessonElements>() as Ref<LessonElements>;
const short = ref<LessonElements>() as Ref<LessonElements>;

const content = computed(() => proxy.$route.params.sourceFile || props.inputContent);

const showVersionButton = computed(
    () => content.value && (shortMode.value ? long.value.title.text : short.value.title.text),
);

watch(
    () => proxy.$route,
    () => loadLesson(),
);

watch(
    () => isLessonPanelExpanded.value,
    () => setTimeout(() => (expandButtonContent.value = isLessonPanelExpanded.value ? '<' : '>'), 1000),
);

clearElements();

onMounted(() => loadLesson());

onUnmounted(() => window.removeEventListener('scroll', moveExpandButton));

function loadLesson() {
    isLessonPanelExpanded.value = true;
    window.addEventListener('scroll', moveExpandButton);
    setContent();
}

function setContent() {
    clearElements();
    if (content.value) {
        import(`@/assets/lessons/${content.value}`).then((loadedJson: LessonData) => {
            const json = deepClone(loadedJson);
            if (json.long) {
                long.value.title = json.long.content[0].content![0] as { type: NodeType; text: string };
                long.value.introElements = json.long.content[1].content!;
                long.value.chapters = json.long.content.filter((_item, i) => i > 1).map((item) => item.content!);
            }
            if (json.short) {
                short.value.title = json.short.content[0].content![0] as { type: NodeType; text: string };
                short.value.introElements = json.short.content[1].content!;
                short.value.chapters = json.short.content.filter((_item, i) => i > 1).map((item) => item.content!);
            }
            allComments.value = json.comments || {};
            lessonImages.value = json.images || {};
            nextTick(() => MathJax.Hub.Queue(['Typeset', MathJax.Hub]));
        });
    } else {
        MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
    }
}

function moveExpandButton() {
    expandButtonPosition.value = window.scrollY;
}

function toggleMode() {
    shortMode.value = !shortMode.value;
    nextTick(() => MathJax.Hub.Queue(['Typeset', MathJax.Hub]));
}

function clearElements() {
    long.value = {
        title: { type: 'text', text: '' },
        introElements: [],
        chapters: [],
    };
    short.value = {
        title: { type: 'text', text: '' },
        introElements: [],
        chapters: [],
    };
}
</script>

<style scoped lang="scss">
@use '@/style/global';
@use '@/style/colors';
@use '@/style/fonts';

.backdrop {
    position: fixed;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(20px);
    transition: opacity 1s;
    cursor: pointer;

    .hidden & {
        cursor: unset;
        opacity: 0;
        pointer-events: none;
    }
}

.lesson-with-footer {
    opacity: 1;
    position: relative;
    transition: left 1s;
    pointer-events: none;

    > * {
        pointer-events: all;
    }
}

.expand-button {
    position: fixed;
    width: 70px;
    height: 70px;
    background: colors.$main-red;
    color: white;
    margin-left: calc(86% - 35px);
    top: calc(50% - 35px);
    border: 5px solid colors.$dark-red;
    border-radius: 40px;
    font-size: 3em;
    text-align: center;
    font-family: fonts.$geometric-font;
    padding: 0;
    box-shadow: none;
    transition: left 1s;
}

.lesson {
    position: relative;
    font-family: fonts.$main-font;
    color: black;
    background: white;
    clear: both;

    .hidden & {
        cursor: pointer;
    }
}

.lesson-content {
    max-width: 970px;
    min-height: 899px;
}

@media screen and (max-width: 1200px) {
    .lesson-content {
        padding: 100px calc(6% + 25px) 35px calc(6% + 25px);
    }
    .expand-button {
        display: none;
    }
}

@media screen and (max-width: 500px) {
    .lesson-content {
        padding: 100px 25px 35px 25px;
    }
}

@media screen and (min-width: 1200px) {
    .lesson {
        width: 86%;
        line-height: 1.7em;
        border-right: 3px solid black;
        box-shadow: 0 0 40px 20px rgba(0, 0, 0, 0.2);
    }

    .lesson-content {
        padding: 120px calc(7% + 25px) 35px calc(23% + 25px);
        margin: auto;
    }

    .footer-container {
        border-right: 13.75vw solid transparent;
        filter: drop-shadow(20px 5px 20px rgba(0, 0, 0, 0.5));
    }
}

.footer-container {
    box-sizing: border-box;
    width: 100%;
    height: 0;
    border-bottom: 170px solid colors.$dark-red;
    filter: drop-shadow(-20px 5px 20px rgba(0, 0, 0, 0.5));

    .hidden & {
        cursor: pointer;
    }

    .footer {
        padding: 20px;
        font-family: fonts.$secondary-font;
        color: rgba(255, 255, 255, 0.8);
        background: colors.$dark-red;

        h1 {
            font-size: 1.2em;
            font-weight: 500;
            line-height: 1.2;
            margin-top: 0;
            margin-bottom: 0.5rem;
            color: white;
            &:hover {
                text-decoration: underline;
                cursor: pointer;
            }
        }
    }
}

.edit-button {
    position: absolute;
    top: 110px;
    right: 30px;
    background: none;
    color: colors.$dark-gray;
    display: flex;
    gap: 5px;

    &:hover {
        color: colors.$darker-gray;
    }
}

@media screen and (max-width: 500px) {
    .edit-button {
        top: 65px;
        right: 10px;
    }
}
</style>
