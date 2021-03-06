<template>
  <lesson>
    <editor-menu-bar id="toolbar" :editor="editor" v-slot="{ commands, isActive }">
      <div>
        <div id="tools-managing">
          <button @click="commands.undo">
            undo
          </button>

          <button @click="commands.redo">
            redo
          </button>

           <button @click="save()">
            save
          </button>

          <button @click="clearAll()">
            new
          </button>
        </div>
        <div id="tools-general">
          <button :class="{ 'active': isActive.bold() }" style="font-weight: bold" @click="commands.bold">
            B
          </button>

          <button :class="{ 'active': isActive.italic() }" style="font-style: italic" @click="commands.italic">
            I
          </button>

          <button :class="{ 'active': isActive.strike() }" style="text-decoration: line-through" @click="commands.strike">
            S
          </button>

          <button :class="{ 'active': isActive.underline() }" style="text-decoration: underline" @click="commands.underline">
            U
          </button>

          <button class="menubar__button" :class="{ 'active': isActive.bullet_list() }" @click="commands.bullet_list">
            ◆
          </button>

          <button :class="{ 'active': isActive.ordered_list() }" @click="commands.ordered_list">
            1)
          </button>

          <button @click="commands.createChapter()">
            chapter
          </button>

          <button @click="commands.semantic_tag()">
            section
          </button>

          <button :class="{ 'active': isActive.example() }" @click="commands.example">
            example
          </button>

          <button :class="{ 'active': isActive.formula() }" @click="commands.formula">
            formula
          </button>

          <button :class="{ 'active': isActive.proof() }" @click="commands.proof">
            proof
          </button>

          <button :class="{ 'active': isActive.table() }"
            @click="
              commands.createTable({
                rowsCount: 3,
                colsCount: 3,
                withHeaderRow: true
              })
            "
          >
            table
          </button>
        </div>
        <div class="tools-specific" v-if="isActive.table()">
          <button @click="commands.deleteTable">
            delete table
          </button>
          <button @click="commands.addColumnBefore">
            insert column before
          </button>
          <button @click="commands.addColumnAfter">
            insert column after
          </button>
          <button @click="commands.deleteColumn">
            delete column
          </button>
          <button @click="commands.addRowBefore">
            insert row before
          </button>
          <button @click="commands.addRowAfter">
            insert row after
          </button>
          <button @click="commands.deleteRow">
            delete row
          </button>
          <button @click="commands.toggleCellMerge">
            merge cells
          </button>
        </div>
      </div>
    </editor-menu-bar>

    <editor-content id="editor" :editor="editor" />
  </lesson>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import Vue from 'vue';
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  History,
  HardBreak,
  OrderedList,
  BulletList,
  Bold,
  Italic,
  Link,
  Strike,
  Underline,
  Image,
  Table,
  TableHeader,
  TableCell,
  TableRow
} from 'tiptap-extensions'

import Lesson from "./lesson/Lesson.vue";
import LessonDoc from "./lesson/Lesson";
import Title from "./lesson/Title";
import Intro from "./lesson/Intro";
import Chapter from "./lesson/chapter/Chapter";
import ChapterTitle from "./lesson/chapter/ChapterTitle";
import ChapterBody from "./lesson/chapter/ChapterBody";
import SemanticTag from "./lesson/SemanticTag";
import Example from "./lesson/Example";
import Formula from "./lesson/Formula";
import Proof from "./lesson/Proof";
import CustomListItem from "./lesson/ListItem";
import Placeholder from "./lesson/Placeholder";
import NumberMark from "./lesson/NumberMark";
import NumbersMarker from "./lesson/NumbersMarker";

@Component({
  components: {
    EditorContent,
    EditorMenuBar,
    Lesson
  }
})
export default class LessonEditor extends Vue {
  editor: any = null;

  mounted() {
    this.editor = new Editor({
      extensions: [
        new History(),
        new HardBreak(),
        new BulletList(),
        new OrderedList(),
        new Link(),
        new Bold(),
        new Italic(),
        new Strike(),
        new Underline(),
        new Image(),
        new Table({ resizable: true }),
        new TableHeader(),
        new TableCell(),
        new TableRow(),

        new LessonDoc(),
        new Title(),
        new Intro(),
        new Chapter(),
        new ChapterTitle(),
        new ChapterBody(),
        new SemanticTag(),
        new Example(),
        new Formula(),
        new Proof(),
        new CustomListItem(),
        new Placeholder({
          emptyNodeClass: 'empty',
          showOnlyCurrent: false,
          emptyNodeText: (node: any) => {
            if (node.type.name === "title")
              return "Tytuł lekcji";
            if (node.type.name == 'chapter_title')
              return "Tytuł rozdziału";
            if (node.type.name == 'semantic_tag')
              return "";
            return "Treść sekcji";
          }
        }),
        new NumberMark(),
        new NumbersMarker()
      ]
    });
    this.clearAll();
  }
  beforeDestroy() {
    this.editor.destroy()
  }
  save() {
    console.log(JSON.stringify(this.editor.getJSON()));
  }
  clearAll() {
    this.editor.setContent(`
      <h1></h1>
      <intro></intro>
      <chapter>
        <chapter-title></chapter-title>
        <chapter-body></chapter-body>
      </chapter>
    `);
  }

}
</script>

<style lang="scss">
@import "@/style/chapter";
/*=== TOOLS ===*/
.ProseMirror {
  outline: none !important;
}
#toolbar {
  position: fixed;
  top: 0;
  width: 970px;
  padding-top: 150px;
  z-index: 1;
  background: white;

}
#editor {
  margin-top: 300px;
}
#tools-managing button {
  font-weight: bold;
  padding: 10px 15px;
  background: none;
}
#tools-general {
  width: 100%;
  background: $light-gray;
}
#tools-general button {
  padding: 10px 15px;
  min-width: 10px;
}
#tools-general button:hover {
  background: $gray;
}
#tools-general button.active {
  background: $dark-gray;
}
#tools-general button.active:hover {
  background: $dark-gray;
  outline: 1px solid $darker-gray;
  outline-offset: -1px;
}
.tools-specific {
  width: 100%;
  background: $dark-gray;
}
.tools-specific button {
  background: $dark-gray;
  padding: 10px 7.5px;
}
.tools-specific button:hover {
  background: $darker-gray;
}



/*=== CONTENT - GENERAL===*/
#editor table {
  width: 100%;
  border-collapse: collapse;
}
#editor td {
  border: solid thin $dark-gray;
  min-width: 50px;
  padding: 0 10px;
  max-width: 0;
  &.selectedCell {
    background: $light-gray;
  }
}

#editor li p {
  margin: 0;
}

#editor img 
{
  display: block;
  margin: 20px auto;
  max-width: 100%;

  &.ProseMirror-selectednode {
    outline: 2px solid black;
  }
}

number {
  font-family: 'STIXMathJax_Main';
  font-size: 125%;
}

/*=== CONTENT - EDITOR SPECIFIC===*/
#editor .chapter_name > div + hr
{
  width: 100%;
  border-color: black;
}

#editor .empty:first-child::before {
  content: attr(data-empty-text);
  color: $dark-gray;
  pointer-events: none;
  height: 0;
  float:left;
}
#editor h1.empty:first-child::before {
  float: right;
  text-align: center;
  width: 100%;
}
#editor chapter-title.empty:first-child::before {
  color: $darker-gray;
  font-family: $secondary-font;
  font-size: 1.9em;
  font-weight: bold;
}
</style>
