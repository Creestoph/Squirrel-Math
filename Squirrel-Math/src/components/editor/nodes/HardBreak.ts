import { Node } from 'tiptap'
import { chainCommands, exitCode } from 'tiptap-commands'

export default class HardBreak extends Node {

  get name() {
    return 'hard_break'
  }

  get schema() {
    return {
      inline: true,
      group: 'inline',
      marks: '',
      selectable: false,
      parseDOM: [
        { tag: 'br' },
      ],
      toDOM: () => ['br'],
    }
  }

  commands({ type }: any) {
    return () => chainCommands(exitCode, (state: any, dispatch: any) => {
      dispatch(state.tr.replaceSelectionWith(type.create()).scrollIntoView())
      return true
    })
  }

  keys({ type }: any) {
    const command = chainCommands(exitCode, (state: any, dispatch: any) => {
      dispatch(state.tr.replaceSelectionWith(type.create()).scrollIntoView())
      return true
    })
    return {
      'Mod-Enter': command,
      'Shift-Enter': command,
    }
  }

}
