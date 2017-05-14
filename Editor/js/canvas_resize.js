/**
 * Created by InvincibleWombat on 14.05.2017.
 */

var selectedElement = 0;
var mouseX = 0;
var mouseY = 0;

var left;
var right;
var vertical;

var margin = 20;

function leftMousePressed(e) {
    e = e || window.event;
    var button = e.which || e.button;
    return button == 1;
}
function selectElement(evt) {
    if (document.selection) {
        document.selection.empty();
    } else if (window.getSelection) {
        window.getSelection().removeAllRanges();
    }
    if (leftMousePressed(evt)) {
        selectedElement = evt.target;
        mouseX = evt.clientX;
        mouseY = evt.clientY;

        vertical = selectedElement.getBoundingClientRect().bottom - mouseY < margin;
        right = selectedElement.getBoundingClientRect().right - mouseX < margin;
        left = mouseX - selectedElement.getBoundingClientRect().left < margin;

        window.onkeydown = deselectElement;
        selectedElement.setAttributeNS(null, "onmousemove", "moveElement(evt)");
        window.onkeydown = deselectElement;
        selectedElement.setAttributeNS(null, "onmouseup", "deselectElement(evt)");
        selectedElement.setAttributeNS(null, "onmouseleave", "deselectElement(evt)");
    }

}

function setCursor(evt) {

    selectedElement = evt.target;
    mouseX = evt.clientX;
    mouseY = evt.clientY;
    vertical = selectedElement.getBoundingClientRect().bottom - mouseY < margin;
    right = selectedElement.getBoundingClientRect().right - mouseX < margin;
    left = mouseX - selectedElement.getBoundingClientRect().left < margin;

    if (left || right){
        $('html,body').css('cursor','e-resize');
    }
    else if (vertical){
        $('html,body').css('cursor','s-resize');
    }
    else {
        $('html,body').css('cursor','');
    }
}

function deselectElementNotLeft(evt) {
    if (!leftMousePressed(evt)) {
        deselectElement(evt);
    }
}
function moveElement(evt) {
    dx = evt.clientX - mouseX;
    dy = evt.clientY - mouseY;

    var h = parseFloat(selectedElement.getAttribute('height')) + dy;
    var w = parseFloat(selectedElement.getAttribute('width')) + (left ? -1 : 1)*dx * 2;

    if (vertical)selectedElement.setAttribute('height', h.toString());
    if (left || right)selectedElement.setAttribute('width', w.toString());

    mouseX = evt.clientX;
    mouseY = evt.clientY;
}

function deselectElement(evt) {
    if (selectedElement !== 0) {
        selectedElement.removeAttributeNS(null, "onmouseup");
        selectedElement.setAttributeNS(null, "onmousemove", "setCursor(evt)");
        selectedElement = 0;
        $('html,body').css('cursor','');
    }
}

