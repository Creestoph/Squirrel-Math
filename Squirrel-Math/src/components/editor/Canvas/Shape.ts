import paper from "paper";

export abstract class Shape {
    abstract selected: boolean;
    abstract fillColor: string;
    abstract hasBorder: boolean;

    abstract move(shift: paper.Point): void;
    abstract getSnapPoints(): paper.Point[];
    abstract toJSON(): object;

    abstract onDelete(): void;
    abstract onMouseMove(hitResult: paper.HitResult, cursorStyle: CSSStyleDeclaration): void;
    /**
     * returns true if shape got selected
     */
    abstract onMouseDown(event: paper.MouseEvent, hitResult: paper.HitResult): boolean;
    abstract onMouseDrag(event: paper.MouseEvent, snapPoints: paper.Point[]): void;
    abstract onMouseUp(): void;

    static snapShift(movedPoints: paper.Point[], snapPoints: paper.Point[]) {
        let closestSnapX = movedPoints.map(f => f.x!).map(f =>
            [f, snapPoints.map(s => s.x!).filter(s => Math.abs(s - f) < 10).sort((p1, p2) => Math.abs(p1 - f) - Math.abs(p2 - f))[0] || Infinity]
        ).sort((p1, p2) => Math.abs(p1[0] - p1[1]) - Math.abs(p2[0] - p2[1]))[0];
        let closestSnapY = movedPoints.map(f => f.y!).map(f =>
            [f, snapPoints.map(s => s.y!).filter(s => Math.abs(s - f) < 10).sort((p1, p2) => Math.abs(p1 - f) - Math.abs(p2 - f))[0] || Infinity]
        ).sort((p1, p2) => Math.abs(p1[0] - p1[1]) - Math.abs(p2[0] - p2[1]))[0];
        if (closestSnapX[1] == Infinity)
            closestSnapX[1] = closestSnapX[0];
        if (closestSnapY[1] == Infinity)
            closestSnapY[1] = closestSnapY[0];

        return new paper.Point(closestSnapX[1] - closestSnapX[0], closestSnapY[1] - closestSnapY[0]);
    }
}