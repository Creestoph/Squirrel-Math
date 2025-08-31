import { Expression } from '../algebra-engine/expression';
import { Variable } from '../algebra-engine/variable';
import { simplify } from '../algebra-engine/algorithms/simplification-algorithm';

export class Function {
    readonly formula: Expression;
    readonly variables: Variable[];

    constructor(formula: Expression, variables: Variable[]) {
        this.formula = formula;
        this.variables = variables;
    }

    valueAt(substitutions: Map<Variable, Expression>) {
        let value = this.formula;
        for (let v of substitutions.keys())
            value = value.substitute(v, substitutions.get(v)!);
        return simplify(value);
    }
}
