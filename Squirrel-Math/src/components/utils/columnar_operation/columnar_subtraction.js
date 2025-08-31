/**
 * Created by InvincibleWombat on 11.11.2016.
 */

import { validate_float, validate_int } from '../number_validation';
import { Display_table } from '../columnar_operation_table/display_table';

function Columnar_subtraction_step(
    table,
    comma,
    highlight_column,
    crossed_fields,
    comment,
) {
    var tab = [];
    for (let i = 0; i < table.length; i++) {
        tab[i] = [];
        for (let j = 0; j < table[i].length; j++) {
            var t = ':' + table[i][j];
            if (j == highlight_column) t = '/h' + t;
            if (crossed_fields[i][j]) t = '/s' + t;
            tab[i].push(t[0] == ':' ? t.replace(/:/g, '') : t);
            if (comma != 0 && j == table[i].length - comma - 1) {
                if (
                    i == table.length - 1 ||
                    (i != 0 && i != 1 && table[i][j + 1] != '')
                )
                    tab[i].push(',');
                else tab[i].push('');
            }
        }
    }
    this.table = Display_table.create_from_table('-', tab);
    this.comment = comment;
}

Columnar_subtraction_step.prototype.print = function (
    coment_target_id,
    table_target_id,
) {
    coment_target_id.innerHTML = this.comment;
    this.table.print(table_target_id);
};

export class Columnar_subtraction {
    constructor(table_id, comment_id, button_right_id, button_left_id) {
        this.comment_id = comment_id;
        this.table_id = table_id;
        this.button_right_id = button_right_id;
        this.button_left_id = button_left_id;
    }

