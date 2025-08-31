<template>
    <div>
        <input v-model="input" v-on:keyup.enter="simplify()" />
        <button class="button-red" @click="simplify()">Uprość</button>
        <div id="result" ref="resultDiv"></div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
    Expression,
    parseExpression,
} from '../../../math-engine/algebra-engine/expression';
import { Component } from 'vue-property-decorator';
import { simplify } from '../../../math-engine/algebra-engine/algorithms/simplification-algorithm';
declare var MathJax: any;

@Component
export default class AlgebraicCalculator extends Vue {
    input: string = '';

    simplify() {
        try {
            const expression: Expression = parseExpression(this.input);
            const simplified = simplify(expression).toMathJax();
            if (simplified.length > 10000) {
                this.setDivContent(
                    'resultDiv',
                    'To wyrażenie jest okropnie długie po uproszczeniu. Chyba nie potrzebujesz aż tak potężnych obliczeń.',
                );
            } else {
                this.setDivContent(
                    'resultDiv',
                    '$$' + expression.toMathJax() + ' = ' + simplified + '$$',
                );
            }
        } catch (exception: any) {
            this.setDivContent('resultDiv', exception);
        }
    }

    private setDivContent(reference: string, content: string) {
        let div: Element = this.$refs[reference] as Element;
        [].slice.call(div.children).forEach((child) => div.removeChild(child));
        div.innerHTML = content;
        MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
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
