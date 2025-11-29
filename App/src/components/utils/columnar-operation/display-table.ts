type StyleCode = 'n' | 'c' | 'u' | 'h' | 's';

class ColumnarOperationNode {
    private styleDictionary: Record<StyleCode, string> = {
        n: 'columnar_operation_not_carry',
        c: 'columnar_operation_carry',
        u: 'columnar_operation_underlined',
        h: 'columnar_operation_highlight',
        s: 'strikethrough',
    };

    private value: string;
    private styleIds: StyleCode[] = [];

    constructor(str: string) {
        if (str.includes('/')) {
            const [styles, value] = str.split('/');
            this.value = value;
            this.styleIds = styles.split('') as StyleCode[];
        } else {
            this.value = str;
        }

        this.value = this.value === 'r.' ? this.value : this.value.replace('.', ',');
    }

    print() {
        if (!this.styleIds.includes('c')) {
            this.styleIds.push('n');
        }
        const classStr = `class = "${this.styleIds.map((id) => this.styleDictionary[id]).join(' ')}"`;
        return this.value ? `<td ${classStr}>$${this.value}$</td>` : `<td ${classStr}></td>`;
    }
}

export class DisplayTable {
    private nodes: ColumnarOperationNode[][];

    constructor(strs: string[][]) {
        this.nodes = strs.map((s) => s.map((t) => new ColumnarOperationNode(t)));
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
