import { Node } from '@tiptap/core';
import { Plugin, Transaction, EditorState } from 'prosemirror-state';
import { Slice, Node as PMNode } from 'prosemirror-model';
import { ReplaceStep } from 'prosemirror-transform';
import { VueNodeViewRenderer } from '@tiptap/vue-2';
import TextAreaVue from './TextAreaView.vue';
import { idGenerator } from './Shape';
import { Point } from '@/components/utils/point';
import { VueConstructor } from 'vue';
import { ShapeController } from './Canvas';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        textArea: {
            createTextArea: (attrs: Partial<TextAreaAttributes>, pos: number) => ReturnType;
        };
    }
}

export interface TextAreaShapeController extends ShapeController {
    borderColor: { value: string };
    textColor: { value: string | null };
    align: { value: string | null };
}

export interface TextAreaAttributes extends Point {
    id: string;
    type: 'textArea';
    width: number;
    height: number;
    borderColor?: string;
    textColor?: string;
    fillColor?: string;
    align?: 'top' | 'middle' | 'bottom';
}

export default Node.create({
    name: 'textArea',
    group: 'block',
    content: 'block+',
    defining: true, // TODO verify ??? useful for selection behavior
    isolating: true, // TODO verify ??? keeps edits inside from merging across boundaries (often desirable for widget-like blocks)

    addAttributes() {
        return {
            id: { default: '' },
            width: { default: 0 },
            height: { default: 0 },
            x: { default: 0 },
            y: { default: 0 },
            fillColor: { default: 'none' },
            borderColor: { default: '#00000000' },
            textColor: { default: 'black' },
            align: { default: 'top' },
        };
    },

    parseHTML: () => [
        {
            tag: 'text-area',
            getAttrs: (element) => JSON.parse(element.getAttribute('attrs')!),
        },
    ],

    renderHTML: ({ HTMLAttributes }) => ['text-area', { attrs: JSON.stringify(HTMLAttributes) }, 0],

    addNodeView: () => VueNodeViewRenderer(TextAreaVue as unknown as VueConstructor<Vue>),

    addCommands() {
        return {
            createTextArea:
                (attrs: Partial<TextAreaAttributes>, pos: number) =>
                ({ commands }) =>
                    commands.insertContentAt(pos, this.type.createAndFill({ ...attrs, id: idGenerator.next().value })),
        };
    },

    addProseMirrorPlugins() {
        const isTextAreaInSlice = (slice: Slice) =>
            slice.content?.content?.some((c: PMNode) => c?.type?.name === this.name);

        const isInsideCanvas = (state: EditorState, pos: number) => {
            const $pos = state.doc.resolve(pos);
            for (let d = $pos.depth; d >= 0; d--) {
                if ($pos.node(d).type.name === 'geometry') {
                    return true;
                }
            }
            return false;
        };

        return [
            new Plugin({
                filterTransaction: (tr: Transaction, state: EditorState) => {
                    const step = tr.steps[0];
                    const isReplace = step instanceof ReplaceStep;

                    if (isReplace && isInsideCanvas(state, step.from)) {
                        // Deleting a textArea node by replacing it with empty slice
                        const deletingTextArea =
                            isTextAreaInSlice(state.doc.slice(step.from, step.to)) && step.slice?.size === 0;
                        const allowDelete = tr.getMeta('allowDelete');
                        if (deletingTextArea && !allowDelete) {
                            return false;
                        }
                    }

                    return true;
                },
            }),
        ];
    },
});
