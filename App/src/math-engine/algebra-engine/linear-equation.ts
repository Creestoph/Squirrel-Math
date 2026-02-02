import { Equation } from './equation';
import { Expression } from './expression';
import { Variable } from './variable';
import { Product } from './product';
import { Integer } from './numbers';
import { Sum } from './sum';
import { Quotient } from './quotient';
import { equals } from './algorithms/simplification-algorithm';

export class LinearEquation extends Equation {
    a: Expression;
    b: Expression;
    x: Variable;

    constructor(a: Expression, b: Expression, x: Variable) {
        super(Sum.of(Product.of(a, x), b), Integer.zero);
        if (equals(a, Integer.zero)) throw new Error('coefficient by x is zero in linear equation ' + this.toLatex());
        this.a = a;
        this.b = b;
        this.x = x;
    }

    solve(): Expression {
        return new Quotient(Product.of(Integer.minusOne, this.b), this.a);
    }
}
