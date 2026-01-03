import { Node } from '@tiptap/vue-3';

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
