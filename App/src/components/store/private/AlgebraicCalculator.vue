<template>
    <div>
        <input v-model="input" v-on:keyup.enter="onSimplify()" />
        <button class="button-red" @click="onSimplify()">Uprość</button>
        <div id="result" ref="resultDiv"></div>
    </div>
</template>

<script setup lang="ts">
import { Expression, parseExpression } from '../../../math-engine/algebra-engine/expression';
import { simplify } from '../../../math-engine/algebra-engine/algorithms/simplification-algorithm';
import { nextTick, ref } from 'vue';
declare var MathJax: any;

const input = ref('');
const resultDiv = ref<HTMLDivElement>(null!);

function onSimplify() {
    try {
        const expression: Expression = parseExpression(input.value);
        const simplified = simplify(expression).toMathJax();
        if (simplified.length > 10000) {
            resultDiv.value.innerHTML =
                'To wyrażenie jest okropnie długie po uproszczeniu. Chyba nie potrzebujesz aż tak potężnych obliczeń.';
        } else {
            resultDiv.value.innerHTML = `$$${expression.toMathJax()} = ${simplified}$$`;
            nextTick(() => MathJax.Hub.Queue(['Typeset', MathJax.Hub]));
        }
    } catch (exception: any) {
        resultDiv.value.innerHTML = exception;
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
