import { Expression } from '../expression';
import { Integer, Decimal, Number, Fraction } from '../numbers';
import { numericGCD } from './numeric-algorithms';
import { Product } from '../product';
import { Sum } from '../sum';
import { Quotient } from '../quotient';
import { Power } from '../power';
import { multinomialCoefficient } from '../../combinatorics-engine/symbols';
import { standardForm, extractConstantFactor, extractMonomialFactor } from './general-algorithms';
import { factorize } from './polynomial-algorithms';
import { Variable } from '../variable';
import { engineConfiguration } from '../../engine-configuration';

function simplifyDecimal(e: Decimal): Number {
    if (Math.floor(e.float) == e.float)
        return new Integer(e.float);
    return e;
}

function simplifyFraction(e: Fraction): Number {
    return e.reduced();
}

function simplifySum(e: Sum): Expression {
    let simpleAddends = e.addends.map(a => simplify(a));

    //merging sums
    for (let i = 0; i < simpleAddends.length; i++) {
        if (simpleAddends[i] instanceof Sum) {
            (simpleAddends[i] as Sum).addends.forEach(a => simpleAddends.push(a));
            simpleAddends.splice(i--, 1);
        }
    }
    for (let i = 0; i < simpleAddends.length; i++) {
        //removing zeros
        if (equals(simpleAddends[i], Integer.zero))
            simpleAddends.splice(i--, 1);
        //fractions
        if (simpleAddends[i] instanceof Quotient) {
            let numerator = (simpleAddends[i] as Quotient).numerator;
            let denominator = (simpleAddends[i] as Quotient).denominator;
            //TODO: full simplification
            for (let j = i + 1; j < simpleAddends.length; j++)
                if (simpleAddends[j] instanceof Quotient && 
                    equals((simpleAddends[i] as Quotient).denominator, (simpleAddends[j] as Quotient).denominator)) {
                    numerator = simplify(Sum.of(numerator, (simpleAddends[j] as Quotient).numerator));
                    simpleAddends.splice(j--, 1);
                }
            simpleAddends.splice(i, 1);
            return simplify(new Quotient(Sum.of(numerator, Product.of(denominator, Sum.of(...simpleAddends))), denominator));
        }
    }
    //collecting like terms
    let standardAddends = [...standardForm(Sum.of(...simpleAddends)).addends];
    standardAddends.sort(sumOrder);
    for (let i = 0; i < standardAddends.length; i++) {
        let expression_i = Product.of(...(standardAddends[i] as Product).factors.slice(1));
        for (let j = i + 1; j < standardAddends.length; j++) {
            let expression_j = Product.of(...(standardAddends[j] as Product).factors.slice(1));
            if (equals(expression_i, expression_j)) {
                standardAddends[i] = Product.of(((standardAddends[i] as Product).factors[0] as Number)
                .add((standardAddends[j] as Product).factors[0] as Number), ...(standardAddends[i] as Product).factors.slice(1));
                standardAddends.splice(j--, 1);
            }
            else
                break;
        }
        if (equals((standardAddends[i] as Product).factors[0], Integer.zero))
            standardAddends.splice(i--, 1);
    }
    simpleAddends = standardAddends.map(a => simplify(a));

    if (simpleAddends.length == 0)
        return Integer.zero;
    if (simpleAddends.length == 1)
        return simpleAddends[0];

    return Sum.of(...simpleAddends);
}

export function orderProduct(e: Product): Product {
    let simpleFactors = [...e.factors].sort(productOrder);

    //merging numbers
    for(let i = 1 ; i < simpleFactors.length; i++) {
        if (!(simpleFactors[i] instanceof Number))
            break;
        let f = simpleFactors.splice(i--, 1)[0];
        simpleFactors[0] = (simpleFactors[0] as Number).multiply(f as Number);                    
    }

    //common powers
    for(let i = 0; i < simpleFactors.length - 1; i++) {
        let j = i + 1;
        let exponent_i: Number = Integer.one, exponent_j: Number = Integer.one;
        let expression_i: Expression = simpleFactors[i], expression_j: Expression = simpleFactors[j];
        if (simpleFactors[i] instanceof Power && (simpleFactors[i] as Power).exponent instanceof Number) {
            exponent_i = (simpleFactors[i] as Power).exponent as Number;
            expression_i = (simpleFactors[i] as Power).base;
        }
        if (simpleFactors[j] instanceof Power && (simpleFactors[j] as Power).exponent instanceof Number) {
            exponent_j = (simpleFactors[j] as Power).exponent as Number;
            expression_j = (simpleFactors[j] as Power).base;
        }
        if (expression_i.identical(expression_j)) {
            simpleFactors.splice(i--, 1, new Power(expression_i, exponent_i.add(exponent_j)));
            simpleFactors.splice(j, 1);
        }
    }

    return Product.of(...simpleFactors);
}

