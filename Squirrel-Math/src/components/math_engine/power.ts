import { Expression } from './expression';
import { Integer } from './number';

export class Power implements Expression {
    base: Expression;
    exponent: Expression;
    constructor(base: Expression, exponent: Expression) {
        this.base = base;
        this.exponent = exponent;
    }

    toMathJax(): string {
        return (this.base.precedence() <= this.precedence() ? "(" + this.base.toMathJax() + ")" :  "{" + this.base.toMathJax() + "}") + "^{" + this.exponent.toMathJax() + "}";
    }

    isNegative(): boolean {
        return false;
    }

    simplify(): Expression {
        this.base = this.base.simplify();
        this.exponent = this.exponent.simplify();
        if (this.exponent.equals(new Integer(0)))
            return new Integer(1);
        else if (this.exponent.equals(new Integer(1)))
            return this.base;
        else if (this.base.equals(new Integer(0)))
            return new Integer(0);
        else if (this.base.equals(new Integer(1)))
            return new Integer(1);
        return this;
    }

    equals(): boolean {
        return false;
    }

    precedence(): number {
        return 3;
    }
}