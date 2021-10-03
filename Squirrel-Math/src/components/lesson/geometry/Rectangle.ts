import paper from "paper";

export interface RectangleAttributes {
  type: 'rectangle',
  center: { x: number, y: number },
  size: { width: number, height: number},
  color: string,
  borderColor: string
}

export default class Rectangle {
  constructor(paperScope: paper.PaperScope, attrs: RectangleAttributes) {
    paperScope.activate();
    let center = new paper.Point(attrs.center.x, attrs.center.y);
    let size = new paper.Size(attrs.size.width, attrs.size.height);
    let rectangle = new paper.Shape.Rectangle(new paper.Rectangle(center.add(new paper.Point(-size.width! / 2, -size.height! / 2)), size));
    rectangle.fillColor = new paper.Color(attrs.color);
    rectangle.strokeColor = new paper.Color(attrs.borderColor);
    rectangle.style!.strokeWidth = rectangle.strokeColor.alpha! > 0 ? 4 : 0;    
  }
}