<template>
    <lesson>
        <editor-menu-bar id="toolbar" ref="toolbar" :editor="editor" v-slot="{ commands, isActive }">
            <div>
                <div id="tools-managing">
                    <button @click="commands.undo" title="cofnij akcję (Ctrl + Z)">
                        <icon>undo</icon>
                    </button>

                    <button @click="commands.redo" title="przywróć akcję (Ctrl + Y)">
                        <icon>redo</icon>
                    </button>

                    <button @click="commands.saveToFile(); commands.saveToLocalStorage()" title="zapisz (Ctrl + S)">
                        <icon>logout</icon>
                    </button>

                    <button @click="openDraftsDialog()" title="wczytaj">
                        <icon>login</icon>
                    </button>

                    <button @click="clearAll()" title="edytuj nową lekcję">
                        <icon>control_point</icon>
                    </button>

                    <button v-if="secondModeExists()" @click="editSecondMode()" :title="shortMode ? 'edytuj wersję pełną' : 'edytuj wersję skróconą'">
                        <icon>control_point_duplicate</icon>
                    </button>
                    <button v-if="!secondModeExists()" @click="createSecondMode()" :title="shortMode ? 'stwórz wersję pełną' : 'stwórz wersję skróconą'">
                        <icon>control_point_duplicate</icon>
                    </button>
                </div>
                <div id="tools-general">
                    <button :class="{ 'active': isActive.bold() }" style="font-weight: bold" @click="commands.bold" title="pogrubienie tekstu (Ctrl + B)">
                        B
                    </button>

                    <button :class="{ 'active': isActive.italic() }" style="font-style: italic" @click="commands.italic" title="italika (Ctrl + I)">
                        I
                    </button>

                    <button :class="{ 'active': isActive.underline() }" style="text-decoration: underline" @click="commands.underline" title="podkreślenie tekstu (Ctrl + U)">
                        U
                    </button>

                    <button :class="{ 'active': isActive.strike() }" style="text-decoration: line-through" @click="commands.strike" title="przekreślenie tekstu (Ctrl + D)">
                        abc
                    </button>

                    <color-picker @selected="commands.text_color({ color: $event })" :class="{ 'picker': true }" style="color: #cc4444" title="kolor tekstu">abc</color-picker>

                    <button :class="{ 'active': textAlignExtension.isActive('left') }" @click="commands.text_align('left')" title="wyrównanie do lewej">
                        <icon>format_align_left</icon>
                    </button>

                    <button :class="{ 'active': textAlignExtension.isActive('center') }" @click="commands.text_align('center')" title="wyrównanie do środka">
                        <icon>format_align_center</icon>
                    </button>

                    <button :class="{ 'active': textAlignExtension.isActive('right') }" @click="commands.text_align('right')" title="wyrównanie do prawej">
                        <icon>format_align_right</icon>
                    </button>

                    <button :class="{ 'active': isActive.bullet_list() }" @click="commands.bullet_list" title="lista punktowana">
                        <icon>format_list_bulleted</icon>
                    </button>

                    <button :class="{ 'active': isActive.ordered_list() }" @click="commands.ordered_list" title="lista numerowana">
                        <icon>format_list_numbered</icon>
                    </button>

                    <button :class="{ 'active': isActive.link() }" @click="commands.link" title="link do lekcji">
                        <icon>link</icon>
                    </button>

                    <button :class="{ 'active': isActive.comment() }" @click="commands.comment" title="dodaj komentarz">
                        <icon>add_comment</icon>
                    </button>

                    <dropdown @selected="insert($event, commands)" title="wstaw">
                        <template v-slot:placeholder><icon>add</icon></template>
                        <dropdown-option value="chapter"><icon>menu_book</icon> rozdział</dropdown-option> 
                        <dropdown-option value="section"><icon>auto_stories</icon> sekcja</dropdown-option> 
                        <dropdown-option value="expression"><span style="width: 24px"><b>ΣΠ</b></span> wyrażenie</dropdown-option> 
                        <dropdown-option value="expressionInline"><span style="width: 24px"><b>σπ</b></span> wyrażenie inline</dropdown-option> 
                        <dropdown-option value="theorem"><icon>emoji_objects</icon> twierdzenie</dropdown-option> 
                        <dropdown-option value="proof"><icon>engineering</icon> dowód</dropdown-option> 
                        <dropdown-option value="example"><icon>view_agenda</icon> przykład</dropdown-option> 
                        <dropdown-option value="problem"><icon>help</icon> problem</dropdown-option>
                        <dropdown-option value="table"><icon>grid_on</icon> tabela</dropdown-option> 
                        <dropdown-option value="image"><icon>insert_photo</icon> obraz</dropdown-option> 
                        <dropdown-option value="shape"><icon>change_history</icon> kształt geometryczny</dropdown-option> 
                        <dropdown-option value="html"><icon>code</icon> html</dropdown-option> 
                        <dropdown-option value="dynamic"><icon>precision_manufacturing</icon> element dynamiczny</dropdown-option>
                    </dropdown>

                </div>

                <div class="tools-specific" v-if="isActive.table()">
                    <button @click="commands.deleteTable" title="usuń tabelę"><icon>delete</icon></button>
                    <button @click="commands.addColumnBefore" title="wstaw kolumnę przed"><icon>insert_column_left</icon></button>
                    <button @click="commands.addColumnAfter" title="wstaw kolumnę za"><icon>insert_column_right</icon></button>
                    <button @click="commands.deleteColumn" title="usuń kolumnę"><icon>delete_column</icon></button>
                    <button @click="commands.addRowBefore" title="wstaw wiersz przed"><icon>insert_row_top</icon></button>
                    <button @click="commands.addRowAfter" title="wstaw wiersz za"><icon>insert_row_bottom</icon></button>
                    <button @click="commands.deleteRow" title="usuń wiersz"><icon>delete_row</icon></button>
                    <button @click="commands.toggleCellMerge" title="scal komórki"><icon>table_line</icon></button>
                    <color-picker @selected="commands.setCellAttr({name: 'background', value: $event})" :class="{ 'picker': true }" title="kolor tła"><icon style="color: #cc4444">apps</icon></color-picker>
                    <color-picker @selected="commands.setCellAttr({name: 'borderColor', value: $event})" :class="{ 'picker': true }" title="kolor krawędzi"><icon style="color: #cc4444">border_outer</icon></color-picker>
                    <button class="dropdown" title="krawędź lewa">
                        <div class="dropdown-label"><icon>border_left</icon></div>
                        <div class="dropdown-list">
                            <div class="dropdown-position" @click="commands.setCellAttr({name: 'borderLeft', value: '0'})">brak</div>
                            <div class="dropdown-position" @click="commands.setCellAttr({name: 'borderLeft', value: '1'})">cienka</div>
                            <div class="dropdown-position" @click="commands.setCellAttr({name: 'borderLeft', value: '3'})">gruba</div>
                        </div>
                    </button>
                    <button class="dropdown" title="krawędź prawa">
                        <div class="dropdown-label"><icon>border_right</icon></div>
                        <div class="dropdown-list">
                            <div class="dropdown-position" @click="commands.setCellAttr({name: 'borderRight', value: '0'})">brak</div>
                            <div class="dropdown-position" @click="commands.setCellAttr({name: 'borderRight', value: '1'})">cienka</div>
                            <div class="dropdown-position" @click="commands.setCellAttr({name: 'borderRight', value: '3'})">gruba</div>
                        </div>
                    </button>
                    <button class="dropdown" title="krawędź górna">
                        <div class="dropdown-label"><icon>border_top</icon></div>
                        <div class="dropdown-list">
                            <div class="dropdown-position" @click="commands.setCellAttr({name: 'borderTop', value: '0'})">brak</div>
                            <div class="dropdown-position" @click="commands.setCellAttr({name: 'borderTop', value: '1'})">cienka</div>
                            <div class="dropdown-position" @click="commands.setCellAttr({name: 'borderTop', value: '3'})">gruba</div>
                        </div>
                    </button>
                    <button class="dropdown" title="krawędź dolna">
                        <div class="dropdown-label"><icon>border_bottom</icon></div>
                        <div class="dropdown-list">
                            <div class="dropdown-position" @click="commands.setCellAttr({name: 'borderBottom', value: '0'})">brak</div>
                            <div class="dropdown-position" @click="commands.setCellAttr({name: 'borderBottom', value: '1'})">cienka</div>
                            <div class="dropdown-position" @click="commands.setCellAttr({name: 'borderBottom', value: '3'})">gruba</div>
                        </div>
                    </button>
                    <button class="dropdown" title="wszystkie krawędzie">
                        <div class="dropdown-label"><icon>border_outer</icon></div>
                        <div class="dropdown-list">
                            <div class="dropdown-position" @click="commands.setCellAttr({name: 'borderLeft', value: '0'}); commands.setCellAttr({name: 'borderRight', value: '0'}); commands.setCellAttr({name: 'borderTop', value: '0'}); commands.setCellAttr({name: 'borderBottom', value: '0'})">brak</div>
                            <div class="dropdown-position" @click="commands.setCellAttr({name: 'borderLeft', value: '1'}); commands.setCellAttr({name: 'borderRight', value: '1'}); commands.setCellAttr({name: 'borderTop', value: '1'}); commands.setCellAttr({name: 'borderBottom', value: '1'})">cienka</div>
                            <div class="dropdown-position" @click="commands.setCellAttr({name: 'borderLeft', value: '3'}); commands.setCellAttr({name: 'borderRight', value: '3'}); commands.setCellAttr({name: 'borderTop', value: '3'}); commands.setCellAttr({name: 'borderBottom', value: '3'})">gruba</div>
                        </div>
                    </button>
                </div>
                
            </div>
        </editor-menu-bar>

        <editor-content id="editor" :editor="editor" />

        <div v-if="showDraftsDialog" class="drafts-dialog">
            <div class="drafts-dialog-header">
                Wczytaj wersję roboczą
                <button @click="closeDraftsDialog()">✖</button>
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
                            <span @click="loadDraft(draft)" class="draft-name">{{ draft.name + (draft.fromAutosave ? ' (autosave)' : '') }}</span>
                            <span @click="loadDraft(draft)" class="draft-date">{{ draft.created.toLocaleDateString() }}</span>
                            <span @click="loadDraft(draft)" class="draft-date">{{ draft.lastModified.toLocaleDateString() + ' ' + draft.lastModified.toLocaleTimeString() }}</span>
                        </div>
                        <button @click="deleteDraft(draft)">usuń</button>
                    </div>
                </div>
            </div>
        </div>

        <image-picker ref="imagePicker" @deleteImage="deleteImage($event)"></image-picker>

    </lesson>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import Vue from 'vue';
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import { History, HardBreak, OrderedList, BulletList, Bold, Italic, Strike, Underline } from 'tiptap-extensions'

