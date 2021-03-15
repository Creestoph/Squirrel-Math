import { Node } from 'tiptap'
import ExpressionVue from './Expression.vue'

export default class Expression extends Node {

  get name() {
    return 'expression'
  }

  get schema() {
    return {
      attrs: {
        mathJax: {
          default: ""
        }
      },
      group: 'block',
      draggable: true,
      parseDOM: [{
        tag: 'expression',
        getAttrs: (dom: any) => ({ mathJax: dom.getAttribute('mathJax')})
      }],
      toDOM: (node: any) => ['expression', { mathJax: node.attrs.mathJax }],
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
    return ExpressionVue;
  }
}