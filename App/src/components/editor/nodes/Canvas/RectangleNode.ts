import { Node } from '@tiptap/vue-3';
import { VueNodeViewRenderer } from '@tiptap/vue-3';
import { mainRedColor } from './Colors';
import RectangleView from './RectangleView.vue';
import { idGenerator } from './utils';
import { Point } from '@/models/point';
import { ShapeController } from './Canvas';
import { ValueObject } from '@/models/common';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        rectangle: {
            createRectangle: (attrs: Partial<RectangleAttributes>, pos: number) => ReturnType;
        };
    }
}

export interface RectangleAttributes {
    id: string;
    center: Point;
    size: { width: number; height: number };
    color: string;
    borderColor: string;
}

export interface RectangleShapeController extends ShapeController {
    borderColor: ValueObject<string>;
    width: ValueObject<number>;
    height: ValueObject<number>;
}

export default Node.create({
    name: 'rectangle',

    parseHTML: () => [
        {
            tag: 'rectangle',
            getAttrs: (element) => JSON.parse(element.getAttribute('attrs')!),
        },
    ],

    renderHTML: ({ HTMLAttributes }) => ['rectangle', { attrs: JSON.stringify(HTMLAttributes) }],

    addAttributes() {
        return {
            id: { default: '' },
            center: { default: { x: 50, y: 50 } },
            size: { default: { width: 100, height: 100 } },
            color: { default: mainRedColor },
            borderColor: { default: '#00000000' },
        };
    },

    addNodeView: () => VueNodeViewRenderer(RectangleView),

    addCommands() {
        return {
            createRectangle:
                (attrs: Partial<RectangleAttributes>, pos: number) =>
                ({ commands }) =>
                    commands.insertContentAt(pos, this.type.createAndFill({ ...attrs, id: idGenerator.next().value })),
        };
    },
});
