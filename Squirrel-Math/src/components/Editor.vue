<template>
  <!-- <lesson>
    <lesson-title :serializer="titleSerializer" contenteditable="true">
      <span style="color: red">a</span> Dodawanie
    </lesson-title>
    <lesson-intro :serializer="introSerializer" contenteditable="true">
      <p>Intro</p>
    </lesson-intro>
    <lesson-chapter
      v-for="(chapterSerializer, index) in chapterSerializers"
      :key="index"
      :serializer="chapterSerializer"
      contenteditable="true"
    >
      <template #title>Dodawanie, czyli łączenie składników</template>costam
    </lesson-chapter>
    <button @click="serialize()">serialize</button>
    <button @click="addChapter()">add chapter</button>
  </lesson> -->
  <div>
    <editor-menu @addChapter="addChapter()" @test="test()" />
    <lesson-node :data="node" />
  </div>
</template>

<script lang="ts">
import LessonNode from "./editor/LessonNode.vue";
import EditorMenu from "./editor/menu/EditorMenu.vue";
import Vue from "vue";
import Component from "vue-class-component";
import * as data from "./editor/data";
import {deepCopy} from '@/scripts/deepCopy'

@Component({
  components: {
    LessonNode,
    EditorMenu
  }
})
export default class Editor extends Vue {
  focusedId: string|null = null;
  node!: data.LessonNodeData;
  created() {
    this.node = new data.LessonNodeData(
      "",
      "",
      new data.LessonTitleNodeData("My title"),
      new data.LessonIntroNodeData([
        new data.ParagraphNodeData("Some intro"),
        new data.ListNodeData(["a", "b", "c"])
      ]),
      [
        new data.LessonChapterNodeData("My chapter", [
          new data.ParagraphNodeData("Some content")
        ])
      ]
    )
  }
  mounted(){
    //@ts-ignore
    this.$eventBus.$on('editor-focus', (id: string) => {this.focusedId = id})
  }
  addChapter() {
    var i = this.node.chapters.findIndex(x => x.id == this.focusedId)
    i = i < 0 ? i = this.node.chapters.length : i + 1
    this.node.chapters.splice(i, 0,
      new data.LessonChapterNodeData("My chapter", [
        new data.ParagraphNodeData("Some content")
      ])
    )
    this.node = deepCopy(this.node)
    this.$forceUpdate()
  }
  test() {
    //@ts-ignore
    this.$eventBus.$emit("editor-save");
    console.log(this.node);
  }
}

// import LessonTitle from "./lesson/LessonTitle";
// import LessonIntro from "./lesson/LessonIntro";
// import LessonChapter from "./lesson/chapter/LessonChapter";
// import Lesson from "./lesson/Lesson";
// import { Serializer } from "../scripts/serializer";

// export default {
//   name: "Editor",
//   data() {
//     return {
//       titleSerializer: new Serializer("lesson-title"),
//       introSerializer: new Serializer("lesson-intro"),
//       chapterSerializers: [new Serializer("lesson-chapter")]
//     };
//   },
//   methods: {
//     serialize() {
//       let str =
//         this.titleSerializer.serialize() + this.introSerializer.serialize();
//       for (let i = 0; i < this.chapterSerializers.length; i++) {
//         str += this.chapterSerializers[i].serialize();
//       }
//       str = "<lesson>" + str + "</lesson>";
//       str = str.replace(/data-v-[a-z0-9]*="[^"]*"/g, "");
//       console.log(str);
//     },
//     addChapter() {
//       this.chapterSerializers.push(new Serializer("lesson-chapter"));
//     }
//   },
//   components: {
//     LessonIntro,
//     LessonTitle,
//     LessonChapter,
//     Lesson
//   }
// };
</script>

<style scoped></style>
