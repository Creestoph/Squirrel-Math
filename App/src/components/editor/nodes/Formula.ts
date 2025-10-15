import { Node } from '@tiptap/vue-2';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        formula: {
            toggleFormula: () => ReturnType;
        };
    }
}

export default Node.create({
    name: 'formula',
    content: '(paragraph | expression | orderedList | bulletList)+',
    group: 'block',
    defining: true,
    draggable: true,
    parseHTML: () => [{ tag: 'formula' }],
    renderHTML: () => ['formula', { class: 'formula' }, 0],
    addCommands() {
        return {
            toggleFormula:
                () =>
                ({ commands }) =>
                    commands.toggleWrap(this.type),
        };
    },
});
