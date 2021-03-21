import paper from "paper";
import { darkRed, mainRedColor } from "./Colors";
import { Shape } from "./Shape";

export default class Rectangle implements Shape {
  path;
  upper;
  bottom;
  left;
  right;
  upperLeft;
  upperRight;
  bottomLeft;
  bottomRight;
  
  all;
  grips;

  movedShape: paper.Item | null = null;

  get fillColor() {
    return this.path.fillColor!.toCSS(true);
  }

  set fillColor(color) {
    this.path.fillColor = new paper.Color(color);
    this.grips.fillColor = new paper.Color(color).multiply(0.7);
  }

  constructor(paperScope: any) {
    paperScope.activate();

    let center = new paper.Point(800/2, 500/2);
    let size = new paper.Size(100, 100);

    this.path = new paper.Shape.Rectangle(new paper.Rectangle(center.add(new paper.Point(-size.width! / 2, -size.height! / 2)), size));
    this.path.fillColor = new paper.Color(mainRedColor);
    this.path.style!.strokeWidth = 0;

    let grip = new paper.Path.Circle(new paper.Point(0, 0), 6);
    grip.fillColor = new paper.Color(darkRed); 
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
    this.all = new paper.Group([this.path, this.grips]);
    this.grips.visible = false;
  }

  onDelete() {
    this.all.remove();
  }

  move(shift: paper.Point) {
    this.all.position = this.all.position!.add(shift);
  }

  onMouseMove(hitResult: paper.HitResult, cursorStyle: CSSStyleDeclaration) {
    let anyElement = true;
    if (!hitResult)
      anyElement = false;
    else if (this.path == hitResult.item)
      cursorStyle.cursor = "move";
    else if (this.upper == hitResult.item || this.bottom == hitResult.item)
      cursorStyle.cursor = "ns-resize";
    else if (this.left == hitResult.item || this.right == hitResult.item)
      cursorStyle.cursor = "ew-resize";
    else if (this.upperLeft == hitResult.item || this.bottomRight == hitResult.item)
      cursorStyle.cursor = "nwse-resize";
    else if (this.upperRight == hitResult.item || this.bottomLeft == hitResult.item)
      cursorStyle.cursor = "nesw-resize";
    else
      anyElement = false;
  
    this.grips.visible = anyElement;
  }

  onMouseDown(hitResult: paper.HitResult): boolean {
    if (this.path == hitResult.item) {
      this.movedShape = this.all;
      return true;
    }
    let result = this.grips.children!.find(grip => grip == hitResult.item);
    if (result)
      this.movedShape = result;
    return !!result;
  }

  onMouseDrag(event: paper.MouseEvent) {
    if (this.movedShape == this.all) {
      this.movedShape.position!.x! += event.delta!.x!;
      this.movedShape.position!.y! += event.delta!.y!;
    }
    let resizeX = 0, resizeY = 0;
    if (this.movedShape == this.upperLeft || this.movedShape == this.left || this.movedShape == this.bottomLeft)
      resizeX = -1;
    if (this.movedShape == this.upperRight || this.movedShape == this.right || this.movedShape == this.bottomRight)
      resizeX = 1;
    if (this.movedShape == this.upperLeft || this.movedShape == this.upper || this.movedShape == this.upperRight)
      resizeY = -1;
    if (this.movedShape == this.bottomLeft || this.movedShape == this.bottom || this.movedShape == this.bottomRight)
      resizeY = 1;

    if (resizeX) {
      let delta = Math.max(resizeX * event.delta!.x!, -this.path.size!.width! + 3);
      this.path.size!.width! += delta
      this.path.position!.x! += resizeX * delta / 2;
    }
    if (resizeY) {
      let delta = Math.max(resizeY * event.delta!.y!, -this.path.size!.height! + 3);
      this.path.size!.height! += delta
      this.path.position!.y! += resizeY * delta / 2;
    }
    if (resizeX || resizeY) {
      this.recalculateGripsPositions();
    }
  }

  onMouseUp() {
    this.movedShape = null;
  }

  private recalculateGripsPositions() {
    this.upper.position = this.path.position!.add(new paper.Point(0, -this.path.size!.height! / 2));
    this.bottom.position =  this.path.position!.add(new paper.Point(0, this.path.size!.height! / 2));
    this.left.position =  this.path.position!.add(new paper.Point(-this.path.size!.width! / 2, 0));
    this.right.position =  this.path.position!.add(new paper.Point(this.path.size!.width! / 2, 0));
    this.upperLeft.position =  this.path.position!.add(new paper.Point(-this.path.size!.width! / 2, -this.path.size!.height! / 2))
    this.upperRight.position =  this.path.position!.add(new paper.Point(this.path.size!.width! / 2, -this.path.size!.height! / 2));
    this.bottomLeft.position =  this.path.position!.add(new paper.Point(-this.path.size!.width! / 2, this.path.size!.height! / 2));
    this.bottomRight.position =  this.path.position!.add(new paper.Point(this.path.size!.width! / 2, this.path.size!.height! / 2));
  }
}