function simplifyProduct(e: Product): Expression {
    if (e.factors.length == 0)
        return Integer.one;

    let simpleFactors = e.factors.map(f => simplify(f));
    //product of products
    for (let i = 0; i < simpleFactors.length; i++) {
        if (simpleFactors[i] instanceof Product) {
            (simpleFactors[i] as Product).factors.forEach(f => simpleFactors.push(f));
            simpleFactors.splice(i--, 1);
        }
    }
    //fractions
    for(let i = 0 ; i < simpleFactors.length; i++) {
        if (simpleFactors[i] instanceof Quotient) {
            let f = simpleFactors.splice(i, 1)[0] as Quotient;
            return simplify(new Quotient(Product.of(f.numerator, ...simpleFactors), f.denominator));
        }
    }

    //zero
    if (simpleFactors.some(s => equals(s, Integer.zero )))
        return Integer.zero

    //sums
    let sumFactors: Sum[] = simpleFactors.filter(s => s instanceof Sum) as Sum[];
    if (sumFactors.length > 0) {
        let counter = sumFactors.map(s => 0);
        let nonSumFactors = simpleFactors.filter(s => !(s instanceof Sum));
        let expandedAddends: Product[] = [];
        do {
            expandedAddends.push(Product.of(...nonSumFactors, ...counter.map((c, i) => sumFactors[i].addends[c])));
            for (let i = counter.length - 1; i >= 0 && ++counter[i] == sumFactors[i].addends.length; i--)
                counter[i] = 0;
        } while (!counter.every(c => c == 0))
        return simplify(Sum.of(...expandedAddends));
    }

    simpleFactors = [...orderProduct(Product.of(...simpleFactors)).factors];

    if (equals(simpleFactors[0], Integer.one) && simpleFactors.length > 1)
        simpleFactors.shift();

    if (simpleFactors.length == 1)
        return simpleFactors[0];

    return Product.of(...simpleFactors);
}

