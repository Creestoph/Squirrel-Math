import { Node } from '@tiptap/vue-2';
import { VueNodeViewRenderer } from '@tiptap/vue-2';
import { mainRedColor } from './Colors';
import ArcView from './ArcView.vue';
import { idGenerator } from './Shape';
import { Point } from '@/components/utils/point';
import { VueConstructor } from 'vue';
import { ShapeController } from './Canvas';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        arc: {
            createArc: (attrs: Partial<ArcAttributes>, pos: number) => ReturnType;
        };
    }
}

export interface ArcAttributes {
    id: string; // TODO maybe id should be assigned in runtime, not stored in document?
    center: Point;
    arms: Point[];
    color: string;
    borderColor: string;
    radius: number;
}

export interface ArcShapeController extends ShapeController {
    radius: { value: number };
    angle: { value: number };
    borderColor: { value: string };
}

export default Node.create({
    name: 'arc',

    parseHTML: () => [
        {
            tag: 'arc',
            getAttrs: (dom) => JSON.parse(dom.getAttribute('attrs')!),
        },
    ],
    renderHTML: ({ HTMLAttributes }) => ['arc', { attrs: JSON.stringify(HTMLAttributes) }],

    addAttributes() {
        return {
            id: { default: '' },
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
        };
    },

    addNodeView: () => VueNodeViewRenderer(ArcView as unknown as VueConstructor<Vue>),

    addCommands() {
        return {
            createArc:
                (attrs: Partial<ArcAttributes>, pos: number) =>
                ({ commands }) =>
                    commands.insertContentAt(pos, this.type.createAndFill({ ...attrs, id: idGenerator.next().value })),
        };
    },
});
