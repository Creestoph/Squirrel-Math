import { Node } from 'tiptap'
import ExpressionInlineVue from './ExpressionInline.vue'

export default class ExpressionInline extends Node {

  get name() {
    return 'expressionInline'
  }

  get schema() {
    return {
      attrs: {
        mathJax: {
          default: ""
        }
      },
      inline: true,
      group: 'inline',
      parseDOM: [{
        tag: 'expression-inline',
        getAttrs: (dom: any) => ({ mathJax: dom.getAttribute('mathJax')})
      }],
      toDOM: (node: any) => ['expression-inline', { mathJax: node.attrs.mathJax }],
    }
  }

  commands({ type }: any) {
    return (attrs: any) => (state: any, dispatch: any) => {
      const { selection } = state
      const position = selection.$cursor ? selection.$cursor.pos : selection.$to.pos
      const node = type.create(attrs)
      const transaction = state.tr.insert(position, node)
      dispatch(transaction)
    }
  }

  keys({ type }: any) {
    return {
      'Alt-=': this.commands({ type })({})
    };
  }

  get view() {
    return ExpressionInlineVue;
  }
}