import paper from "paper";

export interface TriangleAttributes {
  type: 'triangle',
  vertices: {x: number, y: number}[],
  color: string,
  hasBorder: boolean
}

export default class Triangle {
  constructor(paperScope: paper.PaperScope, attrs: TriangleAttributes) {
    paperScope.activate();
    let triangle = new paper.Path(attrs.vertices.map(v => [v.x, v.y]));
    triangle.fillColor = new paper.Color(attrs.color);
    triangle.strokeColor = new paper.Color(attrs.color).multiply(0.7);
    triangle.style!.strokeWidth = attrs.hasBorder ? 4 : 0;
  }
}