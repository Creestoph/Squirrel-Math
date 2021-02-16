import { Set } from './set';
import { Expression } from '../algebra-engine/expression';
import { Integer, Number, Infty } from '../algebra-engine/numbers';
import { Sum } from '../algebra-engine/sum';
import { equals } from '../algebra-engine/algorithms/simplification-algorithm';

export class SetSum implements Set {
    addends: Set[];

    constructor(...addends: Set[]) {
        this.addends = addends;
    }

    copy(): SetSum {
        return new SetSum(...this.addends.map(a => a.copy()));
    }

    toMathJax(): string {
        return this.addends.map(a => a.toMathJax()).join("\\cup");
    }

    includes(e: Expression): boolean {
        return this.addends.some(a => a.includes(e));
    }

    randomElement(): Expression | undefined {
        let own = this.copy();
        if (own.addends.some(a => !a.isFinite()))
            for (let i = 0; i < own.addends.length; i++)
                if (own.addends[i].isFinite())
                    own.addends.splice(i--, 1);
        if (own.addends.some(a => equals(a.size(), Infty.positive)))
            for (let i = 0; i < own.addends.length; i++)
                if (!equals(own.addends[i].size(), Infty.positive))
                    own.addends.splice(i--, 1);
        let totalSize = 0;
        own.addends.forEach(a => {
            let aSize = a.size();
            totalSize += aSize instanceof Number ? equals(aSize, Infty.positive) ? 1 : aSize.numeric() : 1;
        });
        let which = Math.random()*totalSize;
        let partialSize = 0;
        own.addends.forEach(a => {
            let aSize = a.size();
            partialSize += aSize instanceof Number ? aSize.numeric() : 1;
            if (partialSize >= which)
                return a.randomElement();
        });
        return own.addends[own.addends.length - 1].randomElement();
    }

    isFinite(): boolean {
        return this.addends.every(a => a.isFinite());
    }

    size(): Expression {
        return Sum.of(...this.addends.map(a => a.size()));
    }

    equals(other: Set) {
        return other instanceof SetSum && 
        this.addends.every(a => other.addends.some(o => a.equals(o))) && 
        other.addends.every(a => this.addends.some(o => a.equals(o)));
    }
}