    generate_from_input(input_id, columnar_subtraction_area, is_float = true) {
        columnar_subtraction_area.style.visibility = 'visible';
        columnar_subtraction_area.style.marginBottom = '60px';
        columnar_subtraction_area.style.height = 'auto';
        this.table_id.style.marginTop = '60px';
        columnar_subtraction_area.childNodes[0].style.minHeight = '400px';
        this.button_left_id.childNodes[0].setAttribute('height', '60px');
        this.button_right_id.childNodes[0].setAttribute('height', '60px');
        var input = input_id.value;
        input = input.replace(/ /g, '');
        input = input.replace(/,/g, '.');
        try {
            this.generate_steps(input.split('-'), is_float);
            this.comment_id.style.marginTop = '60px';
            return true;
        } catch (err) {
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

    print_step(i) {
        this.button_right_id.style.visibility = 'visible';
        this.button_left_id.style.visibility = 'visible';
        if (this.step == 0) {
            this.button_left_id.style.visibility = 'hidden';
        } else if (this.step == this.steps.length - 1) {
            this.button_right_id.style.visibility = 'hidden';
        }
        this.steps[i].print(this.comment_id, this.table_id);
    }

    print_error(msg) {
        this.button_left_id.style.visibility = 'hidden';
        this.button_right_id.style.visibility = 'hidden';
        this.comment_id.innerHTML = msg;
        this.table_id.innerHTML = '';
    }

    generate_steps(numbers, is_float = true) {
        var standard_err = 'Wpisz dwie liczby do odjęcia <br>np. 1234-73';
        if (!is_float)
            standard_err =
                'Wpisz dwie naturalne liczby do odjęcia <br>np. 1234-73';
        var validate = validate_float;
        if (!is_float) validate = validate_int;
        this.steps = [];
        if (numbers.length != 2) {
            throw standard_err;
        }
        for (let i = 0; i < numbers.length; i++) {
            if (!validate(numbers[i])) {
                throw standard_err;
            }
        }
        if (parseFloat(numbers[0]) - parseFloat(numbers[1]) < 0) {
            throw 'Odjemnik jest większy niż odjemna...';
        }
        for (let i = 0; i < numbers.length; i++) {
            while (numbers[i][0] == '0')
                numbers[i] = numbers[i].replace('0', '');
            if (numbers[i] == '') numbers[i] = '0';
            if (numbers[i][0] == '.') numbers[i] = '0' + numbers[i];
        }
        var longest_before_comma = 0;
        var longest_after_comma = 0;
        for (let i = 0; i < numbers.length; i++) {
            let j;
            for (j = 0; j < numbers[i].length && numbers[i][j] != '.'; j++);
            if (j > longest_before_comma) longest_before_comma = j;
            if (numbers[i].length - 1 - j > longest_after_comma)
                longest_after_comma = numbers[i].length - 1 - j;
        }

        if (
            (longest_after_comma != 0 &&
                longest_before_comma + longest_after_comma > 38) ||
            (longest_after_comma == 0 && longest_before_comma > 39)
        ) {
            throw "<b>ERROR</b><br>Wprowadzone liczby są zbyt długie.<br>Ich wyświetlenie przeczy design'owi strony.<br>Szanujmy się.";
        }

        var table = [];
        for (let i = 0; i < numbers.length + 3; i++) {
            table[i] = [];
            for (
                let j = 0;
                j < longest_after_comma + longest_before_comma;
                j++
            ) {
                table[i][j] = '';
            }
        }
        for (let i = 0; i < numbers.length; i++) {
            let j;
            for (j = 0; j < numbers[i].length && numbers[i][j] != '.'; j++);
            var beforeComma = j;
            numbers[i] = numbers[i].replace('.', '');
            for (let k = 0; k < numbers[i].length; k++) {
                table[i + 2][longest_before_comma - beforeComma + k] =
                    numbers[i][k];
            }
        }

        var crossed_fields = [];
        for (let i = 0; i < numbers.length + 3; i++) {
            crossed_fields[i] = [];
            for (
                let j = 0;
                j < longest_after_comma + longest_before_comma;
                j++
            ) {
                crossed_fields[i][j] = false;
            }
        }

        this.step = 0;
        var current_column = table[0].length - 1;
        var comment;
        var diff;
        comment =
            'Zapisujemy obie liczby jedna pod drugą z wyrównaniem do ' +
            (longest_after_comma == 0 ? 'prawej' : 'przecinka') +
            ' i podkreślamy.';
        this.steps.push(
            new Columnar_subtraction_step(
                table,
                longest_after_comma,
                -1,
                crossed_fields,
                comment,
            ),
        );

        var r = false;
        for (
            let i = table[0].length - longest_after_comma;
            i < table[0].length;
            i++
        ) {
            for (let j = 2; j < 4; j++) {
                if (table[j][i] == '') {
                    table[j][i] = '0';
                    comment = 'Wypełniamy puste miejsca zerami.';
                    r = true;
                }
            }
        }
        if (r) {
            this.steps.push(
                new Columnar_subtraction_step(
                    table,
                    longest_after_comma,
                    -1,
                    crossed_fields,
                    comment,
                ),
            );
        }
        while (current_column >= 0) {
            var k = 2;
            for (; crossed_fields[k][current_column]; k--);
            diff = table[k][current_column] - table[3][current_column];
            if (diff >= 0) {
                table[4][current_column] = diff;
                if (table[3][current_column] == '')
                    comment =
                        'Cyfra ' +
                        table[k][current_column] +
                        ' jest samotna, więc przepisujemy ją bez zmian.';
                else
                    comment =
                        'Odejmujemy liczby ' +
                        table[k][current_column] +
                        ' i ' +
                        table[3][current_column] +
                        ', otrzymujemy ' +
                        diff +
                        '. Wynik zapisujemy pod kreską.';
                this.steps.push(
                    new Columnar_subtraction_step(
                        table,
                        longest_after_comma,
                        current_column,
                        crossed_fields,
                        comment,
                    ),
                );
            } else {
                var i = 0;
                var j = 0;
                for (i = current_column - 1; i >= 0; i--) {
                    j = 2;
                    for (; crossed_fields[j][i]; j--);
                    crossed_fields[j][i] = true;
                    if (table[j][i] == 0) table[j - 1][i] = 9;
                    else {
                        table[j - 1][i] = parseInt(table[2][i]) - 1;
                        break;
                    }
                }
                var l = 2;
                for (; crossed_fields[l][current_column]; l--);
                crossed_fields[l][current_column] = true;
                table[l - 1][current_column] =
                    parseInt(table[l][current_column]) + 10;

                if (i == current_column - 1)
                    comment =
                        'Chcemy odjąć cyfry ' +
                        table[k][current_column] +
                        ' i ' +
                        table[3][current_column] +
                        '. Napotykamy trudności, więc musimy wykonać zapożyczenie. Cyfrę ' +
                        table[k][current_column] +
                        ' zwiększamy do ' +
                        (parseInt(table[k][current_column]) + 10) +
                        ' kosztem cyfry bezpośrednio po lewej, którą zmiejszamy do ' +
                        table[j - 1][i] +
                        '.';
                else
                    comment =
                        'Chcemy odjąć cyfry ' +
                        table[k][current_column] +
                        ' i ' +
                        table[3][current_column] +
                        '. Naptykamy trudności, więc chcemy wykonać pożyczkę od cyfry bezpośrednio po lewej. Ponieważ jest ona zerem, zapożyczenia musimy dokonać od dalszej cyfry - od ' +
                        (parseInt(table[j - 1][i]) + 1) +
                        '. Zmniejszamy ją do ' +
                        table[j - 1][i] +
                        ', wszystkie zera po drodze do 9, a wyjściowe ' +
                        table[k][current_column] +
                        ' zwiększamy do ' +
                        (parseInt(table[k][current_column]) + 10) +
                        '.';

                this.steps.push(
                    new Columnar_subtraction_step(
                        table,
                        longest_after_comma,
                        current_column,
                        crossed_fields,
                        comment,
                    ),
                );
                table[4][current_column] = 10 + parseInt(diff);
                comment =
                    'Odejmujemy liczby ' +
                    (parseInt(table[k][current_column]) + 10) +
                    ' i ' +
                    table[3][current_column] +
                    ', otrzymujemy ' +
                    (10 + parseInt(diff)) +
                    '. Wynik zapisujemy pod kreską.';
                this.steps.push(
                    new Columnar_subtraction_step(
                        table,
                        longest_after_comma,
                        current_column,
                        crossed_fields,
                        comment,
                    ),
                );
            }
            current_column -= 1;
        }

        comment = 'Odczytujemy wynik: ';
        var w = '';
        for (let i = 0; i < table[table.length - 1].length; i++)
            w +=
                (i == longest_before_comma ? ',' : '') +
                table[table.length - 1][i];
        while (w[0] == '0') w = w.replace('0', '');
        comment += (w == '' ? '0' : w) + '.';
        this.steps.push(
            new Columnar_subtraction_step(
                table,
                longest_after_comma,
                -1,
                crossed_fields,
                comment,
            ),
        );
    }
}
