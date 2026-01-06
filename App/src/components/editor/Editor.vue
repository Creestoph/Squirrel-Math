<template>
    <lesson>
        <div class="toolbar no-selection" :style="{ left: lessonLeftPos }">
            <div v-if="editor">
                <div class="tools-managing">
                    <button @click="editor.commands.undo" title="cofnij akcję (Ctrl + Z)">
                        <icon>undo</icon>
                    </button>

                    <button @click="editor.commands.redo" title="przywróć akcję (Ctrl + Y)">
                        <icon>redo</icon>
                    </button>

                    <button @click="onSave()" title="zapisz (Ctrl + S)">
                        <icon>save</icon>
                    </button>

                    <button @click="onSaveAsNew()" title="zapisz jako...">
                        <icon>save_as</icon>
                    </button>

                    <button @click="showDraftsDialog = true" title="wczytaj">
                        <icon>login</icon>
                    </button>

                    <button @click="onCreateNewLesson()" title="edytuj nową lekcję">
                        <icon>control_point</icon>
                    </button>

                    <button
                        @click="onEditSecondMode()"
                        :title="`${secondModeData() ? 'edytuj' : 'stwórz'} wersję ${shortMode ? 'pełną' : 'skróconą'}`"
                    >
                        <icon>pill</icon>
                    </button>
                </div>
                <div class="tools-general">
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
                        title="przekreślenie tekstu (Ctrl + Shift + S)"
                    >
                        abc
                    </button>

                    <color-picker
                        @selected="editor.chain().focus().setColor({ color: $event }).run()"
                        class="picker"
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

                    <dropdown class="insert-dropdown" :opensToRight="false" @selected="insert($event)" title="wstaw">
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
                        class="picker"
                        title="kolor tła"
                    >
                        <icon style="color: #cc4444">apps</icon>
                    </color-picker>
                    <color-picker
                        @selected="
                            editor
                                .chain()
                                .focus()
                                .setTableBorderAttribute('borderColor', 'Left', $event)
                                .setTableBorderAttribute('borderColor', 'Right', $event)
                                .setTableBorderAttribute('borderColor', 'Top', $event)
                                .setTableBorderAttribute('borderColor', 'Bottom', $event)
                                .run()
                        "
                        class="picker"
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
                                @click="editor.chain().focus().setTableBorderAttribute('border', 'Left', '0').run()"
                            >
                                brak
                            </div>
                            <div
                                class="dropdown-position"
                                @click="editor.chain().focus().setTableBorderAttribute('border', 'Left', '1').run()"
                            >
                                cienka
                            </div>
                            <div
                                class="dropdown-position"
                                @click="editor.chain().focus().setTableBorderAttribute('border', 'Left', '3').run()"
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
                                @click="editor.chain().focus().setTableBorderAttribute('border', 'Right', '0').run()"
                            >
                                brak
                            </div>
                            <div
                                class="dropdown-position"
                                @click="editor.chain().focus().setTableBorderAttribute('border', 'Right', '1').run()"
                            >
                                cienka
                            </div>
                            <div
                                class="dropdown-position"
                                @click="editor.chain().focus().setTableBorderAttribute('border', 'Right', '3').run()"
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
                                @click="editor.chain().focus().setTableBorderAttribute('border', 'Top', '0').run()"
                            >
                                brak
                            </div>
                            <div
                                class="dropdown-position"
                                @click="editor.chain().focus().setTableBorderAttribute('border', 'Top', '1').run()"
                            >
                                cienka
                            </div>
                            <div
                                class="dropdown-position"
                                @click="editor.chain().focus().setTableBorderAttribute('border', 'Top', '3').run()"
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
                                @click="editor.chain().focus().setTableBorderAttribute('border', 'Bottom', '0').run()"
                            >
                                brak
                            </div>
                            <div
                                class="dropdown-position"
                                @click="editor.chain().focus().setTableBorderAttribute('border', 'Bottom', '1').run()"
                            >
                                cienka
                            </div>
                            <div
                                class="dropdown-position"
                                @click="editor.chain().focus().setTableBorderAttribute('border', 'Bottom', '3').run()"
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
                                        .setTableBorderAttribute('border', 'Left', '0')
                                        .setTableBorderAttribute('border', 'Right', '0')
                                        .setTableBorderAttribute('border', 'Top', '0')
                                        .setTableBorderAttribute('border', 'Bottom', '0')
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
                                        .setTableBorderAttribute('border', 'Left', '1')
                                        .setTableBorderAttribute('border', 'Right', '1')
                                        .setTableBorderAttribute('border', 'Top', '1')
                                        .setTableBorderAttribute('border', 'Bottom', '1')
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
                                        .setTableBorderAttribute('border', 'Left', '3')
                                        .setTableBorderAttribute('border', 'Right', '3')
                                        .setTableBorderAttribute('border', 'Top', '3')
                                        .setTableBorderAttribute('border', 'Bottom', '3')
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

        <!-- TODO make component -->
        <div class="popup-backdrop" v-if="exitPending">
            <div class="popup">
                Zapisać zmiany przed opuszczeniem strony?
                <button @click="onSaveAndExit()">Tak</button>
                <button @click="onDiscardAndExit()">Nie</button>
                <button @click="exitPending = null">Anuluj</button>
            </div>
        </div>

        <editor-content class="editor" :editor="editor" />

        <drafts-load-popup v-if="showDraftsDialog" @load="loadDraft" @close="showDraftsDialog = false" />

        <image-picker
            :visible="showImagesDialog"
            @select="editor.commands.createImage($event)"
            @delete="deleteImage"
            @close="showImagesDialog = false"
        />

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
import { onMounted, onUnmounted, ref } from 'vue';
import { EditorContent, Editor } from '@tiptap/vue-3';
import Icon from '../Icon.vue';

