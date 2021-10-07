import { EditorView } from 'prosemirror-view';
import { Node } from 'tiptap'
import { mainRedColor } from './Colors';
import TriangleView from './TriangleView.vue'

export interface TriangleAttributes {
  type?: 'triangle',
  vertices?: {x: number, y: number}[],
  color?: string,
  borderColor?: string
}

export default class TriangleNode extends Node {

  get name() {
    return 'triangle'
  }

  get schema() {
    return {
      attrs: {
        vertices: { default: [] },
        color: { default: mainRedColor },
        borderColor: { default: '#00000000' }
      },
      parseDOM: [{ tag: "triangle" }],
      toDOM: () => ["triangle"]
    }
  }

  get view() {
      return TriangleView;
  }

  static create(attrs: TriangleAttributes, position: number, view: EditorView): void {
    const node = view.state.schema.nodes.triangle.createAndFill(attrs);
    const transaction = view.state.tr.insert(position, node);
    view.dispatch(transaction);
  }
}