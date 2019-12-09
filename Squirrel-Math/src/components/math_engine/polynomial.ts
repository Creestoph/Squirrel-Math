import { Sum } from './sum';
import { Number, Integer } from './number';
import { Variable } from './variable';
import { Monomial } from './monomial';

export class Polynomial extends Sum {
    coefficients: Number[] = [];
    variable: Variable;

    static withCoefficients(coefficients: Number[], variable: Variable): Polynomial {
        return new Polynomial(coefficients, variable);
    }

    private constructor(coefficients: Number[], variable: Variable) {
        super();
        this.coefficients = coefficients;
        this.variable = variable;
        for (let i = this.coefficients.length - 1; i >= 0; i--) {
            this.addends.push(new Monomial(this.coefficients[i], [this.variable], [new Integer(i)]));
        }
    }
}