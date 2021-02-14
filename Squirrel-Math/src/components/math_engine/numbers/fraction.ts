import { Integer } from './integer';
import { Decimal } from './decimal';
import { Expression } from '../expression';
import { Number } from './number';
import { gcd } from '../algebraic_algorithms';



export class Fraction extends Number {
    numerator: Integer = new Integer(0);
    denominator: Integer = new Integer(1);
    
    constructor(nominator: number, denominator: number) {
        super();
        if (denominator == 0)
            throw "Division by 0 in fraction " + nominator + "/" + denominator;
        this.numerator = new Integer(denominator > 0 ? nominator : -nominator);
        this.denominator = new Integer(Math.abs(denominator));
    }

    toMathJax(): string {
        return ("\\frac{" + this.numerator.toMathJax() + "}{" + this.denominator.toMathJax() + "}");
    }

    isNegative(): boolean {
        return this.numerator.isNegative();
    }

    equals(other: Expression): boolean {
        if (other instanceof Integer)
            return this.asDecimal().float == other.int;
        else if (other instanceof Decimal)
            return this.asDecimal().float == other.float;
        else if (other instanceof Fraction)
            return this.asDecimal().float == other.asDecimal().float;
        return false;
    }

    lessThan(other: Number): boolean {
        if (other instanceof Integer)
            return this.asDecimal().float < other.int;
        else if (other instanceof Decimal)
            return this.asDecimal().float < other.float;
        else if (other instanceof Fraction)
            return this.asDecimal().float < other.asDecimal().float;
        return false;
    }

    simplify(): Expression {
        let greatestCommonDividor = gcd(this.numerator.int, this.denominator.int);
        this.numerator.int /= greatestCommonDividor;
        this.denominator.int /= greatestCommonDividor;
        if (this.denominator.int == 1)
            return this.numerator;
        return this;
    }

    multiply(number: Number): Number {
        if (number instanceof Integer)
            return new Fraction(this.numerator.int*number.int, this.denominator.int);
        if (number instanceof Decimal)
            return new Decimal(this.asDecimal().float*number.float);
        if (number instanceof Fraction)
            return new Fraction(this.numerator.int*number.numerator.int, this.denominator.int*number.denominator.int);
        return this;
    }

    divide(number: Number): Number {
        if (number instanceof Integer)
            return new Fraction(this.numerator.int, this.denominator.int*number.int);
        if (number instanceof Decimal)
            return new Decimal(this.asDecimal().float/number.float);
        if (number instanceof Fraction)
            return new Fraction(this.numerator.int*number.denominator.int, this.denominator.int*number.numerator.int).simplify() as Number;
        return this;
    }

    add(number: Number): Number {
        if (number instanceof Integer)
            return new Fraction(this.numerator.int + number.int*this.denominator.int, this.denominator.int);
        if (number instanceof Decimal)
            return new Decimal(this.asDecimal().float + number.float);
        if (number instanceof Fraction)
            return new Fraction(this.numerator.int*number.denominator.int + this.denominator.int*number.numerator.int, this.denominator.int*number.denominator.int);
        return this;
    }

    opposite(): Number {
        return new Fraction(-this.numerator.int, this.denominator.int);
    }

    asDecimal(): Decimal {
        return new Decimal(this.numerator.int/this.denominator.int);
    }
}
