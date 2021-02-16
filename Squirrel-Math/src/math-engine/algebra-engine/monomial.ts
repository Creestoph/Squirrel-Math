import { Variable } from './variable';
import { Integer } from './numbers';
import { Product } from './product';
import { Power } from './power';
import { Expression } from './expression';
import { Sum } from './sum';
import { simplify, productOrder } from './algorithms/simplification-algorithm';
import { standardForm } from './algorithms/general-algorithms';

export class Monomial extends Product {

    readonly variables: readonly Variable[];
    readonly exponentVector: readonly Integer[];
    readonly coefficient: Expression;

    constructor(coefficient: Expression, variables: Variable[], exponentVector: Integer[]) {
        if (exponentVector.some(e => e.isNegative()))
            throw new Error("Can't create monomial from variables " + variables.map(v => v.toMathJax()).join(", ") + 
            " and exponents " + exponentVector.map(v => v.toMathJax()).join(", ") + 
            " becaouse the vector contains negative integer");
        super([coefficient, ...variables.map((v, i) => new Power(v, exponentVector[i]))]);
        this.variables = variables;
        this.exponentVector = exponentVector;
        this.coefficient = coefficient;
    }

    static asMonomial(e: Expression, variables?: Variable[]): Monomial {
        if (e instanceof Monomial)
            return e;
        let s = standardForm(e);
        if (s.addends.length > 1)
            return new Monomial(e, [], []);
        let coefficientFactors = [];
        let vars = [];
        let exponentVector = [];
        
        for (let i = 0; i < (s.addends[0] as Product).factors.length; i++) {
            let p = ((s.addends[0] as Product).factors[i] as Power);
            if (p.base instanceof Variable && (!variables || variables.some(v => v.identical(p.base))) && p.exponent instanceof Integer && !p.exponent.isNegative()) {
                vars.push(p.base);
                exponentVector.push(p.exponent);
            }
            else 
                coefficientFactors.push(p);
        }
        let coefficient = coefficientFactors.length == 1 ? coefficientFactors[0] : Product.of(...coefficientFactors);
        return new Monomial(coefficient, vars, exponentVector);
    }

    copy(): Monomial {
        return new Monomial(this.coefficient.copy(), this.variables.map(v => v.copy()), this.exponentVector.map(e => e.copy()));
    }

    substitute(old: Expression, e: Expression): Expression {
        let result = super.substitute(old, e);
        if (result instanceof Product)
            return Product.of(...result.factors);
        return result;
    }

    toMathJax(): string {
        let result = "";
        if (this.coefficient.identical(Integer.minusOne) && this.variables.length > 0)
            result += "-";
        else if (!(this.coefficient.identical(Integer.one) && this.variables.length > 0))
            result += this.coefficient instanceof Sum ? "(" + this.coefficient.toMathJax() + ")" : this.coefficient.toMathJax();
        this.exponentVector.filter(e => !e.identical(Integer.zero)).forEach((f, i) => {
            result += this.variables[i].toMathJax();
            if (!f.identical(Integer.one))
                result += "^" + f.toMathJax();
        });
        return result;
    }

    //returns monomial with collected like variables
    cleaned(): Monomial {
        let factors = this.factors.filter((f, i) => i > 0) as Power[];
        factors.sort(productOrder);
        for (let i = 0; i < factors.length - 1; i++)
            if (factors[i].base.identical(factors[i+1].base)) {
                factors[i] = new Power(factors[i].base, (factors[i].exponent as Integer).add(factors[i+1].exponent as Integer));
                factors.splice(1  +i--, 1);
            }
        return new Monomial(this.coefficient, factors.map(f => (f as Power).base as Variable), 
            factors.map(f => (f as Power).exponent as Integer));
    }

    body(): Product {
        return Product.of(...this.factors.slice(1));
    }

    multiply(m: Monomial | Expression): Monomial {
        if (m instanceof Monomial)
            return new Monomial(simplify(Product.of(this.coefficient, m.coefficient)), this.variables.concat(m.variables), 
                this.exponentVector.concat(m.exponentVector)).cleaned();
        else
            return new Monomial(simplify(Product.of(this.coefficient, m)), [...this.variables], [...this.exponentVector]);
    }
}