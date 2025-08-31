import { Expression } from './expression';

export class Variable implements Expression {
    readonly simplified: Expression | null = null;
    readonly name: string = '';
    readonly index?: number | string;

    constructor(name: string, index?: number | string) {
        this.name = name;
        this.index = index;
    }

    copy(): Variable {
        return this; //new Variable(this.name, this.index);
    }

    toMathJax(): string {
        const longIndex = ('' + this.index).length > 1;
        return this.name + (this.index ? '_' + (longIndex ? '{' + this.index + '}' : this.index) : '');
    }

    isNegative(): boolean {
        return false;
    }

    identical(other: Expression): boolean {
        return other instanceof Variable && this.name == other.name && this.index == other.index;
    }

    substitute(old: Expression, e: Expression): Expression {
        if (old.identical(this)) {
            return e;
        } else {
            return this;
        }
    }

    precedence(): number {
        return Infinity;
    }

    allVariables(): Variable[] {
        return [this];
    }
}
