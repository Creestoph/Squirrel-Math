import { Expression } from '../expression';
import { Decimal } from './decimal';
import { Fraction } from './fraction';
import { Number } from './number';

export class Integer extends Number {
    int: number = 0;
    static readonly zero = new Integer(0);
    static readonly one = new Integer(1);

    /**
     * @param a  inclusive lower bound
     * @param b  inclusive upper bound
     */
    static random(a: number, b: number): Integer {
        a = Math.ceil(a);
        b = Math.floor(b);
        return new Integer(Math.random()*(b - a + 1) + a);
    }

    constructor(int: number) {
        super();
        this.int = Math.floor(int);
    }

    toMathJax(): string {
        return "" + this.int;
    }

    isNegative(): boolean {
        return this.int < 0;
    }

    equals(other: Expression): boolean {
        if (other instanceof Integer)
            return this.int == other.int;
        else if (other instanceof Decimal)
            return this.int == other.float;
        else if (other instanceof Fraction)
            return this.int == other.asDecimal().float;
        return false;
    }

    lessThan(other: Number): boolean {
        if (other instanceof Integer)
            return this.int < other.int;
        else if (other instanceof Decimal)
            return this.int < other.float;
        else if (other instanceof Fraction)
            return this.int < other.asDecimal().float;
        return false;
    }

    simplify(): Expression {
        return this;
    }

    multiply(number: Number): Number {
        if (number instanceof Integer)
            return new Integer(this.int*number.int);
        if (number instanceof Decimal)
            return new Decimal(this.int*number.float);
        if (number instanceof Fraction)
            return new Fraction(this.int*number.numerator.int, number.denominator.int);
        return this;
    }

    divide(number: Number): Number {
        if (number instanceof Integer)
            return new Fraction(this.int, number.int).simplify() as Number;
        if (number instanceof Decimal)
            return new Decimal(this.int/number.float);
        if (number instanceof Fraction)
            return new Fraction(this.int*number.denominator.int, number.numerator.int).simplify() as Number;
        return this;
    }

    add(number: Number): Number {
        if (number instanceof Integer)
            return new Integer(this.int + number.int);
        if (number instanceof Decimal)
            return new Decimal(this.int + number.float);
        if (number instanceof Fraction)
            return new Fraction(this.int*number.denominator.int + number.numerator.int, number.denominator.int);
        return this;
    }

    opposite(): Number {
        return new Integer(-this.int);
    }
}
