export function gcd(a: number, b: number): number {
    return !b ? a : gcd(Math.abs(b), Math.abs(a) % Math.abs(b));
}
