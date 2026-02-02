import { Expression } from './expression';
import { Integer, Number } from './numbers';
import { Quotient } from './quotient';
import { engineConfiguration } from '../engine-configuration';
import { Variable } from './variable';

export class Product implements Expression {
    readonly factors: readonly Expression[] = [];
    readonly simplified: Expression | null = null;

    protected constructor(factors: Expression[]) {
        this.factors = factors;
    }

    static of(...factors: Expression[]): Product {
        return new Product(factors);
    }

    copy(): Product {
        return Product.of(...this.factors.map((f) => f.copy()));
    }

    toLatex(): string {
        const config = engineConfiguration.mathJax.alwaysDisplayMultiplicationSign;
        let result = '';
        this.factors.forEach((f, i) => {
            const withBrackets = f.precedence() < this.precedence() || (i > 0 && f.isNegative());
            if (
                i > 0 &&
                (config ||
                    (!withBrackets &&
                        (f instanceof Number || f instanceof Quotient) &&
                        !this.factors[i - 1].identical(Integer.minusOne)))
            ) {
                result += ' \\cdot ';
            }
            if (i == 0 && this.factors.length > 1 && f.identical(Integer.minusOne) && !config) {
                result += '-';
            } else if (withBrackets) {
                result += '\\left(' + f.toLatex() + '\\right)';
            } else {
                result += f.toLatex();
            }
        });
        return result;
    }

    isNegative(): boolean {
        return this.factors.length > 0 && this.factors[0].isNegative();
    }

    identical(other: Expression): boolean {
        return (
            other instanceof Product &&
            this.factors.length == other.factors.length &&
            this.factors.every((f, i) => f.identical(other.factors[i]))
        );
    }

    substitute(old: Expression, e: Expression): Expression {
        if (old instanceof Product && old.factors.every((a) => this.factors.some((a2) => a.identical(a2)))) {
            const newFactors = [...old.factors];
            old.factors.forEach((a) => {
                for (let i = 0; i < newFactors.length; i++) {
                    if (a.identical(newFactors[i])) {
                        newFactors.splice(i, 1);
                        break;
                    }
                }
            });
            newFactors.push(e);
            return Product.of(...newFactors);
        }

        return Product.of(...this.factors.map((f) => f.substitute(old, e)));
    }

    precedence(): number {
        return 1;
    }

    allVariables(): Variable[] {
        const result = this.factors.flatMap((a) => a.allVariables());
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
