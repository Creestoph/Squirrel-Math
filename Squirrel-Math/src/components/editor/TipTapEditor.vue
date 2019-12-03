<template>
  <div>
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <button :class="{ 'is-active': isActive.bold() }" @click="commands.bold">
        Bold
      </button>
    </editor-menu-bar>
    <editor-content :editor="editor" />
  </div>
</template>

<script lang="ts">
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import { Bold } from "tiptap-extensions";
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  components: {
    EditorContent,
    EditorMenuBar
  }
})
export default class TipTapEditor extends Vue {
  editor: Editor | null = null;
  mounted() {
    this.editor = new Editor({
      content: "<p>This is just a boring paragraph</p>",
      extensions: [new Bold()]
    });
  }
  beforeDestroy() {
    if (this.editor) this.editor.destroy();
  }
}
</script>