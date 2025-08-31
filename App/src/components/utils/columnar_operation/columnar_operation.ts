import { Columnar_addition } from './columnar_addition';
import { Columnar_subtraction } from './columnar_subtraction';
import { Columnar_division } from './columnar_division';
import { Columnar_multiplication } from './columnar_multiplication';

export class Columnar_operation {
    constructor(
        private readonly table_id: HTMLElement,
        private readonly comment_id: HTMLElement,
        private readonly button_right_id: HTMLElement,
        private readonly button_left_id: HTMLElement,
    ) {}

    get_operation(input_id: HTMLInputElement) {
        const input = input_id.value;
        if (
            input.indexOf('+') != -1 &&
            input.indexOf('-') == -1 &&
            input.indexOf('*') == -1 &&
            input.indexOf(':') == -1 &&
            input.indexOf('/') == -1
        ) {
            return new Columnar_addition(this.table_id, this.comment_id, this.button_right_id, this.button_left_id);
        } else if (
            input.indexOf('+') == -1 &&
            input.indexOf('-') != -1 &&
            input.indexOf('*') == -1 &&
            input.indexOf(':') == -1 &&
            input.indexOf('/') == -1
        ) {
            return new Columnar_subtraction(this.table_id, this.comment_id, this.button_right_id, this.button_left_id);
        } else if (
            input.indexOf('+') == -1 &&
            input.indexOf('-') == -1 &&
            input.indexOf('*') != -1 &&
            input.indexOf(':') == -1 &&
            input.indexOf('/') == -1
        ) {
            return new Columnar_multiplication(
                this.table_id,
                this.comment_id,
                this.button_right_id,
                this.button_left_id,
            );
        } else if (
            input.indexOf('+') == -1 &&
            input.indexOf('-') == -1 &&
            input.indexOf('*') == -1 &&
            input.indexOf(':') != -1 &&
            input.indexOf('/') == -1
        ) {
            return new Columnar_division(this.table_id, this.comment_id, this.button_right_id, this.button_left_id);
        } else if (
            input.indexOf('+') == -1 &&
            input.indexOf('-') == -1 &&
            input.indexOf('*') == -1 &&
            input.indexOf(':') == -1 &&
            input.indexOf('/') != -1
        ) {
            return new Columnar_division(this.table_id, this.comment_id, this.button_right_id, this.button_left_id);
        } else {
            this.comment_id.style.marginTop = '120px';
            this.print_error('Wpisz jedno działanie do wykonania');
        }
    }

    private print_error(msg: string) {
        this.button_left_id.style.visibility = 'hidden';
        this.button_right_id.style.visibility = 'hidden';
        this.comment_id.innerHTML = msg;
        this.table_id.innerHTML = '';
    }
}
