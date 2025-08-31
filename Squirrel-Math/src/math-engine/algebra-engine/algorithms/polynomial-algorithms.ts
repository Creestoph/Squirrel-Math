import { Monomial } from '../monomial';
import { Polynomial } from '../polynomial';
import { Integer, Fraction, Infty, Number } from '../numbers';
import { Product } from '../product';
import { Quotient } from '../quotient';
import { Power } from '../power';
import { UnivariatePolynomial } from '../univariate-polynomial';
import { Sum } from '../sum';
import { Variable } from '../variable';
import { Expression } from '../expression';
import { extractConstantFactor } from './general-algorithms';
import { numericGCD, factorizeNumber } from './numeric-algorithms';
import { equals, simplify, productOrder } from './simplification-algorithm';
import { standardForm } from './general-algorithms';
import { Order } from '../../set-engine/order';

//TODO: GCD for polynomials
export function GCD(...values: Expression[]): Expression {
    const gcdFor2Args = function (a: Expression, b: Expression): Expression {
        if (
            (a instanceof Infty || a.identical(Integer.zero)) &&
            (b instanceof Infty || b.identical(Integer.zero))
        )
            return Infty.positive;
        if (a instanceof Infty || a.identical(Integer.zero))
            return b instanceof Infty ? Infty.positive : b;
        if (b instanceof Infty || b.identical(Integer.zero)) return a;

        if (equals(a, b)) return a;
        if (a instanceof Integer && b instanceof Integer) {
            const gcd = numericGCD(a.int, b.int);
            if (gcd instanceof Infty) return gcd;
            return new Integer(gcd);
        }
        const m1 = Monomial.asMonomial(a);
        const m2 = Monomial.asMonomial(b);
        if (m1.variables.length > 0 && m2.variables.length > 0) {
            let i = 0,
                j = 0;
            const coefficient = GCD(m1.coefficient, m2.coefficient) as Number;
            const variables: Variable[] = [];
            const exponents: Integer[] = [];
            while (i < m1.variables.length && j < m2.variables.length) {
                if (productOrder(m2.variables[j], m1.variables[i]) < 0) j++;
                else if (productOrder(m1.variables[i], m2.variables[j]) < 0)
                    i++;
                else if (m1.variables[i].identical(m2.variables[j])) {
                    variables.push(m1.variables[i]);
                    exponents.push(
                        new Integer(
                            Math.min(
                                m1.exponentVector[i].numeric(),
                                m2.exponentVector[j].numeric(),
                            ),
                        ),
                    );
                    i++;
                    j++;
                }
            }
            return new Monomial(coefficient, variables, exponents);
        }
        return Integer.one;
    };

    if (values.length == 0) return Infty.positive;
    return values.reduce(
        (gcd: Expression, v) => gcdFor2Args(gcd, v),
        Integer.zero,
    );
}

export function LCM(...values: Expression[]): Expression {
    const lcmFor2Args = function (a: Expression, b: Expression): Expression {
        const result = simplify(new Quotient(Product.of(a, b), GCD(a, b)));
        // if (Monomial.isMonomial(a) && Monomial.isMonomial(b))
        //     return Monomial.asMonomial(result) as Monomial;
        return result;
    };
    return values.reduce((gcd, v) => lcmFor2Args(gcd, v), Integer.one);
}

export const monomialLexOrder = new Order((m1: Monomial, m2: Monomial) => {
    m1 = m1.cleaned();
    m2 = m2.cleaned();
    for (let i = 0; ; i++) {
        if (i == m1.variables.length && i == m2.variables.length) return 0;
        if (i == m1.variables.length) return -1;
        if (i == m2.variables.length) return 1;
        const po = productOrder(m1.variables[i], m2.variables[i]);
        if (po != 0) return -po;
        if (m1.exponentVector[i].int < m2.exponentVector[i].int) return -1;
        if (m2.exponentVector[i].int < m1.exponentVector[i].int) return 1;
    }
});

