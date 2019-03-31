<template>
  <span class="comment" @mouseover="onMouseOver($event)" @mouseout="popup = false">
    <div class="comment_window" v-if="popup" :style="{top: mousePos.y + 'px', left:mousePos.x + 'px'}">tetstst</div>
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: "Comment",
  props: ["text"],
  data() {
    return {
      popup: false,
      mousePos: { x: 0, y: 0 }
    };
  },
  methods: {
    onMouseOver(event) {
      this.popup = true;
      this.mousePos = {
        x: event.offsetX + 15,
        y: event.offsetY - 25
      };
    }
  }
};
</script>

<style scoped lang="scss">
.comment:hover {
  background: #eeeeee;
}
.comment_window
{
	position: absolute;
    background: #FEFEFE;
    padding: 6px;
	border-right: 1px solid black;
	border-bottom: 1px solid black;
	font-family: calibri light;
	font-size: 15px;
    box-shadow: inset 0px -15px 15px -5px rgba(0, 0, 0, 0.15);
}
</style>
