export function factorial(n: number): number {
    let result = 1;
    for (let i = 2; i <= n; i++)
        result *= i;
    return result;
}

//TODO: precise solution for BIG integers
export function multinomialCoefficient(exponentVector: bigint[]): bigint {
    let n = exponentVector.reduce((s, v) => s+v);

    let sum = 0;
    let logarithms: number[] = [];
    for (let i = BigInt(2); i <= n; i++) {
        var log = Math.log(Number(i));
        logarithms.push(log);
        sum += log;
    }

    exponentVector.forEach(e => {
        for (let i = 2; i <= e; i++)
            sum -= logarithms[i - 2];
    });

    return BigInt(Math.floor(Math.exp(sum) + 0.5));
}