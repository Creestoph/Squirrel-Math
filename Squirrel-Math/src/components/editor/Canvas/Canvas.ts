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
        }
      },
      group: 'block',
      draggable: true,
      parseDOM: [{
        tag: 'geometry',
        getAttrs: (dom: any) => ({ mathJax: dom.getAttribute('shapes')})
      }],
      toDOM: (node: any) => ['geometry', { shapes: node.attrs.shapes }]
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