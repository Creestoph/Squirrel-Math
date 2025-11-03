import { Node } from '@tiptap/vue-3';
import { VueNodeViewRenderer } from '@tiptap/vue-3';
import SemanticTagVue from './SemanticTag.vue';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        semanticTag: {
            createSemanticTag: (attrs?: { tags?: string[]; required?: string[] }) => ReturnType;
        };
    }
}

export default Node.create({
    name: 'semanticTag',
    group: 'block',
    selectable: false,

    parseHTML: () => [{ tag: 'semantic-tag' }],

    renderHTML: ({ HTMLAttributes }) => ['semantic-tag', HTMLAttributes, 0],

    addNodeView: () => VueNodeViewRenderer(SemanticTagVue),

    addAttributes: () => ({
        tags: {
            default: ['Intuicje'],
            parseHTML: (element) => element.getAttribute('tags')?.split(' ') || ['Intuicje'],
            renderHTML: (attributes) => ({ tags: attributes.tags.join(' ') }),
        },
        required: {
            default: [],
            parseHTML: (element) => element.getAttribute('requiredLessons')?.split('\n') || [],
            renderHTML: (attributes) => ({ requiredLessons: attributes.required.join('\n') }),
        },
    }),

    addCommands() {
        return {
            createSemanticTag:
                (attrs = {}) =>
                ({ state, commands }) => {
                    const $head = state.selection.$head || state.selection.$to;

                    // Insert between blocks at the current depth
                    const pos = $head.after($head.depth);

                    // Inspect the next sibling at this insertion boundary
                    const $pos = state.doc.resolve(pos);
                    const parent = $pos.parent;
                    const index = $pos.index();
                    const next = index < parent.childCount ? parent.child(index) : null;

                    // Need a filler block when:
                    //  - there's no next sibling, OR
                    //  - the next sibling is *another* semanticTag, OR
                    //  - the next sibling is not in the 'block' group
                    const needsFiller =
                        !next || next.type.name === this.name || !next.type?.spec.group?.split(/\s+/).includes('block');

                    const content = needsFiller
                        ? [{ type: this.name, attrs }, { type: 'paragraph' }]
                        : [{ type: this.name, attrs }];

                    return commands.insertContentAt(pos, content);
                },
        };
    },
});
