<template>
  <lesson>
    <editor-menu-bar id="toolbar" ref="toolbar" :editor="editor" v-slot="{ commands, isActive }">
      <div>
        <div id="tools-managing">
          <button @click="commands.undo">
            cofnij akcję
          </button>

          <button @click="commands.redo">
            przywróć akcję
          </button>

          <button @click="commands.saveToFile(); commands.saveToLocalStorage()">
            zapisz
          </button>

          <button @click="openDraftsDialog()">
            wczytaj
          </button>

          <button @click="clearAll()">
            wyczyść wszystko
          </button>

          <button @click="toggleShortMode()">
            {{ shortMode ? 'stwórz wersję pełną' : 'stwórz wersję skróconą' }}
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

          <button :class="{ 'active': centerExtension.isActive }" @click="commands.center">
            center
          </button>

          <button :class="{ 'active': isActive.bullet_list() }" @click="commands.bullet_list">
            ◆
          </button>

          <button :class="{ 'active': isActive.ordered_list() }" @click="commands.ordered_list">
            1)
          </button>

          <button :class="{ 'active': isActive.link() }" @click="commands.link">
            url
          </button>

          <dropdown @selected="insert($event, commands)">
            <template v-slot:placeholder>wstaw</template>
            <dropdown-option>rozdział</dropdown-option> 
            <dropdown-option>sekcja</dropdown-option> 
            <dropdown-option>wyrażenie</dropdown-option> 
            <dropdown-option>wyrażenie inline</dropdown-option> 
            <dropdown-option>twierdzenie</dropdown-option> 
            <dropdown-option>dowód</dropdown-option> 
            <dropdown-option>przykład</dropdown-option> 
            <dropdown-option>problem</dropdown-option>
            <dropdown-option>tabela</dropdown-option> 
            <dropdown-option>kształt</dropdown-option> 
            <dropdown-option>html</dropdown-option> 
            <dropdown-option>element dynamiczny</dropdown-option>
          </dropdown>

          <button :class="{ 'active': isActive.comment() }" @click="commands.comment">
            dodaj komentarz
          </button>
        </div>

        <div class="tools-specific" v-if="isActive.table()">
          <button @click="commands.deleteTable">usuń tabelę</button>
          <button @click="commands.addColumnBefore">wstaw kolumnę przed</button>
          <button @click="commands.addColumnAfter">wstaw kolumnę za</button>
          <button @click="commands.deleteColumn">usuń kolumnę</button>
          <button @click="commands.addRowBefore">wstaw wiersz przed</button>
          <button @click="commands.addRowAfter">wstaw wiersz za</button>
          <button @click="commands.deleteRow">usuń wiersz</button>
          <button @click="commands.toggleCellMerge">scal komórki</button>
          <color-picker @selected="commands.setCellAttr({name: 'background', value: $event})" :class="{ 'picker': true }">kolor tła</color-picker>
          <color-picker @selected="commands.setCellAttr({name: 'borderColor', value: $event})" :class="{ 'picker': true }">kolor krawędzi</color-picker>
          <button class="dropdown">
            <div class="dropdown-label">krawędź</div>
            <div class="dropdown-list">
              <div class="dropdown-position" @click="commands.setCellAttr({name: 'borderSize', value: '0'})">brak</div>
              <div class="dropdown-position" @click="commands.setCellAttr({name: 'borderSize', value: '1'})">cienka</div>
              <div class="dropdown-position" @click="commands.setCellAttr({name: 'borderSize', value: '3'})">gruba</div>
            </div>
          </button>
        </div>
        
      </div>
    </editor-menu-bar>

    <editor-content id="editor" :editor="editor" />

    <div v-if="showDraftsDialog" class="drafts-dialog">
      <div class="drafts-dialog-header">
        Wczytaj wersję roboczą
        <button @click="closeDraftsDialog()">x</button>
      </div>
      <div class="drafts-dialog-body">
        <div class="drafts-list-header">
          <span class="draft-name"><b>Tytuł</b></span>
          <span class="draft-date"><b>Data utworzenia</b></span>
          <span class="draft-date"><b>Data modyfikacji</b></span>
        </div>
        <div class="drafts-list">
          <div v-for="(draft, i) in availableDrafts" :key="i">
            <div class="draft">
              <span @click="loadDraft(draft)" class="draft-name">{{ draft.name }}</span>
              <span @click="loadDraft(draft)" class="draft-date">{{ draft.created.toLocaleDateString() }}</span>
              <span @click="loadDraft(draft)" class="draft-date">{{ draft.lastModified.toLocaleDateString() }}</span>
            </div>
            <button @click="deleteDraft(draft)">usuń</button>
          </div>
        </div>
      </div>
    </div>
  </lesson>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import Vue from 'vue';
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import { History, HardBreak, OrderedList, BulletList, Bold, Italic, Strike, Underline, Image } from 'tiptap-extensions'

