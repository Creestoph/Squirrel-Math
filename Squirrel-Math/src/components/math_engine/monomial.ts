import { Variable } from './variable';
import { Number } from './numbers';
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
}