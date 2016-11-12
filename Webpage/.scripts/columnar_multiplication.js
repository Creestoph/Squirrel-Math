/**
 * Created by InvincibleWombat on 11.11.2016.
 */

function Columnar_multiplication_step(table, highlight_fields, comment, carry, mul_underline, sum_underline) {
    var tab = [];
    for (var i = 0; i < table.length; i++) {
        tab[i] = [];
        if (i == mul_underline) {
            tab[i].push("/u:·");
            tab[i].push("/u:");
        }
        else if (i == sum_underline) {
            tab[i].push("/u:+");
            tab[i].push("/u:");
        }
        else {
            tab[i].push("");
            tab[i].push("");
        }
        for (var j = 0; j < table[i].length; j++) {
            var t = ":" + table[i][j];
            if (highlight_fields[i][j]) t = "/h" + t;
            if (i == mul_underline || i == sum_underline) t = "/u" + t;
            tab[i].push(t[0] == ':' ? t.replace(/:/g, "") : t)
        }
    }
    this.table = Display_table.create_custom(tab);
    this.comment = comment;
    this.carry = carry;
}

Columnar_multiplication_step.prototype.print = function (coment_target_id, table_target_id, carry_target_id) {
    document.getElementById(coment_target_id).innerHTML = this.comment;
    //document.getElementById(carry_target_id).innerHTML = this.carry;
    this.table.print(table_target_id);
}


function Columnar_multiplication(table_id, comment_id, button_right_id, button_left_id) {
    this.comment_id = comment_id;
    this.table_id = table_id;
    this.button_right_id = button_right_id;
    this.button_left_id = button_left_id;
}

Columnar_multiplication.prototype.generate_from_input = function (input_id, columnar_multiplication_area) {
    document.getElementById(columnar_multiplication_area).style.visibility = "visible";
    document.getElementById(columnar_multiplication_area).style.marginBottom = "60px";
    document.getElementById(columnar_multiplication_area).style.height = "400px";
    document.getElementById(columnar_multiplication_area).style.padding = "20px";
    document.getElementById(this.table_id).style.marginTop = "60px";
    document.getElementById(this.button_left_id).childNodes[0].nextSibling.setAttribute("height", "60px");
    document.getElementById(this.button_right_id).childNodes[0].nextSibling.setAttribute("height", "60px");
    var input = document.getElementById(input_id).value;
    input = input.replace(/ /g, "");
    input = input.replace(/,/g, ".");
    try {
        this.generate_steps(input.split("*"));
        document.getElementById(this.comment_id).style.marginTop = "60px";
        return true;
    }
    catch (err) {
        document.getElementById(this.comment_id).style.marginTop = "120px";
        this.print_error(err);
        return false;
    }
}

Columnar_multiplication.prototype.next = function () {
    this.step += 1;
    this.print_step(this.step)
}
Columnar_multiplication.prototype.prev = function () {
    this.step -= 1;
    this.print_step(this.step)
}

Columnar_multiplication.prototype.print_step = function (i) {
    document.getElementById(this.button_right_id).style.visibility = "visible";
    document.getElementById(this.button_left_id).style.visibility = "visible";
    if (this.step == 0) {
        document.getElementById(this.button_left_id).style.visibility = "hidden";
    }
    else if (this.step == this.steps.length - 1) {
        document.getElementById(this.button_right_id).style.visibility = "hidden";
    }
    this.steps[i].print(this.comment_id, this.table_id);
}

Columnar_multiplication.prototype.print_error = function (msg) {
    document.getElementById(this.button_left_id).style.visibility = "hidden";
    document.getElementById(this.button_right_id).style.visibility = "hidden";
    document.getElementById(this.comment_id).innerHTML = msg;
    document.getElementById(this.table_id).innerHTML = "";
}

