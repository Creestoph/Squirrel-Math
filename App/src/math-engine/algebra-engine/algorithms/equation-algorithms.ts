import { Equation } from '../equation';
import { Inequality, InequalitySign } from '../inequality';
import { Set } from '../../set-engine/set';
import { LinearEquation } from '../linear-equation';
import { Interval } from '../../set-engine/interval';
import { QuadraticEquation } from '../quadratic-equation';
import { SetSum } from '../../set-engine/set-sum';
import { FiniteSet } from '../../set-engine/finite-set';
import { equals, simplify } from './simplification-algorithm';
import { UnivariatePolynomial } from '../univariate-polynomial';
import { factorizePolynomial, grobnerBasis, monomialLexOrder } from './polynomial-algorithms';
import { Integer, Decimal, Number, Infty } from '../numbers';
import { Variable } from '../variable';
import { Polynomial } from '../polynomial';
import { Sum } from '../sum';
import { Product } from '../product';
import { Expression } from '../expression';
import { Power } from '../power';
import { Quotient } from '../quotient';
import { simplifySet } from '../../set-engine/simplification-algorithm';

export function isEquationIdentity(e: Equation): boolean {
    return equals(e.simplified().left, Integer.zero);
}

export function isInequalityIdentity(e: Inequality): boolean {
    const own = e.copy().simplified();
    if (own.left instanceof Number && own.right instanceof Number) {
        switch (own.sign) {
            case InequalitySign.LESS:
                return own.left.lessThan(own.right);
            case InequalitySign.LESS_EQUAL:
                return own.left.lessThan(own.right) || equals(own.left, own.right);
            case InequalitySign.GREATER:
                return !own.left.lessThan(own.right) && !equals(own.left, own.right);
            case InequalitySign.GREATER_EQUAL:
                return !own.left.lessThan(own.right);
        }
    }
    const poly = Polynomial.asPolynomial(own.left);
    try {
        return poly.variables.every((v) => solveInequality(e, v).equals(Interval.realLine()));
    } catch (e) {
        return false;
    }
}

export function isEquationContradictory(e: Equation): boolean {
    const own = e.simplified();
    return (
        isInequalityIdentity(new Inequality(own.left, InequalitySign.GREATER, own.right)) ||
        isInequalityIdentity(new Inequality(own.left, InequalitySign.LESS, own.right))
    );
}

export function isInequalityContradictory(e: Inequality): boolean {
    const own = e.copy().simplified();
    if (own.left instanceof Number && own.right instanceof Number) {
        switch (own.sign) {
            case InequalitySign.LESS:
                return !own.left.lessThan(own.right);
            case InequalitySign.LESS_EQUAL:
                return !own.left.lessThan(own.right) && !equals(own.left, own.right);
            case InequalitySign.GREATER:
                return own.left.lessThan(own.right) || equals(own.left, own.right);
            case InequalitySign.GREATER_EQUAL:
                return own.left.lessThan(own.right);
        }
    }
    return false;
}

//TODO: Precise solutions for degrees 3 and 4
export function solvePolynomialEquation(u: UnivariatePolynomial): Set {
    if (u.degree() == -1) {
        return Interval.realLine();
    }
    if (u.degree() == 0) {
        return equals(u.coefficients[0], Integer.zero) ? Interval.realLine() : Set.empty;
    }
    if (u.degree() == 1) {
        return new FiniteSet(simplify(new LinearEquation(u.coefficients[1], u.coefficients[0], u.variable).solve()));
    }
    if (u.degree() == 2) {
        const solutions = new QuadraticEquation(u.coefficients[2], u.coefficients[1], u.coefficients[0], u.variable)
            .solve()
            .map((s) => simplify(s));
        if (solutions.length == 0) {
            return Set.empty;
        }
        return new FiniteSet(...solutions);
    }
    const factorized = factorizePolynomial(u).factors.map((f) =>
        UnivariatePolynomial.fromPolynomial(Polynomial.asPolynomial(f), u.variable),
    );
    const preciseSolutions = factorized.filter((f) => f.degree() <= 2).map((f) => solvePolynomialEquation(f));
    const numericSolutions = factorized
        .filter((f) => f.degree() > 2)
        .map((f) => solveNumeric(new Equation(f, Integer.zero), f.variable));
    return simplifySet(new SetSum(...preciseSolutions, ...numericSolutions));
}

