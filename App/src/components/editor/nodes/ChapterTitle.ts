import { Node } from '@tiptap/vue-2';
import { Editor } from '@tiptap/core';
import { VueNodeViewRenderer } from '@tiptap/vue-2';
import ChapterTitleVue from './ChapterTitle.vue';
import { VueConstructor } from 'vue';

export default Node.create({
    name: 'chapterTitle',
    content: 'text*',
    marks: '',
    parseHTML: () => [{ tag: 'chapter-title' }],
    renderHTML: ({ HTMLAttributes }) => ['chapter-title', HTMLAttributes, 0],
    addNodeView: () => VueNodeViewRenderer(ChapterTitleVue as unknown as VueConstructor<Vue>), // TODO fix types after Vue 3 migration
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

            return editor.commands.setTextSelection(targetPos);
        };
        return {
            ArrowDown: moveToChapterBody,
            Enter: moveToChapterBody,
        };
    },
});
