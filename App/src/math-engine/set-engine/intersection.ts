import { Set } from './set';
import { Expression } from '../algebra-engine/expression';
import { Sum } from '../algebra-engine/sum';

export class Intersection implements Set {
    sets: Set[];

    constructor(...sets: Set[]) {
        this.sets = sets;
    }

    copy(): Intersection {
        return new Intersection(...this.sets.map((a) => a.copy()));
    }

    toLatex(): string {
        return this.sets.map((s) => s.toLatex()).join('\\cap');
    }

    includes(e: Expression): boolean {
        return this.sets.every((a) => a.includes(e));
    }

    randomElement(): Expression | undefined {
        if (this.sets.length == 0) {
            return undefined;
        }
        let result = this.sets[0].randomElement();
        if (result != undefined) {
            let trials = 0;
            do {
                result = this.sets[0].randomElement();
            } while (
                trials++ < 100000 &&
                (result == undefined || this.sets.some((s) => !s.includes(result as Expression)))
            );
        }
        return result;
    }

    isFinite(): boolean {
        return this.sets.some((a) => a.isFinite());
    }

    size(): Expression {
        return Sum.of(...this.sets.map((a) => a.size()));
    }

    equals(other: Set) {
        return (
            other instanceof Intersection &&
            this.sets.every((a) => other.sets.some((o) => a.equals(o))) &&
            other.sets.every((a) => this.sets.some((o) => a.equals(o)))
        );
    }
}
