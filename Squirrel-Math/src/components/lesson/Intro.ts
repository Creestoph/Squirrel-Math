import { Node } from "tiptap";
import LessonIntro from './LessonIntro.vue'

export default class Intro extends Node {
  get name() {
    return "intro";
  }

  get schema() {
    return {
      content: "block+",
      parseDOM: [{ tag: "intro" }],
      toDOM: () => ["intro", 0]
    };
  }

  get view() {
    return LessonIntro;
  }
}