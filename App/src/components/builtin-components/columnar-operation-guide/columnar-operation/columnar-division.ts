import { numeralNoun } from '@/utils/utils';
import { ColumnarOperation, ColumnarOperationStep } from './columnar-operation';
import { DisplayTable, DisplayTableCell, DisplayTableCellStyle } from '../../../../utils/display-table';

export class ZeroDivisionError {
    readonly message = 'Po prostu nie wolno.';
}

export class ColumnarDivision extends ColumnarOperation {
    protected steps: ColumnarOperationStep[] = [];
    protected signs = ['/', ':'];

    private helperTable: number[] = [];
    private table: string[][] = [];
    private dividend = '';
    private divisor = '';

    protected generateSteps(numbers: string[], isFloat = true) {
        this.steps = [];

        if (parseFloat(numbers[1]) === 0) {
            throw new ZeroDivisionError();
        }

        if (numbers.length != 2 || numbers.some((n) => !this.validateNumber(n, isFloat))) {
            throw isFloat
                ? 'Wpisz dwie liczby do podzielenia <br>np. <code>1234:73</code>'
                : 'Wpisz dwie liczby naturalne do podzielenia <br>np. <code>1234:73</code>';
        }

        if (numbers[0].length + numbers[1].length > 37) {
            throw "<b>ERROR</b><br>Wprowadzone liczby są zbyt długie.<br>Ich wyświetlenie przeczy design'owi strony.<br>Szanujmy się.";
        }

        // organizing decimals
        const [dividendDecimals, divisorDecimals] = numbers.map((n) => n.split('.')[1]?.length ?? 0);
        const decimalDiff = dividendDecimals - divisorDecimals;

        let dividend = numbers[0].replace('.', '');
        if (decimalDiff < 0) {
            dividend += '0'.repeat(-decimalDiff);
        } else if (decimalDiff > 0) {
            const decimalIndex = dividend.length - decimalDiff;
            dividend = dividend.slice(0, decimalIndex) + '.' + dividend.slice(decimalIndex);
        }
        dividend = this.removeLeadingZeros(dividend);
        this.dividend = dividend;

        const divisor = this.removeLeadingZeros(numbers[1].replace('.', ''));
        const divisorInt = parseInt(divisor);
        this.divisor = divisor;

        this.table = [[], (dividend + ':' + divisor).split('')];
        if (dividend.includes('.')) {
            this.table[0][dividend.indexOf('.')] = '.';
        }

        this.helperTable = [];

        this.addStep(
            (divisorDecimals > 0
                ? `Przed przystapieniem do dzielenia pozbywamy się przecinka w dzielniku. Ponieważ liczba ` +
                  `$${numbers[1].replace('.', ',')}$ ma ${numeralNoun(divisorDecimals, 'cyfrę')} ` +
                  `po przecinku, przesuwamy przecinek dzielnej o $${divisorDecimals}$ w prawo. `
                : '') + 'Zapisujemy obie liczby obok siebie i rysujemy kreskę ponad nimi.',
        );

        // analysis beginning
        const dividend0 = parseInt(dividend[0]);
        const result0 = Math.floor(dividend0 / divisorInt);
        this.table[0][0] = `${result0}`;

        this.addStep(
            `Analizujemy dzielną od lewej strony. Bierzemy cyfrę $${dividend0}$ i próbujemy podzielić ją przez $${divisor}$. Dzielnik ` +
                `mieści się ${numeralNoun(result0, 'raz')} w dzielnej, więc nad kreską zapisujemy $${result0}$.`,
            [[0, 0], [1, 0], ...this.highlightDivisor()],
        );

        // first subtraction
        const multiple0 = result0 * divisorInt;
        let diffI = dividend0 - multiple0;
        this.table.push([`${multiple0}`], [`${diffI}`]);

        this.addStep(
            `Mnożymy zapisane w wyniku $${result0}$ przez dzielnik i otrzymujemy $${multiple0}$. Wykonujemy odejmowanie ` +
                `$${dividend0} - ${multiple0} = ${diffI}$, wynik zapisujemy poniżej.`,
            [
                [1, 0],
                [2, 0],
                [3, 0],
            ],
        );

        // main loop
        const occuredDiffs: number[] = [];
        for (let i = 1, dividendIndex = 1; ; dividendIndex++, i++) {
            const isAfterDecimal = dividendIndex >= dividend.length;

            if (isAfterDecimal && i === dividendIndex) {
                this.table[0][dividendIndex] = '.';
            }
            if (this.table[0][dividendIndex] === '.') {
                dividendIndex++;
            }
            if (isAfterDecimal) {
                occuredDiffs.push(diffI);
            }

            const newDigit = isAfterDecimal ? '0' : dividend[dividendIndex];
            this.table.at(-1)![i] = newDigit;
            const dividedPart = parseInt(this.table.at(-1)!.join(''));
            const resultI = Math.floor(dividedPart / divisorInt);
            this.table[0][dividendIndex] = `${resultI}`;

            const previousHelperLength = this.helperTable.length;
            const helperDisplayIndex = resultI - 1;
            const isHelperNeeded = divisor.length >= 2 && resultI >= 2;
            if (isHelperNeeded) {
                const helperTableLength = Math.max(previousHelperLength, resultI + 1);
                this.helperTable = this.emptyArr(helperTableLength).map((_, i) => divisorInt * (i + 1));
            }

            const comment =
                (isAfterDecimal
                    ? 'Kolejną cyfrą rozwinięcia dziesiętnego dzielnej jest $0$. Dopisujemy więc $0$ '
                    : `Dopisujemy cyfrę $${newDigit}$ `) +
                `i próbujemy wykonać dzielenie $${dividedPart}$ przez $${divisor}$. ` +
                (!isHelperNeeded
                    ? `Dzielnik mieści się ${numeralNoun(resultI, 'raz')} w dzielnej, czyli nad kreską zapisujemy $${resultI}$.`
                    : previousHelperLength === 0
                      ? `Pracujemy na dość dużych liczbach, więc warto zanotować na marginesie, ile wynosi dzielnik dodawany do siebie raz po raz. ` +
                        `Widać dzięki temu, że $${divisor}$ można wziąć maksymalnie ${numeralNoun(resultI, 'raz')} zanim przekroczy dzielną, ` +
                        `dlatego zapisujemy $${resultI}$ nad kreską.`
                      : (this.helperTable.length <= previousHelperLength
                            ? `Korzystając z naszej wcześniejszej notatki, `
                            : `Rozszerzamy naszą wcześniejszą notatkę z wielokrotnym dodawaniem i `) +
                        `odczytujemy, że dzielnik mieści się ${numeralNoun(resultI, 'raz')} w dzielnej, czyli nad kreską zapisujemy $${resultI}$.`);

            this.addStep(
                comment,
                [
                    [0, dividendIndex],
                    isAfterDecimal ? [-1, -1] : [1, dividendIndex],
                    ...this.highlightRow(this.table.length - 1),
                    ...this.highlightDivisor(),
                ],
                helperDisplayIndex,
            );

            const multipleI = resultI * divisorInt;
            diffI = dividedPart - multipleI;
            this.addRow(multipleI, i);
            this.addRow(diffI, i);
            this.addStep(
                `Mnożymy zapisane w wyniku $${resultI}$ przez dzielnik i otrzymujemy $${multipleI}$. Wykonujemy odejmowanie ` +
                    `$${dividedPart} - ${multipleI} = ${diffI}$, wynik zapisujemy poniżej.`,
                [1, 2, 3].flatMap((j) => this.highlightRow(this.table.length - j)),
                helperDisplayIndex,
            );

            // clean finite result
            if (diffI === 0 && dividendIndex >= dividend.length - 1) {
                return this.addStep(
                    (dividendIndex === dividend.length - 1
                        ? 'Ponieważ w dzielnej nie ma już cyfr do spisania, a '
                        : 'Ponieważ ') +
                        `w wyniku odejmowania otrzymaliśmy $0$, kończymy procedurę. Odczytujemy wynik ${this.readResult()}.`,
                );
            }

            // finished with remainder
            if (dividendIndex === dividend.length - 1 && !isFloat) {
                this.table[0][i + 1] = '\\text{r.}';
                const diffIString = `${diffI}`;
                this.table[0].splice(i + 2, diffIString.length, ...diffIString);
                return this.addStep(
                    `Ponieważ w dzielnej nie ma już cyfr do spisania, traktujemy pozostałe $${diffI}$ jako resztę z dzielenia. ` +
                        `Odczytujemy wynik ${this.readResult()}.`,
                );
            }

            // cycle
            if (occuredDiffs.includes(diffI)) {
                this.table.at(-1)![i + 1] = '0';
                const fromEnd = occuredDiffs.length - occuredDiffs.indexOf(diffI) || 1;
                const cycleStart = this.table[0].length - fromEnd;
                this.table[0].splice(cycleStart, 0, '(');
                this.table[0].push(')');

                return this.addStep(
                    `Po spisaniu zera otrzymujemy do podzielenia liczbę $${diffI}0$ - taką samą jak kilka kroków wcześniej. Wszystkie kolejne ` +
                        `operacje przynosiłyby cyklicznie takie same wyniki - zatem wyznaczyliśmy okres. Odczytujemy wynik ${this.readResult()}.`,
                    this.highlightRow(this.table.length - fromEnd * 2 - 1),
                );
            }

            // overflow
            const resultLength = this.table[0].findLastIndex((x) => x !== '') + 1;
            if (resultLength > 27) {
                this.table[0][resultLength] = '\\dots';
                return this.addStep(
                    `Możemy kontynuować procedurę aż do napotkania okresu rozwinięcia dziesiętnego. Rachunki mogą trwać jeszcze bardzo długo, ` +
                        `więc zadowalamy się przybliżonym wynikiem ${this.readResult()}.`,
                );
            }
        }
    }

