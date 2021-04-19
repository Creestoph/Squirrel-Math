<template>
  <span>
    <div class="comment-editor" v-if="showEditor">
      <textarea v-model="commentText" ref="commentEditor" @keydown.esc="close()"></textarea>
      <button @click="hidden = !hidden" class="mode-button" :class="{ 'visible-mode': !hidden }"
        :title="`Zmień tryb wyświetlania komentarza. 
        Ukryte komentarze wyświetlają się tylko po najechaniu myszą na odpowiadający fragment tekstu. 
        Komentarze widoczne sygnalizowane są przy pomocy symbolu pytajnika.
        Obecny tryb: ${ hidden ? 'Ukryty' : 'Widoczny' }`">
        Tryb: {{ hidden ? 'Ukryty' : 'Widoczny' }}
      </button>
      <button @click="close()" class="apply-button">Zatwierdź</button>
    </div>
    <span ref="content" class="comment" @click="openPopup()"></span>
  </span>
</template>

<script>

export const allComments = { };

export default {
  props: ["node", "updateAttrs", "view"],
  computed: {
    id: {
      get() {
        return this.node.attrs.id;
      }
    }
  },
  data() {
    return {
      showEditor: false,
      commentText: "",
      hidden: false
    }
  },
  methods: {
    openPopup() {
      if (allComments[this.id].displayedInComponent === null || !document.body.contains(allComments[this.id].displayedInComponent.$el)) {
        allComments[this.id].displayedInComponent = this;
        this.commentText = allComments[this.id].text;
        this.hidden = allComments[this.id].hidden;
        this.showEditor = true;
        this.$nextTick(() => this.$refs.commentEditor.focus());
      }
    },
    close() {
      this.showEditor = false; 
      allComments[this.id].displayedInComponent = null;
      allComments[this.id].text = this.commentText;
      allComments[this.id].hidden = this.hidden;
    }
  },
  beforeMount() {
    if (!allComments[this.id])
      allComments[this.id] = { text: '', hidden: false, displayedInComponent: null };
  },
  mounted() {
    if (allComments[this.id].text === '')
      this.openPopup();
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