//only works for linear and quadratic equations
export function solveEquation(e: Equation, x: Variable): Set {
    e = e.simplified();
    if (UnivariatePolynomial.isPolynomial(e.left, x)) {
        return solvePolynomialEquation(UnivariatePolynomial.fromPolynomial(Polynomial.asPolynomial(e.left), x));
    }
    return solveNumeric(e, x);
}

export function solveLinearSystem(matrix: Expression[][], values: Expression[]): Expression[] {
    const n = matrix.length;
    if (values.length != n) {
        throw "Invalid data for linear system: vector of values doesn't match the size of coefficients matrix";
    }
    if (matrix.some((c) => c.length != n)) {
        throw 'Invalid data for linear system: matrix is not square';
    }

    for (let column = 0; column < n; column++) {
        //find biggest in column
        let biggest_in_column = column;
        for (let j = column + 1; j < n; j++) {
            if (
                (!equals(matrix[column][j], Integer.zero) && equals(matrix[column][biggest_in_column], Integer.zero)) ||
                (matrix[column][j] instanceof Number &&
                    !equals(matrix[column][j], Integer.zero) &&
                    !(matrix[column][biggest_in_column] instanceof Number)) ||
                (matrix[column][j] instanceof Number &&
                    matrix[column][biggest_in_column] instanceof Number &&
                    (matrix[column][biggest_in_column] as Number).lessThan(matrix[column][j] as Number))
            ) {
                biggest_in_column = j;
            }
        }

        //faulty system
        if (equals(matrix[column][biggest_in_column], Integer.zero)) {
            throw new Error('System underdetermined');
        }

        //swap biggest to diagonal
        for (let i = 0; i < n; i++) {
            const temp = matrix[i][column];
            matrix[i][column] = matrix[i][biggest_in_column];
            matrix[i][biggest_in_column] = temp;
        }
        const temp = values[column];
        values[column] = values[biggest_in_column];
        values[biggest_in_column] = temp;

        //eliminate rows below
        for (let eliminated_row_index = column + 1; eliminated_row_index < n; eliminated_row_index++) {
            const c1 = matrix[column][column];
            const c2 = matrix[column][eliminated_row_index];
            matrix[column][eliminated_row_index] = Integer.zero;
            for (let i = column + 1; i < n; i++) {
                matrix[i][eliminated_row_index] = simplify(
                    Sum.difference(Product.of(matrix[i][eliminated_row_index], c1), Product.of(matrix[i][column], c2)),
                );
            }
            values[eliminated_row_index] = simplify(
                Sum.difference(Product.of(values[eliminated_row_index], c1), Product.of(values[column], c2)),
            );
        }
    }

    //estabilish result
    const result: Expression[] = [];
    for (let row_index = n - 1; row_index >= 0; row_index--) {
        for (let i = row_index + 1; i < n; i++) {
            values[row_index] = simplify(
                Sum.difference(values[row_index], Product.of(matrix[i][row_index], result[i])),
            );
        }
        if (equals(matrix[row_index][row_index], Integer.zero)) {
            throw new Error('Contradictory system');
        }
        result[row_index] = simplify(new Quotient(values[row_index], matrix[row_index][row_index]));
    }

    return result;
}

