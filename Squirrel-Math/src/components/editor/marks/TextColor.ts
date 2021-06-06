import { Mark } from 'tiptap'
import { updateMark } from 'tiptap-commands'

export default class TextColor extends Mark {

  get name() {
    return 'text_color'
  }

  get schema() {
    return {
      attrs: {
        color: {
          default: "black"
        }
      },
      parseDOM: [{
        tag: 'span[style^="color"]',
        getAttrs: (dom: any) => ({ color: dom.style.color })
      }],
      toDOM: (mark: any) => ['span', { style: 'color: '+ mark.attrs.color }, 0]
    }
  }

  commands({ type }: any) {
    return (attrs: any) => updateMark(type, attrs);
  }
}