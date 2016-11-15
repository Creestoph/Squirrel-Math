var comment;
var background_default;
var windows = [];
var window_position = 0;

$(document).ready(function(){
	comment = document.getElementsByClassName("comment");
	for (var i = 0; i<comment.length; i++)
	{
		comment[i].addEventListener("mouseover", display);
		comment[i].addEventListener("mouseout", hide);

		var win = document.createElement("div");
		win.className = "comment_window";
		win.style.visibility = "hidden";
		win.innerHTML = comment[i].id;
		win.id = "comment: " + comment[i].id;

		document.body.appendChild(win);

		windows[window_position] = win;
		window_position++;
	}
});

function display(event)
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
    
}

function hide()
{
    this.style.background = background_default;
    for (var i = 0; i < windows.length; i++)
        if (windows[i].id.indexOf(this.id) > -1) {
            windows[i].style.visibility = "hidden";
        }
}