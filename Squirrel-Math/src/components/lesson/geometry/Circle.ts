import paper from "paper";

export interface CircleAttributes {
  type: 'circle',
  center: { x: number, y: number },
  size: { width: number, height: number},
  color: string,
  hasBorder: boolean
}

export default class Circle {
  constructor(paperScope: paper.PaperScope, attrs: CircleAttributes) {
    paperScope.activate();
    let center = new paper.Point(attrs.center.x, attrs.center.y);
    let size = new paper.Size(attrs.size.width, attrs.size.height);
    let circle = new paper.Shape.Ellipse(new paper.Rectangle(center.add(new paper.Point(-size.width! / 2, -size.height! / 2)), size));
    circle.fillColor = new paper.Color(attrs.color);
    circle.strokeColor = new paper.Color(attrs.color).multiply(0.7);
    circle.style!.strokeWidth = attrs.hasBorder ? 4 : 0;
  }
}