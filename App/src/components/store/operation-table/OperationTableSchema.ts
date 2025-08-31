import { ComponentSchema, ParameterType } from '../Schema';

export const operationTableSchema: ComponentSchema = {
    defaultLoperand: {
        type: ParameterType.NUMBER,
        required: false,
    },
    defaultRoperand: {
        type: ParameterType.NUMBER,
        required: false,
    },
    f: {
        type: ParameterType.FUNCTION,
        required: true,
    },
    print: {
        type: ParameterType.FUNCTION,
        required: true,
    },
};
