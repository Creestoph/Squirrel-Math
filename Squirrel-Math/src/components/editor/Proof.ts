import { Node } from 'tiptap'
import { toggleWrap } from 'tiptap-commands'
import ProofVue from './Proof.vue'

export default class Proof extends Node {

  get name() {
    return 'proof'
  }

  get schema() {
    return {
      attrs: {
        label: {
          default: "Dowód"
        }
      },
      content: '(paragraph | expression)+',
      group: 'block',
      defining: false,
      draggable: true,
      parseDOM: [{ tag: 'proof' }],
      toDOM: () => ['proof', 0],
    }
  }

  commands({ type }: any) {
    return () => toggleWrap(type)
  }

  get view() {
    return ProofVue;
  }
}