import Lesson from '../lesson/Lesson.vue';
import ColorPicker from './ColorPicker.vue';
import Dropdown from './Dropdown.vue';
import DropdownOption from './DropdownOption.vue';
import ImagePicker from './ImagePicker.vue';
import DraftsLoadPopup from './DraftsLoadPopup.vue';

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
import Comment from './marks/Comment';
import MarkClick from './marks/MarkClick';
import CommentPopup from './CommentPopup.vue';
import { DraftPreview, LocalStorageSaver } from './LocalStorageManager';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import HardBreak from '@tiptap/extension-hard-break';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import TextAlign from '@tiptap/extension-text-align';
import { TableKit, TableRow } from '@tiptap/extension-table';
import { Gapcursor, UndoRedo } from '@tiptap/extensions';
import LinkPopup from './LinkPopup.vue';
import { BubbleMenu } from '@tiptap/vue-3/menus';
import { allComments, lessonImages } from './shared-state';
import { Point } from '../../models/point';
import { ImageData, LessonData, LessonVersionData } from '@/models/lesson';
import { NavigationGuardNext, onBeforeRouteLeave, useRoute, useRouter } from 'vue-router';
import TableBorders from './extensions/TableBorders';
import { useLessonExpandedInfo } from '../utils/menu-bus';
import CustomBold from './marks/Bold';
import CustomItalic from './marks/Italic';
import CustomStrike from './marks/Strike';
import CustomUnderline from './marks/Underline';
import { transformAll } from './lessons-transform';
import { getLessonTitle } from './tiptap-utils';
import { SaveManager } from './SaveManager';

const router = useRouter();
const route = useRoute();
const { lessonLeftPos } = useLessonExpandedInfo();
const saveManager = new SaveManager();

const editor = ref<Editor>(null!);
const showDraftsDialog = ref(false);
const showImagesDialog = ref(false);
const exitPending = ref<(() => void) | null>(null);
const editedCommentData = ref<{ id: string; pos: Point } | null>(null);
const shortMode = ref(false);
const lessonData = {
    short: null as LessonVersionData | null,
    long: null as LessonVersionData | null,
};
let autoSaveObserverId: number;

createEditor(false);

onMounted(() => {
    clearAll();
    loadContent();
    createAutoSave();
    addEventListener('beforeunload', exitListener);
    addEventListener('keydown', onQuickSave);
    // transformAll();
});

