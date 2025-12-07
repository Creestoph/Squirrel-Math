import { ColumnarOperation, ColumnarOperationStep } from './columnar-operation';
import { DisplayTable } from './display-table';

class ColumnarFactorizationStep implements ColumnarOperationStep {
    private table: DisplayTable;

    constructor(
        dividends: (number | null)[],
        divisors: number[],
        private readonly comment: string,
    ) {
        this.table = new DisplayTable(dividends.map((d, i) => [`r/${d ?? ''}`, `${divisors[i] ?? ''}`]));
    }

    print(tableTargetId: HTMLElement): string {
        this.table.print(tableTargetId);
        return this.comment;
    }
}

export class ColumnarFactorization extends ColumnarOperation {
    protected steps: ColumnarFactorizationStep[] = [];
    protected signs = [];

    private readonly dividends: number[] = [];
    private readonly divisors: number[] = [];
    private readonly maxNicePrime = 97;
    private sieve: Uint8Array = null!;

    protected generateSteps(numbers: [string]) {
        if (numbers.length !== 1 || !this.validateNumber(numbers[0], false)) {
            throw 'Wpisz jedną liczbę naturalną do rozłożenia na czynniki pierwsze, np. 120.';
        }

        let currentValue = parseInt(numbers[0]);

        if (currentValue >= 100_000_000) {
            throw `Za duża ta liczba, skupmy się na mniejszych. Do rozkładania takich dużych liczb nauczymy się w przyszłości lepszych technik.`;
        }

        if (currentValue === 0 || currentValue === 1) {
            throw `Liczba ${currentValue} nie jest ani pierwsza, ani złożona. Nie da się jej rozłożyć na czynniki pierwsze.`;
        }

        this.dividends.push(currentValue);
        let currentDivisor = 2;
        let previousDivisor;
        this.generateSieveUpTo(currentValue);

        if (this.isNicePrime(currentValue)) {
            throw `Liczba ${currentValue} jest znaną i lubianą liczbą pierwszą. Rozkład na czynniki nie wchodzi tu w grę.`;
        }

        this.createStep(
            'Zapisujemy liczbę do rozłożenia i rysujemy obok niej pionową kreskę. ' +
                `Będziemy sprawdzać kolejne liczby pierwsze, z nadzieją, że któraś podzieli ${currentValue}. Zacznijmy od sprawdzenia dwójki.`,
        );

        while (currentValue > 1) {
            if (currentValue % currentDivisor === 0) {
                this.divisors.push(currentDivisor);
                if (currentValue === currentDivisor) {
                    if (currentDivisor === previousDivisor) {
                        this.createStep(
                            `Liczba ${currentValue} w oczywisty sposób dzieli się przez ${currentDivisor} - przepisujemy ją na prawo od kreski.`,
                        );
                    } else if (currentDivisor <= this.maxNicePrime) {
                        this.createStep(
                            `Rozpoznajemy, że wynik, który nam wyszedł: ${currentValue} jest liczbą pierwszą - przepisujemy ją na prawo od kreski.`,
                        );
                    } else {
                        this.createStep(
                            `Po żmudnym sprawdzaniu kolejnych możliwości okazuje się, że ${currentValue} nie dzieli się przez nic, a więc jest liczbą pierwszą. Przepisujemy ją na prawo od kreski.`,
                        );
                    }
                } else if (currentDivisor === 2) {
                    this.createStep(
                        (currentValue >= 10
                            ? `Ostatnią cyfrą liczby ${currentValue} jest ${currentValue % 10}, a więc jest ona parzysta. `
                            : `Liczba ${currentValue} jest parzysta. `) +
                            `Skoro możemy dzielić przez 2, zapisujemy dwójkę na prawo od kreski.`,
                    );
                } else if (currentDivisor === 3) {
                    this.createStep(
                        (currentValue >= 10
                            ? `Suma cyfr liczby ${currentValue} wynosi ${this.sumDigits(currentValue)}, czyli jest podzielna przez 3. `
                            : `Liczba ${currentValue} jest podzielna przez 3. `) +
                            `Zapisujemy więc 3 na prawo od kreski.`,
                    );
                } else if (currentDivisor === 5) {
                    this.createStep(
                        `Ostatnią cyfrą liczby ${currentValue} jest ${currentValue % 10}, a więc jest ona wielokrotnością 5. ` +
                            `Zapisujemy 5 na prawo od kreski.`,
                    );
                } else {
                    this.createStep(
                        `Po sprawdzeniu dalszych opcji okazuje się, że liczba ${currentValue} jest podzielna przez ${currentDivisor}, ` +
                            `więc zapisujemy tę liczbę pierwszą na prawo od kreski.`,
                    );
                }
                const previousValue = currentValue;
                currentValue /= currentDivisor;
                this.dividends.push(currentValue);
                this.createStep(
                    `Wykonujemy dzielenie ${previousValue} : ${currentDivisor} = ${currentValue} i zapisujemy wynik na lewo od kreski.`,
                );
                previousDivisor = currentDivisor;
            } else {
                const nextDivisor = this.nextPrime(currentDivisor);
                if (this.isNicePrime(currentValue)) {
                    // noop
                } else if (currentDivisor === 2) {
                    this.createStep(
                        (currentValue >= 10
                            ? `Ostatnią cyfrą liczby ${currentValue} nie jest 0, 2, 4, 6 ani 8, a więc nie jest parzysta. `
                            : `Liczba ${currentValue} nie jest parzysta. `) + 'Spróbujmy z kolejną liczbą pierwszą: 3.',
                    );
                } else if (currentDivisor === 3) {
                    this.createStep(
                        (currentValue >= 10
                            ? `Suma cyfr liczby ${currentValue} wynosi ${this.sumDigits(currentValue)}, czyli nie jest podzielna przez 3. `
                            : `Liczba ${currentValue} nie jest podzielna przez 3. `) + 'Sprawdźmy piątkę.',
                    );
                } else if (currentDivisor === 5) {
                    this.createStep(
                        `Ostatnią cyfrą liczby ${currentValue} nie jest 0 ani 5, a więc nie jest ona wielokrotnością 5. ` +
                            `Musimy sprawdzić po kolei większe liczby pierwsze: ` +
                            '7, 11, 13, 17, 19, 23, 29, 31,	37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97...',
                    );
                }
                previousDivisor = currentDivisor;
                currentDivisor = nextDivisor;
            }
        }

        this.createStep(
            `Otrzymaliśmy 1 jako wynik dzielenia, więc kończymy rozkład. ` +
                `Odczytujemy wynik z prawej strony kreski: ${this.dividends[0]} = ${this.divisors.join(' · ')}.`,
        );
    }

