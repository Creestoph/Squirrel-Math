//variables
var chapter_name_string = 'Nazwa rozdziału';
var chapter_content_string = 'Treść rozdziału';
//------------


function newChapter() {
    var chapter = document.createElement('div');
    chapter.className += 'chapter';
    var chapter_name = document.createElement('div');
    chapter_name.className += 'chapter_name';
    chapter_name.innerHTML = chapter_name_string;
    chapter_name.onclick = scrollHide;
    chapter_name.contentEditable = true;
    chapter.appendChild(chapter_name);
    var chapter_hr = document.createElement('hr');
    chapter.appendChild(chapter_hr);
    var chapter_mask = document.createElement('div');
    chapter_mask.className += 'chapter_mask';
    chapter.appendChild(chapter_mask);
    var chapter_body = document.createElement('div');
    chapter_body.className += 'chapter_body';
    chapter_mask.appendChild(chapter_body);
    var chapter_paragraph = document.createElement('p');
    chapter_paragraph.contentEditable = 'true';
    chapter_paragraph.innerHTML = chapter_content_string;
    chapter_body.appendChild(chapter_paragraph);


    return chapter;

}

function addChapter() {
    document.getElementsByClassName('main')[0].appendChild(newChapter());
}