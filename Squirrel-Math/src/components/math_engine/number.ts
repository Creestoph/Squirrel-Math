import { Expression } from './expression';
import { AlgebraicAlgorithms } from './algebraic_algorithms';

export abstract class Number implements Expression {
    abstract toMathJax(): string;
    abstract simplify(): Expression;
    abstract equals(other: Expression): boolean;
    abstract isNegative(): boolean;

    abstract multiply(n: Number): Number;
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
        return ("" + this.float).replace(".", ",");
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
        let greatestCommonDividor = AlgebraicAlgorithms.gcd(this.numerator.int, this.denominator.int);
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
