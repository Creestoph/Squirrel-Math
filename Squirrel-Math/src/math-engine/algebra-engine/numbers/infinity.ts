import { Number as N } from './number';
import { Expression } from '../expression';
import { Decimal } from './decimal';
import { Integer } from './integer';

export abstract class Infty extends N {
    readonly simplified = this;

    static positive: Infty = new (class extends Infty {
        toMathJax() {
            return '\\infty';
        }
        isNegative() {
            return false;
        }
        numeric() {
            return Infinity;
        }
        multiply(n: N): Infty {
            if (n.numeric() == 0)
                throw new Error(
                    'Multiplication of infinity and zero is undefined',
                );
            if (n.isNegative()) return Infty.negative;
            return this;
        }
        divide(n: N): Infty {
            if (n instanceof Infty)
                throw new Error(
                    'Division of infinity and infinity is undefined',
                );
            if (n.isNegative()) return Infty.negative;
            return this;
        }
        add(n: N): Infty {
            if (n == Infty.negative)
                throw new Error(
                    'Sum of infinity and minus infinity is undefined',
                );
            return this;
        }
        powerDecimal() {
            return new Decimal(this.numeric());
        }
        opposite() {
            return Infty.positive;
        }
        signum(): 1 {
            return 1;
        }
        absolute() {
            return this;
        }
        lessThan() {
            return false;
        }
    })();

    static negative: Infty = new (class extends Infty {
        toMathJax() {
            return '-\\infty';
        }
        isNegative() {
            return true;
        }
        numeric() {
            return -Infinity;
        }
        multiply(n: N): Infty {
            if (n.numeric() == 0)
                throw new Error(
                    'Multiplication of infinity and zero is undefined',
                );
            if (n.isNegative()) return Infty.positive;
            return this;
        }
        divide(n: N): Infty {
            if (n instanceof Infty)
                throw new Error(
                    'Division of infinity and infinity is undefined',
                );
            if (n.isNegative()) return Infty.positive;
            return this;
        }
        add(n: N): Infty {
            if (n == Infty.positive)
                throw new Error(
                    'Sum of infinity and minus infinity is undefined',
                );
            return this;
        }
        powerDecimal(): never {
            throw new Error('Infinity powered to decimal is undefined');
        }
        opposite() {
            return Infty.positive;
        }
        signum(): -1 {
            return -1;
        }
        absolute() {
            return Infty.positive;
        }
        lessThan(n: N): boolean {
            return n != this;
        }
    })();

    identical(other: Expression) {
        return other == this;
    }
    powerInteger(n: Integer): N {
        if (n.identical(Integer.zero))
            throw new Error('Infinity powered to zero is undefined');
        if (n.isNegative()) return Integer.zero;
        return this;
    }
    copy(): Infty {
        return this;
    }
    inverse(): Integer {
        return Integer.zero;
    }
}