export const monomialGLexOrder = new Order((m1: Monomial, m2: Monomial) => {
    m1 = m1.cleaned();
    m2 = m2.cleaned();
    const m1ExpSum = m1.exponentVector.reduce(
        (sum, v) => (sum += v.numeric()),
        0,
    );
    const m2ExpSum = m2.exponentVector.reduce(
        (sum, v) => (sum += v.numeric()),
        0,
    );
    if (m1ExpSum > m2ExpSum) return 1;
    if (m1ExpSum < m2ExpSum) return -1;
    for (let i = 0, j = 0; ; i++, j++) {
        if (i == m1.variables.length && j == m2.variables.length) return 0;
        const po = productOrder(m1.variables[i], m2.variables[j]);
        if (po != 0) return -po;
        if (m1.exponentVector[i].int < m2.exponentVector[j].int) return -1;
        if (m2.exponentVector[j].int < m1.exponentVector[i].int) return 1;
    }
});

export const monomialGRevLexOrder = new Order((m1: Monomial, m2: Monomial) => {
    m1 = m1.cleaned();
    m2 = m2.cleaned();
    const m1ExpSum = m1.exponentVector.reduce(
        (sum, v) => (sum += v.numeric()),
        0,
    );
    const m2ExpSum = m2.exponentVector.reduce(
        (sum, v) => (sum += v.numeric()),
        0,
    );
    if (m1ExpSum > m2ExpSum) return 1;
    if (m1ExpSum < m2ExpSum) return -1;
    for (
        let i = m1.variables.length - 1, j = m2.variables.length - 1;
        ;
        i--, j--
    ) {
        if (i == -1 && j == -1) return 0;
        const po = productOrder(m1.variables[i], m2.variables[j]);
        if (po != 0) return -po;
        if (m1.exponentVector[i].int < m2.exponentVector[j].int) return 1;
        if (m2.exponentVector[j].int < m1.exponentVector[i].int) return -1;
    }
});

//p = 1/extractedDenominator(base*quotient + remainder)
export function multivariateDivision(
    p: Polynomial,
    base: Polynomial[],
    order = monomialGRevLexOrder,
    variables?: Variable[],
): {
    quotient: Polynomial[];
    remainder: Polynomial;
    extractedDenominator: Expression;
} {
    base = base
        .filter((p) => !equals(p, Integer.zero))
        .map((b) => Polynomial.asPolynomial(b.cleaned(), variables, order));
    p = Polynomial.asPolynomial(p.cleaned(), variables, order);

    let remainderAddends: Monomial[] = [];
    const quotientAddends: Monomial[][] = base.map(() => []);
    const extractedDenominatorFactors: Expression[] = [];
    let reduced = true;
    while (p.addends.length > 0) {
        reduced = false;
        for (let i = 0; i < base.length && p.addends.length > 0; i++) {
            const divident = p.addends[0] as Monomial;
            const divisor = base[i].addends[0] as Monomial;
            if (
                divisor.variables.every((v, i) =>
                    divident.variables.some(
                        (v2, j) =>
                            v.identical(v2) &&
                            !divident.exponentVector[j].lessThan(
                                divisor.exponentVector[i],
                            ),
                    ),
                )
            ) {
                const body = Monomial.asMonomial(
                    simplify(new Quotient(divident.body(), divisor.body())),
                    variables,
                ).body();
                const co1 = divisor.coefficient;
                const co2 = new Monomial(
                    Product.of(Integer.minusOne, divident.coefficient),
                    (body as Product).factors.map(
                        (b) => (b as Power).base as Variable,
                    ),
                    (body as Product).factors.map(
                        (b) => (b as Power).exponent as Integer,
                    ),
                );
                const minuend = Polynomial.fromOrderedMonomials(
                    p.monomials.slice(1).map((m) => m.multiply(co1)),
                    order,
                );
                const subtrahend = Polynomial.fromOrderedMonomials(
                    base[i].monomials.slice(1).map((m) => m.multiply(co2)),
                    order,
                );
                p = minuend.add(subtrahend);
                extractedDenominatorFactors.push(co1);
                remainderAddends = remainderAddends.map((r) => r.multiply(co1));
                quotientAddends[i].push(co2.multiply(Integer.minusOne));
                reduced = true;
            }
        }
        if (!reduced) {
            remainderAddends.push(p.monomials[0]);
            p = Polynomial.fromOrderedMonomials(p.monomials.slice(1), order);
        }
    }
    return {
        quotient: quotientAddends.map((q) => Polynomial.fromMonomials(q)),
        remainder: Polynomial.fromOrderedMonomials(remainderAddends, order),
        extractedDenominator: simplify(
            Product.of(...extractedDenominatorFactors),
        ),
    };
}

