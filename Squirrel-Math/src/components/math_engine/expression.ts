import { Integer, instanceOfNumber, Decimal } from './numbers';
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
    let lastToken: Expression | null = null;
    let rememberedMinus: boolean = false;

    let nextToken = function(): Expression {
        let char = text[position];
        if (char == '(') {
            let bracket = "";
            position++;
            let open = 1;
            let openPosition = position;
            while (open > 0) {
                if (position == text.length) 
                    throw "Niedomknięty nawias otwarty po " + char + " " + (position == 0 ? "na początku" : "po " + text.substr(0, position));

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
            if (text[position] == '.' || text[position] == ',') {
                number += '.';
                position++;
                while (text[position] >= '0' && text[position] <= '9')
                    number += text[position++];
                return new Decimal(parseFloat(number));
            }
            return new Integer(parseInt(number));
        }
        else if (char >= 'a' && char <= 'z' || char >= 'A' && char <= 'Z') {
            position++;
            return new Variable(char);
        }
        else
            throw "Niepoprawny symbol " + char + " " + (position == 0 ? "na początku" : "po " + text.substr(0, position));
    }

    let injectToken = function(){
        if (lastToken) {
            if (rememberedMinus) {
                if (instanceOfNumber(lastToken))
                    lastToken = lastToken.multiply(new Integer(-1));
                else 
                    lastToken = Product.of(new Integer(-1), lastToken);
                rememberedMinus = false;
            }
            if (!addend)
                addend = lastToken;
            else if (addend instanceof Product)
                addend.factors.push(lastToken)
            else 
                addend = Product.of(addend, lastToken);
        }
    }

    while (position < text.length) {
        let char = text[position];
        if (char == '+' || char == '-') {
            injectToken();
            if (addend)
                result.addends.push(addend);
            lastToken = null;
            addend = null;
            position++;
            if (char == '-')
                rememberedMinus = true;
        }
        else if (char == '*') {
            if (!lastToken)
                throw "Niepoprawny symbol * " + (position == 0 ? "na początku" : "po " + text.substr(0, position));
            position++;
        }
        else if (char == '=') {
            throw "Znak równości tu nie pasuje, wpisz jedynie wyrażenie algebraiczne";
        }
        else if (char == ' ' || char=='\t' || char=='\n' || char=='\r') {
            position++;
        }
        else if (char == '_') {
            position++;
            let index = nextToken().toMathJax();
            if (!lastToken || !(lastToken instanceof Variable))
                throw "Niepoprawny symbol _ " + (position == 0 ? "na początku" : "po " + text.substr(0, position));
            else
                lastToken.index = index;
        }
        else if (char == '^') {
            if (!lastToken)
                throw "Niepoprawny symbol ^ " + (position == 0 ? "na początku" : "po " + text.substr(0, position));
            position++;
            let exponent = nextToken();
            lastToken = new Power(lastToken, exponent);
        }
        else if (char == '/' || char == ':') {
            if (!lastToken)
                throw "Niepoprawny symbol / " + (position == 0 ? "na początku" : "po " + text.substr(0, position));
            position++;
            let denominator = nextToken();
            lastToken = new Quotient(lastToken, denominator);
        }
        else {
            injectToken();
            lastToken = nextToken();
        }

    }
    injectToken();
    if (addend)
        result.addends.push(addend);
    if (result.addends.length == 0)
        return Integer.zero;
    if (result.addends.length == 1)
        return result.addends[0];
    return result;
 }