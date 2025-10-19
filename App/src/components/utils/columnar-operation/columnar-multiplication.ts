import { DisplayTable } from './display-table';
import { ColumnarOperation, ColumnarOperationStep } from './columnar-operation';

class ColumnarMultiplicationStep implements ColumnarOperationStep {
    private table: DisplayTable;

    constructor(
        table: string[][],
        highlightFields: boolean[][],
        private readonly comment: string,
        private readonly carry: number,
        mulUnderline: number,
        sumUnderline: number,
    ) {
        const tab: string[][] = [];
        for (let i = 0; i < table.length; i++) {
            tab[i] = [];
            if (i == mulUnderline) {
                tab[i].push('/u:\\cdot');
                tab[i].push('/u:');
            } else if (i == sumUnderline) {
                tab[i].push('/u:+');
                tab[i].push('/u:');
            } else {
                tab[i].push('');
                tab[i].push('');
            }
            for (let j = 0; j < table[i].length; j++) {
                let t = ':' + table[i][j];
                if (highlightFields[i][j]) {
                    t = '/h' + t;
                }
                if (i == mulUnderline || i == sumUnderline) {
                    t = '/u' + t;
                }
                tab[i].push(t[0] == ':' ? t.replace(/:/g, '') : t);
            }
        }
        this.table = DisplayTable.createCustom(tab);
    }

    print(commentElement: HTMLElement, table: HTMLElement) {
        commentElement.innerHTML = this.comment;
        this.table.print(table);
    }
}

export class ColumnarMultiplication extends ColumnarOperation {
    protected steps: ColumnarMultiplicationStep[] = [];
    protected signs = ['*'];

