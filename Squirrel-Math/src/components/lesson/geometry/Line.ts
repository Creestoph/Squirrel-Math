import paper from "paper";

export interface LineAttributes {
  type: 'line',
  points: { x: number, y: number }[],
  color: string
}

export default class Line {
  constructor(paperScope: paper.PaperScope, attrs: LineAttributes) {
    paperScope.activate();
    let line = new paper.Path();
    attrs.points.forEach(p => line.add(new paper.Point(p)));
    line.style!.strokeWidth = 3;
    line.strokeColor = new paper.Color(attrs.color);
  }
}