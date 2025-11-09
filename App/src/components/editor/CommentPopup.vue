<template>
    <div class="comment-editor" :style="positionStyle || undefined">
        <textarea v-model="commentText" @paste.stop ref="commentEditor" @keydown.esc="close()"></textarea>
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
        <button @click="close()" class="apply-button">Zatwierdź</button>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue';
import { allComments } from './shared-state';
import { Point } from '../../models/point';

const props = defineProps<{
    id: string;
    pos: Point;
}>();

const emit = defineEmits<{ (event: 'closed'): void }>();

const commentText = ref<string>('');
const hidden = ref<boolean>(false);
const positionStyle = ref<Record<string, string> | null>(null);
const commentEditor = ref<HTMLElement | null>(null);

function save(id: string | null) {
    if (id == null) {
        return;
    }
    allComments.value[id] ??= { text: '', hidden: false };
    allComments.value[id].text = commentText.value;
    allComments.value[id].hidden = hidden.value;
}

function setId() {
    allComments.value[props.id] ??= { text: '', hidden: false };
    commentText.value = allComments.value[props.id].text;
    hidden.value = allComments.value[props.id].hidden;
    nextTick(() => commentEditor.value?.focus());
}

function setPosition() {
    positionStyle.value = {
        left: `${props.pos.x + window.pageXOffset}px`,
        top: `${props.pos.y + window.pageYOffset}px`,
    };
}

function close() {
    save(props.id);
    emit('closed');
}

onMounted(() => {
    setId();
    setPosition();
});

watch(
    () => props.id,
    (_curr, prev) => {
        save(prev);
        setId();
    },
);

watch(
    () => props.pos,
    () => setPosition(),
);
</script>

<style scoped lang="scss">
@use '@/style/global';
@use '@/style/colors';

.comment-editor {
    display: inline-block;
    position: absolute;
    margin-left: -330px;
    margin-top: 12px;
    width: 250px;
    height: 170px;
    z-index: 2;
    background: black;
    border-radius: 15px 0 15px 15px;
    color: white;
    padding: 10px;

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
    .apply-button {
        background: white;
        color: black;
        float: right;
    }

    &:after {
        content: '';
        position: absolute;
        right: -29px;
        top: 0;
        width: 0;
        height: 0;
        border-right: 30px solid transparent;
        border-top: 30px solid black;
    }
}
</style>
