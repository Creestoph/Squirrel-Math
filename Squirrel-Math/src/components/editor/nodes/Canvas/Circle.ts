import paper from "paper";
import { mainRedColor } from "./Colors";
import { Shape } from "./Shape";

export interface CircleAttributes {
  type: 'circle',
  center: { x: number, y: number },
  size: { width: number, height: number},
  color: string,
  borderColor: string
}

export default class Circle extends Shape {
  canHaveBorder = true;
  private fillColorHex = '';
  private borderColorHex = '';

  private circle;
  private upper;
  private bottom;
  private left;
  private right;
  private upperLeft;
  private upperRight;
  private bottomLeft;
  private bottomRight;
  
  private all;
  private grips;

  private movedShape: paper.Item | null = null;

  get fillColor() {
    return this.fillColorHex;
  }

  set fillColor(color) {
    this.fillColorHex = color;
    if (color == '#00000000')
      color = '#00000001';
    this.circle.fillColor = new paper.Color(color);
    this.grips.fillColor = new paper.Color(color).multiply(0.7);
    this.grips.fillColor.alpha = 1;
  }

  get borderColor() {
    return this.borderColorHex;
  }

  set borderColor(color) {
    this.borderColorHex = color;
    this.circle.strokeColor = new paper.Color(color);
    this.circle.style!.strokeWidth = this.circle.strokeColor.alpha! > 0 ? 4 : 0;
  }

  get width() {
    return this.circle.size!.width!;
  }

  set width(value: number | string) {
    let newWidth = typeof value == "number" ? value : parseFloat(value);
    if (newWidth >= 3) {
      this.circle.size!.width = newWidth;
      this.recalculateGripsPositions();
    }
  }

  get height() {
    return this.circle.size!.height!;
  }

  set height(value: number | string) {
    let newHeight = typeof value == "number" ? value : parseFloat(value);
    if (newHeight >= 3) {
      this.circle.size!.height = newHeight;
      this.recalculateGripsPositions();
    }
  }

  set selected(value: boolean) {
    this.grips.visible = value;
  }

  get position() {
    return this.circle.position!;
  }

  constructor(attrs?: CircleAttributes) {
    super();

    let center = attrs && attrs.center ? new paper.Point(attrs.center.x, attrs.center.y) : new paper.Point(50, 50);
    let size = attrs && attrs.size ? new paper.Size(attrs.size.width, attrs.size.height) : new paper.Size(100, 100);

    this.circle = new paper.Shape.Ellipse(new paper.Rectangle(center.add(new paper.Point(-size.width! / 2, -size.height! / 2)), size));

    let grip = new paper.Path.Circle(new paper.Point(0, 0), 6);
    grip.style!.strokeWidth = 0;
    this.upper = grip.clone();
    this.bottom = grip.clone();
    this.left = grip.clone();
    this.right = grip.clone();
    this.upperLeft = grip.clone();
    this.upperRight = grip.clone();
    this.bottomLeft = grip.clone();
    this.bottomRight = grip.clone();
    this.recalculateGripsPositions();
    grip.remove();

    this.grips = new paper.Group([this.upper, this.bottom, this.left, this.right, this.upperLeft, this.upperRight, this.bottomLeft, this.bottomRight]);
    this.all = new paper.Group([this.circle, this.grips]);
    this.grips.visible = false;

    this.fillColor = attrs && attrs.color ? attrs.color : mainRedColor;
    this.borderColor = attrs && attrs.borderColor ? attrs.borderColor : '#00000000';
  }

  toJSON(): CircleAttributes {
    return {
      type: 'circle',
      center: { x: this.circle.position!.x!, y: this.circle.position!.y! },
      size: { width: this.circle.size!.width!, height: this.circle.size!.height! },
      color: this.fillColor,
      borderColor: this.borderColor
    }
  }

  move(shift: paper.Point) {
    this.all.position = this.all.position!.add(shift);
  }

  containedInBounds(bounds: paper.Rectangle): boolean {
    return this.circle.bounds!.intersects(bounds);
  }

  getSnapPoints(): paper.Point[] {
    return [this.upperLeft.position!, this.circle.position!, this.bottomRight.position!];
  }

  onDelete() {
    this.all.remove();
  }

