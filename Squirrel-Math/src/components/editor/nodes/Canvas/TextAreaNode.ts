import { Node as tiptapNode, Plugin } from 'tiptap';
import { EditorState, Transaction } from 'prosemirror-state';
import { Node as prosemirrorNode, Slice } from 'prosemirror-model';
import { ReplaceStep, ReplaceAroundStep } from 'prosemirror-transform';
import TextAreaVue from './TextAreaView.vue';
import { EditorView } from 'prosemirror-view';

export interface TextAreaAttributes {
    type: 'text_area';
    width: number;
    height: number;
    x: number;
    y: number;
    borderColor?: string;
    textColor?: string;
    fillColor?: string;
    align?: string;
}

export default class TextAreaNode extends tiptapNode {
    static create(
        attrs: TextAreaAttributes,
        position: number,
        view: EditorView,
    ): void {
        const node = view.state.schema.nodes.text_area.createAndFill(attrs);
        const transaction = view.state.tr.insert(position, node!);
        transaction.setMeta('creatingHandled', true);
        view.dispatch(transaction);
    }

    get name() {
        return 'text_area';
    }

    get schema() {
        return {
            attrs: {
                width: { default: 0 },
                height: { default: 0 },
                x: { default: 0 },
                y: { default: 0 },
                fillColor: { default: 'none' },
                borderColor: { default: '#00000000' },
                textColor: { default: 'black' },
                align: { default: 'top' },
            },
            content: 'block+',
            group: 'block',
            parseDOM: [
                {
                    tag: 'text-area',
                    getAttrs: (dom: any) =>
                        JSON.parse(dom.getAttribute('attrs')),
                },
            ],
            toDOM: (node: any) => [
                'text-area',
                { attrs: JSON.stringify(node.attrs) },
                0,
            ],
        };
    }

    get view() {
        return TextAreaVue;
    }

    get plugins() {
        return [
            new Plugin({
                filterTransaction: (tr: Transaction, state: EditorState) => {
                    const step = tr.steps[0];
                    const s = step as any;
                    const isReplaceAround = step instanceof ReplaceAroundStep;
                    const isReplace = step instanceof ReplaceStep;
                    // console.log(tr, state);
                    if (isReplaceAround || isReplace) {
                        if (this.isPositionInsideCanvas(state, s.from)) {
                            if (isReplaceAround) {
                                const replacingWholeCanvas =
                                    s.slice.content.content[0].type.name ===
                                    'geometry';
                                if (replacingWholeCanvas) {
                                    // console.log('blocked replacearound')
                                    // return false;
                                }
                            } else if (isReplace) {
                                const allowDelete = tr.getMeta('allowDelete');
                                const deletingTextArea =
                                    this.isTextArea(
                                        state.doc.slice(s.from, s.to),
                                    ) && s.slice.size == 0;
                                if (deletingTextArea && !allowDelete) {
                                    // console.log('blocked replace')
                                    // return false;
                                }
                            }
                        }
                    }
                    return true;
                },
            }),
        ];
    }

    private isTextArea(slice: Slice) {
        return (slice.content as any).content.some(
            (c: prosemirrorNode) => c.type.name === 'text_area',
        );
    }

    private isPositionInsideCanvas(state: EditorState, pos: number) {
        return (state.doc.resolve(pos) as any).path.some(
            (p: any) =>
                p instanceof prosemirrorNode && p.type.name === 'geometry',
        );
    }
}
