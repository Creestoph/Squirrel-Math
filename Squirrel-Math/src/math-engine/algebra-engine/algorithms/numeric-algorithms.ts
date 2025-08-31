import { Infty } from '../numbers/infinity';

export function numericGCD(...values: bigint[]): bigint | Infty {
    const gcdFor2Args = function (
        a: bigint | Infty,
        b: bigint | Infty,
    ): bigint | Infty {
        if (
            (a instanceof Infty || a == BigInt(0)) &&
            (b instanceof Infty || b == BigInt(0))
        )
            return Infty.positive;
        if (a instanceof Infty || a == BigInt(0))
            return b instanceof Infty ? Infty.positive : b < 0 ? -b : b;
        if (a < 0) a = -a;
        if (b instanceof Infty || b == BigInt(0)) return a;
        if (b < 0) b = -b;
        return gcdFor2Args(b, a % b);
    };
    if (values.length == 0) return Infty.positive;
    return values.reduce(
        (gcd: bigint | Infty, v) => gcdFor2Args(gcd, v),
        BigInt(0),
    );
}

export function numericLCM(...values: bigint[]): bigint {
    const lcmFor2Args = function (a: bigint, b: bigint): bigint {
        const gcd = numericGCD(a, b);
        if (gcd instanceof Infty) return BigInt(0);
        return (a * b) / gcd;
    };
    return values.reduce((gcd, v) => lcmFor2Args(gcd, v), BigInt(1));
}

//returns integer close to nth root
export function integerRoot(value: bigint, n: bigint = BigInt(2)) {
    let lowerBound = BigInt(0);
    let upperBound = value;
    let result;
    do {
        result = (lowerBound + upperBound) / BigInt(2);
        const exp = result ** n;
        if (exp == value) break;
        if (exp < value) lowerBound = result;
        if (exp > value) upperBound = result;
    } while (result - lowerBound > 1 || upperBound - result > 1);
    return result;
}

export function factorizeNumber(n: bigint): bigint[] {
    const result = [];
    let root = integerRoot(n < BigInt(0) ? -n : n);
    for (let i = BigInt(2); i <= root; i++)
        if (n % i == BigInt(0)) {
            result.push(i);
            n /= i;
            root = integerRoot(n < BigInt(0) ? -n : n);
            i--;
        }
    result.push(n);
    return result;
}
