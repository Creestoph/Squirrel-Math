import paper from "paper";
import { mainRedColor } from "./Colors";
import { Shape } from "./Shape";

export interface TriangleAttributes {
  type?: 'triangle',
  vertices?: {x: number, y: number}[],
  color?: string,
  borderColor?: string
}

export default class Triangle extends Shape {
  canHaveBorder = true;
  private fillColorHex = '';
  private borderColorHex = '';

  private triangle;
  private movedShape: paper.Item | null = null;

  private all;
  private grips;

  get fillColor() {
    return this.fillColorHex;
  }

  set fillColor(color) {
    this.fillColorHex = color;
    if (color == '#00000000')
      color = '#00000001';
    this.triangle.fillColor = new paper.Color(color);
    this.grips.fillColor = new paper.Color(color).multiply(0.7);
    this.grips.fillColor.alpha = 1;
  }

  get borderColor() {
    return this.borderColorHex;
  }

  set borderColor(color) {
    this.borderColorHex = color;
    this.triangle.strokeColor = new paper.Color(color);
    this.triangle.style!.strokeWidth = this.triangle.strokeColor.alpha! > 0 ? 4 : 0;
  }

  set selected(value: boolean) {
    this.grips.visible = value;
  }

  get position() {
    return this.triangle.position!;
  }

  static createEquilateral(center?: { x: number, y: number }, size?: number) {
    if (!size) 
      size = 100;
    const radius = size*Math.sqrt(3) / 3;
    if (!center) 
      center = { x: size / 2, y: radius };
    const vertices = new paper.Path.RegularPolygon(new paper.Point(center.x, center.y), 3, radius).segments!.map(s => ({ x: s.point!.x!, y: s.point!.y! }));
    return new Triangle({ vertices });
  }

  constructor(attrs?: TriangleAttributes) {
    super();
    if (attrs && attrs.vertices) {
      this.triangle = new paper.Path(attrs.vertices.map(v => [v.x, v.y]));
      this.triangle.closed = true;
    }
    else
      this.triangle = new paper.Path.RegularPolygon(new paper.Point(50, 57.74), 3, 57.74);

    let grip = new paper.Path.Circle(new paper.Point(0, 0), 6);
    grip.style!.strokeWidth = 0;
    let gripDots: paper.Item[] = [];
    this.triangle.segments!.forEach((segment, i) => {
      gripDots[i] = grip.clone();
      gripDots[i].position = segment.point;
    });
    grip.remove();

    this.grips = new paper.Group(gripDots);
    this.all = new paper.Group([this.triangle, this.grips]);
    this.grips.visible = false;

    this.fillColor = attrs && attrs.color ? attrs.color : mainRedColor;
    this.borderColor = attrs && attrs.borderColor ? attrs.borderColor : '#00000000';
  }

  toJSON(): TriangleAttributes {
    return {
      type: 'triangle',
      vertices: this.triangle.segments!.map(s => ({ x: s.point!.x!, y: s.point!.y! })),
      color: this.fillColor,
      borderColor: this.borderColor
    };
  }

  move(shift: paper.Point) {
    this.all.position = this.all.position!.add(shift);
  }

  containedInBounds(bounds: paper.Rectangle): boolean {
    return this.triangle.intersects(new paper.Path.Rectangle(bounds)) || bounds.contains(this.triangle.bounds!);
  }

  getSnapPoints(): paper.Point[] {
    return this.grips.children!.map(g => g.position!);
  }

  onDelete() {
    this.all.remove();
  }

  onMouseMove(event: paper.ToolEvent, hitResult: paper.HitResult, cursorStyle: CSSStyleDeclaration) {
    if (!hitResult)
      return;
    else if (this.triangle == hitResult.item)
      cursorStyle.cursor = "move";
    else if (this.grips.children!.some(grip => grip == hitResult.item))
      cursorStyle.cursor = "crosshair";
  }

  onMouseDown(event: paper.ToolEvent, hitResult: paper.HitResult): boolean {
    if (!hitResult)
      return false;
    if (this.triangle == hitResult.item)
      this.movedShape = this.all;
    let result = this.grips.children!.find(grip => grip == hitResult.item);
    if (result)
      this.movedShape = result;
    return !!this.movedShape;
  }

  onMouseDrag(event: paper.ToolEvent, snapPoints: paper.Point[]) {
    if (!this.movedShape)
      return false;

    let result = this.grips.children!.findIndex(grip => grip == this.movedShape);
    if (result != -1) {
      let snapShift = event.modifiers.shift ? Shape.snapShift([event.point!], snapPoints) : new paper.Point(0, 0);
      this.movedShape!.position = event.point!.add(snapShift);
      this.triangle.segments![result].point = this.movedShape!.position;
      return true;
    }
    else 
      return false;
  }

  onMouseUp() {
    this.movedShape = null;
  }
}