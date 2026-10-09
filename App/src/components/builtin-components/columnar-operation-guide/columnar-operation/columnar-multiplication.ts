import { DisplayTable, DisplayTableCell } from '../../../../utils/display-table';
import { ColumnarOperation, ColumnarOperationStep } from './columnar-operation';
import { numeralNoun } from '@/utils/utils';

export class ColumnarMultiplication extends ColumnarOperation {
    protected steps: ColumnarOperationStep[] = [];
    protected signs = ['*'];

    private table: string[][] = [];

    private static addFirstColumn(tab: string[][]): void {
        tab.forEach((row) => row.unshift(''));
    }

    protected generateSteps(numbers: string[], isFloat = true): ColumnarOperationStep[] {
        this.steps = [];

        if (numbers.length != 2 || numbers.some((n) => !this.validateNumber(n, isFloat))) {
            const standardErr = isFloat
                ? 'Wpisz dwie liczby do pomnożenia <br>np. <code>1234*73</code>'
                : 'Wpisz dwie liczby naturalne do pomnożenia <br>np. <code>1234*73</code>';
            throw standardErr;
        }
        if (numbers[0].length + numbers[1].length > 39 || numbers[1].length > 10) {
            throw '<b>ERROR</b><br>Wprowadzone liczby są zbyt długie.<br>Nawet się nie zmieszczą na tej stronie.<br>Miej litość.';
        }

        // organizing digits
        numbers = numbers.map((n) => this.removeLeadingZeros(n));
        const numbersOrig = [...numbers];
        const stats = numbers.map((n) => this.digitsCount(n));
        const longestAfterComma = Math.max(...stats.map((s) => s.afterComma));
        const totalSize = Math.max(...stats.map((s) => s.beforeComma + s.afterComma));
        numbers = numbers.map((n) => n.replace('.', ''));
        this.table = numbers.map((n) => this.emptyArr(totalSize).toSpliced(totalSize - n.length, n.length, ...n));

        this.addStep(
            'Zapisujemy obie liczby jedna pod drugą z wyrównaniem do prawej i podkreślamy.' +
                (longestAfterComma > 0 ? ' Chwilowo zaniedbujemy przecinki.' : ''),
            false,
        );

        // iterating bottom factor digits
        for (let i = numbers[1].length - 1; i >= 0; i--) {
            let t = 0;
            const ci = numbers[1].length - 1 - i;

            this.addStep(`Przystępujemy do mnożenia liczby $${numbers[0]}$ przez $${numbers[1][i]}$.`, false, [
                ...this.highlightRow(0),
                [1, this.table[1].length - 1 - ci],
            ]);

            this.table.push(this.emptyArr(this.table[0].length));

            // iterating upper factor digits
            let carry = 0;
            for (let j = numbers[0].length - 1; j >= 0; j--) {
                const cj = numbers[0].length - 1 - j;
                const oldCarry = carry;
                const mul = parseInt(numbers[1][i]) * parseInt(numbers[0][j]) + oldCarry;
                carry = Math.floor(mul / 10);
                const result = mul % 10;

                t = this.table[0].length - 1 - (ci + cj);
                while (t < 0) {
                    ColumnarMultiplication.addFirstColumn(this.table);
                    t++;
                }
                this.table[2 + ci][t] = `${result}`;

                const comment =
                    `Mnożymy cyfry $${numbers[1][i]}$ i $${numbers[0][j]}$` +
                    (oldCarry > 0 ? `, dodajemy zapamiętane $${oldCarry}$` : '') +
                    ` i otrzymujemy $${mul}$. ` +
                    (carry > 0
                        ? `Ponieważ wynik jest dwucyfrowy, rozbijamy go na $${carry}$ i $${result}$. Cyfrę $${result}$ zapisujemy pod kreską`
                        : 'Wynik zapisujemy pod kreską') +
                    (cj == 0 && ci > 0
                        ? ' z ' +
                          (ci === 1 ? 'pojedynczym' : ci === 2 ? 'podwójnym' : ci === 3 ? 'potrójnym' : 'odpowiednim') +
                          ' wcięciem'
                        : '') +
                    (carry > 0 ? `, a $${carry}$ zapamiętujemy.` : '.');

                this.addStep(comment, false, [
                    [0, this.table[0].length - 1 - cj],
                    [1, this.table[1].length - 1 - ci],
                    [2 + ci, t],
                ]);
            }

            if (carry != 0) {
                if (t === 0) {
                    ColumnarMultiplication.addFirstColumn(this.table);
                    t++;
                }
                this.table[2 + (numbers[1].length - 1 - i)][t - 1] = `${carry}`;
                const oldCarry = carry;
                carry = 0;
                this.addStep(`Dopisujemy zapamiętane $${oldCarry}$.`, false);
            }
        }

        // summation
        if (numbers[1].length > 1) {
            const resultRow = this.emptyArr(this.table[0].length);
            this.table.push(resultRow);
            this.addStep('Otrzymane liczby podkreślamy i wykonujemy ich dodawanie pisemne.', true);

            let carry = 0;
            for (let i = this.table[0].length - 1; i >= 0; i--) {
                let sum = carry;
                for (let j = 2; j < this.table.length; j++) {
                    sum += parseInt(this.table[j][i] || '0');
                }
                resultRow[i] = `${sum % 10}`;
                carry = Math.floor(sum / 10);
            }
            if (carry > 0) {
                ColumnarMultiplication.addFirstColumn(this.table);
                resultRow[0] = `${carry}`;
            }
        }

        // result
        if (longestAfterComma === 0) {
            return this.addStep(`Odczytujemy wynik: $${this.readValue(this.table.at(-1)!)}$.`, true);
        } else {
            const [commas0, commas1] = stats.map((s) => s.afterComma);
            const commasTotal = commas0 + commas1;
            const result = this.readValue(this.table.at(-1)!);
            const resultWithComma = this.readValue(this.table.at(-1)!, result.length - commasTotal);

            return this.addStep(
                `Odczytujemy liczbę $${result}$. Ponieważ $${numbersOrig[0].replace('.', ',')}$ ma ${numeralNoun(commas0, 'cyfrę')} po przecinku, a ` +
                    `$${numbersOrig[1].replace('.', ',')}$ ma ${numeralNoun(commas1, 'cyfrę')} po przecinku, to wynik musi mieć ` +
                    `${numeralNoun(commasTotal, 'cyfrę')} po przecinku. Ostatecznie otrzymujemy $${resultWithComma}$.`,
                true,
            );
        }
    }

    private addStep(
        comment: string,
        withSumUnderline: boolean,
        highlight: [number, number][] = [],
    ): ColumnarOperationStep[] {
        const tab = this.table.map((row, i) => [
            new DisplayTableCell(),
            new DisplayTableCell(),
            ...row.map(
                (cell, j) =>
                    new DisplayTableCell(cell, highlight.some(([row, col]) => row === i && col === j) ? ['h'] : []),
            ),
        ]);
        tab[1][0].value = '\\cdot';
        tab[1].forEach((c) => c.styleIds.push('u'));
        if (withSumUnderline && tab.length > 3) {
            tab.at(-2)![0].value = '+';
            tab.at(-2)!.forEach((c) => c.styleIds.push('u'));
        }

        this.steps.push({
            comment,
            table: new DisplayTable(tab),
        });
        return this.steps;
    }

    private highlightRow(row: number): [number, number][] {
        return this.emptyArr(this.table[row].length)
            .map((_, j) => [row, j] as [number, number])
            .filter(([_, h]) => this.table[row][h] !== undefined && this.table[row][h] !== '');
    }
}
