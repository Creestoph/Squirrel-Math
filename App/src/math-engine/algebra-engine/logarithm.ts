import { Expression } from './expression';
import { constantE } from './constants';
import { Variable } from './variable';

export class Logarithm implements Expression {
    readonly base: Expression;
    readonly antilogarithm: Expression;
    readonly simplified: Expression | null = null;

    constructor(antilogarithm: Expression, base: Expression = constantE) {
        this.base = base;
        this.antilogarithm = antilogarithm;
    }

    copy(): Logarithm {
        return new Logarithm(this.base.copy(), this.antilogarithm.copy());
    }

    toMathJax(): string {
        return (
            (this.base == constantE ? '\\log' : '\\log_{' + this.base.toMathJax() + '}') +
            (this.antilogarithm.precedence() <= this.precedence()
                ? '\\left(' + this.antilogarithm.toMathJax() + '\\right)'
                : '{' + this.antilogarithm.toMathJax() + '}')
        );
    }

    toLatex(): string {
        return (
            (this.base == constantE ? '\\log' : '\\log_{' + this.base.toLatex() + '}') +
            (this.antilogarithm.precedence() <= this.precedence()
                ? '\\left(' + this.antilogarithm.toLatex() + '\\right)'
                : '{' + this.antilogarithm.toLatex() + '}')
        );
    }   

    isNegative(): boolean {
        return false;
    }

    substitute(old: Expression, e: Expression): Expression {
        if (old.identical(this)) return e;
        return new Logarithm(this.base.substitute(old, e), this.antilogarithm.substitute(old, e));
    }

    identical(other: Expression): boolean {
        return (
            other instanceof Logarithm &&
            this.base.identical(other.base) &&
            this.antilogarithm.identical(other.antilogarithm)
        );
    }

    precedence(): number {
        return 3;
    }

    allVariables(): Variable[] {
        let result = [...this.base.allVariables(), ...this.antilogarithm.allVariables()];
        for (let i = 0; i < result.length; i++)
            for (let j = i + 1; j < result.length; j++) if (result[j].identical(result[i])) result.splice(j--, 1);
        return result;
    }
}
