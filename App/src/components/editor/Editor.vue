<template>
    <lesson>
        <div id="toolbar" :style="{ paddingTop: toolbarPaddingTop + 'px' }">
            <div v-if="editor">
                <div id="tools-managing">
                    <button @click="editor.commands.undo" title="cofnij akcję (Ctrl + Z)">
                        <icon>undo</icon>
                    </button>

                    <button @click="editor.commands.redo" title="przywróć akcję (Ctrl + Y)">
                        <icon>redo</icon>
                    </button>

                    <button
                        @click="
                            editor.commands.saveToFile();
                            editor.commands.saveToLocalStorage();
                        "
                        title="zapisz (Ctrl + S)"
                    >
                        <icon>logout</icon>
                    </button>

                    <button @click="openDraftsDialog()" title="wczytaj">
                        <icon>login</icon>
                    </button>

                    <button @click="clearAll()" title="edytuj nową lekcję">
                        <icon>control_point</icon>
                    </button>

                    <button
                        v-if="secondModeExists()"
                        @click="editSecondMode()"
                        :title="shortMode ? 'edytuj wersję pełną' : 'edytuj wersję skróconą'"
                    >
                        <icon>control_point_duplicate</icon>
                    </button>
                    <button
                        v-if="!secondModeExists()"
                        @click="createSecondMode()"
                        :title="shortMode ? 'stwórz wersję pełną' : 'stwórz wersję skróconą'"
                    >
                        <icon>control_point_duplicate</icon>
                    </button>
                </div>
                <div id="tools-general">
                    <button
                        :class="{ active: editor.isActive('bold') }"
                        style="font-weight: bold"
                        @click="editor.chain().focus().toggleBold().run()"
                        title="pogrubienie tekstu (Ctrl + B)"
                    >
                        B
                    </button>

                    <button
                        :class="{ active: editor.isActive('italic') }"
                        style="font-style: italic"
                        @click="editor.chain().focus().toggleItalic().run()"
                        title="italika (Ctrl + I)"
                    >
                        I
                    </button>

                    <button
                        :class="{ active: editor.isActive('underline') }"
                        style="text-decoration: underline"
                        @click="editor.chain().focus().toggleUnderline().run()"
                        title="podkreślenie tekstu (Ctrl + U)"
                    >
                        U
                    </button>

                    <button
                        :class="{ active: editor.isActive('strike') }"
                        style="text-decoration: line-through"
                        @click="editor.chain().focus().toggleStrike().run()"
                        title="przekreślenie tekstu (Ctrl + D)"
                    >
                        abc
                    </button>

                    <color-picker
                        @selected="editor.chain().focus().setColor({ color: $event }).run()"
                        :class="{ picker: true }"
                        style="color: #cc4444"
                        title="kolor tekstu"
                    >
                        abc
                    </color-picker>

                    <button
                        :class="{ active: editor.isActive({ textAlign: 'left' }) }"
                        @click="editor.chain().focus().setTextAlign('left').run()"
                        title="wyrównanie do lewej"
                    >
                        <icon>format_align_left</icon>
                    </button>

                    <button
                        :class="{ active: editor.isActive({ textAlign: 'center' }) }"
                        @click="editor.chain().focus().setTextAlign('center').run()"
                        title="wyrównanie do środka"
                    >
                        <icon>format_align_center</icon>
                    </button>

                    <button
                        :class="{ active: editor.isActive({ textAlign: 'right' }) }"
                        @click="editor.chain().focus().setTextAlign('right').run()"
                        title="wyrównanie do prawej"
                    >
                        <icon>format_align_right</icon>
                    </button>

                    <button
                        :class="{ active: editor.isActive('bulletList') }"
                        @click="editor.chain().focus().toggleBulletList().run()"
                        title="lista punktowana"
                    >
                        <icon>format_list_bulleted</icon>
                    </button>

                    <button
                        :class="{ active: editor.isActive('orderedList') }"
                        @click="editor.chain().focus().toggleOrderedList().run()"
                        title="lista numerowana"
                    >
                        <icon>format_list_numbered</icon>
                    </button>

                    <button
                        :class="{ active: editor.isActive('link') }"
                        @click="editor.chain().focus().setLink().run()"
                        title="link do lekcji"
                    >
                        <icon>link</icon>
                    </button>

                    <button
                        :class="{ active: editor.isActive('comment') }"
                        @click="addComment()"
                        title="dodaj komentarz"
                    >
                        <icon>add_comment</icon>
                    </button>

                    <dropdown @selected="insert($event, editor.commands)" title="wstaw">
                        <template v-slot:placeholder><icon>add</icon></template>
                        <dropdown-option value="chapter"><icon>menu_book</icon> rozdział</dropdown-option>
                        <dropdown-option value="section"><icon>auto_stories</icon> sekcja</dropdown-option>
                        <dropdown-option value="expression">
                            <span style="width: 24px"><b>ΣΠ</b></span> wyrażenie
                        </dropdown-option>
                        <dropdown-option value="expressionInline">
                            <span style="width: 24px"><b>σπ</b></span> wyrażenie inline
                        </dropdown-option>
                        <dropdown-option value="theorem"><icon>emoji_objects</icon> twierdzenie</dropdown-option>
                        <dropdown-option value="proof"><icon>engineering</icon> dowód</dropdown-option>
                        <dropdown-option value="example"><icon>view_agenda</icon> przykład</dropdown-option>
                        <dropdown-option value="problem"><icon>help</icon> problem</dropdown-option>
                        <dropdown-option value="table"><icon>grid_on</icon> tabela</dropdown-option>
                        <dropdown-option value="image"><icon>insert_photo</icon> obraz</dropdown-option>
                        <dropdown-option value="shape">
                            <icon>change_history</icon> kształt geometryczny
                        </dropdown-option>
                        <dropdown-option value="html"><icon>code</icon> html</dropdown-option>
                        <dropdown-option value="dynamic">
                            <icon>precision_manufacturing</icon> element dynamiczny
                        </dropdown-option>
                    </dropdown>
                </div>

                <div class="tools-specific" v-if="editor.isActive('table')">
                    <button @click="editor.chain().focus().deleteTable().run()" title="usuń tabelę">
                        <icon>delete</icon>
                    </button>
                    <button @click="editor.chain().focus().addColumnBefore().run()" title="wstaw kolumnę przed">
                        <icon>insert_column_left</icon>
                    </button>
                    <button @click="editor.chain().focus().addColumnAfter().run()" title="wstaw kolumnę za">
                        <icon>insert_column_right</icon>
                    </button>
                    <button @click="editor.chain().focus().deleteColumn().run()" title="usuń kolumnę">
                        <icon>delete_column</icon>
                    </button>
                    <button @click="editor.chain().focus().addRowBefore().run()" title="wstaw wiersz przed">
                        <icon>insert_row_top</icon>
                    </button>
                    <button @click="editor.chain().focus().addRowAfter().run()" title="wstaw wiersz za">
                        <icon>insert_row_bottom</icon>
                    </button>
                    <button @click="editor.chain().focus().deleteRow().run()" title="usuń wiersz">
                        <icon>delete_row</icon>
                    </button>
                    <button @click="editor.chain().focus().mergeOrSplit().run()" title="scal komórki">
                        <icon>table_line</icon>
                    </button>
                    <color-picker
                        @selected="editor.chain().focus().setCellAttribute('background', $event).run()"
                        :class="{ picker: true }"
                        title="kolor tła"
                    >
                        <icon style="color: #cc4444">apps</icon>
                    </color-picker>
                    <color-picker
                        @selected="editor.chain().focus().setCellAttribute('borderColor', $event).run()"
                        :class="{ picker: true }"
                        title="kolor krawędzi"
                    >
                        <icon style="color: #cc4444">border_outer</icon>
                    </color-picker>
                    <button class="dropdown" title="krawędź lewa">
                        <div class="dropdown-label">
                            <icon>border_left</icon>
                        </div>
                        <div class="dropdown-list">
                            <div
                                class="dropdown-position"
                                @click="editor.chain().focus().setCellAttribute('borderLeft', '0').run()"
                            >
                                brak
                            </div>
                            <div
                                class="dropdown-position"
                                @click="editor.chain().focus().setCellAttribute('borderLeft', '1').run()"
                            >
                                cienka
                            </div>
                            <div
                                class="dropdown-position"
                                @click="editor.chain().focus().setCellAttribute('borderLeft', '3').run()"
                            >
                                gruba
                            </div>
                        </div>
                    </button>
                    <button class="dropdown" title="krawędź prawa">
                        <div class="dropdown-label">
                            <icon>border_right</icon>
                        </div>
                        <div class="dropdown-list">
                            <div
                                class="dropdown-position"
                                @click="editor.chain().focus().setCellAttribute('borderRight', '0').run()"
                            >
                                brak
                            </div>
                            <div
                                class="dropdown-position"
                                @click="editor.chain().focus().setCellAttribute('borderRight', '1').run()"
                            >
                                cienka
                            </div>
                            <div
                                class="dropdown-position"
                                @click="editor.chain().focus().setCellAttribute('borderRight', '3').run()"
                            >
                                gruba
                            </div>
                        </div>
                    </button>
                    <button class="dropdown" title="krawędź górna">
                        <div class="dropdown-label">
                            <icon>border_top</icon>
                        </div>
                        <div class="dropdown-list">
                            <div
                                class="dropdown-position"
                                @click="editor.chain().focus().setCellAttribute('borderTop', '0').run()"
                            >
                                brak
                            </div>
                            <div
                                class="dropdown-position"
                                @click="editor.chain().focus().setCellAttribute('borderTop', '1').run()"
                            >
                                cienka
                            </div>
                            <div
                                class="dropdown-position"
                                @click="editor.chain().focus().setCellAttribute('borderTop', '3').run()"
                            >
                                gruba
                            </div>
                        </div>
                    </button>
                    <button class="dropdown" title="krawędź dolna">
                        <div class="dropdown-label">
                            <icon>border_bottom</icon>
                        </div>
                        <div class="dropdown-list">
                            <div
                                class="dropdown-position"
                                @click="editor.chain().focus().setCellAttribute('borderBottom', '0').run()"
                            >
                                brak
                            </div>
                            <div
                                class="dropdown-position"
                                @click="editor.chain().focus().setCellAttribute('borderBottom', '1').run()"
                            >
                                cienka
                            </div>
                            <div
                                class="dropdown-position"
                                @click="editor.chain().focus().setCellAttribute('borderBottom', '3').run()"
                            >
                                gruba
                            </div>
                        </div>
                    </button>
                    <button class="dropdown" title="wszystkie krawędzie">
                        <div class="dropdown-label">
                            <icon>border_outer</icon>
                        </div>
                        <div class="dropdown-list">
                            <div
                                class="dropdown-position"
                                @click="
                                    editor
                                        .chain()
                                        .focus()
                                        .setCellAttribute('borderLeft', '0')
                                        .setCellAttribute('borderRight', '0')
                                        .setCellAttribute('borderTop', '0')
                                        .setCellAttribute('borderBottom', '0')
                                        .run()
                                "
                            >
                                brak
                            </div>
                            <div
                                class="dropdown-position"
                                @click="
                                    editor
                                        .chain()
                                        .focus()
                                        .setCellAttribute('borderLeft', '1')
                                        .setCellAttribute('borderRight', '1')
                                        .setCellAttribute('borderTop', '1')
                                        .setCellAttribute('borderBottom', '1')
                                        .run()
                                "
                            >
                                cienka
                            </div>
                            <div
                                class="dropdown-position"
                                @click="
                                    editor
                                        .chain()
                                        .focus()
                                        .setCellAttribute('borderLeft', '3')
                                        .setCellAttribute('borderRight', '3')
                                        .setCellAttribute('borderTop', '3')
                                        .setCellAttribute('borderBottom', '3')
                                        .run()
                                "
                            >
                                gruba
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>

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
                        <div class="draft" @click="loadDraft(draft)">
                            <span class="draft-name">
                                {{ draft.name + (draft.fromAutosave ? ' (autosave)' : '') }}
                            </span>
                            <span class="draft-date">
                                {{ draft.created.toLocaleDateString() }}
                            </span>
                            <span class="draft-date">
                                {{
                                    draft.lastModified.toLocaleDateString() +
                                    ' ' +
                                    draft.lastModified.toLocaleTimeString()
                                }}
                            </span>
                        </div>
                        <button @click="deleteDraft(draft)">usuń</button>
                    </div>
                </div>
            </div>
        </div>

        <image-picker
            :visible="showImagesDialog"
            @select="editor.commands.createImage($event)"
            @delete="deleteImage"
            @close="showImagesDialog = false"
        ></image-picker>

        <comment-popup
            v-if="editedCommentData"
            :id="editedCommentData.id"
            :pos="editedCommentData.pos"
            @closed="editedCommentData = null"
        />

        <bubble-menu
            :editor="editor"
            :options="{ placement: 'top', offset: 8 }"
            :should-show="() => editor.isActive('link')"
        >
            <link-popup
                v-if="editor"
                :href="editor.getAttributes('link').href"
                @updated="editor.chain().focus().extendMarkRange('link').setLink($event).run()"
            />
        </bubble-menu>
    </lesson>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, onMounted, onUnmounted, ref } from 'vue';
