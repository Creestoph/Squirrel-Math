<template>
  <div class="editor">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div>
        <button
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          Bold
        </button>
        <button
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          Italic
        </button>
        <button
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          Underline
        </button>
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          UL
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          OL
        </button>

        <button
          class="menubar__button"
          @click="
            commands.createTable({
              rowsCount: 3,
              colsCount: 3,
              withHeaderRow: false
            })
          "
        >
          table
        </button>

        <span v-if="isActive.table()">
          <button class="menubar__button" @click="commands.deleteTable">
            delete_table
          </button>
          <button class="menubar__button" @click="commands.addColumnBefore">
            add_col_before
          </button>
          <button class="menubar__button" @click="commands.addColumnAfter">
            add_col_after
          </button>
          <button class="menubar__button" @click="commands.deleteColumn">
            delete_col
          </button>
          <button class="menubar__button" @click="commands.addRowBefore">
            add_row_before
          </button>
          <button class="menubar__button" @click="commands.addRowAfter">
            add_row_after
          </button>
          <button class="menubar__button" @click="commands.deleteRow">
            delete_row
          </button>
          <button class="menubar__button" @click="commands.toggleCellMerge">
            combine_cells
          </button>
        </span>
      </div>
    </editor-menu-bar>
    <lesson>
      <editor-content :editor="editor" class="editor__content" />
    </lesson>
  </div>
</template>

<script lang="ts">
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
  Placeholder,
  Bold,
  Italic,
  Underline,
  OrderedList,
  BulletList,
  ListItem,
  Table,
  TableHeader,
  TableCell,
  TableRow
} from "tiptap-extensions";
import Doc from "./Doc";
import Title from "./Title";
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import Lesson from "@/components/lesson/Lesson.vue";

@Component({
  components: {
    EditorContent,
    EditorMenuBar,
    Lesson
  }
})
export default class TipTapEditor extends Vue {
  editor: Editor | null = null;
  mounted() {
    this.editor = new Editor({
      autoFocus: true,
      extensions: [
        new Bold(),
        new Italic(),
        new Underline(),
        new OrderedList(),
        new BulletList(),
        new ListItem(),
        new Table({
          resizable: true
        }),
        new TableHeader(),
        new TableCell(),
        new TableRow(),
        new Doc(),
        new Title(),
        new Placeholder({
          showOnlyCurrent: false,
          emptyNodeText: (node: any) => {
            if (node.type.name === "title") {
              return "Lesson title";
            }
            return "Write something";
          }
        })
      ]
    });
  }
  beforeDestroy() {
    if (this.editor) this.editor.destroy();
  }
}
</script>

<style lang="scss">
.editor {
  *.is-empty::before {
    content: attr(data-empty-text);
    color: #aaa;
    pointer-events: none;
    height: 0;
  }
  h1 {
    text-align: center;
    font-size: 3.2em;
    font-weight: bold;
    font-family: "Corbel";
    margin: 50px auto;
    clear: both;
    line-height: 1em;
  }
  li > p:first-child {
    display: inline;
    margin: 0;
    padding: 0;
  }
  table {
    border-collapse: collapse;
  }
  td {
    border: solid thin black;
    &.selectedCell {
      background: #aaa;
    }
    &>p:first-child {
    display: inline;
    margin: 0;
    padding: 0;
    }
  }
}
</style>