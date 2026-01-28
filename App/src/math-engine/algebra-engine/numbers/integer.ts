import { Expression } from '../expression';
import { Decimal } from './decimal';
import { Fraction } from './fraction';
import { Number as N } from './number';

export class Integer extends N {
    readonly int: bigint = BigInt(0);
    static readonly zero = new Integer(0);
    static readonly one = new Integer(1);
    static readonly minusOne = new Integer(-1);

    /**
     * @param a  inclusive lower bound
     * @param b  inclusive upper bound
     */
    static random(a: number, b: number): Integer {
        a = Math.ceil(a);
        b = Math.floor(b);
        return new Integer(Math.random() * (b - a + 1) + a);
    }

    constructor(int: bigint | number) {
        super();
        if (typeof int == 'bigint') {
            this.int = int;
        } else {
            this.int = BigInt(Math.floor(int + 0.5));
        }
    }

    copy(): Integer {
        return new Integer(this.int);
    }

    toMathJax(): string {
        return '' + this.int;
    }

    toLatex(): string {
        return '' + this.int;
    }

    isNegative(): boolean {
        return this.int < BigInt(0);
    }

    numeric(): number {
        return Number(this.int);
    }

    identical(other: Expression): boolean {
        return other instanceof Integer && this.int == other.int;
    }

    lessThan(other: N): boolean {
        if (other instanceof Integer) {
            return this.int < other.int;
        } else if (other instanceof Decimal) {
            return this.numeric() < other.float;
        } else if (other instanceof Fraction) {
            return this.numeric() < other.asDecimal().float;
        }
        return false;
    }

    multiply(number: N): N {
        if (number instanceof Integer) {
            return new Integer(this.int * number.int);
        }
        if (number instanceof Decimal) {
            return new Decimal(this.numeric() * number.float);
        }
        if (number instanceof Fraction) {
            return new Fraction(this.int * number.numerator.int, number.denominator.int).reduced();
        }
        return this;
    }

    divide(number: N): N {
        if (number instanceof Integer) {
            return new Fraction(this.int, number.int).reduced();
        }
        if (number instanceof Decimal) {
            return new Decimal(this.numeric() / number.float);
        }
        if (number instanceof Fraction) {
            return new Fraction(this.int * number.denominator.int, number.numerator.int).reduced();
        }
        return this;
    }

    add(number: N): N {
        if (number instanceof Integer) {
            return new Integer(this.int + number.int);
        }
        if (number instanceof Decimal) {
            return new Decimal(this.numeric() + number.float);
        }
        if (number instanceof Fraction) {
            return new Fraction(this.int * number.denominator.int + number.numerator.int, number.denominator.int);
        }
        return this;
    }

    powerInteger(number: Integer): N {
        if (number.isNegative()) {
            return new Fraction(1, this.int ** -number.int);
        }
        return new Integer(this.int ** number.int);
    }

    powerDecimal(number: Decimal): Decimal {
        return new Decimal(Math.pow(this.numeric(), number.float));
    }

    opposite(): Integer {
        return new Integer(-this.int);
    }

    inverse(): Fraction {
        return new Fraction(1, this.int);
    }

    signum(): -1 | 0 | 1 {
        return this.int == BigInt(0) ? 0 : this.int < 0 ? -1 : 1;
    }

    absolute(): Integer {
        if (this.int < 0) {
            return this.opposite();
        }
        return this;
    }
}
