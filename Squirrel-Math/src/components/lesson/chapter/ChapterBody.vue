<template>
  <div class="chapter_mask" ref="chapter_mask">
    <div class="chapter_body" ref="chapter_body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
let animate = true;

export default {
  name: "ChapterBody",
  props: ["trigger"],
  mounted() {
    const obj = this;
    this.trigger.call = function() {
      if (animate == 1) {
        var dmask = $(obj.$refs.chapter_mask);
        var d = $(obj.$refs.chapter_body);
        var classList = dmask.attr("class").split(" ");

        animate = 0;
        if (d.hasClass("hidden")) {
          d.addClass("not_hidden");
          d.removeClass("hidden");

          for (var i = 0; i < classList.length; i++) {
            if (classList[i].includes("height"))
              var dh = parseInt(classList[i].replace("height", ""));
          }
          d.animate({ top: "+=" + dh }, 1100, "swing", function() {
            animate = 1;
          });
          dmask.animate({ height: "+=" + dh }, 1100, "swing", function() {
            animate = 1;
          });
        } else {
          d.addClass("hidden");
          d.removeClass("not_hidden");
          var toadd = true;
          for (var i = 0; i < classList.length; i++) {
            if (classList[i].includes("height")) toadd = false;
          }
          if (toadd) dmask.addClass("height" + dmask.height());

          var dh = -dmask.height();
          d.animate({ top: "+=" + dh }, 1100, "swing", function() {
            animate = 1;
          });
          dmask.animate({ height: "+=" + dh }, 1100, "swing", function() {
            animate = 1;
          });
        }
      }
    };
  }
};
</script>

<style scoped>
.chapter_body {
  position: relative;
  border: 0px solid black;
  margin-bottom: 90px;
  margin-top: 0px;
  padding: 0 25px;
  box-shadow: inset 0 0 0 0 rgba(0, 0, 0, 0.3);
}

.chapter_body > *:first-child {
  margin-top: 0;
}

.chapter_mask {
  overflow: hidden;
  position: relative;
  border: 0px solid black;
  margin: 0;
  margin-bottom: 0px;
  margin-top: 0px;
  padding: 0px;
  box-shadow: inset 0 0 0 0 rgba(0, 0, 0, 0.3);
}
</style>
