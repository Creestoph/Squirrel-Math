export interface ColumnarOperationStep {
    print(table: HTMLElement): string;
}

export abstract class ColumnarOperation {
    protected step = 0;
    protected steps: ColumnarOperationStep[] = [];
    protected abstract signs: string[];
    protected abstract generateSteps(numbers: string[], isFloat: boolean): void;

    constructor(protected readonly table: HTMLElement) {}

    next(): string {
        this.step += 1;
        return this.printStep(this.step);
    }
    prev(): string {
        this.step -= 1;
        return this.printStep(this.step);
    }

    start(): string {
        this.step = 0;
        return this.printStep(this.step);
    }

    hasNext(): boolean {
        return this.step < this.steps.length - 1;
    }

    hasPrev(): boolean {
        return this.step > 0;
    }

    generateFromInput(inputValue: string, isFloat = true): void {
        inputValue = inputValue.replace(/ /g, '');
        inputValue = inputValue.replace(/,/g, '.');
        this.generateSteps(
            this.signs.reduce((acc, separator) => acc.flatMap((s) => s.split(separator)), [inputValue]),
            isFloat,
        );
    }

    protected printStep(i: number): string {
        return this.steps[i].print(this.table);
    }

    protected validateNumber(x: string, isFloat: boolean) {
        return (isFloat ? /^[0-9]+([.,][0-9]+)?$/ : /^[0-9]+$/).test(x);
    }

    protected removeLeadingZeros(x: string) {
        x = x.replace(/^0+/, '') || '0';
        return x[0] === '.' || x[0] === ',' ? '0' + x : x;
    }
}
