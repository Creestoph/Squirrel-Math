import { Extension, Plugin } from 'tiptap'
import { Decoration, DecorationSet } from 'prosemirror-view'

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
          decorations: ({ doc, plugins }: any) => {
            const editablePlugin = plugins.find((plugin: any) => plugin.key.startsWith('editable$'))
            const editable = editablePlugin.props.editable()
            const active = editable || !this.options.showOnlyWhenEditable
            const decorations: any = []
            const isEditorEmpty = doc.textContent.length === 0

            if (!active) {
              return false
            }

            doc.descendants((node: any, pos: any) => {
              const isNodeEmpty = node.content.size === 0
                
              if (isNodeEmpty) {
                const classes = [this.options.emptyNodeClass]

                if (isEditorEmpty) {
                  classes.push(this.options.emptyEditorClass)
                }

                const decoration = Decoration.node(pos, pos + node.nodeSize, {
                  class: classes.join(' '),
                  'data-empty-text': typeof this.options.emptyNodeText === 'function'
                    ? this.options.emptyNodeText(node)
                    : this.options.emptyNodeText,
                })
                decorations.push(decoration)
                return true
              }

              return !node.content.content.find((x: any) => x.type.isText)

            })

            return DecorationSet.create(doc, decorations)
          },
        },
      }),
    ]
  }

}