<template>
  <span class="comment" @mouseover="popup = true" @mouseout="popup = false">
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
  static allComments: { [id: string]: { text: string } } = {};
  
  popup: boolean = false;
  @Prop() text?: string;
  @Prop() attrs?: { id: string };

  commentText? = "";
  mounted() {
    if (this.attrs && this.attrs.id)
      this.commentText = Comment.allComments[this.attrs.id].text;
    else
      this.commentText = this.text;
  }
}
</script>

<style scoped lang="scss">
@import "@/style/global";

.comment:hover {
  background: #e9e9e9;
}

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
</style>