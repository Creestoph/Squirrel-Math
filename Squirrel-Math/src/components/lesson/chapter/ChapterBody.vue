<template>
  <div class="chapter-mask" ref="chapterMask">
    <div class="chapter-body" ref="chapterBody">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import $ from "jquery";
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';

@Component
export default class ChapterBody extends Vue {  
  animate: boolean = true;
  maskHeight: number = 0;
  zipped: boolean = false;

  mounted() {
    $("[class *= optional]").click((event: any) => {
      if ($(event.target).hasClass("optional-show")) {
        $($(event.target).nextAll("div")[0]).slideUp(1000, () => {
          $(event.target).removeClass("optional-show");
          $(event.target).addClass("optional-hide");
        });
      } else {
        $($(event.target).nextAll("div")[0]).slideDown(1000, () => {
          $(event.target).removeClass("optional-hide");
          $(event.target).addClass("optional-show");
        });
      }
    });

    $(".optional-hide").each(function() {
      $($(this).nextAll("div")[0]).slideUp(0);
    });
  }
  
  toggleZip() {
    const component = this;

    if (this.animate) {
      this.animate = false;

      let mask: any = $(this.$refs.chapterMask);
      let body: any = $(this.$refs.chapterBody);
      if (this.zipped) {
        body.animate({ top: 0 }, 1100, "swing", () => component.animate = true );
        mask.animate({ height: "+=" + component.maskHeight }, 1100, "swing", () => {
          mask.css("overflow", "visible");
          mask.css("height", "");
        });
      } 
      else {
        this.maskHeight = mask.height();
        body.animate({ top: "+=" + (-component.maskHeight) }, 1100, "swing", () => component.animate = true);
        mask.animate({ height: "+=" + (-component.maskHeight) }, 1100, "swing", () => mask.css("overflow", "hidden"));
      }
      this.zipped = !this.zipped;
    }
  }
}
</script>

<style scoped>
.chapter-body {
  position: relative;
  border: 0px solid black;
  margin-bottom: 0px;
  margin-top: 0px;
  padding-bottom: 70px;
  box-shadow: inset 0 0 0 0 rgba(0, 0, 0, 0.3);
}

.chapter-body > *:first-child {
  margin-top: 0;
}

.chapter-mask {
  position: relative;
  border: 0px solid black;
  margin: 0;
  padding: 0;
  box-shadow: inset 0 0 0 0 rgba(0, 0, 0, 0.3);
}
</style>