import Lesson from "../lesson/Lesson.vue";
import ColorPicker from "./ColorPicker.vue";
import Dropdown from "./Dropdown.vue";
import DropdownOption from "./DropdownOption.vue";

import LessonDoc from "./nodes/Lesson";
import Title from "./nodes/Title";
import Intro from "./nodes/Intro";
import Chapter from "./nodes/Chapter";
import ChapterTitle from "./nodes/ChapterTitle";
import ChapterBody from "./nodes/ChapterBody";
import SemanticTag from "./nodes/SemanticTag";
import Expression from "./nodes/Expression";
import ExpressionInline from "./nodes/ExpressionInline";
import Canvas from "./nodes/Canvas/Canvas";
import Example from "./nodes/Example";
import Problem from "./nodes/Problem";
import Formula from "./nodes/Formula";
import Proof from "./nodes/Proof";
import CustomElement from "./nodes/CustomElement";
import BuiltInComponent from "./nodes/BuiltInComponent";
import CustomListItem from "./nodes/ListItem";
import Placeholder from "./extensions/Placeholder";
import Center from "./extensions/Center";
import Paragraph from "./nodes/Paragraph";
import Table from "./nodes/Table/Table";
import TableHeader from "./nodes/Table/TableHeader";
import TableCell from "./nodes/Table/TableCell";
import TableRow from "./nodes/Table/TableRow";
import Link from "./marks/Link";
import Comment from "./marks/Comment";
import NumberMark from "./marks/NumberMark";
import Save, { DraftPreview } from "./extensions/DraftsManager/SaveExtension";
import { allComments } from './marks/Comment.vue';

@Component({
  components: {
    EditorContent,
    EditorMenuBar,
    Lesson,
    ColorPicker,
    Dropdown,
    DropdownOption
  }
})
export default class LessonEditor extends Vue {
  editor: any = null;
  sourceFile: string = "";
  sourceContent: any = null;
  savePlugin: Save = new Save();
  centerExtension: Center = new Center();
  showDraftsDialog = false;
  availableDrafts: DraftPreview[] = [];
  shortMode = false;

  mounted() {
    this.createEditor();
    this.clearAll();
    this.loadContent();
    this.$nextTick(() => {
      addEventListener("scroll", this.scrollToolbar)
      this.scrollToolbar();
    })
  }

  beforeDestroy() {
    this.editor.destroy();
    this.removeAutoSave();
    removeEventListener("scroll", this.scrollToolbar);
  }

  private createEditor() {
    this.editor = new Editor({
      extensions: [
        new History(),
        new HardBreak(),
        new Expression(),
        new ExpressionInline(),
        new BulletList(),
        new OrderedList(),
        new Link(),
        new Bold(),
        new Italic(),
        new Strike(),
        new Underline(),
        this.centerExtension,
        new Image(),
        new Table({ resizable: true }),
        new TableHeader(),
        new TableCell(),
        new TableRow(),
        new LessonDoc(),
        new Title(this.shortMode),
        new Intro(),
        new Chapter(),
        new ChapterTitle(),
        new ChapterBody(this.shortMode),
        new SemanticTag(),
        new Paragraph(),
        new Example(),
        new Problem(),
        new Formula(),
        new Proof(),
        new CustomElement(),
        new BuiltInComponent(),
        new CustomListItem(),
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
        new Link(),
        new Comment(),
        new NumberMark(),
        this.savePlugin
      ]
    });
  }

  insert(element: string, commands: any) {
    switch(element) {
      case 'rozdział': commands.createChapter(); break;
      case 'sekcja': commands.semantic_tag(); break;
      case 'przykład': commands.example(); break;
      case 'problem': commands.problem(); break;
      case 'wyrażenie': commands.expression(); break;
      case 'wyrażenie inline': commands.expressionInline(); break;
      case 'twierdzenie': commands.formula(); break;
      case 'dowód': commands.proof(); break;
      case 'tabela': commands.createTable({ rowsCount: 3, colsCount: 3, withHeaderRow: true }); break;
      case 'kształt': commands.geometry(); break;
      case 'html': commands.custom_element(); break;
      case 'element dynamiczny': commands.component(); break;
    }
  }

  private loadContent() {
    this.sourceFile = this.$route.params.sourceFile;
    if (this.sourceFile)
      import(`@/assets/lessons/${this.sourceFile}`).then(file => this.savePlugin.loadFromJSON(file));
  }

  private removeAutoSave() {
    this.savePlugin.destroy();
  }

  clearAll() {
    for (let commentId in allComments) 
      delete (allComments as any)[commentId];
    this.editor.setContent(`
      <h1></h1>
      <intro></intro>
      <chapter>
        <chapter-title></chapter-title>
        <chapter-body></chapter-body>
      </chapter>
    `);
  }

