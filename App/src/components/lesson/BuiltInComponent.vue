<template>
    <div :is="getComponentName()" v-bind="componentConfiguration"></div>
</template>

<script setup lang="ts">
import { builtInComponents, getBuiltInComponentByName } from '../utils/build-in-components';

const props = defineProps<{ attrs: { componentName: string; args: string[] } }>();
const componentConfiguration: { [parameterName: string]: any } = {};

Object.entries(builtInComponents[props.attrs.componentName].schema).forEach(([key, schema], i) => {
    if (schema.type.name == 'TEXT' || schema.type.name == 'BOOLEAN' || schema.type.name == 'ENUM') {
        componentConfiguration[key] = props.attrs.args[i];
    } else if (schema.type.name == 'NUMBER') {
        componentConfiguration[key] = parseFloat(props.attrs.args[i]);
    } else if (schema.type.name == 'FUNCTION') {
        try {
            componentConfiguration[key] = eval(props.attrs.args[i]);
            if (typeof componentConfiguration[key] != 'function') {
                throw '';
            }
        } catch (e) {
            componentConfiguration[key] = () => {};
        }
    } else if (schema.type.name == 'ARRAY') {
        try {
            componentConfiguration[key] = [...props.attrs.args[i]];
            componentConfiguration[key].forEach(
                (element: string, j: number) => (componentConfiguration[key][j] = eval(element)),
            );
        } catch (e) {
            componentConfiguration[key] = [];
        }
    }
});

function getComponentName() {
    const isDev = props.attrs.componentName == 'other';
    return getBuiltInComponentByName(isDev ? componentConfiguration.name : props.attrs.componentName, isDev);
}
</script>
