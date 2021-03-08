import { Node } from "tiptap";

export default class Chapter extends Node {
  get name() {
    return "chapter";
  }

  get schema() {
    return {
      content: "chapter_title chapter_body",
      parseDOM: [{ tag: "chapter" }],
      toDOM: () => ["chapter", ["div", { class: "chapter" }, 0]]
    };
  }

  commands({ type }: any) {
    return {
      createChapter() {
        return (state: any, dispatch: any) => dispatch(state.tr.insert(state.tr.doc.content.size, type.createAndFill()));
      },
      removeChapter() {
        return (state: any, dispatch: any) => {
          let $pos = state.selection.$anchor
          for (let d = $pos.depth; d > 0; d--) {
            let node = $pos.node(d)
            if (node.type.name == "chapter") {
              if (dispatch) {
                dispatch(state.tr.delete($pos.before(d), $pos.after(d)).scrollIntoView())
              }
                return true
            }
          }
          return false
        }
      }
    };
  }
}