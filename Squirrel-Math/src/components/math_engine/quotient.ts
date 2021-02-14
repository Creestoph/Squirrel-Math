import { Expression } from './expression';
import { Integer, instanceOfNumber } from './numbers';
import { Sum } from './sum';
import { Product } from './product';
import { gcd } from './algebraic_algorithms';
import { Variable } from './variable';
import { Power } from './power';

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
        if (this.numerator instanceof Quotient) {
            this.denominator = Product.of(this.denominator, this.numerator.denominator).simplify();
            this.numerator = this.numerator.numerator;
        }
        if (this.denominator instanceof Quotient) {
            this.numerator = Product.of(this.numerator, this.denominator.denominator).simplify();
            this.denominator = this.denominator.numerator;
        }
        if (!(this.numerator instanceof Product))
            this.numerator = Product.of(this.numerator);
        if (!(this.denominator instanceof Product))
            this.denominator = Product.of(this.denominator);
        let n = (this.numerator as Product);
        let d = (this.denominator as Product);
        if ((this.numerator as Product).factors.length > 0 && (this.numerator as Product).factors[0] instanceof Integer && 
            (this.denominator as Product).factors.length > 0 && (this.denominator as Product).factors[0] instanceof Integer) {
            let g: number = gcd((n.factors[0] as Integer).int, (d.factors[0] as Integer).int);
            n.factors[0] = (n.factors[0] as Integer).divide(new Integer(g));
            d.factors[0] = (d.factors[0] as Integer).divide(new Integer(g));
        }
        for (let i = 0; i < n.factors.length; i++) 
            if (!(n.factors[i] instanceof Power))
                n.factors[i] = new Power(n.factors[i], Integer.one);
        for (let i = 0; i < d.factors.length; i++) 
            if (!(d.factors[i] instanceof Power))
                d.factors[i] = new Power(d.factors[i], Integer.one);
        for (let i = 0; i < n.factors.length; i++)
            for (let j = 0; j < d.factors.length; j++) {
                if ((n.factors[i] as Power).base.equals((d.factors[j] as Power).base)) {
                    (n.factors[i] as Power).exponent = Sum.of((n.factors[i] as Power).exponent, Product.of(new Integer(-1), (d.factors[j] as Power).exponent));
                    d.factors.splice(j--, 1); 
                }

            }
        this.numerator = this.numerator.simplify();
        this.denominator = this.denominator.simplify();
        if (instanceOfNumber(this.denominator))
            return Product.of(Integer.one.divide(this.denominator), this.numerator).simplify();
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