import { Expression } from '../algebra-engine/expression';
import { Integer } from '../algebra-engine/numbers';

export abstract class Set {
    static empty: Set = {
        includes(_x: Expression) {
            return false;
        },
        randomElement(): Expression | undefined {
            return undefined;
        },
        isFinite(): boolean {
            return true;
        },
        size(): Expression {
            return Integer.zero;
        },
        copy(): Set {
            return this;
        },
        equals(other: Set): boolean {
            return other == Set.empty;
        },
        toLatex(): string {
            return '\\emptyset';
        },
    };

    abstract includes(x: Expression): boolean;
    abstract randomElement(): Expression | undefined;
    abstract isFinite(): boolean;
    abstract size(): Expression;
    abstract copy(): Set;
    abstract equals(other: Set): boolean;
    abstract toLatex(): string;
}
