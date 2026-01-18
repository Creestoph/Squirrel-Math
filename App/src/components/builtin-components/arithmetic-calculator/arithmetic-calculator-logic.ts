export interface ArithmeticCalculatorStep {
    mathJax?: string;
    comment: string;
}

class CalculationResult {
    steps: (ArithmeticCalculatorStep & { omitBracket?: boolean })[] = [];
    value: string = '';
    mustBreakFurtherCalculation: boolean = false;

    inheritFrom(other: CalculationResult): void {
        this.steps.push(...other.steps);
        this.value = other.value;
        this.mustBreakFurtherCalculation = other.mustBreakFurtherCalculation;
    }
}

export class ArithmeticCalculatorLogic {
    private readonly leftBracketMathJax = '\\big(';
    private readonly rightBracketMathJax = '\\big)';

    getSteps(input: string): ArithmeticCalculatorStep[] {
        input = input.replaceAll(' ', '').replaceAll('/', ':');

        const validationError = this.validateInput(input);
        if (validationError) {
            return [validationError];
        }

        input = input.replaceAll('[', '(').replaceAll(']', ')').replaceAll('{', '(').replaceAll('}', ')');

        return this.processExpressionWithBrackets(input, true).steps;
    }

    private validateInput(input: string): ArithmeticCalculatorStep | null {
        // allowed characters
        if (!/^[\d+\-*:()[\]{}]*$/.test(input)) {
            return {
                comment:
                    'Ten kalkulator obsługuje wyrażenia arytmetyczne złożone jedynie ze znaków: <code>+-*:() </code> oraz cyfr.',
            };
        }

        // brackets
        const bracketsStack = [];
        const correctPairs = ['()', '[]', '{}'];
        for (let i = 0; i < input.length; i++) {
            if (correctPairs.some((pair) => input[i] === pair[0])) {
                bracketsStack.push({ char: input[i], pos: i });
            } else if (correctPairs.some((pair) => input[i] === pair[1])) {
                if (bracketsStack.length === 0) {
                    return {
                        mathJax:
                            this.toMathWithAllBrackets(input.slice(0, i)) +
                            this.colored(this.toMathWithAllBrackets(input[i])) +
                            this.toMathWithAllBrackets(input.slice(i + 1)),
                        comment:
                            'Nie zgadzają się nawiasy. Zaznaczony na czerwono nawias domykający nie ma swojego otwierającego odpowiednika.',
                    };
                }
                const lastOpened = bracketsStack.pop()!;
                if (!correctPairs.some((pair) => lastOpened.char === pair[0] && input[i] === pair[1])) {
                    return {
                        mathJax:
                            this.toMathWithAllBrackets(input.slice(0, lastOpened.pos)) +
                            this.colored(this.toMathWithAllBrackets(lastOpened.char)) +
                            this.toMathWithAllBrackets(input.slice(lastOpened.pos + 1, i)) +
                            this.colored(this.toMathWithAllBrackets(input[i])) +
                            this.toMathWithAllBrackets(input.slice(i + 1)),
                        comment:
                            `Nie zgadzają się zaznaczone na czerwono nawiasy. ` +
                            `Otwarty został $${this.toMathWithAllBrackets(lastOpened.char)}$, a domknięty $${this.toMathWithAllBrackets(input[i])}$`,
                    };
                }
                if (lastOpened.pos === i - 1) {
                    return {
                        mathJax:
                            this.toMathWithAllBrackets(input.slice(0, lastOpened.pos)) +
                            this.colored(this.toMathWithAllBrackets(lastOpened.char + input[i])) +
                            this.toMathWithAllBrackets(input.slice(i + 1)),
                        comment: `Pomiędzy zaznaczoną parą nawiasów nic nie ma. Nawiasy nie mogą być puste.`,
                    };
                }
            }
        }
        if (bracketsStack.length > 0) {
            const badBracket = bracketsStack.pop()!;
            return {
                mathJax:
                    this.toMathWithAllBrackets(input.slice(0, badBracket.pos)) +
                    this.colored(this.toMathWithAllBrackets(badBracket.char)) +
                    this.toMathWithAllBrackets(input.slice(badBracket.pos + 1)),
                comment:
                    'Nie zgadzają się nawiasy. Zaznaczony na czerwono nawias otwierający nie ma swojego domykającego odpowiednika.',
            };
        }

        // operators
        for (let i = input.length - 1; i >= 0; i--) {
            if (Array.from('+-*:').some((operator) => operator === input[i])) {
                const correctBefore = /[\d)\]}]/.test(input[i - 1]);
                const correctAfter = /[\d([{]/.test(input[i + 1]);
                if (correctAfter && !correctBefore && input[i] === '-') {
                    return {
                        mathJax:
                            this.toMathWithAllBrackets(input.slice(0, i)) +
                            this.colored(this.toMathWithAllBrackets(input[i])) +
                            this.toMathWithAllBrackets(input.slice(i + 1)),
                        comment:
                            `Zaznaczony na czerwono znak minus jest źle umieszczony. ` +
                            `Powinien oddzielać dwie liczby lub wyrażenia w nawiasach do odjęcia. Jeśli miałeś na myśli liczbę ujemną, ` +
                            `to w tym kalkulatorze jej nie wspieramy.`,
                    };
                } else if (!correctBefore || !correctAfter) {
                    return {
                        mathJax:
                            this.toMathWithAllBrackets(input.slice(0, i)) +
                            this.colored(this.toMathWithAllBrackets(input[i])) +
                            this.toMathWithAllBrackets(input.slice(i + 1)),
                        comment:
                            `Zaznaczony na czerwono znak ${this.nameOperations(input[i], '+-*:', 'genitive')} jest źle umieszczony. ` +
                            `Powinien oddzielać dwie liczby lub wyrażenia w nawiasach.`,
                    };
                }
            }
        }

        return null;
    }

