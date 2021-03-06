                   
var selectedElement = 0;
var elementX= 0;
var elementY= 0;
var mouseX = 0;
var mouseY = 0;
var elementMatrix = 0;
var svgCanv = 0;
var drags;


$(document).ready(function(){
	drags = document.getElementsByClassName("draggable");

	for (var i = 0; i < drags.length; i++)
	{
	  drags[i].setAttributeNS(null, "transform", "matrix(1 0 0 1 0 0)")
	  drags[i].setAttributeNS(null, "onmousedown", "selectElement(evt)")
	}
});
function leftMousePressed(e)
{
    e = e || window.event;
    var button = e.which || e.button;
    return button == 1;
}
function selectElement(evt) {
if (leftMousePressed(evt)){
    if ( document.selection ) {
        document.selection.empty();
    } else if ( window.getSelection ) {
        window.getSelection().removeAllRanges();
    }
    selectedElement = evt.target;
    svgCanv = selectedElement.parentElement;
    elementX = (selectedElement.getBoundingClientRect().left + selectedElement.getBoundingClientRect().right)/2
    elementY = (selectedElement.getBoundingClientRect().top + selectedElement.getBoundingClientRect().bottom)/2;
    mouseX = evt.clientX;
    mouseY = evt.clientY;
    elementMatrix = selectedElement.getAttributeNS(null, "transform").slice(7, -1).split(' ');
    for (var i = 0; i < elementMatrix.length; i++) {
      elementMatrix[i] = parseFloat(elementMatrix[i]);
    }
    svgCanv.setAttributeNS(null, "onmousemove", "moveElement(evt)");
    svgCanv.setAttributeNS(null, "onmouseup", "deselectElement(evt)");
    svgCanv.setAttributeNS(null, "onmouseleave", "deselectElement(evt)");
    window.onkeydown=deselectElement;
    svgCanv.setAttributeNS(null, "onscroll", "deselectElement(evt)");
    svgCanv.setAttributeNS(null, "onmousedown", "deselectElementNotLeft(evt)");
    selectedElement.setAttributeNS(null, "onmouseup", "deselectElement(evt)");
  }
 }
 function deselectElementNotLeft(evt){
	if (!leftMousePressed(evt)){
		deselectElement(evt);
	}
 }
  function moveElement(evt) {
    dx = evt.clientX - mouseX;
    dy = evt.clientY - mouseY;
    elementMatrix[4] += dx;
    elementMatrix[5] += dy;
    newMatrix = "matrix(" + elementMatrix.join(' ') + ")";

    selectedElement.setAttributeNS(null, "transform", newMatrix);
    mouseX = evt.clientX;
    mouseY = evt.clientY;
  }

  function deselectElement(evt) {
    if (selectedElement !== 0) {
      selectedElement.removeAttributeNS(null, "onmouseup");
      if ((selectedElement.getBoundingClientRect().left + selectedElement.getBoundingClientRect().right)/2 != elementX ||
             elementY != (selectedElement.getBoundingClientRect().top + selectedElement.getBoundingClientRect().bottom)/2)
        {
    elementMatrix[4] += (elementX - (selectedElement.getBoundingClientRect().left + selectedElement.getBoundingClientRect().right)/2);
    elementMatrix[5] += (elementY - (selectedElement.getBoundingClientRect().top + selectedElement.getBoundingClientRect().bottom)/2);
    newMatrix = "matrix(" + elementMatrix.join(' ') + ")";

    selectedElement.setAttributeNS(null, "transform", newMatrix);
          
        }
      selectedElement = 0;
    }
  }    
