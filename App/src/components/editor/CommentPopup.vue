<template>
    <div class="comment-editor" :class="toLeft ? 'left' : 'right'">
        <textarea v-model="commentText" @paste.stop ref="commentEditor"></textarea>
        <button
            @click="hidden = !hidden"
            class="mode-button"
            :class="{ 'visible-mode': !hidden }"
            :title="`Zmień tryb wyświetlania komentarza. 
    Ukryte komentarze wyświetlają się tylko po najechaniu myszą na odpowiadający fragment tekstu. 
    Komentarze widoczne sygnalizowane są przy pomocy symbolu pytajnika.
    Obecny tryb: ${hidden ? 'Ukryty' : 'Widoczny'}`"
        >
            Tryb: {{ hidden ? 'Ukryty' : 'Widoczny' }}
        </button>
        <button @click="onDeleteComment()" class="delete-button">Usuń</button>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue';
import { allComments } from './shared-state';

const props = defineProps<{
    id: number | null;
    toLeft: boolean;
}>();

const emit = defineEmits<{
    delete: [id: number];
}>();

const commentText = ref<string>('');
const hidden = ref<boolean>(false);
const commentEditor = ref<HTMLElement | null>(null);

watch(
    () => props.id,
    (_curr, prev) => {
        save(prev);
        setId();
    },
);

watch([commentText, hidden], () => {
    save(props.id);
});

onMounted(() => {
    setId();
});

function save(id: number | null) {
    if (id === null || !allComments.value[id]) {
        return;
    }
    allComments.value[id].text = commentText.value;
    allComments.value[id].hidden = hidden.value;
}

function setId() {
    if (!props.id) {
        return;
    }
    allComments.value[props.id] ??= { text: '', hidden: false };
    commentText.value = allComments.value[props.id].text;
    hidden.value = allComments.value[props.id].hidden;
    nextTick(() => commentEditor.value?.focus());
}

function onDeleteComment() {
    if (props.id !== null) {
        emit('delete', props.id);
    }
}
</script>

<style scoped lang="scss">
@use '@/style/global';
@use '@/style/colors';

.comment-editor {
    display: inline-block;
    position: absolute;
    margin-top: 12px;
    width: 250px;
    height: 170px;
    z-index: 2;
    background: black;
    color: white;
    padding: 10px;

    &.left {
        margin-left: -340px;
        border-radius: 15px 0 15px 15px;
    }

    &.right {
        margin-left: 70px;
        border-radius: 0 15px 15px 15px;
    }

    &:after {
        content: '';
        position: absolute;
        top: 0;
        width: 0;
        height: 0;
        border-top: 30px solid black;
    }

    &.left:after {
        right: -29px;
        border-right: 30px solid transparent;
    }

    &.right:after {
        left: -29px;
        border-left: 30px solid transparent;
    }

    textarea {
        display: block;
        outline: none;
        background: black;
        color: colors.$gray;
        border: none;
        width: 250px;
        height: 120px;
        margin-bottom: 10px;
        padding: 0;
        resize: none;
    }
    button {
        border-radius: 5px;
        padding: 5px 10px;
    }
    .mode-button {
        background: black;
        color: white;
        border: 1px solid white;
    }
    .delete-button {
        background: colors.$main-red;
        color: white;
        float: right;
    }
}
</style>
