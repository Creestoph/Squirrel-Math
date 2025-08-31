<template>
    <div :is="getComponentName()" v-bind="componentConfiguration"></div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';

import OperationTable from '@/components/store/operation-table/OperationTable.vue';
import { operationTableSchema } from '@/components/store/operation-table/OperationTableSchema';
import { operationTableLabels } from '@/components/store/operation-table/OperationTableLabels';
import ColumnarOperationTable from '@/components/store/columnar-operation-table/ColumnarOperationTable.vue';
import { columnarOperationTableSchema } from '@/components/store/columnar-operation-table/ColumnarOperationTableSchema';
import { columnarOperationTableLabels } from '@/components/store/columnar-operation-table/ColumnarOperationTableLabels';
import ColumnarOperationGuide from '@/components/store/columnar-operation-guide/ColumnarOperationGuide.vue';
import { columnarOperationGuideSchema } from '@/components/store/columnar-operation-guide/ColumnarOperationGuideSchema';
import { columnarOperationGuideLabels } from '@/components/store/columnar-operation-guide/ColumnarOperationGuideLabels';
import { ComponentSchema } from '../store/Schema';

// private componets, only managed by developers
import { otherComponentSchema } from '@/components/store/private/OtherComponentSchema';
import { otherComponentLabels } from '@/components/store/private/OtherComponentLabels';
import AlgebraicCalculator from '@/components/store/private/AlgebraicCalculator.vue';
import SimpleQuadraticEquationsTraining from '@/components/store/private/SimpleQuadraticEquationsTraining.vue';

@Component({
    components: {
        OperationTable,
        ColumnarOperationTable,
        ColumnarOperationGuide,
        AlgebraicCalculator,
        SimpleQuadraticEquationsTraining,
    },
})
export default class BuiltInComponent extends Vue {
    @Prop() attrs!: { componentName: string; args: string[] };
    readonly componentConfiguration: { [parameterName: string]: any };

    getComponentName() {
        return this.attrs.componentName == 'other'
            ? this.componentConfiguration.name
            : this.attrs.componentName;
    }

    constructor() {
        super();
        const builtInComponents = {
            'operation-table': {
                name: 'Tabliczka działania',
                schema: operationTableSchema,
                labels: operationTableLabels,
            },
            'columnar-operation-table': {
                name: 'Działanie w słupku',
                schema: columnarOperationTableSchema,
                labels: columnarOperationTableLabels,
            },
            'columnar-operation-guide': {
                name: 'Tutorial działania w słupku',
                schema: columnarOperationGuideSchema,
                labels: columnarOperationGuideLabels,
            },
            other: {
                name: 'Inny',
                schema: otherComponentSchema,
                labels: otherComponentLabels,
            },
        } as {
            [key: string]: {
                name: string;
                schema: ComponentSchema;
                labels: { [key: string]: string };
            };
        };

        this.componentConfiguration = {};
        Object.entries(
            builtInComponents[this.attrs.componentName].schema,
        ).forEach(([key, schema], i) => {
            if (
                schema.type.name == 'TEXT' ||
                schema.type.name == 'BOOLEAN' ||
                schema.type.name == 'ENUM'
            )
                this.componentConfiguration[key] = this.attrs.args[i];
            else if (schema.type.name == 'NUMBER')
                this.componentConfiguration[key] = parseFloat(
                    this.attrs.args[i],
                );
            else if (schema.type.name == 'FUNCTION') {
                try {
                    this.componentConfiguration[key] = eval(this.attrs.args[i]);
                    if (typeof this.componentConfiguration[key] != 'function')
                        throw '';
                } catch (e) {
                    this.componentConfiguration[key] = () => {};
                }
            } else if (schema.type.name == 'ARRAY') {
                try {
                    this.componentConfiguration[key] = [...this.attrs.args[i]];
                    this.componentConfiguration[key].forEach(
                        (element: string, j: number) =>
                            (this.componentConfiguration[key][j] =
                                eval(element)),
                    );
                } catch (e) {
                    this.componentConfiguration[key] = [];
                }
            }
        });
    }
}
</script>
