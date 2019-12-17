import { Node } from "tiptap";
import { toggleWrap } from "tiptap-commands";

export default class Chapter extends Node {
  // choose a unique name
  get name() {
    return "chapter";
  }

  // the prosemirror schema object
  // take a look at https://prosemirror.net/docs/guide/#schema for a detailed explanation
  get schema() {
    return {
      content: "chapter_title chapter_body",
      parseDOM: [{ tag: "div[chapter]" }],
      toDOM: () => ["div", { class: "chapter", chapter: true }, 0]
    };
  }

  // this command will be called from menus to add a blockquote
  // `type` is the prosemirror schema object for this blockquote
  // `schema` is a collection of all registered nodes and marks
  commands({ type, schema }) {
    return {
      createChapter() {
        return (state, dispatch) => dispatch(state.tr.insert(state.tr.doc.content.size, type.createAndFill()));
      },
      removeChapter() {
        return (state, dispatch) => {
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
