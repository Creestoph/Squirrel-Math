import paper from "paper";

export interface Shape {
    fillColor: string;
    onDelete(): void;
    move(shift: paper.Point): void;
    onMouseMove(hitResult: paper.HitResult, cursorStyle: CSSStyleDeclaration): void;
    /**
     * returns true if shape got selected
     */
    onMouseDown(hitResult: paper.HitResult): boolean;
    onMouseDrag(event: paper.MouseEvent): void;
    onMouseUp(): void;
}