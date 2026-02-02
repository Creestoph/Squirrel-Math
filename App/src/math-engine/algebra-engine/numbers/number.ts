import { Expression } from '../expression';
import { Integer } from './integer';
import { Decimal } from './decimal';
import { Variable } from '../variable';

export abstract class Number implements Expression {
    readonly simplified: Expression | null = null;

    abstract toMathJax(): string;
    abstract toLatex(): string;
    abstract identical(other: Expression): boolean;
    abstract isNegative(): boolean;
    abstract numeric(): number;

    abstract multiply(n: Number): Number;
    abstract divide(n: Number): Number;
    abstract add(n: Number): Number;
    abstract powerInteger(n: Integer): Number;
    abstract powerDecimal(n: Decimal): Decimal;
    abstract lessThan(n: Number): boolean;

    abstract opposite(): Number;
    abstract inverse(): Number;
    abstract signum(): -1 | 0 | 1;
    abstract absolute(): Number;

    abstract copy(): Number;

    precedence(): number {
        return Infinity;
    }
    substitute(old: Expression, e: Expression): Expression {
        if (old.identical(this)) {
            return e;
        }
        return this;
    }
    allVariables(): Variable[] {
        return [];
    }
}

//  export function instanceOfNumber(expression: Expression): expression is Number {
//     return expression instanceof Integer || expression instanceof Decimal || expression instanceof Fraction
// }
