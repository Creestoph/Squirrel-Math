<template>
  <lesson>
    <editor-menu-bar id="toolbar" :editor="editor" v-slot="{ commands, isActive }">
      <div>
        <div id="tools-managing">
          <button @click="commands.undo">
            cofnij akcję
          </button>

          <button @click="commands.redo">
            przywróć akcję
          </button>

           <button @click="save()">
            zapisz
          </button>

          <button @click="clearAll()">
            wyczyść wszystko
          </button>
        </div>
        <div id="tools-general">
          <button :class="{ 'active': isActive.bold() }" style="font-weight: bold" @click="commands.bold">
            B
          </button>

          <button :class="{ 'active': isActive.italic() }" style="font-style: italic" @click="commands.italic">
            I
          </button>

          <button :class="{ 'active': isActive.underline() }" style="text-decoration: underline" @click="commands.underline">
            U
          </button>

          <button :class="{ 'active': isActive.strike() }" style="text-decoration: line-through" @click="commands.strike">
            abc
          </button>

          <button class="menubar__button" :class="{ 'active': isActive.bullet_list() }" @click="commands.bullet_list">
            ◆
          </button>

          <button :class="{ 'active': isActive.ordered_list() }" @click="commands.ordered_list">
            1)
          </button>

          <button @click="commands.createChapter()">
            rozdział
          </button>

          <button @click="commands.semantic_tag()">
            sekcja
          </button>

          <button :class="{ 'active': isActive.example() }" @click="commands.example">
            przykład
          </button>

          <button :class="{ 'active': isActive.expression() }" @click="commands.expression">
            wyrażenie
          </button>

          <button :class="{ 'active': isActive.expressionInline() }" @click="commands.expressionInline">
            wyrażenie inline
          </button>

          <button :class="{ 'active': isActive.formula() }" @click="commands.formula">
            twierdzenie
          </button>

          <button :class="{ 'active': isActive.proof() }" @click="commands.proof">
            dowód
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
            tabela
          </button>

          <button :class="{ 'active': isActive.geometry() }" @click="commands.geometry">
            kształt
          </button>
        </div>

        <div class="tools-specific" v-if="isActive.table()">
          <button @click="commands.deleteTable">
            usuń tabelę
          </button>
          <button @click="commands.addColumnBefore">
            wstaw kolumnę przed
          </button>
          <button @click="commands.addColumnAfter">
            wstaw kolumnę za
          </button>
          <button @click="commands.deleteColumn">
            usuń kolumnę
          </button>
          <button @click="commands.addRowBefore">
            wstaw wiersz przed
          </button>
          <button @click="commands.addRowAfter">
            wstaw wiersz za
          </button>
          <button @click="commands.deleteRow">
            usuń wiersz
          </button>
          <button @click="commands.toggleCellMerge">
            scal komórki
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

import Lesson from "../lesson/Lesson.vue";
import LessonDoc from "./Lesson";
import Title from "../lesson/Title";
import Intro from "./Intro";
import Chapter from "../lesson/chapter/Chapter";
import ChapterTitle from "../lesson/chapter/ChapterTitle";
import ChapterBody from "../lesson/chapter/ChapterBody";
import SemanticTag from "./SemanticTag";
import Expression from "./Expression";
import ExpressionInline from "./ExpressionInline";
import Canvas from "./Canvas/Canvas";
import Example from "./Example";
import Formula from "./Formula";
import Proof from "./Proof";
import CustomListItem from "./ListItem";
import Placeholder from "./Placeholder";
import NumberMark from "./NumberMark";
import NumbersMarker from "./NumbersMarker";

@Component({
  components: {
    EditorContent,
    EditorMenuBar,
    Lesson
  }
})
export default class LessonEditor extends Vue {
  editor: any = null;
  sourceFile: string = "";
  sourceContent: any = null;

  mounted() {
    this.sourceFile = this.$route.params.sourceFile;
    if (this.sourceFile) {
      import(`@/assets/${this.sourceFile}`).then(file => {
        console.log(file);
        this.editor.setContent(file);
      })
    }

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
        new Expression(),
        new ExpressionInline(),
        new Canvas(),
        new Placeholder({
          emptyNodeClass: 'empty',
          showOnlyCurrent: false,
          emptyNodeText: (node: any) => {
            if (node.type.name === "title")
              return "Tytuł lekcji";
            if (node.type.name == 'chapter_title')
              return "Tytuł rozdziału";
            if (node.type.name == 'semantic_tag' || node.type.name == 'expression')
              return "";
            return "Treść sekcji";
          }
        }),
        new NumberMark(),
        new NumbersMarker(),
      ]
    });
    this.clearAll();
  }
  beforeDestroy() {
    this.editor.destroy()
  }
  save() {
    let content = JSON.stringify(this.editor.getJSON());
    console.log(content);
    let fileName = this.sourceFile || 'lesson.json';
    this.download(content, fileName, 'application/json');
  }
  private download(data: any, filename: string, type: string) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
      window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
      var a = document.createElement("a"), url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function() {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);  
      }, 0); 
    }
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
  font-size: 0.9em;
  background: $dark-gray;
  padding: 10px 7.5px;
}.underline {
    text-decoration: underline;
}
.tools-specific button:hover {
  background: $darker-gray;
}
::selection {
  color: inherit;
}


/*=== CONTENT - GENERAL===*/
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
#editor table {
  width: 100%;
}
#editor td, #editor th {
  min-width: 50px;
  padding: 0 10px;
  max-width: 0;
  border: solid thin $dark-gray;
  &.selectedCell {
    background: $light-gray;
  }
}

#editor .chapter_name > div + hr
{
  width: 100%;
  border-color: black;
  background-color: black;
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
