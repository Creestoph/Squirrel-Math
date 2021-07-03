<template>
  <span class="comment" @mouseover="popup = true" @mouseout="popup = false" :style="{ background: popup ? '#e9e9e9' : ''}">
    <icon @mouseover="popup = true" @mouseout="popup = false" v-if="visible" class='question-mark' :style="{ color: popup ? '#aa0000' : ''}">help</icon>
    <tooltip class="comment-window no-selection" :visible="popup" timeout="0" :offset="{x: 15, y: -55}">{{ commentText }}</tooltip>
    <slot />
  </span>
</template>

<script lang="ts">
import Tooltip from "@/components/utils/Tooltip.vue"
import { Prop, Component } from "vue-property-decorator";
import Vue from "vue";

@Component({
  components: {
    Tooltip
  }
})
export default class Comment extends Vue {
  static allComments: { [id: string]: { text: string, hidden: boolean } } = {};
  
  popup: boolean = false;
  @Prop() text?: string;
  @Prop({ default: true }) hidden?: string;
  @Prop() attrs?: { id: string };

  commentText? = "";
  visible? = false;

  mounted() {
    if (this.attrs && this.attrs.id) {
      this.commentText = Comment.allComments[this.attrs.id].text;
      this.visible = !Comment.allComments[this.attrs.id].hidden;
    }
    else {
      this.commentText = this.text;
      this.visible = !this.hidden;
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/style/global";

// .comment:hover {
//   background: #e9e9e9;
// }

.comment-window {
  background: rgba(0, 0, 0, 0.4);
  color: $light-gray;
  backdrop-filter: blur(7px);
  color: white;
  padding: 6px;
	font-family: $main-font;
	font-size: 0.9em;
  font-weight: normal;
  font-style: normal;
  text-decoration: none;
  line-height: 1em;
  z-index: 10000;
  pointer-events: none;
}

.question-mark {
  display: inline-block;
  position: absolute;
  left: -50px;
  color: $darker-main-red;
  font-family: $geometric-font;
  font-size: 1.3em;
}
</style>