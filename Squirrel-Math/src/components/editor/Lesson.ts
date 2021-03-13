import { Doc } from 'tiptap'

export default class LessonDoc extends Doc {

  get schema() {
    return {
      content: 'title intro chapter*',
    }
  }

}