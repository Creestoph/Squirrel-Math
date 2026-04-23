<template>
    <node-view-wrapper class="proof">
        <div class="wrappper">
            <dropdown showOnHover>
                <template v-slot:placeholder>
                    <div class="proof-sticker">{{ label }}</div>
                </template>
                <dropdown-option v-for="(option, i) in availableOptions" :key="i" @click="chooseLabel(option)">
                    {{ option }}
                </dropdown-option>
            </dropdown>

            <span :class="required.length == 0 ? 'required-optional' : 'required-strong'">Wymagane:</span>
            <dropdown
                class="required"
                v-for="(required, j) in required"
                showOnHover
                :key="'required' + j"
                @mouseenter="updateAvailableLessons(j)"
            >
                <template v-slot:placeholder>
                    <div class="required-label">
                        {{ required }}
                        <span @click="removeRequired(j)" class="cross">⨯</span>
                    </div>
                </template>
                <dropdown-option v-for="(lesson, i) in availableLessons" :key="i" @click="chooseLesson(j, lesson)">
                    {{ lesson }}
                </dropdown-option>
            </dropdown>
            <span class="add-required-button" v-if="canAddNewRequired()" @click="addRequiredLesson()">+</span>
        </div>
        <node-view-content />
    </node-view-wrapper>
</template>

<script setup lang="ts">
import { lessonTree } from '@/utils/lesson-tree';
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3';
import { computed, ref } from 'vue';
import Dropdown from '../Dropdown.vue';
import DropdownOption from '../DropdownOption.vue';

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

.proof {
    padding-top: 0;
}

.wrappper {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-left: -31px;
}

.wrappper:hover {
    z-index: 2;
    .cross {
        display: block;
    }
    .proof-sticker {
        width: 85px;
    }
    .required-label {
        min-width: 50px;
    }
    .add-tag-button,
    .required-optional,
    .add-required-button {
        display: inline-block;
    }
}

[dropdown-option] {
    padding: 2px 8px;
    font-size: 0.9em;
}

.required {
    height: 31px;
}
.required-label {
    display: flex;
    align-items: center;
    padding: 0 12px;
    background: colors.$light-gray;
    color: colors.$darker-gray;
    font-size: 0.9em;
    font-weight: bold;
    white-space: nowrap;

    .cross {
        display: none;
        font-size: 2em;
        height: 31px;
        line-height: 24px;
        cursor: pointer;
    }
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
    display: none;
    width: 70px;
    height: 31px;
    line-height: 27px;
    margin-left: 5px;
    font-family: fonts.$geometric-font;
    font-size: 2em;
    color: colors.$darker-gray;
    cursor: pointer;
}
</style>