import { Editor, EditorContent, SingleCommands } from '@tiptap/vue-3';

import Lesson from '../lesson/Lesson.vue';
import ColorPicker from './ColorPicker.vue';
import Dropdown from './Dropdown.vue';
import DropdownOption from './DropdownOption.vue';
import ImagePicker from './ImagePicker.vue';

import LessonDoc from './nodes/Lesson';
import Title from './nodes/Title';
import Intro from './nodes/Intro';
import Chapter from './nodes/Chapter';
import ChapterTitle from './nodes/ChapterTitle';
import ChapterBody from './nodes/ChapterBody';
import SemanticTag from './nodes/SemanticTag';
import Expression from './nodes/Expression';
import ExpressionInline from './nodes/ExpressionInline';
import Example from './nodes/Example';
import Problem from './nodes/Problem';
import Formula from './nodes/Formula';
import Proof from './nodes/Proof';
import Canvas from './nodes/Canvas/Canvas';
import TextArea from './nodes/Canvas/TextAreaNode';
import RectangleNode from './nodes/Canvas/RectangleNode';
import CircleNode from './nodes/Canvas/CircleNode';
import LineNode from './nodes/Canvas/LineNode';
import PolygonNode from './nodes/Canvas/PolygonNode';
import ArcNode from './nodes/Canvas/ArcNode';
import CustomElement from './nodes/CustomElement';
import BuiltInComponent from './nodes/BuiltInComponent';
import CustomListItem from './nodes/ListItem';
import CustomTableCell from './nodes/TableCell';
import Placeholder from './extensions/Placeholder';
import ImageNode from './nodes/Image';
import Link from './marks/Link';
import NumberMark from './marks/NumberMark';
import TextColor from './marks/TextColor';
import Save from './extensions/DraftsManager/SaveExtension';
import Comment from './marks/Comment';
import MarkClick from './marks/MarkClick';
import CommentPopup from './CommentPopup.vue';
import { DraftPreview, LocalStorageSaver } from './extensions/DraftsManager/LocalStorageManager';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Strike from '@tiptap/extension-strike';
import Underline from '@tiptap/extension-underline';
import HardBreak from '@tiptap/extension-hard-break';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import TextAlign from '@tiptap/extension-text-align';
import { TableKit } from '@tiptap/extension-table';
import { Gapcursor, UndoRedo } from '@tiptap/extensions';
import LinkPopup from './LinkPopup.vue';
import { BubbleMenu } from '@tiptap/vue-3/menus';
import { allComments, lessonImages } from './shared-state';
import { Point } from '../utils/point';
import { ImageData } from '@/models/lesson';
import { onBeforeRouteLeave } from 'vue-router';

