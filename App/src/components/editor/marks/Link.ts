import { Mark } from '@tiptap/vue-2';

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
                ({ commands }) =>
                    commands.setMark(this.type, { href }),
        };
    },
});
