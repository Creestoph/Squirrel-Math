import { Node } from "tiptap";
import { toggleWrap } from "tiptap-commands";

export default class Intro extends Node {
  get name() {
    return "intro";
  }

  get schema() {
    return {
      content: "block+",
      parseDOM: [{ tag: "div[intro]" }],
      toDOM: () => ["div", { class: "intro", intro: true }, 0]
    };
  }
}
