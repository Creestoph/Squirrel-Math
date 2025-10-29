import { Node } from '@tiptap/vue-2';
import { VueNodeViewRenderer } from '@tiptap/vue-2';
import { mainRedColor } from './Colors';
import PolygonView from './PolygonView.vue';
import { idGenerator } from './Shape';
import { Point } from '@/components/utils/point';
import { VueConstructor } from 'vue';
import { ShapeController } from './Canvas';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        polygon: {
            createPolygon: (attrs: Partial<PolygonAttributes>, pos: number) => ReturnType;
        };
    }
}

export interface PolygonShapeController extends ShapeController {
    editing: { value: boolean };
    sides: { value: number };
    borderColor: { value: string };
    makeRegular(sides: number, center?: Point): void;
}

export interface PolygonAttributes {
    id: string;
    vertices: Point[];
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

    addNodeView: () => VueNodeViewRenderer(PolygonView as unknown as VueConstructor<Vue>),

    addCommands() {
        return {
            createPolygon:
                (attrs: Partial<PolygonAttributes>, pos: number) =>
                ({ commands }) =>
                    commands.insertContentAt(pos, this.type.createAndFill({ ...attrs, id: idGenerator.next().value })),
        };
    },
});
