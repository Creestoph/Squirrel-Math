/**
 * Created by InvincibleWombat on 11.11.2016.
 */
import { validate_float, validate_int } from "../number_validation"
import { divide } from "../sm_library"
import { Display_table } from "../columnar_operation_table/display_table"

function Columnar_division_step(table, highlight_fields, comment) {
    var tab = [];
    var underline = true;
    for (let i = 0; i < table.length; i++) {
        tab[i] = [];
        if (i % 2 == 0 && i > 0) tab[i].push("/u:-");
        else tab[i].push("");
        for (var j = 0; j < table[i].length; j++) {
            var t = ":" + table[i][j];
            if (highlight_fields[i][j]) t = "/h" + t;
            if (i % 2 == 0) {
                if (i == 0) {
                    if (table[i][j].toString() != "" || underline) t = "/u" + t;
                    //if (table[i + 1][j] == ":") underline = false;
                }
                else t = "/u" + t;
            }
            if (t == "::") tab[i].push(":");
            else tab[i].push(t[0] == ':' ? t.replace(/:/g, "") : t)
        }
    }
    this.table = Display_table.create_custom(tab);
    this.comment = comment;
}

Columnar_division_step.prototype.print = function (coment_target_id, table_target_id) {
    coment_target_id.innerHTML = this.comment;
    this.table.print(table_target_id);
}

