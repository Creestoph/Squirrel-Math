import paper from "paper";
import { mainRedColor } from "./Colors";
import { Shape } from "./Shape";

export interface RectangleAttributes {
  type: 'rectangle',
  center: { x: number, y: number },
  size: { width: number, height: number},
  color: string,
  hasBorder: boolean
}

export default class Rectangle extends Shape {
  private rectangle;
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
    return this.rectangle.fillColor!.toCSS(true);
  }

  set fillColor(color) {
    this.rectangle.fillColor = new paper.Color(color);
    this.grips.fillColor = this.rectangle.strokeColor = new paper.Color(color).multiply(0.7);
  }

  get hasBorder() {
    return this.rectangle.style!.strokeWidth! > 0;
  }

  set hasBorder(value) {
    this.rectangle.style!.strokeWidth = value ? 4 : 0;
  }

  get width() {
    return this.rectangle.size!.width!;
  }

  set width(value: number | string) {
    let newWidth = typeof value == "number" ? value : parseFloat(value);
    if (newWidth >= 3) {
      this.rectangle.size!.width = newWidth;
      this.recalculateGripsPositions();
    }
  }

  get height() {
    return this.rectangle.size!.height!;
  }

  set height(value: number | string) {
    let newHeight = typeof value == "number" ? value : parseFloat(value);
    if (newHeight >= 3) {
      this.rectangle.size!.height = newHeight;
      this.recalculateGripsPositions();
    }
  }

  set selected(value: boolean) {
    this.grips.visible = value;
  }

  get position() {
    return this.rectangle.position!;
  }

  constructor(attrs?: RectangleAttributes) {
    super();
    
    let center = attrs && attrs.center ? new paper.Point(attrs.center.x, attrs.center.y) : new paper.Point(50, 50);
    let size = attrs && attrs.size ? new paper.Size(attrs.size.width, attrs.size.height) : new paper.Size(100, 100);
 
    this.rectangle = new paper.Shape.Rectangle(new paper.Rectangle(center.add(new paper.Point(-size.width! / 2, -size.height! / 2)), size));

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
    this.all = new paper.Group([this.rectangle, this.grips]);
    this.grips.visible = false;

    this.fillColor = attrs && attrs.color ? attrs.color : mainRedColor;
    this.hasBorder = attrs && attrs.hasBorder ? attrs.hasBorder : false;
  }

  toJSON(): RectangleAttributes {
    return {
      type: 'rectangle',
      center: { x: this.rectangle.position!.x!, y: this.rectangle.position!.y! },
      size: { width: this.rectangle.size!.width!, height: this.rectangle.size!.height! },
      color: this.fillColor,
      hasBorder: this.hasBorder
    }
  }

  move(shift: paper.Point) {
    this.all.position = this.all.position!.add(shift);
  }

  containedInBounds(bounds: paper.Rectangle): boolean {
    return this.rectangle.bounds!.intersects(bounds);
  }

  getSnapPoints(): paper.Point[] {
    return [this.upperLeft.position!, this.bottomRight.position!];
  }

  onDelete() {
    this.all.remove();
  }

  onMouseMove(hitResult: paper.HitResult, cursorStyle: CSSStyleDeclaration) {
    if (!hitResult)
      return;
    else if (this.rectangle == hitResult.item)
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

  onMouseDown(event: paper.MouseEvent, hitResult: paper.HitResult): boolean {
    if (!hitResult)
      return false;
    if (this.rectangle == hitResult.item) {
      this.movedShape = this.all;
      return true;
    }
    let result = this.grips.children!.find(grip => grip == hitResult.item);
    if (result)
      this.movedShape = result;
    return !!result;
  }

  onMouseDrag(event: paper.MouseEvent, snapPoints: paper.Point[]) {
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
    
    this.rectangle.size!.width! = this.right.position!.x! - this.left.position!.x!;
    this.rectangle.size!.height! = this.bottom.position!.y! - this.upper.position!.y!;
    this.rectangle.position!.x! = (this.left.position!.x! + this.right.position!.x!) / 2;
    this.rectangle.position!.y! = (this.bottom.position!.y! + this.upper.position!.y!) / 2;
    this.recalculateGripsPositions();

    return true;
  }

  onMouseUp() {
    this.movedShape = null;
  }

  private recalculateGripsPositions() {
    this.upper.position = this.rectangle.position!.add(new paper.Point(0, -this.rectangle.size!.height! / 2));
    this.bottom.position =  this.rectangle.position!.add(new paper.Point(0, this.rectangle.size!.height! / 2));
    this.left.position =  this.rectangle.position!.add(new paper.Point(-this.rectangle.size!.width! / 2, 0));
    this.right.position =  this.rectangle.position!.add(new paper.Point(this.rectangle.size!.width! / 2, 0));
    this.upperLeft.position =  this.rectangle.position!.add(new paper.Point(-this.rectangle.size!.width! / 2, -this.rectangle.size!.height! / 2))
    this.upperRight.position =  this.rectangle.position!.add(new paper.Point(this.rectangle.size!.width! / 2, -this.rectangle.size!.height! / 2));
    this.bottomLeft.position =  this.rectangle.position!.add(new paper.Point(-this.rectangle.size!.width! / 2, this.rectangle.size!.height! / 2));
    this.bottomRight.position =  this.rectangle.position!.add(new paper.Point(this.rectangle.size!.width! / 2, this.rectangle.size!.height! / 2));
  }
}