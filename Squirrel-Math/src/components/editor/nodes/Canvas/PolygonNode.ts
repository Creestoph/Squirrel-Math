import { EditorView } from 'prosemirror-view';
import { Node } from 'tiptap';
import { mainRedColor } from './Colors';
import PolygonView from './PolygonView.vue';

export interface PolygonAttributes {
    vertices: { x: number; y: number }[];
    color: string;
    borderColor: string;
}

export default class PolygonNode extends Node {
    get name() {
        return 'polygon';
    }

    get schema() {
        return {
            attrs: {
                vertices: { default: [] },
                color: { default: mainRedColor },
                borderColor: { default: '#00000000' },
            },
            parseDOM: [
                {
                    tag: 'polygon',
                    getAttrs: (dom: any) =>
                        JSON.parse(dom.getAttribute('attrs')),
                },
            ],
            toDOM: (node: any) => [
                'polygon',
                { attrs: JSON.stringify(node.attrs) },
            ],
        };
    }

    get view() {
        return PolygonView;
    }

    static create(
        attrs: PolygonAttributes,
        position: number,
        view: EditorView,
    ): void {
        const node = view.state.schema.nodes.polygon.createAndFill(attrs);
        const transaction = view.state.tr.insert(position, node!);
        view.dispatch(transaction);
    }
}
