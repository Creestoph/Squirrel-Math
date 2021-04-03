import paper from "paper";
import { mainRedColor } from "./Colors";
import { Shape } from "./Shape";

export interface TriangleAttributes {
  type: 'triangle',
  vertices: {x: number, y: number}[],
  color: string,
  hasBorder: boolean
}

export default class Triangle extends Shape {
  private triangle;
  private movedShape: paper.Item | null = null;
  private dragStartPoint: paper.Point | null = null;
  private triangleDragStartPoint: paper.Point | null = null;

  private all;
  private grips;

  get fillColor() {
    return this.triangle.fillColor!.toCSS(true);
  }

  set fillColor(color) {
    this.triangle.fillColor = new paper.Color(color);
    this.grips.fillColor = this.triangle.strokeColor = new paper.Color(color).multiply(0.7);
  }

  get hasBorder() {
    return this.triangle.style!.strokeWidth! > 0;
  }

  set hasBorder(value) {
    this.triangle.style!.strokeWidth = value ? 4 : 0;
  }

  set selected(value: boolean) {
    this.grips.visible = value;
  }

  get position() {
    return this.triangle.position!;
  }

  constructor(attrs?: TriangleAttributes) {
    super();
    if (attrs)
      this.triangle = new paper.Path(attrs.vertices.map(v => [v.x, v.y]));
    else
      this.triangle = new paper.Path.RegularPolygon(new paper.Point(800 / 2, 500 / 2), 3, 57.74);

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

    this.fillColor = attrs ? attrs.color : mainRedColor;
    this.hasBorder = attrs ? attrs.hasBorder : false;
  }

  toJSON(): TriangleAttributes {
    return {
      type: 'triangle',
      vertices: this.triangle.segments!.map(s => ({ x: s.point!.x!, y: s.point!.y! })),
      color: this.fillColor,
      hasBorder: this.hasBorder
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

  onMouseMove(hitResult: paper.HitResult, cursorStyle: CSSStyleDeclaration) {
    if (!hitResult)
      return;
    else if (this.triangle == hitResult.item)
      cursorStyle.cursor = "move";
    else if (this.grips.children!.some(grip => grip == hitResult.item))
      cursorStyle.cursor = "crosshair";
  }

  onMouseDown(event: paper.MouseEvent, hitResult: paper.HitResult): boolean {
    this.dragStartPoint = event.point;
    this.triangleDragStartPoint = this.triangle.position;
    if (!hitResult)
      return false;
    if (this.triangle == hitResult.item)
      this.movedShape = this.all;
    let result = this.grips.children!.find(grip => grip == hitResult.item);
    if (result)
      this.movedShape = result;
    return !!this.movedShape;
  }

  onMouseDrag(event: paper.MouseEvent, snapPoints: paper.Point[]) {
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