import { Node } from 'tiptap'
import BuiltInComponentVue from './BuiltInComponent.vue'

export default class CustomElement extends Node {
  
  get name() {
    return 'component'
  }

  get schema() {
    return {
      attrs: {
        componentName: {
          default: ""
        },
        args: {
          default: []
        }
      },
      group: 'block',
      defining: false,
      draggable: true,
      parseDOM: [{
        tag: 'component',
        getAttrs: (dom: any) => ({ componentName: dom.getAttribute('componentName'), args: JSON.parse(dom.getAttribute('args')) })
      }],
      toDOM: (node: any) => ['component', { componentName: node.attrs.componentName, args: JSON.stringify(node.attrs.args) }],
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
    return BuiltInComponentVue;
  }
}