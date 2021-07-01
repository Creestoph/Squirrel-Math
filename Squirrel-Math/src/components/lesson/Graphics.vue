<template>
    <img :src="src" :alt="attrs.name" :title="attrs.name">
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';

@Component
export default class Graphics extends Vue { 
    static lessonImages: { [key: string]: { src: string } } = {};

    @Prop() attrs?: any;
    src: string = '';

    mounted() {
      const scopedImage = Graphics.lessonImages[this.attrs.key];
      this.src = scopedImage ? scopedImage.src : require(`@/assets/global-images/${this.attrs.key}`)
    }
}
</script>

<style scoped lang="scss">
img {
  display: block;
  margin: 20px auto;
  max-width: 100%;
}
</style>
<style lang="scss">
table img {
  margin: 0 !important;
}
</style>
