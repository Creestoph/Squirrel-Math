import { EditorView } from 'prosemirror-view';
import { Node } from 'tiptap'
import CircleView from './CircleView.vue'
import { mainRedColor } from './Colors';

export interface CircleAttributes {
  center: { x: number, y: number },
  size: { width: number, height: number},
  color: string,
  borderColor: string
}

export default class CircleNode extends Node {

  get name() {
    return 'circle'
  }

  get schema() {
    return {
      attrs: {
        center: { defualt: { x: 50, y: 50 } },
        size: { default: { width: 100, height: 100 } },
        color: { default: mainRedColor },
        borderColor: { default: '#00000000' }
      },
      parseDOM: [{ tag: "circle" }],
      toDOM: () => ["circle"]
    }
  }

  get view() {
      return CircleView;
  }

  static create(attrs: CircleAttributes, position: number, view: EditorView): void {
    const node = view.state.schema.nodes.circle.createAndFill(attrs);
    const transaction = view.state.tr.insert(position, node);
    view.dispatch(transaction);
  }
}