onUnmounted(() => {
    editor.value.destroy();
    clearInterval(autoSaveObserverId);
    removeEventListener('beforeunload', exitListener);
    removeEventListener('keydown', onQuickSave);
});

onBeforeRouteLeave((to: any, from: any, next: NavigationGuardNext) => {
    if (saveManager.getIsDirty()) {
        exitPending.value = next;
    } else {
        next();
    }
});

function createAutoSave() {
    autoSaveObserverId = setInterval(() => {
        if (saveManager.getIsDirty()) {
            saveManager.saveToLocalStorage(saveManager.getCurrentDraftName(), currentLessonData(), true);
        }
    }, 60 * 1000);
}

function createEditor(shortVersion: boolean) {
    editor.value = new Editor({
        extensions: [
            // tiptap extensions
            Paragraph,
            Text,
            HardBreak,
            BulletList,
            OrderedList,
            TableKit.configure({
                table: { resizable: true },
                tableCell: false,
                tableHeader: false,
                tableRow: false,
            }),
            TextAlign.configure({
                types: ['paragraph'],
            }),
            Gapcursor,
            UndoRedo,
            TableRow.extend({
                content: 'tableCell*',
            }),

            // customized tiptap extensions
            CustomBold,
            CustomItalic,
            CustomStrike,
            CustomUnderline,
            CustomListItem,
            CustomTableCell,
            TableBorders,

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
        ],
    });

    editor.value.on('update', () => saveManager.setIsDirty(true));
}

function loadContent() {
    const sourceFile = route.params.editSourceFile;
    if (sourceFile) {
        import(`@/assets/lessons/${sourceFile}`).then((file: LessonData) => {
            lessonData.short = file.short || null;
            lessonData.long = file.long || null;
            saveManager.loadFromJSON(file);
            saveManager.makeNewFile(getLessonTitle(editor.value));
            editor.value.commands.setContent(currentModeData());
            saveManager.setIsDirty(false);
        });
    }
}

