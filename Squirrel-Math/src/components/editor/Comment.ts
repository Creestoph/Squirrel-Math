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
        }
      },
      inclusive: false,
      parseDOM: [{
        tag: 'comment',
        getAttrs: (dom: any) => ({ id: 1000 + dom.getAttribute('comment-id') }) //when block of text is copy-pasted, comment gets new id, but same ids get same new ids
      }],
      toDOM: (mark: any) => ['comment', { 'comment-id': mark.attrs.id }, 0]
    }
  }

  commands({ type }: any) {
      return (attrs: any) => updateMark(type, { id: attrs.id || Comment.idCounter++ });
  }

  get view() {
    return CommentVue;
  }
}