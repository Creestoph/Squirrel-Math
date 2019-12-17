import { Node } from 'tiptap'
import SemanticTagVue from './SemanticTag.vue'

export default class SemanticTag extends Node {

  get name() {
    return 'semantic_tag'
  }

  get schema() {
    return {
      // here you have to specify all values that can be stored in this node
      attrs: {
        tag: {
          default: null,
        }
      },
      selectable: false,
      // parseDOM and toDOM is still required to make copy and paste work
      parseDOM: [{
        tag: 'semantic-tag',
        getAttrs: dom => ({
          tag: dom.getAttribute('tag'),
        }),
      }],
      toDOM: node => ['semantic-tag', {
        tag: node.attrs.tag
      }],
    }
  }


  commands({ type }) {
    return attrs => (state, dispatch) => {
      const { selection } = state
      const position = selection.$cursor ? selection.$cursor.pos - 1 : selection.$to.pos
      const node = type.create(attrs)
      const transaction = state.tr.insert(position, node)
      dispatch(transaction)
    }
  }
  // return a vue component
  // this can be an object or an imported component
  get view() {
    return SemanticTagVue
  }

}