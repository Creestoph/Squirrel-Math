import ExpressionVue from './Expression.vue';
import { Fragment, Node as ProseMirrorNode, Schema } from '@tiptap/pm/model';
import { Node } from '@tiptap/vue-3';
import { VueNodeViewRenderer } from '@tiptap/vue-3';

function trimLeadingWhitespace(fragment: Fragment, schema: Schema) {
    const children: ProseMirrorNode[] = [];
    let trimmed = false;

    fragment.forEach((child) => {
        if (!trimmed && child.isText) {
            const text = child.text!.replace(/^\s/, '');
            trimmed = true;

            if (text) {
                children.push(schema.text(text, child.marks));
            }
        } else {
            children.push(child);
        }
    });

    return Fragment.fromArray(children);
}

function trimTrailingWhitespace(fragment: Fragment, schema: Schema) {
    const children: ProseMirrorNode[] = [];

    fragment.forEach((child) => children.push(child));

    for (let i = children.length - 1; i >= 0; i--) {
        const child = children[i];

        if (!child.isText) {
            continue;
        }

        const text = child.text!.replace(/\s$/, '');

        if (text) {
            children[i] = schema.text(text, child.marks);
        } else {
            children.splice(i, 1);
        }
        break;
    }

    return Fragment.fromArray(children);
}

function startsWithWhitespace(fragment: Fragment) {
    return fragment.firstChild?.isText && /^\s/.test(fragment.firstChild.text!);
}

function endsWithWhitespace(fragment: Fragment) {
    return fragment.lastChild?.isText && /\s$/.test(fragment.lastChild.text!);
}
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        expression: {
            createExpression: (attrs?: { tags?: string[]; required?: string[] }) => ReturnType;
            toggleExpressionDisplayMode: (options: {
                pos: number;
                mathJax?: string;
            }) => ReturnType;
        };
    }

    interface Storage {
        expression: {
            openEditorAfterToggle: boolean;
        };
    }
}

export default Node.create({
    name: 'expression',
    group: 'block',
    draggable: true,

    parseHTML: () => [{ tag: 'expression' }],

    renderHTML: ({ HTMLAttributes }) => ['expression', HTMLAttributes],

    addStorage() {
        return {
            openEditorAfterToggle: false,
        };
    },

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
            toggleExpressionDisplayMode:
                ({ pos, mathJax }) =>
                ({ state, commands, dispatch }) => {
                    const node = state.doc.nodeAt(pos)!;
                    const attrs = {
                        ...node.attrs,
                        ...(mathJax !== undefined ? { mathJax } : {}),
                    };
                    if (dispatch) {
                        this.storage.openEditorAfterToggle = true;
                    }

                    const $pos = state.doc.resolve(pos);
                    const parent = $pos.parent;

                    if (node.type.name === 'expressionInline') {
                        if (!parent.isTextblock) {
                            return commands.insertContentAt({ from: pos, to: pos + node.nodeSize }, {
                                type: 'expression',
                                attrs,
                            });
                        }

                        const paragraph = state.schema.nodes.paragraph;
                        const expression = state.schema.nodes.expression.create(attrs);
                        const before = trimTrailingWhitespace(
                            parent.content.cut(0, $pos.parentOffset),
                            state.schema,
                        );
                        const after = trimLeadingWhitespace(
                            parent.content.cut($pos.parentOffset + node.nodeSize),
                            state.schema,
                        );
                        const replacement = [
                            ...(before.size ? [paragraph.create(parent.attrs, before)] : []),
                            expression,
                            ...(after.size ? [paragraph.create(parent.attrs, after)] : []),
                        ];

                        dispatch?.(
                            state.tr.replaceWith($pos.before(), $pos.after(), replacement).scrollIntoView(),
                        );
                        return true;
                    }

                    const index = $pos.index();
                    const previous = index > 0 ? parent.child(index - 1) : null;
                    const next = index + 1 < parent.childCount ? parent.child(index + 1) : null;
                    const paragraph = state.schema.nodes.paragraph;
                    const expressionInline = state.schema.nodes.expressionInline.create(attrs);

                    if (previous?.type === paragraph || next?.type === paragraph) {
                        const from = previous?.type === paragraph ? pos - previous.nodeSize : pos;
                        const to = next?.type === paragraph ? pos + node.nodeSize + next.nodeSize : pos + node.nodeSize;
                        const previousContent = previous?.type === paragraph ? previous.content : Fragment.empty;
                        const nextContent = next?.type === paragraph ? next.content : Fragment.empty;
                        const content = previousContent
                            .append(
                                previousContent.size && !endsWithWhitespace(previousContent)
                                    ? Fragment.from(state.schema.text(' '))
                                    : Fragment.empty,
                            )
                            .append(Fragment.from(expressionInline))
                            .append(
                                nextContent.size && !startsWithWhitespace(nextContent)
                                    ? Fragment.from(state.schema.text(' '))
                                    : Fragment.empty,
                            )
                            .append(nextContent);
                        const paragraphAttrs = previous?.type === paragraph ? previous.attrs : next!.attrs;

                        dispatch?.(
                            state.tr.replaceWith(from, to, paragraph.create(paragraphAttrs, content)).scrollIntoView(),
                        );
                        return true;
                    }

                    return commands.insertContentAt({ from: pos, to: pos + node.nodeSize }, {
                        type: 'paragraph',
                        content: [{ type: 'expressionInline', attrs }],
                    });
                },
        };
    },
});
