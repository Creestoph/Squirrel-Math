type StyleCode = 'n' | 'c' | 'u' | 'h' | 's';

class Columnar_operation_node {
    private style_dictionary: Record<StyleCode, string> = {
        n: 'columnar_operation_not_carry',
        c: 'columnar_operation_carry',
        u: 'columnar_operation_underlined',
        h: 'columnar_operation_highlight',
        s: 'strikethrough',
    };

    private value: string;
    private style_ids: StyleCode[] = [];

    constructor(str: string) {
        if (str.indexOf('/') != 0) {
            this.value = str;
            this.update_styles('');
        } else {
            const s = str.indexOf(':');
            if (s == -1) {
                throw 'Invalid node pattern: ' + str;
            }
            this.value = str.substring(s + 1);
            this.update_styles(str.substring(0, s));
        }
    }

    print() {
        if (this.style_ids.indexOf('c') == -1) {
            this.style_ids.push('n');
        }
        const class_str = ' class = "' + this.style_ids.map((id) => this.style_id_to_style_name(id)).join(' ') + '"';
        return this.value ? '<td' + class_str + '>$' + this.value + '$</td>' : '<td' + class_str + '></td>';
    }

    private update_styles(str: string) {
        this.style_ids = str.split('/') as StyleCode[];
        this.style_ids.splice(0, 1);
    }

    private style_id_to_style_name(style_id: 'n' | 'c' | 'u' | 'h' | 's') {
        if (!(style_id in this.style_dictionary)) {
            throw 'Invalid style id: ' + style_id;
        }
        return this.style_dictionary[style_id];
    }
}

export class Display_table {
    constructor(private nodes: Columnar_operation_node[][]) {}

    print(target: HTMLElement) {
        let table = '<table align = "center" class="columnar_operation">';
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

    static create_custom(strs: string[][]) {
        const nodes: Columnar_operation_node[][] = [];
        for (let i = 0; i < strs.length; i++) {
            nodes[i] = [];
            for (let j = 0; j < strs[i].length; j++) {
                nodes[i][j] = new Columnar_operation_node(strs[i][j]);
            }
        }
        return new Display_table(nodes);
    }

    static create_from_table(operation: '+' | '-', numbers: string[][]) {
        if (operation != '+' && operation != '-') {
            return Display_table.create_custom(numbers);
        }
        const nodes: Columnar_operation_node[][] = [];
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
                        nodes[i][0] = new Columnar_operation_node(t[0] == ':' ? t.substring(1) : t);
                        t = style + ':';
                        nodes[i][1] = new Columnar_operation_node(t[0] == ':' ? t.substring(1) : t);
                    } else {
                        t = style + ':';
                        nodes[i][0] = new Columnar_operation_node(t[0] == ':' ? t.substring(1) : t);
                        nodes[i][1] = new Columnar_operation_node(t[0] == ':' ? t.substring(1) : t);
                    }
                    for (let j = 0; j < numbers[i].length; j++) {
                        t = style + (numbers[i][j].length > 0 && numbers[i][j][0] == '/' ? '' : ':') + numbers[i][j];
                        nodes[i][j + 2] = new Columnar_operation_node(t[0] == ':' ? t.substring(1) : t);
                    }
                    break;
                case '-':
                    if (i == 0 || i == 1) {
                        style += '/c';
                    }
                    if (i == numbers.length - 2) {
                        style += '/u';
                        t = style + ':-';
                        nodes[i][0] = new Columnar_operation_node(t[0] == ':' ? t.substring(1) : t);
                        t = style + ':';
                        nodes[i][1] = new Columnar_operation_node(t[0] == ':' ? t.substring(1) : t);
                    } else {
                        t = style + ':';
                        nodes[i][0] = new Columnar_operation_node(t[0] == ':' ? t.substring(1) : t);
                        nodes[i][1] = new Columnar_operation_node(t[0] == ':' ? t.substring(1) : t);
                    }
                    for (let j = 0; j < numbers[i].length; j++) {
                        t = style + (numbers[i][j].length > 0 && numbers[i][j][0] == '/' ? '' : ':') + numbers[i][j];
                        nodes[i][j + 2] = new Columnar_operation_node(t[0] == ':' ? t.substring(1) : t);
                    }
                    break;
            }
        }
        return new Display_table(nodes);
    }
}