export class Columnar_division {
    constructor(table_id, comment_id, button_right_id, button_left_id) {
        this.comment_id = comment_id;
        this.table_id = table_id;
        this.button_right_id = button_right_id;
        this.button_left_id = button_left_id;
    }
    generate_from_input(input_id, columnar_multiplication_area, is_float = true) {
        columnar_multiplication_area.style.visibility = "visible";
        columnar_multiplication_area.style.marginBottom = "60px";
        columnar_multiplication_area.style.height = "auto";
        columnar_multiplication_area.childNodes[0].style.minHeight = "400px";
        this.table_id.style.marginTop = "60px";
        this.button_left_id.childNodes[0].setAttribute("height", "60px");
        this.button_right_id.childNodes[0].setAttribute("height", "60px");
        var input = input_id.value;
        input = input.replace(/ /g, "");
        input = input.replace(/,/g, ".");
        try {
            this.generate_steps(input.replace(/:/g, "/").split("/"), is_float);
            this.comment_id.style.marginTop = "60px";
            return true;
        }
        catch (err) {
            this.comment_id.style.marginTop = "120px";
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
        this.button_right_id.style.visibility = "visible";
        this.button_left_id.style.visibility = "visible";
        if (this.step == 0) {
            this.button_left_id.style.visibility = "hidden";
        }
        else if (this.step == this.steps.length - 1) {
            this.button_right_id.style.visibility = "hidden";
        }
        this.steps[i].print(this.comment_id, this.table_id);
    }

    print_error(msg) {
        this.button_left_id.style.visibility = "hidden";
        this.button_right_id.style.visibility = "hidden";
        this.comment_id.innerHTML = msg;
        this.table_id.innerHTML = "";
    }

    generate_steps(numbers, is_float = true) {
        if (parseInt(numbers[1]) == 0) {
            document.getElementById("divide_by_0").style.display = "block";
            throw "Po prostu nie wolno.";
        }
        var standard_err = "Wpisz dwie liczby do podzielenia <br>np. 1234:73";
        if (!is_float) standard_err = "Wpisz dwie liczby naturalne do podzielenia <br>np. 1234:73";
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
        if (numbers[0].length + numbers[1].length > 37) {
            throw "<b>ERROR</b><br>Wprowadzone liczby są zbyt długie.<br>Ich wyświetlenie przeczy design'owi strony.<br>Szanujmy się.";
        }
        var commas = [];
        var numbers_orig = [];
        for (let i = 0; i < numbers.length; i++) {
            while (numbers[i][0] == "0") numbers[i] = numbers[i].replace("0", "");
            if (numbers[i] == "") numbers[i] = "0";
            if (numbers[i][0] == ',' || numbers[i][0] == '.') numbers[i] = "0" + numbers[i];
            var l = numbers[i].length;
            commas[i] = 0;
            for (var j = 0; j < l; j++) {
                if (numbers[i][j] == '.') {
                    l = l - 1
                    commas[i] = l - j;
                    break;
                }
            }
            numbers[i] = numbers[i].replace(".", ",");
            numbers_orig[i] = numbers[i];
        }

        var decmial_places_1 = 0;
        for (let i = 0; i < numbers[1].length; i++)
            if (numbers[1][i] == ',')
                decmial_places_1 = numbers[1].length - 1 - i;
        var decmial_places_0 = 0;
        for (let i = 0; i < numbers[0].length; i++)
            if (numbers[0][i] == ',')
                decmial_places_0 = numbers[0].length - 1 - i;
        var decimal_diff = decmial_places_0 - decmial_places_1;
        numbers[0] = numbers[0].replace(",", "");
        if (decimal_diff < 0)
            for (let i = 0; i < (-1) * decimal_diff; i++) numbers[0] += "0";
        else if (decimal_diff > 0)
            numbers[0] = numbers[0].slice(0, numbers[0].length - decimal_diff) + "," + numbers[0].slice(numbers[0].length - decimal_diff);
        numbers[1] = numbers[1].replace(",", "");
        var table = [];
        for (let i = 0; i < 2; i++) {
            table[i] = [];
            for (let j = 0; j < numbers[1].length + numbers[0].length + 1; j++) {
                table[i][j] = "";
            }
        }
        for (let i = 0; i < numbers.length; i++) {
            while (numbers[i][0] == "0") numbers[i] = numbers[i].replace("0", "");
            if (numbers[i] == "") numbers[i] = "0";
        }
        var k = 0;
        for (let i = 0; i < numbers.length; i++) {
            for (let j = 0; j < numbers[i].length; j++) {
                table[1][k] = numbers[i][j];
                k = k + 1;
            }
            if (i == 0) {
                table[1][k] = ":";
                k = k + 1;
            }
        }

        for (let i = 0; i < table[0].length; i++) if (table[1][i] == ',') table[0][i] = ',';
        var comment = "";
        if (decmial_places_1 > 0) {
            comment += "Przed przystapieniem do dzielenia pozbywamy się przecinka w dzielniku. Ponieważ liczba " + numbers_orig[1] + " ma " + decmial_places_1;
            if (decmial_places_1 == 1)
                comment += " cyfrę";
            else if ((decmial_places_1 % 10 == 2 || decmial_places_1 % 10 == 3 || decmial_places_1 % 10 == 4) && decmial_places_1 / 10 != 1)
                comment += " cyfry";
            else
                comment += " cyfr";
            comment += " po przecinku," +
                " przesuwamy przecinek dzielnej o " + decmial_places_1 + " w prawo. ";

        } comment += "Zapisujemy obie liczby obok siebie i rysujemy kreskę ponad nimi.";
        highlight_fields = Columnar_division.empty_highlight(table);
        this.steps.push(new Columnar_division_step(table, highlight_fields, comment));

        var highlight_fields;
        this.step = 0;
        table[0][0] = parseInt(divide(parseInt(table[1][0]), parseInt(numbers[1])));

        comment = "Analizujemy dzielną od lewej strony. Bierzemy cyfrę " + table[1][0] + " i próbujemy podzielić ją przez " + numbers[1] + ". Liczba " + numbers[1] + " mieści się "
            + table[0][0] + " raz" + (table[0][0] == '1' ? "" : "y") + " w liczbie " + table[1][0] + ", więc nad kreską zapisujemy " + table[0][0] + ".";
        highlight_fields = Columnar_division.empty_highlight(table);
        highlight_fields[1][0] = true;
        highlight_fields[0][0] = true;
        for (var h = 0; h < numbers[1].length; h++) highlight_fields[1][numbers[0].length + 1 + h] = true;
        this.steps.push(new Columnar_division_step(table, highlight_fields, comment));

        table = Columnar_division.add_empty_row(table);
        table[2][0] = parseInt(parseInt(table[0][0]) * parseInt(numbers[1]));
        table = Columnar_division.add_empty_row(table);
        table[3][0] = parseInt(parseInt(table[1][0]) - parseInt(table[2][0]));

        comment = "Mnożymy zapisane w wyniku " + table[0][0] + " przez dzielnik i otrzymujemy " + table[2][0] + ". Wykonujemy odejmowanie " + table[1][0] + "&nbsp;-&nbsp;" + table[2][0] + "&nbsp;=&nbsp;" + table[3][0] + ", wynik zapisujemy poniżej."
        highlight_fields = Columnar_division.empty_highlight(table);
        highlight_fields[1][0] = true;
        highlight_fields[2][0] = true;
        highlight_fields[3][0] = true;
        //for (var h = 0; h < numbers[1].length; h++) highlight_fields[1][numbers[0].length +1+h] = true;
        this.steps.push(new Columnar_division_step(table, highlight_fields, comment));

        let i = 1;
        var fi = i;
        var z = parseInt(table[3][0]);
        for (; fi < numbers[0].length; fi++) {
            if (numbers[0][fi] == ',') fi++;
            table[table.length - 1][i] = numbers[0][fi];
            var x = "";
            for (let j = i; j >= 0 && table[table.length - 1][j] != ""; j--) x = table[table.length - 1][j] + x;
            table[0][fi] = parseInt(divide(parseInt(x), parseInt(numbers[1])));


            comment = "Dopisujemy cyfrę " + numbers[0][fi] + " i próbujemy wykonać dzielenie " + parseInt(x) + " przez " + numbers[1] + ". Liczba " + numbers[1] + " mieści się "
                + table[0][fi] + " raz" + (table[0][fi] == '1' ? "" : "y") + " w liczbie " + parseInt(x) + ", więc nad kreską zapisujemy " + table[0][fi] + ".";
            highlight_fields = Columnar_division.empty_highlight(table);
            highlight_fields[0][fi] = true;
            highlight_fields[1][fi] = true;
            for (let j = i; j >= 0 && table[table.length - 1][j] != ""; j--) highlight_fields[table.length - 1][j] = true;
            for (let h = 0; h < numbers[1].length; h++) highlight_fields[1][numbers[0].length + 1 + h] = true;
            this.steps.push(new Columnar_division_step(table, highlight_fields, comment));

            var y = parseInt(parseInt(table[0][fi]) * parseInt(numbers[1])).toString();
            table = Columnar_division.add_empty_row(table);
            for (let j = y.length - 1; j >= 0; j--)table[table.length - 1][i - (y.length - 1 - j)] = y[j];
            z = parseInt(parseInt(x) - parseInt(y)).toString();
            table = Columnar_division.add_empty_row(table);
            for (let j = z.length - 1; j >= 0; j--)table[table.length - 1][i - (z.length - 1 - j)] = z[j];

            comment = "Mnożymy zapisane w wyniku " + table[0][fi] + " przez dzielnik i otrzymujemy " + parseInt(y) + ". Wykonujemy odejmowanie<br>" + parseInt(x) + "-" + parseInt(y) + "=" + parseInt(z) + ", wynik zapisujemy poniżej.";
            highlight_fields = Columnar_division.empty_highlight(table);
            for (let j = z.length - 1; j >= 0; j--)highlight_fields[table.length - 1][i - (z.length - 1 - j)] = true;
            for (let j = y.length - 1; j >= 0; j--)highlight_fields[table.length - 2][i - (y.length - 1 - j)] = true;
            for (let j = x.length - 1; j >= 0; j--)highlight_fields[table.length - 3][i - (x.length - 1 - j)] = true;
            //for (var h = 0; h < numbers[1].length; h++) highlight_fields[1][numbers[0].length +1+h] = true;
            this.steps.push(new Columnar_division_step(table, highlight_fields, comment));
            i++
        }
        i--;
        fi--;
        var too_long = false;
        if (parseInt(z) == 0) {
            comment = "Ponieważ w dzielnej nie ma już cyfr do spisania, a w wyniku odejmowania otrzymaliśmy 0, kończymy procedurę. Odcztujemy wynik ";
            var zeros = 1;
            var result = "";
            for (let j = 0; j < table[0].length; j++) {
                if (table[0][j] == '0' && zeros != 1)
                    result += table[0][j].toString();
                else if (table[0][j] != '0') {
                    result += table[0][j].toString();
                    zeros = 0;
                }
            }
            comment += (result[0] == ',' ? "0" : "") + result + ".";
            highlight_fields = Columnar_division.empty_highlight(table);
            this.steps.push(new Columnar_division_step(table, highlight_fields, comment));
            return
        }
        else if (!is_float) {
            comment = "Ponieważ w dzielnej nie ma już cyfr do spisania, traktujemy pozostałe " + parseInt(z) + " jako resztę z dzielenia. Odcztujemy wynik ";
            let zeros = 1;
            let result = "";
            for (let j = 0; j < table[0].length; j++) {
                if (table[0][j] == '0' && zeros != 1)
                    result += table[0][j].toString();
                else if (table[0][j] != '0') {
                    result += table[0][j].toString();
                    zeros = 0;
                }
            }
            comment += (result[0] == ',' || result == "" ? "0" : "") + result;
            comment += " r. " + z + ".";
            let j = 0;
            while (table[0][j].toString() != "" && j < table[0].length) j++;
            if (table[0][j].toString() == "") table[0][j] = "r.";
            else {
                table = Columnar_division.add_empty_column(table);
                j = table[0].length - 1;
                table[0][j] = "r.";
            }
            if (j + 1 > table[0].length - 1) {
                table = Columnar_division.add_empty_column(table);
            }
            table[0][j + 1] = z;
            highlight_fields = Columnar_division.empty_highlight(table);
            this.steps.push(new Columnar_division_step(table, highlight_fields, comment));
            return;
        }
        else if (is_float) {
            var occured = [];
            var n = z.toString();
            if (fi == i) {
                fi++;
                table[0][fi] = ",";
            }
            fi++;
            i++;
            while (occured.indexOf(n) == -1) {
                occured.push(n);
                if (fi + 1 >= table[0].length) table = Columnar_division.add_empty_column(table);
                table[table.length - 1][i] = "0";
                let x = "";
                for (let j = i; j >= 0 && table[table.length - 1][j] != ""; j--) x = table[table.length - 1][j] + x;
                table[0][fi] = parseInt(divide(parseInt(x), parseInt(numbers[1])));

                comment = "Kolejną cyfrą rozwinięcia dziesiętnego dzielnej jest 0. Dopisujemy więc 0 i próbujemy wykonać dzielenie " + parseInt(x) + " przez " + numbers[1] + ". Liczba " + numbers[1] + " mieści się "
                    + table[0][fi] + " raz" + (table[0][fi] == '1' ? "" : "y") + " w liczbie " + parseInt(x) + ", więc nad kreską zapisujemy " + table[0][fi] + ".";
                highlight_fields = Columnar_division.empty_highlight(table);
                highlight_fields[0][fi] = true;
                if (fi < numbers[0].length) highlight_fields[1][fi] = true;
                for (let j = i; j >= 0 && table[table.length - 1][j] != ""; j--) highlight_fields[table.length - 1][j] = true;
                for (let h = 0; h < numbers[1].length; h++) highlight_fields[1][numbers[0].length + 1 + h] = true;
                this.steps.push(new Columnar_division_step(table, highlight_fields, comment));

                let y = parseInt(parseInt(table[0][fi]) * parseInt(numbers[1])).toString();
                table = Columnar_division.add_empty_row(table);
                for (let j = y.length - 1; j >= 0; j--)table[table.length - 1][i - (y.length - 1 - j)] = y[j];
                z = parseInt(parseInt(x) - parseInt(y)).toString();
                table = Columnar_division.add_empty_row(table);
                for (let j = z.length - 1; j >= 0; j--)table[table.length - 1][i - (z.length - 1 - j)] = z[j];

                comment = "Mnożymy zapisane w wyniku " + table[0][fi] + " przez dzielnik i otrzymujemy " + parseInt(y) + ". Wykonujemy odejmowanie " + parseInt(x) + "&nbsp;-&nbsp;" + parseInt(y) + "&nbsp;=&nbsp;" + parseInt(z) + ", wynik zapisujemy poniżej.";
                highlight_fields = Columnar_division.empty_highlight(table);
                for (let j = z.length - 1; j >= 0; j--)highlight_fields[table.length - 1][i - (z.length - 1 - j)] = true;
                for (let j = y.length - 1; j >= 0; j--)highlight_fields[table.length - 2][i - (y.length - 1 - j)] = true;
                for (let j = x.length - 1; j >= 0; j--)highlight_fields[table.length - 3][i - (x.length - 1 - j)] = true;
                //for (var h = 0; h < numbers[1].length; h++) highlight_fields[1][numbers[0].length +1+h] = true;
                this.steps.push(new Columnar_division_step(table, highlight_fields, comment));
                var tl = table[0].length - 1;
                while (table[0][tl].toString() == "") tl--;
                tl++;
                if (tl > 27) {
                    too_long = true;
                    table = Columnar_division.add_empty_column(table);
                    table[0][tl] = "\\dots";
                    comment = "Możemy kontynuować procedurę aż do napotkania okresu rozwinięcia dziesiętnego. Rachunki mogą trwać jeszcze bardzo długo, więc zadowalamy się przybliżonym wynikiem ";
                    let zeros = 1;
                    let result = "";
                    for (let j = 0; j < table[0].length; j++) {
                        if (table[0][j] == '0' && zeros != 1)
                            result += table[0][j].toString();
                        else if (table[0][j] != '0') {
                            result += table[0][j].toString();
                            zeros = 0;
                        }

                    }
                    comment += "$" + (result[0] == ',' ? "0" : "") + result + "$.";
                    highlight_fields = Columnar_division.empty_highlight(table);
                    this.steps.push(new Columnar_division_step(table, highlight_fields, comment));
                    return;
                }
                if (parseInt(z) == 0) {

                    comment = "Ponieważ w wyniku odejmowania otrzymaliśmy 0, kończymy procedurę. Odcztujemy wynik ";
                    let zeros = 1;
                    let result = "";
                    for (let j = 0; j < table[0].length; j++) {
                        if (table[0][j] == '0' && zeros != 1)
                            result += table[0][j].toString();
                        else if (table[0][j] != '0') {
                            result += table[0][j].toString();
                            zeros = 0;
                        }
                    }
                    comment += (result[0] == ',' ? "0" : "") + result + ".";
                    highlight_fields = Columnar_division.empty_highlight(table);
                    this.steps.push(new Columnar_division_step(table, highlight_fields, comment));
                    return;
                }
                i++;
                fi++;
                n = z;
            }
            table[table.length - 1][i] = "0";
            let x = "";
            for (let j = i; j >= 0 && table[table.length - 1][j] != ""; j--) x = table[table.length - 1][j] + x;
            comment = "Po spisaniu zera otrzymujemy do podzielenia liczbę " + parseInt(x) + " - taką samą jak kilka kroków wcześniej. Wszystkie kolejne operacje przynosiłyby cyklicznie takie same wyniki - zatem wyznaczyliśmy okres. Odczytujemy wynik ";
            let zeros = 1;
            let result = "";
            for (let j = 0; j < table[0].length; j++) {
                if (table[0][j] == '0' && zeros != 1)
                    result += table[0][j].toString();
                else if (table[0][j] != '0') {
                    result += table[0][j].toString();
                    zeros = 0;
                }
            }
            var from_end = occured.length - occured.indexOf(n);
            if (from_end == 0) from_end = 1;
            result = result.slice(0, result.length - from_end) + '(' + result.slice(result.length - from_end) + ')';
            comment += (result[0] == ',' ? "0" : "") + result + ".";
            var temp = table[0][table[0].length - from_end - 1];
            table[0][table[0].length - from_end - 1] = '(';
            var temp1;
            for (let b = table[0].length - from_end; b < table[0].length; b++) {
                temp1 = table[0][b];
                table[0][b] = temp;
                temp = temp1;
            }
            table = Columnar_division.add_empty_column(table);
            table[0][table[0].length - 1] = temp;
            table = Columnar_division.add_empty_column(table);
            table[0][table[0].length - 1] = ')';
            highlight_fields = Columnar_division.empty_highlight(table);
            for (let h = 0; h < highlight_fields[highlight_fields.length - from_end * 2 - 1].length; h++)
                if (table[highlight_fields.length - from_end * 2 - 1][h].toString() != "") highlight_fields[highlight_fields.length - from_end * 2 - 1][h] = true;
            this.steps.push(new Columnar_division_step(table, highlight_fields, comment));
            return;
        }

    }
    static empty_highlight(tab) {
        var tab1 = [];
        for (var i = 0; i < tab.length; i++) {
            tab1[i] = [];
            for (let j = 0; j < tab[i].length; j++) {
                tab1[i].push(false);
            }
        }
        return tab1;
    }
    static add_empty_row(tab) {
        var tab1 = [];
        for (let i = 0; i < tab.length; i++) {
            tab1[i] = [];
            for (let j = 0; j < tab[i].length; j++) {
                tab1[i].push(tab[i][j]);
            }
        }
        tab1[tab1.length] = [];
        for (let j = 0; j < tab[0].length; j++) {
            tab1[tab1.length - 1].push("");
        }
        return tab1;
    }
    static add_empty_column(tab) {
        var tab1 = [];
        for (let i = 0; i < tab.length; i++) {
            tab1[i] = [];
            for (let j = 0; j < tab[i].length; j++) {
                tab1[i].push(tab[i][j]);
            }
            tab1[i].push("");
        }
        return tab1;
    }


}

