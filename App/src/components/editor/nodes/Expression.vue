<template>
    <node-view-wrapper :as="spanOrDiv">
        <component
            :is="spanOrDiv"
            v-show="!mathJax"
            class="math-placeholder"
            :class="{ block: !isInline }"
            @click="edit()"
        >
            Wprowadź wyrażenie matematyczne
        </component>
        <component :is="spanOrDiv" v-show="mathJax" ref="output" class="math-display" @dblclick="edit()" />
        <div v-if="displayPopup" class="math-editor">
            <editor-content v-if="mathJaxEditor" class="math-code-editor" :editor="mathJaxEditor" />
            <div class="config">
                <button
                    type="button"
                    :class="{ active: isInline }"
                    @mousedown.prevent
                    @click="setDisplayMode('inline')"
                >
                    Inline
                </button>
                <button
                    type="button"
                    :class="{ active: !isInline }"
                    @mousedown.prevent
                    @click="setDisplayMode('block')"
                >
                    Block
                </button>
            </div>
        </div>
    </node-view-wrapper>
</template>

<script setup lang="ts">
import Document from '@tiptap/extension-document';
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import Text from '@tiptap/extension-text';
import { Editor, EditorContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3';
import latex from 'highlight.js/lib/languages/latex';
import { createLowlight } from 'lowlight';
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';

type ExpressionDisplayMode = 'inline' | 'block';

const lowlight = createLowlight();
lowlight.register('latex', latex);

const props = defineProps(nodeViewProps);

const mathJaxDirty = ref('');
const displayPopup = ref(false);
const isDetaching = ref(false);
const output = ref<HTMLElement>();
const mathJaxEditor = ref<Editor | null>(null);

const isInline = computed(() => props.node.type.name === 'expressionInline');
const spanOrDiv = computed(() => (isInline.value ? 'span' : 'div'));
const mathJaxWrapper = computed(() => (isInline.value ? '$' : '$$'));

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
    if (consumeOpenEditorAfterToggle() || (isInline.value && !mathJax.value)) {
        edit();
    }
});

onBeforeUnmount(() => {
    isDetaching.value = true;
    destroyMathJaxEditor();
});

function edit() {
    mathJaxDirty.value = mathJax.value;
    displayPopup.value = true;
    createMathJaxEditor();
    nextTick(() => mathJaxEditor.value!.commands.focus('end'));
}

function applyEdit() {
    if (isDetaching.value) {
        return;
    }

    mathJax.value = mathJaxDirty.value;
    updateView();
    destroyMathJaxEditor();
    if (isInline.value) {
        nextTick(() => output.value!.focus());
    }
}

function setDisplayMode(mode: ExpressionDisplayMode) {
    if ((mode === 'inline') === isInline.value) {
        return;
    }

    isDetaching.value = true;
    props.editor.commands.toggleExpressionDisplayMode({
        pos: props.getPos()!,
        mathJax: mathJaxDirty.value,
    });
    destroyMathJaxEditor();
}

function consumeOpenEditorAfterToggle() {
    const storage = props.editor.storage.expression
    const value = storage.openEditorAfterToggle;
    storage.openEditorAfterToggle = false;
    return value;
}

function createMathJaxEditor() {
    destroyMathJaxEditor();

    mathJaxEditor.value = new Editor({
        content: {
            type: 'doc',
            content: [
                {
                    type: 'codeBlock',
                    attrs: { language: 'latex' },
                    content: mathJaxDirty.value ? [{ type: 'text', text: mathJaxDirty.value }] : [],
                },
            ],
        },
        extensions: [
            Document,
            Text,
            CodeBlockLowlight.configure({
                lowlight,
                defaultLanguage: 'latex',
            }),
        ],
        editorProps: {
            handleKeyDown: (view, event) => {
                event.stopPropagation();

                if (event.key === 'Tab') {
                    event.preventDefault();
                    view.dispatch(view.state.tr.insertText('    '));
                    return true;
                }

                if (event.key === 'Enter') {
                    event.preventDefault();
                    if (event.shiftKey) {
                        view.dispatch(view.state.tr.insertText('\n'));
                    } else {
                        applyEdit();
                    }
                    return true;
                }

                if (event.key === 'Escape') {
                    event.preventDefault();
                    applyEdit();
                    return true;
                }

                return false;
            },
            handleDOMEvents: {
                paste: (_view, event) => {
                    event.stopPropagation();
                    return false;
                },
            },
        },
        onBlur: () => applyEdit(),
        onUpdate: ({ editor }) => {
            mathJaxDirty.value = editor.getText();
        },
    });
}

function destroyMathJaxEditor() {
    mathJaxEditor.value?.destroy();
    mathJaxEditor.value = null;
}

function updateView() {
    displayPopup.value = false;
    output.value!.innerHTML = mathJaxWrapper.value + mathJax.value + mathJaxWrapper.value;
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

    &.block {
        min-height: 27px;
        line-height: 27px;
        text-align: center;
    }
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

    .math-code-editor {
        flex: 1;
        height: 100%;
        background: rgba(colors.$gray, 0.85);
        backdrop-filter: blur(10px);
        overflow: auto;

        :deep(pre) {
            min-height: 100%;
            margin: 0;
            padding: 10px;
            font-family: fonts.$geometric-font;
            white-space: pre-wrap;
            tab-size: 4;
            line-height: 1.3em;
        }

        :deep(code) {
            border: none;
            font-family: inherit;
            color: #444444;
        }
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

            &.active {
                background: #777777;
            }

            &:not(.active):hover {
                background: #888888;
            }
        }
    }
}
::placeholder {
    color: colors.$dark-gray;
}

:deep(.hljs-keyword) {
    font-weight: bold;
    color: colors.$primary-token;
}
:deep(.hljs-built_in) {
    font-weight: bold;
    color: colors.$secondary-token;
}

:deep(.hljs-string) {
    color: colors.$string;
}
:deep(.hljs-comment) {
    color: colors.$comment;
}
:deep(.hljs-params) {
    font-weight: bold;
}
</style>
