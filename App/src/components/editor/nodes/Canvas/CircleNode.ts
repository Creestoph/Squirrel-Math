import { Node } from '@tiptap/vue-2';
import { VueNodeViewRenderer } from '@tiptap/vue-2';
import CircleView from './CircleView.vue';
import { mainRedColor } from './Colors';
import { idGenerator } from './Shape';
import { Point } from '@/components/utils/point';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        circle: {
            createCircle: (attrs: CircleAttributes, pos: number) => ReturnType;
        };
    }
}

export interface CircleAttributes {
    id: string;
    center: Point;
    size: { width: number; height: number };
    color: string;
    borderColor: string;
}

export default Node.create({
    name: 'circle',

    parseHTML: () => [
        {
            tag: 'circle',
            getAttrs: (dom) => JSON.parse(dom.getAttribute('attrs')!),
        },
    ],
    renderHTML: ({ HTMLAttributes }) => ['circle', { attrs: JSON.stringify(HTMLAttributes) }],

    addAttributes() {
        return {
            id: { default: '' },
            center: { default: { x: 50, y: 50 } },
            size: { default: { width: 100, height: 100 } },
            color: { default: mainRedColor },
            borderColor: { default: '#00000000' },
        };
    },

    addNodeView: () => VueNodeViewRenderer(CircleView),

    addCommands() {
        return {
            createCircle:
                (attrs: CircleAttributes, pos: number) =>
                ({ commands }) =>
                    commands.insertContentAt(pos, this.type.createAndFill({ ...attrs, id: idGenerator.next().value })),
        };
    },
});
