import { expect } from 'chai';
import { Variable } from '../math-engine/algebra-engine/variable';
import { Integer, Number } from '../math-engine/algebra-engine/numbers';
import { parseExpression } from '../math-engine/algebra-engine/expression';
import {
    Equation,
    parseEquation,
} from '../math-engine/algebra-engine/equation';
import { FiniteSet } from '../math-engine/set-engine/finite-set';
import { Polynomial } from '../math-engine/algebra-engine/polynomial';
import { Quotient } from '../math-engine/algebra-engine/quotient';
import {
    multivariateDivision,
    monomialLexOrder,
    monomialGLexOrder,
    monomialGRevLexOrder,
    grobnerBasis,
    factorize,
} from '../math-engine/algebra-engine/algorithms/polynomial-algorithms';
import {
    equals,
    simplify,
    productOrder,
} from '../math-engine/algebra-engine/algorithms/simplification-algorithm';
import {
    solveEquation,
    solveNumeric,
    solvePolynomialSystem,
} from '../math-engine/algebra-engine/algorithms/equation-algorithms';
import { Sum } from '../math-engine/algebra-engine/sum';
import { Function } from '../math-engine/analysis-engine/function';
import { derivative } from '../math-engine/analysis-engine/analysis-algorithms';
import { engineConfiguration } from '../math-engine/engine-configuration';
import { Order } from '../math-engine/set-engine/order';
import {
    factorizeNumber,
    numericGCD,
    numericLCM,
} from '../math-engine/algebra-engine/algorithms/numeric-algorithms';

function equalTest(a: string, b: string) {
    it(
        a + ' = ' + b,
        () => expect(equals(parseExpression(a), parseExpression(b))).to.be.true,
    );
}

function solutions(equation: string, s: string) {
    it(equation + ' solutions: ' + s, () => {
        let expected = new FiniteSet(
            ...s.split(',').map((s) => parseExpression(s)),
        );
        let calculated = solveEquation(
            new Equation(parseExpression(equation), Integer.zero),
            new Variable('x'),
        );
        expect(calculated instanceof FiniteSet && calculated.equals(expected))
            .to.be.true;
    });
}

function systemSolution(
    equations: string[],
    variables: string[],
    s: string[][],
) {
    it(
        equations.join(' and ') +
            ' in variables ' +
            variables.join(', ') +
            ' give solution: ' +
            s,
        () => {
            let expected = s.map((s) => s.map((s) => parseExpression(s)));
            let calculated = solvePolynomialSystem(
                equations.map((e) =>
                    Polynomial.asPolynomial(parseEquation(e).simplified().left),
                ),
                variables.map((v) => parseExpression(v) as Variable),
            );
            expect(
                calculated.length == s.length &&
                    calculated.every((c) =>
                        expected.some((e) =>
                            c.every((cc, i) => equals(cc, e[i])),
                        ),
                    ),
            ).to.be.true;
        },
    );
}

function numericSolutions(
    equation: string,
    s: string,
    lowerBoud: number,
    upperBound: number,
    step: number,
    precision: number,
) {
    it(equation + ' solutions: ' + s, () => {
        let expected = new FiniteSet(
            ...s.split(',').map((s) => parseExpression(s)),
        );
        let calculated = solveNumeric(
            new Equation(parseExpression(equation), Integer.zero),
            new Variable('x'),
            lowerBoud,
            upperBound,
            step,
            precision,
        );
        expect(
            calculated.elements.every(
                (c) =>
                    c instanceof Number &&
                    expected.elements.some(
                        (e) =>
                            Math.abs((e as Number).numeric() - c.numeric()) <
                            precision,
                    ),
            ),
        ).to.be.true;
        expect(
            expected.elements.every((e) =>
                calculated.elements.some(
                    (c) =>
                        Math.abs(
                            (e as Number).numeric() - (c as Number).numeric(),
                        ) < precision,
                ),
            ),
        ).to.be.true;
    });
}

function derivate(formula: string, expected: string) {
    it(formula + ' has derivative ' + expected, () => {
        let v = new Variable('x');
        expect(
            equals(
                derivative(new Function(parseExpression(formula), [v]), v)
                    .formula,
                parseExpression(expected),
            ),
        ).to.be.true;
    });
}

function numericFactors(number: string, factors: string) {
    it(number + ' factorizes to: ' + factors, () => {
        let expected = factors.split(',').map((s) => BigInt(s));
        let calculated = factorizeNumber(BigInt(number));
        expect(
            expected.length == calculated.length &&
                expected.every((e, i) => e === calculated[i]),
        ).to.be.true;
    });
}

