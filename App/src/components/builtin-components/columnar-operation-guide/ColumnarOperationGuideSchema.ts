import { ComponentSchema, ParameterType } from '../component-api';
import ColumnarOperationGuide from './ColumnarOperationGuide.vue';

export const columnarOperationGuideSchema: ComponentSchema = {
    id: 'columnar-operation-guide',
    name: 'Tutorial działania w słupku',
    description:
        'Pozwala użytkownikowi wpisać działanie matematyczne, po czym krok po kroku pokazuje, jak przeprowadzić to działanie pisemnie.',
    component: ColumnarOperationGuide,
    parameters: {
        operation: {
            label: 'Działanie',
            hint: 'Działanie, którego dotyczy tutorial',
            type: ParameterType.ENUM('addition', 'subtraction', 'division', 'multiplication', 'all'),
            required: true,
        },
        floats: {
            label: 'Dopuszczalne ułamki dziesiętne',
            hint: 'Czy w ramach tutoriala dozwolone jest użycie ułamków dziesiętnych',
            type: ParameterType.BOOLEAN,
            required: false,
        },
    },
};