    private addStep(
        comment: string,
        highlightFields: [number, number][] = [],
        helperIndicator = -1,
    ): ColumnarOperationStep[] {
        // main table
        const rowSize = Math.max(...this.table.map((row) => row.length));
        const table = this.table.map((row, i) => [
            new DisplayTableCell(i % 2 === 0 && i > 0 ? '-' : '', i % 2 === 0 ? ['u'] : []),
            ...this.emptyArr(rowSize).map((_, j) => {
                const cell = row[j] || '';
                const hMod = highlightFields.some(([row, col]) => row === i && col === j) ? (['h'] as const) : [];
                const uMod = i % 2 === 0 ? (['u'] as const) : [];
                return new DisplayTableCell(cell === '.' ? ',' : cell, [...hMod, ...uMod]);
            }),
        ]);

        // helper table
        if (this.helperTable.length > 0) {
            for (let i = table.length; i < this.helperTable.length; i++) {
                table.push(this.emptyArr(rowSize).map(() => new DisplayTableCell()));
            }
            table.forEach((row, i) => {
                const styles: DisplayTableCellStyle[] = i < this.helperTable.length ? ['r'] : [];
                if (i < this.helperTable.length - 1) {
                    styles.push('u');
                }
                if (i === helperIndicator) {
                    styles.push('h');
                }
                row.unshift(
                    new DisplayTableCell(this.helperTable[i] ?? null, styles),
                    new DisplayTableCell('\\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ '),
                );
            });
        }

        this.steps.push({
            comment,
            table: new DisplayTable(table),
        });
        return this.steps;
    }

    private highlightDivisor(): [number, number][] {
        return this.emptyArr(this.divisor.length).map((_, j) => [1, this.dividend.length + 1 + j] as [number, number]);
    }

    private highlightRow(row: number): [number, number][] {
        return this.emptyArr(this.table[row].length)
            .map((_, j) => [row, j] as [number, number])
            .filter(([_, h]) => this.table[row][h] !== undefined && this.table[row][h] !== '');
    }

    private addRow(value: number, endIndex: number): void {
        this.table.push(
            `${value}`
                .padStart(endIndex + 1, 'x')
                .split('')
                .map((c) => (c == 'x' ? '' : c)),
        );
    }

    private readResult(): string {
        return `$${this.readValue(this.table[0]).replace('.', ',').replace('\\text{r,}', '\\,\\text{r.}\\,')}$`;
    }
}
