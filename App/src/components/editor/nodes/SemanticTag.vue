<template>
    <node-view-wrapper class="tags-wrapper">
        <dropdown v-for="(tag, j) in tags" :key="'tag' + j" showOnHover class="tag-dropdown">
            <template #placeholder>
                <div class="type">
                    {{ tag }}
                    <span v-if="tags.length > 1" @click="removeTag(j)" class="cross">⨯</span>
                </div>
            </template>
            <dropdown-option
                v-for="(option, i) in availableOptions(j)"
                :key="i"
                @click="choose(j, option)"
                class="tag-option no-selection"
            >
                {{ option }}
            </dropdown-option>
        </dropdown>
        <span v-if="canAddTag()" @click="addTag()" class="add-tag-button no-selection">+</span>

        <span :class="required.length == 0 ? 'required-optional' : 'required-strong'" class="no-selection">
            Wymagane:
        </span>
        <dropdown
            class="required"
            v-for="(required, j) in required"
            showOnHover
            :key="'required' + j"
            @mouseenter="updateAvailableLessons(j)"
        >
            <template #placeholder>
                <div class="required-label">
                    {{ required }}
                    <span @click="removeRequired(j)" class="cross no-selection">⨯</span>
                </div>
            </template>
            <dropdown-option
                class="no-selection"
                v-for="(lesson, i) in availableLessons"
                :key="i"
                @click="chooseLesson(j, lesson)"
            >
                {{ lesson }}
            </dropdown-option>
        </dropdown>
        <span class="add-required-button no-selection" v-if="canAddNewRequired()" @click="addRequiredLesson()">+</span>
    </node-view-wrapper>
</template>

<script setup lang="ts">
import { lessonTree } from '@/utils/lesson-tree';
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3';
import { computed, ref } from 'vue';
import Dropdown from '../Dropdown.vue';
import DropdownOption from '../DropdownOption.vue';

const props = defineProps(nodeViewProps);

const futureLesson = 'Lekcja jeszcze niedostępna';
const allLessons = [...lessonTree.allLessonNames(), futureLesson];
const availableLessons = ref<string[]>(allLessons);

const tags = computed({
    get() {
        return props.node.attrs.tags;
    },
    set(tags) {
        props.updateAttributes({ tags });
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

function availableOptions(position: number) {
    if (position == 0 && tags.value.length == 1) {
        return ['Intuicje', 'Formalnie', 'Rozszerzenie', 'Warsztat'];
    } else if (position == 0 && tags.value.length == 2) {
        return ['Intuicje', 'Formalnie', 'Warsztat'];
    } else {
        return ['Rozszerzenie'];
    }
}

function choose(position: number, option: string) {
    const newTags = [...tags.value];
    newTags[position] = option;
    tags.value = newTags;
}

function canAddTag() {
    return tags.value.length == 1 && tags.value[0] != 'Rozszerzenie';
}

function removeTag(position: number) {
    tags.value.splice(position, 1);
}

function addTag() {
    tags.value = [...tags.value, 'Rozszerzenie'];
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
</script>

<style scoped lang="scss">
@use '@/style/global';
@use '@/style/colors';
@use '@/style/fonts';
@use '@/style/semantic-tag';

.tags-wrapper {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

.tags-wrapper:hover {
    .type {
        width: 98px;
    }
    .add-tag-button,
    .required-optional,
    .add-required-button {
        display: inline-block;
    }
}

.tag-dropdown {
    margin-right: 5px;

    [dropdown-option] {
        width: 100px;
    }
}

.cross {
    display: none;
    float: right;
    font-size: 2em;
    cursor: pointer;
    .tags-wrapper:hover & {
        display: block;
    }
}

[dropdown-option] {
    padding: 2px 8px;
    font-size: 0.9em;
}

.add-tag-button {
    font-family: fonts.$geometric-font;
    font-size: 2em;
    color: colors.$main-red;
    margin-left: 5px;
    display: none;
    cursor: pointer;
    height: 30px;
    line-height: 27px;
}

.required {
    min-width: 50px;
}

.required-label {
    background: colors.$light-gray;
    color: colors.$darker-gray;
    font-size: 0.9em;
    font-weight: bold;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    font-family: fonts.$secondary-font;
    margin-right: 5px;
}
.required-optional {
    @extend .required-label;
    margin-left: 30px;
    margin-right: 5px;
    display: none;
}
.required-strong {
    @extend .required-label;
    color: black;
    margin-right: 5px;
    .tags-wrapper:hover & {
        margin-left: 30px;
    }
}
.add-required-button {
    font-family: fonts.$geometric-font;
    font-size: 2em;
    color: colors.$darker-gray;
    margin-left: 5px;
    display: none;
    cursor: pointer;
    height: 30px;
    line-height: 27px;
}
</style>
<style lang="scss">
.tags-wrapper + * {
    margin-top: 0px;
}
</style>
