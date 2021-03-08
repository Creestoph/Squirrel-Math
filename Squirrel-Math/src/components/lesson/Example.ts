import { Node } from 'tiptap'
import { toggleWrap } from 'tiptap-commands'

export default class Example extends Node {

  get name() {
    return 'example'
  }

  get schema() {
    return {
      content: 'block+',
      group: 'block',
      defining: false,
      draggable: true,
      parseDOM: [{ tag: 'example' }],
      toDOM: () => ['example', { class: 'example' }, 0],
    }
  }

  commands({ type }: any) {
    return () => toggleWrap(type)
  }
}