import { Sum } from './sum';
import { Variable } from './variable';
import { Monomial } from './monomial';
import { Expression } from './expression';
import { standardForm } from './algorithms/general-algorithms';
import { simplify, sumOrder, equals } from './algorithms/simplification-algorithm';
import { Integer } from './numbers';
import { monomialLexOrder } from './algorithms/polynomial-algorithms';
import { insertByBisection, findByBisection } from '../general-algorithms';
import { Order } from '../set-engine/order';

export class Polynomial extends Sum {

    readonly monomials: readonly Monomial[];
    readonly variables: readonly Variable[];
    readonly order: Order;

    protected constructor(monomials: Monomial[], order: Order) {
        super(monomials);
        this.monomials = monomials;
        let varByName: {[name: string]: Variable} = {};
        this.monomials.forEach(m => m.variables.forEach(v => varByName[v.toMathJax()] = v));
        this.variables = Object.values(varByName);
        this.order = order;
    }

    //monomials are assumed to be ordered
    static fromOrderedMonomials(monomials: Monomial[], orderedBy: Order): Polynomial {
        return new Polynomial(monomials, orderedBy);
    }

    //monomials will be sorted with respect to given order
    static fromMonomials(monomials: Monomial[], order = monomialLexOrder): Polynomial {
        monomials = monomials.sort(order.descending);
        return new Polynomial(monomials, order);
    }

    static asPolynomial(e: Expression, variables?: Variable[], order = monomialLexOrder): Polynomial {
        if (e instanceof Polynomial && (!variables || e.variables.length == variables.length && e.variables.every(v => variables.some(w => v.identical(w)))) && e.order == order)
            return e;
        return Polynomial.fromMonomials(standardForm(e).addends.map(p => Monomial.asMonomial(p, variables) as Monomial), order).cleaned();
    }

    substitute(old: Expression, e: Expression): Expression {
        let result = super.substitute(old, e);
        if (result instanceof Sum)
            return Sum.of(...result.addends);
        return result;
    }

    //returns polynomial with like terms collected
    cleaned(): Polynomial {
        let monos = [...this.monomials];
        for (let i = 0; i < monos.length - 1; i++)
            if (monos[i].variables.length == monos[i+1].variables.length && 
                monos[i].variables.every((v, j) => v.identical(monos[i+1].variables[j])) && 
                monos[i].exponentVector.every((v, j) => v.identical(monos[i+1].exponentVector[j]))) {
                monos[i] = new Monomial(Sum.joined(monos[i].coefficient, monos[i+1].coefficient), [...monos[i].variables], 
                    [...monos[i].exponentVector]);
                monos.splice(1 + i--, 1);
            }
        monos = monos.map(m => new Monomial(simplify(m.coefficient), [...m.variables], [...m.exponentVector])).filter(m => !m.coefficient.identical(Integer.zero));
        return Polynomial.fromOrderedMonomials(monos, this.order);
    }

    add(addend: Monomial | Polynomial): Polynomial {
        if (addend instanceof Monomial)
            return Polynomial.fromOrderedMonomials(insertByBisection([...this.monomials], addend, this.order.descending), this.order);
        let monos1: Monomial[], monos2: Monomial[], dominatingOrder: Order;
        if (addend.order != this.order) {
            if (addend.monomials.length < this.monomials.length) { 
                monos1 = [...this.monomials];
                monos2 = [...addend.monomials].sort(this.order.descending), 
                dominatingOrder = this.order;
            }
            else {
                monos1 = [...addend.monomials];
                monos2 = [...this.monomials].sort(addend.order.descending), 
                dominatingOrder = addend.order;
            }
        }
        else {
            monos1 = [...this.monomials];
            monos2 = [...addend.monomials];
            dominatingOrder = this.order;
        }
        let lastInserted = 0;
        monos2.forEach(m => {
            lastInserted = findByBisection(monos1, m, dominatingOrder.descending, lastInserted);
            if (monos1[lastInserted] && monos1[lastInserted].body().identical(m.body())) {
                let newCoefficient = simplify(Sum.of(monos1[lastInserted].coefficient, m.coefficient));
                if (newCoefficient.identical(Integer.zero))
                    monos1.splice(lastInserted--, 1);
                else
                    monos1.splice(lastInserted, 1, new Monomial(newCoefficient, [...m.variables], [...m.exponentVector]));
                
            } 
            else if (monos1[lastInserted - 1] && monos1[lastInserted - 1].body().identical(m.body())) {
                let newCoefficient = simplify(Sum.of(monos1[lastInserted - 1].coefficient, m.coefficient));
                if (newCoefficient.identical(Integer.zero))
                    monos1.splice(--lastInserted, 1);
                else
                    monos1.splice(lastInserted - 1, 1, new Monomial(newCoefficient, [...m.variables], [...m.exponentVector]));
            } 
            else
                monos1.splice(lastInserted, 0, m);
        });
        // monos1 = monos1.map(m => new Monomial(simplify(m.coefficient), [...m.variables], [...m.exponentVector]));
        // for (let i = 0; i < monos1.length; i++)
        //     if (monos1[i].coefficient.identical(Integer.zero))
        //         monos1.splice(i--, 1);
        return Polynomial.fromOrderedMonomials(monos1, dominatingOrder);
    }

    multiply(factor: Monomial | Polynomial): Polynomial {
        if (factor instanceof Monomial)
            return Polynomial.fromOrderedMonomials(this.monomials.map(m => m.multiply(factor)), this.order);
        return Polynomial.fromMonomials(factor.monomials.flatMap(m => this.multiply(m).monomials), this.order).cleaned();
    }
}

