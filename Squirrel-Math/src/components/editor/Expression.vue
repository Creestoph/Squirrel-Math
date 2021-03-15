<template>
  <div>
    <div ref="placeholder" class="math-placeholder" @click="edit()">Wprowadź wyrażenie matematyczne</div>
    <div ref="output" class="math-display" @click="edit()"></div>
    <textarea ref="mathEditor" class="math-editor" placeholder="Wprowadź kod MathJax" v-model="mathJaxDirty" @blur="applyEdit()"></textarea>
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
    this.updateView();
  },
  methods: {
    edit() {
      this.mathJaxDirty = this.mathJax;
      this.$refs.mathEditor.style.display = "block";
      this.$nextTick(() => this.$refs.mathEditor.focus());
    },
    applyEdit() {
      this.mathJax = this.mathJaxDirty;
      this.updateView();
    },
    updateView() {
      this.$refs.mathEditor.style.display = "none";
      this.$refs.output.innerHTML = '$$' + this.mathJax + '$$';
      this.$nextTick(() => MathJax.Hub.Queue(["Typeset", MathJax.Hub]));
      if (this.mathJax) {
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
  min-height: 27px;
  line-height: 27px;
  text-align: center;
  color: $dark-gray;
  cursor: pointer;
}
.math-display {
  display: none;
  outline: none;
}
.math-placeholder:hover, .math-display:hover {
  background: $light-gray;
  cursor: pointer;
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
::placeholder {
  color: $dark-gray;
}
.math-editor:focus {
  display: block;
}
</style>
