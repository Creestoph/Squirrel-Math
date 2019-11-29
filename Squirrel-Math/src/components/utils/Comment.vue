<template>
  <span class="comment" @mouseover="popup = true" @mouseout="popup = false">
    <tooltip class="comment-window" :visible="popup" timeout="0" :offset="{x: 15, y: -55}">{{ text }}</tooltip>
    <slot />
  </span>
</template>

<script>
import Tooltip from "./Tooltip"

export default {
  name: "Comment",
  props: ["text"],
  data() {
    return {
      popup: false,
    };
  },
  components: {
    Tooltip
  }
};
</script>

<style scoped lang="scss">
.comment:hover {
  background: #eeeeee;
}
.comment-window
{
  background: #FEFEFE;
  padding: 6px;
	border-right: 1px solid black;
	border-bottom: 1px solid black;
	font-family: calibri light;
	font-size: 15px;
  line-height: 1em;
  box-shadow: inset 0px -15px 15px -5px rgba(0, 0, 0, 0.15);
  z-index: 10000;
  pointer-events: none;
}
</style>