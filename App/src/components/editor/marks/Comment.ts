import { Mark } from '@tiptap/vue-3';
import { getSurroundingWord } from '../tiptap-utils';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        comment: {
            addComment: (attrs?: { id?: string | number }) => ReturnType;
        };
    }
}

let idCounter = 1;

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
            //when block of text is copy-pasted, comment gets new id, but same ids get same new ids
            getAttrs: (dom) => ({ id: 1000 + dom.getAttribute('comment-id')! }),
        },
    ],

    renderHTML: ({ HTMLAttributes }) => ['comment', { 'comment-id': HTMLAttributes.id }, 0],

    addCommands() {
        return {
            addComment:
                (attrs = {}) =>
                ({ commands, state, chain }) => {
                    const id = attrs.id || idCounter++;
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
