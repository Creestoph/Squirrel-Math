import { Expression } from './expression';
import { AlgebraicNotion } from './algebraic-notion';
import { Sum } from './sum';
import { Product } from './product';
import { Integer, Number } from './numbers';
import { Quotient } from './quotient';
import { extractConstantFactor } from './algorithms/general-algorithms';
import { Polynomial } from './polynomial';
import { Interval } from '../set-engine/interval';
import { solveInequality } from './algorithms/equation-algorithms';
import { simplify, equals } from './algorithms/simplification-algorithm';

export enum InequalitySign {
    LESS,
    LESS_EQUAL,
    GREATER,
    GREATER_EQUAL
};

export class Inequality implements AlgebraicNotion {
    left: Expression;
    right: Expression;
    sign: InequalitySign;

    constructor(left: Expression, sign: InequalitySign, right: Expression) {
        this.left = left;
        this.right = right;
        this.sign = sign;
    }

    static oppositeSign(sign: InequalitySign): InequalitySign {
        switch(sign) {
            case InequalitySign.LESS: return InequalitySign.GREATER;
            case InequalitySign.LESS_EQUAL: return InequalitySign.GREATER_EQUAL;
            case InequalitySign.GREATER: return InequalitySign.LESS;
            case InequalitySign.GREATER_EQUAL: return InequalitySign.LESS_EQUAL;
        }
    }

    copy(): Inequality {
        return new Inequality(this.left.copy(), this.sign, this.right.copy());
    }

    toMathJax(): string {
        switch(this.sign) {
            case InequalitySign.LESS: return this.left.toMathJax() + " < " + this.right.toMathJax();
            case InequalitySign.LESS_EQUAL: return this.left.toMathJax() + " \\leq " + this.right.toMathJax();
            case InequalitySign.GREATER: return this.left.toMathJax() + " > " + this.right.toMathJax();
            case InequalitySign.GREATER_EQUAL: return this.left.toMathJax() + " \\geq " + this.right.toMathJax();
        }
    }

    simplified(): Inequality {
        this.left = simplify(Sum.difference(this.left, this.right));
        if (this.left instanceof Quotient)
            this.left = Product.of(this.left.numerator, this.left.denominator);
        let extraction = extractConstantFactor(this.left);
        this.left = extraction.factors[1];
        if (extraction.factors[0].isNegative())
            this.sign = Inequality.oppositeSign(this.sign);
        this.right = Integer.zero;
        return this;
    }

    substitute(old: Expression, e: Expression): Inequality {
        this.left = this.left.substitute(old, e);
        this.right = this.right.substitute(old, e);
        return this;
    }
}