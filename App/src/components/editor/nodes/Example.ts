import { Node } from '@tiptap/vue-2';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        example: {
            toggleExample: () => ReturnType;
        };
    }
}

export default Node.create({
    name: 'example',
    content: 'block+',
    group: 'block',
    defining: false,
    draggable: true,
    parseHTML: () => [{ tag: 'example' }],
    renderHTML: () => ['example', { class: 'example' }, 0],

    addCommands() {
        return {
            toggleExample:
                () =>
                ({ commands }) =>
                    commands.toggleWrap(this.type),
        };
    },
});