function simplifyQuotient(e: Quotient): Expression {
    let n = (e.numerator instanceof Product) ? [...e.numerator.factors] : [e.numerator];
    let d = (e.denominator instanceof Product) ? [...e.denominator.factors] : [e.denominator];
    n.forEach((nFactor, i) => n[i] = simplify(nFactor));
    d.forEach((dFactor, i) => d[i] = simplify(dFactor));

    for (let i = 0; i < n.length; i++)
        if (equals(n[i], Integer.zero))
            return Integer.zero;

    for (let i = 0; i < d.length; i++)
        if (equals(d[i], Integer.zero))
            throw new Error("Division by 0 in quotient " + e.toMathJax());

    for (let i = 0; i < n.length; i++)
        if (n[i] instanceof Quotient) {
            d.push((n[i] as Quotient).denominator);
            n.splice(i, 1, (n[i] as Quotient).numerator);
            i--;
        }
    for (let i = 0; i < d.length; i++)
        if (d[i] instanceof Quotient) {
            n.push((d[i] as Quotient).denominator);
            d.splice(i, 1, (d[i] as Quotient).numerator);
            i--;
        }

    for (let i = 0; i < n.length; i++)
        if (n[i] instanceof Product) {
            n.splice(i, 1, ...(n[i] as Product).factors);
            i--;
        }
    for (let i = 0; i < d.length; i++)
        if (d[i] instanceof Product) {
            d.splice(i, 1, ...(d[i] as Product).factors);
            i--;
        }

    if (engineConfiguration.factorizeQuotients) {
        for (let i = n.length - 1; i >= 0; i--)
            if (n[i] instanceof Sum)
                n.splice(i, 1, ...factorize(n[i]).factors);
        for (let i = d.length - 1; i >= 0; i--)
            if (d[i] instanceof Sum)
                d.splice(i, 1, ...factorize(d[i]).factors); 
    }
    else {
        for (let i = n.length - 1; i >= 0; i--)
            if (n[i] instanceof Sum) {
                let extracted = extractMonomialFactor(n[i]).factors;
                n.splice(i, 1, ...[...(extracted[0] as Product).factors, extracted[1]]);
            }
        for (let i = d.length - 1; i >= 0; i--)
            if (d[i] instanceof Sum) {
                let extracted = extractMonomialFactor(d[i]).factors;
                d.splice(i, 1, ...[...(extracted[0] as Product).factors, extracted[1]]);
            }
    }

    n = [...orderProduct(Product.of(...n)).factors];
    d = [...orderProduct(Product.of(...d)).factors];

    if (n.length > 0 && n[0] instanceof Fraction) {
        if (d[0] instanceof Number)
            d[0] = (d[0] as Number).multiply((n[0] as Fraction).denominator);
        else
            d.unshift((n[0] as Fraction).denominator);
        n[0] = (n[0] as Fraction).numerator;
    }
    if (d.length > 0 && d[0] instanceof Fraction) {
        if (n[0] instanceof Number)
            n[0] = (n[0] as Number).multiply((d[0] as Fraction).denominator);
        else
            n.unshift((d[0] as Fraction).denominator);
        d[0] = (d[0] as Fraction).numerator;
    }
    if (n.length > 0 && d.length > 0 && d[0] instanceof Integer) {
        let numeratorConstant = (n[0] instanceof Integer) ? (n[0] as Integer).int : BigInt(1);
        let g: bigint = (numericGCD(numeratorConstant, (d[0] as Integer).int) as bigint)*BigInt((d[0] as Integer).signum());
        if (n[0] instanceof Integer) {
            n[0] = (n[0] as Integer).divide(new Integer(g));
            d[0] = (d[0] as Integer).divide(new Integer(g));
        }
        else if (g < BigInt(0)) {
            n.unshift(Integer.minusOne);
            d[0] = (d[0] as Integer).multiply(Integer.minusOne);
        }
    }

    for (let i = 0; i < n.length; i++) 
        if (!(n[i] instanceof Power))
            n[i] = new Power(n[i], Integer.one);
    for (let i = 0; i < d.length; i++) 
        if (!(d[i] instanceof Power))
            d[i] = new Power(d[i], Integer.one);

    for (let i = 0; i < n.length; i++)
        for (let j = 0; j < d.length; j++) {
            if (equals((n[i] as Power).base, ((d[j] as Power).base))) {
                n[i] = new Power((n[i] as Power).base, Sum.difference((n[i] as Power).exponent, (d[j] as Power).exponent));
                d.splice(j--, 1); 
            }
        }
    let simpleNumerator = simplify(Product.of(...n));
    let simpleDenominator = simplify(Product.of(...d));            
    if (simpleDenominator instanceof Number)
        return simplify(Product.of(Integer.one.divide(simpleDenominator), simpleNumerator));
    if (simpleNumerator instanceof Quotient)
        return simplify(new Quotient(simpleNumerator.numerator, Product.of(simpleNumerator.denominator, simpleDenominator)));

    return new Quotient(simpleNumerator, simpleDenominator);
}

