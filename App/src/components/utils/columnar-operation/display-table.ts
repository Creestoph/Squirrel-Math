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
        if (str.indexOf('/') !== 0) {
            this.value = str;
            this.updateStyles('');
        } else {
            const s = str.indexOf(':');
            if (s == -1) {
                throw 'Invalid node pattern: ' + str;
            }
            this.value = str.substring(s + 1);
            this.updateStyles(str.substring(0, s));
        }
        this.value = this.value === 'r.' ? this.value : this.value.replace('.', ',');
    }

    print() {
        if (!this.styleIds.includes('c')) {
            this.styleIds.push('n');
        }
        const classStr = `class = "${this.styleIds.map((id) => this.styleIdToStyleName(id)).join(' ')}"`;
        return this.value ? `<td ${classStr}>$${this.value}$</td>` : `<td ${classStr}></td>`;
    }

    private updateStyles(str: string) {
        this.styleIds = str.split('/') as StyleCode[];
        this.styleIds.splice(0, 1);
    }

    private styleIdToStyleName(styleId: 'n' | 'c' | 'u' | 'h' | 's') {
        if (!(styleId in this.styleDictionary)) {
            throw 'Invalid style id: ' + styleId;
        }
        return this.styleDictionary[styleId];
    }
}

export class DisplayTable {
    constructor(private nodes: ColumnarOperationNode[][]) {}

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

    static createCustom(strs: string[][]) {
        return new DisplayTable(strs.map((s) => s.map((t) => new ColumnarOperationNode(t))));
    }

    static createFromTable(operation: '+' | '-' | null, numbers: string[][]) {
        if (operation != '+' && operation != '-') {
            return DisplayTable.createCustom(numbers);
        }
        const nodes: ColumnarOperationNode[][] = [];
        let t;
        for (let i = 0; i < numbers.length; i++) {
            nodes[i] = [];
            let style = '';
            switch (operation) {
                case '+':
                    if (i == 0) {
                        style += '/c';
                    }
                    if (i == numbers.length - 2) {
                        style += '/u';
                        t = style + ':+';
                        nodes[i][0] = new ColumnarOperationNode(t[0] == ':' ? t.substring(1) : t);
                        t = style + ':';
                        nodes[i][1] = new ColumnarOperationNode(t[0] == ':' ? t.substring(1) : t);
                    } else {
                        t = style + ':';
                        nodes[i][0] = new ColumnarOperationNode(t[0] == ':' ? t.substring(1) : t);
                        nodes[i][1] = new ColumnarOperationNode(t[0] == ':' ? t.substring(1) : t);
                    }
                    for (let j = 0; j < numbers[i].length; j++) {
                        t = style + (numbers[i][j].length > 0 && numbers[i][j][0] == '/' ? '' : ':') + numbers[i][j];
                        nodes[i][j + 2] = new ColumnarOperationNode(t[0] == ':' ? t.substring(1) : t);
                    }
                    break;
                case '-':
                    if (i == 0 || i == 1) {
                        style += '/c';
                    }
                    if (i == numbers.length - 2) {
                        style += '/u';
                        t = style + ':-';
                        nodes[i][0] = new ColumnarOperationNode(t[0] == ':' ? t.substring(1) : t);
                        t = style + ':';
                        nodes[i][1] = new ColumnarOperationNode(t[0] == ':' ? t.substring(1) : t);
                    } else {
                        t = style + ':';
                        nodes[i][0] = new ColumnarOperationNode(t[0] == ':' ? t.substring(1) : t);
                        nodes[i][1] = new ColumnarOperationNode(t[0] == ':' ? t.substring(1) : t);
                    }
                    for (let j = 0; j < numbers[i].length; j++) {
                        t = style + (numbers[i][j].length > 0 && numbers[i][j][0] == '/' ? '' : ':') + numbers[i][j];
                        nodes[i][j + 2] = new ColumnarOperationNode(t[0] == ':' ? t.substring(1) : t);
                    }
                    break;
            }
        }
        return new DisplayTable(nodes);
    }
}
