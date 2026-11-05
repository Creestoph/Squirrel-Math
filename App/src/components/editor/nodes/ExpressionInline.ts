import ExpressionVue from './Expression.vue';
import { Node } from '@tiptap/vue-3';
import { VueNodeViewRenderer } from '@tiptap/vue-3';
import { Slice } from '@tiptap/pm/model';
import { Plugin } from '@tiptap/pm/state';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        expressionInline: { createExpressionInline: () => ReturnType };
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

    addNodeView: () => VueNodeViewRenderer(ExpressionVue),

    addProseMirrorPlugins() {
        return [
            new Plugin({
                props: {
                    transformPasted: (slice) => {
                        const content = slice.content;
                        // For some reason, when selecting an expression by click (NodeSelection) and copy-pasting it,
                        // two unwanted hardBreaks occur after it - remove them manually
                        if (
                            slice.openStart !== 0 ||
                            slice.openEnd !== 0 ||
                            content.childCount !== 3 ||
                            content.child(0).type !== this.type ||
                            content.child(1).type.name !== 'hardBreak' ||
                            content.child(2).type.name !== 'hardBreak'
                        ) {
                            return slice;
                        }

                        return new Slice(content.cut(0, content.firstChild!.nodeSize), slice.openStart, slice.openEnd);
                    },
                },
            }),
        ];
    },

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
        return { 'Alt-=': ({ editor }) => editor.commands.createExpressionInline() };
    },
});
