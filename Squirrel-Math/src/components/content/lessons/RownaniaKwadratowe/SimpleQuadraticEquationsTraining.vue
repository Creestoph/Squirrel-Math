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
import { Polynomial } from '../../../../math_engine/polynomial'
import { Variable } from '../../../../math_engine/variable';
import { Integer, Fraction } from '../../../../math_engine/numbers';
import { gcd } from '../../../../math_engine/algebraic_algorithms';
import { Product } from '../../../../math_engine/product';
import { Sum } from '../../../../math_engine/sum';
import { Power } from '../../../../math_engine/power';
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
        [this.userX1.numerator.int, this.userX1.denominator.int] = this.x1.split("/").map(n => parseInt(n));
        [this.userX2.numerator.int, this.userX2.denominator.int] = this.x2.split("/").map(n => parseInt(n));
        this.userX1.denominator.int = this.userX1.denominator.int || 1;
        this.userX2.denominator.int = this.userX2.denominator.int || 1;

        if (this.x1 == "" || this.x2 == "" || isNaN(parseInt(this.x1)) || isNaN(parseInt(this.x2)))
            return;

        let product = "Daje to postać iloczynową $";
        if (this.userX1.numerator.equals(this.userX2.numerator) && this.userX1.denominator.equals(this.userX2.denominator)) 
            product += new Power(Polynomial.withCoefficients([this.userX1.numerator.opposite(), this.userX1.denominator], this.varX).simplify(), 
            new Integer(2)).toMathJax();
        else 
            product += Product.of(Polynomial.withCoefficients([this.userX1.numerator.opposite(), this.userX1.denominator], this.varX).simplify(), 
            Polynomial.withCoefficients([this.userX2.numerator.opposite(), this.userX2.denominator], this.varX).simplify()).toMathJax();
        product += " = 0$.";

        this.setDivContent("productDiv", product);
    }

    check() {
        let result = "";
        if (this.x1 == "" || this.x2 == "")
            result = "Uzupełnij oba pola liczbami całkowitymi / ułamkami."
        else if (this.userX1.equals(this.correctX1) && this.userX2.equals(this.correctX2) || this.userX1.equals(this.correctX2) && this.userX2.equals(this.correctX1))
            result = "Dobrze!";
        else 
            result = "Niedobrze. Powinno być $x = " + this.correctX1.simplify().toMathJax() + "$ lub $x = " + this.correctX2.simplify().toMathJax() + "$.";
        
        this.setDivContent("resultDiv", result);
    }

    next() {
        this.correctX1.numerator = Integer.random(0, 9).multiply(new Integer(Math.random() > 0.6 ? 1 : -1)) as Integer;
        if (this.correctX1.numerator.equals(Integer.zero) || Math.random() < 0.8)
            this.correctX1.denominator = Integer.one;
        else
            do {
                this.correctX1.denominator = Integer.random(1, 4);
            } while (gcd(this.correctX1.numerator.int, this.correctX1.denominator.int) > 1);
        this.correctX2.numerator = Integer.random(0, 9).multiply(new Integer(Math.random() > 0.6 ? 1 : -1)) as Integer;
        this.correctX2.denominator = Integer.one;

        let equationPolynomial = Product.of(Polynomial.withCoefficients([this.correctX1.numerator.opposite(), this.correctX1.denominator], this.varX), 
            Polynomial.withCoefficients([this.correctX2.numerator.opposite(), this.correctX2.denominator], this.varX)).simplify();
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
