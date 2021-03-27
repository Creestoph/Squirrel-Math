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
  private dragStartPoint: paper.Point | null = null;
  private lineDragStartPoint: paper.Point | null = null;

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

  constructor(paperScope: paper.PaperScope, attrs?: LineAttributes) {
    super();
    paperScope.activate();
    this.line = new paper.Path();
    if (attrs)
      attrs.points.forEach(p => this.line.add(new paper.Point(p)));
    this.line.style!.strokeWidth = 3;

    this.grips = new paper.Group();
    this.all = new paper.Group([this.line, this.grips]);
    this.grips.visible = false;

    this.fillColor = attrs ? attrs.color : mainRedColor;
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
    this.dragStartPoint = event.point;
    this.lineDragStartPoint = this.line.position;
    if (!hitResult) {
      if (this.active) {
        this.line.add(event.point!);
        let grip = new paper.Path.Circle(event.point!, 6);
        grip.style!.strokeWidth = 0;
        grip.fillColor = new paper.Color(this.fillColor).multiply(0.7);
        this.grips.addChild(grip)
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
      return;

    let result = this.grips.children!.findIndex(grip => grip == this.movedShape);
    if (result != -1) {
      let snapShift = event.modifiers.shift ? Shape.snapShift([event.point!], snapPoints) : new paper.Point(0, 0);
      this.movedShape!.position = event.point!.add(snapShift);
      this.line.segments![result].point = this.movedShape!.position;
    }
    else {
      let futurePositions = this.getSnapPoints().map(p => p.add(event.point!).subtract(this.dragStartPoint!).add(this.lineDragStartPoint!).subtract(this.line.position!));
      let snapShift = event.modifiers.shift ? Shape.snapShift(futurePositions, snapPoints) : new paper.Point(0, 0);
      this.movedShape.position = event.point!.subtract(this.dragStartPoint!).add(this.lineDragStartPoint!).add(snapShift);
    } 
  }

  onMouseUp() {
    this.movedShape = null;
  }
}