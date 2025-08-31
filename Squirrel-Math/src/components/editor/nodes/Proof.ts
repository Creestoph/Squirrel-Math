import { Node } from 'tiptap';
import { toggleWrap } from 'tiptap-commands';
import ProofVue from './Proof.vue';

export default class Proof extends Node {
    get name() {
        return 'proof';
    }

    get schema() {
        return {
            attrs: {
                label: {
                    default: 'Dowód',
                },
                required: {
                    default: [],
                },
            },
            content: '(paragraph | expression | ordered_list | geometry)+',
            group: 'block',
            defining: false,
            draggable: true,
            parseDOM: [
                {
                    tag: 'proof',
                    getAttrs: (dom: any) => ({
                        label: dom.getAttribute('label'),
                        required: dom.getAttribute('requiredLessons')
                            ? dom.getAttribute('requiredLessons').split('\n')
                            : [],
                    }),
                },
            ],
            toDOM: (node: any) => [
                'proof',
                {
                    label: node.attrs.label,
                    requiredLessons: node.attrs.required.join('\n'),
                },
                0,
            ],
        };
    }

    commands({ type }: any) {
        return () => toggleWrap(type);
    }

    get view() {
        return ProofVue;
    }
}
