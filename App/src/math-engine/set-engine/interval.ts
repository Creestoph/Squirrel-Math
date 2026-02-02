import { Set } from './set';
import { Expression } from '../algebra-engine/expression';
import { Decimal, Infty } from '../algebra-engine/numbers';
import { Inequality, InequalitySign } from '../algebra-engine/inequality';
import { Sum } from '../algebra-engine/sum';
import { Product } from '../algebra-engine/product';
import { equals } from '../algebra-engine/algorithms/simplification-algorithm';
import { isInequalityIdentity } from '../algebra-engine/algorithms/equation-algorithms';

export class Interval implements Set {
    leftBound: Expression;
    rightBound: Expression;
    leftOpen: boolean;
    rightOpen: boolean;

    constructor(leftBound: Expression, rightBound: Expression, leftOpen: boolean, rightOpen: boolean) {
        this.leftBound = leftBound;
        this.rightBound = rightBound;
        this.leftOpen = leftOpen;
        this.rightOpen = rightOpen;
    }

    static realLine(): Interval {
        return new Interval(Infty.negative, Infty.positive, true, true);
    }

    copy(): Interval {
        return new Interval(this.leftBound.copy(), this.rightBound.copy(), this.leftOpen, this.rightOpen);
    }

    toMathJax(): string {
        return (
            (this.leftOpen ? '(' : '[') +
            this.leftBound.toMathJax() +
            ', ' +
            this.rightBound.toMathJax() +
            (this.rightOpen ? ')' : ']')
        );
    }

    toLatex(): string {
        return (
            (this.leftOpen ? '(' : '[') +
            this.leftBound.toLatex() +
            ', ' +
            this.rightBound.toLatex() +
            (this.rightOpen ? ')' : ']')
        );
    }

    includes(e: Expression): boolean {
        return (
            isInequalityIdentity(
                new Inequality(
                    e,
                    this.leftOpen ? InequalitySign.GREATER : InequalitySign.GREATER_EQUAL,
                    this.leftBound,
                ),
            ) &&
            isInequalityIdentity(
                new Inequality(e, this.rightOpen ? InequalitySign.LESS : InequalitySign.LESS_EQUAL, this.rightBound),
            )
        );
    }

    randomElement(): Expression {
        if (equals(this.leftBound, Infty.negative) && equals(this.rightBound, Infty.positive)) {
            return new Decimal((Math.random() > 0.5 ? -1 : 1) * Math.tan((Math.random() * Math.PI) / 2));
        } else if (equals(this.leftBound, Infty.negative)) {
            return Sum.difference(
                this.rightBound,
                new Decimal((Math.random() > 0.5 ? -1 : 1) * Math.tan((Math.random() * Math.PI) / 2)),
            );
        } else if (equals(this.rightBound, Infty.positive)) {
            return Sum.of(
                this.leftBound,
                new Decimal((Math.random() > 0.5 ? -1 : 1) * Math.tan((Math.random() * Math.PI) / 2)),
            );
        } else {
            let random01 = Math.random();
            if (this.leftOpen) {
                while (random01 == 0) {
                    random01 = Math.random();
                }
            }
            return Sum.of(
                this.leftBound,
                Product.of(Sum.difference(this.rightBound, this.leftBound), new Decimal(random01)),
            );
        }
    }

    isFinite(): boolean {
        return equals(this.leftBound, this.rightBound);
    }

    size(): Expression {
        return Sum.difference(this.rightBound, this.leftBound);
    }

    equals(other: Set) {
        return (
            other instanceof Interval &&
            equals(other.leftBound, this.leftBound) &&
            equals(other.rightBound, this.rightBound) &&
            other.leftOpen == this.leftOpen &&
            other.rightOpen == this.rightOpen
        );
    }
}
