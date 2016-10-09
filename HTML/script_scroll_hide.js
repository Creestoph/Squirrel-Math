$(document).ready(function(){
	$(".chapter_name").on("click", function(){
		var dmask = $(this).parent().find(".chapter_mask");
        var d = $(this).parent().find(".chapter_body");
		var classList = dmask.attr('class').split(' ');
		
		if (d.hasClass("hidden"))
		{
			d.addClass("not_hidden");
			d.removeClass("hidden");
			
			for (var i = 0; i < classList.length; i++)
			{
				if (classList[i].includes("height")) var dh = parseInt(classList[i].replace("height",""));	
			}
			d.animate({top: "+=" + dh, easing: "linear"}, 1100);
            var dr = $(this).parent().find(".chapter_mask");
			dr.animate({height: "+=" + dh, easing: "linear"}, 1100);
			
			
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
			
			var dh =  -dmask.height();
			d.animate({top: "+=" + dh, easing: "linear"}, 1100);
            var dr = $(this).parent().find(".chapter_mask");
			dr.animate({height: "+=" + dh, easing: "linear"}, 1100);
	
		}
	});        
});