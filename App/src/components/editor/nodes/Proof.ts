import { Node } from '@tiptap/vue-2';
import { VueNodeViewRenderer } from '@tiptap/vue-2';
import ProofVue from './Proof.vue';
import { VueConstructor } from 'vue';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        proof: {
            toggleProof: () => ReturnType;
        };
    }
}

export default Node.create({
    name: 'proof',
    content: '(paragraph | expression | orderedList | geometry)+',
    group: 'block',
    defining: false,
    draggable: true,

    parseHTML: () => [{ tag: 'proof' }],

    renderHTML: () => ['proof', 0],

    addAttributes() {
        return {
            label: {
                default: 'Dowód',
                parseHTML: (element) => element.getAttribute('label'),
                renderHTML: (attributes) => ({ label: attributes.label }),
            },
            required: {
                default: [],
                parseHTML: (element) => element.getAttribute('requiredLessons')?.split('\n') || [],
                renderHTML: (attributes) => ({ requiredLessons: attributes.required.join('\n') }),
            },
        };
    },

    addCommands() {
        return {
            toggleProof:
                () =>
                ({ commands }) =>
                    commands.toggleWrap(this.type),
        };
    },

    addNodeView: () => VueNodeViewRenderer(ProofVue as unknown as VueConstructor<Vue>),
});
