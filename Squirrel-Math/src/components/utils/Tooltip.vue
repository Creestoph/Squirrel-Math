<template>
  <transition
    name="fade"
    v-if="visible"
  >
    <div
      class="sm-tooltip"
      v-if="privVisible"
      :style="{top: mousePos.y + 'px', left:mousePos.x + 'px'}"
    >
      <slot />
    </div>
  </transition>
</template>

<script>
export default {
  name: "Tooltip",
  props: ["offset", "timeout", "visible"],
  data() {
    return {
      mousePos: { x: 0, y: 0 },
      privVisible: false,
      currentTimeout: null
    };
  },
  methods: {
    onMouseOver(event) {
      this.mousePos = {
        x: Math.floor(event.clientX + this.offset.x),
        y: Math.floor(event.clientY + this.offset.y)
      };
    }
  },
  watch: {
    visible(val){
      if (val){
        this.currentTimeout = setTimeout(() => {
          this.privVisible = this.visible
        }, this.timeout)
      }
      else {
        clearTimeout(this.currentTimeout)
        this.privVisible = false
      }
    }
  },
  mounted() {
    window.addEventListener("mousemove", this.onMouseOver);
  },
  destroyed() {
    window.removeEventListener("mousemove", this.onMouseOver);
  }
};
</script>

<style scoped lang="scss">
.sm-tooltip {
  position: fixed;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .25s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
