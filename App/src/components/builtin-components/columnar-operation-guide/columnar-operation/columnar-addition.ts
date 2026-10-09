import { ColumnarOperation, ColumnarOperationStep } from './columnar-operation';
import { DisplayTable, DisplayTableCell } from '../../../../utils/display-table';

export class ColumnarAddition extends ColumnarOperation {
    protected steps: ColumnarOperationStep[] = [];
    protected signs = ['+'];

    private carry: string[] = [];
    private numbers: string[][] = [];
    private result: string[] = [];
    private commaIndex: number = 0;

    protected generateSteps(numbers: string[], isFloat = true) {
        this.steps = [];

        if (numbers.length == 1 || numbers.some((n) => !this.validateNumber(n, isFloat))) {
            throw isFloat
                ? 'Wpisz liczby do dodania <br>np. <code>1234+73</code>'
                : 'Wpisz liczby naturalne do dodania <br>np. <code>1234+73</code>';
        }

        if (numbers.length > 10) {
            throw '<b>ERROR</b><br>Ani ty, ani ja nie potrzebujemy aż tylu liczb.';
        }

        numbers = numbers.map((n) => this.removeLeadingZeros(n));
        const stats = numbers.map((n) => this.digitsCount(n));
        const longestBeforeComma = Math.max(...stats.map((s) => s.beforeComma));
        const longestAfterComma = Math.max(...stats.map((s) => s.afterComma));
        const totalSize = longestBeforeComma + longestAfterComma;
        this.commaIndex = longestAfterComma > 0 ? longestBeforeComma : -1;

        if ((longestAfterComma != 0 && totalSize > 38) || (longestAfterComma == 0 && totalSize > 39)) {
            throw '<b>ERROR</b><br>Wprowadzone liczby są zbyt długie.<br>Nawet się nie zmieszczą na tej stronie.<br>Szanujmy się.';
        }

        // organizing digits
        this.carry = this.emptyArr(totalSize);
        this.numbers = numbers.map((num, i) => {
            const n = num.replace('.', '');
            return this.emptyArr(totalSize).toSpliced(longestBeforeComma - stats[i].beforeComma, n.length, ...n);
        });
        this.result = this.emptyArr(totalSize);

        this.addStep(
            `Zapisujemy ${numbers.length == 2 ? 'obie' : 'wszystkie'} liczby jedna pod drugą z wyrównaniem do ` +
                `${longestAfterComma == 0 ? 'prawej' : 'przecinka'} i podkreślamy.`,
        );

        // main loop
        for (let currentColumn = totalSize - 1; currentColumn >= 0; currentColumn--) {
            const digits = [this.carry, ...this.numbers].map((row) => row[currentColumn]).filter((v) => v !== '');
            const sum = digits.reduce((s, d) => s + parseInt(d), 0);
            const carry = Math.floor(sum / 10);
            const result = sum % 10;

            if (carry > 0) {
                this.carry[currentColumn - 1] = `${carry}`;
            }
            this.result[currentColumn] = `${result}`;

            let comment = currentColumn == totalSize - 1 ? 'Analizujemy słupek od prawej strony. ' : '';
            if (digits.length == 1) {
                comment += `Cyfra $${digits[0]}$ jest samotna, więc przepisujemy ją bez zmian.`;
            } else {
                comment +=
                    'Dodajemy cyfry ' +
                    (digits.length === 2
                        ? `$${digits[0]}$ i $${digits[1]}$, `
                        : `${digits.map((d) => `$${d}$`).join(', ')} i `) +
                    ` otrzymujemy $${sum}$. ` +
                    (carry === 0
                        ? 'Wynik zapisujemy pod kreską.'
                        : `Ponieważ wynik jest dwucyfrowy, rozbijamy go na $${carry}$ i $${result}$. Cyfrę $${result}$ zapisujemy pod kreską, a ` +
                          `$${carry}$ przenosimy do następnej kolumny.`);
            }

            this.addStep(comment, currentColumn);
        }

        // result
        return this.addStep(`Odczytujemy wynik: $${this.readValue(this.result, this.commaIndex)}$.`);
    }

    private addStep(comment: string, column: number = -1): ColumnarOperationStep[] {
        const [carry, result, ...numbers] = [this.carry, this.result, ...this.numbers].map((row) =>
            row.map((r, i) => new DisplayTableCell(r, i === column ? ['h'] : [])),
        );
        if (this.commaIndex !== -1) {
            carry.splice(this.commaIndex, 0, new DisplayTableCell());
            numbers.forEach((n) =>
                n.splice(this.commaIndex, 0, new DisplayTableCell(n[this.commaIndex].value !== '' ? ',' : '')),
            );
            result.splice(this.commaIndex, 0, new DisplayTableCell(','));
        }
        [carry, ...numbers, result].forEach((row) => row.unshift(new DisplayTableCell(), new DisplayTableCell()));
        numbers.at(-1)![0].value = '+';
        carry.forEach((n) => n.styleIds.push('c'));
        numbers.at(-1)!.forEach((n) => n.styleIds.push('u'));

        this.steps.push({
            comment,
            table: new DisplayTable([carry, ...numbers, result]),
        });
        return this.steps;
    }
}
