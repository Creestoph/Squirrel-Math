/**
 * Created by Creestoph on 31.10.2016.
 */
function Columnar_operation(table_id, comment_id, button_right_id, button_left_id) {
    this.comment_id = comment_id;
    this.table_id = table_id;
    this.button_right_id = button_right_id;
    this.button_left_id = button_left_id;
}

Columnar_operation.prototype.get_operation = function (input_id,columnar_addition_area) {
    document.getElementById(columnar_addition_area).style.visibility = "visible";
    document.getElementById(columnar_addition_area).style.marginBottom = "60px";
    document.getElementById(columnar_addition_area).style.height = "400px";
    document.getElementById(columnar_addition_area).style.padding = "20px";
    document.getElementById(this.table_id).style.marginTop = "60px";
    var input = document.getElementById(input_id).value;
    if (input.indexOf("+") != -1 && input.indexOf("-") == -1 && input.indexOf("*") == -1 && input.indexOf(":") == -1 && input.indexOf("/") == -1){
        return new Columnar_addition(this.table_id,this.comment_id,this.button_right_id,this.button_left_id);
    }
    else if (input.indexOf("+") == -1 && input.indexOf("-") != -1 && input.indexOf("*") == -1 && input.indexOf(":") == -1 && input.indexOf("/") == -1){
        return new Columnar_subtraction(this.table_id,this.comment_id,this.button_right_id,this.button_left_id);
    }
    else if (input.indexOf("+") == -1 && input.indexOf("-") == -1 && input.indexOf("*") != -1 && input.indexOf(":") == -1 && input.indexOf("/") == -1){
        return new Columnar_multiplication(this.table_id,this.comment_id,this.button_right_id,this.button_left_id);
    }
    else if (input.indexOf("+") == -1 && input.indexOf("-") == -1 && input.indexOf("*") == -1 && input.indexOf(":") != -1 && input.indexOf("/") == -1){
        return new Columnar_division(this.table_id,this.comment_id,this.button_right_id,this.button_left_id);
    }
    else if (input.indexOf("+") == -1 && input.indexOf("-") == -1 && input.indexOf("*") == -1 && input.indexOf(":") == -1 && input.indexOf("/") != -1){
        return new Columnar_division(this.table_id,this.comment_id,this.button_right_id,this.button_left_id);
    }
    else{
        document.getElementById(this.comment_id).style.marginTop = "120px";
        this.print_error("Wpisz jedno działanie do wykonania")
    }
}


Columnar_operation.prototype.print_error = function (msg) {
    document.getElementById(this.button_left_id).style.visibility = "hidden";
    document.getElementById(this.button_right_id).style.visibility = "hidden";
    document.getElementById(this.comment_id).innerHTML = msg;
    document.getElementById(this.table_id).innerHTML = "";
}




