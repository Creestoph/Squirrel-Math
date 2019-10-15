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
    $("[class *= optional]").click(event => {
      if ($(event.target).hasClass('optional-show'))
      {
        $($(event.target).nextAll('div')[0]).slideUp(1000, () => {
          $(event.target).removeClass('optional-show'); 
          $(event.target).addClass('optional-hide');
        });
      }
      else
      {
        $($(event.target).nextAll('div')[0]).slideDown(1000, () => {
          $(event.target).removeClass('optional-hide');
          $(event.target).addClass('optional-show');
        });
      }
    })

    $(".optional-hide").each(function() {
      $($(this).nextAll('div')[0]).slideUp(0);
    });
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
          d.animate({ top: 0 }, 1100, "swing", function() {
            animate = 1;
          });
          dmask.animate({ height: "+=" + dh }, 1100, "swing", function() {
            animate = 1;
            dmask.css('overflow', 'visible');
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
            dmask.css('overflow', 'hidden');
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
  margin-bottom: 0px;
  margin-top: 0px;
  padding-bottom: 90px;
  box-shadow: inset 0 0 0 0 rgba(0, 0, 0, 0.3);
}

.chapter_body > *:first-child {
  margin-top: 0;
}

.chapter_mask {
  position: relative;
  border: 0px solid black;
  margin: 0;
  padding: 0;
  box-shadow: inset 0 0 0 0 rgba(0, 0, 0, 0.3);
}
</style>
