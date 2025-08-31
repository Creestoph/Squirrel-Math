import { Figure } from './figure';
import { Expression } from '../algebra-engine/expression';
import { Power } from '../algebra-engine/power';
import { Sum } from '../algebra-engine/sum';
import { Integer, Fraction, Number } from '../algebra-engine/numbers';
import paper from 'paper';
import { Vector } from './vector';
import { Product } from '../algebra-engine/product';
import { simplify } from '../algebra-engine/algorithms/simplification-algorithm';

export class Point implements Figure {
    readonly x: Expression;
    readonly y: Expression;
    readonly name?: string;
    constructor(x: Expression, y: Expression, name?: string) {
        this.x = x;
        this.y = y;
        this.name = name;
    }
    static *nameGenerator(): Generator<string, string, string> {
        for (let i = 1; ; i++)
            for (let j = 0; j < 27; j++)
                yield String.fromCharCode('A'.charCodeAt(0) + j) +
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

    draw() {
        if (this.x instanceof Number && this.y instanceof Number) {
            let point = new paper.Path.Circle(
                new paper.Point(this.x.numeric(), this.y.numeric()),
                8,
            );
            point.fillColor = new paper.Color(0.95, 0.3, 0.3);
        }
    }

    translated(v: Vector): Point {
        return new Point(
            simplify(Sum.of(this.x, v.x)),
            simplify(Sum.of(this.y, v.y)),
            this.name,
        );
    }
    scaled(
        scale: Expression,
        p: Point = new Point(Integer.zero, Integer.zero),
    ): Point {
        return new Point(
            simplify(
                Sum.of(p.x, Product.of(Sum.difference(this.x, p.x), scale)),
            ),
            simplify(
                Sum.of(p.y, Product.of(Sum.difference(this.y, p.y), scale)),
            ),
            this.name,
        );
    }

    distanceTo(p: Point): Power {
        return new Power(
            Sum.of(
                new Power(Sum.difference(p.x, this.x), new Integer(2)),
                new Power(Sum.difference(p.y, this.y), new Integer(2)),
            ),
            new Fraction(1, 2),
        );
    }
}
