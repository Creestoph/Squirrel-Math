import { Mark } from 'tiptap'
import { markPasteRule } from 'tiptap-commands'
import { InputRule } from 'prosemirror-inputrules'
import { EditorState } from 'prosemirror-state';

export default class NumberMark extends Mark {

  static readonly singleCharacterRegex = '0-9><=%+⋅';

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

  inputRules({ type }: any) {
    return [new InputRule(/([0-9><=%+⋅])$/, (state: EditorState, match: string[], start: number, end: number) => {
      setTimeout(() => {
        this.editor.view.updateState(this.editor.state.apply(this.editor.state.tr.addMark(start, end + 1, type.create())))
      }, 0);
      return null;
    })]
  }

  pasteRules({ type }: any) {
    return [
      markPasteRule(/([0-9><=%+⋅]+)/g, type),
    ]
  }
}
