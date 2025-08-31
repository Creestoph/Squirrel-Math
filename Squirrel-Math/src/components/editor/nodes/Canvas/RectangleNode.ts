import { EditorView } from 'prosemirror-view';
import { Node } from 'tiptap';
import { mainRedColor } from './Colors';
import RectangleView from './RectangleView.vue';

export interface RectangleAttributes {
    type: 'rectangle';
    center: { x: number; y: number };
    size: { width: number; height: number };
    color: string;
    borderColor: string;
}

export default class RectangleNode extends Node {
    get name() {
        return 'rectangle';
    }

    get schema() {
        return {
            attrs: {
                center: { defualt: { x: 50, y: 50 } },
                size: { default: { width: 100, height: 100 } },
                color: { default: mainRedColor },
                borderColor: { default: '#00000000' },
            },
            parseDOM: [
                {
                    tag: 'rectangle',
                    getAttrs: (dom: any) =>
                        JSON.parse(dom.getAttribute('attrs')),
                },
            ],
            toDOM: (node: any) => [
                'rectangle',
                { attrs: JSON.stringify(node.attrs) },
            ],
        };
    }

    get view() {
        return RectangleView;
    }

    static create(
        attrs: RectangleAttributes,
        position: number,
        view: EditorView,
    ): void {
        const node = view.state.schema.nodes.rectangle.createAndFill(attrs);
        const transaction = view.state.tr.insert(position, node!);
        view.dispatch(transaction);
    }
}