import Lesson from "../lesson/Lesson.vue";
import ColorPicker from "./ColorPicker.vue";
import Dropdown from "./Dropdown.vue";
import DropdownOption from "./DropdownOption.vue";
import ImagePicker, { Image } from "./ImagePicker.vue";

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
import TextArea from "./nodes/Canvas/TextAreaNode";
import RectangleNode from "./nodes/Canvas/RectangleNode";
import CircleNode from "./nodes/Canvas/CircleNode";
import LineNode from "./nodes/Canvas/LineNode";
import PolygonNode from "./nodes/Canvas/PolygonNode";
import ArcNode from "./nodes/Canvas/ArcNode";
import Example from "./nodes/Example";
import Problem from "./nodes/Problem";
import Formula from "./nodes/Formula";
import Proof from "./nodes/Proof";
import CustomElement from "./nodes/CustomElement";
import BuiltInComponent from "./nodes/BuiltInComponent";
import CustomListItem from "./nodes/ListItem";
import Placeholder from "./extensions/Placeholder";
import TextAlign from "./extensions/TextAlign";
import Paragraph from "./nodes/Paragraph";
import ImageNode from "./nodes/Image";
import Table from "./nodes/Table/Table";
import TableHeader from "./nodes/Table/TableHeader";
import TableCell from "./nodes/Table/TableCell";
import TableRow from "./nodes/Table/TableRow";
import Link from "./marks/Link";
import Comment from "./marks/Comment";
import NumberMark from "./marks/NumberMark";
import TextColor from "./marks/TextColor";
import Save from "./extensions/DraftsManager/SaveExtension";
import { allComments } from './marks/Comment.vue';
import { DraftPreview } from './extensions/DraftsManager/LocalStorageManager';
import { transformAll } from './lessons-transform';

