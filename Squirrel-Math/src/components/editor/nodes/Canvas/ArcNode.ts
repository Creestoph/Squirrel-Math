import { EditorView } from 'prosemirror-view';
import { Node } from 'tiptap';
import { mainRedColor } from './Colors';
import ArcView from './ArcView.vue';

export interface ArcAttributes {
    center: { x: number; y: number };
    arms: { x: number; y: number }[];
    color: string;
    borderColor: string;
    radius: number;
}

export default class ArcNode extends Node {
    get name() {
        return 'arc';
    }

    get schema() {
        return {
            attrs: {
                center: { default: { x: 0, y: 0 } },
                arms: {
                    default: [
                        { x: 0, y: 0 },
                        { x: 0, y: 0 },
                    ],
                },
                radius: { default: 50 },
                color: { default: '#00000000' },
                borderColor: { default: mainRedColor },
            },
            parseDOM: [
                {
                    tag: 'arc',
                    getAttrs: (dom: any) =>
                        JSON.parse(dom.getAttribute('attrs')),
                },
            ],
            toDOM: (node: any) => [
                'arc',
                { attrs: JSON.stringify(node.attrs) },
            ],
        };
    }

    get view() {
        return ArcView;
    }

    static create(
        attrs: ArcAttributes,
        position: number,
        view: EditorView,
    ): void {
        const node = view.state.schema.nodes.arc.createAndFill(attrs);
        const transaction = view.state.tr.insert(position, node!);
        view.dispatch(transaction);
    }
}
