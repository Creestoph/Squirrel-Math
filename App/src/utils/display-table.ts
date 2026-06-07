export type DisplayTableCellStyle = 'c' | 'u' | 'h' | 's' | 'r';

export class DisplayTableCell {
    private styleDictionary: Record<DisplayTableCellStyle, string> = {
        c: 'carry',
        u: 'underlined',
        h: 'highlight',
        s: 'strikethrough',
        r: 'border-right',
    };

    static parse(str: string) {
        if (str.includes('/')) {
            const [styles, value] = str.split('/');
            return new DisplayTableCell(value, styles.split('') as DisplayTableCellStyle[]);
        }
        return new DisplayTableCell(str);
    }

    constructor(
        public value: string | number | null = null,
        readonly styleIds: DisplayTableCellStyle[] = [],
    ) {}

    print() {
        const classStr = `class = "${this.styleIds.map((id) => this.styleDictionary[id]).join(' ')}"`;
        const isEmpty = this.value === '' || this.value === null;
        return `<td ${classStr}>${isEmpty ? '' : '$' + this.value + '$'}</td>`;
    }
}

export class DisplayTable {
    constructor(private nodes: DisplayTableCell[][]) {}

    static parse(strs: string[][]) {
        return new DisplayTable(strs.map((s) => s.map((t) => new DisplayTableCell(t))));
    }

    print(target: HTMLElement) {
        let table = '<table align = "center" class="columnar-operation">';
        for (let i = 0; i < this.nodes.length; i++) {
            table += '<tr>';
            for (let j = 0; j < this.nodes[i].length; j++) {
                table += this.nodes[i][j].print();
            }
            table += '</tr>';
        }
        table += '</table>';
        target.innerHTML = table;
    }
}
