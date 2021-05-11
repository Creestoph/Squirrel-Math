import { Node } from 'tiptap'
import LessonTitle from '../../lesson/LessonTitle.vue'
import LessonTitleShort from '../../lesson/LessonTitleShort.vue'

export default class Title extends Node {

  constructor(private shortVersion: boolean) {
    super();
  }

  get name() {
    return 'title'
  }

  get schema() {
    return {
      content: 'inline*',
      defining: true,
      parseDOM: [{ tag: 'h1' }],
      marks: '',
      toDOM: () => ['h1', 0]
    }
  }

  get view() {
    return this.shortVersion ? LessonTitleShort : LessonTitle;
  }
}