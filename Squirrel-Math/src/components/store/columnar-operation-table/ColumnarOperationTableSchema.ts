import { ComponentSchema, ParameterType } from "../Schema"

export const columnarOperationTableSchema: ComponentSchema = {
  operation: {
    type: ParameterType.ENUM("brak", "+", "-"),
    required: false,
  },
  numbers: {
    type: ParameterType.ARRAY,
    required: true,
  }
}