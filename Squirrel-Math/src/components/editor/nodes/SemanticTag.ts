import { Node } from 'tiptap'
import SemanticTagVue from './SemanticTag.vue'

export default class SemanticTag extends Node {

  get name() {
    return 'semantic_tag'
  }

  get schema() {
    return {
      attrs: {
        tags: {
          default: ["Intuicje"],
        },
        required: {
          default: []
        }
      },
      selectable: false,
      parseDOM: [{
        tag: 'semantic-tag',
        getAttrs: (dom: any) => ({
          tags: dom.getAttribute('tags').split(" "),
          required: dom.getAttribute('requiredLessons') ? dom.getAttribute('requiredLessons').split('\n') : []
        }),
      }],
      toDOM: (node: any) => ['semantic-tag', {
        tags: node.attrs.tags.join(" "),
        requiredLessons: node.attrs.required.join('\n')
      }],
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

  get view() {
    return SemanticTagVue
  }

}