import { Node } from 'tiptap';
import ExpressionInlineVue from './ExpressionInline.vue';
import { nodeInputRule, nodePasteRule } from '../tiptap-utils';

export default class ExpressionInline extends Node {
    get name() {
        return 'expressionInline';
    }

    get schema() {
        return {
            attrs: {
                mathJax: {
                    default: '',
                },
            },
            inline: true,
            group: 'inline',
            parseDOM: [
                {
                    tag: 'expression-inline',
                    getAttrs: (dom: any) => ({
                        mathJax: dom.getAttribute('mathJax'),
                    }),
                },
            ],
            toDOM: (node: any) => [
                'expression-inline',
                { mathJax: node.attrs.mathJax },
            ],
        };
    }

    commands({ type }: any) {
        return (attrs: any) => (state: any, dispatch: any) => {
            const { selection } = state;

            const node = type.create(attrs);
            const selectionContent = selection.content().content;
            node.attrs.mathJax = selectionContent.textBetween(
                0,
                selectionContent.size,
            );

            const transaction = state.tr.deleteSelection();
            transaction.insert(transaction.selection.$from.pos, node);
            dispatch(transaction);
        };
    }

    keys({ type }: any) {
        return {
            'Alt-=': this.commands({ type })({}),
        };
    }

    get view() {
        return ExpressionInlineVue;
    }

    inputRules({ type }: any) {
        return [
            nodeInputRule(/(?:^|[^$])(\$([^$]+)\$)$/, type, (match: any) => ({
                mathJax: match,
            })),
        ];
    }

    pasteRules({ type }: any) {
        return [
            nodePasteRule(/\$([^$]+)\$/g, type, (match: any) => ({
                mathJax: match,
            })),
        ];
    }
}
