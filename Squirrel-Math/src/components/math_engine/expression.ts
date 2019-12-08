import { Integer, instanceOfNumber } from './number';
import { Sum } from './sum';
import { Variable } from './variable';
import { Product } from './product';
import { Power } from './power';
import { Quotient } from './quotient';

export interface Expression {
    toMathJax(): string;
    isNegative(): boolean;
    simplify(): Expression;
    equals(other: Expression): boolean;

    precedence(): number;
    inSumBefore(other: Expression): boolean;
    inProductBefore(other: Expression): boolean;
 }

 export function parseExpression(text: string): Expression {
    let result: Sum = new Sum();
    let addend: Expression | null = null;
    let position = 0;

    let nextToken = function(): Expression {
        let char = text[position];
        if (char == '(') {
            let bracket = "";
            position++;
            let open = 1;
            while (open > 0 && position < text.length) {
                if (text[position] == '(')
                    open++;
                if (text[position] == ')')
                    open--;
                if (open > 0)
                    bracket += text[position];
                position++;
            }
            return parseExpression(bracket);
        }
        else if (char >= '0' && char <= '9') {
            let number = "";
            while (text[position] >= '0' && text[position] <= '9')
                number += text[position++];
            return new Integer(parseInt(number));
        }
        else {
            position++;
            return new Variable(char);
        }
    }

    while (position < text.length) {
        let char = text[position];
        if (char == '+') {
            if (addend)
                result.addends.push(addend);
            addend = null;
            position++;
        }
        else if (char == '-') {
            if (addend)
                result.addends.push(addend);
            position++;
            let next = nextToken();
            if (instanceOfNumber(next))
                addend = next.multiply(new Integer(-1));
            else
                addend = Product.of(new Integer(-1), next);
            position++;
        }
        else if (char == '*') {
            if (!addend)
                throw "Niepoprawny symbol * " + (position == 0 ? "na początku" : "po " + text.substr(0, position));
            position++;
        }
        else if (char == ' ' || char=='\t' || char=='\n' || char=='\r') {
            position++;
        }
        else if (char == '_') {
            if (!addend)
                throw "Niepoprawny symbol _ " + (position == 0 ? "na początku" : "po " + text.substr(0, position));
            position++;
            let index = "";
            if (text[position] == '(') {
                while (text[++position] != ')')
                    index += text[position];
                position++;
            }
            else
                index = text[position];
            if (addend instanceof Variable)
                addend.index = index;
            else if (addend instanceof Product && addend.factors[addend.factors.length - 1] instanceof Variable)
                (addend.factors[addend.factors.length - 1] as Variable).index = index;
        }
        else if (char == '^') {
            if (!addend)
                throw "Niepoprawny symbol ^ " + (position == 0 ? "na początku" : "po " + text.substr(0, position));
            position++;
            let exponent = nextToken();
            if (addend instanceof Product)
                addend.factors.push(new Power(addend.factors.pop() as Expression, exponent));
            else
                addend = new Power(addend, exponent);
        }
        else if (char == '/' || char == ':') {
            if (!addend)
                throw "Niepoprawny symbol / " + (position == 0 ? "na początku" : "po " + text.substr(0, position));
            position++;
            let denominator = nextToken();
            if (addend instanceof Product)
                addend.factors.push(new Quotient(addend.factors.pop() as Expression, denominator));
            else
                addend = new Quotient(addend, denominator);
        }
        else {
            let expression = nextToken();
            if (!addend)
                addend = expression;
            else if (addend instanceof Product)
                addend.factors.push(expression)
            else 
                addend = Product.of(addend, expression);
        }

    }
    if (addend)
        result.addends.push(addend);
    if (result.addends.length == 0)
        return Integer.zero;
    if (result.addends.length == 1)
        return result.addends[0];
    return result;
 }