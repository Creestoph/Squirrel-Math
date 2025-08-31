import { Expression } from '../expression';
import { Integer, Number, Fraction, Infty, Decimal } from '../numbers';
import { Sum } from '../sum';
import { Product } from '../product';
import { Power } from '../power';
import { Quotient } from '../quotient';
import { numericGCD, numericLCM } from './numeric-algorithms';
import { simplify } from './simplification-algorithm';

export function numericValue(e: Expression): Decimal | Expression {
    if (e instanceof Quotient) {
        return simplify(new Quotient(numericValue(e.numerator), numericValue(e.denominator)));
    }
    if (e instanceof Sum) {
        return simplify(Sum.of(...e.addends.map((a) => numericValue(a))));
    }
    if (e instanceof Product) {
        return simplify(Product.of(...e.factors.map((a) => numericValue(a))));
    }
    if (e instanceof Power) {
        return simplify(new Power(numericValue(e.base), numericValue(e.exponent)));
    }
    if (e instanceof Number) {
        return new Decimal(e.numeric());
    }
    return e;
}

//returns product: (number)*(extracted expression)
export function extractConstantFactor(e: Expression): Product {
    let coefficients = standardForm(e).addends.map((a) => (a as Product).factors[0] as Number);
    const denominators = coefficients.filter((c) => c instanceof Fraction).map((c) => (c as Fraction).denominator.int);
    const commonDenominator = new Integer(numericLCM(...denominators));
    coefficients = coefficients.map((c) => simplify(c.multiply(commonDenominator)) as Number);
    let gcd = numericGCD(...coefficients.filter((c) => c instanceof Integer).map((c) => (c as Integer).int));
    if (gcd instanceof Infty) {
        gcd = BigInt(1);
    }
    if (coefficients[0] && coefficients[0].isNegative()) {
        gcd = -gcd;
    }
    const constantFactor = simplify(new Fraction(gcd, commonDenominator.int)) as Number;
    return Product.of(constantFactor, simplify(Product.of(constantFactor.inverse(), e)));
}

//returns product: (number)*(extracted expression)
export function extractMonomialFactor(e: Expression): Product {
    const numberExtraction = extractConstantFactor(e);
    const extractFactors: Expression[] = [numberExtraction.factors[0]];

    let addends = standardForm(e).addends;
    if (addends.length == 0) {
        return Product.of(Integer.one, Integer.zero);
    }
    (addends[0] as Product).factors
        .filter((f, i) => i > 0)
        .forEach((f) => {
            let b: Expression, minExponent: bigint;
            if (f instanceof Power && f.exponent instanceof Integer) {
                b = f.base;
                minExponent = f.exponent.int;
            } else {
                b = f;
                minExponent = BigInt(1);
            }
            if (
                addends
                    .filter((a, i) => i > 0)
                    .every((a) =>
                        (a as Product).factors.some((g) => {
                            if (
                                g instanceof Power &&
                                g.base.identical(b) &&
                                g.exponent instanceof Integer &&
                                g.exponent.int <= minExponent
                            ) {
                                return (minExponent = g.exponent.int);
                            } else if (g.identical(b)) {
                                return (minExponent = BigInt(1));
                            }
                            return 0;
                        }),
                    )
            ) {
                extractFactors.push(minExponent == BigInt(1) ? b : new Power(b, new Integer(minExponent)));
            }
        });

    const extract = Product.of(...extractFactors);
    addends = addends.map((a) => simplify(new Quotient(a, extract)));
    return Product.of(extract, Sum.of(...addends));
}

export function standardForm(e: Expression): Sum {
    let resultAddends;
    if (e instanceof Sum) {
        resultAddends = [...e.addends];
    } else {
        resultAddends = [e];
    }
    for (let i = 0; i < resultAddends.length; i++) {
        let resultFactors;
        if (!(resultAddends[i] instanceof Product)) {
            resultFactors = [resultAddends[i]];
        } else {
            resultFactors = [...(resultAddends[i] as Product).factors];
        }
        if (!(resultFactors[0] instanceof Number)) {
            resultFactors.unshift(Integer.one);
        }
        for (let j = 1; j < resultFactors.length; j++) {
            if (!(resultFactors[j] instanceof Power)) {
                resultFactors[j] = new Power(resultFactors[j], Integer.one);
            }
        }
        resultAddends[i] = Product.of(...resultFactors);
    }
    return Sum.of(...resultAddends);
}
