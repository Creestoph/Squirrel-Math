export class Order {
    readonly ascending: (a: any, b: any) => number;
    readonly descending: (a: any, b: any) => number;

    constructor(ascending: (a: any, b: any) => number) {
        this.ascending = ascending;
        this.descending = (a, b) => -ascending(a, b);
    }
}
