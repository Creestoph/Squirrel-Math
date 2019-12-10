import { Expression } from './expression';
import { instanceOfNumber, Integer, Number } from './numbers';
import { Sum } from './sum';
import { Power } from './power';
import { Quotient } from './quotient';

export class Product implements Expression {
    factors: Expression[] = [];

    static of(...factors: Expression[]): Product {
        let result: Product = new Product();
        result.factors = factors;
        return result;
    }

    toMathJax(): string {
        let result = "";
        this.factors.forEach((f, i) => {
            let withBrackets = f.precedence() < this.precedence() || (i > 0 && f.isNegative());
            if (i > 0 && !withBrackets && (instanceOfNumber(f) || f instanceof Quotient) && !this.factors[i-1].equals(new Integer(-1)))
                result += " \\cdot ";
            if (i == 0 && this.factors.length > 1 && f.equals(new Integer(-1)) && !(!this.factors[1].isNegative() && instanceOfNumber(this.factors[1])))
                result += "-";
            else if (withBrackets)
                result += "\\left(" + f.toMathJax() + "\\right)";
            else
                result += f.toMathJax();
        });
        return result;
    }

    isNegative(): boolean {
        return this.factors.length > 0 && this.factors[0].isNegative();
    }

    equals(other: Expression): boolean {
        let own = this.simplify();
        other = other.simplify();
        if (own instanceof Product && other instanceof Product) {
            if (own.factors.length != other.factors.length)
                return false;
            for (let i = 0; i < own.factors.length; i++)
                if (!own.factors[i].equals(other.factors[i]))
                    return false;
            return true;
        }
        if (!(own instanceof Product) && !(other instanceof Product)) {
            return own.equals(other);
        }
        return false;
    } 

    simplify(): Expression {
        if (this.factors.length == 0)
            return Integer.one;
        this.factors.forEach((f, i) => this.factors[i] = f.simplify());
        //product of products
        for (let i = 0; i < this.factors.length; i++) {
            if (this.factors[i] instanceof Product) {
                (this.factors[i] as Product).factors.forEach(f => this.factors.push(f));
                this.factors.splice(i--, 1);
            }
        }
        for(let i = 0 ; i < this.factors.length; i++) {
            //multiplying sums
            if (this.factors[i] instanceof Sum) {
                let result = new Sum();
                (this.factors[i] as Sum).addends.forEach(a => {
                    let product = Product.of(a);
                    this.factors.forEach((f, j) => { 
                        if (i != j) 
                            product.factors.push(f) 
                    });
                    result.addends.push(product);
                })
                return result.simplify();
            }
            //zero
            if (this.factors[i].equals(new Integer(0)))
                return new Integer(0);
            //fractions
            if (this.factors[i] instanceof Quotient) {
                let f = this.factors.splice(i, 1)[0] as Quotient;
                return new Quotient(Product.of(f.numerator, ...this.factors), f.denominator).simplify();
            }
            //merging numbers
            if (i > 0 && instanceOfNumber(this.factors[i])) {
                let f = this.factors.splice(i--, 1)[0];
                if (instanceOfNumber(this.factors[0]))
                    this.factors[0] = (this.factors[0] as Number).multiply(f as Number);                    
                else 
                    this.factors.unshift(f);
            }
            //common powers
            for (let j = 0; j < i; j++) {
                let exponent_i: Number = new Integer(1), exponent_j: Number = new Integer(1);
                let expression_i: Expression = this.factors[i], expression_j: Expression = this.factors[j];
                if (this.factors[i] instanceof Power && instanceOfNumber((this.factors[i] as Power).exponent)) {
                    exponent_i = (this.factors[i] as Power).exponent as Number;
                    expression_i = (this.factors[i] as Power).base;
                }
                if (this.factors[j] instanceof Power && instanceOfNumber((this.factors[j] as Power).exponent)) {
                    exponent_j = (this.factors[j] as Power).exponent as Number;
                    expression_j = (this.factors[j] as Power).base;
                }
                if (expression_i.equals(expression_j)) {
                    this.factors.splice(i--, 1, new Power(expression_i, exponent_i.add(exponent_j).simplify()));
                    this.factors.splice(j, 1);
                    break;
                }
            }
        }
        if (this.factors[0].equals(new Integer(1)) && this.factors.length > 1)
            this.factors.shift();
        
        if (this.factors.length == 1)
            return this.factors[0];
        this.factors.sort((a, b) => a.inProductBefore(b) ? -1 : 1);
        return this;
    }

    precedence(): number {
        return 1;
    }

    inSumBefore(other: Expression): boolean {
        if (other instanceof Sum)
            false;
        if (other instanceof Power)
            return this.factors.length > 0 && this.factors[0].inSumBefore(other);
        if (other instanceof Product) {
            let i = (this.factors.length > 0 && instanceOfNumber(this.factors[0]) ? 1 : 0);
            let j = (other.factors.length > 0 && instanceOfNumber(other.factors[0]) ? 1 : 0);
            for (; i < this.factors.length && j < other.factors.length; i++, j++) {
                if (other.factors[i].inSumBefore(this.factors[i]))
                    return false;
                if (this.factors[i].inSumBefore(other.factors[i]))
                    return true;
            }
            return other.factors.length - j < this.factors.length - i;
        }
        return false;
    }
    inProductBefore(other: Expression): boolean {
        if (other instanceof Product)
            return other.factors.length < this.factors.length;
        return true;
    }
}