export function polynomialDivision(
    divident: UnivariatePolynomial,
    divider: UnivariatePolynomial,
): { quotient: UnivariatePolynomial; remainder: UnivariatePolynomial } {
    if (divident.variable != divider.variable)
        throw new Error(
            "Can't divide univariate polynomials " +
                divident.toMathJax() +
                ' and ' +
                divider.toMathJax() +
                ' having different variables: ' +
                divident.variable.toMathJax() +
                ', ' +
                divider.variable.toMathJax(),
        );
    const x = divident.variable;

    let remainder: UnivariatePolynomial = divident;
    const resultAddends: Monomial[] = [];
    while (remainder.degree() >= divider.degree()) {
        //let q = new Quotient(remainder.addends[0], divider.addends[0]).simplified();
        const q = Product.of(
            simplify(
                new Quotient(
                    remainder.leadingCoefficient(),
                    divider.leadingCoefficient(),
                ),
            ),
            new Power(x, new Integer(remainder.degree() - divider.degree())),
        );
        remainder = UnivariatePolynomial.fromPolynomial(
            Polynomial.asPolynomial(
                simplify(Sum.difference(remainder, Product.of(q, divider))),
            ),
            x,
        );
        resultAddends.push(Monomial.asMonomial(q));
    }
    return {
        quotient: UnivariatePolynomial.fromPolynomial(
            Polynomial.fromMonomials(resultAddends),
            x,
        ),
        remainder: remainder,
    };
}

//very similar to extractConstantFactor from algebra-general-algorithms
export function extractContent(p: Polynomial) {
    let coefficients = p.monomials.map((m) => m.coefficient);
    const denominators = coefficients
        .filter((c) => c instanceof Fraction || c instanceof Quotient)
        .map((c) => (c as Fraction | Quotient).denominator);
    const commonDenominator = denominators.length
        ? LCM(...denominators)
        : Integer.one;
    if (denominators.length)
        coefficients = coefficients.map((c) =>
            simplify(Product.of(c, commonDenominator)),
        );
    let gcd = GCD(...coefficients);
    if (gcd instanceof Infty) gcd = Integer.one;
    if (coefficients[0] && coefficients[0].isNegative())
        gcd = Product.of(Integer.minusOne, gcd);
    const constantFactor = simplify(new Quotient(gcd, commonDenominator));
    return Product.of(
        constantFactor,
        Polynomial.fromOrderedMonomials(
            p.monomials.map(
                (m) =>
                    new Monomial(
                        simplify(new Quotient(m.coefficient, constantFactor)),
                        [...m.variables],
                        [...m.exponentVector],
                    ),
            ),
            p.order,
        ),
    );
}

