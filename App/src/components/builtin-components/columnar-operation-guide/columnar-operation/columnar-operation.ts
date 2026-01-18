import { DisplayTable } from './display-table';

export interface ColumnarOperationStep {
    comment: string;
    table?: DisplayTable;
    showZeroDivisionError?: boolean;
}

export abstract class ColumnarOperation {
    protected steps: ColumnarOperationStep[] = [];
    protected abstract signs: string[];
    protected abstract generateSteps(numbers: string[], isFloat: boolean): ColumnarOperationStep[];

    generateFromInput(inputValue: string, isFloat = true): ColumnarOperationStep[] {
        inputValue = inputValue.replace(/ /g, '');
        inputValue = inputValue.replace(/,/g, '.');
        return this.generateSteps(
            this.signs.reduce((acc, separator) => acc.flatMap((s) => s.split(separator)), [inputValue]),
            isFloat,
        );
    }

    protected validateNumber(x: string, isFloat: boolean) {
        return (isFloat ? /^[0-9]+([.,][0-9]+)?$/ : /^[0-9]+$/).test(x);
    }

    protected removeLeadingZeros(x: string) {
        x = x.replace(/^0+/, '') || '0';
        return x[0] === '.' || x[0] === ',' ? '0' + x : x;
    }
}
