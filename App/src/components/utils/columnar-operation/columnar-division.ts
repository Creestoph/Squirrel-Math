import { ColumnarOperation, ColumnarOperationStep } from './columnar-operation';
import { DisplayTable } from './display-table';

class ColumnarDivisionStep implements ColumnarOperationStep {
    private readonly table: DisplayTable;

    constructor(
        table: string[][],
        highlightFields: boolean[][],
        private readonly comment: string,
    ) {
        const tab: string[][] = [];
        const underline = true;
        for (let i = 0; i < table.length; i++) {
            tab[i] = [i % 2 == 0 && i > 0 ? 'u/-' : ''];
            for (let j = 0; j < table[i].length; j++) {
                let t = '/' + table[i][j];
                if (highlightFields[i][j]) {
                    t = 'h' + t;
                }
                if (i % 2 == 0) {
                    if (i == 0) {
                        if (table[i][j].toString() != '' || underline) {
                            t = 'u' + t;
                        }
                    } else {
                        t = 'u' + t;
                    }
                }
                tab[i].push(t[0] == '/' ? t.replace(/\//g, '') : t);
            }
        }
        this.table = new DisplayTable(tab);
    }

    print(table: HTMLElement): string {
        this.table.print(table);
        return this.comment;
    }
}

export class ZeroDivisionError {
    readonly message = 'Po prostu nie wolno.';
}

export class ColumnarDivision extends ColumnarOperation {
    protected steps: ColumnarDivisionStep[] = [];
    protected signs = ['/', ':'];

    protected generateSteps(numbers: string[], isFloat = true) {
        this.steps = [];

        if (parseFloat(numbers[1]) === 0) {
            throw new ZeroDivisionError();
        }

        if (numbers.length != 2 || numbers.some((n) => !this.validateNumber(n, isFloat))) {
            const standardErr = isFloat
                ? 'Wpisz dwie liczby do podzielenia <br>np. 1234:73'
                : 'Wpisz dwie liczby naturalne do podzielenia <br>np. 1234:73';
            throw standardErr;
        }

        if (numbers[0].length + numbers[1].length > 37) {
            throw "<b>ERROR</b><br>Wprowadzone liczby są zbyt długie.<br>Ich wyświetlenie przeczy design'owi strony.<br>Szanujmy się.";
        }
        numbers = numbers.map((n) => this.removeLeadingZeros(n));
        const numbersOrig = [...numbers];

        let decmialPlaces1 = 0;
        for (let i = 0; i < numbers[1].length; i++) {
            if (numbers[1][i] == '.') {
                decmialPlaces1 = numbers[1].length - 1 - i;
            }
        }
        let decmialPlaces0 = 0;
        for (let i = 0; i < numbers[0].length; i++) {
            if (numbers[0][i] == '.') {
                decmialPlaces0 = numbers[0].length - 1 - i;
            }
        }
        const decimalDiff = decmialPlaces0 - decmialPlaces1;
        numbers[0] = numbers[0].replace('.', '');
        if (decimalDiff < 0) {
            for (let i = 0; i < -1 * decimalDiff; i++) {
                numbers[0] += '0';
            }
        } else if (decimalDiff > 0) {
            numbers[0] =
                numbers[0].slice(0, numbers[0].length - decimalDiff) +
                '.' +
                numbers[0].slice(numbers[0].length - decimalDiff);
        }
        numbers[1] = numbers[1].replace('.', '');
        numbers = numbers.map((n) => this.removeLeadingZeros(n));
        let table: string[][] = [];
        for (let i = 0; i < 2; i++) {
            table[i] = [];
            for (let j = 0; j < numbers[1].length + numbers[0].length + 1; j++) {
                table[i][j] = '';
            }
        }
        let k = 0;
        for (let i = 0; i < numbers.length; i++) {
            for (let j = 0; j < numbers[i].length; j++) {
                table[1][k] = numbers[i][j];
                k = k + 1;
            }
            if (i == 0) {
                table[1][k] = ':';
                k = k + 1;
            }
        }

        for (let i = 0; i < table[0].length; i++) {
            if (table[1][i] == '.') {
                table[0][i] = '.';
            }
        }
        let comment = '';
        if (decmialPlaces1 > 0) {
            comment +=
                'Przed przystapieniem do dzielenia pozbywamy się przecinka w dzielniku. Ponieważ liczba ' +
                numbersOrig[1].replace('.', ',') +
                ' ma ' +
                decmialPlaces1;
            if (decmialPlaces1 == 1) {
                comment += ' cyfrę';
            } else if (
                (decmialPlaces1 % 10 == 2 || decmialPlaces1 % 10 == 3 || decmialPlaces1 % 10 == 4) &&
                decmialPlaces1 / 10 != 1
            ) {
                comment += ' cyfry';
            } else {
                comment += ' cyfr';
            }
            comment += ' po przecinku,' + ' przesuwamy przecinek dzielnej o ' + decmialPlaces1 + ' w prawo. ';
        }
        comment += 'Zapisujemy obie liczby obok siebie i rysujemy kreskę ponad nimi.';
        let highlightFields = ColumnarDivision.emptyHighlight(table);
        this.steps.push(new ColumnarDivisionStep(table, highlightFields, comment));

        this.step = 0;
        table[0][0] = '' + Math.floor(parseInt(table[1][0]) / parseInt(numbers[1]));

        comment =
            'Analizujemy dzielną od lewej strony. Bierzemy cyfrę ' +
            table[1][0] +
            ' i próbujemy podzielić ją przez ' +
            numbers[1] +
            '. Liczba ' +
            numbers[1] +
            ' mieści się ' +
            table[0][0] +
            ' raz' +
            (table[0][0] == '1' ? '' : 'y') +
            ' w liczbie ' +
            table[1][0] +
            ', więc nad kreską zapisujemy ' +
            table[0][0] +
            '.';
        highlightFields = ColumnarDivision.emptyHighlight(table);
        highlightFields[1][0] = true;
        highlightFields[0][0] = true;
        for (let h = 0; h < numbers[1].length; h++) {
            highlightFields[1][numbers[0].length + 1 + h] = true;
        }
        this.steps.push(new ColumnarDivisionStep(table, highlightFields, comment));

        table = ColumnarDivision.addEmptyRow(table);
        table[2][0] = '' + parseInt(table[0][0]) * parseInt(numbers[1]);
        table = ColumnarDivision.addEmptyRow(table);
        table[3][0] = '' + (parseInt(table[1][0]) - parseInt(table[2][0]));

        comment =
            'Mnożymy zapisane w wyniku ' +
            table[0][0] +
            ' przez dzielnik i otrzymujemy ' +
            table[2][0] +
            '. Wykonujemy odejmowanie ' +
            table[1][0] +
            '&nbsp;-&nbsp;' +
            table[2][0] +
            '&nbsp;=&nbsp;' +
            table[3][0] +
            ', wynik zapisujemy poniżej.';
        highlightFields = ColumnarDivision.emptyHighlight(table);
        highlightFields[1][0] = true;
        highlightFields[2][0] = true;
        highlightFields[3][0] = true;
        this.steps.push(new ColumnarDivisionStep(table, highlightFields, comment));

        let i = 1;
        let fi = i;
        let z: string = '' + parseInt(table[3][0]);
        for (; fi < numbers[0].length; fi++) {
            if (numbers[0][fi] == '.') {
                fi++;
            }
            table[table.length - 1][i] = numbers[0][fi];
            let x = '';
            for (let j = i; j >= 0 && table[table.length - 1][j] != ''; j--) {
                x = table[table.length - 1][j] + x;
            }
            table[0][fi] = '' + Math.floor(parseInt(x) / parseInt(numbers[1]));

            comment =
                'Dopisujemy cyfrę ' +
                numbers[0][fi] +
                ' i próbujemy wykonać dzielenie ' +
                parseInt(x) +
                ' przez ' +
                numbers[1] +
                '. Liczba ' +
                numbers[1] +
                ' mieści się ' +
                table[0][fi] +
                ' raz' +
                (table[0][fi] == '1' ? '' : 'y') +
                ' w liczbie ' +
                parseInt(x) +
                ', więc nad kreską zapisujemy ' +
                table[0][fi] +
                '.';
            highlightFields = ColumnarDivision.emptyHighlight(table);
            highlightFields[0][fi] = true;
            highlightFields[1][fi] = true;
            for (let j = i; j >= 0 && table[table.length - 1][j] != ''; j--) {
                highlightFields[table.length - 1][j] = true;
            }
            for (let h = 0; h < numbers[1].length; h++) {
                highlightFields[1][numbers[0].length + 1 + h] = true;
            }
            this.steps.push(new ColumnarDivisionStep(table, highlightFields, comment));

            const y = '' + parseInt(table[0][fi]) * parseInt(numbers[1]);
            table = ColumnarDivision.addEmptyRow(table);
            for (let j = y.length - 1; j >= 0; j--) {
                table[table.length - 1][i - (y.length - 1 - j)] = y[j];
            }
            z = '' + (parseInt(x) - parseInt(y));
            table = ColumnarDivision.addEmptyRow(table);
            for (let j = z.length - 1; j >= 0; j--) {
                table[table.length - 1][i - (z.length - 1 - j)] = z[j];
            }

            comment =
                'Mnożymy zapisane w wyniku ' +
                table[0][fi] +
                ' przez dzielnik i otrzymujemy ' +
                parseInt(y) +
                '. Wykonujemy odejmowanie<br>' +
                parseInt(x) +
                '-' +
                parseInt(y) +
                '=' +
                parseInt(z) +
                ', wynik zapisujemy poniżej.';
            highlightFields = ColumnarDivision.emptyHighlight(table);
            for (let j = z.length - 1; j >= 0; j--) {
                highlightFields[table.length - 1][i - (z.length - 1 - j)] = true;
            }
            for (let j = y.length - 1; j >= 0; j--) {
                highlightFields[table.length - 2][i - (y.length - 1 - j)] = true;
            }
            for (let j = x.length - 1; j >= 0; j--) {
                highlightFields[table.length - 3][i - (x.length - 1 - j)] = true;
            }
            this.steps.push(new ColumnarDivisionStep(table, highlightFields, comment));
            i++;
        }
        i--;
        fi--;
        if (parseInt(z) == 0) {
            comment =
                'Ponieważ w dzielnej nie ma już cyfr do spisania, a w wyniku odejmowania otrzymaliśmy 0, kończymy procedurę. Odcztujemy wynik ';
            let zeros = 1;
            let result = '';
            for (let j = 0; j < table[0].length; j++) {
                if (table[0][j] == '0' && zeros != 1) {
                    result += table[0][j].toString();
                } else if (table[0][j] != '0') {
                    result += table[0][j].toString();
                    zeros = 0;
                }
            }
            comment += (result[0] == '.' ? '0' : '') + result + '.';
            highlightFields = ColumnarDivision.emptyHighlight(table);
            this.steps.push(new ColumnarDivisionStep(table, highlightFields, comment));
            return;
        } else if (!isFloat) {
            let zeros = 1;
            let result = '';
            for (let j = 0; j < table[0].length; j++) {
                if (table[0][j] == '0' && zeros != 1) {
                    result += table[0][j].toString();
                } else if (table[0][j] != '0') {
                    result += table[0][j].toString();
                    zeros = 0;
                }
            }

            comment = `Ponieważ w dzielnej nie ma już cyfr do spisania, traktujemy pozostałe ${parseInt(z)} jako resztę z dzielenia. Odcztujemy wynik ${
                (result[0] == '.' || result == '' ? '0' : '') + result
            } r. ${z}.`;

            let j = 0;
            while (table[0][j].toString() != '') {
                j++;
            }
            table[0][j++] = 'r.';
            for (let k = 0; k < z.length; k++) {
                table[0][j++] = z[k];
            }
            highlightFields = ColumnarDivision.emptyHighlight(table);
            this.steps.push(new ColumnarDivisionStep(table, highlightFields, comment));
            return;
        } else if (isFloat) {
            const occured = [];
            let n = z.toString();
            if (fi == i) {
                fi++;
                table[0][fi] = '.';
            }
            fi++;
            i++;
            while (occured.indexOf(n) == -1) {
                occured.push(n);
                if (fi + 1 >= table[0].length) {
                    table = ColumnarDivision.addEmptyColumn(table);
                }
                table[table.length - 1][i] = '0';
                let x = '';
                for (let j = i; j >= 0 && table[table.length - 1][j] != ''; j--) {
                    x = table[table.length - 1][j] + x;
                }
                table[0][fi] = '' + Math.floor(parseInt(x) / parseInt(numbers[1]));

                comment =
                    'Kolejną cyfrą rozwinięcia dziesiętnego dzielnej jest 0. Dopisujemy więc 0 i próbujemy wykonać dzielenie ' +
                    parseInt(x) +
                    ' przez ' +
                    numbers[1] +
                    '. Liczba ' +
                    numbers[1] +
                    ' mieści się ' +
                    table[0][fi] +
                    ' raz' +
                    (table[0][fi] == '1' ? '' : 'y') +
                    ' w liczbie ' +
                    parseInt(x) +
                    ', więc nad kreską zapisujemy ' +
                    table[0][fi] +
                    '.';
                highlightFields = ColumnarDivision.emptyHighlight(table);
                highlightFields[0][fi] = true;
                if (fi < numbers[0].length) {
                    highlightFields[1][fi] = true;
                }
                for (let j = i; j >= 0 && table[table.length - 1][j] != ''; j--) {
                    highlightFields[table.length - 1][j] = true;
                }
                for (let h = 0; h < numbers[1].length; h++) {
                    highlightFields[1][numbers[0].length + 1 + h] = true;
                }
                this.steps.push(new ColumnarDivisionStep(table, highlightFields, comment));

                const y = '' + parseInt(table[0][fi]) * parseInt(numbers[1]);
                table = ColumnarDivision.addEmptyRow(table);
                for (let j = y.length - 1; j >= 0; j--) {
                    table[table.length - 1][i - (y.length - 1 - j)] = y[j];
                }
                z = '' + (parseInt(x) - parseInt(y));
                table = ColumnarDivision.addEmptyRow(table);
                for (let j = z.length - 1; j >= 0; j--) {
                    table[table.length - 1][i - (z.length - 1 - j)] = z[j];
                }

                comment =
                    'Mnożymy zapisane w wyniku ' +
                    table[0][fi] +
                    ' przez dzielnik i otrzymujemy ' +
                    parseInt(y) +
                    '. Wykonujemy odejmowanie ' +
                    parseInt(x) +
                    '&nbsp;-&nbsp;' +
                    parseInt(y) +
                    '&nbsp;=&nbsp;' +
                    parseInt(z) +
                    ', wynik zapisujemy poniżej.';
                highlightFields = ColumnarDivision.emptyHighlight(table);
                for (let j = z.length - 1; j >= 0; j--) {
                    highlightFields[table.length - 1][i - (z.length - 1 - j)] = true;
                }
                for (let j = y.length - 1; j >= 0; j--) {
                    highlightFields[table.length - 2][i - (y.length - 1 - j)] = true;
                }
                for (let j = x.length - 1; j >= 0; j--) {
                    highlightFields[table.length - 3][i - (x.length - 1 - j)] = true;
                }
                this.steps.push(new ColumnarDivisionStep(table, highlightFields, comment));
                let tl = table[0].length - 1;
                while (table[0][tl].toString() == '') {
                    tl--;
                }
                tl++;
                if (tl > 27) {
                    table = ColumnarDivision.addEmptyColumn(table);
                    table[0][tl] = '\\dots';
                    comment =
                        'Możemy kontynuować procedurę aż do napotkania okresu rozwinięcia dziesiętnego. Rachunki mogą trwać jeszcze bardzo długo, więc zadowalamy się przybliżonym wynikiem ';
                    let zeros = 1;
                    let result = '';
                    for (let j = 0; j < table[0].length; j++) {
                        if (table[0][j] == '0' && zeros != 1) {
                            result += table[0][j].toString();
                        } else if (table[0][j] != '0') {
                            result += table[0][j].toString();
                            zeros = 0;
                        }
                    }
                    comment += '$' + (result[0] == '.' ? '0' : '') + result.replace('.', ',') + '$.';
                    highlightFields = ColumnarDivision.emptyHighlight(table);
                    this.steps.push(new ColumnarDivisionStep(table, highlightFields, comment));
                    return;
                }
                if (parseInt(z) == 0) {
                    comment = 'Ponieważ w wyniku odejmowania otrzymaliśmy 0, kończymy procedurę. Odcztujemy wynik ';
                    let zeros = 1;
                    let result = '';
                    for (let j = 0; j < table[0].length; j++) {
                        if (table[0][j] == '0' && zeros != 1) {
                            result += table[0][j].toString();
                        } else if (table[0][j] != '0') {
                            result += table[0][j].toString();
                            zeros = 0;
                        }
                    }
                    comment += (result[0] == '.' ? '0' : '') + result + '.';
                    highlightFields = ColumnarDivision.emptyHighlight(table);
                    this.steps.push(new ColumnarDivisionStep(table, highlightFields, comment));
                    return;
                }
                i++;
                fi++;
                n = z;
            }
            table[table.length - 1][i] = '0';
            let x = '';
            for (let j = i; j >= 0 && table[table.length - 1][j] != ''; j--) {
                x = table[table.length - 1][j] + x;
            }
            comment =
                'Po spisaniu zera otrzymujemy do podzielenia liczbę ' +
                parseInt(x) +
                ' - taką samą jak kilka kroków wcześniej. Wszystkie kolejne operacje przynosiłyby cyklicznie takie same wyniki - zatem wyznaczyliśmy okres. Odczytujemy wynik ';
            let zeros = 1;
            let result = '';
            for (let j = 0; j < table[0].length; j++) {
                if (table[0][j] == '0' && zeros != 1) {
                    result += table[0][j].toString();
                } else if (table[0][j] != '0') {
                    result += table[0][j].toString();
                    zeros = 0;
                }
            }
            let fromEnd = occured.length - occured.indexOf(n);
            if (fromEnd == 0) {
                fromEnd = 1;
            }
            result = result.slice(0, result.length - fromEnd) + '(' + result.slice(result.length - fromEnd) + ')';
            comment += (result[0] == '.' ? '0' : '') + result.replace('.', ',') + '.';
            let temp = table[0][table[0].length - fromEnd - 1];
            table[0][table[0].length - fromEnd - 1] = '(';
            let temp1;
            for (let b = table[0].length - fromEnd; b < table[0].length; b++) {
                temp1 = table[0][b];
                table[0][b] = temp;
                temp = temp1;
            }
            table = ColumnarDivision.addEmptyColumn(table);
            table[0][table[0].length - 1] = temp;
            table = ColumnarDivision.addEmptyColumn(table);
            table[0][table[0].length - 1] = ')';
            highlightFields = ColumnarDivision.emptyHighlight(table);
            for (let h = 0; h < highlightFields[highlightFields.length - fromEnd * 2 - 1].length; h++) {
                if (table[highlightFields.length - fromEnd * 2 - 1][h].toString() != '') {
                    highlightFields[highlightFields.length - fromEnd * 2 - 1][h] = true;
                }
            }
            this.steps.push(new ColumnarDivisionStep(table, highlightFields, comment));
            return;
        }
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

    private static addEmptyRow(tab: string[][]) {
        const tab1: string[][] = [];
        for (let i = 0; i < tab.length; i++) {
            tab1[i] = [];
            for (let j = 0; j < tab[i].length; j++) {
                tab1[i].push(tab[i][j]);
            }
        }
        tab1[tab1.length] = [];
        for (let j = 0; j < tab[0].length; j++) {
            tab1[tab1.length - 1].push('');
        }
        return tab1;
    }

    private static addEmptyColumn(tab: string[][]) {
        const tab1: string[][] = [];
        for (let i = 0; i < tab.length; i++) {
            tab1[i] = [];
            for (let j = 0; j < tab[i].length; j++) {
                tab1[i].push(tab[i][j]);
            }
            tab1[i].push('');
        }
        return tab1;
    }
}