export function grobnerBasis(
    polynomials: Polynomial[],
    order = monomialGRevLexOrder,
    variables?: Variable[],
): Polynomial[] {
    let result: Polynomial[] = polynomials
        .filter((p) => !equals(p, Integer.zero))
        .map(
            (p) =>
                extractContent(
                    Polynomial.asPolynomial(simplify(p), variables, order),
                ).factors[1] as Polynomial,
        );

    const pairsToTry: [number, number][] = [];
    for (let i = 0; i < result.length; i++)
        for (let j = i + 1; j < result.length; j++) pairsToTry.push([i, j]);

    let changed = true;
    while (changed) {
        changed = false;

        result.sort((a, b) => order.ascending(a.monomials[0], b.monomials[0]));
        for (let i = 0; i < result.length && !changed; i++) {
            const allExceptThis = [...result];
            allExceptThis.splice(i, 1);
            const interreduced = multivariateDivision(
                result[i],
                allExceptThis,
                order,
                variables,
            ).remainder;
            if (equals(interreduced, Integer.zero)) {
                result = allExceptThis;
                changed = true;
                for (let p = 0; p < pairsToTry.length; p++) {
                    if (pairsToTry[p][0] == i || pairsToTry[p][1] == i)
                        pairsToTry.splice(p--, 1);
                    else {
                        if (pairsToTry[p][0] > i) pairsToTry[p][0]--;
                        if (pairsToTry[p][1] > i) pairsToTry[p][1]--;
                    }
                }
            } else if (!equals(result[i], interreduced)) {
                result[i] = interreduced;
                result[i] = extractContent(interreduced)
                    .factors[1] as Polynomial;
                changed = true;
            }
        }

        if (!changed)
            for (let p = 0; p < pairsToTry.length && !changed; p++) {
                const p1 = result[pairsToTry[p][0]];
                const p2 = result[pairsToTry[p][1]];
                const leadingMonomial1 = p1.monomials[0].body();
                const leadingMonomial2 = p2.monomials[0].body();
                const leadingLcmBody = LCM(leadingMonomial1, leadingMonomial2);

                let existsK = false;
                for (let k = 0; k < result.length && !existsK; k++)
                    if (
                        k != pairsToTry[p][0] &&
                        k != pairsToTry[p][1] &&
                        !pairsToTry.some(
                            (pp) =>
                                pp[0] == Math.min(k, pairsToTry[p][0]) &&
                                pp[1] == Math.max(k, pairsToTry[p][0]),
                        ) &&
                        !pairsToTry.some(
                            (pp) =>
                                pp[0] == Math.min(k, pairsToTry[p][1]) &&
                                pp[1] == Math.max(k, pairsToTry[p][1]),
                        ) &&
                        !(
                            simplify(
                                new Quotient(
                                    leadingLcmBody,
                                    result[k].monomials[0].body(),
                                ),
                            ) instanceof Quotient
                        )
                    )
                        existsK = true;

                if (
                    !equals(
                        leadingLcmBody,
                        Product.of(leadingMonomial1, leadingMonomial2),
                    ) &&
                    !existsK
                ) {
                    const co1 = Monomial.asMonomial(
                        simplify(
                            new Quotient(leadingLcmBody, leadingMonomial1),
                        ),
                    ).multiply(p2.monomials[0].coefficient);
                    const co2 = Monomial.asMonomial(
                        simplify(
                            new Quotient(leadingLcmBody, leadingMonomial2),
                        ),
                    ).multiply(
                        Product.of(
                            p1.monomials[0].coefficient,
                            Integer.minusOne,
                        ),
                    );
                    const generated = p1.multiply(co1).add(p2.multiply(co2));
                    let reduced = multivariateDivision(
                        generated,
                        result,
                        order,
                        variables,
                    ).remainder;
                    if (!equals(reduced, Integer.zero)) {
                        reduced = extractContent(reduced)
                            .factors[1] as Polynomial;
                        result.push(reduced);
                        changed = true;
                        for (let i = 0; i < result.length - 1; i++)
                            pairsToTry.push([i, result.length - 1]);
                    }
                }
                pairsToTry.splice(p--, 1);
            }
    }
    return result;
}

