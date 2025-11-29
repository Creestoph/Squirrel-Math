import { algebraicCalculatorSchema } from './algebraic-calculator/AlgebraicCalculatorSchema';
import { columnarOperationGuideSchema } from './columnar-operation-guide/ColumnarOperationGuideSchema';
import { columnarOperationTableSchema } from './columnar-operation-table/ColumnarOperationTableSchema';
import { operationTableSchema } from './operation-table/OperationTableSchema';
import { ComponentSchema } from './component-api';
import { simpleQuadraticEquationsSchema } from './simple-quadratic-equations-training/SimpleQuadraticEquationsTrainingSchema';

export const builtInComponents: ComponentSchema[] = [
    operationTableSchema,
    columnarOperationTableSchema,
    columnarOperationGuideSchema,
    algebraicCalculatorSchema,
    simpleQuadraticEquationsSchema,
];
