<template>
    <div>
        <input class="with-highlight" v-model="input" v-on:keyup.enter="onSimplify()" />
        <button class="button-red" @click="onSimplify()">Uprość</button>
        <latex-render :latex="latex" :display-mode="true" />
    </div>
</template>

<script setup lang="ts">
import LatexRender from '@/components/utils/latex-utils/LatexRender.vue';
import { Expression, parseExpression } from '../../../math-engine/algebra-engine/expression';
import { simplify } from '../../../math-engine/algebra-engine/algorithms/simplification-algorithm';
import { ref } from 'vue';

const input = ref('');
const latex = ref('');

function onSimplify() {
    try {
        const expression: Expression = parseExpression(input.value);
        const simplified = simplify(expression).toLatex();
        if (simplified.length > 10000) {
            latex.value = 'To wyrażenie jest okropnie długie po uproszczeniu. Chyba nie potrzebujesz aż tak potężnych obliczeń.';
        } else {
            latex.value = `$$${expression.toLatex()} = ${simplified}$$`;
        }
    } catch (exception: any) {
        latex.value = exception;
    }
}
</script>

<style scoped lang="scss">
#result {
    border: 1px solid black;
    text-align: center;
    padding: 20px 0;
    min-height: 200px;
    margin: 10px 0;
    position: relative;
}
input {
    width: calc(100% - 125px);
}
button.button-red {
    padding: 10px;
    width: 80px;
    bottom: 20px;
    margin: 0 0 0 10px;
}
</style>
