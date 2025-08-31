import { Node } from 'tiptap';
import CanvasVue from './Canvas.vue';

export default class Canvas extends Node {
    get name() {
        return 'geometry';
    }

    get schema() {
        return {
            attrs: {
                canvas: {
                    default: {
                        width: 500,
                        height: 300,
                    },
                },
            },
            content: '(text_area | rectangle | line | circle | polygon | arc)*',
            group: 'block',
            draggable: true,
            parseDOM: [
                {
                    tag: 'geometry',
                    getAttrs: (dom: any) => ({
                        canvas: JSON.parse(dom.getAttribute('canvas')),
                    }),
                },
            ],
            toDOM: (node: any) => ['geometry', { canvas: JSON.stringify(node.attrs.canvas) }, 0],
        };
    }

    commands({ type }: any) {
        return (attrs: any) => (state: any, dispatch: any) => {
            const { selection } = state;
            const position = selection.$cursor ? selection.$cursor.pos - 1 : selection.$to.pos;
            const node = type.create(attrs);
            const transaction = state.tr.insert(position, node);
            dispatch(transaction);
        };
    }

    get view() {
        return CanvasVue;
    }
}
