import { Node } from 'tiptap'
import LessonTitle from './LessonTitle.vue'

export default class Title extends Node {

  get name() {
    return 'title'
  }

  get schema() {
    return {
      content: 'inline*',
      defining: true,
      parseDOM: [{ tag: 'h1' }],
      toDOM: () => ['h1', 0],
    }
  }

  get view() {
    return LessonTitle
  }
}