    private generateSieveUpTo(n: number): void {
        this.sieve = new Uint8Array(n + 1);
        this.sieve[2] = 1;
        for (let i = 3; i <= n; i += 2) {
            this.sieve[i] = 1;
        }

        const limit = Math.floor(Math.sqrt(n));
        for (let i = 3; i <= limit; i += 2) {
            if (this.sieve[i]) {
                for (let j = i * i; j <= n; j += 2 * i) {
                    this.sieve[j] = 0;
                }
            }
        }
    }

    private isNicePrime(x: number): boolean {
        return x <= this.maxNicePrime && this.isPrime(x);
    }

    private nextPrime(x: number): number {
        let candidate = x + 1;
        while (!this.sieve[candidate]) {
            candidate++;
        }
        return candidate;
    }

    private isPrime(x: number): boolean {
        return !!this.sieve[x];
    }

    private sumDigits(x: number): string {
        const digits = ('' + x).split('');
        const sum = digits.reduce((acc, digit) => acc + parseInt(digit), 0);
        return digits.join(' + ') + ' = ' + sum;
    }

    private createStep(comment: string): void {
        const dividends: (number | null)[] = [...this.dividends];
        if (this.dividends.at(-1) !== 1) {
            dividends.push(null, null);
        }
        this.steps.push(new ColumnarFactorizationStep(dividends, this.divisors, comment));
    }
}
