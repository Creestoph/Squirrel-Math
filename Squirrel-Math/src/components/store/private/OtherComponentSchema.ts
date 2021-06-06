import { ComponentSchema, ParameterType } from "../Schema"

export const otherComponentSchema: ComponentSchema = {
  name: {
    type: ParameterType.TEXT,
    required: true,
  },
  // arguments: {
  //   type: ParameterType.ARRAY,
  //   required: false
  // }
}