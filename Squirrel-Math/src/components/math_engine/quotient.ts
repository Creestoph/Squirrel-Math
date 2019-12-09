import { Expression } from './expression';
import { Integer, Number, instanceOfNumber } from './number';
import { Sum } from './sum';
import { Product } from './product';
import { Variable } from './variable';

export class Quotient implements Expression {
    numerator: Expression;
    denominator: Expression;
    constructor(numerator: Expression, denominator: Expression) {
        this.numerator = numerator;
        this.denominator = denominator;
    }

    toMathJax(): string {
        return "\\frac{" + this.numerator.toMathJax() + "}{" + this.denominator.toMathJax() + "}";
    }

    isNegative(): boolean {
        return false;
    }

    simplify(): Expression {
        this.numerator = this.numerator.simplify();
        this.denominator = this.denominator.simplify();
        if (this.numerator.equals(Integer.zero))
            return Integer.zero;
        if (this.denominator.equals(Integer.one))
            return this.numerator;
        if (this.numerator instanceof Quotient) {
            this.denominator = Product.of(this.denominator, this.numerator.denominator).simplify();
            this.numerator = this.numerator.numerator;
        }
        if (this.denominator instanceof Quotient) {
            this.numerator = Product.of(this.numerator, this.denominator.denominator).simplify();
            this.denominator = this.denominator.numerator;
        }
        return this;
    }

    equals(other: Expression): boolean {
        if (other instanceof Quotient)
            return this.numerator.equals(other.numerator) && this.denominator.equals(other.denominator);
        return false;
    }

    precedence(): number {
        return 2;
    }

    inSumBefore(other: Expression): boolean {
        if (other instanceof Sum)
            return false;
        return true;
    }
    inProductBefore(other: Expression): boolean {
        if (other instanceof Product)
            return false;
        return true;
    }
}