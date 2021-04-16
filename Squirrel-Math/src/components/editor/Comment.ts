import { Mark } from 'tiptap'
import { updateMark } from 'tiptap-commands'
import CommentVue from './Comment.vue'

export default class Comment extends Mark {

  static idCounter = 1;

  get name() {
    return 'comment'
  }

  get schema() {
    return {
      attrs: {
        id: {
          default: ""
        },
        text: {
          default: ""
        }
      },
      inclusive: false,
      parseDOM: [{
        tag: 'comment',
        getAttrs: (dom: any) => ({ id: dom.getAttribute('comment-id'), text: dom.getAttribute('comment-text') })
      }],
      toDOM: (mark: any) => ['comment', { 'comment-id': mark.attrs.id, 'comment-text': mark.attrs.text }, 0]
    }
  }

  commands({ type }: any) {
      return (attrs: any) => updateMark(type, { id: attrs.id || Comment.idCounter++ });
  }

  get view() {
    return CommentVue;
  }
}