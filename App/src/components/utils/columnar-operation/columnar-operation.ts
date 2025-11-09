export interface ColumnarOperationStep {
    print(comment: HTMLElement, table: HTMLElement): void;
}

export abstract class ColumnarOperation {
    protected step = 0;
    protected steps: ColumnarOperationStep[] = [];
    protected abstract signs: string[];
    protected abstract generateSteps(numbers: string[], isFloat: boolean): void;

    constructor(
        protected readonly table: HTMLElement,
        protected readonly commentElement: HTMLElement,
    ) {}

    next() {
        this.step += 1;
        this.printStep(this.step);
    }
    prev() {
        this.step -= 1;
        this.printStep(this.step);
    }

    start() {
        this.step = 0;
        this.printStep(this.step);
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
        try {
            this.generateSteps(
                this.signs.reduce((acc, separator) => acc.flatMap((s) => s.split(separator)), [inputValue]),
                isFloat,
            );
        } catch (err: any) {
            this.printError(err);
            throw err;
        }
    }

    protected printStep(i: number) {
        this.steps[i].print(this.commentElement, this.table);
    }

    protected printError(msg: string | { message: string }) {
        this.commentElement.innerHTML = typeof msg === 'string' ? msg : msg.message;
        this.table.innerHTML = '';
    }

    protected validateNumber(x: string, isFloat: boolean) {
        return (isFloat ? /^[0-9]+([.,][0-9]+)?$/ : /^[0-9]+$/).test(x);
    }

    protected removeLeadingZeros(x: string) {
        x = x.replace(/^0+/, '') || '0';
        return x[0] === '.' || x[0] === ',' ? '0' + x : x;
    }
}
