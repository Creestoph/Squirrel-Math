<template>
    <step-by-step :generateSteps="generateSteps">
        <template #default="{ stepData }">
            <p class="math no-selection">
                <latex-render :latex="stepData.mathJax ?? ''" :displayMode="!!stepData.mathJax" />
            </p>
            <p class="comment no-selection">
                <latex-text :text="stepData.comment ?? ''" />
            </p>
        </template>
    </step-by-step>
</template>

<script setup lang="ts">
import LatexRender from '@/components/utils/latex-utils/LatexRender.vue';
import LatexText from '@/components/utils/latex-utils/LatexText.vue';
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