function factors(e: string, f: string) {
    it(e + ' factorizes to: ' + f, () => {
        let expected = f
            .split(',')
            .map((s) => parseExpression(s))
            .sort(productOrder);
        let calculated = [...factorize(parseExpression(e)).factors].sort(
            productOrder,
        );
        expect(
            expected.length == calculated.length &&
                expected.every((e, i) => equals(e, calculated[i])),
        ).to.be.true;
    });
}

function numericLeastCommonMultiple(args: string, expected: string) {
    it('lcm(' + args + ') = ' + expected, () => {
        let numbers = args.split(',').map((s) => BigInt(s));
        let calculated = numericLCM(...numbers);
        expect(BigInt(expected) === calculated).to.be.true;
    });
}

function numericGreatestCommonDivisor(args: string, expected: string) {
    it('gcd(' + args + ') = ' + expected, () => {
        let numbers = args.split(',').map((s) => BigInt(s));
        let calculated = numericGCD(...numbers);
        expect(BigInt(expected) === calculated).to.be.true;
    });
}

function orderedPolynomial(p: string, order: Order, expected: string) {
    it(p + ' in order ' + order.descending.name + ' is ' + expected, () => {
        let input = Polynomial.asPolynomial(
            parseExpression(p),
            undefined,
            order,
        );
        let output = parseExpression(expected) as Sum;
        expect(input.monomials.every((m, i) => equals(m, output.addends[i]))).to
            .be.true;
    });
}

function divisionRemainder(
    p: string,
    base: string[],
    expected: string,
    variables?: string[],
) {
    it(
        p +
            ' in base ' +
            base +
            (variables ? ' with variables ' + variables : '') +
            ' is ' +
            expected,
        () => {
            let vars = variables
                ? variables.map((v) => parseExpression(v) as Variable)
                : undefined;
            expect(
                equals(
                    multivariateDivision(
                        Polynomial.asPolynomial(parseExpression(p)),
                        base.map((s) =>
                            Polynomial.asPolynomial(parseExpression(s)),
                        ),
                        monomialLexOrder,
                        vars,
                    ).remainder,
                    parseExpression(expected),
                ),
            ).to.be.true;
        },
    );
}

function grobner(
    p: string[],
    order: string,
    expected: string[],
    variables?: string[],
) {
    it(
        p +
            ' generates basis ' +
            expected +
            ' (with ' +
            order +
            (variables ? ' and variables ' + variables : '') +
            ')',
        () => {
            let poly = p.map(
                (s) =>
                    Polynomial.asPolynomial(parseExpression(s)) as Polynomial,
            );
            let o;
            let ex = expected.map((e) => parseExpression(e));
            let vars = variables
                ? variables.map((v) => parseExpression(v) as Variable)
                : undefined;
            switch (order) {
                case 'lex':
                    o = monomialLexOrder;
                    break;
                case 'glex':
                    o = monomialGLexOrder;
                    break;
                case 'grevlex':
                    o = monomialGRevLexOrder;
                    break;
            }
            expect(
                grobnerBasis(poly, o, vars).every((g) =>
                    ex.some(
                        (e) => simplify(new Quotient(g, e)) instanceof Number,
                    ),
                ),
            ).to.be.true;
        },
    );
}

describe('number operations', () => {
    equalTest('2+2', '4');
    equalTest('4-10', '-6');
    equalTest('2+1/3', '7/3');
    equalTest('10*1/5', '2');
    equalTest('1/(2/4/3)', '6');
    equalTest('2^(-10)', '1/1024');
    equalTest('(-8)^(1/3)', '-2');
    equalTest('4^(2^(-1))', '2');
});

describe('numeric algorithms', () => {
    numericLeastCommonMultiple('2,3,5', '30');
    numericLeastCommonMultiple('6,10,20', '60');
    numericLeastCommonMultiple('10,1', '10');
    numericLeastCommonMultiple('0', '0');
    numericGreatestCommonDivisor('2,3,5', '1');
    numericGreatestCommonDivisor('6,10,20', '2');
    numericGreatestCommonDivisor('10,1', '1');
    numericFactors('60', '2,2,3,5');
    numericFactors('32', '2,2,2,2,2');
    numericFactors('1', '1');
    numericFactors('0', '0');
});

describe('algebraic equalities', () => {
    equalTest('(a-b)/(d-c)', '(b-a)/(c-d)');
});

