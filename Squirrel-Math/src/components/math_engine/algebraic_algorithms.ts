export class AlgebraicAlgorithms {
    static gcd(a: number, b: number): number {
        return !b ? a : this.gcd(Math.abs(b), Math.abs(a) % Math.abs(b));
    }
}