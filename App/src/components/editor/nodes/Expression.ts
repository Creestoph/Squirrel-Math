import ExpressionVue from './Expression.vue';
import { Node, nodeInputRule, nodePasteRule } from '@tiptap/vue-3';
import { VueNodeViewRenderer } from '@tiptap/vue-3';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        expression: {
            createExpression: (attrs?: { tags?: string[]; required?: string[] }) => ReturnType;
        };
    }
}

export default Node.create({
    name: 'expression',
    group: 'block',
    draggable: true,

    parseHTML: () => [{ tag: 'expression' }],

    renderHTML: ({ HTMLAttributes }) => ['expression', HTMLAttributes],

    addAttributes() {
        return {
            mathJax: {
                default: '',
                parseHTML: (element) => element.getAttribute('mathJax'),
                renderHTML: (attributes) => ({ mathJax: attributes.mathJax }),
            },
        };
    },

    addNodeView: () => VueNodeViewRenderer(ExpressionVue),

    addCommands() {
        return {
            createExpression:
                () =>
                ({ state, chain }) => {
                    const selectionContent = state.selection.content().content;
                    const node = this.type.create({ mathJax: selectionContent.textBetween(0, selectionContent.size) });
                    return chain().deleteSelection().insertContentAt(state.selection.$from.pos, node).run();
                },
        };
    },
});
