import { Node, Plugin } from 'tiptap'
import { toggleWrap } from 'tiptap-commands'

export default class ChapterTitle extends Node {

  // choose a unique name
  get name() {
    return 'chapter_title'
  }

  // the prosemirror schema object
  // take a look at https://prosemirror.net/docs/guide/#schema for a detailed explanation
  get schema() {
    return {
      content: 'inline*',
      parseDOM: [
        { tag: 'div[chapter_title]', getAttrs(dom) {
          return !!dom.querySelector(":scope > div") && !!dom.querySelector(":scope > hr")
        }},
      ],
      toDOM: () => ['div', { class: 'chapter_name', 'chapter_title': true }, ['div', 0], ['hr']],
    }
  }
}

