import { ComponentSchema } from '../component-api';
import SimpleQuadraticEquationsTraining from './SimpleQuadraticEquationsTraining.vue';

export const simpleQuadraticEquationsSchema: ComponentSchema = {
    id: 'simple-quadratic-equations-training',
    name: 'Trening równań kwadratowych',
    description: 'Zadaje użytkownikowi równanie kwadratowe do rozwiązania i sprawdza poprawność udzielonej odpowiedzi.',
    component: SimpleQuadraticEquationsTraining,
};