const proxy = getCurrentInstance()!.proxy;

const editor = ref<Editor>(null!);
const showDraftsDialog = ref(false);
const showImagesDialog = ref(false);
const editedCommentData = ref<{ id: string; pos: Point } | null>(null);
const availableDrafts = ref<DraftPreview[]>([]);
const toolbarPaddingTop = ref(0);

const shortMode = computed({
    get() {
        return editor.value?.storage.save.shortMode;
    },
    set(value: boolean) {
        editor.value.storage.save.shortMode = value;
    },
});

createEditor(false);

onMounted(() => {
    clearAll();
    loadContent();
    addEventListener('beforeunload', exitListener);
    nextTick(() => {
        addEventListener('scroll', scrollToolbar);
        scrollToolbar();
    });
    // transformAll();
});

onUnmounted(() => {
    editor.value.destroy();
    removeEventListener('beforeunload', exitListener);
    removeEventListener('scroll', scrollToolbar);
});

onBeforeRouteLeave((to: any, from: any, next: any) => {
    if (window.confirm('Opuścić stronę? Wprowadzone zmiany mogą nie zostać zapisane.')) {
        next();
    }
});

function createEditor(shortVersion: boolean) {
    editor.value = new Editor({
        extensions: [
            // tiptap extensions
            Paragraph,
            Text,
            Bold,
            Italic,
            Strike,
            Underline,
            HardBreak,
            BulletList,
            OrderedList,
            TableKit.configure({
                table: { resizable: true },
                tableCell: false,
            }),
            TextAlign.configure({
                types: ['paragraph'],
            }),
            Gapcursor,
            UndoRedo,

            // customized tiptap extensions
            CustomListItem,
            CustomTableCell,

            // custom extensions
            LessonDoc,
            Title.configure({ shortVersion }),
            Intro,
            Chapter,
            ChapterTitle,
            ChapterBody.configure({ shortVersion }),
            SemanticTag,
            Expression,
            ExpressionInline,
            Example,
            Problem,
            Formula,
            Proof,
            ImageNode,
            CustomElement,
            BuiltInComponent,

            Canvas,
            TextArea,
            RectangleNode,
            CircleNode,
            LineNode,
            PolygonNode,
            ArcNode,

            TextColor,
            NumberMark,
            Link,
            Comment,

            Placeholder.configure({
                emptyNodeText: (node) => {
                    if (node.type.name === 'title') {
                        return 'Tytuł lekcji';
                    } else if (node.type.name == 'chapterTitle') {
                        return 'Tytuł rozdziału';
                    } else if (
                        [
                            'semanticTag',
                            'expression',
                            'expressionInline',
                            'customElement',
                            'component',
                            'geometry',
                        ].includes(node.type.name)
                    ) {
                        return '';
                    }
                    return 'Treść sekcji';
                },
            }),
            MarkClick.configure({
                targets: [
                    {
                        selector: 'comment[comment-id]',
                        idAttr: 'comment-id',
                        onClick: ({ id, rect }) => (editedCommentData.value = { id, pos: rect }),
                    },
                ],
            }),
            Save,
        ],
    });
}

