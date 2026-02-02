import { Variable } from './variable';
import { Expression } from './expression';

export interface AlgebraicNotion {
    toMathJax(): string; //TODO: remove after migrating
    toLatex(): string;
    substitute(v: Variable, e: Expression): AlgebraicNotion;
    copy(): AlgebraicNotion;
}
