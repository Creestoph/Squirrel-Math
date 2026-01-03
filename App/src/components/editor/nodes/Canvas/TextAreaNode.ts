import { Editor, Node } from '@tiptap/core';
import { VueNodeViewRenderer } from '@tiptap/vue-3';
import TextAreaVue from './TextAreaView.vue';
import { idGenerator } from './utils';
import { Point } from '@/models/point';
import { ShapeController } from './Canvas';
import { ValueObject } from '@/models/common';
import { Node as PMNode, ResolvedPos } from '@tiptap/pm/model';
import { TextSelection } from '@tiptap/pm/state';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        textArea: {
            createTextArea: (attrs: Partial<TextAreaAttributes>, pos: number) => ReturnType;
        };
    }
}

export interface TextAreaShapeController extends ShapeController {
    borderColor: ValueObject<string>;
    align: ValueObject<string | null>;
    editing: ValueObject<boolean>;
}

export interface TextAreaAttributes extends Point {
    id: string;
    type: 'textArea';
    width: number;
    height: number;
    borderColor?: string;
    fillColor?: string;
    align?: 'top' | 'middle' | 'bottom';
}

function findParentDepth($pos: ResolvedPos, typeName: string): number | null {
    for (let d = $pos.depth; d > 0; d--) {
        if ($pos.node(d).type.name === typeName) {
            return d;
        }
    }
    return null;
}

function isEffectivelyEmptyTextArea(node: PMNode): boolean {
    if (!node || node.type.name !== 'textArea' || node.textContent.length !== 0) {
        return false;
    }

    let hasNonTextLeaf = false;
    node.descendants((n) => {
        hasNonTextLeaf = n.isLeaf && !n.isText;
        return !hasNonTextLeaf;
    });

    return !hasNonTextLeaf;
}

function handleDelete(editor: Editor): boolean {
    const { state } = editor.view;
    const { selection } = state;
    const { $from } = selection;

    const depth = findParentDepth($from, 'textArea');

    if (
        depth !== null &&
        selection instanceof TextSelection &&
        selection.empty &&
        $from.parentOffset === 0 &&
        isEffectivelyEmptyTextArea($from.node(depth))
    ) {
        editor.emit('textAreaDelete' as any);
        return true;
    }

    return false;
}

export default Node.create({
    name: 'textArea',
    content: '(paragraph | orderedList | bulletList | expression | image | table)+',
    isolating: true,

    addAttributes() {
        return {
            id: { default: '' },
            width: { default: 0 },
            height: { default: 0 },
            x: { default: 0 },
            y: { default: 0 },
            fillColor: { default: 'none' },
            borderColor: { default: '#00000000' },
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

    addNodeView: () => VueNodeViewRenderer(TextAreaVue),

    /**
     * Clicking backspace inside empty textarea should remove it. However, the backspace event is not propagated to Canvas, so we need to inform
     * it via custom event.
     */
    addKeyboardShortcuts() {
        return {
            Backspace: () => handleDelete(this.editor),
            Delete: () => handleDelete(this.editor),
        };
    },

    addCommands() {
        return {
            createTextArea:
                (attrs, pos) =>
                ({ commands }) =>
                    commands.insertContentAt(pos, this.type.createAndFill({ ...attrs, id: idGenerator.next().value })),
        };
    },
});
