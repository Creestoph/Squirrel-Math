import { Node } from 'tiptap'

export default class ChapterTitle extends Node {

  get name() {
    return 'chapter_title'
  }

  get schema() {
    return {
      content: 'inline*',
      parseDOM: [{ tag: 'chapter-title'}],
      marks: '',
      toDOM: () => ['chapter-title', ['div', { class: 'chapter_name' }, ['div', 0], ['hr']]],
    }
  }
}