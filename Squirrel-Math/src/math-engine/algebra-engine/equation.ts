import { Expression, parseExpression } from './expression';
import { AlgebraicNotion } from './algebraic-notion';
import { Sum } from './sum';
import { Integer, Number } from './numbers';
import { Quotient } from './quotient';
import { extractConstantFactor } from './algorithms/general-algorithms';
import { simplify } from './algorithms/simplification-algorithm';
import { Power } from './power';

export class Equation implements AlgebraicNotion {
    readonly left: Expression;
    readonly right: Expression;
    //static readonly identity = new Equation(Integer.zero, Integer.zero);

    constructor(left: Expression, right: Expression) {
        this.left = left;
        this.right = right;
    }

    copy(): Equation {
        return new Equation(this.left.copy(), this.right.copy());
    }

    toMathJax(): string {
        return this.left.toMathJax() + " = " + this.right.toMathJax();
    }

    simplified(): Equation {
        let left = simplify(Sum.difference(this.left, this.right));
        if (left instanceof Quotient)
            left = left.numerator;
        left = extractConstantFactor(left).factors[1];
        if (left instanceof Power)
            left = left.base;
        return new Equation(left, Integer.zero);
    }

    substitute(old: Expression, e: Expression): Equation {
        return new Equation(this.left.substitute(old, e), this.right.substitute(old, e));
    }
}

export function parseEquation(text: string): Equation {
    let sides = text.split("=");
    if (sides.length != 2)
        throw new Error("Equation should contain exactly one equality sign");
    return new Equation(parseExpression(sides[0]), parseExpression(sides[1]));
}