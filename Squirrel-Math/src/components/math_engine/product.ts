import { Expression } from './expression';
import { instanceOfNumber, Integer, Number } from './number';
import { Sum } from './sum';
import { Power } from './power';

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
            if (i > 0 && !withBrackets && instanceOfNumber(f))
                result += " \\cdot ";
            if (i == 0 && this.factors.length > 1 && f.equals(new Integer(-1)))
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
            return false;
        }
        if (!(own instanceof Product) && !(other instanceof Product)) {
            return own.equals(other);
        }
        return false;
    } 

    simplify(): Expression {
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
        return this;
    }

    precedence(): number {
        return 1;
    }
}