<template>
  <span class="link-wrapper">
    <div class="link-editor" v-if="showEditor">
      Link do lekcji
      <dropdown @keydown.esc="close()" :class="{'link-dropdown': true}" @click.native="getLessons()" @selected="selectLesson($event)" :arrow="true">
        <template v-slot:placeholder>{{ selectedLesson }} </template>
        <dropdown-option v-for="(lesson, i) in lessons" :key="i" :class="{'link-dropdown-option': true}" :value="lesson.title">{{ lesson.title }}</dropdown-option>
      </dropdown>
      Rozdział
      <dropdown @keydown.esc="close()" :class="{'link-dropdown': true}" @click.native="getChapters()" @selected="selectChapter($event)" :arrow="true">
        <template v-slot:placeholder>{{ selectedChapter }} </template>
        <dropdown-option v-for="(chapter, i) in chapters" :key="i" :disabled="chapter.disabled" :class="{'link-dropdown-option': true}" :value="chapter.name">{{ chapter.name }}</dropdown-option>
      </dropdown>
      <button class="navigate-button" @click="navigate()">Odwiedź stronę</button>
      <button @click="close()" class="apply-button">+</button>
    </div>
    <span ref="content" class="link" :href="href" @click="openPopup()"></span>
  </span>
</template>

<script>
import Dropdown from '../Dropdown.vue';
import DropdownOption from '../DropdownOption.vue';

export default {
  components: { Dropdown, DropdownOption },
  props: ["node", "updateAttrs", "view"],
  computed: {
    href: {
      get() {
        return this.node.attrs.href;
      },
      set(href) {
        this.updateAttrs({ href });
      }
    }
  },
  data() {
    return {
      showEditor: false,
      url: '',
      selectedLesson: '',
      selectedChapter: '',
      lessons: ['Ładowanie...'],
      chapters: [{ name: 'Nie wybrano', disabled: true }]
    }
  },
  mounted() {
    if (this.href === '')
      this.openPopup();
    else {
      this.url = this.href;
      let lessonUrl;
      [lessonUrl, this.selectedChapter] = this.url.split('#');
      this.getLessons().then(lessons => this.selectedLesson = lessons.find(l => '/lesson/' + l.title == lessonUrl).title);
    }
  },
  methods: {
    getLessons() {
      if (this.lessons.length == 1) {
        return import(`@/assets/current_lesson_graph.json`).then(file => {
          this.lessons = file.default;
          return Promise.resolve(this.lessons);
        });
      }
    },
    getChapters() {
      if (this.selectedLesson) {
        import(`@/assets/lessons/${this.selectedLesson}.json`).then(
          file => {
            const chapters = file.long.content.filter(c => c.type == 'chapter');
            if (chapters.length)
              this.chapters = chapters.map(c => ({name: c.content[0].content[0].text, disabled: false}))
            else
              this.chapters = [{ name: 'Lekcja nie posiada rozdziałów', disabled: true }];
          },
          () => {
              this.chapters = [{ name: 'Lekcja nie posiada rozdziałów', disabled: true }];
          }
        );
      }
    },
    selectLesson(lesson) {
      this.selectedLesson = lesson;
      this.url = '/lesson/' + this.lessons.find(l => l.title == lesson).title;
      this.selectedChapter = '';
    },
    selectChapter(chapter) {
      this.selectedChapter = chapter;
      this.url = '/lesson/' + this.lessons.find(l => l.title == this.selectedLesson).title + '#' + chapter;
    },
    openPopup() {
        this.showEditor = true;
    },
    close() {
      this.showEditor = false; 
      this.href = this.url;
    },
    navigate() {
      window.open(this.url, '_blank');
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/style/global";
.link-wrapper {
  position: relative;
}

.link {
  text-decoration: underline;
}

.link-editor {
  display: inline-block;
  position: absolute;
  right: -145px;
  top: -230px;
  width: 322px;
  height: 185px;
  background: black;
  border-radius: 15px;
  color: white;
  padding: 10px;

  .apply-button {
    position: absolute;
    right: 5px;
    top: 5px;
    height: 30px;
    padding: 0;
    font-family: $geometric-font;
    font-size: 3em;
    transform: rotate(45deg) translateY(-3px);
    background: transparent;
    color: white;
    float: left;
  }

  .navigate-button {
    border-radius: 6px;
    padding: 3px 6px;
    background-color: black;
    color: white;
    border: 1px solid white;
    transition: background-color 0.2s, color 0.2s;

    &:hover {
      background-color: white;
      color: black;
    }
  }

  &:after {
    content: '';
    position: absolute;
    left: calc(50% - 20px);
    bottom: -20px;
    width: 0; 
    height: 0; 
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-top: 20px solid black;
  }
}

.link-dropdown {
  height: 25px;
  min-width: 100px;
  max-width: 310px;
  border-bottom: 1px solid white;
  margin-bottom: 20px;
  background: black;
  color: white;
}
.link-dropdown-option {
  background: white;
  color: black;
  line-height: 1.5em;
  &:hover {
    background: black;
    color: white;
  }
}
</style>
