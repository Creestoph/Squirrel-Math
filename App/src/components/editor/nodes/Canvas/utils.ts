import { Point } from '@/models/point';
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

interface SnapPair {
    moved: Point;
    snap: Point | null;
    snapDistance: number;
    snapDelta: number;
    distance: number;
    distanceDelta: number;
}

function minByCompare<T>(domain: T[], compare: (x: T, y: T) => number): T | null {
    return domain.reduce((min, d) => (compare(min, d) < 0 ? min : d), domain[0]) ?? null;
}

function minByValue<T>(domain: T[], value: (x: T) => number): T | null {
    return minByCompare(domain, (x, y) => value(x) - value(y));
}

export class Snapper {
    private snapPoints: Point[] = [];
    private snapLines: paper.Path[] = [];

    constructor(private readonly overlayPaperScope: paper.PaperScope) {}

    setSnapPoints(snapPoints: Point[]): void {
        this.snapPoints = snapPoints;
    }

    snapShift(movedPoints: Point[]): paper.Point {
        const getX = (p: Point) => p.x;
        const getY = (p: Point) => p.y;
        const closestSnapX = this.closestSnap(movedPoints, getX, getY);
        const closestSnapY = this.closestSnap(movedPoints, getY, getX);
        return new paper.Point(
            (closestSnapX?.snapDistance ?? Infinity) < 10 ? closestSnapX!.snapDelta : 0,
            (closestSnapY?.snapDistance ?? Infinity) < 10 ? closestSnapY!.snapDelta : 0,
        );
    }

    clearSnapLines(): void {
        this.snapLines.forEach((s) => s.remove());
        this.snapLines = [];
    }

    drawSnapLines(movedPoints: Point[]): void {
        const getX = (p: Point) => p.x;
        const getY = (p: Point) => p.y;
        const perfectSnapsX = this.perfectSnaps(movedPoints, getX, getY);
        const perfectSnapsY = this.perfectSnaps(movedPoints, getY, getX);
        this.overlayPaperScope.activate();
        this.clearSnapLines();
        this.snapLines = [...perfectSnapsX, ...perfectSnapsY].map(
            (p) =>
                new paper.Path({
                    segments: [p.moved, p.snap],
                    strokeColor: '#ffbb33',
                    strokeWidth: 3,
                    dashArray: [10, 10],
                }),
        );
    }

    private perfectSnaps(
        moved: Point[],
        snapComponent: (p: Point) => number,
        distanceComponent: (p: Point) => number,
    ): SnapPair[] {
        const aligned = this.bestSnaps(moved, snapComponent, distanceComponent).filter(
            (c) => ((c.positive || c.negative)?.snapDistance ?? Infinity) < 0.1,
        );
        const snapToDistancePositive: Record<number, SnapPair> = {};
        const snapToDistanceNegative: Record<number, SnapPair> = {};
        aligned.forEach((a) => {
            const snapVal = snapComponent(a.positive?.moved || a.negative!.moved);
            if (a.positive) {
                const existing = snapToDistancePositive[snapVal];
                if (!existing || a.positive.distance > existing.distance) {
                    snapToDistancePositive[snapVal] = a.positive;
                }
            }
            if (a.negative) {
                const existingNegative = snapToDistanceNegative[snapVal];
                if (existingNegative && a.negative.distance < existingNegative.distance) {
                    return;
                }
                const existingPositive = snapToDistancePositive[snapVal];
                let interfers =
                    existingPositive && distanceComponent(existingPositive.moved) < distanceComponent(a.negative.moved);
                if (interfers && a.negative.distance > existingPositive.distance) {
                    delete snapToDistancePositive[snapVal];
                    interfers = false;
                }
                if (!interfers) {
                    snapToDistanceNegative[snapVal] = a.negative;
                }
            }
        });
        return [...Object.values(snapToDistancePositive), ...Object.values(snapToDistanceNegative)];
    }

    private closestSnap(
        moved: Point[],
        snapComponent: (p: Point) => number,
        distanceComponent: (p: Point) => number,
    ): SnapPair | null {
        return minByValue(
            this.bestSnaps(moved, snapComponent, distanceComponent).map((c) => c.positive || c.negative),
            (b) => b?.snapDistance || Infinity,
        );
    }

    private bestSnaps(
        moved: Point[],
        snapComponent: (p: Point) => number,
        distanceComponent: (p: Point) => number,
    ): { positive: SnapPair | null; negative: SnapPair | null }[] {
        return moved.map((moved) => {
            if (this.snapPoints.length === 0) {
                return { positive: null, negative: null };
            }
            const pairs = this.snapPoints.map((snap) => {
                const snapDelta = snapComponent(snap) - snapComponent(moved);
                const distanceDelta = distanceComponent(snap) - distanceComponent(moved);
                return {
                    moved,
                    snap,
                    snapDelta,
                    snapDistance: Math.abs(snapDelta),
                    distanceDelta,
                    distance: Math.abs(distanceDelta),
                };
            });
            const pairsPositiveDistance = pairs.filter((p) => p.distanceDelta >= 0);
            const pairsNegativeDistance = pairs.filter((p) => p.distanceDelta < 0);
            const compare = (x: SnapPair, y: SnapPair) =>
                x.snapDistance === y.snapDistance ? y.distance - x.distance : x.snapDistance - y.snapDistance;
            let positive: SnapPair | null = minByCompare(pairsPositiveDistance, compare);
            let negative: SnapPair | null = minByCompare(pairsNegativeDistance, compare);
            if (positive && negative && positive.snapDistance < negative.snapDistance) {
                negative = null;
            } else if (positive && negative && negative.snapDistance < positive.snapDistance) {
                positive = null;
            }
            return { positive, negative };
        });
    }
}
