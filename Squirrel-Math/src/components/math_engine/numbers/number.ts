import { Expression } from '../expression';
import { Integer } from './integer';
import { Decimal } from './decimal';
import { Fraction } from './fraction';

export abstract class Number implements Expression {
    abstract toMathJax(): string;
    abstract simplify(): Expression;
    abstract equals(other: Expression): boolean;
    abstract isNegative(): boolean;

    abstract multiply(n: Number): Number;
    abstract divide(n: Number): Number;
    abstract add(n: Number): Number;
    abstract opposite(): Number;
    abstract lessThan(n: Number): boolean;

    precedence(): number {
        return Infinity;
    }
    inSumBefore(other: Expression): boolean {
        if (other instanceof Number)
            return this.lessThan(other);
        return false;
    }
    inProductBefore(other: Expression): boolean {
        if (other instanceof Number)
            return this.lessThan(other);
        return true;
    }
 }

 export function instanceOfNumber(expression: Expression): expression is Number {
    return expression instanceof Integer || expression instanceof Decimal || expression instanceof Fraction;
}