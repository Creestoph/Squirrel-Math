import { Node } from 'tiptap'
import { toggleWrap } from 'tiptap-commands'

export default class Proof extends Node {

  get name() {
    return 'proof'
  }

  get schema() {
    return {
      content: 'paragraph+',
      group: 'block',
      defining: false,
      draggable: true,
      parseDOM: [{ tag: 'proof' }],
      toDOM: () => ['proof', { class: 'proof' }, ['div', { class: 'proof-sticker' }, 'Dowód'], ['div', 0]],
    }
  }

  commands({ type }: any) {
    return () => toggleWrap(type)
  }
}