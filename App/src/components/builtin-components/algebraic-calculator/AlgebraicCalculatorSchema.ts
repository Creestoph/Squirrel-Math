import { ComponentSchema } from '../component-api';
import AlgebraicCalculator from './AlgebraicCalculator.vue';

export const algebraicCalculatorSchema: ComponentSchema = {
    id: 'algebraic-calculator',
    name: 'Kalkulator algebraiczny',
    description:
        'Pozwala użytkownikowi wpisać wyrażenie algebraiczne, po czym pokazuje, do jakiej formy można je uprościć',
    component: AlgebraicCalculator,
};
