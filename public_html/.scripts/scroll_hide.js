var animate = 1;
$(document).ready(function(){
	$(".chapter_name").on("click", function(){
		if (animate == 1)
		{
			var dmask = $(this).parent().find(".chapter_mask");
			var d = $(this).parent().find(".chapter_body");
			var classList = dmask.attr('class').split(' ');
			
			animate = 0;
			if (d.hasClass("hidden"))
			{
				d.addClass("not_hidden");
				d.removeClass("hidden");
				
				for (var i = 0; i < classList.length; i++)
				{
					if (classList[i].includes("height")) var dh = parseInt(classList[i].replace("height",""));	
				}
				var dr = $(this).parent().find(".chapter_mask");
				d.animate({top: "+=" + dh}, 1100, "swing", function () {animate = 1;});
				dr.animate({height: "+=" + dh}, 1100, "swing", function () {animate = 1;});
				
				
			}
			else
			{
				d.addClass("hidden");
				d.removeClass("not_hidden");
				var toadd = true;
				for (var i = 0; i < classList.length; i++)
				{
					if (classList[i].includes("height")) toadd = false;
				}
				if (toadd) dmask.addClass("height" + dmask.height());
				
				var dr = $(this).parent().find(".chapter_mask");
				var dh =  -dmask.height();
				d.animate({top: "+=" + dh}, 1100, "swing", function () {animate = 1;});
				dr.animate({height: "+=" + dh}, 1100, "swing", function () {animate = 1;});
			}
		}	
	});  
});