import { Equation } from './equation';
import { Expression } from './expression';
import { Variable } from './variable';
import { Product } from './product';
import { Power } from './power';
import { Integer, Fraction } from './numbers';
import { Sum } from './sum';
import { Quotient } from './quotient';
import { Inequality, InequalitySign } from './inequality';
import { equals } from './algorithms/simplification-algorithm';
import { isInequalityIdentity } from './algorithms/equation-algorithms';

export class QuadraticEquation extends Equation {
    a: Expression;
    b: Expression;
    c: Expression;
    x: Variable;

    constructor(a: Expression, b: Expression, c: Expression, x: Variable) {
        super(Sum.of(Product.of(a, new Power(x, new Integer(2)), Product.of(b, x), c)), Integer.zero);
        if (equals(a, Integer.zero))
            throw new Error("coefficient by x^2 is zero in quadratic equation " + this.toMathJax());
        this.a = a;
        this.b = b;
        this.c = c;
        this.x = x;
    }

    solve(): Expression[] {
        let delta = Sum.difference(new Power(this.b, new Integer(2)), Product.of(new Integer(4), this.a, this.c));
        let denominator = Product.of(new Integer(2), this.a);
        if (isInequalityIdentity(new Inequality(delta, InequalitySign.LESS, Integer.zero)))
            return [];
        else if (equals(delta, Integer.zero))
            return [new Quotient(Product.of(Integer.minusOne, this.b), denominator)];
        else 
            return [new Quotient(Sum.of(Product.of(Integer.minusOne, this.b), new Power(delta, new Fraction(1, 2))), denominator), 
                new Quotient(Sum.difference(Product.of(Integer.minusOne, this.b), new Power(delta, new Fraction(1, 2))), denominator)]; 
    }
}