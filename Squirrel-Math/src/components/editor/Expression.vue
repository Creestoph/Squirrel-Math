<template>
  <div>
    <div ref="placeholder" class="math-placeholder" @click="edit()">Wprowadź wyrażenie matematyczne</div>
    <div ref="output" class="math-display" @click="edit()"></div>
    <textarea ref="mathEditor" class="math-editor" v-model="mathJaxDirty" @blur="update()"></textarea>
  </div>
</template>

<script>
export default {
  props: ["node", "updateAttrs", "view"],
  computed: {
    mathJax: {
      get() {
        return this.node.attrs.mathJax;
      },
      set(mathJax) {
        this.updateAttrs({ mathJax });
      }
    }
  },
  data() {
    return {
      mathJaxDirty: ""
    }
  },
  mounted() {
    this.$refs.output.innerHTML = '$$' + this.mathJax + '$$';
    setTimeout(() => MathJax.Hub.Queue(["Typeset", MathJax.Hub]), 0);
    this.mathJaxDirty = this.mathJax;
  },
  methods: {
    edit() {
      this.$refs.mathEditor.style.display = "block";
      setTimeout(() => this.$refs.mathEditor.focus(), 0);
    },
    update() {
      this.$refs.mathEditor.style.display = "none";
      this.mathJax = this.mathJaxDirty;
      this.$refs.output.innerHTML = '$$' + this.mathJax + '$$';
      setTimeout(() => MathJax.Hub.Queue(["Typeset", MathJax.Hub]), 0);
      if (this.mathJaxDirty) {
        this.$refs.placeholder.style.display = "none";
        this.$refs.output.style.display = "block";
      }
      else {
        this.$refs.placeholder.style.display = "block";
        this.$refs.output.style.display = "none";      
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/style/global";

.math-placeholder {
  min-height: 50px;
  line-height: 50px;
  text-align: center;
  color: $gray;
}
.math-display {
  display: none;
  outline: none;
}
.math-editor {
  display: none;
  width: 500px;
  height: 300px;
  z-index: 3;
  position: fixed;
  left: calc(50% - 240px);
  top: calc(50% - 140px);
  background: white;
  outline: none;
  box-shadow: 0 0 15px 15px rgba(0.4, 0.4, 0.4, 0.4);
  padding: 10px;
  font-family: $geometric-font;
  color: $half-gray;
}
.math-editor:focus {
  display: block;
}
</style>
