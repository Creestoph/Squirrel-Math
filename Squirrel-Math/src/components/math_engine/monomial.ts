import { Variable } from './variable';
import { Expression } from './expression';
import { Number, Decimal, Integer } from './number';
import { Product } from './product';
import { Power } from './power';

export class Monomial extends Product {
    coefficient: Number;
    variables: Variable[] = [];
    exponentVector: Number[] = [];

    constructor(coefficient: Number, variables: Variable[], exponentVector: Number[]) {
        super();
        this.coefficient = coefficient;
        this.variables = variables;
        this.exponentVector = exponentVector;
        this.factors.push(this.coefficient);
        this.variables.forEach((v, i) => {
            this.factors.push(new Power(v, exponentVector[i]));
        })
    }

    // toMathJax(): string {
    //     let result: string = "";
    //     if (this.coefficient instanceof Integer && this.coefficient.int == 1)
    //         result += "";
    //     else if (this.coefficient instanceof Integer && this.coefficient.int == -1)
    //         result += "-";
    //     else if (this.coefficient instanceof Decimal && this.coefficient.float == 1)
    //         result += "";
    //     else if (this.coefficient instanceof Decimal && this.coefficient.float == -1)
    //         result += "-";
    //     else
    //         result += this.coefficient.toMathJax();
    //     this.variables.forEach((v, i) => result += v.toMathJax() + (this.exponentVector[i] == 1 ? "" : "^{" + this.exponentVector[i] + "}"));
    //     return result;
    // }

    // isNegative(): boolean {
    //     return this.coefficient.isNegative();
    // }

    // equals(other: Expression): boolean {
    //     return false;
    // } 

    // simplify(): Expression {
    //     if (this.coefficient.equals(new Integer(0)))
    //         return new Integer(0);
    //     for (let i = this.variables.length - 1; i >= 0; i--) 
    //         for (let j = 0; j < i; j++)
    //             if (this.variables[i].equals(this.variables[j])) {
    //                 this.exponentVector[j] += this.exponentVector[i];
    //                 this.exponentVector.splice(i, 1);
    //                 this.variables.splice(i, 1);
    //             }
    //     for (let i = this.exponentVector.length - 1; i >= 0; i--)
    //         if (this.exponentVector[i] == 0) {
    //             this.exponentVector.splice(i, 1);
    //             this.variables.splice(i, 1);
    //         }
    //     if (this.variables.length == 0)
    //         return this.coefficient;
    //     return this;
    // }

    // precedence(): number {
    //     return 1;
    // }
}