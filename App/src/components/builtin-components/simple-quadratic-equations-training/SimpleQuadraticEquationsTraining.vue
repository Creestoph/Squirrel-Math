<template>
    <div class="whole">
        Równanie:
        <div ref="equationDiv"></div>
        Rozwiązują $x = $
        <input class="with-highlight" v-model="x1" @keyup="updateProduct()" tabindex="1" /> lub $x = $
        <input class="with-highlight" v-model="x2" @keyup="updateProduct()" tabindex="2" />
        <div ref="productDiv"></div>
        <div id="buttons">
            <button class="button-red" @click="check()">Sprawdź</button>
            <button class="button-red" @click="next()">Następne</button>
        </div>
        <div ref="resultDiv"></div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import { Variable } from '../../../math-engine/algebra-engine/variable';
import { Integer, Fraction } from '../../../math-engine/algebra-engine/numbers';
import { numericGCD } from '../../../math-engine/algebra-engine/algorithms/numeric-algorithms';
import { Product } from '../../../math-engine/algebra-engine/product';
import { Power } from '../../../math-engine/algebra-engine/power';
import { equals, simplify } from '../../../math-engine/algebra-engine/algorithms/simplification-algorithm';
import { UnivariatePolynomial } from '../../../math-engine/algebra-engine/univariate-polynomial';

let correctX1: Fraction = new Fraction(0, 1);
let correctX2: Fraction = new Fraction(0, 1);
let userX1: Fraction = new Fraction(0, 1);
let userX2: Fraction = new Fraction(0, 1);
const x1 = ref('');
const x2 = ref('');
const varX: Variable = new Variable('x');
const equationDiv = ref<HTMLDivElement>(null!);
const productDiv = ref<HTMLDivElement>(null!);
const resultDiv = ref<HTMLDivElement>(null!);

onMounted(() => next());

function updateProduct() {
    if (x1.value == '' || x2.value == '' || isNaN(parseInt(x1.value)) || isNaN(parseInt(x2.value))) {
        return;
    }

    let userX1Numerator, userX1Denominator, userX2Numerator, userX2Denominator;
    [userX1Numerator, userX1Denominator] = x1.value.split('/').map((n) => parseInt(n));
    [userX2Numerator, userX2Denominator] = x2.value.split('/').map((n) => parseInt(n));
    userX1Denominator = userX1Denominator || 1;
    userX2Denominator = userX2Denominator || 1;
    userX1 = new Fraction(userX1Numerator, userX1Denominator);
    userX2 = new Fraction(userX2Numerator, userX2Denominator);

    let product = 'Daje to postać iloczynową $';
    if (equals(userX1.numerator, userX2.numerator) && equals(userX1.denominator, userX2.denominator)) {
        product += new Power(
            simplify(UnivariatePolynomial.withCoefficients([userX1.numerator.opposite(), userX1.denominator], varX)),
            new Integer(2),
        ).toMathJax();
    } else {
        product += Product.of(
            simplify(UnivariatePolynomial.withCoefficients([userX1.numerator.opposite(), userX1.denominator], varX)),
            simplify(UnivariatePolynomial.withCoefficients([userX2.numerator.opposite(), userX2.denominator], varX)),
        ).toMathJax();
    }
    product += ' = 0$.';

    setDivContent(productDiv, product);
}

function check() {
    let result = '';
    if (x1.value == '' || x2.value == '') {
        result = 'Uzupełnij oba pola liczbami całkowitymi / ułamkami.';
    } else if (
        (equals(userX1, correctX1) && equals(userX2, correctX2)) ||
        (equals(userX1, correctX2) && equals(userX2, correctX1))
    ) {
        result = 'Dobrze!';
    } else if (
        (equals(userX1.absolute(), correctX1.absolute()) && equals(userX2.absolute(), correctX2.absolute())) ||
        (equals(userX1.absolute(), correctX2.absolute()) && equals(userX2.absolute(), correctX1.absolute()))
    ) {
        result =
            'Prawie dobrze, tylko złe znaki: $x = ' +
            simplify(correctX1).toMathJax() +
            '$ lub $x = ' +
            simplify(correctX2).toMathJax() +
            '$.';
    } else {
        result =
            'Niedobrze. Powinno być $x = ' +
            simplify(correctX1).toMathJax() +
            '$ lub $x = ' +
            simplify(correctX2).toMathJax() +
            '$.';
    }

    setDivContent(resultDiv, result);
}

function next() {
    let x1Numerator = Integer.random(0, 9).multiply(new Integer(Math.random() > 0.6 ? 1 : -1)) as Integer;
    let x2Denominator;
    if (equals(x1Numerator, Integer.zero) || Math.random() < 0.8) {
        x2Denominator = Integer.one;
    } else {
        do {
            x2Denominator = Integer.random(1, 4);
        } while ((numericGCD(x1Numerator.int, x2Denominator.int) as bigint) > BigInt(1));
    }
    correctX1 = new Fraction(x1Numerator.int, x2Denominator.int);
    correctX2 = new Fraction(
        Integer.random(0, 9)
            .multiply(new Integer(Math.random() > 0.6 ? 1 : -1))
            .numeric(),
        1,
    );

    let equationPolynomial = simplify(
        Product.of(
            UnivariatePolynomial.withCoefficients([correctX1.numerator.opposite(), correctX1.denominator], varX),
            UnivariatePolynomial.withCoefficients([correctX2.numerator.opposite(), correctX2.denominator], varX),
        ),
    );
    let equationString = '$$' + equationPolynomial.toMathJax() + ' = 0$$';

    setDivContent(equationDiv, equationString);
    setDivContent(resultDiv, '');
    setDivContent(productDiv, '');
    x1.value = x2.value = '';
}

function setDivContent(div: Ref<HTMLDivElement>, content: string) {
    div.value.innerHTML = content;
    MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
}
</script>

<style scoped lang="scss">
.whole {
    border: 1px solid black;
    text-align: center;
    padding: 20px 0;
    height: 220px;
    width: 400px;
    margin: auto;
    position: relative;
}
input {
    width: 25px;
}
#buttons {
    position: absolute;
    bottom: 20px;
    width: 100%;

    button {
        padding: 10px;
        width: 150px;
        bottom: 20px;
        margin: 0 10px 0 10px;
    }
}
</style>
