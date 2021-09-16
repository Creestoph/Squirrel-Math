import { Node } from 'tiptap'
import CanvasVue from './Canvas.vue'

export default class Canvas extends Node {

  get name() {
    return 'geometry'
  }

  get schema() {
    return {
      attrs: {
        shapes: {
          default: undefined
        },
        canvas: {
          default: {
            width: 800,
            height: 500
          }
        }
      },
      content: 'text_area*',
      group: 'block',
      draggable: true,
      parseDOM: [{
        tag: 'geometry',
        getAttrs: (dom: any) => ({ shapes: JSON.parse(dom.getAttribute('shapes')), canvas: JSON.parse(dom.getAttribute('canvas')) })
      }],
      toDOM: (node: any) => ['geometry', { shapes: JSON.stringify(node.attrs.shapes), canvas: JSON.stringify(node.attrs.canvas) }]
    }
  }

  commands({ type }: any) {
    return (attrs: any) => (state: any, dispatch: any) => {
      const { selection } = state
      const position = selection.$cursor ? selection.$cursor.pos - 1 : selection.$to.pos
      const node = type.create(attrs)
      const transaction = state.tr.insert(position, node)
      dispatch(transaction)
    }
  }

  get view() {
    return CanvasVue;
  }
}