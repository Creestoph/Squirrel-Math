$(document).ready(function(){
    var comments;
    var question_marks = [];
    var windows = [];
    var window_position = 0;
    var background_default;
    comments = document.getElementsByClassName("comment_visible");
    for (var i = 0; i<comments.length; i++)
    {
        question_marks[i] = document.createElement("div");
        question_marks[i].className = "comment_visible_question_mark";
        question_marks[i].innerHTML = "?"
        question_marks[i].style.position = 'absolute';
        question_marks[i].style.left = 0;
        question_marks[i].id =comments[i].id;


        var top = 0;
        var element = comments[i];
        do {
            top += element.offsetTop  || 0;
            element = element.offsetParent;
        } while(element.className == "chapter_body");

        question_marks[i].style.top =top-10;
        question_marks[i].style.visibility = "visible";
        question_marks[i].addEventListener("mouseover",
            function (event)
            {
                for (var i = 0; i < windows.length; i++)
                    if (windows[i].id.indexOf(this.id) > -1)
                    {
                        windows[i].style.visibility = "visible";
                    }
                for (var i = 0; i < comments.length; i++)
                    if (comments[i].id.indexOf(this.id) > -1)
                    {
                        background_default = comments[i].style.background;
                        comments[i].style.background = "#EEEEEE";
                    }

            });
        question_marks[i].addEventListener("mouseout",
            function ()
            {
                for (var i = 0; i < windows.length; i++)
                    if (windows[i].id.indexOf(this.id) > -1) {
                        windows[i].style.visibility = "hidden";
                    }
                for (var i = 0; i < comments.length; i++)
                    if (comments[i].id.indexOf(this.id) > -1)
                    {
                        comments[i].style.background = background_default;
                    }
            });

        element.appendChild(question_marks[i]);

        var win = document.createElement("div");
        win.className = "comment_visible_window";
        win.style.visibility = "hidden";
        win.innerHTML = comments[i].id;
        win.id = "comments_visible: " + comments[i].id;
        win.style.top = question_marks[i].style.top;
        win.style.left = 20;

        element.appendChild(win);
        windows[window_position] = win;
        window_position++;

    }
});
