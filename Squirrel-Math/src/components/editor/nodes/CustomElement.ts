import { Node } from 'tiptap'
import { toggleBlockType } from 'tiptap-commands'
import { Highlight } from 'tiptap-extensions'
import CustomElementVue from './CustomElement.vue'
// @ts-ignore
import low from 'lowlight/lib/core'
// @ts-ignore
import html from 'highlight.js/lib/languages/xml'
import { TextSelection } from 'prosemirror-state'

export default class CustomElement extends Node {

  constructor() {
    super()    
    low.registerLanguage('html', html)
  }

  get name() {
    return 'custom_element'
  }

  get schema() {
    return {
      group: 'block',
      content: 'text*',
      marks: '',
      code: true,
      draggable: true,
      parseDOM: [{ tag: 'custom' }],
      toDOM: (node: any) => ['custom', 0],
    }
  }

  commands({ type, schema }: any) {
    return () => toggleBlockType(type, schema.nodes.paragraph)
  }

  get view() {
    return CustomElementVue;
  }

  get plugins() {
    return [
      Highlight({ name: this.name })
    ]
  }

  keys({ type }: any) {
    return {
      'Tab': (state: any, dispatch: any) => {
        const { selection, doc } = state
        const position = selection.$cursor ? selection.$cursor.pos : selection.$to.pos;
        const context = doc.resolve(position);
        if (context.parent.type.name == 'customElement') {
          const transaction = state.tr.insertText(' '.repeat(4), position);
          dispatch(transaction);
          return true;
        }
      },
      'Ctrl-a': (state: any, dispatch: any) => {
        const { selection, doc } = state
        const position = selection.$cursor ? selection.$cursor.pos : selection.$to.pos;
        const context = doc.resolve(position);
        if (context.parent.type.name == 'customElement') {
          const editorStart = context.pos - context.parentOffset;
          const editorEnd = editorStart + context.parent.nodeSize - 2;
          const transaction = state.tr.setSelection(TextSelection.create(doc, editorStart, editorEnd));
          dispatch(transaction);
          return true;
        }
      }
    };
  }

}