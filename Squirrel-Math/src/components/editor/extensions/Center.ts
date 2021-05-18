import { Extension, Plugin } from 'tiptap'
import { Decoration, DecorationSet } from 'prosemirror-view'
import { EditorState } from 'prosemirror-state'

export default class Center extends Extension {

  get name() {
    return 'center'
  }

  get commands() {
    return (schema: any) => (event: any) => (state: EditorState, dispatch: any) => {
      if (dispatch) {
        const newAlign = this.isActive ? '' : 'center';
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

  get isActive() {
    let found = false;
    this.editor.state.tr.selection.ranges.forEach((range: any) => {
      const from = range.$from.pos
      const to = range.$to.pos
      this.editor.state.doc.nodesBetween(from, to, (node: any, pos: any) => {
        found = found || (node.type.name === 'paragraph' && node.attrs.textAlign == 'center')
      })
    });
    return found;
  }

}