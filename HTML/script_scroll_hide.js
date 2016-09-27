$(document).ready(function(){
	$(".chapter_name").on("click", function(){
        var d = $(this).parent().find(".chapter_body");
		if (d.hasClass("scroll_hide"))
		{
			d.removeClass("scroll_hide");
			d.addClass("scroll_show");
			var dh =  +d.height();
			d.animate({top: "+=" + dh, easing: "linear"}, 3600);

			var should_animate = 0;
			$(".chapter").each(function(i){
				if (should_animate == 1)
				{
					 $(this).animate({top: "+=" + dh, easing: "linear"}, 3600);
				}
				if ($(this)[0] === d.parent()[0])
				{
					 should_animate = 1;
				}
		   });	
			
		}
		else
		{
			d.removeClass("scroll_show");
			d.addClass("scroll_hide");
			var dh =  -d.height();
			d.animate({top: "+=" + dh, easing: "linear"}, 3600);

			var should_animate = 0;
			$(".chapter").each(function(i){
				if (should_animate == 1)
				{
					 $(this).animate({top: "+=" + dh, easing: "linear"}, 3600);
				}
				if ($(this)[0] === d.parent()[0])
				{
					 should_animate = 1;
				}
		   });			
		}
	});        
});