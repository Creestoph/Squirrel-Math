import { Expression } from '../algebra-engine/expression';
import { Set } from './set';
import { Integer } from '../algebra-engine/numbers';
import { equals } from '../algebra-engine/algorithms/simplification-algorithm';

export class FiniteSet implements Set {
    elements: Expression[];

    constructor(...elements: Expression[]) {
        for (let i = 0; i < elements.length; i++)
            for (let j = i +1; j < elements.length; j++)
                if (equals(elements[j], elements[i]))
                    elements.splice(j--, 1);
        this.elements = elements;
    }

    copy(): FiniteSet {
        return new FiniteSet(...this.elements.map(e => e.copy()));
    }

    toMathJax() {
        return "\\{" + this.elements.map(e => e.toMathJax()).join(", ") + "\\}";
    }

    includes(x: Expression) { 
        return this.elements.some(e => equals(e, x)); 
    }

    randomElement(): Expression | undefined { 
        if (this.elements.length == 0)
            return undefined;
        else
            return this.elements[Math.floor(Math.random()*this.elements.length)];
    }

    isFinite(): boolean { 
        return true; 
    }

    size(): Expression { 
        return new Integer(this.elements.length);
    }

    equals(other: Set) {
        return other instanceof FiniteSet && 
        this.elements.every(e => other.elements.some(o => equals(e, o))) &&
        other.elements.every(e => this.elements.some(o => equals(e, o)));
    }
}