    private processExpressionWithBrackets(input: string, isInitialExpression: boolean): CalculationResult {
        const result = new CalculationResult();
        const { bracketsCount } = this.operationStats(input);

        if (bracketsCount > 1 && isInitialExpression) {
            result.steps.push({
                mathJax: this.toMath(input)
                    .replaceAll(this.leftBracketMathJax, this.colored(this.leftBracketMathJax))
                    .replaceAll(this.rightBracketMathJax, this.colored(this.rightBracketMathJax)),
                comment:
                    'Analizujemy wprowadzone wyrażenie, skupiając najpierw uwagę na nawiasach. Szukamy takiej pary nawiasów, ' +
                    'która nie zawiera w środku innych nawiasów, to znaczy: takiej pary "$($" oraz "$)$", pomiędzy którą nie pojawiają się inne znaki "$($" ani "$)$".',
            });
        }

        if (bracketsCount > 0) {
            const bracketExpression = this.extractFirstInnerMostBracketExpression(input);
            result.steps.push({
                mathJax: this.toMath(
                    bracketExpression.before + this.colored(bracketExpression.inside) + bracketExpression.after,
                ),
                comment: isInitialExpression
                    ? bracketsCount > 1
                        ? 'Czytając uważnie wyrażenie od lewej, napotykamy taką parę nawiasów. Zabieramy się do obliczania działania wewnątrz.'
                        : 'Analizujemy wprowadzone wyrażenie, skupiając najpierw uwagę na fragmencie pomiędzy nawiasami.'
                    : bracketsCount > 1
                      ? 'Patrzymy na następną parę nawiasów, które nie zawierają w środku innych nawiasów.'
                      : 'Patrzymy na ostatni nawias.',
            });

            const expressionSimplificationResult = this.processExpressionWithoutBrackets(
                bracketExpression.inside.slice(1, -1),
                true,
            );
            result.steps.push(
                ...expressionSimplificationResult.steps.map((step) => ({
                    mathJax:
                        this.toMath(bracketExpression.before) +
                        (step.omitBracket ? '' : this.leftBracketMathJax) +
                        step.mathJax +
                        (step.omitBracket ? '' : this.rightBracketMathJax) +
                        this.toMath(bracketExpression.after),
                    comment: step.comment,
                })),
            );

            if (!expressionSimplificationResult.mustBreakFurtherCalculation) {
                const simplifiedExpression =
                    bracketExpression.before + expressionSimplificationResult.value + bracketExpression.after;
                if (bracketExpression.before === '' && bracketExpression.after === '') {
                    result.steps.push({
                        mathJax: expressionSimplificationResult.value,
                        comment: `Poza tym nawiasem nie ma nic więcej do roboty, czyli otrzymaliśmy ostateczny wynik: $${expressionSimplificationResult.value}$`,
                    });
                }
                result.inheritFrom(this.processExpressionWithBrackets(simplifiedExpression, false));
            }
        } else {
            return this.processExpressionWithoutBrackets(input, false);
        }

        return result;
    }

