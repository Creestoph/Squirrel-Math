<template>
    <component :is="componentSchema.component" v-bind="componentConfiguration"></component>
</template>

<script setup lang="ts">
import { builtInComponentFormToInput, BuiltInComponentInput } from '../builtin-components/component-api';
import { builtInComponents } from '../builtin-components/components-list';

const props = defineProps<{ attrs: { componentName: string; args: string[] } }>();

const componentConfiguration: Record<string, BuiltInComponentInput> = {};
const componentSchema = builtInComponents.find((c) => c.id === props.attrs.componentName)!;
Object.entries(componentSchema.parameters || {}).forEach(
    ([key, schema], i) =>
        (componentConfiguration[key] = builtInComponentFormToInput(props.attrs.args[i], schema.type.name)),
);
</script>
