import ExpressionInlineVue from './ExpressionInline.vue';
import { Node, nodeInputRule, nodePasteRule } from '@tiptap/vue-2';
import { VueNodeViewRenderer } from '@tiptap/vue-2';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        expressionInline: {
            createExpressionInline: () => ReturnType;
        };
    }
}

export default Node.create({
    name: 'expressionInline',
    inline: true,
    group: 'inline',

    parseHTML: () => [{ tag: 'expression-inline' }],

    renderHTML: ({ HTMLAttributes }) => ['expression-inline', HTMLAttributes],

    addAttributes() {
        return {
            mathJax: {
                default: '',
                parseHTML: (element) => element.getAttribute('mathJax'),
                renderHTML: (attributes) => ({ mathJax: attributes.mathJax }),
            },
        };
    },

    addNodeView: () => VueNodeViewRenderer(ExpressionInlineVue),

    addCommands() {
        return {
            createExpressionInline:
                () =>
                ({ state, chain }) => {
                    const selectionContent = state.selection.content().content;
                    const node = this.type.create({ mathJax: selectionContent.textBetween(0, selectionContent.size) });
                    return chain().deleteSelection().insertContentAt(state.selection.$from.pos, node).run();
                },
        };
    },

    addKeyboardShortcuts() {
        return {
            'Alt-=': ({ editor }) => editor.commands.createExpressionInline(),
        };
    },

    addInputRules() {
        return [
            nodeInputRule({
                find: /(?:^|[^$])(\$([^$]+)\$)$/,
                type: this.type,
                getAttributes: (match) => ({ mathJax: match[2] }),
            }),
        ];
    },

    addPasteRules() {
        return [
            nodePasteRule({
                find: /(?:^|[^$])(\$([^$]+)\$)/g,
                type: this.type,
                getAttributes: (match) => ({ mathJax: match[2] }),
            }),
        ];
    },
});
