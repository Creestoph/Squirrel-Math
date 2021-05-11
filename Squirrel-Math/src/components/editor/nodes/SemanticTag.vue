<template>
  <div class="tags-wrapper">
    <div class="dropdown" v-for="(tag, j) in tags" :key="j">
      <div class="type">
        {{ tag }}
        <span v-if="tags.length > 1" @click="removeTag(j)">+</span>
      </div>
      <div v-if="availableOptions(j).length > 1" class="dropdown-list">
        <div class="dropdown-position" v-for="(option, i) in availableOptions(j)" :key="i" @click="choose(j, option)">{{option}}</div>
      </div>
    </div>
    <span v-if="canAddTag()" @click="addTag()" class="add-tag-button">+</span>
  </div>
</template>

<script>
export default {
  props: ["node", "updateAttrs", "view"],
  computed: {
    tags: {
      get() {
        return this.node.attrs.tags;
      },
      set(tags) {
        this.updateAttrs({ tags });
      }
    }
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
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/style/global";

.tags-wrapper {
  height: 35px;
  padding-right: 100px;
  width: max-content;
}

.dropdown {
  max-width: 120px;
  float: left;
  &:not(:first-child) {
    margin-left: 5px;
  }
}

.type {
  line-height: 30px;
  outline: none;
  margin: 0;
}

.type span {
  display: none;
}

.tags-wrapper:hover .type {
  width: 110px;
  span {
    display: block;
    float: right;
    right: 0px;
    font-family: $geometric-font;
    font-size: 2em;
    line-height: 25px;
    transform: translateY(1px) rotate(45deg);
    margin-right: 3px;
    cursor: pointer;
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
  width: 120px;
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
  color: $darker-gray;
  margin-left: 5px;
  display: none;
  cursor: pointer;
}
.tags-wrapper:hover .add-tag-button {
  display: inline-block;
}
</style>
<style lang="scss">
.tags-wrapper + * {
  margin-top: 0px
}
</style>
