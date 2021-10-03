<template>
  <div class="area" :style="{
    left: (x + 0.5) + 'px', 
    top: (y + 2) + 'px', 
    background: fillColor,
    color: textColor,
    outline: focused ? '3px dotted #cccccc' : 'none',
    border: `4px solid ${borderColor}`,
    width: width + 'px', 
    height: height + 'px',
   }">
    <div class="align-wrapper" :style="{
      'vertical-align': align
    }">
      <div ref="content" class="content"></div>
    </div>
    <div class="top border-overlay"></div>
    <div class="bottom border-overlay"></div>
    <div class="left border-overlay"></div>
    <div class="right border-overlay"></div>
  </div>
</template>

<script>
export default {
  props: ["node", "updateAttrs", "view", "getPos"],
  data() {
    return {
      focused: false
    }
  },
  computed: {
    x: {
      get() { return this.node.attrs.x; },
      set(x) { this.updateAttrs({ x }); }
    },
    y: {
      get() { return this.node.attrs.y; },
      set(y) { this.updateAttrs({ y }); }
    },
    width: {
      get() { return this.node.attrs.width; },
      set(width) { this.updateAttrs({ width }); }
    },
    height: {
      get() { return this.node.attrs.height; },
      set(height) { this.updateAttrs({ height }); }
    },
    borderColor: {
      get() { return this.node.attrs.borderColor; },
      set(borderColor) { this.updateAttrs({ borderColor }); }
    },
    textColor: {
      get() { return this.node.attrs.textColor; },
      set(textColor) { this.updateAttrs({ textColor }); }
    },
    fillColor: {
      get() { return this.node.attrs.fillColor; },
      set(fillColor) { this.updateAttrs({ fillColor }); }
    },
    align: {
      get() { return this.node.attrs.align; },
      set(align) { this.updateAttrs({ align }); }
    },
  },
  methods: {
    setFocus(value) {
      this.focused = value;
    },
  }
};
</script>

<style scoped lang="scss">
@import "@/style/global";
.area {
  position: absolute;
  cursor: move;
  box-sizing: border-box;
  display: table;

  .content {
    box-sizing: border-box;
    padding: 5px;
    outline: none;
  }

  .align-wrapper {
    display: table-cell;
  }

  .border-overlay {
    position: absolute;
  }
  .top {
    left: 0;
    top: -6px;
    width: 100%;
    height: 4px;
    cursor: ns-resize;
  }
  .bottom {
    left: 0;
    bottom: -6px;
    width: 100%;
    height: 4px;
    cursor: ns-resize;
  }
  .left {
    top: 0;
    left: -6px;
    height: 100%;
    width: 4px;
    cursor: ew-resize;
  }
  .right {
    top: 0;
    right: -6px;
    height: 100%;
    width: 4px;
    cursor: ew-resize;
  }
}
</style>
<style lang="scss">
.area p {
  margin: 0;
}
</style>
