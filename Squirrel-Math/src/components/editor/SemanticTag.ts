import { Node } from 'tiptap'
import SemanticTagVue from './SemanticTag.vue'

export default class SemanticTag extends Node {

  get name() {
    return 'semantic_tag'
  }

  get schema() {
    return {
      attrs: {
        tag: {
          default: "Intuicje",
        }
      },
      selectable: false,
      parseDOM: [{
        tag: 'semantic-tag',
        getAttrs: (dom: any) => ({
          tag: dom.getAttribute('tag'),
        }),
      }],
      toDOM: (node: any) => ['semantic-tag', {
        tag: node.attrs.tag
      }],
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
    return SemanticTagVue
  }

}