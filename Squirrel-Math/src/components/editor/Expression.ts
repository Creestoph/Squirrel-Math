import { Node } from 'tiptap'
import { nodeInputRule } from 'tiptap-commands'
import ExpressionVue from './Expression.vue'
import { nodePasteRule } from './tiptap-utils'

export default class Expression extends Node {

  get name() {
    return 'expression'
  }

  get schema() {
    return {
      attrs: {
        mathJax: {
          default: ""
        }
      },
      group: 'block',
      draggable: true,
      parseDOM: [{
        tag: 'expression',
        getAttrs: (dom: any) => ({ mathJax: dom.getAttribute('mathJax')})
      }],
      toDOM: (node: any) => ['expression', { mathJax: node.attrs.mathJax }],
    }
  }

  commands({ type }: any) {
    return (attrs: any) => (state: any, dispatch: any) => {
      const { selection } = state;

      const node = type.create(attrs);
      const selectionContent = selection.content().content;
      node.attrs.mathJax = selectionContent.textBetween(0, selectionContent.size);

      const transaction = state.tr.deleteSelection();
      transaction.insert(transaction.selection.$from.pos, node);
      dispatch(transaction);
    }
  }

  get view() {
    return ExpressionVue;
  }
  
  inputRules({ type }: any) {
    return [
      nodeInputRule(/\$\$([^$]+)\$\$$/, type, (match: any) => ({ mathJax: match[1] }) ),
    ]
  }

  pasteRules({ type }: any) {
    return [
      nodePasteRule(/\$\$([^$]+)\$\$/g, type, (match: any) => ({ mathJax: match }))
    ]
  }
}