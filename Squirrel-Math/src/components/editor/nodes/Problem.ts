import { Node } from 'tiptap'
import { setBlockType } from 'tiptap-commands'

export default class Problem extends Node {

  get name() {
    return 'problem'
  }

  get schema() {
    return {
      content: 'inline*',
      group: 'block',
      marks: 'underline strike comment',
      defining: false,
      parseDOM: [{ tag: 'problem' }],
      toDOM: () => ['problem', { class: 'problem' }, 0],
    }
  }

  commands({ type }: any) {
    return () => setBlockType(type)
  }
}