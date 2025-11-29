import { ColumnarOperation, ColumnarOperationStep } from './columnar-operation';
import { DisplayTable } from './display-table';

class ColumnarSubtractionStep implements ColumnarOperationStep {
    private table: DisplayTable;

    constructor(
        table: string[][],
        comma: number,
        highlightColumn: number,
        crossedFields: boolean[][],
        private readonly comment: string,
    ) {
        const tab: string[][] = [];
        for (let i = 0; i < table.length; i++) {
            tab[i] = [];
            for (let j = 0; j < table[i].length; j++) {
                let t = '/' + table[i][j];
                if (j == highlightColumn) {
                    t = 'h' + t;
                }
                if (crossedFields[i][j]) {
                    t = 's' + t;
                }
                tab[i].push(t[0] == '/' ? t.replace(/\//g, '') : t);
                if (comma != 0 && j == table[i].length - comma - 1) {
                    if (i == table.length - 1 || (i != 0 && i != 1 && table[i][j + 1] != '')) {
                        tab[i].push(',');
                    } else {
                        tab[i].push('');
                    }
                }
            }
        }

        for (let i = 0; i < tab.length; i++) {
            if (i === 0 || i === 1) {
                tab[i] = ['c/', 'c/', ...tab[i].map((n) => (n.includes('/') ? `c${n}` : `c/${n}`))];
            } else if (i == tab.length - 2) {
                tab[i] = ['u/-', 'u/', ...tab[i].map((n) => (n.includes('/') ? `u${n}` : `u/${n}`))];
            } else {
                tab[i] = ['', '', ...tab[i]];
            }
        }

        this.table = new DisplayTable(tab);
    }

    print(commentElement: HTMLElement, table: HTMLElement) {
        commentElement.innerHTML = this.comment;
        this.table.print(table);
    }
}

export class ColumnarSubtraction extends ColumnarOperation {
    protected steps: ColumnarSubtractionStep[] = [];
    protected signs = ['-'];

    protected generateSteps(numbers: string[], isFloat = true) {
        this.steps = [];

        if (numbers.length != 2 || numbers.some((n) => !this.validateNumber(n, isFloat))) {
            const standardErr = isFloat
                ? 'Wpisz dwie liczby do odjęcia <br>np. 1234-73'
                : 'Wpisz dwie naturalne liczby do odjęcia <br>np. 1234-73';
            throw standardErr;
        }
        if (parseFloat(numbers[0]) - parseFloat(numbers[1]) < 0) {
            throw 'Odjemnik jest większy niż odjemna...';
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

        const table: string[][] = [];
        const crossedFields: boolean[][] = [];
        for (let i = 0; i < numbers.length + 3; i++) {
            table[i] = [];
            crossedFields[i] = [];
            for (let j = 0; j < longestAfterComma + longestBeforeComma; j++) {
                table[i][j] = '';
                crossedFields[i][j] = false;
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
                table[i + 2][longestBeforeComma - beforeComma + k] = numbers[i][k];
            }
        }

        let currentColumn = table[0].length - 1;
        let diff: number;
        let comment =
            'Zapisujemy obie liczby jedna pod drugą z wyrównaniem do ' +
            (longestAfterComma == 0 ? 'prawej' : 'przecinka') +
            ' i podkreślamy.';
        this.steps.push(new ColumnarSubtractionStep(table, longestAfterComma, -1, crossedFields, comment));

        let r = false;
        for (let i = table[0].length - longestAfterComma; i < table[0].length; i++) {
            for (let j = 2; j < 4; j++) {
                if (table[j][i] == '') {
                    table[j][i] = '0';
                    comment = 'Wypełniamy puste miejsca zerami.';
                    r = true;
                }
            }
        }
        if (r) {
            this.steps.push(new ColumnarSubtractionStep(table, longestAfterComma, -1, crossedFields, comment));
        }
        while (currentColumn >= 0) {
            let k = 2;
            while (crossedFields[k][currentColumn]) {
                k--;
            }
            diff = parseInt(table[k][currentColumn]) - parseInt(table[3][currentColumn] || '0');
            if (diff >= 0) {
                table[4][currentColumn] = '' + diff;
                if (table[3][currentColumn] == '') {
                    comment = 'Cyfra ' + table[k][currentColumn] + ' jest samotna, więc przepisujemy ją bez zmian.';
                } else {
                    comment =
                        'Odejmujemy liczby ' +
                        table[k][currentColumn] +
                        ' i ' +
                        table[3][currentColumn] +
                        ', otrzymujemy ' +
                        diff +
                        '. Wynik zapisujemy pod kreską.';
                }
                this.steps.push(
                    new ColumnarSubtractionStep(table, longestAfterComma, currentColumn, crossedFields, comment),
                );
            } else {
                let i = 0;
                let j = 0;
                for (i = currentColumn - 1; i >= 0; i--) {
                    j = 2;
                    while (crossedFields[j][i]) {
                        j--;
                    }
                    crossedFields[j][i] = true;
                    if (table[j][i] == '0') {
                        table[j - 1][i] = '9';
                    } else {
                        table[j - 1][i] = '' + (parseInt(table[2][i]) - 1);
                        break;
                    }
                }
                let l = 2;
                while (crossedFields[l][currentColumn]) {
                    l--;
                }
                crossedFields[l][currentColumn] = true;
                table[l - 1][currentColumn] = '' + (parseInt(table[l][currentColumn]) + 10);

                if (i == currentColumn - 1) {
                    comment =
                        'Chcemy odjąć cyfry ' +
                        table[k][currentColumn] +
                        ' i ' +
                        table[3][currentColumn] +
                        '. Napotykamy trudności, więc musimy wykonać zapożyczenie. Cyfrę ' +
                        table[k][currentColumn] +
                        ' zwiększamy do ' +
                        (parseInt(table[k][currentColumn]) + 10) +
                        ' kosztem cyfry bezpośrednio po lewej, którą zmiejszamy do ' +
                        table[j - 1][i] +
                        '.';
                } else {
                    comment =
                        'Chcemy odjąć cyfry ' +
                        table[k][currentColumn] +
                        ' i ' +
                        table[3][currentColumn] +
                        '. Naptykamy trudności, więc chcemy wykonać pożyczkę od cyfry bezpośrednio po lewej. Ponieważ jest ona zerem, zapożyczenia musimy dokonać od dalszej cyfry - od ' +
                        (parseInt(table[j - 1][i]) + 1) +
                        '. Zmniejszamy ją do ' +
                        table[j - 1][i] +
                        ', wszystkie zera po drodze do 9, a wyjściowe ' +
                        table[k][currentColumn] +
                        ' zwiększamy do ' +
                        (parseInt(table[k][currentColumn]) + 10) +
                        '.';
                }

                this.steps.push(
                    new ColumnarSubtractionStep(table, longestAfterComma, currentColumn, crossedFields, comment),
                );
                table[4][currentColumn] = '' + (10 + diff);
                comment =
                    'Odejmujemy liczby ' +
                    (parseInt(table[k][currentColumn]) + 10) +
                    ' i ' +
                    table[3][currentColumn] +
                    ', otrzymujemy ' +
                    (10 + diff) +
                    '. Wynik zapisujemy pod kreską.';
                this.steps.push(
                    new ColumnarSubtractionStep(table, longestAfterComma, currentColumn, crossedFields, comment),
                );
            }
            currentColumn -= 1;
        }

        comment = 'Odczytujemy wynik: ';
        let w = '';
        for (let i = 0; i < table[table.length - 1].length; i++) {
            w += (i == longestBeforeComma ? ',' : '') + table[table.length - 1][i];
        }
        comment += this.removeLeadingZeros(w) + '.';
        this.steps.push(new ColumnarSubtractionStep(table, longestAfterComma, -1, crossedFields, comment));
    }
}
