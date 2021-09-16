import { Node as tiptapNode, Plugin } from 'tiptap'
import { EditorState, Transaction } from 'prosemirror-state'
import { Node as prosemirrorNode } from 'prosemirror-model'
import { ReplaceStep, ReplaceAroundStep } from 'prosemirror-transform'
import TextAreaVue from './TextArea.vue'

export default class TextArea extends tiptapNode {

  get name() {
    return 'text_area'
  }

  get schema() {
    return {
      attrs: {
        width: { default: 0 },
        height: { default: 0 },
        x: { default: 0 },
        y: { default: 0 },
        fillColor: { default: "none"},
        borderColor: { default: '#00000000' },
        textColor: { default: 'black' },
        align: { default: 'top' },
        id: { default: 0 }
      },
      content: 'block+',
      group: 'block',
      parseDOM: [{ tag: "text-area" }],
      toDOM: () => ["text-area", 0]
    }
  }

  get view() {
      return TextAreaVue;
  }

  get plugins() {
    return [
      new Plugin({
        filterTransaction: (tr: Transaction, state: EditorState) => {
          const step = tr.steps[0];
          const s = step as any;
          const isReplaceAround = step instanceof ReplaceAroundStep;
          const isReplace = step instanceof ReplaceStep && s.slice.size == 0;
          if (isReplaceAround || isReplace) {
            const isInsideCanvas = this.isPositionInsideCanvas(state, s.from) && this.isPositionInsideCanvas(state, tr.selection.from);
            if (isInsideCanvas) {
              if (isReplaceAround) {
                const replacingWholeCanvas = s.slice.content.content[0].type.name === 'geometry';
                if (replacingWholeCanvas) {
                  console.log('blocked replacearound')
                  // return false;
                }
              }
              else if (isReplace) {
                const allowed = tr.getMeta('allowDelete');
                const deletingTextArea = (state.doc.slice(s.from, s.to).content as any).content.some((c: prosemirrorNode) => c.type.name === 'text_area');
                if (deletingTextArea && !allowed) {
                  console.log('blocked replace')
                  return false;
                }
              }
            }
          }
          return true;
        }
      }),
    ]
  }

  private isPositionInsideCanvas(state: EditorState, pos: number) {
    return (state.doc.resolve(pos) as any).path.some((p: any) => p instanceof prosemirrorNode && p.type.name === 'geometry')
  }
}