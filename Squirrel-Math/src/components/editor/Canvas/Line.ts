import paper from "paper";
import { mainRedColor } from "./Colors";
import { Shape } from "./Shape";

export interface LineAttributes {
  type: 'line',
  points: { x: number, y: number }[],
  color: string
}

export default class Line extends Shape {
  private line;
  private movedShape: paper.Item | null = null;

  private all;
  private grips;

  private active = false;

  get fillColor() {
    return this.line.strokeColor!.toCSS(true);
  }

  set fillColor(color) {
    this.line.strokeColor = new paper.Color(color);
    this.grips.fillColor = new paper.Color(color).multiply(0.7);
  }

  get hasBorder() {
    return false;
  }

  set selected(value: boolean) {
    this.grips.visible = value;
    this.active = value;
  }

  get position() {
    return this.line.position!;
  }

  constructor(attrs?: LineAttributes) {
    super();
    this.line = new paper.Path();
    this.line.style!.strokeWidth = 3;

    this.grips = new paper.Group();
    this.all = new paper.Group([this.line, this.grips]);
    this.grips.visible = false;

    this.fillColor = attrs ? attrs.color : mainRedColor;

    if (attrs)
      attrs.points.forEach(p => this.addPoint(new paper.Point(p)));
  }

  toJSON(): LineAttributes {
    return {
      type: 'line',
      points: this.line.segments!.map(s => ({ x: s.point!.x!, y: s.point!.y! })),
      color: this.fillColor
    }
  }

  move(shift: paper.Point) {
    this.all.position = this.all.position!.add(shift);
  }

  containedInBounds(bounds: paper.Rectangle): boolean {
    return this.line.intersects(new paper.Path.Rectangle(bounds)) || bounds.contains(this.line.bounds!);
  }

  getSnapPoints(): paper.Point[] {
    return this.grips.children!.map(g => g.position!);
  }

  onDelete() {
    this.all.remove();
  }

  onMouseMove(hitResult: paper.HitResult, cursorStyle: CSSStyleDeclaration) {
    if (!hitResult && this.active)
      cursorStyle.cursor = "cell";
    else if (hitResult && this.grips.children!.some(item => item == hitResult.item))
      cursorStyle.cursor = "crosshair";
    else if (hitResult && this.line == hitResult.item)
      cursorStyle.cursor = "move";
  }

  onMouseDown(event: paper.MouseEvent, hitResult: paper.HitResult): boolean {
    if (!hitResult) {
      if (this.active) {
        this.addPoint(event.point!);
        return true;
      }
      return false;
    }
    if (this.line == hitResult.item)
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
      this.line.segments![result].point = this.movedShape!.position;
      return true;
    }
    else
      return false;
  }

  onMouseUp() {
    this.movedShape = null;
  }

  private addPoint(position: paper.Point) {
    this.line.add(position);
    let grip = new paper.Path.Circle(position, 6);
    grip.style!.strokeWidth = 0;
    grip.fillColor = new paper.Color(this.fillColor).multiply(0.7);
    this.grips.addChild(grip)
  }
}