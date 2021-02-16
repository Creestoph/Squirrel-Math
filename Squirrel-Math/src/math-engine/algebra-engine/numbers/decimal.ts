import { Integer } from './integer';
import { Expression } from '../expression';
import { Number } from './number';
import { Fraction } from './fraction';

export class Decimal extends Number {
    readonly float: number;
    readonly mantissaLength: number = 0;

    /**
     * @param a  inclusive lower bound
     * @param b  exclusive upper bound
     */
    static random(a: number, b: number): Decimal {
        return new Decimal(Math.random()*(b - a) + a);
    }

    constructor(float: number) {
        super();
        if (isNaN(float))
            throw new Error("Constructing decimal from NaN");
        this.float = float;
        let exponent = 1;
        while (Math.floor(this.float*exponent) != this.float*exponent) {
            exponent*=10;
            this.mantissaLength++;
        }
    }

    copy(): Decimal {
        return new Decimal(this.float);
    }

    toMathJax(): string {
        return "" + this.float;
    }

    isNegative(): boolean {
        return this.float < 0;
    }

    numeric(): number {
        return this.float;
    }

    identical(other: Expression): boolean {
        return (other instanceof Decimal) && this.float == other.float;
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

    multiply(number: Number): Number {
        if (number instanceof Integer)
            return new Decimal(this.float*number.numeric());
        if (number instanceof Decimal)
            return new Decimal(this.float*number.float);
        if (number instanceof Fraction)
            return new Decimal(this.float*number.asDecimal().float);
        return this;
    }

    divide(number: Number): Number {
        if (number instanceof Integer)
            return new Decimal(this.float/number.numeric());
        if (number instanceof Decimal)
            return new Decimal(this.float/number.float);
        if (number instanceof Fraction)
            return new Decimal(this.float/number.asDecimal().float);
        return this;
    }

    add(number: Number): Number {
        if (number instanceof Integer)
            return new Decimal(this.float + number.numeric());
        if (number instanceof Decimal)
            return new Decimal(this.float + number.float);
        if (number instanceof Fraction)
            return new Decimal(this.float + number.asDecimal().float);
        return this;
    }

    powerInteger(number: Integer): Number {
        return new Decimal(Math.pow(this.float, number.numeric()));
    }

    powerDecimal(number: Decimal): Decimal {
        return new Decimal(Math.pow(this.float, number.float));
    }

    opposite(): Decimal {
        return new Decimal(-this.float);
    }

    inverse(): Decimal {
        return new Decimal(1/this.float);
    }

    signum(): -1 | 0 | 1 {
        return this.float == 0 ? 0 : this.float < 0 ? -1 : 1;
    }

    absolute(): Decimal {
        if (this.float < 0)
            return new Decimal(Math.abs(this.float));
        return this;
    }

    asFraction(): Fraction {
        return new Fraction(this.float*(10**this.mantissaLength), 10**this.mantissaLength);
    }
}