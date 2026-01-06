<template>
    <node-view-wrapper class="proof">
        <div class="wrapper">
            <div class="dropdown">
                <div class="proof-sticker">{{ label }}</div>
                <div class="dropdown-list">
                    <div
                        class="dropdown-position"
                        v-for="(option, i) in availableOptions"
                        :key="i"
                        @click="chooseLabel(option)"
                    >
                        {{ option }}
                    </div>
                </div>
            </div>

            <span :class="required.length == 0 ? 'required-optional' : 'required-strong'">Wymagane:</span>
            <div
                class="required dropdown"
                v-for="(required, j) in required"
                :key="'required' + j"
                @mouseenter="updateAvailableLessons(j)"
            >
                <div class="required-label">
                    {{ required }}
                    <span @click="removeRequired(j)" class="cross">⨯</span>
                </div>
                <div class="dropdown-list">
                    <div
                        class="dropdown-position"
                        v-for="(lesson, i) in availableLessons"
                        :key="i"
                        @click="chooseLesson(j, lesson)"
                    >
                        {{ lesson }}
                    </div>
                </div>
            </div>
            <span class="add-required-button" v-if="canAddNewRequired()" @click="addRequiredLesson()">+</span>
        </div>
        <node-view-content />
    </node-view-wrapper>
</template>

<script setup lang="ts">
import { lessonTree } from '@/utils/lesson-tree';
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3';
import { computed, ref } from 'vue';

const props = defineProps(nodeViewProps);

const availableOptions = ref(['Dowód', 'Uzasadnienie', 'Szkic dowodu']);

const futureLesson = 'Lekcja jeszcze niedostępna';
const allLessons = [...lessonTree.allLessonNames(), futureLesson];
const availableLessons = ref<string[]>(allLessons);

const label = computed({
    get() {
        return props.node.attrs.label;
    },
    set(label) {
        props.updateAttributes({ label });
    },
});

const required = computed({
    get(): string[] {
        return props.node.attrs.required;
    },
    set(required) {
        props.updateAttributes({ required });
    },
});

function chooseLabel(option: string) {
    label.value = option;
}

function addRequiredLesson() {
    required.value = [...required.value, ''];
}

function chooseLesson(position: number, lesson: string) {
    let newRequired = [...required.value];
    newRequired[position] = lesson;
    if (lesson !== '' && lesson !== futureLesson) {
        const requiredByLesson = lessonTree.getAllRequiredLessons([lesson]);
        newRequired = newRequired.filter((r) => !requiredByLesson.has(r));
    }
    required.value = newRequired;
    updateAvailableLessons(position);
}

function removeRequired(position: number) {
    required.value.splice(position, 1);
}

function canAddNewRequired() {
    return (!required.value.length || required.value.at(-1)) && availableLessons.value.length > 0;
}

function updateAvailableLessons(position: number) {
    availableLessons.value = [
        ...new Set(allLessons)
            .difference(
                lessonTree.getAllRequiredLessons(
                    required.value.filter((r, i) => i !== position && r !== futureLesson && r !== ''),
                ),
            )
            .difference(new Set(required.value))
            .values(),
    ];
}
</script>

<style scoped lang="scss">
@use '@/style/global';
@use '@/style/colors';
@use '@/style/fonts';
@use '@/style/proof';

.wrapper {
    padding-right: 100px;
    margin-left: -10px;

    > * {
        float: left;
        margin-bottom: 5px;
    }

    &::after {
        //clearfix
        content: '';
        clear: both;
        display: table;
    }
}

.proof {
    padding-top: 0;
}

.proof-sticker {
    position: static;
    line-height: 30px;
    outline: none;
    margin: 0;
}

.cross {
    display: none;
    float: right;
    font-size: 2em;
    line-height: 1.3em;
    cursor: pointer;
    .wrapper:hover & {
        display: block;
    }
}

.wrapper:hover {
    z-index: 2;
    .proof-sticker {
        width: 100px;
    }
}

.dropdown {
    max-width: 120px;
    margin-right: 5px;
}

.dropdown-list {
    position: absolute;
    display: none;
    z-index: 2;
    background: colors.$light-gray;
    max-height: 300px;
    width: 100%;
    overflow-y: auto;

    .dropdown:hover & {
        display: block;
    }
}

.dropdown-position {
    padding: 2px 8px;
    font-size: 0.9em;
    cursor: pointer;
    &:hover {
        background: colors.$gray;
    }
}

.required {
    min-width: 70px;
    max-width: unset;
    width: max-content;
    .dropdown-list {
        width: 320px;
    }
}
.required-label {
    background: colors.$light-gray;
    color: colors.$darker-gray;
    font-size: 0.9em;
    font-weight: bold;
    height: 40px;
    line-height: 40px;
    padding: 0 12px;
}
.required-optional {
    @extend .required-label;
    margin-right: 5px;
    display: none;
}
.required-strong {
    @extend .required-label;
    color: black;
    margin-right: 5px;
}
.add-required-button {
    font-family: fonts.$geometric-font;
    font-size: 2em;
    color: colors.$darker-gray;
    margin-left: 5px;
    display: none;
    cursor: pointer;
    height: 40px;
    line-height: 40px;
}
.wrapper:hover {
    .add-tag-button,
    .required-optional,
    .add-required-button {
        display: inline-block;
    }
}
</style>
