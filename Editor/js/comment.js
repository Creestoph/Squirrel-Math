

$(document).ready(function(){
    var comments;
    var background_default;
    var windows = [];
    var window_position = 0;
	comments = document.getElementsByClassName("comment");
	for (var i = 0; i<comments.length; i++)
	{
		comments[i].addEventListener("mouseover",
            function (event)
            {
                background_default = this.style.background;
                this.style.background = "#EEEEEE";

                for (var i = 0; i < windows.length; i++)
                    if (windows[i].id.indexOf(this.id) > -1)
                    {
                        windows[i].style.top = (event.pageY - 50);
                        windows[i].style.left = event.pageX + 15;
                        windows[i].style.visibility = "visible";
                    }

            });
		comments[i].addEventListener("mouseout",
            function ()
            {
                this.style.background = background_default;
                for (var i = 0; i < windows.length; i++)
                    if (windows[i].id.indexOf(this.id) > -1) {
                        windows[i].style.visibility = "hidden";
                    }
            });

		var win = document.createElement("div");
		win.className = "comment_window";
		win.style.visibility = "hidden";
		win.innerHTML = comments[i].id;
		win.id = "comments: " + comments[i].id;

		document.body.appendChild(win);

		windows[window_position] = win;
		window_position++;
	}
});