export function solvePolynomialSystem(polys: Polynomial[], variables: Variable[]): Expression[][] {
    const coefficientAddents: Expression[][][] = variables.map(() => polys.map(() => []));
    const freeAddends: Expression[][] = polys.map(() => []);
    let isLinear = true;
    polys.forEach((p, i) =>
        p.monomials.forEach((m) => {
            if (m.variables.filter((x) => variables.some((v) => v.identical(x))).length > 1) {
                isLinear = false;
            }
            let k = -1;
            let c: Expression | undefined;
            for (let j = 1; j < m.factors.length; j++) {
                k = variables.findIndex((x) => x.identical((m.factors[j] as Power).base));
                if (k != -1) {
                    if (((m.factors[j] as Power).exponent as Integer).int > 1) {
                        isLinear = false;
                    }
                    c = Product.of(...m.factors.filter((f, l) => l != j));
                    break;
                }
            }
            if (k == -1) {
                freeAddends[i].push(Product.of(Integer.minusOne, m));
            } else {
                coefficientAddents[k][i].push(c!);
            }
        }),
    );
    if (isLinear) {
        return [
            solveLinearSystem(
                coefficientAddents.map((c) => c.map((x) => simplify(Sum.of(...x)))),
                freeAddends.map((f) => simplify(Sum.of(...f))),
            ),
        ];
    }

    const grobner = grobnerBasis(polys, monomialLexOrder, variables);
    if (grobner.some((p) => isEquationContradictory(new Equation(p, Integer.zero)))) {
        return [];
    }
    const solveGrobnerSystem = function (grobnerPolys: Polynomial[], vars: Variable[]) {
        for (let g = 0; g < grobnerPolys.length; g++) {
            const variablesInG = vars.filter((x) => grobnerPolys[g].variables.some((v) => v.identical(x)));
            if (variablesInG.length == 1) {
                const varIndex = vars.indexOf(variablesInG[0]);
                const solutions = solvePolynomialEquation(
                    UnivariatePolynomial.fromPolynomial(grobnerPolys[g], variablesInG[0]),
                );
                grobnerPolys.splice(g, 1);
                if (solutions.equals(Set.empty)) {
                    return [];
                }
                if (solutions instanceof FiniteSet) {
                    let allSolutions: Expression[][] = [];
                    const remainingVariables = [...vars];
                    remainingVariables.splice(varIndex, 1);
                    if (remainingVariables.length == 0) {
                        allSolutions = solutions.elements.map((e) => {
                            const vector = [];
                            vector[varIndex] = e;
                            return vector;
                        });
                    } else {
                        solutions.elements.forEach((e) => {
                            const substituted = grobnerPolys.map((p) =>
                                Polynomial.asPolynomial(p.substitute(variablesInG[0], e)),
                            );
                            const recursiveSolutions = solveGrobnerSystem(substituted, remainingVariables);
                            allSolutions.push(
                                ...recursiveSolutions.map((r) => {
                                    r.splice(varIndex, 0, e);
                                    return r;
                                }),
                            );
                        });
                    }
                    return allSolutions;
                }
            }
        }
        return [];
    };
    return solveGrobnerSystem(grobner, variables);
}

export function solveNumeric(
    e: Equation,
    x: Variable,
    lowerBound = -100,
    upperBound = 100,
    step = 0.01,
    precision = 0.001,
): FiniteSet {
    const bisectionInRange = function (l: number, u: number) {
        let signOnLeft = lastSign;
        while (Math.abs(u - l) > precision) {
            const middle = (l + u) / 2;
            const s = (simplify(f.substitute(x, new Decimal(middle))) as Number).signum();
            if (s == 0) {
                break;
            }
            if (s * signOnLeft < 0) {
                u = middle;
            } else {
                l = middle;
                signOnLeft = s;
            }
        }
        return (u + l) / 2;
    };

    const f = e.simplified().left;
    const solutions: Decimal[] = [];
    let lastSign = 0;
    for (let pos = lowerBound; pos < upperBound; pos += step) {
        const v = simplify(f.substitute(x, new Decimal(pos)));
        if (!(v instanceof Number)) {
            throw new Error(
                "Can't solve equation " + e.toMathJax() + ' using numeric methods; it containt more than one variable',
            );
        }
        const sign = v.signum();
        if (sign == 0) {
            solutions.push(new Decimal(pos));
        } else if (lastSign * sign == -1) {
            solutions.push(new Decimal(bisectionInRange(pos - step, pos)));
        }
        lastSign = sign;
    }

    return new FiniteSet(...solutions);
}

