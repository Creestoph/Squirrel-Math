<template>
  <div class="component-container">
    <div v-show="editMode" class="editor-wrapper">
      <pre class="html-editor" ref="content"></pre>
      <button @click="run()" title="uruchom"><icon>play_arrow</icon></button>
    </div>
    <div v-show="!editMode" class="output-wrapper">
      <div contenteditable="false" v-html="parsed" ref="output" class="output"></div>
      <button @click="edit()" title="edytuj"><icon>edit</icon></button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["node", "updateAttrs", "view"],
  data() {
    return {
      editMode: true,
      parsed: ''
    }
  },
  methods: {
    run() {
      if (this.node.content && this.node.content.content[0] && this.node.content.content[0].text) {
        this.parsed = this.node.content.content[0].text;
        this.$nextTick(() => this.runScripts(this.$refs.output));
        this.editMode = false;
      }
    },
    runScripts(htmlElement) {
      Array.from(htmlElement.children).forEach(child => {
        if (child.tagName == 'SCRIPT') {
          htmlElement.removeChild(child);
          let childCopy = document.createElement('script');
          childCopy.innerHTML = child.innerHTML;
          if (child.src)
            childCopy.src = child.src;
          if (child.type)
            childCopy.type = child.type;
          htmlElement.appendChild(childCopy);
        }
        else 
          this.runScripts(child);
      });
    },
    edit() {
      this.editMode = true;
    }
  }
};
</script>

<style lang="scss">
@import "@/style/global";
.html-editor {
  outline: 1px solid $gray;
  padding: 10px;
  font-family: $geometric-font;
  color: $half-gray;
  line-height: 1.61em;

  .hljs-comment {
    color: #56af02;
  }
  .hljs-tag {
    font-weight: bold;
    color: #30017c;
  }
  .hljs-tag.hljs-attr {
    font-weight: normal;
    color: #770434
  }
  .hljs-tag.hljs-string {
    color: #df8a68;
    font-weight: normal;
  }
  .hljs-symbol {
    font-weight: bold;
  }
}
</style>
<style scoped lang="scss">
@import "@/style/global";
.component-container {
  position: relative;
  padding: 0;
}
button {
  position: absolute;
  width: 42px;
  height: 42px;
  right: -1px;
  top: -1px;
  background: white;
  border: 1px solid $gray;
  display: none;
  margin: 0;
  padding: 0;
}
.editor-wrapper:hover button {
  display: block;
}
.output {
  min-height: 42px;;
}
.output:hover {
  outline: 1px solid $gray;
}
.output-wrapper {
  white-space: normal; //needed to prevent .ProseMirror style - pre-wrap
}
.output-wrapper:hover button {
  display: block;
}
</style>
