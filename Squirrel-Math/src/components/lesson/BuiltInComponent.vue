<template>
    <div :is="attrs.componentName" v-bind="componentConfiguration" :class="{ output: true }"></div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';

import OperationTable from '@/components/store/operation-table/OperationTable.vue'
import { operationTableSchema } from '@/components/store/operation-table/OperationTableSchema'
import { operationTableLabels } from '@/components/store/operation-table/OperationTableLabels'
import ColumnarOperationTable from '@/components/store/columnar-operation-table/ColumnarOperationTable.vue'
import { columnarOperationTableSchema } from '@/components/store/columnar-operation-table/ColumnarOperationTableSchema'
import { columnarOperationTableLabels } from '@/components/store/columnar-operation-table/ColumnarOperationTableLabels'
import ColumnarOperationGuide from '@/components/store/columnar-operation-guide/ColumnarOperationGuide.vue'
import { columnarOperationGuideSchema } from '@/components/store/columnar-operation-guide/ColumnarOperationGuideSchema'
import { columnarOperationGuideLabels } from '@/components/store/columnar-operation-guide/ColumnarOperationGuideLabels'
import { ComponentSchema } from '../store/Schema';

@Component({
    components: {
        OperationTable,
        ColumnarOperationTable,
        ColumnarOperationGuide
    }
})
export default class BuiltInComponent extends Vue { 
    @Prop() attrs?: any;
    readonly componentConfiguration: { [parameterName: string]: any };

    constructor() {
        super();
        const schemas: { [componentName: string]: ComponentSchema} = {};
        const labels: { [componentName: string]: { [parameterName: string]: string }} = {};
        schemas['operation-table'] = operationTableSchema;
        labels['operation-table'] = operationTableLabels;
        schemas['columnar-operation-table'] = columnarOperationTableSchema;
        labels['columnar-operation-table'] = columnarOperationTableLabels;
        schemas['columnar-operation-guide'] = columnarOperationGuideSchema;
        labels['columnar-operation-guide'] = columnarOperationGuideLabels;

        this.componentConfiguration = {};
        Object.entries(schemas[this.attrs.componentName]).forEach(([key, schema], i) => {
            if (schema.type.name == 'TEXT' || schema.type.name == 'BOOLEAN' || schema.type.name == 'ENUM')
                this.componentConfiguration[key] = this.attrs.args[i];
            else if (schema.type.name == 'NUMBER')
                this.componentConfiguration[key] = parseFloat(this.attrs.args[i]);
            else if (schema.type.name == 'FUNCTION') {
                try {
                    this.componentConfiguration[key] = eval(this.attrs.args[i]);
                    if (typeof this.componentConfiguration[key] != "function")
                    throw "";
                }
                catch (e) {
                    this.componentConfiguration[key] = () => {};
                }
            }
            else if (schema.type.name == 'ARRAY') {
                try {
                    this.componentConfiguration[key] = [...this.attrs.args[i]];
                    (this.componentConfiguration[key] as Array<string>).forEach((element, j) => this.componentConfiguration[key][j] = eval(element));
                }
                catch (e) {
                    this.componentConfiguration[key] = [];
                }
            }
        });
    }
}
</script>
