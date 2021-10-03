import { Node as tiptapNode, Plugin } from 'tiptap'
import { EditorState, Transaction } from 'prosemirror-state'
import { Node as prosemirrorNode, Slice } from 'prosemirror-model'
import { ReplaceStep, ReplaceAroundStep } from 'prosemirror-transform'
import TextAreaVue from './TextArea.vue'
import CustomElement from '../BuiltInComponent'

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
          const isReplace = step instanceof ReplaceStep;
          // console.log(tr, state);
          if (isReplaceAround || isReplace) {
            if (this.isPositionInsideCanvas(state, s.from)) {
              if (isReplaceAround) {
                const replacingWholeCanvas = s.slice.content.content[0].type.name === 'geometry';
                if (replacingWholeCanvas) {
                  // console.log('blocked replacearound')
                  // return false;
                }
              }
              else if (isReplace) {
                const allowDelete = tr.getMeta('allowDelete');
                const creatingHandled = tr.getMeta('creatingHandled');
                const deletingTextArea = this.isTextArea(state.doc.slice(s.from, s.to)) && s.slice.size == 0;
                const creatingTextArea = this.isTextArea(s.slice);
                if (deletingTextArea && !allowDelete) {
                  // console.log('blocked replace')
                  return false;
                }
                else if (creatingTextArea && !creatingHandled) {
                  const targetCanvas = this.editor.view.domAtPos(s.from).node.parentElement.parentElement.__vue__ as CustomElement;
                  setTimeout(() => targetCanvas.addExistingTextArea(s.slice.content.content[0]));
                  // console.log('creating!');
                }
              }
            }
          }
          return true;
        }
      }),
    ]
  }

  private isTextArea(slice: Slice) {
    return (slice.content as any).content.some((c: prosemirrorNode) => c.type.name === 'text_area');
  }

  private isPositionInsideCanvas(state: EditorState, pos: number) {
    return (state.doc.resolve(pos) as any).path.some((p: any) => p instanceof prosemirrorNode && p.type.name === 'geometry')
  }
}