    private processExpressionWithoutBrackets(expression: string, isInsideBrackets: boolean): CalculationResult {
        const result = new CalculationResult();
        const { mulDivCount, addSubCount } = this.operationStats(expression);
        const operationsText = this.nameOperations(expression);
        const addSubOperationsGenitive = this.nameOperations(expression, '+-', 'genitive');
        const mulDivOperationsGenitive = this.nameOperations(expression, '*:', 'genitive');

        if (mulDivCount > 0) {
            if (addSubCount > 0) {
                const mulDivGrouped = expression.split(/(\d+(?:[*:]\d+)+)/g); // gpt magic that works : P
                result.steps.push({
                    mathJax: mulDivGrouped
                        .map((e, i) => (i % 2 === 1 ? this.colored(this.toMath(e)) : this.toMath(e)))
                        .join(''),
                    comment:
                        `Działanie zawiera jednocześnie ${operationsText}. ` +
                        (mulDivCount > 1
                            ? `Zaczynamy od wszystkich operacji ${mulDivOperationsGenitive} - od lewej do prawej.`
                            : `Zaczynamy od ${mulDivOperationsGenitive}.`),
                });
            } else if (mulDivCount > 1) {
                result.steps.push({
                    mathJax: isInsideBrackets ? this.colored(this.toMath(expression)) : this.toMath(expression),
                    comment: `Działanie składa się z ${mulDivOperationsGenitive}. Wykonujemy je od lewej do prawej.`,
                });
            }

            const iterationsResult = this.processMulDivIteration(expression, true, isInsideBrackets);
            if (!iterationsResult.mustBreakFurtherCalculation && addSubCount === 0 && mulDivCount === 1) {
                iterationsResult.steps.forEach(
                    (s) => (s.comment = `Działanie to po prostu ${operationsText}. ` + s.comment),
                );
            }
            result.inheritFrom(iterationsResult);
        } else if (addSubCount > 0) {
            if (addSubCount > 1) {
                result.steps.push({
                    mathJax: isInsideBrackets ? this.colored(this.toMath(expression)) : this.toMath(expression),
                    comment: `Działanie składa się z ${addSubOperationsGenitive}. Wykonujemy je od lewej do prawej.`,
                });
            }

            const addSubResult = this.processAddSubIteration(expression, true, !isInsideBrackets);
            if (!addSubResult.mustBreakFurtherCalculation && addSubCount === 1) {
                addSubResult.steps.forEach(
                    (s) => (s.comment = `Działanie to po prostu ${operationsText}. ` + s.comment),
                );
            }
            result.inheritFrom(addSubResult);
        } else {
            result.steps.push({
                mathJax: isInsideBrackets ? this.colored(this.toMath(expression)) : this.toMath(expression),
                comment: isInsideBrackets
                    ? 'W nawiasie znajduje się samotna liczba, więc można ją przepisać z pominięciem nawiasu.'
                    : `$${expression}$ to po prostu zwykła liczba, nie ma tu nic do roboty.`,
                omitBracket: true,
            });
            result.value = expression;
        }

        return result;
    }

