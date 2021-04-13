import { Extension, Plugin } from 'tiptap'

export default class NumberMarker extends Extension {

  get name() {
    return 'numbers_marker'
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
          handleKeyPress: (view: any, event: KeyboardEvent) => {
            if (/[0-9><=%+]/.test(event.key)) {
              let cursorPosition = view.state.selection.from;
              const context = view.state.doc.resolve(cursorPosition);
              if (context.parent.type.name != 'customElement') {
                setTimeout(() => {
                  view.updateState(view.state.apply(view.state.tr.addMark(cursorPosition, cursorPosition + 1, view.state.schema.mark('number'))));
                }, 0);
              }
            }
          }
        },
      }),
    ]
  }

}