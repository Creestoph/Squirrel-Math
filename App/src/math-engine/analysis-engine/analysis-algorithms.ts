import { Variable } from '../algebra-engine/variable';
import { Function } from './function';
import { Expression } from '../algebra-engine/expression';
import { Sum } from '../algebra-engine/sum';
import { Integer } from '../algebra-engine/numbers';
import { Product } from '../algebra-engine/product';
import { Quotient } from '../algebra-engine/quotient';
import { Power } from '../algebra-engine/power';
import { Logarithm } from '../algebra-engine/logarithm';
import { simplify } from '../algebra-engine/algorithms/simplification-algorithm';

function derivativeVariable(e: Variable, v: Variable) {
    return e.identical(v) ? Integer.one : Integer.zero;
}

function derivativeSum(e: Sum, v: Variable) {
    return Sum.of(...e.addends.map((a) => derivativeExpression(a, v)));
}

function derivativeProduct(e: Product, v: Variable) {
    return Sum.of(
        ...e.factors.map((f, i) => {
            let factors = [derivativeExpression(f, v), ...e.factors.filter((ef, j) => j != i)];
            return Product.of(...factors);
        }),
    );
}

function derivativeQuotient(e: Quotient, v: Variable) {
    return new Quotient(
        Sum.difference(
            Product.of(derivativeExpression(e.numerator, v), e.denominator),
            Product.of(e.numerator, derivativeExpression(e.denominator, v)),
        ),
        new Power(e.denominator, new Integer(2)),
    );
}

function derivativePower(e: Power, v: Variable) {
    return Sum.of(
        Product.of(
            e.exponent,
            new Power(e.base, Sum.difference(e.exponent, Integer.one)),
            derivativeExpression(e.base, v),
        ),
        Product.of(e, new Logarithm(e.base), derivativeExpression(e.exponent, v)),
    );
}

function derivativeExpression(e: Expression, v: Variable): Expression {
    if (e instanceof Variable) return derivativeVariable(e, v);
    if (e instanceof Sum) return derivativeSum(e, v);
    if (e instanceof Product) return derivativeProduct(e, v);
    if (e instanceof Quotient) return derivativeQuotient(e, v);
    if (e instanceof Power) return derivativePower(e, v);
    return Integer.zero;
}

export function derivative(f: Function, v: Variable): Function {
    return new Function(simplify(derivativeExpression(f.formula, v)), f.variables);
}

export function gradient(f: Function) {
    return f.variables.map((v) => derivative(f, v));
}
