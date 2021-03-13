import { Mark } from 'tiptap'

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
