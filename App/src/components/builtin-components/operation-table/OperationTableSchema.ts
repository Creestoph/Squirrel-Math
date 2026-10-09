import { ComponentSchema, ParameterType } from '../component-api';
import OperationTable from './OperationTable.vue';

const validation = (v: number) => {
    if (Math.floor(v) !== v || v > 9 || v < 0) {
        return 'Wartość musi być liczbą całkowitą między 0 a 9';
    }
    return null;
};

export const operationTableSchema: ComponentSchema = {
    id: 'operation-table',
    name: 'Tabliczka działania',
    description: `Interaktywna tabliczka działania (np. dodawania, mnożenia). 
    Domyślnie pokazuje wynik działania dla ustalonej kolumny i wiersza, lecz użytkownik może podświetlić myszą inny fragment tabliczki.`,
    component: OperationTable,
    parameters: {
        f: {
            type: ParameterType.FUNCTION,
            required: true,
            label: 'Działanie',
            hint: 'Funkcja typu (number, number) => number zwracająca wynik działania tabliczki dla argumentów: kolumna i wiersz.',
            placeholder: 'np. (a, b) => a + b',
            validation: (f: (a: number, b: number) => number) => {
                let i = 0,
                    j = 0;
                try {
                    for (; i <= 9; i++) {
                        for (; j <= 9; j++) {
                            f(i, j);
                        }
                    }
                    return null;
                } catch (e) {
                    return `Funkcja zwróciła błąd dla argumentów (${i}, ${j}): ${e}`;
                }
            },
        },
        print: {
            type: ParameterType.FUNCTION,
            required: true,
            label: 'Tekst wyświetlany',
            hint: 'Funkcja typu (number, number, number) => string zwracająca podpis pod tabliczką, gdy zaznaczona jest dana kolumna, wiersz i komórka.',
            placeholder: 'np. (a, b, c) => `${a} plus ${b} to ${c}`',
            validation: (f: (a: number, b: number, c: number) => string) => {
                let i = 0,
                    j = 0;
                try {
                    for (; i <= 9; i++) {
                        for (; j <= 9; j++) {
                            f(i, j, 0);
                        }
                    }
                    return null;
                } catch (e) {
                    return `Funkcja zwróciła błąd dla argumentów (${i}, ${j}, 0): ${e}`;
                }
            },
        },
        defaultLoperand: {
            type: ParameterType.NUMBER,
            required: false,
            label: 'Zaznaczona kolumna',
            hint: 'Numer kolumny, która jest domyślnie zaznaczona, od 0 do 9.',
            placeholder: '0-9',
            validation,
        },
        defaultRoperand: {
            type: ParameterType.NUMBER,
            required: false,
            label: 'Zaznaczony wiersz',
            hint: 'Numer wiersza, który jest domyślnie zaznaczony, od 0 do 9.',
            placeholder: '0-9',
            validation,
        },
    },
};
