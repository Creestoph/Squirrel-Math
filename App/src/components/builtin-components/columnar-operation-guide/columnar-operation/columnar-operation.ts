import { DisplayTable } from '../../../../utils/display-table';

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

    protected validateNumber(x: string, isFloat: boolean): boolean {
        return (isFloat ? /^[0-9]+([.,][0-9]+)?$/ : /^[0-9]+$/).test(x);
    }

    protected removeLeadingZeros(x: string): string {
        x = x.replace(/^0+/, '') || '0';
        return x[0] === '.' || x[0] === ',' ? '0' + x : x;
    }

    protected digitsCount(x: string) {
        const [a, b = ''] = x.split('.');
        return {
            beforeComma: a.length,
            afterComma: b.length,
        };
    }

    protected emptyArr<T = string>(size: number, fill: T = '' as T): T[] {
        return Array(size).fill(fill);
    }

    protected readValue(row: (number | string | null)[], insertCommaIndex = -1): string {
        return this.removeLeadingZeros(
            row
                .map((r) => `${r ?? ''}`)
                .toSpliced(insertCommaIndex, 0, insertCommaIndex > 0 ? ',' : '')
                .join(''),
        );
    }
}
