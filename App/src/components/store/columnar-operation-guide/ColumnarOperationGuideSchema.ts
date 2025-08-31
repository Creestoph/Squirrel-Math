import { ComponentSchema, ParameterType } from '../Schema';

export const columnarOperationGuideSchema: ComponentSchema = {
    operation: {
        type: ParameterType.ENUM('addition', 'subtraction', 'division', 'multiplication', 'all'),
        required: true,
    },
    floats: {
        type: ParameterType.BOOLEAN,
        required: true,
    },
};