    private processMulDivIteration(
        expression: string,
        isInitial: boolean,
        isInsideBrackets: boolean,
    ): CalculationResult {
        const result = new CalculationResult();
        const { mulDivCount, addSubCount } = this.operationStats(expression);
        const addSubOperationsNominative = this.nameOperations(expression, '+-');

        if (mulDivCount === 0) {
            result.steps.push({
                mathJax: isInsideBrackets ? this.colored(this.toMath(expression)) : this.toMath(expression),
                comment:
                    addSubCount > 1
                        ? `Następnie przychodzi kolej na ${addSubOperationsNominative}. Wykonujemy je od lewej do prawej.`
                        : `Następnie przychodzi kolej na ${addSubOperationsNominative}.`,
            });

            result.inheritFrom(this.processAddSubIteration(expression, true, !isInsideBrackets));
        } else {
            const leftMostMulDiv = expression.match(/\d+[*:]\d+/)!;
            const beforeMulDiv = expression.slice(0, leftMostMulDiv.index);
            const mulDiv = leftMostMulDiv[0];
            const afterMulDiv = expression.slice(leftMostMulDiv.index! + leftMostMulDiv[0].length);

            const mulDivName = this.nameOperations(mulDiv, '*:');
            if (mulDivCount > 1 || !isInitial) {
                result.steps.push({
                    mathJax: this.toMath(beforeMulDiv) + this.colored(this.toMath(mulDiv)) + this.toMath(afterMulDiv),
                    comment: isInitial
                        ? `Pierwsze od lewej ${mulDivName} to $${this.toMath(mulDiv)}$.`
                        : addSubCount > 0
                          ? `Kolejne od lewej ${mulDivName} to $${this.toMath(mulDiv)}$.`
                          : `Kolejne ${mulDivName} to $${this.toMath(mulDiv)}$.`,
                });
            }

            const [dividend, divisor] = mulDiv.split(':').map((x) => parseInt(x));
            const isDivisionWithRemainder = mulDivName === 'dzielenie' && dividend % divisor !== 0;
            const mulDivResult = isDivisionWithRemainder
                ? `${Math.floor(dividend / divisor)} \\text{ r. } ${dividend % divisor}`
                : `${eval(mulDiv.replaceAll(':', '/'))}`;

            if (divisor === 0) {
                result.steps.push({
                    mathJax: this.toMath(beforeMulDiv) + this.colored(this.toMath(mulDiv)) + this.toMath(afterMulDiv),
                    comment:
                        `Napotykamy problem, bo dzielnikiem w tym działaniu jest $0$, a przecież przez zero dzielić nie wolno. ` +
                        `Wniosek z tego jest taki, że działanie jest niepoprawnie sformułowane. ` +
                        `Przerywamy dalsze obliczenia i zwracamy skargę do nadawcy.`,
                });
                result.mustBreakFurtherCalculation = true;
            } else if (isDivisionWithRemainder && (mulDivCount > 1 || addSubCount > 0 || isInsideBrackets)) {
                result.steps.push({
                    mathJax: this.toMath(beforeMulDiv) + this.colored(this.toMath(mulDiv)) + this.toMath(afterMulDiv),
                    comment:
                        `Obliczamy $${this.toMath(mulDiv)} = ${mulDivResult}$. ` +
                        `Otrzymaliśmy wynik z resztą, który sprawia niemały kłopot - bo co właściwie powinniśmy robić z tą resztą ` +
                        `podczas dalszych rachunków? Odpowiedź na to pytanie przyniesie lekcja ${this.linkTo('Ułamki zwykłe')}. ` +
                        `Zanim dotrzemy do tej lekcji, póki co przerywamy obliczenia w tym miejscu.`,
                });
                result.mustBreakFurtherCalculation = true;
            } else {
                if (mulDivCount === 1 && addSubCount === 0) {
                    result.value = mulDivResult;
                    result.steps.push({
                        mathJax:
                            this.toMath(beforeMulDiv) +
                            this.colored(this.toMath(mulDivResult)) +
                            this.toMath(afterMulDiv),
                        comment: isInsideBrackets
                            ? `Obliczamy $${this.toMath(mulDiv)} = ${mulDivResult}$ i wstawiamy wynik w miejscu nawiasu.`
                            : `Obliczamy $${this.toMath(mulDiv)} = ${mulDivResult}$, co daje ostateczny wynik działania.`,
                        omitBracket: true,
                    });
                } else {
                    result.steps.push({
                        mathJax:
                            this.toMath(beforeMulDiv) +
                            this.colored(this.toMath(mulDivResult)) +
                            this.toMath(afterMulDiv),
                        comment: `Obliczamy $${this.toMath(mulDiv)} = ${mulDivResult}$ i wstawiamy wynik w miejscu działania.`,
                    });
                    result.inheritFrom(
                        this.processMulDivIteration(beforeMulDiv + mulDivResult + afterMulDiv, false, isInsideBrackets),
                    );
                }
            }
        }

        return result;
    }

