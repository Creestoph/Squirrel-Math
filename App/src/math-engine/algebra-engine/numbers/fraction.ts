import { Integer } from './integer';
import { Decimal } from './decimal';
import { Expression } from '../expression';
import { Number as N } from './number';
import { numericGCD } from '../algorithms/numeric-algorithms';
import { engineConfiguration } from '../../engine-configuration';

export class Fraction extends N {
    readonly numerator: Integer = Integer.zero;
    readonly denominator: Integer = Integer.one;
    readonly simplified: N | null = null;

    constructor(numerator: bigint | number, denominator: bigint | number) {
        super();
        if (denominator == 0) {
            throw 'Division by 0 in fraction ' + numerator + '/' + denominator;
        }
        this.numerator = new Integer(Number(denominator) > 0 ? numerator : -numerator);
        this.denominator = new Integer(Number(denominator) > 0 ? denominator : -denominator);
    }

    copy(): Fraction {
        return new Fraction(this.numerator.int, this.denominator.int);
    }

    toMathJax(): string {
        return (
            (this.numerator.isNegative() ? '-' : '') +
            (engineConfiguration.mathJax.displayFractionsHorizontal
                ? this.numerator.absolute().toMathJax() + '/' + this.denominator.toMathJax()
                : '\\frac{' + this.numerator.absolute().toMathJax() + '}{' + this.denominator.toMathJax() + '}')
        );
    }

    toLatex(): string {
        return (
            (this.numerator.isNegative() ? '-' : '') +
            (engineConfiguration.mathJax.displayFractionsHorizontal
                ? this.numerator.absolute().toLatex() + '/' + this.denominator.toLatex()
                : '\\frac{' + this.numerator.absolute().toLatex() + '}{' + this.denominator.toLatex() + '}')
        );
    }

    isNegative(): boolean {
        return this.numerator.isNegative();
    }

    numeric(): number {
        return this.asDecimal().float;
    }

    identical(other: Expression): boolean {
        return (
            other instanceof Fraction &&
            this.numerator.identical(other.numerator) &&
            this.denominator.identical(other.denominator)
        );
    }

    lessThan(other: N): boolean {
        if (other instanceof Integer) {
            return this.asDecimal().float < other.int;
        } else if (other instanceof Decimal) {
            return this.asDecimal().float < other.float;
        } else if (other instanceof Fraction) {
            return this.asDecimal().float < other.asDecimal().float;
        }
        return false;
    }

    multiply(number: N): N {
        if (number instanceof Integer) {
            return new Fraction(this.numerator.int * number.int, this.denominator.int).reduced();
        }
        if (number instanceof Decimal) {
            return new Decimal(this.asDecimal().float * number.float);
        }
        if (number instanceof Fraction) {
            return new Fraction(
                this.numerator.int * number.numerator.int,
                this.denominator.int * number.denominator.int,
            ).reduced();
        }
        return this;
    }

    divide(number: N): N {
        if (number instanceof Integer) {
            return new Fraction(this.numerator.int, this.denominator.int * number.int);
        }
        if (number instanceof Decimal) {
            return new Decimal(this.asDecimal().float / number.float);
        }
        if (number instanceof Fraction) {
            return new Fraction(
                this.numerator.int * number.denominator.int,
                this.denominator.int * number.numerator.int,
            ).reduced();
        }
        return this;
    }

    add(number: N): N {
        if (number instanceof Integer) {
            return new Fraction(this.numerator.int + number.int * this.denominator.int, this.denominator.int).reduced();
        }
        if (number instanceof Decimal) {
            return new Decimal(this.asDecimal().float + number.float);
        }
        if (number instanceof Fraction) {
            return new Fraction(
                this.numerator.int * number.denominator.int + this.denominator.int * number.numerator.int,
                this.denominator.int * number.denominator.int,
            ).reduced();
        }
        return this;
    }

    powerInteger(number: Integer): N {
        if (number.isNegative()) {
            return new Fraction(this.denominator.int ** -number.int, this.numerator.int ** -number.int);
        }
        return new Fraction(this.numerator.int ** number.int, this.denominator.int ** number.int);
    }

    powerDecimal(number: Decimal): Decimal {
        return this.asDecimal().powerDecimal(number);
    }

    opposite(): Fraction {
        return new Fraction(-this.numerator.int, this.denominator.int);
    }

    inverse(): Fraction {
        return new Fraction(this.denominator.int, this.numerator.int);
    }

    signum(): -1 | 0 | 1 {
        return this.numerator.signum();
    }

    absolute(): Fraction {
        if (this.numerator.int < 0) {
            return new Fraction(-this.numerator.int, this.denominator.int);
        }
        return this;
    }

    asDecimal(): Decimal {
        return new Decimal(this.numerator.numeric() / this.denominator.numeric());
    }

    reduced(): N {
        const gcd = numericGCD(this.numerator.int, this.denominator.int) as bigint;
        const n = this.numerator.int / gcd,
            d = this.denominator.int / gcd;
        if (d == BigInt(1)) {
            return new Integer(n);
        }
        return new Fraction(n, d);
    }
}
