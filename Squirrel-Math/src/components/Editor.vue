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
    <editor-menu @addChapter="addChapter()" @test="test()"></editor-menu>
    <lesson-dynamic :data="data"></lesson-dynamic>
  </div>
</template>

<script>
import LessonDynamic from "./editor/LessonDynamic";
import EditorMenu from "./editor/menu/EditorMenu";
import { EventBus } from "@/event-bus.js";

export default {
  name: "Editor",
  data(){
    return {
      data:
      {
        "routeShortVersion": "",
        "routeLongVersion": "",
        "title":
        {
          "name": "LessonTitle",
          "data": "My title",
        },
        "intro":
        {
          "name": "LessonIntro",
          "data": [{ "name": "p", "data": "My intro"}],
        },
        "chapters":
        [
          {
            "name": "LessonChapter",
            "data":
            {
              "title": "My chapter",
              "nodes": "Some nodes"
            }
          }
        ]
      }
    }
  },
  methods:{
    addChapter(){
      this.data.chapters.push(
        {
            "name": "LessonChapter",
            "data":
            {
              "title": "My chapter",
              "nodes": "Some nodes"
            }
        });
      this.$forceUpdate();
    },
    test() {
      console.log(this.data);
      EventBus.$emit('editor-save')
      console.log(this.data);
    }
  },
  components: {
    LessonDynamic,
    EditorMenu,
  }
};


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

<style scoped>
</style>
