<template>
  <p class="type" @click="click()" contenteditable="true">{{ tag }}</p>
</template>

<script>
export default {
  props: ["node", "updateAttrs", "view"],
  computed: {
    tag: {
      get() {
        return this.node.attrs.tag;
      },
      set(tag) {
        this.updateAttrs({
          tag
        });
      }
    }
  },
  data() {
    return {
      tags: ["Intuicje", "Formalnie", "Rozszerzenie", "Warsztat"]
    };
  },
  methods: {
    click() {
      this.tag = this.tags[(this.tags.indexOf(this.tag) + 1) % this.tags.length];
    }
  }
};
</script>

<style>

</style>