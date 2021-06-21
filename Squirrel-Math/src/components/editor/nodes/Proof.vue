<template>
  <div class='proof'>
    <div class="wrapper">
      <div class="dropdown">
        <div class="proof-sticker">{{ label }}</div>
        <div class="dropdown-list">
          <div class="dropdown-position" v-for="(option, i) in availableOptions" :key="i" @click="chooseLabel(option)">{{option}}</div>
        </div>
      </div>

      <span :class="required.length == 0 ? 'required-optional' : 'required-strong'">Wymagane:</span>
      <div class="required dropdown" v-for="(required, j) in required" :key="'required' + j">
        <div class="required-label">
          {{ required }}
          <span @click="removeRequired(j)" class="cross">⨯</span>
        </div>
        <div class="dropdown-list">
          <div class="dropdown-position" v-for="(lesson, i) in availableLessons" :key="i" @click="chooseLesson(j, lesson.title)">{{ lesson.title }}</div>
        </div>
      </div>
      <span class="add-required-button" v-if="canAddNewRequired()" @click="addRequiredLesson()">+</span>

    </div>
    <div ref="content"></div>
  </div>
</template>

<script>
export default {
  props: ["node", "updateAttrs", "view"],
  data() {
    return {
      availableOptions: ["Dowód", "Uzasadnienie", "Szkic dowodu"],
      allLessons: []
    }
  },
  computed: {
    label: {
      get() {
        return this.node.attrs.label;
      },
      set(label) {
        this.updateAttrs({ label });
      }
    },
    required: {
      get() {
        return this.node.attrs.required;
      },
      set(required) {
        this.updateAttrs({ required });
      }
    },
    availableLessons: {
      get() {
        return this.allLessons.filter(lesson => !this.required.includes(lesson.title))
      }
    }
  },
  mounted() {
    import(`@/assets/current_lesson_graph.json`).then(file => this.allLessons = file.default.concat({ title: 'Lekcja jeszcze niedostępna' }));
  },
  methods: {
    chooseLabel(option) {
      this.label = option;
    },
    addRequiredLesson() {
      this.required = [...this.required, ''];
    },
    chooseLesson(position, lesson) {
      let newRequired = [...this.required];
      newRequired[position] = lesson;
      this.required = newRequired;
    },
    removeRequired(position) {
      this.required.splice(position, 1);
    },
    canAddNewRequired() {
      return (!this.required.length || this.required[this.required.length - 1]) && this.availableLessons.length > 0;
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/style/global";

.wrapper {
  padding-right: 100px;
  margin-left: -10px;

  > * {
    float: left;
    margin-bottom: 5px;
  }

  &::after { //clearfix
    content: "";
    clear: both;
    display: table;
  }
}

.proof {
  padding-top: 0;
}

.proof-sticker {
  position: static;
  line-height: 30px;
  outline: none;
  margin: 0;
}

.cross {
  display: none;
  float: right;
  font-size: 2em;
  line-height: 1.3em;
  cursor: pointer;
  .wrapper:hover & {
    display: block;
  }
}

.wrapper:hover {
  z-index: 2;
  .proof-sticker {
    width: 100px;
  }
}

.dropdown {
  max-width: 120px;
  margin-right: 5px;
}

.dropdown-list {
  position: absolute;
  display: none;
  z-index: 2;
  background: $light-gray;
  max-height: 300px;
  width: 100%;
  overflow-y: auto;

  .dropdown:hover & {
    display: block;
  }
}

.dropdown-position {
  padding: 2px 8px;
  font-size: 0.9em;
  cursor: pointer;
  &:hover {
    background: $gray;
  }
}

.required {
  min-width: 70px;
  max-width: unset;
  width: max-content;
  .dropdown-list {
    width: 320px;
  }
}
.required-label {
  background: $light-gray;
  color: $darker-gray;
  font-size: 0.9em;
  font-weight: bold;
  height: 40px;
  line-height: 40px;
  padding: 0 12px;
}
.required-optional {
  @extend .required-label;
  margin-right: 5px;
  display: none;
}
.required-strong {
  @extend .required-label;
  color: black;
  margin-right: 5px;
}
.add-required-button {
  font-family: $geometric-font;
  font-size: 2em;
  color: $darker-gray;
  margin-left: 5px;
  display: none;
  cursor: pointer;
  height: 40px;
  line-height: 40px;
}
.wrapper:hover {
  .add-tag-button, .required-optional, .add-required-button {
    display: inline-block;
  }
}
</style>
