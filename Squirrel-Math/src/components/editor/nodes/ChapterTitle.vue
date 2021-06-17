<template>
  <div class="chapter_name">
    <div ref="content"></div>
    <div class="hidden-button" :class="{'hidden': isHidden}" @click="isHidden = !isHidden" :title="isHidden ? 'Rozdział będzie domyślnie zwinięty. Kliknij by był domyślnie rozwinięty.' : 'Rozdział będzie domyślnie rozwinięty. Kliknij by był domyślnie zwinięty.'">
      <span class="material-icons">visibility_off</span>
    </div>
    <hr>
  </div>  
</template>

<script>
export default {
  props: ["node", "updateAttrs", "view"],
  computed: {
    isHidden: {
      get() {
        return this.node.attrs.isHidden;
      },
      set(isHidden) {
        this.updateAttrs({ isHidden });
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/style/global";
.hidden-button {
  display: none;
  position: absolute;
  left: -50px;
  padding-right: 20px;
  top: -10px;
  cursor: pointer !important;

  color: $gray;
  &.hidden {
    color: black;
    display: inline-block;
  }

  span {
    font-size: 1.2em;
  }

  .chapter_name:hover &, &:hover {
    display: inline-block;
  }
}
</style>
