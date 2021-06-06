import { Extension } from 'tiptap'
import { EditorState } from 'prosemirror-state'

export default class TextAlign extends Extension {

  get name() {
    return 'text_align'
  }

  get commands() {
    return (schema: any) => (newAlign: string) => (state: EditorState, dispatch: any) => {
      if (dispatch) {
        if (newAlign === 'left')
          newAlign = '';
        const transaction = state.tr;

        state.tr.selection.ranges.forEach(range => {
          const from = range.$from.pos
          const to = range.$to.pos

          state.doc.nodesBetween(from, to, (node, pos) => {
            if (node.type.name === 'paragraph')
              transaction.setNodeMarkup(pos, undefined, { ...node.attrs, textAlign: newAlign })
          })
        });

        dispatch(transaction)
      }

      return true
    }
  }

  isActive(align: string) {
    let found = false;
    this.editor.state.tr.selection.ranges.forEach((range: any) => {
      const from = range.$from.pos
      const to = range.$to.pos
      this.editor.state.doc.nodesBetween(from, to, (node: any, pos: any) => {
        found = found || (node.type.name === 'paragraph' && node.attrs.textAlign == align)
      })
    });
    return found;
  }

}