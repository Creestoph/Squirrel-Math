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

export function snapShift(movedPoints: paper.Point[], snapPoints: paper.Point[]) {
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
