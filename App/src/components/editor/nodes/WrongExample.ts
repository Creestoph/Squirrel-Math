import { Node } from '@tiptap/vue-3';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        wrong: { toggleWrongExample: () => ReturnType };
    }
}

export default Node.create({
    name: 'wrong',
    content: 'block+',
    group: 'block',
    draggable: true,
    parseHTML: () => [{ tag: 'wrong' }],
    renderHTML: () => ['wrong', { class: 'wrong' }, 0],

    addCommands() {
        return {
            toggleWrongExample:
                () =>
                ({ commands }) =>
                    commands.toggleWrap(this.type),
        };
    },
});
