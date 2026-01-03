import { Node } from '@tiptap/vue-3';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        problem: {
            createProblem: () => ReturnType;
        };
    }
}

export default Node.create({
    name: 'problem',
    content: 'inline*',
    group: 'block',
    marks: 'underline strike comment',
    parseHTML: () => [{ tag: 'problem' }],
    renderHTML: () => ['problem', { class: 'problem' }, 0],

    addCommands() {
        return {
            createProblem:
                () =>
                ({ commands }) =>
                    commands.setNode(this.type),
        };
    },
});
