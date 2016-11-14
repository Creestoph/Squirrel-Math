/**
 * Created by InvincibleWombat on 11.11.2016.
 */

function Columnar_division_step(table, highlight_fields, comment) {
    var tab = [];
    var underline = true;
    for (var i = 0; i < table.length; i++) {
        tab[i] = [];
        if (i % 2 == 0 && i > 0) tab[i].push("/u:-");
        else tab[i].push("");
        for (var j = 0; j < table[i].length; j++) {
            var t = ":" + table[i][j];
            if (highlight_fields[i][j]) t = "/h" + t;
            if (i % 2 == 0) {
                if (i == 0) {
                    if (table[i + 1][j] == ":") underline = false;
                    if (table[i][j] != "" || underline) t = "/u" + t;
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
    document.getElementById(coment_target_id).innerHTML = this.comment;
    this.table.print(table_target_id);
}


function Columnar_division(table_id, comment_id, button_right_id, button_left_id) {
    this.comment_id = comment_id;
    this.table_id = table_id;
    this.button_right_id = button_right_id;
    this.button_left_id = button_left_id;
}

Columnar_division.prototype.generate_from_input = function (input_id, columnar_multiplication_area) {
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
        this.generate_steps(input.replace(/:/g, "/").split("/"));
        document.getElementById(this.comment_id).style.marginTop = "60px";
        return true;
    }
    catch (err) {
        document.getElementById(this.comment_id).style.marginTop = "120px";
        this.print_error(err);
        return false;
    }
}

Columnar_division.prototype.next = function () {
    this.step += 1;
    this.print_step(this.step)
}
Columnar_division.prototype.prev = function () {
    this.step -= 1;
    this.print_step(this.step)
}

Columnar_division.prototype.print_step = function (i) {
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

Columnar_division.prototype.print_error = function (msg) {
    document.getElementById(this.button_left_id).style.visibility = "hidden";
    document.getElementById(this.button_right_id).style.visibility = "hidden";
    document.getElementById(this.comment_id).innerHTML = msg;
    document.getElementById(this.table_id).innerHTML = "";
}

Columnar_division.prototype.generate_steps = function (numbers) {
    this.steps = [];
    if (numbers.length != 2) {
        throw "Wpisz dwie liczby do podzielenia <br>np. 1234/73 lub 1234:73";
    }
    for (var i = 0; i < numbers.length; i++) {
        if (!validate_float(numbers[i])) {
            throw "Wpisz dwie liczby do podzielenia <br>np. 1234/73 lub 1234:73";
        }
    }
    // if (numbers[0].length + numbers[1].length > 39 || numbers[1].length > 10) {
    //     throw "<b>ERROR</b><br>Wprowadzone liczby są zbyt długie.<br>Ich wyświetlenie przeczy design'owi strony.<br>Szanujmy się.";
    // }
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
        numbers_orig[i] = numbers[i];
        numbers[i] = numbers[i].replace(".", "");
    }

    var table = [];
    for (var i = 0; i < 3; i++) {
        table[i] = [];
        for (var j = 0; j < numbers[1].length + numbers[0].length + 1; j++) {
            table[i][j] = "";
        }
    }
    var k = 0;
    for (var i = 0; i < numbers.length; i++) {
        for (var j = 0; j < numbers[i].length; j++) {
            table[1][k] = numbers[i][j];
            k = k + 1;
        }
        if (i == 0) {
            table[1][k] = ":";
            k = k + 1;
        }
    }

    var highlight_fields;
    this.step = 0;
    var comment = "";
    highlight_fields = Columnar_division.empty_highlight(table);
    this.steps.push(new Columnar_division_step(table, highlight_fields, comment));
    table[0][0] = parseInt(parseInt(table[1][0]) / parseInt(numbers[1]));
    table[2][0] = parseInt(parseInt(table[0][0]) * parseInt(numbers[1]));
    table = Columnar_division.add_empty_row(table);
    table[3][0] = parseInt(parseInt(table[1][0]) - parseInt(table[2][0]));
    var i = 1;
    for (; i < numbers[0].length; i++) {
        table[table.length - 1][i] = numbers[0][i];
        var x = "";
        for (var j = i; j >= 0 && table[table.length - 1][j] != ""; j--) x = table[table.length - 1][j] + x;
        table[0][i] = parseInt(parseInt(x) / parseInt(numbers[1]));
        var y = parseInt(parseInt(table[0][i]) * parseInt(numbers[1])).toString();
        table = Columnar_division.add_empty_row(table);
        for (var j = y.length - 1; j >= 0; j--)table[table.length - 1][i - (y.length - 1 - j)] = y[j];
        var z = parseInt(parseInt(x) - parseInt(y)).toString();
        table = Columnar_division.add_empty_row(table);
        for (var j = z.length - 1; j >= 0; j--)table[table.length - 1][i - (z.length - 1 - j)] = z[j];
        highlight_fields = Columnar_division.empty_highlight(table);
        this.steps.push(new Columnar_division_step(table, highlight_fields, comment));
    }
    i--;
    if (table[table.length-1][i] != "0"){
        var occured = [];
        occured.push(table[table.length-1][i]);
        var n = "0";
        i = i + 1;
        table[0][i] = ",";
        while (occured.indexOf(n) == -1){
            occured.push(n);
            if (i >= table[0].length) table = Columnar_division.add_empty_column(table);
            table[table.length - 1][i] = "0";
            var x = "";
            for (var j = i; j >= 0 && table[table.length - 1][j] != ""; j--) x = table[table.length - 1][j] + x;
            table[0][i+1] = parseInt(parseInt(x) / parseInt(numbers[1]));
            var y = parseInt(parseInt(table[0][i+1]) * parseInt(numbers[1])).toString();
            table = Columnar_division.add_empty_row(table);
            for (var j = y.length - 1; j >= 0; j--)table[table.length - 1][i - (y.length - 1 - j)] = y[j];
            var z = parseInt(parseInt(x) - parseInt(y)).toString();
            table = Columnar_division.add_empty_row(table);
            for (var j = z.length - 1; j >= 0; j--)table[table.length - 1][i - (z.length - 1 - j)] = z[j];
            highlight_fields = Columnar_division.empty_highlight(table);
            this.steps.push(new Columnar_division_step(table, highlight_fields, comment));
            i++;
            n = z;
        }
    }
}
Columnar_division.empty_highlight = function (tab) {
    var tab1 = [];
    for (var i = 0; i < tab.length; i++) {
        tab1[i] = [];
        for (var j = 0; j < tab[i].length; j++) {
            tab1[i].push(false);
        }
    }
    return tab1;
}
Columnar_division.add_empty_row = function (tab) {
    var tab1 = [];
    for (var i = 0; i < tab.length; i++) {
        tab1[i] = [];
        for (var j = 0; j < tab[i].length; j++) {
            tab1[i].push(tab[i][j]);
        }
    }
    tab1[tab1.length] = [];
    for (var j = 0; j < tab[0].length; j++) {
        tab1[tab1.length - 1].push("");
    }
    return tab1;
}
Columnar_division.add_empty_column = function (tab) {
    var tab1 = [];
    for (var i = 0; i < tab.length; i++) {
        tab1[i] = [];
        for (var j = 0; j < tab[i].length; j++) {
            tab1[i].push(tab[i][j]);
        }
        tab1[i].push("");
    }
    return tab1;
}

