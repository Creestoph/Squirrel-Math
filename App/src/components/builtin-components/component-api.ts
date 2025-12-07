import { Component } from 'vue';

export class ParameterType {
    static readonly NUMBER = new ParameterType('NUMBER');
    static readonly TEXT = new ParameterType('TEXT');
    static readonly BOOLEAN = new ParameterType('BOOLEAN');
    static readonly FUNCTION = new ParameterType('FUNCTION');
    static readonly ARRAY = new ParameterType('ARRAY');
    static readonly ENUM = (...values: string[]) => new ParameterType('ENUM', values);

    translations?: Record<string, string>;

    constructor(
        readonly name: string,
        readonly values?: string[],
    ) {}

    withTranslations(translations: Record<string, string>): this {
        this.translations = translations;
        return this;
    }
}

export interface ComponentSchema {
    id: string;
    name: string;
    description: string;
    component: Component;
    parameters?: {
        [parameter: string]: {
            type: ParameterType;
            required: boolean;
            label: string;
            hint: string;
            placeholder?: string;
            validation?: (value: any) => string | null;
        };
    };
}

export type BuiltInComponentFormArg = boolean | string | string[] | null;
export type BuiltInComponentInput = Function | boolean | number | string | string[] | undefined;

export function builtInComponentFormToInput(form: BuiltInComponentFormArg, type: string): BuiltInComponentInput {
    if (type == 'NUMBER') {
        return form === null || form === '' ? undefined : parseFloat(form as string);
    } else if (type == 'FUNCTION') {
        return eval(form as string);
    } else if (type == 'BOOLEAN') {
        return form || false;
    } else {
        return form || undefined;
    }
}
