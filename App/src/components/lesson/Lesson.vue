<template>
    <div>
        <div id="whole">
            <div class="lesson" :style="{ left: lessonLeftPos }">
                <lesson-version-button v-if="showVersionButton" @click.native="toggleMode()" :shortMode="shortMode" />
                <button
                    id="expand-button"
                    class="no-selection"
                    :style="{ marginTop: expandButtonPosition + 'px' }"
                    @click="lessonHidden ? expandLesson() : hideLesson()"
                >
                    {{ expandButtonContent }}
                </button>
                <router-link v-if="content" id="edit-button" tag="a" :to="'/editor/' + content">
                    Edytuj lekcję <icon>edit</icon>
                </router-link>

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
                            :optional="chapter[0].attrs && chapter[0].attrs.isHidden"
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
                            :optional="chapter[0].attrs && chapter[0].attrs.isHidden"
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
        </div>
        <div class="footer-container">
            <div class="footer">
                <h1>
                    <a href="mailto: oblicze.calki@gmail.com">
                        Skontaktuj się z nami!<br />
                        oblicze.calki@gmail.com
                    </a>
                </h1>
                Strona jest nadal w trakcie rozwoju. <br />
                Jeśli podoba Ci się inicjatywa i chciałbyś wesprzeć proces tworzenia Squirrel-Math, masz jakiekolwiek
                pytania lub sugestie - ślij do nas maila. <br />
                Jesteśmy otwarci na każdą pomoc.
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
declare var MathJax: any;

const props = defineProps<{ inputContent?: string }>();
const proxy = getCurrentInstance()!.proxy;

const lessonHidden = ref(true);
const shortMode = ref(false);
const expandButtonContent = ref('<');
const expandButtonPosition = ref<number>(undefined!);
const lessonLeftPos = ref<string>(undefined!);

interface LessonElements {
    title: { type: NodeType; text: string };
    introElements: NodeData[];
    chapters: NodeData[][];
}

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

clearElements();

onMounted(() => loadLesson());

onUnmounted(() => window.removeEventListener('scroll', moveExpandButton));

function loadLesson() {
    expandLesson();
    window.addEventListener('scroll', moveExpandButton);
    setContent();
}

function setContent() {
    clearElements();
    if (content.value) {
        import(`@/assets/lessons/${content.value}`).then((loadedJson) => {
            const json = JSON.parse(JSON.stringify(loadedJson)) as LessonData; // deep clone
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
            allComments.value = json.comments;
            lessonImages.value = json.images || {};
            nextTick(() => MathJax.Hub.Queue(['Typeset', MathJax.Hub]));
        });
    } else {
        MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
    }
}

function hideLesson() {
    if (!lessonHidden.value) {
        lessonLeftPos.value = '-80%';
        lessonHidden.value = true;
        setTimeout(() => (expandButtonContent.value = '>'), 1000);
    }
}

function expandLesson() {
    if (lessonHidden.value) {
        lessonLeftPos.value = '0';
        lessonHidden.value = false;
        setTimeout(() => (expandButtonContent.value = '<'), 1000);
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

#whole {
    background-color: colors.$dark-gray;
    margin: 0;
}

#expand-button {
    position: absolute;
    width: 70px;
    height: 70px;
    background: colors.$main-red;
    right: -40px;
    top: 300px;
    border: 5px solid colors.$dark-red;
    border-radius: 40px;
    color: white;
    font-size: 3em;
    line-height: 0.5em;
    text-align: center;
    font-family: fonts.$geometric-font;
    padding: 0;
    box-shadow: none;
    transition: margin-top 0.5s;
}

#edit-button {
    position: absolute;
    top: 110px;
    right: 30px;
    background: none;
    color: colors.$dark-gray;
    &:hover {
        color: colors.$darker-gray;
        svg {
            fill: colors.$darker-gray;
        }
    }

    svg {
        width: 24px;
        height: 24px;
        fill: colors.$dark-gray;
        transform: scale(0.7);
    }
}

.lesson {
    position: relative;
    font-family: fonts.$main-font;
    color: black;
    background: white;
    clear: both;
    left: -80%;
    transition: left 1s;
}

@media screen and (max-width: 500px) {
    .lesson-content {
        padding: 100px 25px 35px 25px;
    }
}

@media screen and (max-width: 1200px) {
    .lesson-content {
        padding: 100px calc(6% + 25px) 35px calc(6% + 25px);
    }
    #expand-button {
        display: none;
    }
}

@media screen and (min-width: 1200px) {
    .lesson {
        margin-right: 14%;
        line-height: 1.7em;
        border-right: 3px solid black;
        box-shadow: 0 0 40px 20px rgba(0, 0, 0, 0.3);
    }

    .lesson-content {
        padding: 120px calc(7% + 25px) 35px calc(23% + 25px);
        margin: auto;
        max-width: 970px;
        min-height: 899px;
    }

    .footer-container {
        border-right: 14vw solid transparent;
    }
}

.footer-container {
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    height: 0;
    border-bottom: 170px solid colors.$dark-red;
    filter: drop-shadow(3px -3px 10px rgba(0, 0, 0, 0.5));
}
.footer {
    padding: 20px;
    font-family: fonts.$secondary-font;
    color: rgba(255, 255, 255, 0.8);
    background: colors.$dark-red;

    h1 {
        font-size: 1.2em;
        color: white;
        &:hover {
            text-decoration: underline;
            cursor: pointer;
        }
    }
}
</style>
