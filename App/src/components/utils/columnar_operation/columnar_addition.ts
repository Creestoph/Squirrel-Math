import { validate_float, validate_int } from '../number_validation';
import { Display_table } from './display_table';

class Columnar_addition_step {
    private table: Display_table;

    constructor(
        table: string[][],
        comma: number,
        highlight_column: number,
        private readonly comment: string,
    ) {
        const tab: string[][] = [];
        for (let i = 0; i < table.length; i++) {
            tab[i] = [];
            for (let j = 0; j < table[i].length; j++) {
                let t = ':' + table[i][j];
                if (j == highlight_column) {
                    t = '/h' + t;
                }
                tab[i].push(t[0] == ':' ? t.replace(/:/g, '') : t);
                if (comma != 0 && j == table[i].length - comma - 1) {
                    if (i == table.length - 1 || (i != 0 && table[i][j + 1] != '')) {
                        tab[i].push(',');
                    } else {
                        tab[i].push('');
                    }
                }
            }
        }
        this.table = Display_table.create_from_table('+', tab);
    }

    print(coment_target_id: HTMLElement, table_target_id: HTMLElement) {
        coment_target_id.innerHTML = this.comment;
        this.table.print(table_target_id);
    }
}

export class Columnar_addition {
    private steps: Columnar_addition_step[] = [];
    private step: number = 0;

    constructor(
        private readonly table_id: HTMLElement,
        private readonly comment_id: HTMLElement,
        private readonly button_right_id: HTMLElement,
        private readonly button_left_id: HTMLElement,
    ) {}

    generate_from_input(input_id: HTMLInputElement, columnar_addition_area: HTMLDivElement, is_float = true) {
        columnar_addition_area.style.visibility = 'visible';
        columnar_addition_area.style.marginBottom = '60px';
        columnar_addition_area.style.height = 'auto';
        (columnar_addition_area.childNodes[0] as HTMLElement).style.minHeight = '400px';
        this.table_id.style.marginTop = '60px';
        (this.button_left_id.childNodes[0] as HTMLElement).setAttribute('height', '60px');
        (this.button_right_id.childNodes[0] as HTMLElement).setAttribute('height', '60px');
        let input = input_id.value;
        input = input.replace(/ /g, '');
        input = input.replace(/,/g, '.');
        try {
            this.generate_steps(input.split('+'), is_float);
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
        let standard_err = 'Wpisz liczby do dodania <br>np. 1234+73';
        if (!is_float) {
            standard_err = 'Wpisz liczby naturalne do dodania <br>np. 1234+73';
        }
        let validate = validate_float;
        if (!is_float) {
            validate = validate_int;
        }
        this.steps = [];
        if (numbers.length == 1) {
            throw standard_err;
        }
        if (numbers.length > 10) {
            throw '<b>ERROR</b><br>Ani Ty, ani ja nie potrzebujemy aż tylu liczb.';
        }
        for (let i = 0; i < numbers.length; i++) {
            if (!validate(numbers[i])) {
                throw standard_err;
            }
        }
        for (let i = 0; i < numbers.length; i++) {
            while (numbers[i][0] == '0') {
                numbers[i] = numbers[i].replace('0', '');
            }
            if (numbers[i] == '') {
                numbers[i] = '0';
            }
            if (numbers[i][0] == '.') {
                numbers[i] = '0' + numbers[i];
            }
        }
        let longest_before_comma = 0;
        let longest_after_comma = 0;
        for (let i = 0; i < numbers.length; i++) {
            let j = 0;
            while (j < numbers[i].length && numbers[i][j] != '.') {
                j++;
            }
            if (j > longest_before_comma) {
                longest_before_comma = j;
            }
            if (numbers[i].length - 1 - j > longest_after_comma) {
                longest_after_comma = numbers[i].length - 1 - j;
            }
        }
        if (
            (longest_after_comma != 0 && longest_before_comma + longest_after_comma > 38) ||
            (longest_after_comma == 0 && longest_before_comma > 39)
        ) {
            throw "<b>ERROR</b><br>Wprowadzone liczby są zbyt długie.<br>Ich wyświetlenie przeczy design'owi strony.<br>Szanujmy się.";
        }

        longest_before_comma += 1;
        const table: string[][] = [];
        for (let i = 0; i < numbers.length + 2; i++) {
            table[i] = [];
            for (let j = 0; j < longest_after_comma + longest_before_comma; j++) {
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
                table[i + 1][longest_before_comma - beforeComma + k] = numbers[i][k];
            }
        }
        this.steps.push(
            new Columnar_addition_step(
                table,
                longest_after_comma,
                -1,
                'Zapisujemy ' +
                    (table.length == 4 ? 'obie' : 'wszystkie') +
                    ' liczby jedna pod drugą z wyrównaniem do ' +
                    (longest_after_comma == 0 ? 'prawej' : 'przecinka') +
                    ' i podkreślamy.',
            ),
        );
        this.step = 0;
        let current_column = table[0].length - 1;
        let digits = [];
        let comment = '';
        while (current_column >= 0) {
            digits = [];
            for (let i = 0; i < table.length - 1; i++) {
                if (table[i][current_column] != '') {
                    digits.push(table[i][current_column]);
                }
            }
            if (digits.length == 0) {
                break;
            }
            if (current_column == table[0].length - 1) {
                comment = 'Analizujemy słupek od prawej strony. ';
            } else {
                comment = '';
            }
            if (digits.length == 1) {
                table[table.length - 1][current_column] = digits[0];
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
                    table[table.length - 1][current_column] = '' + sum;
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
                    table[table.length - 1][current_column] = '' + (sum % 10);
                    table[0][current_column - 1] = '' + carry;
                }
            }
            this.steps.push(new Columnar_addition_step(table, longest_after_comma, current_column, comment));
            current_column -= 1;
        }
        comment = 'Odczytujemy wynik: ';
        for (let i = 0; i < table[table.length - 1].length; i++) {
            comment += (i == longest_before_comma ? ',' : '') + table[table.length - 1][i];
        }
        comment += '.';
        this.steps.push(new Columnar_addition_step(table, longest_after_comma, -1, comment));
    }
}