function insert(element: string, commands: SingleCommands) {
    switch (element) {
        case 'chapter':
            commands.createChapter();
            break;
        case 'section':
            commands.createSemanticTag();
            break;
        case 'example':
            commands.toggleExample();
            break;
        case 'problem':
            commands.createProblem();
            break;
        case 'expression':
            commands.createExpression();
            break;
        case 'expressionInline':
            commands.createExpressionInline();
            break;
        case 'theorem':
            commands.toggleFormula();
            break;
        case 'proof':
            commands.toggleProof();
            break;
        case 'image':
            showImagesDialog.value = true;
            break;
        case 'table':
            commands.insertTable({
                rows: 3,
                cols: 3,
                withHeaderRow: false,
            });
            break;
        case 'shape':
            commands.createGeometry();
            break;
        case 'html':
            commands.toggleCustomElement();
            break;
        case 'dynamic':
            commands.createComponent();
            break;
    }
}

function addComment() {
    editor.value.commands.addComment();
    const { from } = editor.value.state.selection;
    const dom = editor.value.view.domAtPos(from + 1);
    let el: HTMLElement | null = dom.node.nodeType === 1 ? (dom.node as HTMLElement) : dom.node.parentElement;

    while (el) {
        if (el.matches?.('comment[comment-id]')) {
            const id = el.getAttribute('comment-id')!;
            editedCommentData.value = { id, pos: el.getBoundingClientRect() };
            break;
        }
        el = el.parentElement;
    }
}

