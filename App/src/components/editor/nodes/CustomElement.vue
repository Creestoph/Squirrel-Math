<template>
    <node-view-wrapper class="component-container">
        <div v-show="editMode" class="editor-wrapper">
            <node-view-content class="html-editor" />
            <button @click="run()" title="uruchom">
                <icon>play_arrow</icon>
            </button>
        </div>
        <div v-show="!editMode" class="output-wrapper">
            <div contenteditable="false" v-html="parsed" ref="output" class="output"></div>
            <button @click="edit()" title="edytuj"><icon>edit</icon></button>
        </div>
    </node-view-wrapper>
</template>

<script setup lang="ts">
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3';
import { nextTick, ref } from 'vue';

const props = defineProps(nodeViewProps);

const editMode = ref(true);
const parsed = ref('');
const output = ref<HTMLElement | null>(null);

function run() {
    if (props.node.content && props.node.content.content[0] && props.node.content.content[0].text) {
        parsed.value = props.node.content.content[0].text;
        nextTick(() => runScripts(output.value!));
        editMode.value = false;
    }
}

function runScripts(htmlElement: Element) {
    Array.from(htmlElement.children).forEach((child) => {
        if (child.tagName == 'SCRIPT') {
            const script = child as HTMLScriptElement;
            htmlElement.removeChild(script);
            const childCopy = document.createElement('script');
            childCopy.innerHTML = script.innerHTML;
            if (script.src) {
                childCopy.src = script.src;
            }
            if (script.type) {
                childCopy.type = script.type;
            }
            htmlElement.appendChild(childCopy);
        } else {
            runScripts(child);
        }
    });
}

function edit() {
    editMode.value = true;
}
</script>

<style lang="scss">
@use '@/style/global';
@use '@/style/colors';
@use '@/style/fonts';

.html-editor {
    outline: 1px solid colors.$gray;
    padding: 10px;
    font-family: fonts.$geometric-font;
    font-size: 14px;
    color: colors.$half-gray;
    line-height: 1.61em;

    .hljs-comment {
        color: #56af02;
    }
    .hljs-tag {
        font-weight: bold;
        color: #30017c;
    }
    .hljs-tag.hljs-attr {
        font-weight: normal;
        color: #770434;
    }
    .hljs-tag.hljs-string {
        color: #df8a68;
        font-weight: normal;
    }
    .hljs-symbol {
        font-weight: bold;
    }
}
</style>
<style scoped lang="scss">
@use '@/style/global';
@use '@/style/colors';

.component-container {
    position: relative;
    padding: 0;
}
button {
    position: absolute;
    width: 42px;
    height: 42px;
    right: -1px;
    top: -1px;
    background: white;
    border: 1px solid colors.$gray;
    display: none;
    margin: 0;
    padding: 0;
}
.editor-wrapper:hover button {
    display: block;
}
.output {
    min-height: 42px;
}
.output:hover {
    outline: 1px solid colors.$gray;
}
.output-wrapper {
    white-space: normal; //needed to prevent .ProseMirror style - pre-wrap
}
.output-wrapper:hover button {
    display: block;
}
</style>
