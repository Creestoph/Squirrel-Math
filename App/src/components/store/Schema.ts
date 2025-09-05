export class ParameterType {
    static readonly NUMBER = new ParameterType('NUMBER');
    static readonly TEXT = new ParameterType('TEXT');
    static readonly BOOLEAN = new ParameterType('BOOLEAN');
    static readonly FUNCTION = new ParameterType('FUNCTION');
    static readonly ARRAY = new ParameterType('ARRAY');
    static readonly ENUM = (...values: string[]) => new ParameterType('ENUM', values);

    constructor(
        readonly name: string,
        readonly values?: string[],
    ) {}
}

export interface ComponentSchema {
    [parameter: string]: {
        type: ParameterType;
        required: boolean;
    };
}
