import { Figure } from './figure';
import { Expression } from '../algebra-engine/expression';
import { Integer, Number } from '../algebra-engine/numbers';
import { Point } from './point';
import { Vector } from './vector';
import paper from "paper";

export class Segment implements Figure {
    readonly p1: Point
    readonly p2: Point
    readonly name?: string;
    constructor(p1: Point, p2: Point, name?: string) {
        this.p1 = p1;
        this.p2 = p2;
        this.name = name;
    }
    draw() {
        if (this.p1.x instanceof Number && this.p1.y instanceof Number && this.p2.x instanceof Number && this.p2.y instanceof Number) {
            let segment = new paper.Path([new paper.Point(this.p1.x.numeric(), this.p1.y.numeric()), 
                new paper.Point(this.p2.x.numeric(), this.p2.y.numeric())]);
            segment.strokeColor = new paper.Color(0.7, 0.7, 0.7);
            segment.strokeWidth = 4;
        }
    }
    translated(v: Vector): Segment {
        return new Segment(this.p1.translated(v), this.p2.translated(v), this.name);
    }
    scaled(scale: Expression, p: Point = new Point(Integer.zero, Integer.zero)): Segment {
        return new Segment(this.p1.scaled(scale, p), this.p2.scaled(scale, p), this.name);
    }
    length(): Expression {
        return this.p1.distanceTo(this.p2);
    }
}