  onMouseMove(event: paper.ToolEvent, hitResult: paper.HitResult, cursorStyle: CSSStyleDeclaration) {
    if (!hitResult)
      return;
    else if (this.circle == hitResult.item)
      cursorStyle.cursor = "move";
    else if (this.upper == hitResult.item || this.bottom == hitResult.item)
      cursorStyle.cursor = "ns-resize";
    else if (this.left == hitResult.item || this.right == hitResult.item)
      cursorStyle.cursor = "ew-resize";
    else if (this.upperLeft == hitResult.item || this.bottomRight == hitResult.item)
      cursorStyle.cursor = "nwse-resize";
    else if (this.upperRight == hitResult.item || this.bottomLeft == hitResult.item)
      cursorStyle.cursor = "nesw-resize";
  }

  onMouseDown(event: paper.ToolEvent, hitResult: paper.HitResult): boolean {
    if (!hitResult)
      return false;
    if (this.circle == hitResult.item) {
      this.movedShape = this.all;
      return true;
    }
    let result = this.grips.children!.find(grip => grip == hitResult.item);
    if (result)
      this.movedShape = result;
    return !!result;
  }

  onMouseDrag(event: paper.ToolEvent, snapPoints: paper.Point[]) {
    if (!this.movedShape || this.movedShape == this.all)
      return false;

    let snapShift = event.modifiers.shift ? Shape.snapShift([event.point!], snapPoints) : new paper.Point(0, 0);
    if (this.movedShape == this.upperLeft || this.movedShape == this.left || this.movedShape == this.bottomLeft) {
      if (event.point!.x! > this.right.position!.x! - 3)
        this.left.position!.x = this.right.position!.x! - 3;
      else
        this.left.position!.x = event.point!.add(snapShift).x!;
    }
    if (this.movedShape == this.upperRight || this.movedShape == this.right || this.movedShape == this.bottomRight) {
      if (event.point!.x! < this.left.position!.x! + 3)
        this.right.position!.x = this.left.position!.x! + 3;
      else
        this.right.position!.x = event.point!.add(snapShift).x!;
    }
    if (this.movedShape == this.upperLeft || this.movedShape == this.upper || this.movedShape == this.upperRight) {
      if (event.point!.y! > this.bottom.position!.y! - 3)
        this.upper.position!.y = this.bottom.position!.y! - 3;
      else
        this.upper.position!.y = event.point!.add(snapShift).y!;
    }
    if (this.movedShape == this.bottomLeft || this.movedShape == this.bottom || this.movedShape == this.bottomRight) {
      if (event.point!.y! < this.upper.position!.y! + 3)
        this.bottom.position!.y = this.upper.position!.y! + 3;
      else
        this.bottom.position!.y = event.point!.add(snapShift).y!;
    }
    
    this.circle.size!.width! = this.right.position!.x! - this.left.position!.x!;
    this.circle.size!.height! = this.bottom.position!.y! - this.upper.position!.y!;
    this.circle.position!.x! = (this.left.position!.x! + this.right.position!.x!) / 2;
    this.circle.position!.y! = (this.bottom.position!.y! + this.upper.position!.y!) / 2;
    this.recalculateGripsPositions();

    return true;
  }

  onMouseUp() {
    this.movedShape = null;
  }

  private recalculateGripsPositions() {
    this.upper.position = this.circle.position!.add(new paper.Point(0, -this.circle.size!.height! / 2));
    this.bottom.position =  this.circle.position!.add(new paper.Point(0, this.circle.size!.height! / 2));
    this.left.position =  this.circle.position!.add(new paper.Point(-this.circle.size!.width! / 2, 0));
    this.right.position =  this.circle.position!.add(new paper.Point(this.circle.size!.width! / 2, 0));
    this.upperLeft.position =  this.circle.position!.add(new paper.Point(-this.circle.size!.width! / 2, -this.circle.size!.height! / 2))
    this.upperRight.position =  this.circle.position!.add(new paper.Point(this.circle.size!.width! / 2, -this.circle.size!.height! / 2));
    this.bottomLeft.position =  this.circle.position!.add(new paper.Point(-this.circle.size!.width! / 2, this.circle.size!.height! / 2));
    this.bottomRight.position =  this.circle.position!.add(new paper.Point(this.circle.size!.width! / 2, this.circle.size!.height! / 2));
  }
}