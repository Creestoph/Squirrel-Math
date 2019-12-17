import { Node } from 'tiptap'

export default class IframeNode extends Node {

  get name() {
    return 'iframe'
  }

  get schema() {
    return {
      // here you have to specify all values that can be stored in this node
      attrs: {
        src: {
          default: null,
        },
        test: {
            default: 'lol'
        }
      },
      group: 'block',
      selectable: false,
      // parseDOM and toDOM is still required to make copy and paste work
      parseDOM: [{
        tag: 'iframe',
        getAttrs: dom => ({
          src: dom.getAttribute('src'),
        }),
      }],
      toDOM: node => ['iframe', {
        src: node.attrs.src,
        frameborder: 0,
        allowfullscreen: 'true',
      }],
    }
  }


  commands({ type }) {
    return attrs => (state, dispatch) => {
      const { selection } = state
      const position = selection.$cursor ? selection.$cursor.pos : selection.$to.pos
      const node = type.create(attrs)
      const transaction = state.tr.insert(position, node)
      dispatch(transaction)
    }
  }
  // return a vue component
  // this can be an object or an imported component
  get view() {
    return {
      // there are some props available
      // `node` is a Prosemirror Node Object
      // `updateAttrs` is a function to update attributes defined in `schema`
      // `view` is the ProseMirror view instance
      // `options` is an array of your extension options
      // `selected`
      props: ['node', 'updateAttrs', 'view'],
      computed: {
        src: {
          get() {
            return this.node.attrs.src
          },
          set(src) {
            // we cannot update `src` itself because `this.node.attrs` is immutable
            this.updateAttrs({
              src,
            })
          },
        },
      },
      methods: {
          log() {
              this.updateAttrs({test: "a"})
          }
      },
      template: `
            <p @click="log()">testetstftdyfwuyta</p>
      `,
    }
  }

}