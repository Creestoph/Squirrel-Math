import { Expression } from './expression';
import { Variable } from './variable';

abstract class Constant implements Expression {
    simplified = this;

    abstract toLatex(): string; 
    abstract numeric(): number;

    isNegative() {
        return false;
    }
    identical(other: Expression): boolean {
        return other == this;
    }
    substitute(v: Expression, e: Expression): Expression {
        if (v.identical(this)) return e;
        return this;
    }
    precedence(): number {
        return Infinity;
    }
    copy(): Expression {
        return this;
    }
    allVariables(): Variable[] {
        return [];
    }
}

export const constantE = new (class extends Constant {
    toLatex(): string {
        return 'e';
    }
    numeric(): number {
        return Math.E;
    }
})();

export const constantPI = new (class extends Constant {
    toLatex(): string {
        return '\\pi';
    }
    numeric(): number {
        return Math.PI;
    }
})();
