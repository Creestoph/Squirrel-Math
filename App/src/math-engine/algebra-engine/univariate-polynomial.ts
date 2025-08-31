import { Integer } from './numbers';
import { Variable } from './variable';
import { Monomial } from './monomial';
import { Expression } from './expression';
import { Polynomial } from './polynomial';
import { equals } from './algorithms/simplification-algorithm';
import { monomialLexOrder } from './algorithms/polynomial-algorithms';

export class UnivariatePolynomial extends Polynomial {
    readonly coefficients: Expression[];
    readonly variable: Variable;

    protected constructor(coefficients: Expression[], variable: Variable) {
        super(
            [...coefficients]
                .reverse()
                .map((c, i) => new Monomial(c, [variable], [new Integer(coefficients.length - 1 - i)])),
            monomialLexOrder,
        );
        this.coefficients = coefficients;
        this.variable = variable;
    }

    static withCoefficients(coefficients: Expression[], variable: Variable): UnivariatePolynomial {
        return new UnivariatePolynomial(coefficients, variable);
    }

    static fromPolynomial(p: Polynomial, x: Variable): UnivariatePolynomial {
        const coefficientsAddends: Monomial[][] = [];

        p.monomials.forEach((m) => {
            let foundX = false;
            for (let i = 0; i < m.variables.length && !foundX; i++) {
                if (equals(m.variables[i], x)) {
                    const exponent = m.exponentVector[i].numeric();
                    if (!coefficientsAddends[exponent]) {
                        coefficientsAddends[exponent] = [];
                    }
                    const variablesWithoutX = [...m.variables];
                    const exponentsWithoutX = [...m.exponentVector];
                    variablesWithoutX.splice(i, 1);
                    exponentsWithoutX.splice(i, 1);
                    coefficientsAddends[exponent].push(
                        new Monomial(m.coefficient, variablesWithoutX, exponentsWithoutX),
                    );
                    foundX = true;
                }
            }
            if (!foundX) {
                if (!coefficientsAddends[0]) {
                    coefficientsAddends[0] = [];
                }
                coefficientsAddends[0].push(m);
            }
        });

        for (let i = 0; i < coefficientsAddends.length; i++) {
            if (!coefficientsAddends[i]) {
                coefficientsAddends[i] = [];
            }
        }

        const coefficients = coefficientsAddends.map((c) => Polynomial.fromMonomials(c));
        return new UnivariatePolynomial(coefficients, x);
    }

    static isPolynomial(e: Expression, x: Variable): boolean {
        return this.fromPolynomial(Polynomial.asPolynomial(e), x).coefficients.every((c) =>
            c.substitute(x, Integer.zero).identical(c),
        );
    }

    degree(): number {
        return this.coefficients.length - 1;
    }

    leadingTerm(): Expression {
        return this.addends[0];
    }

    freeTerm(): Expression {
        return this.addends[this.addends.length - 1];
    }

    leadingCoefficient(): Expression {
        return this.coefficients[this.coefficients.length - 1];
    }

    freeCoefficient(): Expression {
        return this.coefficients[0];
    }
}