@Component({
    components: {
        EditorContent,
        EditorMenuBar,
        Lesson,
        ColorPicker,
        Dropdown,
        DropdownOption,
        ImagePicker
    }
})
export default class LessonEditor extends Vue {
    editor: any = null;
    sourceFile: string = "";
    sourceContent: any = null;

    get shortMode() {
        return this.savePlugin.shortMode;
    }
    set shortMode(value) {
        this.savePlugin.shortMode = value;
    }

    textAlignExtension: TextAlign = new TextAlign();

    savePlugin: Save = new Save();
    showDraftsDialog = false;
    availableDrafts: DraftPreview[] = [];

    mounted() {
        this.createEditor();
        this.clearAll();
        this.loadContent();
        addEventListener('beforeunload', this.exitListener);
        this.$nextTick(() => {
            addEventListener("scroll", this.scrollToolbar)
            this.scrollToolbar();
        });
        // transformAll();
    }

    beforeDestroy() {
        this.editor.destroy();
        this.removeAutoSave();
        removeEventListener('beforeunload', this.exitListener)
        removeEventListener("scroll", this.scrollToolbar);
    }

    beforeRouteLeave (to: any, from: any, next: any) {
        if (window.confirm('Opuścić stronę? Wprowadzone zmiany mogą nie zostać zapisane.'))
            next();
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
                this.textAlignExtension,
                new ImageNode(),
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
                new TextArea(),
                new RectangleNode(),
                new CircleNode(),
                new LineNode(),
                new PolygonNode(),
                new ArcNode(),
                new Placeholder({
                    emptyNodeClass: 'empty',
                    showOnlyCurrent: false,
                    emptyNodeText: (node: any) => {
                        if (node.type.name === "title")
                            return "Tytuł lekcji";
                        if (node.type.name == 'chapter_title')
                            return "Tytuł rozdziału";
                        if (['semantic_tag', 'expression', 'expressionInline', 'custom_element', 'geometry'].includes(node.type.name))
                            return "";
                        return "Treść sekcji";
                    }
                }),
                new Link(),
                new Comment(),
                new NumberMark(),
                new TextColor(),
                this.savePlugin
            ]
        });
    }

    insert(element: string, commands: any) {
        switch(element) {
            case 'chapter': commands.createChapter(); break;
            case 'section': commands.semantic_tag(); break;
            case 'example': commands.example(); break;
            case 'problem': commands.problem(); break;
            case 'expression': commands.expression(); break;
            case 'expressionInline': commands.expressionInline(); break;
            case 'theorem': commands.formula(); break;
            case 'proof': commands.proof(); break;
            case 'table': commands.createTable({ rowsCount: 3, colsCount: 3, withHeaderRow: false }); break;
            case 'image': (this.$refs.imagePicker as ImagePicker).open((image: Image) => commands.image(image)); break;
            case 'shape': commands.geometry(); break;
            case 'html': commands.custom_element(); break;
            case 'dynamic': commands.component(); break;
        }
    }

    private loadContent() {
        this.sourceFile = this.$route.params.editSourceFile;
        if (this.sourceFile)
            import(`@/assets/lessons/${this.sourceFile}`).then(file => this.savePlugin.loadFromJSON(file));
    }

    private removeAutoSave() {
        this.savePlugin.destroy();
    }

    clearAll() {
        this.clearComments();
        this.clearImages();
        this.clearContent();
        this.savePlugin.longVersionJSON = '';
        this.savePlugin.shortVersionJSON = '';
    }

    private clearComments() {
        for (let commentId in allComments) 
            delete (allComments as any)[commentId];
    }

    private clearImages() {
        ImagePicker.lessonImages = {};
    }

    private clearContent(title?: string) {
        this.editor.setContent(`
            <h1>${title ? title : ''}</h1>
            <intro></intro>
            <chapter>
                <chapter-title isHidden="false"></chapter-title>
                <chapter-body></chapter-body>
            </chapter>
        `);
    }

    private exitListener(event: any) {
        event.preventDefault();
        event.returnValue = '';
    }

    createSecondMode() {
        this.savePlugin.saveToLocalStorage(true);
        const title = this.editor.state.doc.content.content[0].content.content[0];
        this.shortMode = !this.shortMode;
        this.editor.destroy();
        this.createEditor();
        this.clearContent(title ? title.text : '');
    }

    editSecondMode() {
        this.savePlugin.saveToLocalStorage(true);
        this.shortMode = !this.shortMode;
        this.editor.destroy();
        this.createEditor();
        this.editor.setContent(this.shortMode ? this.savePlugin.shortVersionJSON : this.savePlugin.longVersionJSON);
    }

    secondModeExists() {
        return this.shortMode ? this.savePlugin.longVersionJSON : this.savePlugin.shortVersionJSON;
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
        this.shortMode = false;
        this.editor.destroy();
        this.createEditor();
        this.savePlugin.loadDraft(draft);
    }

    deleteDraft(draft: DraftPreview) {
        this.savePlugin.deleteDraft(draft);
        this.availableDrafts = this.savePlugin.draftsList();
    }

    deleteImage(image: Image) {
        let short = this.shortMode ? this.editor.getJSON() : this.savePlugin.shortVersionJSON;
        let long = this.shortMode ? this.savePlugin.longVersionJSON : this.editor.getJSON();
        const isInShort = this.hasImage(short, image.key);
        const isInLong = this.hasImage(long, image.key);
        if (isInLong) {
            alert("Obraz jest używany w wersji pełnej lekcji. Najpierw usuń jego wystąpienia.");
        }
        else if (isInShort) {
            alert("Obraz jest używany w wersji skróconej lekcji. Najpierw usuń jego wystąpienia.");
        }
        else {
            (this.$refs.imagePicker as ImagePicker).deleteImage(image);
        }
    }

    hasImage(node: any, imageKey: string): boolean {
        if (node.type == 'image' && node.attrs.key == imageKey)
                return true;
        return node.content ? node.content.some((child: any) => this.hasImage(child, imageKey)) : false;
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
#editor {
    margin-top: 300px;
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

#tools-managing button {
    font-weight: bold;
    padding: 10px 15px;
    background: none;
}

