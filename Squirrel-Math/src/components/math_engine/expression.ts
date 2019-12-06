export interface Expression {
    toMathJax(): string;
    isNegative(): boolean;
    simplify(): Expression;
    equals(other: Expression): boolean;
    precedence(): number;
 }