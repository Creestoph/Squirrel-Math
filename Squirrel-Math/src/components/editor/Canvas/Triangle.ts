import paper from "paper";
import { darkRed, mainRedColor } from "./Colors";
import { Shape } from "./Shape";

export default class Rectangle implements Shape {
  triangle;
  movedShape: paper.Item | null = null;

  all;
  grips;

  get fillColor() {
    return this.triangle.fillColor!.toCSS(true);
  }

  set fillColor(color) {
    this.triangle.fillColor = new paper.Color(color);
    this.grips.fillColor = new paper.Color(color).multiply(0.7);
  }

  constructor(paperScope: any) {
    paperScope.activate();
    this.triangle = new paper.Path.RegularPolygon(new paper.Point(800 / 2, 500 / 2), 3, 57.74);
    this.triangle.fillColor = new paper.Color(mainRedColor);

    let grip = new paper.Path.Circle(new paper.Point(0, 0), 6);
    grip.fillColor = new paper.Color(darkRed); 
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
    else if (this.triangle == hitResult.item)
      cursorStyle.cursor = "move";
    else if (this.grips.children!.some(grip => grip == hitResult.item))
      cursorStyle.cursor = "crosshair";
    else
      anyElement = false;
  
    this.grips.visible = anyElement;
  }

  onMouseDown(hitResult: paper.HitResult): boolean {
    if (this.triangle == hitResult.item)
      this.movedShape = this.all;
    let result = this.grips.children!.find(grip => grip == hitResult.item);
    if (result)
      this.movedShape = result;
    return !!this.movedShape;
  }

  onMouseDrag(event: paper.MouseEvent) {
    if (this.movedShape) {
      this.movedShape.position!.x! += event.delta!.x!;
      this.movedShape.position!.y! += event.delta!.y!;
    }
    let result = this.grips.children!.findIndex(grip => grip == this.movedShape);
    if (result != -1) {
      console.log(result, this.triangle.segments, this.triangle.segments![result]);
      this.triangle.segments![result].point!.x! += event.delta!.x!;
      this.triangle.segments![result].point!.y! += event.delta!.y!;
    }
    // console.log(result);
    // console.log(this.triangle.segments);
  }

  onMouseUp() {
    this.movedShape = null;
  }
}