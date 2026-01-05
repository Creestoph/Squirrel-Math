import { Node } from '@tiptap/vue-3';
import { Editor } from '@tiptap/core';
import { VueNodeViewRenderer } from '@tiptap/vue-3';
import ChapterTitleVue from './ChapterTitle.vue';
import { GapCursor } from 'prosemirror-gapcursor';
import { Plugin } from '@tiptap/pm/state';
import { dropNewlines } from '../tiptap-utils';

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
        /**
         * Needed to support arrow navigation from chapter title; for some reason, it doesn't work by default.
         */
        const moveToChapterBody = ({ editor }: { editor: Editor }) => {
            const { $from } = editor.state.selection;

            // Only handle if we're in chapter title
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
            if (nodeAfter?.isBlock && (!nodeAfter.isTextblock || nodeAfter.type.name === 'customElement')) {
                editor.view.dispatch(editor.state.tr.setSelection(new GapCursor($targetPos)));
                return true;
            }

            return editor.commands.setTextSelection(targetPos);
        };
        return {
            ArrowDown: moveToChapterBody,
            Enter: moveToChapterBody,
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
                             * Capturing "chapter" as well helps avoid weird errors with NodeSelection on chapter node
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
