import { Integer } from './integer';
import { Expression } from '../expression';
import { Number } from './number';
import { Fraction } from './fraction';

export class Decimal extends Number {
    float: number;
    mantissaLength: number = 0;

    /**
     * @param a  inclusive lower bound
     * @param b  exclusive upper bound
     */
    static random(a: number, b: number): Decimal {
        return new Decimal(Math.random()*(b - a) + a);
    }

    constructor(float: number) {
        super();
        this.float = float;
        let exponent = 1;
        while (Math.floor(this.float*exponent) != this.float*exponent) {
            exponent*=10;
            this.mantissaLength++;
        }
    }

    toMathJax(): string {
        return "" + this.float;
    }

    isNegative(): boolean {
        return this.float < 0;
    }

    equals(other: Expression): boolean {
        if (other instanceof Integer)
            return this.float == other.int;
        else if (other instanceof Decimal)
            return this.float == other.float;
        else if (other instanceof Fraction)
            return this.float == other.asDecimal().float;
        return false;
    }

    lessThan(other: Number): boolean {
        if (other instanceof Integer)
            return this.float < other.int;
        else if (other instanceof Decimal)
            return this.float < other.float;
        else if (other instanceof Fraction)
            return this.float < other.asDecimal().float;
        return false;
    }

    simplify(): Expression {
        if (Math.floor(this.float) == this.float)
            return new Integer(this.float);
        return this;
    }

    multiply(number: Number): Number {
        if (number instanceof Integer)
            return new Decimal(this.float*number.int);
        if (number instanceof Decimal)
            return new Decimal(this.float*number.float);
        if (number instanceof Fraction)
            return new Decimal(this.float*number.asDecimal().float);
        return this;
    }

    divide(number: Number): Number {
        if (number instanceof Integer)
            return new Decimal(this.float/number.int);
        if (number instanceof Decimal)
            return new Decimal(this.float/number.float);
        if (number instanceof Fraction)
            return new Decimal(this.float/number.asDecimal().float);
        return this;
    }

    add(number: Number): Number {
        if (number instanceof Integer)
            return new Decimal(this.float + number.int);
        if (number instanceof Decimal)
            return new Decimal(this.float + number.float);
        if (number instanceof Fraction)
            return new Decimal(this.float + number.asDecimal().float);
        return this;
    }

    opposite(): Number {
        return new Integer(-this.float);
    }

    asFraction(): Fraction {
        return new Fraction(this.float*(10**this.mantissaLength), 10**this.mantissaLength);
    }
}