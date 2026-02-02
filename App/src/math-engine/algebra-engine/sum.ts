import { Expression } from './expression';
import { Integer } from './numbers';
import { Product } from './product';
import { Variable } from './variable';

export class Sum implements Expression {
    readonly addends: readonly Expression[] = [];
    readonly simplified: Expression | null = null;

    protected constructor(addends: Expression[]) {
        this.addends = addends;
    }

    static of(...addends: Expression[]): Sum {
        return new Sum(addends);
    }

    static difference(a: Expression, b: Expression): Sum {
        return Sum.of(a, Product.of(Integer.minusOne, b));
    }

    //if any of the arguments are sums, join their addends into newly created
    static joined(...addends: Expression[]): Sum {
        return Sum.of(...addends.flatMap((a) => (a instanceof Sum ? [...a.addends] : [a])));
    }

    copy(): Sum {
        return Sum.of(...this.addends.map((a) => a.copy()));
    }

    toLatex(): string {
        if (this.addends.length == 0) {
            return '0';
        }
        let result = '';
        this.addends.forEach((a, i) => {
            if (i > 0) {
                result += a.isNegative() ? ' ' : ' + ';
            }
            if (a.precedence() <= this.precedence()) {
                result += '\\left(' + a.toLatex() + '\\right)';
            } else {
                result += a.toLatex();
            }
        });
        return result;
    }

    isNegative(): boolean {
        return false;
    }

    substitute(old: Expression, e: Expression): Expression {
        if (old instanceof Sum && old.addends.every((a) => this.addends.some((a2) => a.identical(a2)))) {
            const newAddends = [...old.addends];
            newAddends.forEach((a) => {
                for (let i = 0; i < newAddends.length; i++) {
                    if (a.identical(newAddends[i])) {
                        newAddends.splice(i, 1);
                        break;
                    }
                }
            });
            newAddends.push(e);
            return Sum.of(...newAddends);
        }
        return Sum.of(...this.addends.map((a) => a.substitute(old, e)));
    }

    identical(other: Expression): boolean {
        return (
            other instanceof Sum &&
            this.addends.length == other.addends.length &&
            this.addends.every((a, i) => a.identical(other.addends[i]))
        );
    }

    precedence(): number {
        return 0;
    }

    allVariables(): Variable[] {
        const result = this.addends.flatMap((a) => a.allVariables());
        for (let i = 0; i < result.length; i++) {
            for (let j = i + 1; j < result.length; j++) {
                if (result[j].identical(result[i])) {
                    result.splice(j--, 1);
                }
            }
        }
        return result;
    }
}
