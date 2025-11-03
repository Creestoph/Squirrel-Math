import { Mark } from '@tiptap/vue-3';

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
                ({ commands }) =>
                    commands.setMark(this.type, { id: attrs.id || idCounter++ }),
        };
    },
});