Columnar_multiplication.prototype.generate_steps = function (numbers) {
    this.steps = [];
    if (numbers.length != 2) {
        throw "Wpisz dwie liczby do pomnożenia <br>np. 1234*73";
    }
    for (var i = 0; i < numbers.length; i++) {
        if (!validate_float(numbers[i])) {
            throw "Wpisz dwie liczby do pomnożenia <br>np. 1234*73";
        }
    }
    if (numbers[0].length + numbers[1].length > 39 || numbers[1].length > 10) {
        throw "<b>ERROR</b><br>Wprowadzone liczby są zbyt długie.<br>Ich wyświetlenie przeczy design'owi strony.<br>Szanujmy się.";
    }
    var longest = 0;
    var commas = [];
    var numbers_orig = [];
    for (var i = 0; i < numbers.length; i++) {
        while (numbers[i][0] == "0") numbers[i] = numbers[i].replace("0", "");
        if (numbers[i] == "") numbers[i] = "0";
        var l = numbers[i].length;
        commas[i] = 0;
        for (var j = 0; j < l; j++) {
            if (numbers[i][j] == '.') {
                l = l - 1
                commas[i] = l - j;
                break;
            }
        }
        if (l > longest) longest = l;
        numbers_orig[i] = numbers[i];
        numbers[i] = numbers[i].replace(".", "");
    }


    var table = [];
    for (var i = 0; i < numbers.length; i++) {
        table[i] = [];
        for (var j = 0; j < longest; j++) {
            table[i][j] = "";
        }
    }
    for (var i = 0; i < numbers.length; i++) {
        var l = numbers[i].length;
        for (var k = 0; k < numbers[i].length; k++) {
            table[i][longest - numbers[i].length + k] = numbers[i][k];
        }
    }

    var highlight_fields = [];
    for (var i = 0; i < table.length; i++) {
        highlight_fields[i] = [];
        for (var j = 0; j < table[0].length; j++) {
            highlight_fields[i][j] = false;
        }
    }

    this.step = 0;
    var comment;
    var carry = 0;
    var mul;
    comment = "Zapisujemy obie liczby jedna pod drugą z wyrównaniem do prawej i podkreślamy.";
    if (commas[0] + commas[1] > 0)
        comment += " Chwilowo zaniedbujemy przecinki.";
    this.steps.push(new Columnar_multiplication_step(table, highlight_fields, comment, carry, 1, -1));
    for (var i = numbers[1].length - 1; i >= 0; i--) {
        var t;
        var ci = numbers[1].length - 1 - i;
        comment = "Przystępujemy do mnożenia liczby " + numbers[0] + " przez " + numbers[1][i] + ".";
        highlight_fields = Columnar_multiplication.empty_highlight(table);
        for (var k = 0; k < numbers[0].length; k++)
            highlight_fields[0][table[0].length - 1 - k] = true;
        highlight_fields[1][table[1].length - 1 - ci] = true;
        this.steps.push(new Columnar_multiplication_step(table, highlight_fields, comment, carry, 1, -1));
        for (var j = numbers[0].length - 1; j >= 0; j--) {
            var cj = numbers[0].length - 1 - j;
            mul = parseInt(numbers[1][i]) * parseInt(numbers[0][j]) + carry;
            comment = "Mnożymy cyfry " + numbers[1][i] + " i " + numbers[0][j];
            if (carry > 0) comment += ", dodajemy zapamiętane " + carry;
            comment += " i otrzymujemy " + mul + ".";
            carry = parseInt(mul / 10);
            t = table[0].length - 1 - (ci + cj);
            while (t < 0) {
                table = Columnar_multiplication.add_first_column(table);
                t = table[0].length - 1 - (ci + cj);
            }
            if (typeof table[2 + ci] == 'undefined') {
                table[2 + ci] = [];
                for (var k = 0; k < table[0].length; k++)
                    table[2 + ci].push("");
            }
            table[2 + ci][t] = mul % 10;
            if (carry > 0) comment += " Ponieważ wynik jest dwucyfrowy, rozbijamy go na " + carry + " i " + mul % 10 +
                ". Cyfrę " + mul % 10 + " zapisujemy pod kreską";
            else comment += " Wynik zapisujemy pod kreską";
            if (cj == 0) {
                if (ci == 1)
                    comment += " z pojedynczym wcięciem";
                if (ci == 2)
                    comment += " z podwójnym wcięciem";
                if (ci == 3)
                    comment += " z potrójnym wcięciem";
                if (ci > 3)
                    comment += " z odpowiednim wcięciem";
            }
            if (carry > 0) comment += ", a " + carry + " zapamiętujemy.";
            else comment += ".";
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
                table[2 + (numbers[1].length - 1 - i)][t] = carry;
            }
            else
                table[2 + (numbers[1].length - 1 - i)][t - 1] = carry;
            carry = 0;
            highlight_fields = Columnar_multiplication.empty_highlight(table);
            this.steps.push(new Columnar_multiplication_step(table, highlight_fields, comment, carry, 1, -1));
        }

    }
    var sum_underline = table.length - 1;

    var w = "";
    var sum = 0;
    var carry = 0;
    for (var i = table[0].length - 1; i >= 0; i--) {
        var sum = carry;
        for (var j = 2; j < table.length; j++) {
            sum = parseInt(sum) + parseInt(table[j][i] == "" ? "0" : table[j][i]);
        }
        w = w + (sum % 10).toString();
        carry = parseInt(sum / 10);
    }
    if (carry > 0) {
        w = w + carry.toString();
        table = Columnar_multiplication.add_first_column(table);
    }

    comment = "Otrzymane liczby podkreślamy i wykonujemy ich dodawanie pisemne.";
    highlight_fields = Columnar_multiplication.empty_highlight(table);
    this.steps.push(new Columnar_multiplication_step(table, highlight_fields, comment, carry, 1, sum_underline));

    table[table.length] = [];
    for (var k = 0; k < table[0].length; k++)
        table[table.length - 1].push("");
    for (var i = 0; i < w.length; i++) {
        table[table.length - 1][table[0].length - 1 - i] = w[i];
    }

    w = w.split("").reverse().join("");
    if (commas[0] + commas[1] == 0)
        comment = "Odczytujemy wynik: " + w;
    else {
        var c = commas[0] + commas[1];
        comment = "Odczytujemy liczbę " + w + ". Ponieważ "
            + numbers_orig[0].replace(".", ",") + " ma " + commas[0] +
            " cyfr po przecinku, a "
            + numbers_orig[1].replace(".", ",") + " ma " + commas[1] +
            " cyfr po przecinku, to wynik musi mieć " + c + " cyfr po przecinku.";
        w = w.substring(0, w.length - c) + "," + w.substring(w.length - c);
        comment += " Ostatecznie otrzymujemy " + w + ".";
    }

    highlight_fields = Columnar_multiplication.empty_highlight(table);
    this.steps.push(new Columnar_multiplication_step(table, highlight_fields, comment, carry, 1, sum_underline));
}

Columnar_multiplication.add_first_column = function (tab) {
    var tab1 = [];
    for (var i = 0; i < tab.length; i++) {
        tab1[i] = [];
        tab1[i].push("");
        for (var j = 0; j < tab[i].length; j++) {
            tab1[i].push(tab[i][j]);
        }
    }
    return tab1;
}
Columnar_multiplication.empty_highlight = function (tab) {
    var tab1 = [];
    for (var i = 0; i < tab.length; i++) {
        tab1[i] = [];
        for (var j = 0; j < tab[i].length; j++) {
            tab1[i].push(false);
        }
    }
    return tab1;
}

