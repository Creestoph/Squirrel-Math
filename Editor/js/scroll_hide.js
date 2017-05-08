var animate = 1;
function scrollHide() {

    if (animate === 1) {
        var dmask = $(this).parent().find(".chapter_mask");
        var d = $(this).parent().find(".chapter_body");
        var classList = dmask.attr('class').split(' ');

        animate = 0;
        if (d.hasClass("is_hidden")) {
            dmask.css('overflow','hidden');
            d.addClass("is_not_hidden");
            d.removeClass("is_hidden");

            for (var i = 0; i < classList.length; i++) {
                if (classList[i].includes("height")) {
                    var dh = parseInt(classList[i].replace("height", ""));
                }
            }
            var dr = $(this).parent().find(".chapter_mask");
            d.animate({top: "+=" + dh}, 1100, "swing", function () {
                animate = 1;
                dmask.removeAttr('style');
                d.removeAttr('style');
            });
            dr.animate({height: "+=" + dh}, 1100, "swing", function () {
                animate = 1;
                dmask.removeAttr('style');
                d.removeAttr('style');
            });


        }
        else {
            d.addClass("is_hidden");
            d.removeClass("is_not_hidden");
            for (var i = 0; i < classList.length; i++) {
                if (classList[i].includes("height")) {
                    dmask.removeClass(classList[i]);
                }
            }
            var h = dmask.height() + 15; //temporary workaround
            dmask.addClass("height" + h);

            var dr = $(this).parent().find(".chapter_mask");
            var dh = -h;
            d.animate({top: "+=" + dh}, 1100, "swing", function () {
                animate = 1;
                dmask.css('overflow','hidden');
            });
            dr.animate({height: "+=" + dh}, 1100, "swing", function () {
                animate = 1;
                dmask.css('overflow','hidden');
            });
        }
    }
}