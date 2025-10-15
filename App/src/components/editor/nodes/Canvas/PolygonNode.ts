import { Node } from '@tiptap/vue-2';
import { VueNodeViewRenderer } from '@tiptap/vue-2';
import { mainRedColor } from './Colors';
import PolygonView from './PolygonView.vue';
import { idGenerator } from './Shape';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        polygon: {
            createPolygon: (attrs: PolygonAttributes, pos: number) => ReturnType;
        };
    }
}

export interface PolygonAttributes {
    id: string;
    vertices: { x: number; y: number }[];
    color: string;
    borderColor: string;
}

export default Node.create({
    name: 'polygon',

    parseHTML: () => [
        {
            tag: 'polygon',
            getAttrs: (element) => JSON.parse(element.getAttribute('attrs')!),
        },
    ],

    renderHTML: ({ HTMLAttributes }) => ['polygon', { attrs: JSON.stringify(HTMLAttributes) }],

    addAttributes() {
        return {
            id: { default: '' },
            vertices: { default: [] },
            color: { default: mainRedColor },
            borderColor: { default: '#00000000' },
        };
    },

    addNodeView: () => VueNodeViewRenderer(PolygonView),

    addCommands() {
        return {
            createPolygon:
                (attrs: PolygonAttributes, pos: number) =>
                ({ commands }) =>
                    commands.insertContentAt(pos, this.type.createAndFill({ ...attrs, id: idGenerator.next().value })),
        };
    },
});
