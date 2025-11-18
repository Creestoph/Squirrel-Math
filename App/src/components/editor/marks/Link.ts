import { Mark } from '@tiptap/vue-3';
import { getSurroundingWord } from '../tiptap-utils';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        link: {
            setLink: (href?: string) => ReturnType;
        };
    }
}

export default Mark.create({
    name: 'link',
    inclusive: false,

    addAttributes() {
        return {
            href: { default: '' },
        };
    },

    parseHTML: () => [
        {
            tag: 'a[lesson-url]',
            getAttrs: (dom) => ({ href: dom.getAttribute('lesson-url')! }),
        },
    ],

    renderHTML: ({ HTMLAttributes }) => ['a', { class: 'link', 'lesson-url': HTMLAttributes.href }, 0],

    addCommands() {
        return {
            setLink:
                (href = '') =>
                ({ commands, state, chain }) => {
                    const { selection } = state;

                    if (!selection.empty) {
                        return commands.setMark(this.type, { href });
                    }

                    const word = getSurroundingWord(selection.$from);

                    if (!word) {
                        return false;
                    }

                    return chain()
                        .setTextSelection(word)
                        .setMark(this.type, { href })
                        .setTextSelection(selection.from)
                        .run();
                },
        };
    },
});
