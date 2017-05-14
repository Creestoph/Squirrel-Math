//variables
var chapter_name_string = 'Nazwa rozdziału';
var chapter_content_string = 'Treść rozdziału';

var focused_canvas;
//------------



Element.prototype.insertChildAtIndex = function(child, index) {
    if (!index) index = 0
    if (index >= this.children.length) {
        this.appendChild(child)
    } else {
        this.insertBefore(child, this.children[index])
    }
}

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

function newTable(w, h) {
    var table = document.createElement('table');
    for (var i = 0; i < h; i++) {
        var row = table.insertRow();
        for (var j =0; j < w; j++) {
            var cell = row.insertCell(j);
            cell.style.border = '1px solid black';
            cell.style.width = '50px';
            cell.style.height = '50px';
            var d = document.createElement('div');
            cell.contentEditable = 'true';
            cell.appendChild(d);
        }
    }
    return table;
}

function newCanvas(w,h) {
    var p = document.createElement('p');
    p.setAttribute('align', 'center');
    p.onblur = function () {
        alert('fucus lost');
    }
    p.innerHTML = '<svg width="300" height="300" tabindex="-1" onclick="focused_canvas = this" onblur="focused_canvas = null"></svg>'
    return p;
}

function focusCanvas(canvas) {
    //turn on menu
    focused_canvas = canvas;
}

function blurCanvas() {
    //turn off menu
    focused_canvas = null;
}

function getSelectionStart() {
    var node = document.getSelection().anchorNode;
    return (node.nodeType === 3 ? node.parentNode : node);
}

function nextNode(node) {
    if (node.hasChildNodes()) {
        return node.firstChild;
    } else {
        while (node && !node.nextSibling) {
            node = node.parentNode;
        }
        if (!node) {
            return null;
        }
        return node.nextSibling;
    }
}

function getRangeSelectedNodes(range) {
    var node = range.startContainer;
    var endNode = range.endContainer;

    // Special case for a range that is contained within a single node
    if (node == endNode) {
        return [node];
    }

    // Iterate nodes until we hit the end container
    var rangeNodes = [];
    while (node && node != endNode) {
        rangeNodes.push( node = nextNode(node) );
    }

    // Add partially selected nodes at the start of the range
    node = range.startContainer;
    while (node && node != range.commonAncestorContainer) {
        rangeNodes.unshift(node);
        node = node.parentNode;
    }

    return rangeNodes;
}

function addTable() {

    var node = getSelectionStart();
    var parent = node.parentNode;
    var children = parent.childNodes;
    var index;
    for (var i = 0; i < children.length; i++){
        if (children[i].isSameNode(node)){
            index = i;
            break;
        }
    }
    parent.insertChildAtIndex(newTable(2,2), index);
}


function addChapter() {
    document.getElementsByClassName('main')[0].appendChild(newChapter());
}


function alignLeft() {
    var nodes = getRangeSelectedNodes(document.getSelection().getRangeAt(0))
    for (var i = 0; i < nodes.length; i++)
        nodes[i].parentNode.setAttribute('align', 'left');
}

function alignCenter() {
    var nodes = getRangeSelectedNodes(document.getSelection().getRangeAt(0))
    for (var i = 0; i < nodes.length; i++)
        nodes[i].parentNode.setAttribute('align', 'center');

}

function addCanvas(){
    var node = getSelectionStart();
    var parent = node.parentNode;
    var children = parent.childNodes;
    var index;
    for (var i = 0; i < children.length; i++){
        if (children[i].isSameNode(node)){
            index = i;
            break;
        }
    }
    parent.insertChildAtIndex(newCanvas(300,300), index);


}

