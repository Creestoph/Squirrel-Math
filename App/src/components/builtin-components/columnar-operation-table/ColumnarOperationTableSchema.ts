import { ComponentSchema, ParameterType } from '../component-api';
import ColumnarOperationTable from './ColumnarOperationTable.vue';

export const columnarOperationTableSchema: ComponentSchema = {
    id: 'columnar-operation-table',
    name: 'Działanie w słupku',
    description:
        'Wyświetla tabelkę z liczbami przedstawiającymi działanie w słupku.<br><br>' +
        'Każdy wiersz przedstawia jeden rządek tabelki, czyli listę komórek do wyświetlenia, oddzielonych znakiem <code>;</code>. ' +
        'W komórce można wpisać tekst lub kod latex. Komórki można dodatkowo formatować używając specjalnych modyfikatorów, ' +
        'oddzielonych znakiem <code>/</code> od wartości w komórce: <ul>' +
        '<li><b>u</b> (underline) - komórka będzie oddzielona od komórki poniżej linią poziomą.</li>' +
        '<li><b>c</b> (carry) - komórka przedstawia wartość "w pamięci" wykonywanego działania w słupku, a więc jest zapisana mniejszą czcionką.</li>' +
        '<li><b>s</b> (strikethrough) - wartość w komórce jest przekreślona.</li>' +
        '<li><b>h</b> (highlight) - wartość w komórce jest podświetlona.</li>' +
        '<li><b>r</b> (right border) - komórka będzie oddzielona od komórki z prawej linią pionową.</li>' +
        '</ul>Modyfikatory można dowolnie łączyć. Przykład: <code>1 ; x ; uh/5</code> oznacza, że w danym wierszu mają się wyświetlać kolejno: cyfra 1, znak x oraz<br>' +
        'podkreślona i podświetlona cyfra 5.',
    component: ColumnarOperationTable,
    parameters: {
        numbers: {
            type: ParameterType.ARRAY,
            required: true,
            label: 'Wiersze',
            hint:
                'W każdym wierszu wpisz listę liczb/znaków do wyświetlenia, oddzielonych średnikiem. W każdej komórce możesz dodać ' +
                'modyfikatory u, c, s, h, r i oddzielić je ukośnikiem od tego co ma wyświetlić się w komórce.',
            placeholder: '1 ; x ; uh / 5',
            validation: (array: string[]) => {
                const table = array.map((a) => a.split(';'));
                const rowSizes = table.map((t) => t.length);
                if (new Set(rowSizes).size !== 1) {
                    return `W każdym wierszu musi być taka sama liczba komórek. W tej chwili w kolejnych wierszach liczba komórek wynosi: ${rowSizes.join(', ')}.`;
                }
                const wrongSeparators = table
                    .map((row, i) => ({
                        wrong: row.some((r) => r.split('').filter((r) => r === '/').length > 1),
                        row: i,
                    }))
                    .filter((r) => r.wrong);
                if (wrongSeparators.length > 1) {
                    return `W jednej komórce separator / może być użyty tylko raz (wiersz ${wrongSeparators.map((w) => w.row + 1).join(', ')}).`;
                }
                const wrongModifiers = table
                    .map((row) => row.filter((r) => r.includes('/')).flatMap((r) => r.split('/')[0].split('')))
                    .map((row, i) => ({
                        chars: row.filter((r) => !['u', 'c', 's', 'h', 'r', ' '].includes(r)),
                        row: i,
                    }))
                    .filter((m) => m.chars.length > 0);
                if (wrongModifiers.length > 0) {
                    return (
                        'Niepoprawny modyfikator: ' +
                        wrongModifiers.map((w) => `${w.chars.join(', ')} (wiersz ${w.row + 1})`).join(', ')
                    );
                }
                return null;
            },
        },
    },
};