function clearAll() {
    allComments.value = {};
    lessonImages.value = {};
    clearContent();
    editor.value.storage.save.longVersionJSON = null;
    editor.value.storage.save.shortVersionJSON = null;
}

function createSecondMode() {
    editor.value.commands.saveToLocalStorage(true);
    const title = editor.value.state.doc.content.content[0].content.content[0];
    const wasShortMode = shortMode.value;
    editor.value.destroy();
    createEditor(!wasShortMode);
    shortMode.value = !wasShortMode;
    clearContent(title ? title.text : '');
}

function editSecondMode() {
    editor.value.commands.saveToLocalStorage(true);
    const wasShortMode = shortMode.value;
    const newContent = wasShortMode
        ? editor.value.storage.save.longVersionJSON
        : editor.value.storage.save.shortVersionJSON;
    editor.value.destroy();
    createEditor(!wasShortMode);
    shortMode.value = !wasShortMode;
    editor.value.commands.setContent(newContent);
}

function secondModeExists() {
    return shortMode.value ? editor.value?.storage.save.longVersionJSON : editor.value?.storage.save.shortVersionJSON;
}

function openDraftsDialog() {
    showDraftsDialog.value = true;
    availableDrafts.value = draftsList();
}

function closeDraftsDialog() {
    showDraftsDialog.value = false;
}

