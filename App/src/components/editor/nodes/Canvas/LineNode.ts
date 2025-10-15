import { Node } from '@tiptap/vue-2';
import { VueNodeViewRenderer } from '@tiptap/vue-2';
import { mainRedColor } from './Colors';
import LineView from './LineView.vue';
import { idGenerator } from './Shape';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        line: {
            createLine: (attrs: LineAttributes, pos: number) => ReturnType;
        };
    }
}

export interface LineAttributes {
    id: string;
    points: { x: number; y: number }[];
    color: string;
    smooth: boolean;
}

export default Node.create({
    name: 'line',

    parseHTML: () => [
        {
            tag: 'line',
            getAttrs: (element) => JSON.parse(element.getAttribute('attrs')!),
        },
    ],
    renderHTML: ({ HTMLAttributes }) => ['line', { attrs: JSON.stringify(HTMLAttributes) }],

    addAttributes() {
        return {
            id: { default: '' },
            points: { default: [] },
            color: { default: mainRedColor },
            smooth: { default: false },
        };
    },

    addNodeView: () => VueNodeViewRenderer(LineView),

    addCommands() {
        return {
            createLine:
                (attrs: LineAttributes, pos: number) =>
                ({ commands }) =>
                    commands.insertContentAt(pos, this.type.createAndFill({ ...attrs, id: idGenerator.next().value })),
        };
    },
});
