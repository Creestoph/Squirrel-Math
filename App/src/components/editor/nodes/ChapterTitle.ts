import { Node } from '@tiptap/vue-3';
import { Editor } from '@tiptap/core';
import { VueNodeViewRenderer } from '@tiptap/vue-3';
import ChapterTitleVue from './ChapterTitle.vue';
import { GapCursor } from 'prosemirror-gapcursor';
import { EditorState, Plugin } from '@tiptap/pm/state';
import { dropNewlines } from '../tiptap-utils';
import { Node as PMNode } from '@tiptap/pm/model';

export default Node.create({
    name: 'chapterTitle',
    content: 'text*',
    marks: '',
    parseHTML: () => [{ tag: 'chapter-title' }],
    renderHTML: ({ HTMLAttributes }) => ['chapter-title', HTMLAttributes, 0],
    addNodeView: () => VueNodeViewRenderer(ChapterTitleVue),
    addAttributes: () => ({
        isHidden: {
            default: false,
            parseHTML: (element) => element.getAttribute('isHidden') === 'true',
            renderHTML: (attributes) => ({ isHidden: attributes.isHidden }),
        },
    }),

    addKeyboardShortcuts() {
        const shouldPlaceGapCursor = (node: PMNode | null) => {
            return node?.isBlock && (!node.isTextblock || node.type.name === 'customElement');
        };

        const getPositionBeforeChapter = (state: EditorState) => {
            const { $from } = state.selection;
            const chapterDepth = $from.depth - 1;
            const chapterPos = $from.before(chapterDepth);
            const $boundary = state.doc.resolve(chapterPos);
            const nodeBeforeChapter = $boundary.nodeBefore!;
            const isIntroAbove = nodeBeforeChapter.type.name === 'intro';
            return isIntroAbove ? chapterPos - 1 : chapterPos - 2;
        };

        /**
         * Needed to support arrow navigation from chapter title; for some reason, it doesn't work by default.
         */
        const moveToChapterBody = ({ editor }: { editor: Editor }) => {
            const { $from } = editor.state.selection;
            if ($from.parent.type.name !== this.name) {
                return false;
            }

            // Go inside the next sibling position (should be chapter body)
            const pos = $from.after();
            const $pos = editor.state.doc.resolve(pos + 1);
            let targetPos = pos + 2;

            // If we're in the long version and hit a semantic tag, skip it
            if ($pos.nodeAfter?.type.name === 'semanticTag') {
                targetPos += $pos.nodeAfter.nodeSize;
            }

            const $targetPos = editor.state.doc.resolve(targetPos - 1);
            const nodeAfter = $targetPos.nodeAfter;
            if (shouldPlaceGapCursor(nodeAfter)) {
                editor.view.dispatch(editor.state.tr.setSelection(new GapCursor($targetPos)));
                return true;
            }

            return editor.commands.setTextSelection(targetPos);
        };

        const moveAboveChapterTitle = ({ editor }: { editor: Editor }) => {
            const { state, view } = editor;
            const { $from } = state.selection;
            if ($from.parent.type.name !== this.name) {
                return false;
            }

            const posBeforeChapter$ = state.doc.resolve(getPositionBeforeChapter(state));
            const nodeBeforeChapter = posBeforeChapter$.nodeBefore;

            if (shouldPlaceGapCursor(nodeBeforeChapter)) {
                view.dispatch(state.tr.setSelection(new GapCursor(posBeforeChapter$)));
                return true;
            }

            return false;
        };

        const enterAtStartCreatesParagraphAbove = ({ editor }: { editor: Editor }) => {
            const { state, view } = editor;
            const { $from } = state.selection;
            if ($from.parent.type.name !== this.name || $from.parentOffset !== 0) {
                return false;
            }

            const tr = state.tr.insert(getPositionBeforeChapter(state), state.schema.nodes.paragraph.createAndFill()!);
            view.dispatch(tr.scrollIntoView());

            return true;
        };

        const handleBackspaceInEmptyTitle = ({ editor }: { editor: Editor }) => {
            const { state, view } = editor;
            const { $from } = state.selection;

            if (
                $from.parent.type.name !== this.name ||
                $from.parent.textContent.length !== 0 ||
                $from.parentOffset !== 0
            ) {
                return false;
            }

            let chapterDepth = -1;
            for (let d = $from.depth; d > 0; d--) {
                if ($from.node(d).type.name === 'chapter') {
                    chapterDepth = d;
                    break;
                }
            }

            const chapter = $from.node(chapterDepth);
            const chapterPos = $from.before(chapterDepth);
            const chapterBody = chapter.child(1);
            const chapterBodyEmpty =
                chapterBody.children.every((c) => c.type.name === 'paragraph' || c.type.name === 'semanticTag') &&
                !chapterBody.textContent.trim();
            const $beforeChapter = state.doc.resolve(chapterPos);
            const nodeBeforeChapter = $beforeChapter.nodeBefore!;

            if (chapterBodyEmpty) {
                const tr = state.tr.delete(chapterPos, chapterPos + chapter.nodeSize);
                view.dispatch(tr);
                return true;
            } else if (nodeBeforeChapter.type.name !== 'title') {
                const insertPos = chapterPos + (nodeBeforeChapter.type.name === 'intro' ? -1 : -2);
                const tr = state.tr;
                let offset = 0;
                chapterBody.forEach((node) => {
                    tr.insert(insertPos + offset, node.copy(node.content));
                    offset += node.nodeSize;
                });
                tr.delete(tr.mapping.map(chapterPos), tr.mapping.map(chapterPos + chapter.nodeSize));
                view.dispatch(tr);
                return true;
            } else {
                return false;
            }
        };

        return {
            ArrowDown: moveToChapterBody,
            ArrowUp: moveAboveChapterTitle,
            Enter: enterAtStartCreatesParagraphAbove,
            Backspace: handleBackspaceInEmptyTitle,
        };
    },

    /**
     * Drop newline characters when pasting into title node
     */
    addProseMirrorPlugins() {
        return [
            new Plugin({
                props: {
                    handleDOMEvents: {
                        paste: (view, event) => {
                            const { state } = view;
                            const { $from } = state.selection;

                            /**
                             * Capturing "chapter" as well helps avoid weird errors with NodeSelection on chapter node.
                             * For some reason, "selectable: false" on chapter node doesn't prevent NodeSelection on chapter.
                             */
                            if ($from.parent.type.name !== 'chapterTitle' && $from.parent.type.name !== 'chapter') {
                                return false;
                            }

                            return dropNewlines(event as ClipboardEvent, view);
                        },
                    },
                },
            }),
        ];
    },
});