export function factorizePolynomial(p: Polynomial): Product {
    const getAllSubsets = (theArray: Array<Expression>) =>
        theArray.reduce(
            (subsets: Array<Array<Expression>>, value: Expression) => {
                const newElements = subsets.map((set: any) => [value, ...set]);
                newElements.forEach((e) => {
                    if (
                        !subsets.some((s) =>
                            equals(Product.of(...e), Product.of(...s)),
                        )
                    )
                        subsets.push(e);
                });
                return subsets;
            },
            [[]],
        );

    let constant: Expression[] = [];
    const extranction = extractConstantFactor(p);
    if (!equals(extranction.factors[0], Integer.one)) {
        p = Polynomial.asPolynomial(extranction.factors[1]);
        if (extranction.factors[0] instanceof Fraction) {
            constant = [
                new Fraction(
                    1,
                    (extranction.factors[0] as Fraction).denominator.int,
                ),
                ...factorizeNumber(
                    (extranction.factors[0] as Fraction).numerator.int,
                )
                    .filter((f) => f != BigInt(1))
                    .map((f) => new Integer(f)),
            ];
        } else if (extranction.factors[0] instanceof Integer) {
            constant = [
                ...factorizeNumber((extranction.factors[0] as Integer).int).map(
                    (f) => new Integer(f),
                ),
            ];
        } else constant = [extranction.factors[0]];
    }
    if (equals(p, Integer.one)) return Product.of(...constant);

    for (let v = 0; v < p.variables.length; v++) {
        const pv = UnivariatePolynomial.fromPolynomial(p, p.variables[v]);
        const leading = factorizePolynomial(
            Polynomial.asPolynomial(
                simplify(pv.coefficients[pv.coefficients.length - 1]),
            ),
        );
        const free = factorizePolynomial(
            Polynomial.asPolynomial(simplify(pv.coefficients[0])),
        );
        let leadingDivisors: Expression[], freeDivisors: Expression[];
        if (equals(leading, Integer.one) || equals(leading, Integer.minusOne))
            leadingDivisors = [Integer.one];
        else
            leadingDivisors = getAllSubsets([...leading.factors]).map((s) =>
                simplify(Product.of(...s)),
            );
        if (equals(free, Integer.zero)) freeDivisors = [Integer.zero];
        else if (equals(free, Integer.one) || equals(free, Integer.minusOne))
            freeDivisors = [Integer.one, Integer.minusOne];
        else
            freeDivisors = getAllSubsets([...free.factors]).flatMap((s) => [
                simplify(Product.of(...s)),
                simplify(Product.of(Integer.minusOne, ...s)),
            ]);

        for (let i = 0; i < leadingDivisors.length; i++)
            for (let j = 0; j < freeDivisors.length; j++) {
                //let candidate = new Quotient(freeDivisors[j], leadingDivisors[i]);
                //if (pv.substitute(p.variables[v], candidate).equals(Integer.zero))
                const valueTest = Sum.of(
                    ...pv.coefficients.map((c, exp) =>
                        Product.of(
                            c,
                            new Power(freeDivisors[j], new Integer(exp)),
                            new Power(
                                leadingDivisors[i],
                                new Integer(pv.degree() - exp),
                            ),
                        ),
                    ),
                );
                if (equals(valueTest, Integer.zero)) {
                    const divisorPolynomial =
                        UnivariatePolynomial.withCoefficients(
                            [
                                Product.of(Integer.minusOne, freeDivisors[j]),
                                leadingDivisors[i],
                            ],
                            p.variables[v],
                        );
                    const { quotient } = polynomialDivision(
                        pv,
                        divisorPolynomial,
                    );
                    const q = Polynomial.asPolynomial(simplify(quotient));
                    return Product.of(
                        ...constant,
                        simplify(divisorPolynomial),
                        ...factorizePolynomial(q)
                            .factors.map((f) => simplify(f))
                            .filter((f) => !equals(f, Integer.one)),
                    );
                }
            }
    }
    return Product.of(...constant, simplify(p));
}

export function factorize(e: Expression): Product {
    if (e instanceof Product)
        return Product.of(...e.factors.flatMap((f) => factorize(f).factors));

    const standard = standardForm(e);

    const varNames: string[] = [];
    standard.addends.forEach((a) =>
        (a as Product).factors
            .filter(
                (f, i) =>
                    i > 0 &&
                    (f as Power).exponent instanceof Integer &&
                    (f as Power).base instanceof Variable,
            )
            .forEach((f) =>
                varNames.push(((f as Power).base as Variable).name),
            ),
    );
    const uniqueName = '_' + varNames.join('');
    let index = 0;

    const substitutions = new Map<Variable, Expression>();
    standard.addends.forEach((a) =>
        (a as Product).factors
            .filter((f, i) => i > 0)
            .forEach((f) => {
                if (!((f as Power).exponent instanceof Integer))
                    substitutions.set(new Variable(uniqueName, index++), f);
                else if (!((f as Power).base instanceof Variable))
                    substitutions.set(
                        new Variable(uniqueName, index++),
                        (f as Power).base,
                    );
            }),
    );

    let polynomialized: Expression = standard;
    substitutions.forEach(
        (e, v) => (polynomialized = polynomialized.substitute(e, v)),
    );
    let result: Expression = factorizePolynomial(
        Polynomial.asPolynomial(polynomialized),
    );
    substitutions.forEach((e, v) => (result = result.substitute(v, e)));
    return result as Product;
}