function insert(element: string) {
    switch (element) {
        case 'chapter':
            editor.value.commands.createChapter();
            break;
        case 'section':
            editor.value.commands.createSemanticTag();
            break;
        case 'example':
            editor.value.commands.toggleExample();
            break;
        case 'problem':
            editor.value.commands.createProblem();
            break;
        case 'expression':
            editor.value.commands.createExpression();
            break;
        case 'expressionInline':
            editor.value.commands.createExpressionInline();
            break;
        case 'theorem':
            editor.value.commands.toggleFormula();
            break;
        case 'proof':
            editor.value.commands.toggleProof();
            break;
        case 'image':
            showImagesDialog.value = true;
            break;
        case 'table':
            editor.value.commands.insertTable({
                rows: 3,
                cols: 3,
                withHeaderRow: false,
            });
            break;
        case 'shape':
            editor.value.chain().focus().createGeometry().run();
            break;
        case 'html':
            editor.value.commands.toggleCustomElement();
            break;
        case 'dynamic':
            editor.value.commands.createComponent();
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

function onCreateNewLesson() {
    if (saveManager.getIsDirty()) {
        exitPending.value = onCreateNewLesson;
    } else {
        router.replace('/editor');
        saveManager.makeNewFile(null);
        clearAll();
    }
}

function loadDraft(draft: DraftPreview) {
    showDraftsDialog.value = false;
    if (saveManager.getIsDirty()) {
        exitPending.value = () => loadDraft(draft);
        return;
    }
    router.replace('/editor');
    if (shortMode.value) {
        onEditSecondMode();
    }
    const lesson = saveManager.loadDraft(draft);
    lessonData.short = lesson.short;
    lessonData.long = lesson.long;
    editor.value.commands.setContent(currentModeData());
    saveManager.setIsDirty(!saveManager.getCurrentDraftName());
}

function clearAll() {
    allComments.value = {};
    lessonImages.value = {};
    clearContent();
    lessonData.long = lessonData.short = null;
}

function onEditSecondMode() {
    const wasDirty = saveManager.getIsDirty();
    if (wasDirty) {
        saveManager.saveToLocalStorage(saveManager.getCurrentDraftName(), currentLessonData(), true);
    }
    const newContent = secondModeData();
    shortMode.value = !shortMode.value;
    const title = getLessonTitle(editor.value);
    editor.value.destroy();
    createEditor(shortMode.value);
    if (newContent) {
        editor.value.commands.setContent(newContent);
    } else {
        clearContent(title || undefined);
    }
    saveManager.setIsDirty(wasDirty);
}

function currentLessonData(): { short: LessonVersionData | null; long: LessonVersionData | null } {
    const data = editor.value.getJSON() as LessonVersionData;
    if (shortMode.value) {
        lessonData.short = data;
    } else {
        lessonData.long = data;
    }
    return lessonData;
}

function currentModeData() {
    return shortMode.value ? lessonData.short : lessonData.long;
}

function secondModeData() {
    return shortMode.value ? lessonData.long : lessonData.short;
}

function deleteImage(image: ImageData, confirmedDelete: () => void) {
    let short = shortMode.value ? editor.value.getJSON() : lessonData.short;
    let long = shortMode.value ? lessonData.long : editor.value.getJSON();
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

function defineLessonTitle(): string | null {
    return saveManager.getCurrentDraftName() || typeNewLessonTitle();
}

function typeNewLessonTitle(): string | null {
    return window.prompt('Zapisz jako:', getLessonTitle(editor.value) || undefined);
}

function onQuickSave(event: KeyboardEvent) {
    if (event.key === 's' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        const title = defineLessonTitle();
        if (title !== null) {
            saveManager.saveToLocalStorage(title, currentLessonData(), false);
        }
    }
}

function onSave() {
    const title = defineLessonTitle();
    if (title !== null) {
        const data = currentLessonData();
        saveManager.saveToFile(title, data);
        saveManager.saveToLocalStorage(title, data);
        saveManager.setIsDirty(false);
    }
}

function onSaveAsNew() {
    const title = typeNewLessonTitle();
    if (title !== null) {
        const data = currentLessonData();
        saveManager.saveToFile(title, data);
        saveManager.makeNewFile(title);
        saveManager.saveToLocalStorage(title, data);
        saveManager.setIsDirty(false);
    }
}

function onSaveAndExit() {
    saveManager.saveToLocalStorage(defineLessonTitle(), currentLessonData());
    saveManager.setIsDirty(false);
    exitPending.value!();
    exitPending.value = null;
}

function onDiscardAndExit() {
    LocalStorageSaver.deleteDraft({ fromAutosave: true, id: saveManager.getCurrentDraftId() });
    saveManager.setIsDirty(false);
    exitPending.value!();
    exitPending.value = null;
}

function clearContent(title?: string) {
    editor.value.commands.setContent(`
        <h1>${title || ''}</h1>
        <intro></intro>
        <chapter>
            <chapter-title isHidden="false"></chapter-title>
            <chapter-body></chapter-body>
        </chapter>
    `);
    saveManager.setIsDirty(false);
}

function exitListener(event: any) {
    event.preventDefault();
    event.returnValue = '';
}
</script>

<style lang="scss">
@use '@/style/global';
@use '@/style/colors';
@use '@/style/fonts';
@use '@/style/chapter';
@use '@/style/example';
@use '@/style/problem';
@use '@/style/formula';

/*=== TOOLS ===*/
.ProseMirror {
    outline: none !important;
}
.editor {
    margin-top: 171px; // minimum to ensure LinkPopup for the very first line of intro stays below (expanded) menu
}
.toolbar {
    position: fixed;
    top: 0;
    width: 100%;
    transition: padding 1s;
    z-index: 3;
    background: white;
    transition: left 1s;
}

@media screen and (min-width: 1200px) {
    .toolbar {
        width: 86%;
    }
}

.tools-managing,
.tools-general,
.tools-specific {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    > * {
        display: inline-block;
    }

    button {
        flex: 1;
        min-width: 10px;
        max-width: 44px;
        height: 47px;
        display: flex;
        align-items: center;
        justify-content: center;

        &::before,
        &::after {
            content: '';
            flex: 1 1 20px;
            max-width: 10px;
        }
        > * {
            flex: 0 0 24px;
        }

        &.active:hover {
            outline-offset: -1px;
        }
    }
}

.tools-managing button {
    &:hover {
        background: colors.$gray;
    }

    &.active {
        background: colors.$dark-gray;
    }

    &.active:hover {
        background: colors.$dark-gray;
        outline: 1px solid colors.$darker-gray;
    }
}

@media screen and (max-width: 650px) {
    .tools-managing {
        height: 94px;
        padding-left: 240px;
    }
}

.tools-general {
    background: #ffeeee;

    [dropdown-option] {
        line-height: 24px;
        background: #ffeeee;
        span {
            display: inline-block;
            margin-right: 20px;
        }
        &:hover {
            background: #d1baba;
        }
    }

    button {
        &.active {
            background: #ffaaaa;
        }

        &:hover {
            background: #ffcccc;
        }

        &.active:hover {
            background: #ffaaaa;
            outline: 1px solid #ff7777;
        }
    }
}

@media screen and (min-width: 650px) {
    .tools-general {
        padding-left: 220px;
    }
}

.tools-specific {
    background: #ffdddd;

    .dropdown {
        position: relative;
    }

    .dropdown-label {
        display: flex;
    }
    .dropdown-list {
        position: absolute;
        top: 47px;
        right: 0;
        z-index: 2;
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

    button:hover {
        background: #ffaaaa;
    }
}
.editor table ::selection,
.editor .math-display ::selection {
    color: inherit;
}

.insert-dropdown div[value] {
    display: flex;
}

/*=== CONTENT - GENERAL===*/
.editor img {
    display: block;
    margin: 20px auto;
    max-width: 100%;

    &.ProseMirror-selectednode {
        outline: 4px dotted colors.$main-red;
    }
}

.editor table img {
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

/*=== POPUP ===*/
.popup-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 4;

    .popup {
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        text-align: center;

        button {
            margin: 10px;
            padding: 8px 16px;
            font-size: 1em;
            cursor: pointer;

            &:hover {
                background: colors.$light-gray;
            }
        }
    }
}

/*=== CONTENT - EDITOR SPECIFIC===*/
.editor table[style^='width:']:not([class]),
.editor table[style^='min-width:']:not([class]) {
    margin: 0 auto;
    table-layout: fixed; // critical for proper resize of cell with canvas

    > tbody > tr > td {
        padding: 0 2px;
        position: relative;
        border-style: solid;
        &.selectedCell {
            background: colors.$light-gray !important;
        }
        &::after {
            content: ' ';
            position: absolute;
            right: -6px;
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

.editor .chapter-name > div + hr {
    width: 100%;
    box-sizing: border-box;
    border-color: black;
    background-color: black;
}

.editor .empty:first-child::before,
.editor .tags-wrapper + .empty::before {
    content: attr(data-empty-text);
    color: colors.$dark-gray;
    pointer-events: none;
    height: 0;
    float: left;
    white-space: nowrap;
}
.editor h1.empty:first-child::before {
    float: right;
    text-align: center;
    width: 100%;
}
.editor div[data-empty-text='Tytuł lekcji'].empty:first-child::before {
    font-size: 3.2em;
    font-weight: bold;
    font-family: fonts.$secondary-font;
    line-height: 1em;
    float: right;
    text-align: center;
    width: 100%;
}
.editor .chapter-name.empty:first-child::before {
    color: colors.$darker-gray;
    font-family: fonts.$secondary-font;
    font-size: 1.9em;
    font-weight: bold;
}

.editor .chapter-name > div {
    cursor: inherit;
}

.editor .editor-comment {
    text-decoration: underline colors.$main-red dashed;
    text-decoration-thickness: 3px;
    text-decoration-skip-ink: none;
    background: #ffeeee;
    &:hover {
        background: #ffe5e5;
        cursor: pointer;
    }
}

.editor .example:hover {
    background-color: colors.$example-background;
}

/*
 * sometimes prosemirror adds "ProseMirror-hideselection" class which makes selection background transparent,
 * but leaves text color unchanged (white), making text invisible...
 */
.ProseMirror-hideselection *::selection {
    background: #ff6666 !important;
    color: white !important;
}
</style>
