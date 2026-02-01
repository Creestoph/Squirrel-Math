<template>
    <div
        class="link-editor"
        :class="{ top: props.pos.top, bottom: !props.pos.top }"
        :style="{ '--shift': `${props.pos.shift}px` }"
    >
        Link do lekcji
        <dropdown
            :class="{ 'link-dropdown': true }"
            :arrow="true"
            :selectedOption="selectedLesson"
            @selected="selectLesson($event)"
        >
            <dropdown-option
                v-for="(lesson, i) in lessons"
                :key="i"
                :class="{ 'link-dropdown-option': true }"
                v-bind:value.attr="lesson"
            >
                {{ lesson }}
            </dropdown-option>
        </dropdown>
        Rozdział
        <dropdown
            :class="{ 'link-dropdown': true }"
            :arrow="true"
            :selectedOption="selectedChapter"
            @click.native="getChapters()"
            @selected="selectChapter($event)"
        >
            <dropdown-option
                v-for="(chapter, i) in chapters"
                :key="i"
                :disabled="chapter.disabled"
                :class="{ 'link-dropdown-option': true }"
                v-bind:value.attr="chapter.name"
            >
                {{ chapter.name }}
            </dropdown-option>
        </dropdown>
        <button class="navigate-button" @click="navigate()">Odwiedź stronę</button>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import Dropdown from './Dropdown.vue';
import DropdownOption from './DropdownOption.vue';
import { LessonData } from '@/models/lesson';
import { lessonTree } from '@/utils/lesson-tree';

const props = defineProps<{ href?: string; pos: { top: boolean; shift: number } }>();
const emit = defineEmits<{ (event: 'updated', url: string): void }>();

const selectedLesson = ref('');
const selectedChapter = ref('');
const chapters = ref<{ name: string; disabled: boolean }[]>([]);

const lessons = lessonTree.allLessonNames();
let url = '';

watch(
    () => props.href,
    () => {
        url = props.href || '';
        let lessonUrl;
        [lessonUrl, selectedChapter.value] = url.split('#');
        selectedLesson.value = lessonUrl ? lessons.find((l) => '/lesson/' + l == lessonUrl)! : '';
    },
);

function getChapters() {
    if (selectedLesson.value) {
        chapters.value = [{ name: 'Ładowanie...', disabled: true }];
        import(`@/assets/lessons/${selectedLesson.value}.json`).then(
            (file: LessonData) => {
                const fileChapters = file.long!.content.filter((c) => c.type == 'chapter');
                if (fileChapters.length) {
                    chapters.value = fileChapters.map((c) => {
                        const chapterName = c
                            .content![0].content!.map((node) => {
                                if (node.text) {
                                    return node.text;
                                }
                                if (node.type === 'expressionInline') {
                                    return '$' + node.attrs!.mathJax + '$';
                                }
                            })
                            .join('');
                        return { name: chapterName, disabled: false };
                    });
                } else {
                    chapters.value = [
                        {
                            name: 'Lekcja nie posiada rozdziałów',
                            disabled: true,
                        },
                    ];
                }
            },
            () => {
                chapters.value = [
                    {
                        name: 'Lekcja nie posiada rozdziałów',
                        disabled: true,
                    },
                ];
            },
        );
    } else {
        chapters.value = [{ name: 'Nie wybrano lekcji', disabled: true }];
    }
}

function selectLesson(lesson: string) {
    selectedLesson.value = lesson;
    url = '/lesson/' + lessons.find((l) => l == lesson)!;
    selectedChapter.value = '';
    emit('updated', url);
}

function selectChapter(chapter: string) {
    selectedChapter.value = chapter;
    url = '/lesson/' + lessons.find((l) => l == selectedLesson.value)! + '#' + chapter;
    emit('updated', url);
}

function navigate() {
    if (url) {
        window.open(url, '_blank');
    }
}
</script>

<style scoped lang="scss">
@use '@/style/global';
@use '@/style/fonts';

.link-editor {
    width: 322px;
    height: 185px;
    background: black;
    border-radius: 15px;
    color: white;
    padding: 10px;

    &:after {
        content: '';
        position: absolute;
        left: calc(50% - 20px - var(--shift));
        width: 0;
        height: 0;
        border-left: 20px solid transparent;
        border-right: 20px solid transparent;
    }

    &.top {
        margin-top: 165px; // minimum to ensure the popup doesnt collide with (expanded) editor menu
        &:after {
            bottom: -20px;
            border-top: 20px solid black;
        }
    }

    &.bottom {
        margin-bottom: 165px;
        &:after {
            top: -20px;
            border-bottom: 20px solid black;
        }
    }

    .navigate-button {
        border-radius: 6px;
        padding: 3px 6px;
        background-color: black;
        color: white;
        border: 1px solid white;
        transition:
            background-color 0.2s,
            color 0.2s;

        &:hover {
            background-color: white;
            color: black;
        }
    }
}

.link-dropdown {
    height: 25px;
    min-width: 100px;
    max-width: 310px;
    border-bottom: 1px solid white;
    margin-bottom: 20px;
    background: black;
    color: white;
}
.link-dropdown-option {
    background: white;
    color: black;
    line-height: 1.5em;
    &:hover {
        background: black;
        color: white;
    }
}
</style>
