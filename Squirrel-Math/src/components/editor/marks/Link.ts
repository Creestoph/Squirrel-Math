import { Mark } from 'tiptap'
import { updateMark } from 'tiptap-commands'
import LinkVue from './Link.vue'

export default class Link extends Mark {

  get name() {
    return 'link'
  }

  get schema() {
    return {
      attrs: {
        href: {
          default: ""
        }
      },
      inclusive: false,
      parseDOM: [{
        tag: 'a',
        getAttrs: (dom: any) => ({ href: dom.getAttribute('href') })
      }],
      toDOM: (mark: any) => ['a', { href: mark.attrs.href }, 0]
    }
  }

  commands({ type }: any) {
      return (attrs: any) => updateMark(type, { href: attrs.href });
  }

  get view() {
    return LinkVue;
  }
}