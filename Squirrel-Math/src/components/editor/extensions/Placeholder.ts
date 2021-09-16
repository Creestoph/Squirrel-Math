import { Extension, Plugin } from 'tiptap'
import { Decoration, DecorationSet } from 'prosemirror-view'
import { EditorState } from 'prosemirror-state'

export default class Placeholder extends Extension {

  constructor(args: any) {
    super(args)
  }

  get name() {
    return 'placeholder'
  }

  get defaultOptions() {
    return {
      emptyEditorClass: 'is-editor-empty',
      emptyNodeClass: 'is-empty',
      emptyNodeText: 'Write something …',
      showOnlyWhenEditable: true,
      showOnlyCurrent: true,
    }
  }

  get update() {
    return (view: any) => {
      view.updateState(view.state)
    }
  }

  get plugins() {
    return [
      new Plugin({
        props: {
          decorations: ({ doc, plugins }: EditorState) => {
            const editablePlugin = plugins.find((plugin: any) => plugin.key.startsWith('editable$')) as any;
            const editable = editablePlugin.props.editable()
            const active = editable || !this.options.showOnlyWhenEditable
            const decorations: Decoration[] = []
            const isEditorEmpty = doc.textContent.length === 0

            if (!active) {
              return false
            }

            doc.descendants((node, pos) => {
              const isNodeEmpty = node.content.size === 0
                
              if (isNodeEmpty) {
                const classes = [this.options.emptyNodeClass]

                if (isEditorEmpty) {
                  classes.push(this.options.emptyEditorClass)
                }

                const decoration = Decoration.node(pos, pos + node.nodeSize, {
                  class: classes.join(' '),
                  'data-empty-text': typeof this.options.emptyNodeText === 'function' ? this.options.emptyNodeText(node) : this.options.emptyNodeText,
                })
                decorations.push(decoration)
                return true
              }

              return !(node.content as any).content.find((x: any) => x.type.isText) && node.type.name != 'table';
            })

            return DecorationSet.create(doc, decorations)
          },
        },
      }),
    ]
  }

}