describe('algebraic simplifications', () => {
    engineConfiguration.factorizeQuotients = true;
    equalTest('a+2a', '3a');
    equalTest('jajco', 'acj^2o');
    equalTest('a^2+b-4a-5b', 'a^2-4b-4a');
    equalTest('(a-b)^2', 'a^2-2ab+b^2');
    equalTest('1/(1/a+1/b)', 'ab/(a+b)');
    equalTest('1/(a+b)+2/(a+b)+3/(a+b)', '6/(a+b)');
    equalTest(
        '(a+b)/(b+c)+(b+c)/(c+d)',
        '(ac+ad+bd+b^2+3bc+c^2)/(bc+bd+c^2+cd)',
    );
    equalTest('(a^2-b^2)/(a-b)', 'a+b');
    equalTest('2/(b-a)', '-2/(a-b)');
});

describe('equations', () => {
    solutions('x', '0');
    solutions('2x+x-1', '1/3');
    solutions('(x+1)^2', '-1');
    solutions('x^2-4', '2,-2');
    solutions('x^2+5x-1', '-5/2+(29)^(1/2)/2,-5/2-(29)^(1/2)/2');
});

describe('numeric equations', () => {
    numericSolutions('x', '0', -1, 1, 0.1, 0.1);
    numericSolutions('2x+x-1', '1/3', -100, 100, 0.1, 0.001);
    numericSolutions('(x+1)^2', '-1', -6, 3, 1, 0.1);
    numericSolutions('x^2-4', '2,-2', -100, 100, 2, 0.0001);
    numericSolutions('x^2+5x-1', '0.192,-5.192', -100, 100, 1, 0.01);
    numericSolutions('x^3+2x^2-x+4', '-2.8455', -100, 100, 1, 0.001);
    numericSolutions(
        'x^10-2x^8+5x^4-10',
        '-1.26044, 1.26044',
        -100,
        100,
        1,
        0.0001,
    );
    numericSolutions('2^x-5x', '0.235, 4.488', -100, 100, 3, 0.01);
});

describe('linear systems', () => {
    systemSolution(['x=0'], ['x'], [['0']]);
    systemSolution(['x=0', 'y=0'], ['x', 'y'], [['0', '0']]);
    systemSolution(['x+y=2', 'x-y=0'], ['x', 'y'], [['1', '1']]);
    systemSolution(['2x-y=0', 'x-4y=3'], ['x', 'y'], [['-3/7', '-6/7']]);
    systemSolution(
        ['y_1=ax_1+b', 'y_2=ax_2+b'],
        ['a', 'b'],
        [['(y_2-y_1)/(x_2-x_1)', '(x_2y_1-x_1y_2)/(x_2-x_1)']],
    );
    systemSolution(
        ['y=a_1x+b_1', 'y=a_2x+b_2'],
        ['x', 'y'],
        [['(b_1-b_2)/(a_2-a_1)', '(-a_1b_2 + a_2b_1)/(a_2-a_1)']],
    );
    systemSolution(
        ['x+y+z=1', 'x-2y=3', 'y-2z=2'],
        ['x', 'y', 'z'],
        [['17/7', '-2/7', '-8/7']],
    );
});

describe('polynomial systems', () => {
    systemSolution(
        ['x^2=4', 'y^2=9'],
        ['x', 'y'],
        [
            ['2', '-3'],
            ['-2', '-3'],
            ['2', '3'],
            ['-2', '3'],
        ],
    );
    systemSolution(
        ['x^2-4y=0', 'x-4xy=0'],
        ['x', 'y'],
        [
            ['0', '0'],
            ['1', '1/4'],
            ['-1', '1/4'],
        ],
    );
    systemSolution(
        ['x^3-y+1=0', 'x^3y-x^2y=0'],
        ['x', 'y'],
        [
            ['-1', '0'],
            ['0', '1'],
            ['1', '2'],
        ],
    );
});

describe('derivatives', () => {
    derivate('x', '1');
    derivate('y', '0');
    derivate('2xy', '2y');
    derivate('2xy+10', '2y');
    derivate('x^2', '2x');
    derivate('(x+1)^2', '2x+2');
    derivate('x^(-4)', '-4/(x^5)');
    derivate('x^2/(x+1)', '(x^2+2x)/((x+1)^2)');
});

describe('polynomials factorization', () => {
    factors('60', '2,2,3,5');
    factors('a^2bc^3', 'a,a,b,c,c,c');
    factors('2a+2b', '2,a+b');
    factors('3/2x^2+1/2', '1/2,3x^2+1');
    factors('-x+1', '-1,x-1');
    factors('a^2+2ab+b^2', 'a+b,a+b');
    factors('a^2-b^2', 'a-b,a+b');
    factors(
        'a^3+3a^2b+3a^2c+3ab^2+6abc+3ac^2+b^3+3b^2c+3bc^2+c^3',
        'a+b+c,a+b+c,a+b+c',
    );
    factors('x^3-3x^2+3x-1', 'x-1,x-1,x-1');
    factors('a^2+2ab+b^2+c^2+2cd+d^2', 'a^2+2ab+b^2+c^2+2cd+d^2');
});