  toggleShortMode() {
    this.shortMode = !this.shortMode;
    this.editor.destroy();
    this.createEditor();
    this.clearAll();
  }

  openDraftsDialog() {
    this.showDraftsDialog = true;
    this.availableDrafts = this.savePlugin.draftsList();
  }

  closeDraftsDialog() {
    this.showDraftsDialog = false;
  }

  loadDraft(draft: DraftPreview) {
    this.showDraftsDialog = false;
    this.savePlugin.loadDraft(draft);
  }

  deleteDraft(draft: DraftPreview) {
    this.savePlugin.deleteDraft(draft);
    this.availableDrafts = this.savePlugin.draftsList();
  }

  scrollToolbar() {
    const toolbar = (this.$refs.toolbar as Vue).$el;
    if (document.body.scrollTop > 5 || document.documentElement.scrollTop > 5 || window.innerWidth < 700) {
      (toolbar as HTMLElement).style.paddingTop = "0";
    } 
    else {
      (toolbar as HTMLElement).style.paddingTop = "150px";
    }
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
  transition: padding 1s;
  z-index: 3;
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

  button {
    font-size: 0.9em;
    background: $dark-gray;
    padding: 10px 7.5px;
  }

  .dropdown-list {
    position: absolute;
    top: 47px;
    left: 0;
    z-index: 2;
    width: 100%;
    display: none;
    background: $light-gray;
  }
  .dropdown:hover .dropdown-list {
    display: block;
  }
  .dropdown-position {
    text-align: left;
    padding: 2px 8px;
    font-size: 0.9em;
    cursor: pointer;
    &:hover {
      background: $gray;
    }
  }
}
.picker {
  padding: 0 10px !important;
  float: left;
}
.underline {
  text-decoration: underline;
}
.tools-specific button:hover {
  background: $darker-gray;
}
#editor table ::selection {
  color: inherit;
}

.drafts-dialog {
  position: fixed;
  width: 800px;
  height: 500px;
  z-index: 10000;
  left: calc(50% - 400px);
  top: calc(50% - 250px);
  box-sizing: border-box;
  background: white;
  box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.2);

  .drafts-dialog-header {
    background: black;
    line-height: 50px;
    color: white;
    height: 50px;
    padding-left: 15px;
    font-weight: bold;

    button {
      float: right;
      width: 50px;
      height: 50px;
      padding: 0;
      background: $main-red;
      color: white;
      font-family: $geometric-font;
      font-size: 1.5em;
    }
  }

  .drafts-dialog-body {
    padding: 10px;

    .drafts-list {
      clear: both;
      height: 390px;
      overflow-y: auto;

      button {
        float: left;
        background: $main-red;
        padding: 5px 10px;
        margin: 10px 5px;
        color: white;
        &:hover {
          background: $dark-red;
        }
      }
    }

    .draft {
      float:left;
      width: 500px;
      margin: 10px 10px 10px 5px;
      padding: 5px 10px;
      background: $light-gray;
      cursor: pointer;
      &:hover {
        background: $gray;
      }
    }

    .drafts-list-header {
      float:left;
      width: 500px;
      margin-left: 5px;
      padding: 5px 10px;
    }

    .draft-name {
      display: inline-block;
      width: 35%;
    }

    .draft-date {
      display: inline-block;
      width: 32%;
    }

  }

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
  font-size: 120%;
}

problem {
  display: block;
}

/*=== CONTENT - EDITOR SPECIFIC===*/
#editor table[style]:not([class]) {
  margin: 0 auto;

  > tbody > tr > td, > tbody > tr > th {
    padding: 0 7px;
    width: 26px;
    position: relative;
    &.selectedCell {
      background: $light-gray !important;
    }
    &::after {
      content: ' ';
      position: absolute;
      right: -5px;
      top: 0;
      background: transparent;
      width: 10px;
      height: 100%;
      cursor: ew-resize;
      z-index: 1;
    }
    p {
      margin: 7px 0;
    }
  }
}

#editor .chapter_name > div + hr {
  width: 100%;
  box-sizing: border-box;
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
#editor div[data-empty-text="Tytuł lekcji"].empty:first-child::before {
  font-size: 3.2em;
  font-weight: bold;
  font-family: $secondary-font;
  line-height: 1em;
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

#editor .chapter_name > div {
  cursor: inherit;
}

#editor .editor-comment {
  text-decoration: underline $main-red dashed;
  text-decoration-thickness: 3px;
  text-decoration-skip-ink: none;
  background: #ffeeee;
  &:hover {
    background: #ffe5e5;
    cursor: pointer;
  }
}

#editor .example:hover {
	background-color: $example-background;
}
</style>
