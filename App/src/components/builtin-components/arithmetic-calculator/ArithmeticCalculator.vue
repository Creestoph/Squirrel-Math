<template>
    <step-by-step :generateSteps="generateSteps">
        <template #default="{ stepData }">
            <p class="math no-selection">{{ stepData.mathJax ? '$$' + stepData.mathJax + '$$' : '' }}</p>
            <p class="comment no-selection" v-html="stepData.comment"></p>
        </template>
    </step-by-step>
</template>

<script setup lang="ts">
import { ArithmeticCalculatorLogic } from './arithmetic-calculator-logic';
import StepByStep from '@/components/utils/StepByStep.vue';

function generateSteps(input: string) {
    return new ArithmeticCalculatorLogic().getSteps(input);
}
</script>

<style scoped lang="scss">
.math {
    margin: 60px 0 30px 0;
}
.comment {
    margin: 0 10px 50px 10px;
}
</style>
