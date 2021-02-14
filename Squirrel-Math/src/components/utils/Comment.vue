<template>
  <span class="comment" @mouseover="popup = true" @mouseout="popup = false">
    <tooltip class="comment-window" :visible="popup" timeout="0" :offset="{x: 15, y: -55}">{{ text }}</tooltip>
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
  popup: boolean = false;
  @Prop() text!: string;
}
</script>

<style scoped lang="scss">
@import "@/style/global";

.comment:hover {
  background: #e9e9e9;
}
.comment-window
{
  background: #FEFEFE;
  padding: 6px;
	border-right: 1px solid black;
	border-bottom: 1px solid black;
	font-family: $main-font;
	font-size: 15px;
  line-height: 1em;
  box-shadow: inset 0px -15px 15px -5px rgba(0, 0, 0, 0.15);
  z-index: 10000;
  pointer-events: none;
}
</style>