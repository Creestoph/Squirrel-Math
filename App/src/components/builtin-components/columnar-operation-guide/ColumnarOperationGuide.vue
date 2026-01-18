<template>
    <div>
        <zero-division-popup v-show="showZeroDivisionError" @close="showZeroDivisionError = false" />
        <step-by-step :generateSteps="generateSteps" @update="update">
            <template #default="{ stepData }">
                <div class="columnar-operation-output">
                    <div v-if="stepData.table" ref="table" class="no-selection" />
                    <p class="no-selection" v-html="stepData.comment"></p>
                </div>
            </template>
        </step-by-step>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ColumnarAddition } from './columnar-operation/columnar-addition';
import { ColumnarSubtraction } from './columnar-operation/columnar-subtraction';
import { ColumnarDivision, ZeroDivisionError } from './columnar-operation/columnar-division';
import { ColumnarMultiplication } from './columnar-operation/columnar-multiplication';
import { ColumnarFactorization } from '@/components/builtin-components/columnar-operation-guide/columnar-operation/columnar-factorization';
import ZeroDivisionPopup from './columnar-operation/ZeroDivisionPopup.vue';
import StepByStep from '@/components/utils/StepByStep.vue';
import { ColumnarOperationStep } from './columnar-operation/columnar-operation';

const props = defineProps<{ operation: string; floats: boolean }>();
const table = ref<HTMLElement>(null!);

const showZeroDivisionError = ref(false);

function generateSteps(input: string): ColumnarOperationStep[] {
    let operationType!:
        | typeof ColumnarAddition
        | typeof ColumnarSubtraction
        | typeof ColumnarMultiplication
        | typeof ColumnarDivision
        | typeof ColumnarFactorization;

    const operatorsCount = ['+', '-', '*', ':', '/'].filter((op) => input.includes(op)).length;

    if (props.operation === 'factorization') {
        if (operatorsCount > 0) {
            return [
                {
                    comment: 'Wpisz jedną liczbę naturalną do rozłożenia na czynniki pierwsze, np. 120.',
                },
            ];
        }
        operationType = ColumnarFactorization;
    } else if (props.operation === 'all' && operatorsCount !== 1) {
        return [
            {
                comment: 'Wpisz jedno działanie do wykonania',
            },
        ];
    } else if (props.operation === 'addition' || (props.operation === 'all' && input.includes('+'))) {
        operationType = ColumnarAddition;
    } else if (props.operation === 'subtraction' || (props.operation === 'all' && input.includes('-'))) {
        operationType = ColumnarSubtraction;
    } else if (props.operation === 'multiplication' || (props.operation === 'all' && input.includes('*'))) {
        operationType = ColumnarMultiplication;
    } else if (
        props.operation === 'division' ||
        (props.operation === 'all' && (input.includes(':') || input.includes('/')))
    ) {
        operationType = ColumnarDivision;
    }

    const columnarOperation = new operationType();
    try {
        return columnarOperation.generateFromInput(input, props.floats);
    } catch (err: any) {
        return [
            {
                comment: typeof err === 'string' ? err : err.message,
                showZeroDivisionError: err instanceof ZeroDivisionError,
            },
        ];
    }
}

function update(step: ColumnarOperationStep) {
    if (step.showZeroDivisionError) {
        showZeroDivisionError.value = true;
    }
    step.table?.print(table.value);
}
</script>

<style lang="scss">
@use '@/style/columnar-operation';
</style>

<style scoped lang="scss">
@use '@/style/colors';

.columnar-operation-output {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 400px;

    div {
        flex: 1 1 auto;
        display: flex;
        align-items: center;
        padding: 30px 0 20px 0;
    }

    p {
        flex: 0 0 100px;
    }
}
</style>
