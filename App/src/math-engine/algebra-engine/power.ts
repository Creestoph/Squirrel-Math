import { Expression } from './expression';
import { Variable } from './variable';

export class Power implements Expression {
    readonly base: Expression;
    readonly exponent: Expression;
    readonly simplified: Expression | null = null;

    constructor(base: Expression, exponent: Expression) {
        this.base = base;
        this.exponent = exponent;
    }

    copy(): Power {
        return new Power(this.base.copy(), this.exponent.copy());
    }

    toMathJax(): string {
        return (
            (this.base.precedence() <= this.precedence()
                ? '\\left(' + this.base.toMathJax() + '\\right)'
                : '{' + this.base.toMathJax() + '}') +
            '^{' +
            this.exponent.toMathJax() +
            '}'
        );
    }

    toLatex(): string {
        return (
            (this.base.precedence() <= this.precedence()
                ? '\\left(' + this.base.toLatex() + '\\right)'
                : '{' + this.base.toLatex() + '}') +
            '^{' +
            this.exponent.toLatex() +
            '}'
        );
    }

    isNegative(): boolean {
        return false;
    }

    substitute(old: Expression, e: Expression): Expression {
        if (old.identical(this)) {
            return e;
        }
        return new Power(this.base.substitute(old, e), this.exponent.substitute(old, e));
    }

    identical(other: Expression): boolean {
        return other instanceof Power && this.base.identical(other.base) && this.exponent.identical(other.exponent);
    }

    precedence(): number {
        return 3;
    }

    allVariables(): Variable[] {
        const result = [...this.base.allVariables(), ...this.exponent.allVariables()];
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
