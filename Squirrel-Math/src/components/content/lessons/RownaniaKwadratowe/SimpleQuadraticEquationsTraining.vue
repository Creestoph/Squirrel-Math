<template>
    <div id="whole">
        Równanie:
        <div ref="equationDiv"></div>
        Rozwiązują $x = $ <input v-model="x1" @keyup="updateProduct()" tabindex="1"> lub $x = $ 
        <input v-model="x2" @keyup="updateProduct()" tabindex="2">
        <div ref="productDiv"></div>
        <div id="buttons">
            <button @click="check()">Sprawdź</button>
            <button @click="next()">Następne</button>
        </div>
        <div ref="resultDiv"></div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator'
import { Variable } from '../../../../math-engine/algebra-engine/variable';
import { Integer, Fraction } from '../../../../math-engine/algebra-engine/numbers';
import { numericGCD } from '../../../../math-engine/algebra-engine/algorithms/numeric-algorithms';
import { Product } from '../../../../math-engine/algebra-engine/product';
import { Power } from '../../../../math-engine/algebra-engine/power';
import { equals, simplify } from '../../../../math-engine/algebra-engine/algorithms/simplification-algorithm';
import { UnivariatePolynomial } from '../../../../math-engine/algebra-engine/univariate-polynomial';
declare var MathJax:any

@Component
export default class SimpleQuadraticEquationsTraining extends Vue {    
    correctX1: Fraction = new Fraction(0, 1);
    correctX2: Fraction = new Fraction(0, 1);
    userX1: Fraction = new Fraction(0, 1);
    userX2: Fraction = new Fraction(0, 1);
    x1: string = "";
    x2: string = "";
    private varX: Variable = new Variable("x");

    mounted() {
        this.next();
    }

    updateProduct() {
        let userX1Numerator, userX1Denominator, userX2Numerator, userX2Denominator;
        [userX1Numerator, userX1Denominator] = this.x1.split("/").map(n => parseInt(n));
        [userX2Numerator, userX2Denominator] = this.x2.split("/").map(n => parseInt(n));
        userX1Denominator = userX1Denominator || 1;
        userX2Denominator = userX2Denominator || 1;
        this.userX1 = new Fraction(userX1Numerator, userX1Denominator);
        this.userX2 = new Fraction(userX2Numerator, userX2Denominator);

        if (this.x1 == "" || this.x2 == "" || isNaN(parseInt(this.x1)) || isNaN(parseInt(this.x2)))
            return;

        let product = "Daje to postać iloczynową $";
        if (equals(this.userX1.numerator, this.userX2.numerator) && equals(this.userX1.denominator, this.userX2.denominator))
            product += new Power(simplify(UnivariatePolynomial.withCoefficients([this.userX1.numerator.opposite(), this.userX1.denominator], this.varX)), new Integer(2)).toMathJax();
        else 
            product += Product.of(simplify(UnivariatePolynomial.withCoefficients([this.userX1.numerator.opposite(), this.userX1.denominator], this.varX)), 
            simplify(UnivariatePolynomial.withCoefficients([this.userX2.numerator.opposite(), this.userX2.denominator], this.varX))).toMathJax();
        product += " = 0$.";

        this.setDivContent("productDiv", product);
    }

    check() {
        let result = "";
        if (this.x1 == "" || this.x2 == "")
            result = "Uzupełnij oba pola liczbami całkowitymi / ułamkami."
        else if (equals(this.userX1, this.correctX1) && equals(this.userX2, this.correctX2) || equals(this.userX1, this.correctX2) && equals(this.userX2, this.correctX1))
            result = "Dobrze!";
        else 
            result = "Niedobrze. Powinno być $x = " + simplify(this.correctX1).toMathJax() + "$ lub $x = " + simplify(this.correctX2).toMathJax() + "$.";
        
        this.setDivContent("resultDiv", result);
    }

    next() {
        let x1Numerator = Integer.random(0, 9).multiply(new Integer(Math.random() > 0.6 ? 1 : -1)) as Integer;
        let x2Denominator;
        if (equals(x1Numerator, Integer.zero) || Math.random() < 0.8)
            x2Denominator = Integer.one;
        else
            do {
                x2Denominator = Integer.random(1, 4);
            } while (numericGCD(x1Numerator.int, x2Denominator.int) > BigInt(1));
        this.correctX1 = new Fraction(x1Numerator.int, x2Denominator.int);
        this.correctX2 = new Fraction(Integer.random(0, 9).multiply(new Integer(Math.random() > 0.6 ? 1 : -1)).numeric(), 1);

        let equationPolynomial = simplify(Product.of(UnivariatePolynomial.withCoefficients([this.correctX1.numerator.opposite(), this.correctX1.denominator], this.varX), 
            UnivariatePolynomial.withCoefficients([this.correctX2.numerator.opposite(), this.correctX2.denominator], this.varX)));
        let equationString = "$$" + equationPolynomial.toMathJax() + " = 0$$"

        this.setDivContent("equationDiv", equationString);
        this.setDivContent("resultDiv", "");
        this.setDivContent("productDiv", "");
        this.x1 = this.x2 = "";
    }

    private setDivContent(reference: string, content: string) {
        let div: Element = this.$refs[reference] as Element;
        [].slice.call(div.children).forEach(child => div.removeChild(child));
        div.innerHTML = content;
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    }
}
</script>

<style scoped lang="scss">
#whole {
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
}
button {
    padding: 10px;
    width: 150px;
    bottom: 20px;
    margin: 0 10px 0 10px;
}
</style>