    protected generateSteps(numbers: string[], isFloat = true) {
        this.steps = [];

        if (numbers.length != 2 || numbers.some((n) => !this.validateNumber(n, isFloat))) {
            const standardErr = isFloat
                ? 'Wpisz dwie liczby do pomnożenia <br>np. 1234*73'
                : 'Wpisz dwie liczby naturalne do pomnożenia <br>np. 1234*73';
            throw standardErr;
        }
        if (numbers[0].length + numbers[1].length > 39 || numbers[1].length > 10) {
            throw "<b>ERROR</b><br>Wprowadzone liczby są zbyt długie.<br>Ich wyświetlenie przeczy design'owi strony.<br>Szanujmy się.";
        }
        let longest = 0;
        const commas: number[] = [];
        numbers = numbers.map((n) => this.removeLeadingZeros(n));
        const numbersOrig = [...numbers];

        for (let i = 0; i < numbers.length; i++) {
            let l = numbers[i].length;
            commas[i] = 0;
            for (let j = 0; j < l; j++) {
                if (numbers[i][j] == '.') {
                    l = l - 1;
                    commas[i] = l - j;
                    break;
                }
            }
            if (l > longest) {
                longest = l;
            }
            numbers[i] = numbers[i].replace('.', '');
        }

        let table: string[][] = [];
        for (let i = 0; i < numbers.length; i++) {
            table[i] = [];
            for (let j = 0; j < longest; j++) {
                table[i][j] = '';
            }
        }
        for (let i = 0; i < numbers.length; i++) {
            for (let k = 0; k < numbers[i].length; k++) {
                table[i][longest - numbers[i].length + k] = numbers[i][k];
            }
        }

        let highlightFields: boolean[][] = [];
        for (let i = 0; i < table.length; i++) {
            highlightFields[i] = [];
            for (let j = 0; j < table[0].length; j++) {
                highlightFields[i][j] = false;
            }
        }

        this.step = 0;
        let comment;
        let carry = 0;
        let mul;
        comment = 'Zapisujemy obie liczby jedna pod drugą z wyrównaniem do prawej i podkreślamy.';
        if (commas[0] + commas[1] > 0) {
            comment += ' Chwilowo zaniedbujemy przecinki.';
        }
        this.steps.push(new ColumnarMultiplicationStep(table, highlightFields, comment, carry, 1, -1));

        for (let i = numbers[1].length - 1; i >= 0; i--) {
            let t = 0;
            const ci = numbers[1].length - 1 - i;
            comment = 'Przystępujemy do mnożenia liczby ' + numbers[0] + ' przez ' + numbers[1][i] + '.';
            highlightFields = ColumnarMultiplication.emptyHighlight(table);
            for (let k = 0; k < numbers[0].length; k++) {
                highlightFields[0][table[0].length - 1 - k] = true;
            }
            highlightFields[1][table[1].length - 1 - ci] = true;
            this.steps.push(new ColumnarMultiplicationStep(table, highlightFields, comment, carry, 1, -1));
            for (let j = numbers[0].length - 1; j >= 0; j--) {
                const cj = numbers[0].length - 1 - j;
                mul = parseInt(numbers[1][i]) * parseInt(numbers[0][j]) + carry;
                comment = 'Mnożymy cyfry ' + numbers[1][i] + ' i ' + numbers[0][j];
                if (carry > 0) {
                    comment += ', dodajemy zapamiętane ' + carry;
                }
                comment += ' i otrzymujemy ' + mul + '.';
                carry = Math.floor(mul / 10);
                t = table[0].length - 1 - (ci + cj);
                while (t < 0) {
                    table = ColumnarMultiplication.addFirstColumn(table);
                    t = table[0].length - 1 - (ci + cj);
                }
                if (typeof table[2 + ci] == 'undefined') {
                    table[2 + ci] = [];
                    for (let k = 0; k < table[0].length; k++) {
                        table[2 + ci].push('');
                    }
                }
                table[2 + ci][t] = '' + (mul % 10);
                if (carry > 0) {
                    comment +=
                        ' Ponieważ wynik jest dwucyfrowy, rozbijamy go na ' +
                        carry +
                        ' i ' +
                        (mul % 10) +
                        '. Cyfrę ' +
                        (mul % 10) +
                        ' zapisujemy pod kreską';
                } else {
                    comment += ' Wynik zapisujemy pod kreską';
                }
                if (cj == 0) {
                    if (ci == 1) {
                        comment += ' z pojedynczym wcięciem';
                    }
                    if (ci == 2) {
                        comment += ' z podwójnym wcięciem';
                    }
                    if (ci == 3) {
                        comment += ' z potrójnym wcięciem';
                    }
                    if (ci > 3) {
                        comment += ' z odpowiednim wcięciem';
                    }
                }
                if (carry > 0) {
                    comment += ', a ' + carry + ' zapamiętujemy.';
                } else {
                    comment += '.';
                }
                highlightFields = ColumnarMultiplication.emptyHighlight(table);
                highlightFields[0][table[0].length - 1 - cj] = true;
                highlightFields[1][table[1].length - 1 - ci] = true;
                highlightFields[2 + ci][t] = true;
                this.steps.push(new ColumnarMultiplicationStep(table, highlightFields, comment, carry, 1, -1));
            }
            if (carry != 0) {
                if (t - 1 == -1) {
                    table = ColumnarMultiplication.addFirstColumn(table);
                    t = 0;
                    table[2 + (numbers[1].length - 1 - i)][t] = '' + carry;
                } else {
                    table[2 + (numbers[1].length - 1 - i)][t - 1] = '' + carry;
                }

                comment = 'Dopisujemy zapamiętane ' + carry + '.';
                carry = 0;
                highlightFields = ColumnarMultiplication.emptyHighlight(table);
                this.steps.push(new ColumnarMultiplicationStep(table, highlightFields, comment, carry, 1, -1));
            }
        }

        let w = '';
        let sumUnderline: number = -1;
        if (numbers[1].length == 1) {
            w = table[table.length - 1].toString();
            w = w.split(',').join('');
        } else {
            sumUnderline = table.length - 1;

            let carry = 0;
            for (let i = table[0].length - 1; i >= 0; i--) {
                let sum = carry;
                for (let j = 2; j < table.length; j++) {
                    sum += parseInt(table[j][i] == '' ? '0' : table[j][i]);
                }
                w = w + (sum % 10).toString();
                carry = Math.floor(sum / 10);
            }
            if (carry > 0) {
                w = w + carry.toString();
                table = ColumnarMultiplication.addFirstColumn(table);
            }

            comment = 'Otrzymane liczby podkreślamy i wykonujemy ich dodawanie pisemne.';
            highlightFields = ColumnarMultiplication.emptyHighlight(table);
            this.steps.push(new ColumnarMultiplicationStep(table, highlightFields, comment, carry, 1, sumUnderline));

            table[table.length] = [];
            for (let k = 0; k < table[0].length; k++) {
                table[table.length - 1].push('');
            }
            for (let i = 0; i < w.length; i++) {
                table[table.length - 1][table[0].length - 1 - i] = w[i];
            }
            w = w.split('').reverse().join('');
        }

        if (commas[0] + commas[1] == 0) {
            comment = 'Odczytujemy wynik: ' + w + '.';
        } else {
            const c = commas[0] + commas[1];
            comment =
                'Odczytujemy liczbę ' + w + '. Ponieważ ' + numbersOrig[0].replace('.', ',') + ' ma ' + commas[0] + ' ';
            if (commas[0] == 1) {
                comment += 'cyfrę';
            } else if (commas[0] / 10 != 1 && (commas[0] % 10 == 2 || commas[0] % 10 == 3 || commas[0] % 10 == 4)) {
                comment += 'cyfry';
            } else {
                comment += 'cyfr';
            }
            comment += ' po przecinku, a ' + numbersOrig[1].replace('.', ',') + ' ma ' + commas[1] + ' ';
            if (commas[1] == 1) {
                comment += 'cyfrę';
            } else if (commas[1] / 10 != 1 && (commas[1] % 10 == 2 || commas[1] % 10 == 3 || commas[1] % 10 == 4)) {
                comment += 'cyfry';
            } else {
                comment += 'cyfr';
            }
            comment += ' po przecinku, to wynik musi mieć ' + c + ' ';
            if (c == 1) {
                comment += 'cyfrę';
            } else if (c / 10 != 1 && (c % 10 == 2 || c % 10 == 3 || c % 10 == 4)) {
                comment += 'cyfry';
            } else {
                comment += 'cyfr';
            }
            comment += ' po przecinku.';
            w = w.substring(0, w.length - c) + ',' + w.substring(w.length - c);
            comment += ' Ostatecznie otrzymujemy ' + w + '.';
        }

        highlightFields = ColumnarMultiplication.emptyHighlight(table);
        this.steps.push(new ColumnarMultiplicationStep(table, highlightFields, comment, carry, 1, sumUnderline));
    }

    private static addFirstColumn(tab: string[][]) {
        const tab1: string[][] = [];
        for (let i = 0; i < tab.length; i++) {
            tab1[i] = [];
            tab1[i].push('');
            for (let j = 0; j < tab[i].length; j++) {
                tab1[i].push(tab[i][j]);
            }
        }
        return tab1;
    }

    private static emptyHighlight(tab: string[][]) {
        const tab1: boolean[][] = [];
        for (let i = 0; i < tab.length; i++) {
            tab1[i] = [];
            for (let j = 0; j < tab[i].length; j++) {
                tab1[i].push(false);
            }
        }
        return tab1;
    }
}
