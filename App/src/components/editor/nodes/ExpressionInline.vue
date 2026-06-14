<template>
    <node-view-wrapper as="span">
        <span v-show="!mathJax" class="math-placeholder" @click="edit()">Wprowadź wyrażenie matematyczne</span>
        <span v-show="mathJax" ref="output" class="math-display" @dblclick="edit()"></span>
        <div v-if="displayPopup" class="math-editor">
            <textarea
                v-model="mathJaxDirty"
                @paste.stop
                ref="mathEditor"
                placeholder="Wprowadź kod MathJax"
                @blur="applyEdit()"
                @keydown.enter="!$event.shiftKey && applyEdit()"
                @keydown.esc="applyEdit()"
            ></textarea>
            <div class="config">
                <button>Inline</button>
                <button>Block</button>
            </div>
        </div>
    </node-view-wrapper>
</template>

<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3';
import { computed, nextTick, onMounted, ref } from 'vue';

const props = defineProps(nodeViewProps);

const mathJaxDirty = ref('');
const displayPopup = ref(false);
const output = ref<HTMLElement>();
const mathEditor = ref<HTMLTextAreaElement>();

const mathJax = computed({
    get() {
        return props.node.attrs.mathJax;
    },
    set(mathJax) {
        props.updateAttributes({ mathJax });
    },
});

onMounted(() => {
    updateView();
    if (!mathJax.value) {
        edit();
    }
});

function edit() {
    mathJaxDirty.value = mathJax.value;
    displayPopup.value = true;
    nextTick(() => mathEditor.value!.focus());
}

function applyEdit() {
    mathJax.value = mathJaxDirty.value;
    updateView();
    nextTick(() => output.value!.focus());
}

function updateView() {
    displayPopup.value = false;
    output.value!.innerHTML = '$' + mathJax.value + '$';
    nextTick(() => MathJax.Hub.Queue(['Typeset', MathJax.Hub]));
}
</script>

<style scoped lang="scss">
@use '@/style/global';
@use '@/style/colors';
@use '@/style/fonts';

.math-placeholder {
    color: colors.$dark-gray;
    cursor: pointer;
}
.math-display {
    user-select: text;
}
.math-placeholder:hover,
.math-display:hover {
    background: rgba(0, 0, 0, 0.07);
    cursor: pointer;
}

.math-editor {
    display: flex;
    width: 100%;
    height: 200px;
    z-index: 3;
    position: fixed;
    left: 0;
    bottom: 0;
    box-shadow: 0 0 500px 15px rgba(0.4, 0.4, 0.4, 0.4);
    border-top: 2px solid black;

    textarea {
        flex: 1;
        height: 100%;
        padding: 10px;
        font-family: fonts.$geometric-font;
        color: #444444;
        background: rgba(colors.$gray, 0.9);
        backdrop-filter: blur(10px);
    }

    .config {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 200px;
        background: colors.$darker-gray;
        border-left: 2px solid black;

        button {
            background: #999999;
            width: 100%;
            height: 50%;

            &:hover {
                background: #888888;
            }
        }
    }
}
::placeholder {
    color: colors.$dark-gray;
}
</style>
