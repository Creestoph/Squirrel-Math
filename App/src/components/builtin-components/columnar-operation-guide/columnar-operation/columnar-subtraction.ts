import { ColumnarOperation, ColumnarOperationStep } from './columnar-operation';
import { DisplayTable, DisplayTableCell } from '../../../../utils/display-table';

export class ColumnarSubtraction extends ColumnarOperation {
    protected steps: ColumnarOperationStep[] = [];
    protected signs = ['-'];

    private minuend: (number | null)[][] = [];
    private subtrahend: (number | null)[] = [];
    private result: (number | null)[] = [];
    private commaIndex: number = 0;

    protected generateSteps(numbers: string[], isFloat = true) {
        this.steps = [];

        if (numbers.length != 2 || numbers.some((n) => !this.validateNumber(n, isFloat))) {
            throw isFloat
                ? 'Wpisz dwie liczby do odjęcia <br>np. <code>1234-73</code>'
                : 'Wpisz dwie naturalne liczby do odjęcia <br>np. <code>1234-73</code>';
        }

        if (parseFloat(numbers[0]) - parseFloat(numbers[1]) < 0) {
            throw 'Odjemnik jest większy niż odjemna...';
        }

        numbers = numbers.map((n) => this.removeLeadingZeros(n));
        const stats = numbers.map((n) => this.digitsCount(n));
        const longestBeforeComma = Math.max(...stats.map((s) => s.beforeComma));
        const longestAfterComma = Math.max(...stats.map((s) => s.afterComma));
        const totalSize = longestBeforeComma + longestAfterComma;
        this.commaIndex = longestAfterComma > 0 ? longestBeforeComma : -1;

        if ((longestAfterComma != 0 && totalSize > 38) || (longestAfterComma == 0 && totalSize > 39)) {
            throw '<b>ERROR</b><br>Wprowadzone liczby są zbyt długie.<br>Nawet się nie zmieszczą na tej stronie.<br>To nie przystoi.';
        }

        // organizing digits
        const [min, sub] = numbers.map((num, i) => {
            const n = num.replace('.', '');
            return this.emptyArr(totalSize).toSpliced(longestBeforeComma - stats[i].beforeComma, n.length, ...n);
        });
        this.minuend = min.map((m) => [m === '' ? null : parseInt(m)]);
        this.subtrahend = sub.map((m) => (m === '' ? null : parseInt(m)));
        this.result = this.emptyArr(totalSize, null);

        this.addStep(
            `Zapisujemy obie liczby jedna pod drugą z wyrównaniem do ${longestAfterComma == 0 ? 'prawej' : 'przecinka'} i podkreślamy.`,
        );

        if (stats[0].afterComma < longestAfterComma) {
            for (let i = this.minuend.length - longestAfterComma + stats[0].afterComma; i < this.minuend.length; i++) {
                this.minuend[i] = [0];
            }
            this.addStep('Wypełniamy puste miejsca po przecinku odjemnej zerami.');
        }

        // main loop
        for (let currentColumn = totalSize - 1; currentColumn >= 0; currentColumn--) {
            let minuend = this.minuend[currentColumn].at(-1)!;
            const subtrahend = this.subtrahend[currentColumn];

            if (subtrahend === null) {
                this.result[currentColumn] = minuend;
                this.addStep(`Cyfra $${minuend}$ jest samotna, więc przepisujemy ją bez zmian.`, currentColumn);
                continue;
            }

            let diff = minuend - subtrahend!;
            if (diff < 0) {
                let borrowColumn = currentColumn - 1;
                let borrowBefore, borrowAfter;
                for (; borrowColumn >= 0; borrowColumn--) {
                    borrowBefore = this.minuend[borrowColumn].at(-1)!;
                    borrowAfter = (borrowBefore + 9) % 10;
                    this.minuend[borrowColumn].push(borrowAfter);
                    if (borrowBefore > 0) {
                        break;
                    }
                }

                const oldMinuend = minuend;
                minuend += 10;
                diff += 10;
                this.minuend[currentColumn].push(minuend);

                this.addStep(
                    borrowColumn == currentColumn - 1
                        ? `Chcemy odjąć cyfry $${oldMinuend}$ i $${subtrahend}$. Napotykamy trudności, więc musimy wykonać zapożyczenie. Cyfrę ` +
                              `$${oldMinuend}$ zwiększamy do $${minuend}$ kosztem cyfry bezpośrednio po lewej, którą zmiejszamy do ` +
                              `$${borrowAfter}$.`
                        : `Chcemy odjąć cyfry $${oldMinuend}$ i $${subtrahend}$. Naptykamy trudności, więc próbujemy wykonać pożyczkę od cyfry bezpośrednio ` +
                              `po lewej. Ponieważ jest ona zerem, zapożyczenia musimy dokonać od dalszej cyfry - od $${borrowBefore}$. ` +
                              `Zmniejszamy ją do $${borrowAfter}$, wszystkie zera po drodze do $9$, a wyjściowe $${oldMinuend}$ zwiększamy do ` +
                              `$${minuend}$.`,
                    currentColumn,
                );
            }

            this.result[currentColumn] = diff;
            this.addStep(
                `Odejmujemy liczby $${minuend}$ i $${subtrahend}$, otrzymujemy $${diff}$. Wynik zapisujemy pod kreską.`,
                currentColumn,
            );
        }

        // result
        return this.addStep(`Odczytujemy wynik: $${this.readValue(this.result, this.commaIndex)}$.`);
    }

    private addStep(comment: string, column = -1): ColumnarOperationStep[] {
        const totalMinuends = Math.max(...this.minuend.map((m) => m.length));
        const minuends = this.emptyArr(totalMinuends)
            .map((_, i) => this.minuend.map((m) => new DisplayTableCell(m[i], m.length > i + 1 ? ['s'] : [])))
            .reverse();
        const subtrahend = this.subtrahend.map((m) => new DisplayTableCell(m));
        const result = this.result.map((m) => new DisplayTableCell(m));

        [...minuends, subtrahend, result].forEach((row) => row[column]?.styleIds.push('h'));
        if (this.commaIndex !== -1) {
            minuends.slice(0, -1).forEach((row) => row.splice(this.commaIndex, 0, new DisplayTableCell()));
            [minuends.at(-1)!, subtrahend].forEach((n) =>
                n.splice(this.commaIndex, 0, new DisplayTableCell(n[this.commaIndex].value !== '' ? ',' : '')),
            );
            result.splice(this.commaIndex, 0, new DisplayTableCell(','));
        }
        [...minuends, subtrahend, result].forEach((row) => row.unshift(new DisplayTableCell(), new DisplayTableCell()));
        subtrahend[0].value = '-';
        minuends.slice(0, -1).forEach((row) => row.forEach((n) => n.styleIds.push('c')));
        subtrahend.forEach((n) => n.styleIds.push('u'));

        this.steps.push({
            comment,
            table: new DisplayTable([...minuends, subtrahend, result]),
        });
        return this.steps;
    }
}
