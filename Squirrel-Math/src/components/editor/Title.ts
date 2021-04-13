import { Node } from 'tiptap'
import LessonTitle from '../lesson/LessonTitle.vue'

export default class Title extends Node {

  get name() {
    return 'title'
  }

  get schema() {
    return {
      content: 'inline*',
      defining: true,
      parseDOM: [{ tag: 'h1' }],
      marks: '',
      toDOM: () => ['h1', 0],
    }
  }

  get view() {
    return LessonTitle
  }
}