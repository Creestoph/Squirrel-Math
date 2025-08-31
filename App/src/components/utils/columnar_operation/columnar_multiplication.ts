import { validate_float, validate_int } from '../number_validation';
import { Display_table } from './display_table';

class Columnar_multiplication_step {
    private table: Display_table;

    constructor(
        table: string[][],
        highlight_fields: boolean[][],
        private readonly comment: string,
        private readonly carry: number,
        mul_underline: number,
        sum_underline: number,
    ) {
        const tab: string[][] = [];
        for (let i = 0; i < table.length; i++) {
            tab[i] = [];
            if (i == mul_underline) {
                tab[i].push('/u:\\cdot');
                tab[i].push('/u:');
            } else if (i == sum_underline) {
                tab[i].push('/u:+');
                tab[i].push('/u:');
            } else {
                tab[i].push('');
                tab[i].push('');
            }
            for (let j = 0; j < table[i].length; j++) {
                let t = ':' + table[i][j];
                if (highlight_fields[i][j]) {
                    t = '/h' + t;
                }
                if (i == mul_underline || i == sum_underline) {
                    t = '/u' + t;
                }
                tab[i].push(t[0] == ':' ? t.replace(/:/g, '') : t);
            }
        }
        this.table = Display_table.create_custom(tab);
    }

    print(coment_target_id: HTMLElement, table_target_id: HTMLElement) {
        coment_target_id.innerHTML = this.comment;
        //document.getElementById(carry_target_id).innerHTML = this.carry;
        this.table.print(table_target_id);
    }
}

export class Columnar_multiplication {
    private steps: Columnar_multiplication_step[] = [];
    private step = 0;

    constructor(
        private readonly table_id: HTMLElement,
        private readonly comment_id: HTMLElement,
        private readonly button_right_id: HTMLElement,
        private readonly button_left_id: HTMLElement,
    ) {}

    generate_from_input(input_id: HTMLInputElement, columnar_multiplication_area: HTMLElement, is_float = true) {
        columnar_multiplication_area.style.visibility = 'visible';
        columnar_multiplication_area.style.marginBottom = '60px';
        columnar_multiplication_area.style.height = 'auto';
        (columnar_multiplication_area.childNodes[0] as HTMLElement).style.minHeight = '400px';
        this.table_id.style.marginTop = '60px';
        (this.button_left_id.childNodes[0] as HTMLElement).setAttribute('height', '60px');
        (this.button_right_id.childNodes[0] as HTMLElement).setAttribute('height', '60px');
        let input = input_id.value;
        input = input.replace(/ /g, '');
        input = input.replace(/,/g, '.');
        try {
            this.generate_steps(input.split('*'), is_float);
            this.comment_id.style.marginTop = '60px';
            return true;
        } catch (err: any) {
            this.comment_id.style.marginTop = '120px';
            this.print_error(err);
            return false;
        }
    }

    next() {
        this.step += 1;
        this.print_step(this.step);
    }
    prev() {
        this.step -= 1;
        this.print_step(this.step);
    }

    private print_step(i: number) {
        this.button_right_id.style.visibility = 'visible';
        this.button_left_id.style.visibility = 'visible';
        if (this.step == 0) {
            this.button_left_id.style.visibility = 'hidden';
        } else if (this.step == this.steps.length - 1) {
            this.button_right_id.style.visibility = 'hidden';
        }
        this.steps[i].print(this.comment_id, this.table_id);
    }

    private print_error(msg: string) {
        this.button_left_id.style.visibility = 'hidden';
        this.button_right_id.style.visibility = 'hidden';
        this.comment_id.innerHTML = msg;
        this.table_id.innerHTML = '';
    }

