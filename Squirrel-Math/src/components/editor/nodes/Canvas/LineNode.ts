import { EditorView } from 'prosemirror-view';
import { Node } from 'tiptap'
import { mainRedColor } from './Colors';
import LineView from './LineView.vue'

export interface LineAttributes {
  points: { x: number, y: number }[];
  color: string;
  smooth: boolean;
}

export default class LineNode extends Node {

  get name() {
    return 'line'
  }

  get schema() {
    return {
      attrs: {
        points: { default: [] },
        color: { default: mainRedColor },
        smooth: { default: false }
      },
      parseDOM: [{ tag: "line" }],
      toDOM: () => ["line"]
    }
  }

  get view() {
      return LineView;
  }

  static create(attrs: LineAttributes, position: number, view: EditorView): void {
    const node = view.state.schema.nodes.line.createAndFill(attrs);
    const transaction = view.state.tr.insert(position, node);
    view.dispatch(transaction);
  }
}