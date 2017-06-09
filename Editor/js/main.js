//variables
var chapter_name_string = 'Nazwa rozdziału';
var chapter_content_string = 'Treść rozdziału';
var example_content_string = 'Treść przykładu';
var proof_content_string = 'Treść dowodu';
var proof_header_string = 'Dowód';

var focused_canvas;
//------------


Element.prototype.insertChildAtIndex = function (child, index) {
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

function newExample() {
    var example = document.createElement('div');
    example.className += 'example';

    var example_paragraphh = document.createElement('p');
    example_paragraphh.contentEditable = 'true';
    example_paragraphh.innerHTML = example_content_string;
    example.appendChild(example_paragraphh);

    return example;
}

function newProofHeader() {
    var header = document.createElement('p');
    header.innerHTML = proof_header_string;
    header.className += 'type';
    return header;
}

function newProof() {
    var proof = document.createElement('div');
    proof.className += 'proof';

    var proof_paragraph = document.createElement('p');
    proof_paragraph.contentEditable = 'true';
    proof_paragraph.innerHTML = proof_content_string;
    proof.appendChild(proof_paragraph);

    return proof;
}

function newParagraph() {
    var paragraph = document.createElement('p');
    paragraph.contentEditable = 'true';
    return paragraph;
}

function newUList() {
    var ulist = document.createElement('ul');
    var list_element = document.createElement('li');
    list_element.innerHTML = '';
    list_element.contentEditable = 'true';
    ulist.appendChild(list_element);
    return ulist;
}

function newOList() {
    var ulist = document.createElement('ol');
    var list_element = document.createElement('li');
    list_element.contentEditable = 'true';
    ulist.appendChild(list_element);
    return ulist;
}

function newTable(w, h) {
    var table = document.createElement('table');
    for (var i = 0; i < h; i++) {
        var row = table.insertRow();
        for (var j = 0; j < w; j++) {
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

function newCanvas(w, h) {
    var p = document.createElement('p');
    var canvas = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    canvas.setAttribute('width', '300');
    canvas.setAttribute('height', '300');
    canvas.setAttribute('tabindex', '-1');
    canvas.onmousedown = focusCanvas;
    canvas.onblur = blurCanvas;
    //canvas.onmousemove = setCursor;
    p.setAttribute('align', 'center');
    p.appendChild(canvas);
    return p;
}

function focusCanvas() {
    document.getElementById("canvas_editor").style.display = "block";
    focused_canvas = this;
}

function blurCanvas() {
    //document.getElementById("canvas_editor").style.display = "none";
}

function addShape(shape) {
    switch (shape) {
        case 'triangle':
            // var tri = document.createElementNS("http://www.w3.org/2000/svg", 'polygon');
            // tri.setAttribute('points', "10,10 10,50 20,20");
            // tri.setAttribute('style', "fill:lime;stroke:purple;stroke-width:1");
            // tri.setAttribute("transform", "matrix(1 0 0 1 0 0)");
            // tri.onmousedown = selectElement;
            // focused_canvas.appendChild(tri);
            new TriangleCanvas(focused_canvas.getCanvas(), 0);
            break;

        case 'circle':
            new CircleCanvas(focused_canvas.getCanvas(), 0);
            break;

        case 'rectangle':
            new RectangleCanvas(focused_canvas.getCanvas(), 0);
            break;

        case 'polygon':
            new PolygonCanvas(focused_canvas.getCanvas(), 0);
            break;
    }
    //turn on menu
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

function insertOnActiveIndex(obj, offset=0) {
    var node = getSelectionStart();
    var parent = node.parentNode;
    var children = parent.childNodes;
    var index;
    for (var i = 0; i < children.length; i++) {
        if (children[i].isSameNode(node)) {
            index = i;
            break;
        }
    }
    parent.insertChildAtIndex(obj, index+offset);

}

function focusNode(n)
{
    var range = document.createRange();
    var sel = window.getSelection();
    range.setStart(n, 0);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
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
        rangeNodes.push(node = nextNode(node));
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
    insertOnActiveIndex(newTable(2, 2));
}

function addChapter() {
    insertOnActiveIndex(newChapter());
}

function addExample() {
    insertOnActiveIndex(newExample());
}

function addProof() {
    insertOnActiveIndex(newProofHeader());
    insertOnActiveIndex(newProof(), 1);
}

function addParagraph() {
    var paragraph = newParagraph();
    insertOnActiveIndex(paragraph, 1);

    paragraph.onkeydown = function (e) {
        e.stopPropagation();
        if (e.keyCode === 13) {
            addParagraph();
            return false;
        }
    };
    focusNode(paragraph);
}

function unorderedList() {
    var ulist = newUList();
    insertOnActiveIndex(ulist);
    focusNode(ulist.firstChild);
}

function orderedList() {
    var olist = newOList();
    insertOnActiveIndex(olist);
    focusNode(olist.firstChild);
}

function alignLeft() {
    var nodes = getRangeSelectedNodes(document.getSelection().getRangeAt(0))
    for (var i = 0; i < nodes.length; i++)
        nodes[i].parentNode.setAttribute('align', 'left');
}

function alignRight() {
    var nodes = getRangeSelectedNodes(document.getSelection().getRangeAt(0))
    for (var i = 0; i < nodes.length; i++)
        nodes[i].parentNode.setAttribute('align', 'right');
}

function alignCenter() {
    var nodes = getRangeSelectedNodes(document.getSelection().getRangeAt(0))
    for (var i = 0; i < nodes.length; i++)
        nodes[i].parentNode.setAttribute('align', 'center');

}

function addCanvas() {
    var node = getSelectionStart();
    var parent = node.parentNode;
    var children = parent.childNodes;
    var index;
    for (var i = 0; i < children.length; i++) {
        if (children[i].isSameNode(node)) {
            index = i;
            break;
        }
    }
    focused_canvas = new Canvas(parent, index);
    focused_canvas.element.addEventListener('click', function () {
        document.getElementById("canvas_editor").style.display = "block";
    });
}

$('p[contenteditable]').keydown(function(e) {
    if (e.keyCode === 13) {
        addParagraph();
        return false;
    }
});