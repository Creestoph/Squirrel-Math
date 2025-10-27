import paper from 'paper';

export interface ShapeAttributes {
    type?: string;
}

export const idGenerator = (function* () {
    let id = 0;
    while (true) {
        yield (id++).toString();
    }
})();

export abstract class Shape {
    canHaveBorder = false;

    abstract selected: boolean;
    abstract fillColor: string;
    abstract borderColor: string;

    clone(): Shape {
        return new (this.constructor as any)(this.toJSON());
    }
    abstract get position(): paper.Point;
    abstract move(shift: paper.Point): void;
    abstract getSnapPoints(): paper.Point[];
    abstract toJSON(): ShapeAttributes | null;
    abstract containedInBounds(bounds: paper.Rectangle): boolean;

    abstract onDelete(): void;
    abstract onMouseMove(event: paper.ToolEvent, hitResult: paper.HitResult, cursorStyle: CSSStyleDeclaration): void;
    /** returns true if shape got selected */
    abstract onMouseDown(event: paper.ToolEvent, hitResult: paper.HitResult): boolean;
    /**returns true if drag event is consumed for something else than moving whole shape */
    abstract onMouseDrag(event: paper.ToolEvent, snapPoints: paper.Point[]): boolean;
    abstract onMouseUp(): void;

    static snapShift(movedPoints: paper.Point[], snapPoints: paper.Point[]) {
        const closestSnapX = movedPoints
            .map((f) => f.x!)
            .map((f) => [
                f,
                snapPoints
                    .map((s) => s.x!)
                    .filter((s) => Math.abs(s - f) < 10)
                    .sort((p1, p2) => Math.abs(p1 - f) - Math.abs(p2 - f))[0] || Infinity,
            ])
            .sort((p1, p2) => Math.abs(p1[0] - p1[1]) - Math.abs(p2[0] - p2[1]))[0];
        const closestSnapY = movedPoints
            .map((f) => f.y!)
            .map((f) => [
                f,
                snapPoints
                    .map((s) => s.y!)
                    .filter((s) => Math.abs(s - f) < 10)
                    .sort((p1, p2) => Math.abs(p1 - f) - Math.abs(p2 - f))[0] || Infinity,
            ])
            .sort((p1, p2) => Math.abs(p1[0] - p1[1]) - Math.abs(p2[0] - p2[1]))[0];
        if (closestSnapX[1] == Infinity) {
            closestSnapX[1] = closestSnapX[0];
        }
        if (closestSnapY[1] == Infinity) {
            closestSnapY[1] = closestSnapY[0];
        }
        return new paper.Point(closestSnapX[1] - closestSnapX[0], closestSnapY[1] - closestSnapY[0]);
    }
}
