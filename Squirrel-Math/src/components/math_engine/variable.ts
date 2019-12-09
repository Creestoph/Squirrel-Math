import { Expression } from './expression';
import { Number } from './number';
import { Power } from './power';

export class Variable implements Expression {
    name: string = "";
    index?: number | string;
    constructor(name: string, index? : number | string) {
        this.name = name;
        this.index = index;
    }

    toMathJax(): string {
        return this.name + (this.index ? "_{" + this.index + "}" : "");
    }

    isNegative(): boolean {
        return false;
    }

    equals(other: Expression): boolean {
        other = other.simplify();
        if (other instanceof Variable)
            return other.name == this.name && other.index == this.index;
        return false;
    }

    simplify(): Expression {
        return this;
    }

    precedence(): number {
        return Infinity;
    }

    inSumBefore(other: Expression): boolean {
        if (other instanceof Number)
            return true;
        if (other instanceof Variable)
            return this.inProductBefore(other);
        return false;
    }
    inProductBefore(other: Expression): boolean {
        if (other instanceof Variable) {
            if (this.name == other.name) {
                if (!other.index && this.index)
                    return true;
                if (other.index && !this.index)
                    return false;
                if (this.index && other.index)
                    return this.index < other.index;
                return false;
            }
            return this.name < other.name;
        }  
        if (other instanceof Power) {
            return this.inProductBefore(other.base);
        }
        return false;
    }
}