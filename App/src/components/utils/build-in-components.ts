import { ComponentSchema } from '../store/Schema';

import OperationTable from '@/components/store/operation-table/OperationTable.vue';
import { operationTableSchema } from '@/components/store/operation-table/OperationTableSchema';
import { operationTableLabels } from '@/components/store/operation-table/OperationTableLabels';
import ColumnarOperationTable from '@/components/store/columnar-operation-table/ColumnarOperationTable.vue';
import { columnarOperationTableSchema } from '@/components/store/columnar-operation-table/ColumnarOperationTableSchema';
import { columnarOperationTableLabels } from '@/components/store/columnar-operation-table/ColumnarOperationTableLabels';
import ColumnarOperationGuide from '@/components/store/columnar-operation-guide/ColumnarOperationGuide.vue';
import { columnarOperationGuideSchema } from '@/components/store/columnar-operation-guide/ColumnarOperationGuideSchema';
import { columnarOperationGuideLabels } from '@/components/store/columnar-operation-guide/ColumnarOperationGuideLabels';

// private componets, only managed by developers
import { otherComponentSchema } from '@/components/store/private/OtherComponentSchema';
import { otherComponentLabels } from '@/components/store/private/OtherComponentLabels';
import AlgebraicCalculator from '@/components/store/private/AlgebraicCalculator.vue';
import SimpleQuadraticEquationsTraining from '@/components/store/private/SimpleQuadraticEquationsTraining.vue';

export interface BuiltInComponent {
    name: string;
    component: any;
    schema: ComponentSchema;
    labels: Record<string, string>;
}

export const builtInComponents: Record<string, BuiltInComponent> = {
    'operation-table': {
        name: 'Tabliczka działania',
        component: OperationTable,
        schema: operationTableSchema,
        labels: operationTableLabels,
    },
    'columnar-operation-table': {
        name: 'Działanie w słupku',
        component: ColumnarOperationTable,
        schema: columnarOperationTableSchema,
        labels: columnarOperationTableLabels,
    },
    'columnar-operation-guide': {
        name: 'Tutorial działania w słupku',
        component: ColumnarOperationGuide,
        schema: columnarOperationGuideSchema,
        labels: columnarOperationGuideLabels,
    },
    other: {
        name: 'Inny',
        component: null,
        schema: otherComponentSchema,
        labels: otherComponentLabels,
    },
};

export function getBuiltInComponentByName(name: string, isDev: boolean) {
    const devComponents = {
        'algebraic-calculator': AlgebraicCalculator,
        'simple-quadratic-equations-training': SimpleQuadraticEquationsTraining,
    };
    return isDev ? devComponents[name as keyof typeof devComponents] : builtInComponents[name].component;
}