#tools-general, .tools-specific {
    width: 100%;
    background: $light-gray;
    > * {
        display: inline-block;
    }

    button {
        padding: 10px 13px;
        min-width: 10px;
        height: 24px;
        &:hover {
            background: $gray;
        }
        &.active {
            background: $dark-gray;
        }
        &.active:hover {
            background: $dark-gray;
            outline: 1px solid $darker-gray;
            outline-offset: -1px;
        }
    }
}

#tools-general .dropdown > div {
    line-height: 24px;
    span {
        display: inline-block;
        margin-right: 20px;
    }
}

.tools-specific {
    background: $dark-gray;

    .dropdown-list {
        position: absolute;
        top: 44px;
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
    padding: 0 10px;
}
.tools-specific button:hover {
    background: $darker-gray;
}
#editor table ::selection, #editor .math-display ::selection {
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
#editor img  {
    display: block;
    margin: 20px auto;
    max-width: 100%;

    &.ProseMirror-selectednode {
        outline: 2px solid black;
    }
}

#editor table img {
    margin: 0;
}

number {
    font-family: 'STIXMathJax_Main';
    font-size: 120%;
}

problem {
    display: block;
}

/*=== CONTENT - EDITOR SPECIFIC===*/
#editor table[style^="width:"]:not([class]), #editor table[style^="min-width:"]:not([class]) {
    margin: 0 auto;

    > tbody > tr > td, > tbody > tr > th {
        padding: 0 2px;
        width: 26px;
        position: relative;
        border-style: solid;
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
            margin: 2px 0;
        }
    }
}

#editor .chapter_name > div + hr {
    width: 100%;
    box-sizing: border-box;
    border-color: black;
    background-color: black;
}

#editor .empty:first-child::before, #editor .tags-wrapper + .empty::before {
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
#editor .chapter_name.empty:first-child::before {
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
