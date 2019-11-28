<template>
    <lesson routeShortVersion="/potegowanie-short" routeLongVersion="/potegowanie">
        <lesson-title-short>Potęgowanie</lesson-title-short>    
        
        <lesson-chapter><template #title>Czym jest potęga</template> 
		<p> 
			Podobnie jak mnożenie oznacza wielokrotne dodawanie tej samej liczby, tak potęgowanie oznacza wielokrotne mnożenie przez siebie 
			tej samej liczby. Potęgowanie jest działaniem "wyższego rzędu" niż mnożenie.
		</p>

		$$
			3 \cdot 3 \cdot 3 \cdot 3 \cdot 3=3^5
		$$

		<p>
			Zapis $3^5$ czytamy „trzy do potęgi piątej”. Liczba, którą mnożymy przez siebie wielokrotnie, to <i>podstawa potęgi</i>, a ilość mnożeń, jakich 
			dokonujemy (mała liczba w prawym górnym rogu, czyli w tzw. <i>indeksie górnym</i>), to <i>wykładnik potęgi</i>. Formalnie potęgę 
			dla dowolnej podstawy $a$ i naturalnego wykładnika $n$ definiujemy jako
		</p>

		$$
			a^n = \underbrace{a \cdot a \cdot a \cdot a \cdot \dotsb \cdot a}_n
		$$
        </lesson-chapter>			

		<lesson-chapter><template #title>Potęgowanie a kolejność wykonywania działań</template>  
		
		<div class = "formula">
			<p align="left" style="margin: 0">
				W dowolnym działaniu obliczenia wykonujemy według kolejności:
			</p>
			<ol style="margin-top: 0" class="formula">
				<li style="text-align: left">Działania w nawiasach</li>
				<li style="text-align: left">Potęgowanie</li>
				<li style="text-align: left">Mnożenie i dzielenie w kolejności występowania</li>
				<li style="text-align: left">Dodawanie i odejmowanie w kolejności występowania</li>
			</ol>
		</div>

		<p>
			Warto mieć na uwadze, że zapis $-2^4$ oznacza „dwa do czwartej na minusie”, czyli liczbę ujemną o wartości 
			$-16$, ale zapis $(-2)^4$ to czwarta potęga liczby $-2$, a więc $16$.
		</p>
        </lesson-chapter>			

		<lesson-chapter><template #title>Potęgi o wykładniku całkowitym</template>  
		<p>
			Określimy teraz definicje potęg dla wykładników innych niż dodatnie. 
		</p>

		<p>
			Dowolna liczba podniesiona do potęgi $0$ jest równa $1$. Wyjątkiem jest $0^0$, które nie jest dozwoloną operacją, choć przez niektórych matematyków 
			wciąż uważane jest za liczbę równą $1$.
		</p>

		$$a^0 = 1$$

		<p> 
			Liczba podniesiona do potęgi ujemnej jest odwrotna do liczby z przeciwnym wykładnikiem.
		</p>

		$$
			a^{-n}=\frac{1}{a^n} 
		$$

		<center><img src="./.images/Screenshot_7.png" align="middle"></center>
        </lesson-chapter>			

		<lesson-chapter><template #title>Własności potegowania</template>  
		<p> 
			Dla dowolnych $a$, $b$, $n$ i $m$ (także ujemnych) spełnione są poniższe równości. Niejednokrotnie okażą się one przydatne w przyszłości.
		</p>

		<p class="formula">
			Jeśli $n$-tą potęgę pewnej liczby pomnożymy przez $m$-tą potęgę tej liczby, to otrzymamy potęgę o wykładniku $n+m$
			$$a^n \cdot a^m=a^{n+m}$$
		</p>
		<div class="proof">
			<div class = "proof-sticker">Dowód</div>
			$$
				a^n \cdot a^m = \underbrace{a \cdot a \cdot a \cdot a \cdot \dotsb \cdot a}_{n} \ \cdot \ \underbrace{a \cdot a \dotsb \cdot a}_{m} = 
				\underbrace{a \cdot a \cdot a \cdot a \cdot a \cdot a \cdot a \cdot \dotsb \cdot a}_{n + m} = a^{n + m}
			$$
		</div>
		<br><br>

		<p class="formula">
			Jeśli $n$-tą potęgę pewnej liczby podzielimy przez $m$-tą potęgę tej liczby, to otrzymamy potęgę o wykładniku $n-m$
			$$\frac{a^n}{a^m} =a^{n-m}$$
		</p>
		<div class="proof">
			<div class = "proof-sticker">Dowód</div>
			Jeśli $n≥m$:
			$$ \frac{a^n}{a^m} = 
			\frac{\overbrace{a \cdot a \cdot a \cdot a \cdot a \cdot \require{cancel} \cancel{a \cdot a \cdot \dotsb \cdot a}}^{n} }{\underbrace {\cancel{a \cdot a \cdot \dotsb \cdot a}}_m } =
			\underbrace{a \cdot a \cdot a \cdot \dotsb \cdot a}_{n-m} = a^{n - m}$$
			Jeśli $n \lt m$:
			$$ \frac{a^n}{a^m} = 
			\frac{\overbrace{\cancel{a \cdot a \cdot \dotsb \cdot a}}^{n} }{\underbrace {a \cdot a \cdot a \cdot a \cdot a \cdot \cancel{a \cdot a \cdot \dotsb \cdot a}}_m } =
			\frac{1}{\underbrace{a \cdot a \cdot a \cdot \dotsb \cdot a}_{m-n}} = \frac{1}{a^{m - n}} = a^{n - m}$$
		</div>
		<br><br>

		<p class="formula">
			Jeśli liczbę $n$-tą potęgę pewnej liczby podniesiemy do potęgi $m$, to otrzymamy w wykładniku $n \cdot m$
			$$(a^n)^m=a^{n \cdot m}$$
		</p>
		<div class="proof">
			<div class = "proof-sticker">Dowód</div>
			$$
				(a^n)^m = \underbrace {a^n \cdot a^n \cdot a^n \cdot \dotsb \cdot a^n}_m = 
				\underbrace{\underbrace {a \cdot a \cdot \dotsb \cdot a}_n \cdot \underbrace {a \cdot a \cdot \dotsb \cdot a}_n \cdot 
				\underbrace {a \cdot a \cdot \dotsb \cdot a}_n \cdot \dotsb \cdot \underbrace {a \cdot a \cdot \dotsb \cdot a}_n}_m = a^{n \cdot m}
			$$
		</div>
		<br><br>

		<p class="formula">
			$n$-te potęga liczby $a \cdot b$ jest równa iloczynowi $n$-tej potęgi liczby $a$ i $n$-tej potęgi liczby $b$
			$$(a \cdot b)^n = a^n \cdot b^n$$
		</p>
		<div class="proof">
			<div class = "proof-sticker">Dowód</div>
			$$
				(a \cdot b)^n = \underbrace{a \cdot b \ \ \cdot \ \ a \cdot b \ \ \cdot \ \ a \cdot b \ \ \cdot \ \ \dotsb \ \ \cdot \ \ a \cdot b}_n = 
				\underbrace{a \cdot a \cdot a \cdot \dotsb \cdot a}_n \ \ \cdot \ \ \underbrace{b \cdot b \cdot b \cdot \dotsb \cdot b}_n = a^n \cdot b^n
			$$
		</div>
		<br><br>

		<p class="formula">
			Iloraz $n$-tej potęgi liczby $a$ przez $n$-tą potęgę liczby $b$ jest równy $n$-tej potędze liczby $\frac{a}{b}$
			$$\left(\frac{a}{b} \right)^n=\frac{a^n}{b^n} $$
		</p>
		<div class="proof">
			<div class = "proof-sticker">Dowód</div>
			$$
				\left(\frac{a}{b} \right)^n = \underbrace{\frac{a}{b} \cdot \frac{a}{b} \cdot \frac{a}{b} \cdot \dotsb \cdot \frac{a}{b}}_n = 
				\frac{\overbrace{a \cdot a \cdot a \cdot \dotsb \cdot a}^n}{\underbrace{b \cdot b \cdot b \cdot \dotsb \cdot b}_n} = \frac{a^n}{b^n}
			$$
			</div>
		<br><br>

        </lesson-chapter>					

		<lesson-chapter><template #title>Notacja wykładnicza</template> 
		<p> 
			W naukach przyrodniczych często wykorzystuje <i>notację wykładniczą</i>, czyli skrótowy zapis liczb o dużej liczbie cyfr. Ma on postać 
		</p>

		$$
			c \cdot 10^m
		$$

		<p> 
			Przy czym $c$ wymaga się, by $1 \leq c \lt 10$ lub $-10 \lt c \leq -1$, zaś $m$ może być dowolną liczbą całkowitą.
		</p>

		<ul>
			<li>$15\ 374 = 15\ 374,0 = 1,5374 \cdot 10^4$ (przecinek powędrował 4 miejsca w lewo)</li>
			<li>$-10\ 004\ 321,364 = -1,0004321364 \cdot 10^7 \approx -10^7$ (przecinek powędrował 7 miejsc w lewo)</li>
			<li>$0,0423 = 4,23 \cdot 10^{-2}$ (przecinek powędrował 2 miejsa w prawo)</li>
			<li>$0,0009999 = 9,999 \cdot 10^{-4} \approx 10 \cdot 10^{-4} = 10^{-3}$ (przecinek powędrował 4 miejsa w prawo)</li>
		</ul>
        </lesson-chapter>					

		<lesson-chapter><template #title>Nowe pojęcia</template> 
		<p> 
			Gdy wykonujemy potęgowanie, liczbę, której mnożenie wykonujemy wielokrotnie, to <b>podstawa potęgi</b>, a liczba mnożeń, które wykonujemy, 
			to <b>wykładnik</b>. Wykładnik zapisujemy jako małą liczbę na prawo i u góry podstawy, czyli w jej <b>indeksie górnym</b>. W potędze 
			$7^4$ siedem jest podstawą, a cztery wykładnikiem.
		</p>

		<p> 
			<b>Kwadrat liczby</b> to jej druga potęga (czyli potęga o wykładniku $2$). Kwadratem $3$ jest $3^2 = 9$<br>
			<b>Sześcian liczby</b> to jej trzecia potęga (czyli potęga o wykładniku $3$). $5$ do sześcianu wynosi $5^3 = 125$
		</p>
        </lesson-chapter>					

    </lesson>
</template>

<script>
import LessonTitleShort from "../../../lesson/LessonTitleShort";
import LessonIntro from "../../../lesson/LessonIntro";
import LessonChapter from "../../../lesson/chapter/LessonChapter";
import Lesson from "../../../lesson/Lesson";

export default {
  name: "PotegowanieShort",
  data() {
    return {
      chapters: []
    };
  },
  components: {
    LessonIntro,
    LessonTitleShort,
    LessonChapter,
    Lesson
  }
};
</script>

<style scoped>

</style>
