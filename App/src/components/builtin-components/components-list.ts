import { algebraicCalculatorSchema } from './algebraic-calculator/AlgebraicCalculatorSchema';
import { columnarOperationGuideSchema } from './columnar-operation-guide/ColumnarOperationGuideSchema';
import { columnarOperationTableSchema } from './columnar-operation-table/ColumnarOperationTableSchema';
import { operationTableSchema } from './operation-table/OperationTableSchema';
import { ComponentSchema } from './component-api';
import { simpleQuadraticEquationsSchema } from './simple-quadratic-equations-training/SimpleQuadraticEquationsTrainingSchema';
import { arithmeticCalculatorSchema } from './arithmetic-calculator/ArithmeticCalculatorSchema';

export const builtInComponents: ComponentSchema[] = [
    operationTableSchema,
    columnarOperationTableSchema,
    columnarOperationGuideSchema,
    arithmeticCalculatorSchema,
    algebraicCalculatorSchema,
    simpleQuadraticEquationsSchema,
];
