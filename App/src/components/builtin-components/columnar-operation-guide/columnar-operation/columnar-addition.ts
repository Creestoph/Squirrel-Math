import { ColumnarOperation, ColumnarOperationStep } from './columnar-operation';
import { DisplayTable } from './display-table';

class ColumnarAdditionStep implements ColumnarOperationStep {
    readonly table: DisplayTable;

    constructor(
        table: string[][],
        comma: number,
        highlightColumn: number,
        readonly comment: string,
    ) {
        const tab: string[][] = [];
        for (let i = 0; i < table.length; i++) {
            tab[i] = [];
            for (let j = 0; j < table[i].length; j++) {
                let t = '/' + table[i][j];
                if (j == highlightColumn) {
                    t = 'h' + t;
                }
                tab[i].push(t[0] == '/' ? t.replace(/\//g, '') : t);
                if (comma != 0 && j == table[i].length - comma - 1) {
                    if (i == table.length - 1 || (i != 0 && table[i][j + 1] != '')) {
                        tab[i].push(',');
                    } else {
                        tab[i].push('');
                    }
                }
            }
        }

        for (let i = 0; i < tab.length; i++) {
            if (i === 0) {
                tab[i] = ['c/', 'c/', ...tab[i].map((n) => (n.includes('/') ? `c${n}` : `c/${n}`))];
            } else if (i == tab.length - 2) {
                tab[i] = ['u/+', 'u/', ...tab[i].map((n) => (n.includes('/') ? `u${n}` : `u/${n}`))];
            } else {
                tab[i] = ['', '', ...tab[i]];
            }
        }

        this.table = new DisplayTable(tab);
    }
}

export class ColumnarAddition extends ColumnarOperation {
    protected steps: ColumnarAdditionStep[] = [];
    protected signs = ['+'];

    protected generateSteps(numbers: string[], isFloat = true) {
        this.steps = [];

        if (numbers.length == 1 || numbers.some((n) => !this.validateNumber(n, isFloat))) {
            const standardErr = isFloat
                ? 'Wpisz liczby do dodania <br>np. 1234+73'
                : 'Wpisz liczby naturalne do dodania <br>np. 1234+73';
            throw standardErr;
        }

        if (numbers.length > 10) {
            throw '<b>ERROR</b><br>Ani Ty, ani ja nie potrzebujemy aż tylu liczb.';
        }

        numbers = numbers.map((n) => this.removeLeadingZeros(n));

        let longestBeforeComma = 0;
        let longestAfterComma = 0;
        for (let i = 0; i < numbers.length; i++) {
            let j = 0;
            while (j < numbers[i].length && numbers[i][j] != '.') {
                j++;
            }
            if (j > longestBeforeComma) {
                longestBeforeComma = j;
            }
            if (numbers[i].length - 1 - j > longestAfterComma) {
                longestAfterComma = numbers[i].length - 1 - j;
            }
        }
        if (
            (longestAfterComma != 0 && longestBeforeComma + longestAfterComma > 38) ||
            (longestAfterComma == 0 && longestBeforeComma > 39)
        ) {
            throw "<b>ERROR</b><br>Wprowadzone liczby są zbyt długie.<br>Ich wyświetlenie przeczy design'owi strony.<br>Szanujmy się.";
        }

        longestBeforeComma += 1;
        const table: string[][] = [];
        for (let i = 0; i < numbers.length + 2; i++) {
            table[i] = [];
            for (let j = 0; j < longestAfterComma + longestBeforeComma; j++) {
                table[i][j] = '';
            }
        }
        for (let i = 0; i < numbers.length; i++) {
            let j = 0;
            while (j < numbers[i].length && numbers[i][j] != '.') {
                j++;
            }
            const beforeComma = j;
            numbers[i] = numbers[i].replace('.', '');
            for (let k = 0; k < numbers[i].length; k++) {
                table[i + 1][longestBeforeComma - beforeComma + k] = numbers[i][k];
            }
        }
        this.steps.push(
            new ColumnarAdditionStep(
                table,
                longestAfterComma,
                -1,
                'Zapisujemy ' +
                    (table.length == 4 ? 'obie' : 'wszystkie') +
                    ' liczby jedna pod drugą z wyrównaniem do ' +
                    (longestAfterComma == 0 ? 'prawej' : 'przecinka') +
                    ' i podkreślamy.',
            ),
        );
        let currentColumn = table[0].length - 1;
        let digits = [];
        let comment = '';
        while (currentColumn >= 0) {
            digits = [];
            for (let i = 0; i < table.length - 1; i++) {
                if (table[i][currentColumn] != '') {
                    digits.push(table[i][currentColumn]);
                }
            }
            if (digits.length == 0) {
                break;
            }
            if (currentColumn == table[0].length - 1) {
                comment = 'Analizujemy słupek od prawej strony. ';
            } else {
                comment = '';
            }
            if (digits.length == 1) {
                table[table.length - 1][currentColumn] = digits[0];
                comment += 'Cyfra ' + digits[0] + ' jest samotna, więc przepisujemy ją bez zmian.';
            } else {
                let sum = 0;
                for (let i = 0; i < digits.length; i++) {
                    sum += parseInt(digits[i]);
                }
                const carry = Math.floor(sum / 10);
                comment += 'Dodajemy cyfry ';
                if (digits.length == 2) {
                    comment += digits[0] + ' i ' + digits[1] + ', ';
                } else {
                    for (let i = 0; i < digits.length - 1; i++) {
                        comment += digits[i] + ', ';
                    }
                    comment += digits[digits.length - 1] + ' i ';
                }
                comment += ' otrzymujemy ' + sum;
                if (carry == 0) {
                    comment += '. Wynik zapisujemy pod kreską.';
                    table[table.length - 1][currentColumn] = '' + sum;
                } else {
                    comment +=
                        '. Ponieważ wynik jest dwucyfrowy, rozbijamy go na ' +
                        carry +
                        ' i ' +
                        (sum % 10) +
                        '. Cyfrę ' +
                        (sum % 10) +
                        ' zapisujemy pod kreską, a ' +
                        carry +
                        ' przenosimy do następnej kolumny.';
                    table[table.length - 1][currentColumn] = '' + (sum % 10);
                    table[0][currentColumn - 1] = '' + carry;
                }
            }
            this.steps.push(new ColumnarAdditionStep(table, longestAfterComma, currentColumn, comment));
            currentColumn -= 1;
        }
        comment = 'Odczytujemy wynik: ';
        for (let i = 0; i < table[table.length - 1].length; i++) {
            comment += (i == longestBeforeComma ? ',' : '') + table[table.length - 1][i];
        }
        comment += '.';
        this.steps.push(new ColumnarAdditionStep(table, longestAfterComma, -1, comment));

        return this.steps;
    }
}
