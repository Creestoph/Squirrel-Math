<template>
  <div class="tags-wrapper">
    <div class="dropdown" v-for="(tag, j) in tags" :key="'tag' + j">
      <div class="type">
        {{ tag }}
        <span v-if="tags.length > 1" @click="removeTag(j)" class="cross">⨯</span>
      </div>
      <div v-if="availableOptions(j).length > 1" class="dropdown-list">
        <div class="dropdown-position" v-for="(option, i) in availableOptions(j)" :key="i" @click="choose(j, option)">{{ option }}</div>
      </div>
    </div>
    <span v-if="canAddTag()" @click="addTag()" class="add-tag-button">+</span>
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
</template>

<script>
export default {
  props: ["node", "updateAttrs", "view"],
  data() {
    return {
      allLessons: []
    }
  },
  computed: {
    tags: {
      get() {
        return this.node.attrs.tags;
      },
      set(tags) {
        this.updateAttrs({ tags });
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
    import(`@/assets/current_lesson_graph.json`).then(file => this.allLessons = file.default);
  },
  methods: {
    availableOptions(position) {
      if (position == 0 && this.tags.length == 1)
        return ["Intuicje", "Formalnie", "Rozszerzenie", "Warsztat"];
      else if (position == 0 && this.tags.length == 2)
        return ["Intuicje", "Formalnie", "Warsztat"];
      else
        return ["Rozszerzenie"];
    },
    choose(position, option) {
      let newTags = [...this.tags];
      newTags[position] = option;
      this.tags = newTags;
    },
    canAddTag() {
      return this.tags.length == 1 && this.tags[0] != "Rozszerzenie";
    },
    removeTag(position) {
      this.tags.splice(position, 1);
    },
    addTag() {
      this.tags = [...this.tags, "Rozszerzenie"];
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

.tags-wrapper {
  padding-right: 100px;
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

.dropdown {
  max-width: 120px;
  margin-right: 5px;
}

.tags-wrapper:hover .type {
  width: 110px;
}
.cross {
  display: none;
  float: right;
  font-size: 2em;
  cursor: pointer;
  .tags-wrapper:hover & {
    display: block;
  }
}

.type:hover {
  background: $main-red;
}

.dropdown-list {
  position: absolute;
  z-index: 2;
  display: none;
  background: $light-gray;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
}

.dropdown:hover .dropdown-list {
  display: block;
}

.dropdown-position {
  padding: 2px 8px;
  font-size: 0.9em;
  cursor: pointer;
  &:hover {
    background: $gray;
  }
}

.add-tag-button {
  font-family: $geometric-font;
  font-size: 2em;
  color: $main-red;
  margin-left: 5px;
  display: none;
  cursor: pointer;
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
  height: 31px;
  line-height: 31px;
  padding: 0 10px;
  font-family: $secondary-font;
}
.required-optional {
  @extend .required-label;
  margin-left: 30px;
  margin-right: 5px;
  display: none;
}
.required-strong {
  @extend .required-label;
  color: black;
  margin-right: 5px;
  .tags-wrapper:hover & {
    margin-left: 30px;
  }
}
.add-required-button {
  font-family: $geometric-font;
  font-size: 2em;
  color: $darker-gray;
  margin-left: 5px;
  display: none;
  cursor: pointer;
}
.tags-wrapper:hover {
  .add-tag-button, .required-optional, .add-required-button {
    display: inline-block;
  }
}
</style>
<style lang="scss">
.tags-wrapper + * {
  margin-top: 0px
}
</style>
