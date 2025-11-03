<template>
    <node-view-wrapper class="tags-wrapper">
        <div class="dropdown" v-for="(tag, j) in tags" :key="'tag' + j">
            <div class="type">
                {{ tag }}
                <span v-if="tags.length > 1" @click="removeTag(j)" class="cross">⨯</span>
            </div>
            <div v-if="availableOptions(j).length > 1" class="dropdown-list">
                <div
                    class="dropdown-position"
                    v-for="(option, i) in availableOptions(j)"
                    :key="i"
                    @click="choose(j, option)"
                >
                    {{ option }}
                </div>
            </div>
        </div>
        <span v-if="canAddTag()" @click="addTag()" class="add-tag-button">+</span>

        <span :class="required.length == 0 ? 'required-optional' : 'required-strong'">Wymagane:</span>
        <div class="required dropdown" v-for="(required, j) in required" :key="'required' + j">
            <div class="required-label">
                {{ required }}
                <span @click="removeRequired(j)" class="cross">⨯</span>
            </div>
            <div class="dropdown-list">
                <div
                    class="dropdown-position"
                    v-for="(lesson, i) in availableLessons"
                    :key="i"
                    @click="chooseLesson(j, lesson.title)"
                >
                    {{ lesson.title }}
                </div>
            </div>
        </div>
        <span class="add-required-button" v-if="canAddNewRequired()" @click="addRequiredLesson()">+</span>
    </node-view-wrapper>
</template>

<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3';
import { computed, onMounted, ref } from 'vue';

const props = defineProps(nodeViewProps);

const allLessons = ref<{ title: string }[]>([]);

const tags = computed({
    get() {
        return props.node.attrs.tags;
    },
    set(tags) {
        props.updateAttributes({ tags });
    },
});

const required = computed({
    get() {
        return props.node.attrs.required;
    },
    set(required) {
        props.updateAttributes({ required });
    },
});

const availableLessons = computed(() => allLessons.value.filter((lesson) => !required.value.includes(lesson.title)));

onMounted(() => {
    import(`@/assets/current-lesson-graph.json`).then(
        (file) =>
            (allLessons.value = (file.default as { title: string }[]).concat({
                title: 'Lekcja jeszcze niedostępna',
            })),
    );
});

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
    const newRequired = [...required.value];
    newRequired[position] = lesson;
    required.value = newRequired;
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

.tags-wrapper {
    padding-right: 100px;
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

.dropdown {
    max-width: 120px;
    margin-right: 5px;
}

.tags-wrapper:hover .type {
    width: 110px;
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

.type:hover {
    background: colors.$main-red;
}

.dropdown-list {
    position: absolute;
    z-index: 2;
    display: none;
    background: colors.$light-gray;
    width: 100%;
    max-height: 300px;
    overflow-y: auto;
}

.dropdown:hover .dropdown-list {
    display: block;
}

.dropdown-position {
    padding: 2px 8px;
    font-size: 0.9em;
    cursor: pointer;
    &:hover {
        background: colors.$gray;
    }
}

.add-tag-button {
    font-family: fonts.$geometric-font;
    font-size: 2em;
    color: colors.$main-red;
    margin-left: 5px;
    display: none;
    cursor: pointer;
    height: 31px;
    line-height: 27px;
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
    height: 31px;
    line-height: 31px;
    padding: 0 10px;
    font-family: fonts.$secondary-font;
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
    height: 31px;
    line-height: 27px;
}
.tags-wrapper:hover {
    .add-tag-button,
    .required-optional,
    .add-required-button {
        display: inline-block;
    }
}
</style>
<style lang="scss">
.tags-wrapper + * {
    margin-top: 0px;
}
</style>
