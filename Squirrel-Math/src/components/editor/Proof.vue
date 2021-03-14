<template>
  <div class='proof'>
    <div class="dropdown">
      <div class="proof-sticker">{{ label }}</div>
      <div class="dropdown-list">
        <div class="dropdown-position" v-for="(option, i) in availableOptions" :key="i" @click="choose(option)">{{option}}</div>
      </div>
    </div>
    <div ref="content"></div>
  </div>
</template>

<script>
export default {
  props: ["node", "updateAttrs", "view"],
  computed: {
    label: {
      get() {
        return this.node.attrs.label;
      },
      set(label) {
        this.updateAttrs({ label });
      }
    }
  },
  data() {
    return {
      availableOptions: ["Dowód", "Uzasadnienie", "Szkic dowodu"]
    }
  },
  methods: {
    choose(option) {
      this.label = option;
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/style/global";

.dropdown {
  position: absolute;
	top: 0;
	left: 0;
  z-index: 1;
}

.proof-sticker {
  position: static;
  line-height: 30px;
  outline: none;
  margin: 0;
}

.dropdown:hover .proof-sticker {
  width: 100px;
}

.dropdown-list {
  display: none;
  background: $light-gray;
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
</style>
