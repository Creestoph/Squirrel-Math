/**
 * Created by InvincibleWombat on 17.05.2017.
 */
/**
 * Created by InvincibleWombat on 14.05.2017.
 */
class MovingShape extends HTMLElement{

    // elementShape = 0;
    // elementX = 0;
    // elementY = 0;
    // mouseX = 0;
    // mouseY = 0;
    // elementMatrix = 0;
    // parentCanvas = 0;

    constructor(parent_div, index) {
        super(parent_div, index);
    }

    static select(evt, object) {
        if (document.selection) {
            document.selection.empty();
        } else if (window.getSelection) {
            window.getSelection().removeAllRanges();
        }
        if (leftMousePressed(evt)) {
            object.elementX = (object.element.getBoundingClientRect().left + object.element.getBoundingClientRect().right) / 2
            object.elementY = (object.element.getBoundingClientRect().top + object.element.getBoundingClientRect().bottom) / 2;
            object.mouseX = evt.clientX;
            object.mouseY = evt.clientY;
            object.elementMatrix = object.element.getAttributeNS(null, "transform").slice(7, -1).split(' ');
            for (var i = 0; i < object.elementMatrix.length; i++) {
                object.elementMatrix[i] = parseFloat(object.elementMatrix[i]);
            }
            const pa = object.parent.onmousemove;
            const pb = object.parent.onmouseup;
            const pc = object.parent.onmouseout;


            object.parent.onmouseup = function(evt){
                evt.stopPropagation();
                MovingShape.deselect(evt, object);
                object.parent.onmousemove = pa;
                object.parent.onmouseup = pb;
                object.parent.onmouseout = pc;
            };
            object.parent.onmouseout = function (evt){
                evt.stopPropagation();
                MovingShape.deselect(evt, object);
                object.parent.onmousemove = pa;
                object.parent.onmouseup = pb;
                object.parent.onmouseout = pc;
            };
            object.parent.addEventListener("scroll", function (evt) {
                evt.stopPropagation();
                MovingShape.deselect(evt, object);
                object.parent.onmousemove = pa;
                object.parent.onmouseup = pb;
                object.parent.onmouseout = pc;
            });
            object.element.onmouseup = function(evt){
                evt.stopPropagation();
                MovingShape.deselect(evt, object);
                object.parent.onmousemove = pa;
                object.parent.onmouseup = pb;
                object.parent.onmouseout = pc;
            };
            window.onkeydown = function(evt){
                MovingShape.deselect(evt, object);
            };
            object.parent.onmousemove = function(evt){
                MovingShape.move(evt, object);
            };
        }
    }

    static deselectNotLeft(evt, object) {
        if (!leftMousePressed(evt)) {
            MovingShape.deselect(evt, object);
        }
    }

    static move(evt, object) {
        let dx = evt.clientX - object.mouseX;
        let dy = evt.clientY - object.mouseY;
        object.elementMatrix[4] += dx;
        object.elementMatrix[5] += dy;
        let newMatrix = "matrix(" + object.elementMatrix.join(' ') + ")";

        object.element.setAttributeNS(null, "transform", newMatrix);
        object.mouseX = evt.clientX;
        object.mouseY = evt.clientY;
    }

    static deselect(evt, object) {
        if (object.element !== 0) {
            object.parent.onmousemove = null;
            object.parent.onmouseup = null;
            object.parent.onmouseout = null;
            object.element.onmouseup = null;
            window.onkeydown = null;
        }
    }
}