export function solveInequality(e: Inequality, x: Variable): Set {
    e.simplified();
    if (UnivariatePolynomial.isPolynomial(e.left, x)) {
        let coefficients = UnivariatePolynomial.fromPolynomial(Polynomial.asPolynomial(e.left), x).coefficients;
        if (coefficients.length == 2) {
            const zeroPoint = simplify(new LinearEquation(coefficients[1], coefficients[0], x).solve());
            if (isInequalityIdentity(new Inequality(coefficients[1], InequalitySign.GREATER, Integer.zero))) {
                switch (e.sign) {
                    case InequalitySign.GREATER:
                        return new Interval(zeroPoint, Infty.positive, true, true);
                    case InequalitySign.GREATER_EQUAL:
                        return new Interval(zeroPoint, Infty.positive, false, true);
                    case InequalitySign.LESS:
                        return new Interval(Infty.negative, zeroPoint, true, true);
                    case InequalitySign.LESS_EQUAL:
                        return new Interval(Infty.negative, zeroPoint, true, false);
                }
            } else if (isInequalityIdentity(new Inequality(coefficients[1], InequalitySign.LESS, Integer.zero))) {
                switch (e.sign) {
                    case InequalitySign.GREATER:
                        return new Interval(Infty.negative, zeroPoint, true, true);
                    case InequalitySign.GREATER_EQUAL:
                        return new Interval(Infty.negative, zeroPoint, true, false);
                    case InequalitySign.LESS:
                        return new Interval(zeroPoint, Infty.positive, true, true);
                    case InequalitySign.LESS_EQUAL:
                        return new Interval(zeroPoint, Infty.positive, false, true);
                }
            } else {
                throw new Error(
                    "Can't solve inequality " +
                        e.toMathJax() +
                        ' in general case as coefficient ' +
                        coefficients[1].toMathJax() +
                        ' has undefined sign',
                );
            }
        }

        if (coefficients.length == 3) {
            const solutions = new QuadraticEquation(coefficients[2], coefficients[1], coefficients[0], x)
                .solve()
                .map((s) => simplify(s));

            if (isInequalityIdentity(new Inequality(coefficients[2], InequalitySign.LESS, Integer.zero))) {
                coefficients = coefficients.map((c, i) => (coefficients[i] = Sum.of(Product.of(Integer.minusOne, c))));
                e.sign = Inequality.oppositeSign(e.sign);
            }
            if (!isInequalityIdentity(new Inequality(coefficients[2], InequalitySign.GREATER, Integer.zero))) {
                throw new Error(
                    "Can't solve inequality " +
                        e.toMathJax() +
                        ' in general case as coefficient ' +
                        coefficients[1].toMathJax() +
                        ' has undefined sign',
                );
            }

            if (solutions.length == 0) {
                switch (e.sign) {
                    case InequalitySign.GREATER:
                    case InequalitySign.GREATER_EQUAL:
                        return Interval.realLine();
                    case InequalitySign.LESS:
                    case InequalitySign.LESS_EQUAL:
                        return Set.empty;
                }
            } else if (solutions.length == 1) {
                switch (e.sign) {
                    case InequalitySign.GREATER:
                        return new SetSum(
                            new Interval(Infty.negative, solutions[0], true, true),
                            new Interval(solutions[0], Infty.positive, true, true),
                        );
                    case InequalitySign.GREATER_EQUAL:
                        return Interval.realLine();
                    case InequalitySign.LESS:
                        return Set.empty;
                    case InequalitySign.LESS_EQUAL:
                        return new FiniteSet(solutions[0]);
                }
            } else {
                let lesser, greater;
                if (isInequalityIdentity(new Inequality(solutions[0], InequalitySign.LESS, solutions[1]))) {
                    lesser = solutions[0];
                    greater = solutions[1];
                } else if (isInequalityIdentity(new Inequality(solutions[1], InequalitySign.LESS, solutions[0]))) {
                    lesser = solutions[1];
                    greater = solutions[0];
                } else {
                    throw new Error(
                        "Can't solve inequality " +
                            e.toMathJax() +
                            ' as it has two incomparable zeros: ' +
                            solutions[0].toMathJax() +
                            ' and ' +
                            solutions[1].toMathJax(),
                    );
                }

                switch (e.sign) {
                    case InequalitySign.GREATER:
                        return new SetSum(
                            new Interval(Infty.negative, lesser, true, true),
                            new Interval(greater, Infty.positive, true, true),
                        );
                    case InequalitySign.GREATER_EQUAL:
                        return new SetSum(
                            new Interval(Infty.negative, lesser, true, false),
                            new Interval(greater, Infty.positive, false, true),
                        );
                    case InequalitySign.LESS:
                        return new Interval(lesser, greater, true, true);
                    case InequalitySign.LESS_EQUAL:
                        return new Interval(lesser, greater, false, false);
                }
            }
        }
    }
    return Set.empty;
}
