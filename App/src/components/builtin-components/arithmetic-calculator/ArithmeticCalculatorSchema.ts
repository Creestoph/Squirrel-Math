import { ComponentSchema } from '../component-api';
import ArithmeticCalculator from './ArithmeticCalculator.vue';

export const arithmeticCalculatorSchema: ComponentSchema = {
    id: 'arithmetic-calculator',
    name: 'Kalkulator arytmetyczny',
    description:
        'Pozwala użytkownikowi wpisać złożone działanie arytmetyczne, po czym pokazuje krok po kroku, jak je obliczyć.',
    component: ArithmeticCalculator,
};
