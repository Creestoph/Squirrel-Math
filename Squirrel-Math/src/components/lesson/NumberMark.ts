import { Mark } from 'tiptap'
import { toggleMark, markInputRule, markPasteRule } from 'tiptap-commands'

export default class NumberMark extends Mark {

  get name() {
    return 'number'
  }

  get schema() {
    return {
      parseDOM: [{ tag: 'number'}],
      toDOM: () => ['number', 0],
      inclusive: false
    }
  }
}