function loadDraft(draft: DraftPreview) {
    showDraftsDialog.value = false;
    shortMode.value = false;
    editor.value.commands.loadDraft(draft);
}

function deleteDraft(draft: DraftPreview) {
    editor.value.commands.deleteDraft(draft);
    availableDrafts.value = draftsList();
}

function deleteImage(image: ImageData, confirmedDelete: () => void) {
    let short = shortMode.value ? editor.value.getJSON() : editor.value.storage.save.shortVersionJSON;
    let long = shortMode.value ? editor.value.storage.save.longVersionJSON : editor.value.getJSON();
    const isInShort = short && hasImage(short, image.name);
    const isInLong = long && hasImage(long, image.name);
    if (isInLong) {
        alert('Obraz jest używany w wersji pełnej lekcji. Najpierw usuń jego wystąpienia.');
    } else if (isInShort) {
        alert('Obraz jest używany w wersji skróconej lekcji. Najpierw usuń jego wystąpienia.');
    } else {
        confirmedDelete();
    }
}

function hasImage(node: any, key: string): boolean {
    if (node.type == 'image' && node.attrs.key == key) {
        return true;
    }
    return node.content ? node.content.some((child: any) => hasImage(child, key)) : false;
}

function scrollToolbar() {
    if (document.body.scrollTop > 5 || document.documentElement.scrollTop > 5 || window.innerWidth < 700) {
        toolbarPaddingTop.value = 0;
    } else {
        toolbarPaddingTop.value = 150;
    }
}

function loadContent() {
    const sourceFile = proxy.$route.params.editSourceFile;
    if (sourceFile) {
        import(`@/assets/lessons/${sourceFile}`).then((file) => editor.value.commands.loadFromJSON(file));
    }
}

function clearContent(title?: string) {
    editor.value.commands.setContent(`
        <h1>${title ? title : ''}</h1>
        <intro></intro>
        <chapter>
            <chapter-title isHidden="false"></chapter-title>
            <chapter-body></chapter-body>
        </chapter>
    `);
}

function exitListener(event: any) {
    event.preventDefault();
    event.returnValue = '';
}