    private processAddSubIteration(expression: string, isInitial: boolean, isFinal: boolean): CalculationResult {
        const result = new CalculationResult();
        const { addSubCount } = this.operationStats(expression);
        const leftMostAddSub = expression.match(/\d+[+-]\d+/)!;
        const beforeAddSub = expression.slice(0, leftMostAddSub.index);
        const addSub = leftMostAddSub[0];
        const afterAddSub = expression.slice(leftMostAddSub.index! + leftMostAddSub[0].length);

        const addSubName = this.nameOperations(addSub, '+-');
        if (addSubCount > 1) {
            result.steps.push({
                mathJax: this.toMath(beforeAddSub) + this.colored(this.toMath(addSub)) + this.toMath(afterAddSub),
                comment: isInitial
                    ? `Pierwsze od lewej ${addSubName} to $${this.toMath(addSub)}$.`
                    : `Kolejne ${addSubName} to $${this.toMath(addSub)}$.`,
            });
        } else if (!isInitial) {
            result.steps.push({
                mathJax: this.toMath(beforeAddSub) + this.colored(this.toMath(addSub)) + this.toMath(afterAddSub),
                comment: `Pozostało ${addSubName}: $${this.toMath(addSub)}$.`,
            });
        }

        const [sub1, sub2] = addSub.split('-').map((x) => parseInt(x));
        if (addSubName === 'odejmowanie' && sub1 < sub2) {
            result.steps.push({
                mathJax: this.toMath(beforeAddSub) + this.colored(this.toMath(addSub)) + this.toMath(afterAddSub),
                comment:
                    `Napotykamy problem, ponieważ w naszym odejmowaniu odjemnik jest większy niż odjemna. ` +
                    `Gdy wkrótce dotrzemy do lekcji ${this.linkTo('Liczby ujemne')}, ` +
                    `okaże się, że z takim odejmowaniem można sobie poradzić, ` +
                    `jednak póki co nie umiemy odjąć $${addSub}$. Na tym etapie przerywamy dalsze obliczenia.`,
            });
            result.mustBreakFurtherCalculation = true;
        } else {
            const addSubResult = `${eval(addSub)}`;
            if (addSubCount === 1) {
                result.value = addSubResult;
                result.steps.push({
                    mathJax:
                        this.toMath(beforeAddSub) + this.colored(this.toMath(addSubResult)) + this.toMath(afterAddSub),
                    comment: isInitial
                        ? isFinal
                            ? `Obliczamy $${addSub} = ${addSubResult}$, co daje ostateczny wynik działania.`
                            : `Obliczamy $${addSub} = ${addSubResult}$ i wstawiamy wynik w miejscu nawiasu.`
                        : isFinal
                          ? `Ostatecznie obliczamy $${addSub} = ${addSubResult}$, co daje finalny wynik działania.`
                          : `Ostatecznie obliczamy $${addSub} = ${addSubResult}$ i wstawiamy wynik w miejscu nawiasu.`,
                    omitBracket: true,
                });
            } else {
                result.steps.push({
                    mathJax:
                        this.toMath(beforeAddSub) + this.colored(this.toMath(addSubResult)) + this.toMath(afterAddSub),
                    comment: `Obliczamy $${addSub} = ${addSubResult}$ i wstawiamy wynik w miejscu działania.`,
                });
                result.inheritFrom(
                    this.processAddSubIteration(beforeAddSub + addSubResult + afterAddSub, false, isFinal),
                );
            }
        }

        return result;
    }

    private nameOperations(
        expression: string,
        ops: string = '+-*:',
        nounCase: 'nominative' | 'genitive' = 'nominative',
    ): string {
        const forms = {
            '*': ['mnożenie', 'mnożenia'],
            ':': ['dzielenie', 'dzielenia'],
            '+': ['dodawanie', 'dodawania'],
            '-': ['odejmowanie', 'odejmowania'],
        } as const;

        const operations = Object.entries(forms)
            .filter(([op]) => ops.includes(op) && this.count(expression, [op]) > 0)
            .map(([, [nom, gen]]) => (nounCase === 'nominative' ? nom : gen));

        return operations.length < 2
            ? operations.join('')
            : `${operations.slice(0, -1).join(', ')} i ${operations.at(-1)}`;
    }

    private count(input: string, subStrings: string[]): number {
        return subStrings.reduce((count, subString) => count + input.split(subString).length - 1, 0);
    }

    private operationStats(expression: string) {
        return {
            bracketsCount: this.count(expression, ['(']),
            mulDivCount: this.count(expression, ['*', ':']),
            addSubCount: this.count(expression, ['+', '-']),
        };
    }

    private toMathWithAllBrackets(input: string): string {
        return this.toMath(input)
            .replaceAll('[', '\\big[ ')
            .replaceAll(']', ' \\big]')
            .replaceAll('{', '\\big\\{ ')
            .replaceAll('}', ' \\big\\}');
    }

    private toMath(input: string): string {
        return input.replaceAll('*', ' \\cdot ').replaceAll('(', '\\big( ').replaceAll(')', ' \\big)');
    }

    private colored(input: string): string {
        return `\\color{#dd3333}{${input}}`;
    }

    private linkTo(lessonName: string): string {
        return `<a class="link" href='/lesson/${lessonName}' target="_blank">${lessonName}</a>`;
    }

    private extractFirstInnerMostBracketExpression(input: string): {
        before: string;
        inside: string;
        after: string;
    } {
        let start = -1;
        for (let i = 0; i < input.length; i++) {
            if (input[i] === '(') {
                start = i;
            } else if (input[i] === ')') {
                return {
                    before: input.slice(0, start),
                    inside: input.slice(start, i + 1),
                    after: input.slice(i + 1),
                };
            }
        }

        return { before: input, inside: '', after: '' };
    }
}
