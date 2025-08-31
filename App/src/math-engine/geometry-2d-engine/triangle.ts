import { Figure } from './figure';
import { Expression } from '../algebra-engine/expression';
import { Integer, Number } from '../algebra-engine/numbers';
import { Point } from './point';
import { Vector } from './vector';
import paper from 'paper';
import { Segment } from './segment';

export class Triangle implements Figure {
    readonly p1: Point;
    readonly p2: Point;
    readonly p3: Point;
    readonly name?: string;
    readonly segment12: Segment;
    readonly segment13: Segment;
    readonly segment23: Segment;

    constructor(p1: Point, p2: Point, p3: Point, name?: string) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        if (name) this.name = name;
        else if (p1.name && p2.name && p3.name) this.name = p1.name + p2.name + p3.name;
        this.segment12 = new Segment(p1, p2);
        this.segment13 = new Segment(p1, p3);
        this.segment23 = new Segment(p2, p3);
    }
    draw() {
        if (
            this.p1.x instanceof Number &&
            this.p1.y instanceof Number &&
            this.p2.x instanceof Number &&
            this.p2.y instanceof Number &&
            this.p3.x instanceof Number &&
            this.p3.y instanceof Number
        ) {
            let v1 = new paper.Point(this.p1.x.numeric(), this.p1.y.numeric());
            let v2 = new paper.Point(this.p2.x.numeric(), this.p2.y.numeric());
            let v3 = new paper.Point(this.p3.x.numeric(), this.p3.y.numeric());
            let border = new paper.Path([v1, v2, v3, v1]);
            border.strokeColor = new paper.Color(0.7, 0.7, 0.7);
            border.strokeWidth = 4;
        }
    }
    translated(v: Vector): Triangle {
        return new Triangle(this.p1.translated(v), this.p2.translated(v), this.p3.translated(v), this.name);
    }
    scaled(scale: Expression, p: Point = new Point(Integer.zero, Integer.zero)): Triangle {
        return new Triangle(this.p1.scaled(scale, p), this.p2.scaled(scale, p), this.p3.scaled(scale, p), this.name);
    }
}
