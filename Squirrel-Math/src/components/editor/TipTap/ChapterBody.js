import { Node } from 'tiptap'
import { toggleWrap } from 'tiptap-commands'

export default class ChapterTitle extends Node {

  // choose a unique name
  get name() {
    return 'chapter_body'
  }

  // the prosemirror schema object
  // take a look at https://prosemirror.net/docs/guide/#schema for a detailed explanation
  get schema() {
    return {
      content: 'block+',
      parseDOM: [
        { tag: 'div[chapter_body]', getAttrs(dom) {
         return dom.querySelector(":scope > div.chapter_body")
        }},
      ],
      toDOM: () => ['div', { class: 'chapter_mask', 'chapter_body': true }, ['div', {class: 'chapter_body'}, 0]],
    }
  }

  // this command will be called from menus to add a blockquote
  // `type` is the prosemirror schema object for this blockquote
  // `schema` is a collection of all registered nodes and marks
  commands({ type, schema }) {
    return () => toggleWrap(type)
  }

}