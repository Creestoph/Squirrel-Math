import paper from "paper";

export interface TriangleAttributes {
  type: 'triangle',
  vertices: {x: number, y: number}[],
  color: string,
  borderColor: string
}

export default class Triangle {
  constructor(paperScope: paper.PaperScope, attrs: TriangleAttributes) {
    paperScope.activate();
    let triangle = new paper.Path(attrs.vertices.map(v => [v.x, v.y]));
    triangle.fillColor = new paper.Color(attrs.color);
    triangle.strokeColor = new paper.Color(attrs.borderColor);
    triangle.style!.strokeWidth = triangle.strokeColor.alpha! > 0 ? 4 : 0;    
  }
}