function simplifyPower(e: Power): Expression {
    let simpleBase = simplify(e.base);
    let simpleExponent = simplify(e.exponent);
    if (equals(simpleExponent, Integer.zero))
        return Integer.one;
    if (equals(simpleExponent, Integer.one))
        return simpleBase;
    if (equals(simpleBase, Integer.zero))
        return Integer.zero;
    if (equals(simpleBase, Integer.one))
        return Integer.one;
    if (simpleExponent.isNegative())
        return simplify(new Quotient(Integer.one, new Power(simpleBase, Product.of(Integer.minusOne, simpleExponent))));
    
    if (simpleBase instanceof Number && simpleExponent instanceof Integer)
        return simpleBase.powerInteger(simpleExponent);
    if (simpleBase instanceof Number && simpleExponent instanceof Decimal)
        return simpleBase.powerDecimal(simpleExponent);
    if (simpleBase instanceof Decimal && simpleExponent instanceof Number)
        return simpleBase.powerDecimal(new Decimal(simpleExponent.numeric()));
    //TODO: full factorization
    if (simpleBase instanceof Integer && simpleExponent instanceof Fraction) {
        if (simpleBase.isNegative()) {
            if (simpleExponent.denominator.int % BigInt(2) == BigInt(0))
                throw new Error("Can't raise negative number to fractional power: " + e.toMathJax());
            let sqrt = simpleBase.opposite().powerDecimal(new Decimal(simpleExponent.numeric())).numeric();
            if (Math.floor(sqrt) == sqrt)
                return new Integer(sqrt).opposite();
        }
        let sqrt = simpleBase.powerDecimal(new Decimal(simpleExponent.numeric())).numeric();
        if (Math.floor(sqrt) == sqrt)
            return new Integer(sqrt);
    }
        
    if (simpleBase instanceof Sum && simpleExponent instanceof Integer) {
        let k = simpleBase.addends.length, n = simpleExponent.int;
        let exponentVector: bigint[] = new Array(k).fill(BigInt(0));
        let loop = true;
        let addends = [];
        while (loop) {
            let sum = exponentVector.reduce((s, v, i) => i < k-1 ? s + v : s);
            exponentVector[k-1] = n - sum;
            
            let factors: Expression[] = [new Integer(multinomialCoefficient(exponentVector))];
            simpleBase.addends.forEach((a, i) => { 
                if (exponentVector[i] > 0)
                    factors.push(new Power(a, new Integer(exponentVector[i])));
            });
            addends.push(Product.of(...factors));

            if (sum == n) {
                for (let i = k - 2; i >=0; i--) {
                    if (i == 0)
                        loop = false;
                    else if (exponentVector[i] > 0) {
                        exponentVector[i - 1]++;
                        exponentVector[i] = BigInt(0);
                        break;
                    }
                }
            }
            else
                exponentVector[k-2]++;
        }
        return simplify(Sum.of(...addends));
    }
    if (simpleBase instanceof Product)
        return simplify(Product.of(...simpleBase.factors.map(f => new Power(f, simpleExponent))));
    if (simpleBase instanceof Quotient)
        return simplify(new Quotient(new Power(simpleBase.numerator, simpleExponent), new Power(simpleBase.denominator, simpleExponent)));
    if (simpleBase instanceof Power)
        return simplify(new Power(simpleBase.base, Product.of(simpleBase.exponent, simpleExponent)));
    
    return new Power(simpleBase, simpleExponent);
}

export function simplify(e: Expression): Expression {
    if (e.simplified)
        return e.simplified;

    let result: Expression;

    if (e instanceof Decimal)
        result = simplifyDecimal(e);
    else if (e instanceof Fraction)
        result = simplifyFraction(e);
    else if (e instanceof Sum)
        result = simplifySum(e);
    else if (e instanceof Quotient)
        result = simplifyQuotient(e);
    else if (e instanceof Product)
        result = simplifyProduct(e);
    else if (e instanceof Power)
        result = simplifyPower(e);
    else
        result = e;

    result.simplified = result;
    return result;
}

export function equals(e1: Expression, e2: Expression): boolean {
    e1 = simplify(e1);
    e2 = simplify(e2);
    return e1.identical(e2);
}

