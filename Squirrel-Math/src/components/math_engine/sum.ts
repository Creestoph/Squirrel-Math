import { Expression } from './expression';
import { Integer, instanceOfNumber, Number } from './number';
import { Product } from './product';
import { Quotient } from './quotient';

export class Sum implements Expression {
    addends: Expression[] = [];

    static of(...addends: Expression[]): Sum {
        let result: Sum = new Sum();
        result.addends = addends;
        return result;
    }

    toMathJax(): string {
        let result = "";
        this.addends.forEach((a, i) => {
            if (i > 0 && !a.isNegative())
                result += " + ";
            if (a.precedence() <= this.precedence())
                result += "\\left(" + a.toMathJax() + "\\right)";
            else
                result += a.toMathJax();
        });
        return result;
    }

    isNegative(): boolean {
        return false;
    }

    simplify(): Expression {
        this.addends.forEach((a, i) => this.addends[i] = a.simplify());
        for (let i = 0; i < this.addends.length; i++) {
            if (this.addends[i] instanceof Sum) {
                (this.addends[i] as Sum).addends.forEach(a => this.addends.push(a));
                this.addends.splice(i--, 1);
            }
        }
        for (let i = 0; i < this.addends.length; i++) {
            if (this.addends[i].equals(new Integer(0)))
                this.addends.splice(i--, 1);
            if (this.addends[i] instanceof Quotient) {
                let a = this.addends.splice(i, 1)[0] as Quotient;
                return new Quotient(Sum.of(a.numerator, Product.of(a.denominator, ...this.addends)), a.denominator).simplify();
            }
            for (let j = 0; j < i; j++) {
                let coefficient_i: Number = new Integer(1), coefficient_j: Number = new Integer(1);
                let expression_i: Expression = this.addends[i], expression_j: Expression = this.addends[j];
                if (instanceOfNumber(expression_i) && instanceOfNumber(expression_j)) {
                    coefficient_i = expression_i;
                    coefficient_j = expression_j;
                    expression_i = Integer.one;
                    expression_j = Integer.one;
                }
                if (this.addends[i] instanceof Product && instanceOfNumber((this.addends[i] as Product).factors[0])) {
                    coefficient_i = (this.addends[i] as Product).factors[0] as Number;
                    expression_i = new Product();
                    (this.addends[i] as Product).factors.forEach((f, k) => {
                        if (k != 0)
                            (expression_i as Product).factors.push(f);
                    })
                }
                if (this.addends[j] instanceof Product && instanceOfNumber((this.addends[j] as Product).factors[0])) {
                    coefficient_j = (this.addends[j] as Product).factors[0] as Number;  
                    expression_j = new Product();
                    (this.addends[j] as Product).factors.forEach((f, k) => {
                        if (k != 0)
                            (expression_j as Product).factors.push(f);
                    }) 
                }
                if (expression_i.equals(expression_j)) {
                    this.addends.splice(i, 1, Product.of(coefficient_i.add(coefficient_j), expression_i).simplify());
                    this.addends.splice(j, 1);
                    i -= 2;
                    break;
                }
            }
        }
        if (this.addends.length == 1)
            return this.addends[0];
        this.addends.sort((a, b) => a.inSumBefore(b) ? -1 : 1);
        return this;
    }

    equals(other: Expression): boolean {
        return false;
    } 

    precedence(): number {
        return 0;
    }

    inSumBefore(other: Expression): boolean {
        if (other instanceof Sum)
            return other.addends.length < this.addends.length;
        return false;
    }
    inProductBefore(other: Expression): boolean {
        if (other instanceof Sum)
            return other.addends.length > this.addends.length;
        return false;
    }
}