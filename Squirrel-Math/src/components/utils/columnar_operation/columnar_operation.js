/**
 * Created by Creestoph on 31.10.2016.
 */
export class Columnar_operation {

    constructor(table_id, comment_id, button_right_id, button_left_id) {
        this.comment_id = comment_id;
        this.table_id = table_id;
        this.button_right_id = button_right_id;
        this.button_left_id = button_left_id;
    }

    get_operation(input_id, columnar_addition_area) {
        columnar_addition_area.style.visibility = "visible";
        columnar_addition_area.style.marginBottom = "60px";
        columnar_addition_area.style.height = "400px";
        this.table_id.style.marginTop = "60px";
        var input = input_id.value;
        if (input.indexOf("+") != -1 && input.indexOf("-") == -1 && input.indexOf("*") == -1 && input.indexOf(":") == -1 && input.indexOf("/") == -1) {
            return new Columnar_addition(this.table_id, this.comment_id, this.button_right_id, this.button_left_id);
        }
        else if (input.indexOf("+") == -1 && input.indexOf("-") != -1 && input.indexOf("*") == -1 && input.indexOf(":") == -1 && input.indexOf("/") == -1) {
            return new Columnar_subtraction(this.table_id, this.comment_id, this.button_right_id, this.button_left_id);
        }
        else if (input.indexOf("+") == -1 && input.indexOf("-") == -1 && input.indexOf("*") != -1 && input.indexOf(":") == -1 && input.indexOf("/") == -1) {
            return new Columnar_multiplication(this.table_id, this.comment_id, this.button_right_id, this.button_left_id);
        }
        else if (input.indexOf("+") == -1 && input.indexOf("-") == -1 && input.indexOf("*") == -1 && input.indexOf(":") != -1 && input.indexOf("/") == -1) {
            return new Columnar_division(this.table_id, this.comment_id, this.button_right_id, this.button_left_id);
        }
        else if (input.indexOf("+") == -1 && input.indexOf("-") == -1 && input.indexOf("*") == -1 && input.indexOf(":") == -1 && input.indexOf("/") != -1) {
            return new Columnar_division(this.table_id, this.comment_id, this.button_right_id, this.button_left_id);
        }
        else {
            this.comment_id.style.marginTop = "120px";
            this.print_error("Wpisz jedno działanie do wykonania")
        }
    }


    print_error(msg) {
        this.button_left_id.style.visibility = "hidden";
        this.button_right_id.style.visibility = "hidden";
        this.comment_id.innerHTML = msg;
        this.table_id.innerHTML = "";
    }





}
