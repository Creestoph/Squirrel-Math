import { Expression } from './expression';

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
}