    private generate_steps(numbers: string[], is_float = true) {
        let standard_err = 'Wpisz dwie liczby do pomnożenia <br>np. 1234*73';
        if (!is_float) {
            standard_err = 'Wpisz dwie liczby naturalne do pomnożenia <br>np. 1234*73';
        }
        let validate = validate_float;
        if (!is_float) {
            validate = validate_int;
        }
        this.steps = [];
        if (numbers.length != 2) {
            throw standard_err;
        }
        for (let i = 0; i < numbers.length; i++) {
            if (!validate(numbers[i])) {
                throw standard_err;
            }
        }
        if (numbers[0].length + numbers[1].length > 39 || numbers[1].length > 10) {
            throw "<b>ERROR</b><br>Wprowadzone liczby są zbyt długie.<br>Ich wyświetlenie przeczy design'owi strony.<br>Szanujmy się.";
        }
        let longest = 0;
        const commas: number[] = [];
        const numbers_orig: string[] = [];
        for (let i = 0; i < numbers.length; i++) {
            while (numbers[i][0] == '0') {
                numbers[i] = numbers[i].replace('0', '');
            }
            if (numbers[i] == '') {
                numbers[i] = '0';
            }
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
            numbers_orig[i] = numbers[i];
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

        let highlight_fields: boolean[][] = [];
        for (let i = 0; i < table.length; i++) {
            highlight_fields[i] = [];
            for (let j = 0; j < table[0].length; j++) {
                highlight_fields[i][j] = false;
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
        this.steps.push(new Columnar_multiplication_step(table, highlight_fields, comment, carry, 1, -1));

        for (let i = numbers[1].length - 1; i >= 0; i--) {
            let t = 0;
            const ci = numbers[1].length - 1 - i;
            comment = 'Przystępujemy do mnożenia liczby ' + numbers[0] + ' przez ' + numbers[1][i] + '.';
            highlight_fields = Columnar_multiplication.empty_highlight(table);
            for (let k = 0; k < numbers[0].length; k++) {
                highlight_fields[0][table[0].length - 1 - k] = true;
            }
            highlight_fields[1][table[1].length - 1 - ci] = true;
            this.steps.push(new Columnar_multiplication_step(table, highlight_fields, comment, carry, 1, -1));
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
                    table = Columnar_multiplication.add_first_column(table);
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
                highlight_fields = Columnar_multiplication.empty_highlight(table);
                highlight_fields[0][table[0].length - 1 - cj] = true;
                highlight_fields[1][table[1].length - 1 - ci] = true;
                highlight_fields[2 + ci][t] = true;
                this.steps.push(new Columnar_multiplication_step(table, highlight_fields, comment, carry, 1, -1));
            }
            if (carry != 0) {
                if (t - 1 == -1) {
                    table = Columnar_multiplication.add_first_column(table);
                    t = 0;
                    table[2 + (numbers[1].length - 1 - i)][t] = '' + carry;
                } else {
                    table[2 + (numbers[1].length - 1 - i)][t - 1] = '' + carry;
                }

                comment = 'Dopisujemy zapamiętane ' + carry + '.';
                carry = 0;
                highlight_fields = Columnar_multiplication.empty_highlight(table);
                this.steps.push(new Columnar_multiplication_step(table, highlight_fields, comment, carry, 1, -1));
            }
        }

        let w = '';
        let sum_underline: number = -1;
        if (numbers[1].length == 1) {
            w = table[table.length - 1].toString();
            w = w.split(',').join('');
        } else {
            sum_underline = table.length - 1;

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
                table = Columnar_multiplication.add_first_column(table);
            }

            comment = 'Otrzymane liczby podkreślamy i wykonujemy ich dodawanie pisemne.';
            highlight_fields = Columnar_multiplication.empty_highlight(table);
            this.steps.push(
                new Columnar_multiplication_step(table, highlight_fields, comment, carry, 1, sum_underline),
            );

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
                'Odczytujemy liczbę ' +
                w +
                '. Ponieważ ' +
                numbers_orig[0].replace('.', ',') +
                ' ma ' +
                commas[0] +
                ' ';
            if (commas[0] == 1) {
                comment += 'cyfrę';
            } else if (commas[0] / 10 != 1 && (commas[0] % 10 == 2 || commas[0] % 10 == 3 || commas[0] % 10 == 4)) {
                comment += 'cyfry';
            } else {
                comment += 'cyfr';
            }
            comment += ' po przecinku, a ' + numbers_orig[1].replace('.', ',') + ' ma ' + commas[1] + ' ';
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

        highlight_fields = Columnar_multiplication.empty_highlight(table);
        this.steps.push(new Columnar_multiplication_step(table, highlight_fields, comment, carry, 1, sum_underline));
    }

    private static add_first_column(tab: string[][]) {
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

    private static empty_highlight(tab: string[][]) {
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
