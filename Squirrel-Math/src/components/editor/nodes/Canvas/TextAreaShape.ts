import paper from "paper";
import { EditorView } from "prosemirror-view";
import { Shape } from "./Shape";

export interface TextAreaAttributes {
  type: 'text_area';
  view: EditorView;
  canvasEditorPos: () => number,
  width: number,
  height: number,
  x: number,
  y: number,
  borderColor?: string;
  textColor?: string;
  fillColor?: string;
  align?: string;
  content?: any
}

export default class TextArea extends Shape {
  static maxId = 0;

  canHaveBorder = true;

  private textAreasContainer?: Node;
  id: number = 0;
  private view?: EditorView;
  private canvasEditorPos?: () => number;
  private resizing: string = "";

  get component() {
    if (!this.textAreasContainer)
      return null;
    for (const c of this.textAreasContainer!.childNodes)
      if ((c as any).__vue__.node.attrs.id == this.id)
        return (c as any).__vue__;
    return null;
  }

  get fillColor() {
    return this.component.fillColor;
  }

  set fillColor(color) {
    this.component.fillColor = color;
  }
  
  get borderColor() {
    return this.component.borderColor;
  }

  set borderColor(value) {
    this.component.borderColor = value;
  }

  get textColor() {
    return this.component.textColor;
  }

  set textColor(value) {
    this.component.textColor = value;
  }
  
  get width() {
    return this.component.width;
  }

  set width(value: number | string) {
    this.component.width = value;
  }
  
  get height() {
    return this.component.height;
  }

  set height(value: number | string) {
    this.component.height = value;
  }

  get align() {
    return this.component.align;
  }

  set align(value: string) {
    this.component.align = value;
  }

  set selected(value: boolean) {
    this.component.setFocus(value);
  }

  get position() {
    return new paper.Point(this.component);
  }

  static fromExisting(view: EditorView, canvasEditorPos: () => number): TextArea {
    const result = new TextArea();
    result.view = view;
    result.canvasEditorPos = canvasEditorPos;
    result.id = this.maxId++;
    return result;
  }

  constructor(attrs?: TextAreaAttributes) {
    super();
    if (!attrs)
      return;

    this.id = TextArea.maxId++;
    this.view = attrs.view;
    this.canvasEditorPos = attrs.canvasEditorPos;
    const node = this.view.state.schema.nodes.text_area.createAndFill({ 
      width: attrs.width,
      height: attrs.height,
      x: attrs.x,
      y: attrs.y,
      borderColor: attrs.borderColor,
      textColor: attrs.textColor,
      fillColor: attrs.fillColor,
      align: attrs.align,
      id: this.id
    }, attrs.content);
    const transaction = this.view.state.tr.insert(attrs.canvasEditorPos(), node);
    attrs.view.dispatch(transaction);
    this.textAreasContainer = attrs.view.domAtPos(attrs.canvasEditorPos()).node;
  }

  clone(): Shape {
    return new TextArea({
      type: 'text_area',
      view: this.view!,
      canvasEditorPos: this.canvasEditorPos!,
      width: this.component.width,
      height: this.component.height,
      x: this.component.x,
      y: this.component.y,
      borderColor: this.borderColor,
      textColor: this.textColor,
      fillColor: this.fillColor,
      align: this.align,
      content: this.component.node.content
    })
  }

  toJSON() {
    return null;
  }
  
  move(shift: paper.Point) {
    this.component.x += shift.x;
    this.component.y += shift.y;
  }

  containedInBounds(bounds: paper.Rectangle): boolean {
    return new paper.Rectangle(new paper.Point(this.component), new paper.Size(this.component)).intersects(bounds);
  }

  getSnapPoints(): paper.Point[] {
    return [new paper.Point(this.component), new paper.Point(this.component.x + this.component.width, this.component.y + this.component.height)];
  }

  onDelete() {
    const elementBegin = this.component.getPos();
    const transaction = this.view!.state.tr.delete(elementBegin, elementBegin + this.component.node.nodeSize);
    transaction.setMeta('allowDelete', true); //see TextArea.ts for usage 
    this.view!.dispatch(transaction);
  }

  onMouseMove(event: paper.ToolEvent, hitResult: paper.HitResult, cursorStyle: CSSStyleDeclaration): void {

  }

  onMouseDown(event: paper.ToolEvent, hitResult: paper.HitResult): boolean {
    const mousePosition = event.point!;
    const boundingBox = new paper.Rectangle(new paper.Point(this.component), new paper.Size(this.component));
    const inbounds = mousePosition.x! > boundingBox.left! - 3 && mousePosition.x! < boundingBox.right! + 3 && mousePosition.y! > boundingBox.top! - 3 && mousePosition.y! < boundingBox.bottom! + 3;
    this.resizing = "";
    if (!inbounds)
      return false;
    if (Math.abs(boundingBox.left! - mousePosition.x!) < 3)
      this.resizing = "left";
    else if (Math.abs(boundingBox.right! - mousePosition.x!) < 3)
      this.resizing = "right";
    else if (Math.abs(boundingBox.top! - mousePosition.y!) < 3)
      this.resizing = "top";
    else if (Math.abs(boundingBox.bottom! - mousePosition.y!) < 3)
      this.resizing = "bottom";
    return true;
  }

  onMouseDrag(event: paper.ToolEvent, snapPoints: paper.Point[]) {
    if (!this.resizing)
      return false;

    const mousePosition = event.point!;
    const boundingBox = new paper.Rectangle(new paper.Point(this.component), new paper.Size(this.component));

    let snapShift = event.modifiers.shift ? Shape.snapShift([mousePosition], snapPoints) : new paper.Point(0, 0);

    const minHeight = 44;
    const minWidth = 44;
    if (this.resizing == "left") {
      const width = (mousePosition.x! > boundingBox.right! - minWidth) ? minWidth : boundingBox.right! - mousePosition.add(snapShift).x!;
      this.component.width = width;
      this.component.x = boundingBox.right! - width;
    }
    if (this.resizing == "right") {
      this.component.width = (mousePosition.x! < boundingBox.left! + minWidth) ? minWidth : mousePosition.add(snapShift).x! - boundingBox.left!;
    }
    if (this.resizing == "top") {
      const height = (mousePosition.y! > boundingBox.bottom! - minHeight) ? minHeight : boundingBox.bottom! - mousePosition.add(snapShift).y!;
      this.component.height = height;
      this.component.y = boundingBox.bottom! - height;
    }
    if (this.resizing == "bottom") {
      this.component.height = (mousePosition.y! < boundingBox.top! + minHeight) ? minHeight : mousePosition.add(snapShift).y! - boundingBox.top!;
    }

    return true;
  }

  onMouseUp() {
    
  }
}