/**
 * Created by InvincibleWombat on 14.05.2017.
 */
class ShapeAdjustment extends HTMLElement{

    selectedElement = 0;
    elementX = 0;
    elementY = 0;
    mouseX = 0;
    mouseY = 0;
    elementMatrix = 0;
    svgCanv = 0;
    drags;

    static selectElement(evt) {
        if (document.selection) {
            document.selection.empty();
        } else if (window.getSelection) {
            window.getSelection().removeAllRanges();
        }
        if (leftMousePressed(evt)) {
            this.selectedElement = evt.target;
            this.svgCanv = this.selectedElement.parentElement;
            this.elementX = (this.selectedElement.getBoundingClientRect().left + selectedElement.getBoundingClientRect().right) / 2
            this.elementY = (selectedElement.getBoundingClientRect().top + selectedElement.getBoundingClientRect().bottom) / 2;
            this.mouseX = evt.clientX;
            this.mouseY = evt.clientY;
            this.elementMatrix = selectedElement.getAttributeNS(null, "transform").slice(7, -1).split(' ');
            for (var i = 0; i < this.elementMatrix.length; i++) {
                this.elementMatrix[i] = parseFloat(elementMatrix[i]);
            }
            svgCanv.setAttributeNS(null, "onmousemove", "moveElement(evt)");
            svgCanv.setAttributeNS(null, "onmouseup", "deselectElement(evt)");
            svgCanv.setAttributeNS(null, "onmouseleave", "deselectElement(evt)");
            window.onkeydown = deselectElement;
            svgCanv.setAttributeNS(null, "onscroll", "deselectElement(evt)");
            svgCanv.setAttributeNS(null, "onmousedown", "deselectElementNotLeft(evt)");
            selectedElement.setAttributeNS(null, "onmouseup", "deselectElement(evt)");
        }
        else {
            var element = evt.target;

        }

    }

    function

    deselectElementNotLeft(evt) {
        if (!leftMousePressed(evt)) {
            deselectElement(evt);
        }
    }

    function

    moveElement(evt) {
        dx = evt.clientX - mouseX;
        dy = evt.clientY - mouseY;
        elementMatrix[4] += dx;
        elementMatrix[5] += dy;
        newMatrix = "matrix(" + elementMatrix.join(' ') + ")";

        selectedElement.setAttributeNS(null, "transform", newMatrix);
        mouseX = evt.clientX;
        mouseY = evt.clientY;
    }

    function

    deselectElement(evt) {
        if (selectedElement !== 0) {
            selectedElement.removeAttributeNS(null, "onmouseup");
            selectedElement = 0;
        }
    }
}

