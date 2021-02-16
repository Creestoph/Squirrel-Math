import { Expression } from './expression';
import { Sum } from './sum';
import { Product } from './product';
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

    toMathJax(): string {
        return engineConfiguration.mathJax.displayFractionsHorizontal ? 
        ((this.numerator.precedence() <= this.precedence() ? "\\left(" + this.numerator.toMathJax() + "\\right)" : this.numerator.toMathJax())
        + "/" + (this.denominator.precedence() <= this.precedence() ? "\\left(" + this.denominator.toMathJax() + "\\right)" : this.denominator.toMathJax()))
        : "\\frac{" + this.numerator.toMathJax() + "}{" + this.denominator.toMathJax() + "}";
    }

    isNegative(): boolean {
        return false;
    }

    substitute(old: Expression, e: Expression): Expression {
        if (old.identical(this))
            return e;
        return new Quotient(this.numerator.substitute(old, e), this.denominator.substitute(old, e))
    }

    identical(other: Expression): boolean {
        return (other instanceof Quotient) && this.numerator.identical(other.numerator) && 
        this.denominator.identical(other.denominator);
    }

    precedence(): number {
        return 2;
    }

    allVariables(): Variable[] {
        let result = [...this.numerator.allVariables(), ...this.denominator.allVariables()];
        for (let i = 0; i < result.length; i++)
            for (let j = i+1; j < result.length; j++)
                if (result[j].identical(result[i]))
                    result.splice(j--, 1);
        return result;
    }
}