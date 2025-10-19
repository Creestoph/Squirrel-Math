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
        protected readonly buttonLeft: HTMLElement,
        protected readonly buttonRight: HTMLElement,
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

    generateFromInput(input: HTMLInputElement, mainArea: HTMLDivElement, isFloat = true): void {
        mainArea.style.visibility = 'visible';
        mainArea.style.marginBottom = '60px';
        mainArea.style.height = 'auto';
        this.table.style.marginTop = '60px';
        (mainArea.childNodes[0] as HTMLElement).style.minHeight = '400px';
        (this.buttonLeft.childNodes[0] as HTMLElement).setAttribute('height', '60px');
        (this.buttonRight.childNodes[0] as HTMLElement).setAttribute('height', '60px');
        let inputValue = input.value;
        inputValue = inputValue.replace(/ /g, '');
        inputValue = inputValue.replace(/,/g, '.');
        try {
            this.generateSteps(
                this.signs.reduce((acc, separator) => acc.flatMap((s) => s.split(separator)), [inputValue]),
                isFloat,
            );
            this.commentElement.style.marginTop = '60px';
        } catch (err: any) {
            this.commentElement.style.marginTop = '120px';
            this.printError(err);
            throw err;
        }
    }

    protected printStep(i: number) {
        this.buttonRight.style.visibility = this.step == this.steps.length - 1 ? 'hidden' : 'visible';
        this.buttonLeft.style.visibility = this.step == 0 ? 'hidden' : 'visible';
        this.steps[i].print(this.commentElement, this.table);
    }

    protected printError(msg: string | { message: string }) {
        this.buttonLeft.style.visibility = 'hidden';
        this.buttonRight.style.visibility = 'hidden';
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
