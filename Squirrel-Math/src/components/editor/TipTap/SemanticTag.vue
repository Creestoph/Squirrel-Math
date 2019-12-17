<template>
  <p class="type" @click="click()" contenteditable="true">
    {{ tag ? tag : "---" }}
  </p>
</template>

<script>
export default {
  // there are some props available
  // `node` is a Prosemirror Node Object
  // `updateAttrs` is a function to update attributes defined in `schema`
  // `view` is the ProseMirror view instance
  // `options` is an array of your extension options
  // `selected`
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
      tags: ["Intuicje", "Formalnie", "Rozszerzenie", "Werkstaat"]
    };
  },
  methods: {
    click() {
      this.tag = this.tags[
        (this.tags.indexOf(this.tag) + 1) % this.tags.length
      ];
    }
  }
};
</script>

<style>
p.type {
  /* line-height: 0%; */
  display: inline-block;
  background-color: #dd3333;
  padding: 0 5px;
  height: 31px;
  line-height: 31px;
  color: white;
  margin-top: 0;
  margin-bottom: 0.1em;
  transition: background-color 0.1s;
  box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.4);
}
</style>