describe('monomial orderings', () => {
    orderedPolynomial(
        '1+x+y+z+x^2+y^2+z^2+xy+xz+yz+x^3+y^3+z^3+x^2y+xy^2+x^2z+xz^2+y^2z+yz^2+xyz',
        monomialLexOrder,
        'x^3 + x^2y + x^2z + x^2 + xy^2 + xyz + xy + xz^2 + xz + x + y^3 + y^2z + y^2 + yz^2 + yz + y + z^3 + z^2 + z + 1',
    );
    orderedPolynomial(
        '1+x+y+z+x^2+y^2+z^2+xy+xz+yz+x^3+y^3+z^3+x^2y+xy^2+x^2z+xz^2+y^2z+yz^2+xyz',
        monomialGLexOrder,
        'x^3 + x^2y + x^2z + xy^2 + xyz + xz^2 + y^3 + y^2z + yz^2 + z^3 + x^2 + xy + xz + y^2 + yz + z^2 + x + y + z + 1',
    );
    orderedPolynomial(
        '1+x+y+z+x^2+y^2+z^2+xy+xz+yz+x^3+y^3+z^3+x^2y+xy^2+x^2z+xz^2+y^2z+yz^2+xyz',
        monomialGRevLexOrder,
        'x^3 + x^2y + xy^2 + y^3 + x^2z + xyz + y^2z + xz^2 + yz^2 + z^3 + x^2 + xy + y^2 + xz + yz + z^2 + x + y + z + 1',
    );
});

describe('polynomial division', () => {
    divisionRemainder('x', ['y'], 'x');
    divisionRemainder('x', ['x'], '0');
    divisionRemainder('xy^2+1', ['xy+1', 'y+1'], '2');
    divisionRemainder('x^2y+xy^2+y^2', ['xy-1', 'y^2-1'], '2x+1'); //x + y + 1?
    divisionRemainder('x^2y+xy^2+y^2', ['y^2-1', 'xy-1'], '2x+1');
    divisionRemainder('xy^2-x', ['xy+1', 'y^2-1'], '-x-y');
    divisionRemainder('xy^2-x', ['y^2-1', 'xy+1'], '0');
    divisionRemainder('x^5y', ['x^2y-y^2', 'x^4y^2-y^2'], 'xy^3');
    divisionRemainder('ty-x', ['-x+z^2'], '-ty+z^2');
    divisionRemainder('ax', ['a^2x+1'], '-a', ['x']);
    divisionRemainder('x^2+ax', ['x^2+bx'], '(a-b)x', ['x']);
    divisionRemainder(
        'r_p^2 + (r_o^2 -x_o^2 + 2x_ox_p -x_p^2 -y_o^2)',
        ['a_a^2r_p^2 + r_p^2 -y_p^2 + (2a_ax_p + 2b_a)y_p'],
        'y_p^2 + (-2a_ax_p -2b_a)y_p + ({a_a}^{2}{r_o}^{2} -{a_a}^{2}{x_o}^{2} + 2{a_a}^{2}x_ox_p -{a_a}^{2}{x_p}^{2} -{a_a}^{2}{y_o}^{2} + {r_o}^{2} -{x_o}^{2} + 2x_ox_p -{x_p}^{2} -{y_o}^{2})',
        ['y_p', 'r_p'],
    );
});

describe('groebner basis', () => {
    grobner(['x^3-2xy', 'x^2y-2y^2+x'], 'grlex', ['x^2', 'xy', 'y^2-1/2x']);
    grobner(['xz-y^2', 'x^3-z^2'], 'grlex', [
        'xz-y^2',
        'x^3-z^2',
        'x^2y^2-z^3',
        'xy^4-z^4, y^6-z^5',
    ]);
    grobner(['x^2+y^2+z^2-1', 'x^2+z^2-y', 'x-z'], 'lex', [
        'x-z',
        '-y+2z^2',
        'z^4+1/2z^2-1/4',
    ]);
    grobner(['t^4-x', 't^3-y', 't^2-z'], 'lex', [
        '-t^2+z',
        'ty-z^2',
        'tz-y',
        'x-z^2',
        'y^2-z^3',
    ]);
    grobner(['x^2+y+z-1', 'x+y^2+z-1', 'x+y+z^2-1'], 'lex', [
        'x+y+z^2-1',
        'y^2-y-z^2+z',
        '2yz^2+z^4-z^2',
        'z^6-4z^4+4z^3-z^2',
    ]);
    grobner(['ax+b', 'x'], 'lex', ['1'], ['x']);
});
