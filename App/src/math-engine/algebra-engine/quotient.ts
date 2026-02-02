import { Expression } from './expression';
import { engineConfiguration } from '../engine-configuration';
import { Variable } from './variable';

export class Quotient implements Expression {
    readonly numerator: Expression;
    readonly denominator: Expression;
    readonly simplified: Expression | null = null;

    constructor(numerator: Expression, denominator: Expression) {
        this.numerator = numerator;
        this.denominator = denominator;
    }

    copy(): Quotient {
        return new Quotient(this.numerator.copy(), this.denominator.copy());
    }

    toLatex(): string {
        return engineConfiguration.mathJax.displayFractionsHorizontal
            ? (this.numerator.precedence() <= this.precedence()
                    ? '\\left(' + this.numerator.toLatex() + '\\right)'
                    : this.numerator.toLatex()) +
                  '/' +
                  (this.denominator.precedence() <= this.precedence()
                        ? '\\left(' + this.denominator.toLatex() + '\\right)'
                        : this.denominator.toLatex())
            : '\\frac{' + this.numerator.toLatex() + '}{' + this.denominator.toLatex() + '}';
    }

    isNegative(): boolean {
        return false;
    }

    substitute(old: Expression, e: Expression): Expression {
        if (old.identical(this)) {
            return e;
        }
        return new Quotient(this.numerator.substitute(old, e), this.denominator.substitute(old, e));
    }

    identical(other: Expression): boolean {
        return (
            other instanceof Quotient &&
            this.numerator.identical(other.numerator) &&
            this.denominator.identical(other.denominator)
        );
    }

    precedence(): number {
        return 2;
    }

    allVariables(): Variable[] {
        const result = [...this.numerator.allVariables(), ...this.denominator.allVariables()];
        for (let i = 0; i < result.length; i++) {
            for (let j = i + 1; j < result.length; j++) {
                if (result[j].identical(result[i])) {
                    result.splice(j--, 1);
                }
            }
        }
        return result;
    }
}
