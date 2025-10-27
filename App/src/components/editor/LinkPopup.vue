<template>
    <div class="link-editor">
        Link do lekcji
        <dropdown
            :class="{ 'link-dropdown': true }"
            @click.native="getLessons()"
            @selected="selectLesson($event)"
            :arrow="true"
        >
            <template v-slot:placeholder>{{ selectedLesson }}</template>
            <dropdown-option
                v-for="(lesson, i) in lessons"
                :key="i"
                :class="{ 'link-dropdown-option': true }"
                v-bind:value.attr="lesson.title"
            >
                {{ lesson.title }}
            </dropdown-option>
        </dropdown>
        Rozdział
        <dropdown
            :class="{ 'link-dropdown': true }"
            @click.native="getChapters()"
            @selected="selectChapter($event)"
            :arrow="true"
        >
            <template v-slot:placeholder>{{ selectedChapter }} </template>
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
import { LessonData } from './lessons-transform';

const props = defineProps<{ href?: string }>();
const emit = defineEmits<{ (event: 'updated', url: string): void }>();

const selectedLesson = ref('');
const selectedChapter = ref('');
const lessons = ref([{ title: 'Ładowanie...' }]);
const chapters = ref([{ name: 'Nie wybrano', disabled: true }]);

let url = '';

watch(
    () => props.href,
    () => {
        url = props.href || '';
        let lessonUrl;
        [lessonUrl, selectedChapter.value] = url.split('#');
        if (lessonUrl) {
            getLessons().then(
                (lessons) => (selectedLesson.value = lessons.find((l) => '/lesson/' + l.title == lessonUrl)!.title),
            );
        } else {
            selectedLesson.value = '';
        }
    },
);

function getLessons() {
    if (lessons.value.length == 1) {
        return import(`@/assets/current-lesson-graph.json`).then((file) => {
            lessons.value = file.default;
            return Promise.resolve(lessons.value);
        });
    } else {
        return Promise.resolve(lessons.value);
    }
}

function getChapters() {
    if (selectedLesson.value) {
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
    }
}

function selectLesson(lesson: string) {
    selectedLesson.value = lesson;
    url = '/lesson/' + lessons.value.find((l) => l.title == lesson)!.title;
    selectedChapter.value = '';
    emit('updated', url);
}

function selectChapter(chapter: string) {
    selectedChapter.value = chapter;
    url = '/lesson/' + lessons.value.find((l) => l.title == selectedLesson.value)!.title + '#' + chapter;
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
    display: inline-block;
    position: absolute;
    margin-left: -145px;
    margin-top: -230px;
    width: 322px;
    height: 185px;
    background: black;
    border-radius: 15px;
    color: white;
    padding: 10px;

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

    &:after {
        content: '';
        position: absolute;
        left: calc(50% - 20px);
        bottom: -20px;
        width: 0;
        height: 0;
        border-left: 20px solid transparent;
        border-right: 20px solid transparent;
        border-top: 20px solid black;
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
