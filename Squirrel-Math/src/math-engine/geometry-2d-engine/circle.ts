import { Figure } from './figure';
import { Expression } from '../algebra-engine/expression';
import { Equation } from '../algebra-engine/equation';
import { Product } from '../algebra-engine/product';
import { Power } from '../algebra-engine/power';
import { Variable } from '../algebra-engine/variable';
import { Integer, Number } from '../algebra-engine/numbers';
import { Point } from './point';
import paper from 'paper';
import { Vector } from './vector';
import { simplify } from '../algebra-engine/algorithms/simplification-algorithm';

export class Circle implements Figure {
    readonly center: Point;
    readonly r: Expression;
    readonly name?: string;

    constructor(center: Point, r: Expression, name?: string) {
        this.center = center;
        this.r = r;
        this.name = name;
    }

    static *nameGenerator(): Generator<string, string, string> {
        for (let i = 1; ; i++)
            for (let j = 14; j < 27; j++)
                yield String.fromCharCode('a'.charCodeAt(0) + j) +
                    (i == 1 ? '' : '_' + i);
    }
    static *Xgenerator(
        min: number,
        max: number,
    ): Generator<number, void, number> {
        while (true) yield min + Math.random() * (max - min);
    }
    static *Ygenerator(
        min: number,
        max: number,
    ): Generator<number, void, number> {
        while (true) yield min + Math.random() * (max - min);
    }
    static *Rgenerator(size: number): Generator<number, void, number> {
        for (let i = 0; ; i++) yield size + size * 0.2 * Math.random();
    }
    draw() {
        if (
            this.center.x instanceof Number &&
            this.center.y instanceof Number &&
            this.r instanceof Number
        ) {
            let circle = new paper.Path.Circle(
                new paper.Point(
                    this.center.x.numeric(),
                    this.center.y.numeric(),
                ),
                this.r.numeric(),
            );
            circle.strokeColor = new paper.Color(0.95, 0.3, 0.3);
            circle.strokeWidth = 4;
        }
    }

    translated(v: Vector): Circle {
        return new Circle(this.center.translated(v), this.r);
    }
    scaled(
        scale: Expression,
        p: Point = new Point(Integer.zero, Integer.zero),
    ): Circle {
        return new Circle(
            this.center.scaled(scale, p),
            simplify(Product.of(this.r, scale)),
        );
    }

    equation(
        paramX: Expression = new Variable('x'),
        paramY: Expression = new Variable('y'),
    ): Equation {
        return new Equation(
            (this.center.distanceTo(new Point(paramX, paramY)) as Power).base,
            new Power(this.r, new Integer(2)),
        );
    }
}
