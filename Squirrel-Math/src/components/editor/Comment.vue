<template>
  <span>
    <div class="comment-editor" v-if="showEditor">
      <textarea v-model="node.attrs.text"></textarea>
      <button @click="hiddenComment = !hiddenComment" class="mode-button" :class="{ 'visible-mode': !hiddenComment }"
        :title="`Zmień tryb wyświetlania komentarza. 
        Ukryte komentarze wyświetlają się tylko po najechaniu myszą na odpowiadający fragment tekstu. 
        Komentarze widoczne sygnalizowane są przy pomocy symbolu pytajnika.
        Obecny tryb: ${ hiddenComment ? 'Ukryty' : 'Widoczny' }`">
        Tryb: {{ hiddenComment ? 'Ukryty' : 'Widoczny' }}
      </button>
      <button @click="showEditor = false; text = node.attrs.text" class="apply-button">Zatwierdź</button>
    </div>
    <span ref="content" class="comment" @click="showEditor = true"></span>
  </span>
</template>

<script>

export default {
  props: ["node", "updateAttrs", "view"],
  computed: {
    id: {
      get() {
        return this.node.attrs.id;
      },
      set(id) {
        this.updateAttrs({ id });
      }
    },
    text: {
      get() {
        return this.node.attrs.text;
      },
      set(text) {
        this.updateAttrs({ text });
      }
    }
  },
  data() {
    return {
      showEditor: true,
      hiddenComment: false
    }
  },
  mounted() {

  }
};
</script>

<style scoped lang="scss">
@import "@/style/global";
.comment {
  text-decoration: underline $main-red dashed;
  text-decoration-thickness: 3px;
  text-decoration-skip-ink: none;
  background: #ffeeee;
  &:hover {
    background: #ffe5e5;
    cursor: pointer;
  }
}
.comment-editor {
  display: inline-block;
  position: absolute;
  left: -320px;
  margin-top: 12px;
  width: 250px;
  height: 170px;
  background: black;
  border-radius: 15px;
  color: white;
  padding: 10px;

  textarea {
    display: block;
    outline: none;
    background: black;
    color: $gray;
    border: none;
    width: 250px;
    height: 120px;
    margin-bottom: 10px;
    padding: 0;
    resize: none;
  }
  button {
    border-radius: 5px;
    padding: 5px 10px;
  }
  .mode-button {
    background: black;
    color: white;
    border: 1px solid white;
  }
  .apply-button {
    background: white;
    color: black;
    float: right;
  }

  &:after {
    content: '';
    position: absolute;
    right: -30px;
    top: 0;
    width: 0; 
    height: 0; 
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    border-top: 30px solid black;
  }
}
</style>