function draftsList(): DraftPreview[] {
    return LocalStorageSaver.draftsList().sort((d1, d2) => {
        const d1AutoSave = d1.fromAutosave ? 1 : 0;
        const d2AutoSave = d2.fromAutosave ? 1 : 0;
        return d1.name == d2.name ? d1AutoSave - d2AutoSave : d2.lastModified.getTime() - d1.lastModified.getTime();
    });
}
</script>

<style lang="scss">
@use '@/style/chapter';
@use '@/style/global';
@use '@/style/colors';
@use '@/style/fonts';

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

#tools-general,
.tools-specific {
    width: 100%;
    display: flex;
    background: colors.$light-gray;
    > * {
        display: inline-block;
    }

    button {
        padding: 10px 13px;
        min-width: 10px;
        height: 24px;
        &:hover {
            background: colors.$gray;
        }
        &.active {
            background: colors.$dark-gray;
        }
        &.active:hover {
            background: colors.$dark-gray;
            outline: 1px solid colors.$darker-gray;
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
    background: colors.$dark-gray;

    .dropdown-list {
        position: absolute;
        top: 44px;
        left: 0;
        z-index: 2;
        width: 100%;
        display: none;
        background: colors.$light-gray;
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
            background: colors.$gray;
        }
    }
}

.picker {
    padding: 0 10px;
}
.tools-specific button:hover {
    background: colors.$darker-gray;
}
#editor table ::selection,
#editor .math-display ::selection {
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
            background: colors.$main-red;
            color: white;
            font-family: fonts.$geometric-font;
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
                background: colors.$main-red;
                padding: 5px 10px;
                margin: 10px 5px;
                color: white;
                &:hover {
                    background: colors.$dark-red;
                }
            }
        }

        .draft {
            float: left;
            width: 500px;
            margin: 10px 10px 10px 5px;
            padding: 5px 10px;
            background: colors.$light-gray;
            cursor: pointer;
            &:hover {
                background: colors.$gray;
            }
        }

        .drafts-list-header {
            float: left;
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
#editor img {
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

comment {
    text-decoration: underline colors.$main-red dashed;
    text-decoration-thickness: 3px;
    text-decoration-skip-ink: none;
    background: #ffeeee;
    &:hover {
        background: #ffe5e5;
        cursor: pointer;
    }
}

a[lesson-url] {
    text-decoration: underline;
}

/*=== CONTENT - EDITOR SPECIFIC===*/
#editor table[style^='width:']:not([class]),
#editor table[style^='min-width:']:not([class]) {
    margin: 0 auto;

    > tbody > tr > td,
    > tbody > tr > th {
        padding: 0 2px;
        width: 26px;
        position: relative;
        border-style: solid;
        &.selectedCell {
            background: colors.$light-gray !important;
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

#editor .chapter-name > div + hr {
    width: 100%;
    box-sizing: border-box;
    border-color: black;
    background-color: black;
}

#editor .empty:first-child::before,
#editor .tags-wrapper + .empty::before {
    content: attr(data-empty-text);
    color: colors.$dark-gray;
    pointer-events: none;
    height: 0;
    float: left;
}
#editor h1.empty:first-child::before {
    float: right;
    text-align: center;
    width: 100%;
}
#editor div[data-empty-text='Tytuł lekcji'].empty:first-child::before {
    font-size: 3.2em;
    font-weight: bold;
    font-family: fonts.$secondary-font;
    line-height: 1em;
    float: right;
    text-align: center;
    width: 100%;
}
#editor .chapter-name.empty:first-child::before {
    color: colors.$darker-gray;
    font-family: fonts.$secondary-font;
    font-size: 1.9em;
    font-weight: bold;
}

#editor .chapter-name > div {
    cursor: inherit;
}

#editor .editor-comment {
    text-decoration: underline colors.$main-red dashed;
    text-decoration-thickness: 3px;
    text-decoration-skip-ink: none;
    background: #ffeeee;
    &:hover {
        background: #ffe5e5;
        cursor: pointer;
    }
}

#editor .example:hover {
    background-color: colors.$example-background;
}
</style>