export function productOrder(e1: Expression, e2: Expression): number {
    if (e1 instanceof Variable && e2 instanceof Variable) {
        if (e1.name == e2.name) {
            if (!e1.index && e2.index)
                return -1;
            if (e2.index && !e1.index)
                return 1;
            if (e1.index && e2.index) {
                if (e1.index < e2.index)
                    return -1;
                if (e1.index > e2.index)
                    return 1;
            }
            return 0;
        }
        return e1.name < e2.name ? -1 : 1;
    }  

    if (e1 instanceof Sum && e2 instanceof Sum)
        return e2.addends.length > e1.addends.length ? -1 : 1;
    if (e1 instanceof Sum && !(e2 instanceof Sum))
        return 1;
    if (e2 instanceof Sum && !(e1 instanceof Sum))
        return -1;

    if (e1 instanceof Quotient && !(e2 instanceof Product))
        return -1;
    if (e2 instanceof Quotient && !(e2 instanceof Product))
        return 1;

    if (e1 instanceof Product && e2 instanceof Product)
        return e2.factors.length < e1.factors.length ? -1 : 1;
    if (e1 instanceof Product && !(e2 instanceof Product))
        return -1;
    if (e2 instanceof Product && !(e1 instanceof Product))
        return 1;

    if (e1 instanceof Power && e2 instanceof Power)
        return productOrder(e1.base, e2.base);
    if (e1 instanceof Power && !(e2 instanceof Power))
        return productOrder(e1.base, e2);
    if (e2 instanceof Power && !(e1 instanceof Power))
        return productOrder(e1, e2.base);

    if (e1 instanceof Number && e2 instanceof Number)
        return e1.lessThan(e2) ? -1 : 1;
    if (e1 instanceof Number && !(e2 instanceof Number))
        return -1;
    if (e2 instanceof Number && !(e1 instanceof Number))
        return 1;

    return 0;
}

export function sumOrder(e1: Expression, e2: Expression): number {
    if (e1 instanceof Number && e2 instanceof Number)
        return !e1.lessThan(e2) && !e1.identical(e2) ? -1 : 1;
    if (e1 instanceof Number && !(e2 instanceof Number))
        return 1;
    if (e2 instanceof Number && !(e1 instanceof Number))
        return -1;

    if (e1 instanceof Variable && e2 instanceof Variable)
        return productOrder(e1, e2);
    if (e1 instanceof Variable)
        return 1;
    if (e2 instanceof Variable)
        return -1;

    if (e1 instanceof Sum && e2 instanceof Sum)
        return e1.addends.length < e2.addends.length ? -1 : 1;
    if (e1 instanceof Sum && !(e2 instanceof Sum))
        return -1;
    if (e2 instanceof Sum && !(e1 instanceof Sum))
        return 1;
    
    if (e1 instanceof Quotient)
        return -1;
    if (e2 instanceof Quotient)
        return 1;

    if (e1 instanceof Product || e2 instanceof Product) {
        let own = standardForm(e1).addends[0] as Product;
        let other = standardForm(e2).addends[0] as Product;
        let ownHasNumericExponents = own.factors.every((f, i) => i == 0 || (f as Power).exponent instanceof Number);
        let otherHasNumericExponents = other.factors.every((f, i) => i == 0 || (f as Power).exponent instanceof Number);
        if (ownHasNumericExponents && !otherHasNumericExponents)
            return 1;
        if (!ownHasNumericExponents && otherHasNumericExponents)
            return -1;
        if (ownHasNumericExponents && otherHasNumericExponents) {
            let ownExpSum = own.factors.filter((v, i) => i > 0).reduce((sum, v) => sum += ((v as Power).exponent as Number).numeric(), 0);
            let otherExpSum = other.factors.filter((v, i) => i > 0).reduce((sum, v) => sum += ((v as Power).exponent as Number).numeric(), 0);
            if (ownExpSum > otherExpSum)
                return -1;
            if (ownExpSum < otherExpSum)
                return 1;
        }
        for (let i = 1; i < own.factors.length && i < other.factors.length; i++) {
            if (sumOrder((other.factors[i] as Power).base, (own.factors[i] as Power).base) < 0)
                return 1;
            if (sumOrder((own.factors[i] as Power).base, (other.factors[i] as Power).base) < 0)
                return -1;
            if (sumOrder((other.factors[i] as Power).exponent, (own.factors[i] as Power).exponent) < 0)
                return 1;
            if (sumOrder((own.factors[i] as Power).exponent, ((other.factors[i] as Power).exponent)) < 0)
                return -1;
        }
        return 1;
    }

    if (e1 instanceof Power && e2 instanceof Power) {
        if (e1.exponent instanceof Number && e2.exponent instanceof Number && !equals(e1.exponent, e2.exponent))
            return e2.exponent.lessThan(e1.exponent) ? -1 : 1;
        return sumOrder(e1.base, e2.base);
    }
    if (e1 instanceof Power)
        return sumOrder(e1.base, e2);
    if (e2 instanceof Power)
        return sumOrder(e1, e2.base);

    return 0;
}

