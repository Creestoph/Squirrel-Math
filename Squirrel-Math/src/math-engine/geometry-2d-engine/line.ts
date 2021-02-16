import { Figure } from './figure';
import { Expression } from '../algebra-engine/expression';
import { Equation } from '../algebra-engine/equation';
import { Variable } from '../algebra-engine/variable';
import { Sum } from '../algebra-engine/sum';
import { Product } from '../algebra-engine/product';
import { Point } from './point';
import { Integer, Number } from '../algebra-engine/numbers';
import { Quotient } from '../algebra-engine/quotient';
import paper from "paper";
import { Vector } from './vector';
import { simplify, equals } from '../algebra-engine/algorithms/simplification-algorithm';

export class Line implements Figure {
    readonly a: Expression;
    readonly b: Expression;
    readonly c: Expression;
    readonly name?: string;

    private constructor(a: Expression, b: Expression, c: Expression, name?: string) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.name = name;
    }

    static general(a: Expression, b: Expression, c: Expression, name?: string): Line {
        return new Line(a, b, c, name);
    }

    static directional(a: Expression, b: Expression, name?: string): Line {
        return new Line(a, Integer.minusOne, b, name);
    }

    static vertical(x: Expression, name?: string): Line {
        return new Line(Integer.one, Integer.zero, simplify(Product.of(Integer.minusOne, x)), name);
    }

    static hotizontal(y: Expression, name?: string): Line {
        return new Line(Integer.zero, Integer.one, simplify(Product.of(Integer.minusOne, y)), name);
    }

    static fromPoints(p1: Point, p2: Point, name?: string): Line {
        return new Line(Sum.difference(p2.y, p1.y), Sum.difference(p1.x, p2.x), 
            Sum.difference(Product.of(p2.x, p1.y), Product.of(p1.x, p2.y)), name);
    }

    static *nameGenerator(): Generator<string, string, string> {
        for (let i = 1; ; i++)
            for (let j = 0; j < 14; j++)
                yield String.fromCharCode('a'.charCodeAt(0) + j) + (i == 1 ? "" : "_" + i);
    }
    static *Agenerator(): Generator<number, void, number> {
        for (let i = 0; ; i++)
            yield Math.tan(10 + i*10*Math.sqrt(10));
    }
    static *Bgenerator(min: number, max: number): Generator<number, void, number> {
        while(true)
            yield min + Math.random()*(max - min);
    }
    isVertical() {
        return equals(this.b, Integer.zero);
    }
    draw() {
        if (this.a instanceof Number && this.b instanceof Number && this.c instanceof Number) {
            let line;
            if (!this.isVertical()) {
                let x1 = -1000;
                let y1 = (simplify(this.directionalEquation(new Integer(-1000)).right) as Number).numeric();
                let x2 = 1000;
                let y2 = (simplify(this.directionalEquation(new Integer(1000)).right) as Number).numeric();
                line = new paper.Path([new paper.Point(x1, y1), new paper.Point(x2, y2)]);
            }
            else {
                let x = this.c.opposite().divide(this.a).numeric();
                line = new paper.Path([new paper.Point(x, -1000), new paper.Point(x, 1000)]);
            }
            line.strokeColor = new paper.Color(0.3, 0.3, 0.3);
            line.strokeWidth = 4;
        }
    }

    translated(v: Vector): Line {
        return new Line(this.a, this.b, simplify(Sum.of(this.c, Product.of(Integer.minusOne, this.a, v.x), 
            Product.of(Integer.minusOne, this.b, v.y))), this.name);
    }
    scaled(scale: Expression, p: Point = new Point(Integer.zero, Integer.zero)): Line {
        let result = this.translated(Vector.fromPoint(p).opposite());
        result = new Line(result.a, result.b, simplify(Product.of(this.c!, scale)), this.name);
        return result.translated(Vector.fromPoint(p));
    }

    directionalEquation(paramX: Expression = new Variable("x"), paramY: Expression = new Variable("y")): Equation {
        if (this.isVertical())
            throw "Line " + this.name + " has no directional equation as it is vertical";
        let aDirectional = Product.of(Integer.minusOne, new Quotient(this.a, this.b));
        let bDirectional = Product.of(Integer.minusOne, new Quotient(this.c, this.b));
        return new Equation(paramY, Sum.of(Product.of(aDirectional, paramX), bDirectional));
    }

    generalEquation(paramX: Expression = new Variable("x"), paramY: Expression = new Variable("y")): Equation {
        return new Equation(Sum.of(Product.of(this.a, paramX), Product.of(this.b, paramY), this.c), Integer.zero);
    }
}