import { Integer, Decimal, Number, Fraction } from './numbers';
import { Sum } from './sum';
import { Variable } from './variable';
import { Product } from './product';
import { Power } from './power';
import { Quotient } from './quotient';
import { AlgebraicNotion } from './algebraic-notion';

export interface Expression extends AlgebraicNotion {
    simplified: Expression | null;
    isNegative(): boolean;
    identical(other: Expression): boolean;
    substitute(v: Expression, e: Expression): Expression;
    precedence(): number;
    copy(): Expression;
    allVariables(): Variable[];
}

export function parseExpression(text: string): Expression {
    const resultAddends: Expression[] = [];
    let addend: Expression | null = null;
    let position = 0;
    let lastToken: Expression | null = null;
    let rememberedMinus: boolean = false;
    let expectToken: boolean = false;

    const nextToken = function (): Expression {
        const char = text[position];
        const bracketPairs: { [open: string]: string } = {
            '(': ')',
            '[': ']',
            '{': '}',
        };
        if (Object.keys(bracketPairs).includes(char)) {
            let bracket = '';
            position++;
            let open = 1;
            const openPosition = position;
            while (open > 0) {
                if (position == text.length) {
                    throw (
                        'Unclosed bracket ' +
                        char +
                        ' open ' +
                        (openPosition == 0 ? 'at the beginning' : 'after ' + text.substr(0, openPosition - 1)) +
                        ' in expression ' +
                        text
                    );
                }
                if (text[position] == char) {
                    open++;
                }
                if (text[position] == bracketPairs[char]) {
                    open--;
                }
                if (open > 0) {
                    bracket += text[position];
                }
                position++;
            }
            return parseExpression(bracket);
        } else if (char >= '0' && char <= '9') {
            let number = '';
            while (text[position] >= '0' && text[position] <= '9') {
                number += text[position++];
            }
            if (text[position] == '.' || text[position] == ',') {
                number += '.';
                position++;
                while (text[position] >= '0' && text[position] <= '9') {
                    number += text[position++];
                }
                return new Decimal(parseFloat(number));
            }
            return new Integer(BigInt(number));
        } else if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
            position++;
            return new Variable(char);
        } else {
            throw (
                'Wrong character ' +
                char +
                ' ' +
                (position == 0 ? 'at the beginning' : 'after ' + text.substr(0, position))
            );
        }
    };

    const injectToken = function () {
        if (lastToken) {
            if (rememberedMinus) {
                if (lastToken instanceof Number) {
                    lastToken = lastToken.multiply(Integer.minusOne);
                } else {
                    lastToken = Product.of(Integer.minusOne, lastToken);
                }
                rememberedMinus = false;
            }
            if (!addend) {
                addend = lastToken;
            } else if (addend instanceof Product) {
                addend = Product.of(...addend.factors, lastToken);
            } else {
                addend = Product.of(addend, lastToken);
            }
        }
    };

    while (position < text.length) {
        const char = text[position];
        if (char == '+' || char == '-') {
            if (char == '+' && (expectToken || !lastToken)) {
                throw (
                    'Wrong character ' +
                    char +
                    (position == 0 ? ' at the beginning' : ' after ' + text.substr(0, position))
                );
            }
            injectToken();
            if (addend) {
                resultAddends.push(addend);
            }
            lastToken = null;
            addend = null;
            position++;
            if (char == '-') {
                rememberedMinus = !rememberedMinus;
            }
        } else if (char == '*') {
            if (!lastToken) {
                throw 'Wrong character * ' + (position == 0 ? 'at the beginning' : 'after ' + text.substr(0, position));
            }
            position++;
            expectToken = true;
        } else if (char == '=') {
            throw 'Equality sign is not part of algebraic expression.';
        } else if (char == ' ' || char == '\t' || char == '\n' || char == '\r') {
            position++;
        } else if (char == '_') {
            position++;
            const index = nextToken().toLatex();
            if (expectToken || !lastToken || !(lastToken instanceof Variable)) {
                throw 'Wrong character _ ' + (position == 0 ? 'at the beginning' : 'after ' + text.substr(0, position));
            } else {
                lastToken = new Variable(lastToken.name, index);
            }
        } else if (char == '^') {
            if (expectToken || !lastToken) {
                throw 'Wrong character ^ ' + (position == 0 ? 'at the beginning' : 'after ' + text.substr(0, position));
            }
            position++;
            const exponent = nextToken();
            lastToken = new Power(lastToken, exponent);
        } else if (char == '/' || char == ':') {
            if (expectToken || !lastToken) {
                throw 'Wrong character / ' + (position == 0 ? 'at the beginning' : 'after ' + text.substr(0, position));
            }
            position++;
            const denominator = nextToken();
            if (lastToken instanceof Integer && denominator instanceof Integer) {
                lastToken = new Fraction(lastToken.int, denominator.int);
            } else {
                lastToken = new Quotient(lastToken, denominator);
            }
        } else {
            injectToken();
            lastToken = nextToken();
            expectToken = false;
        }
    }
    injectToken();
    if (addend) {
        resultAddends.push(addend);
    }
    if (resultAddends.length == 0) {
        return Integer.zero;
    }
    if (resultAddends.length == 1) {
        return resultAddends[0];
    }
    return Sum.of(...resultAddends);
}
