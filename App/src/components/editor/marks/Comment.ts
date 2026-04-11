import { Mark } from '@tiptap/vue-3';
import { getSurroundingWord } from '../tiptap-utils';
import { allComments } from '../shared-state';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        comment: {
            addComment: (attrs?: { id?: string | number }) => ReturnType;
        };
    }
}

export default Mark.create({
    name: 'comment',
    inclusive: false,

    addAttributes() {
        return {
            id: { default: '' },
        };
    },

    parseHTML: () => [
        {
            tag: 'comment',
            getAttrs: (dom) => ({ id: dom.getAttribute('comment-id') }),
        },
    ],

    renderHTML: ({ HTMLAttributes }) => ['comment', { 'comment-id': HTMLAttributes.id }, 0],

    addCommands() {
        return {
            addComment:
                (attrs = {}) =>
                ({ commands, state, chain }) => {
                    const existingIds = Object.keys(allComments.value).map((id) => parseInt(id, 10));
                    const lastId = Math.max(...existingIds, 0);
                    const id = attrs.id || lastId + 1;
                    const { selection } = state;

                    if (!selection.empty) {
                        return commands.setMark(this.type, { id });
                    }

                    const word = getSurroundingWord(selection.$from);

                    if (!word) {
                        return false;
                    }

                    return chain()
                        .setTextSelection(word)
                        .setMark(this.type, { id })
                        .setTextSelection(selection.from)
                        .run();
                },
        };
    },
});
