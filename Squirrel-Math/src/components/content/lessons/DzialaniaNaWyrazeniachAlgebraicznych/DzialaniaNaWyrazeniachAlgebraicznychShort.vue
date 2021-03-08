<template>
    <lesson routeShortVersion="/dzialania-na-wyrazeniach-algebraicznych-short" routeLongVersion="/dzialania-na-wyrazeniach-algebraicznych">
        <lesson-title-short>Działania na wyrażeniach algebraicznych</lesson-title-short>    
        
        <lesson-chapter><template #title>Mnożenie jednomianów</template> 
		<p> 
			Jednomian to dowolny iloczyn liczb i zmiennych, wobec czego iloczyn dwóch jednomianów również jest jednomianem. W celu zachowania 
			przejrzystości zapisu powinno się porządkować jednomiany, czyli zapisywać współczynnik liczbowy z przodu, a zmienne literowe, które 
			się powtarzają, spakować do pojedynczej potęgi.
		</p>

		<ul>
			<li>$a \cdot 3 \cdot a \cdot 5 \cdot b \cdot a \cdot b \cdot a^3 \cdot (-2) \cdot b^2=-30a^6 b^4$</li>
			<li>$\frac{c}{3} \cdot \frac{b^2}{2} \cdot d \cdot a^3 \cdot 6=a^3 b^2 cd$</li>
			<li>$bogdan \cdot ma \cdot 2 \cdot jajca=2a^4 bcdgj^2 mno $</li>
			<li>$masło=słoma=ałmos$</li>
		</ul>
        </lesson-chapter>			

        <lesson-chapter><template #title>Dodawanie jednomianów</template> 
		<p> 
			Dodane do siebie wielomiany stanowią sumę algebraiczną. Uporządkowanie sumy polega na <i>redukcji wyrazów podobnych</i>, czyli połączeniu 
			w pojedyncze jednomiany te składniki, które składają się z tych samych liter, a różnią się ewentualnie tylko współczynnikiem liczbowym.
		</p>

		$$\color{#000000}{2ab} + \color{#dd3333}{3mn} + \color{#000000}{7ab} + \color{#dd3333}{5mn} - \color{#ffaaaa}{10m} + \color{#aaaaaa}{5n}\ \ =\ \  
			\color{#000000}{9ab} + \color{#dd3333}{ 8mn} - \color{#ffaaaa}{10m} + \color{#aaaaaa}{5n}$$

		$$4abc + 3cba +  \color{#dd3333}{2abd} - \color{#ffaaaa}{4dac} + 5bca + 6cab +  \color{#dd3333}{abd} - acb +  \color{#dd3333}{adb} + \color{#ffaaaa}{6cad} 
			\ \ =\ \  17abc + \color{#dd3333}{4abd} + \color{#ffaaaa}{2acd}$$	

		$$aab + aba + \color{#dd3333}{bba} + \color{#ffaaaa}{ab} + \color{#dd3333}{bab} + \color{#aaaaaa}{abba} + \color{#ffaaaa}{ba} 
			\ \ =\ \  2a^2b + \color{#dd3333}{2ab^2} + \color{#ffaaaa}{2ab} + \color{#aaaaaa}{a^2b^2}$$
        </lesson-chapter>			

        <lesson-chapter><template #title>Odejmowanie sumy algebraicznej</template> 
		<p> 
			Jeśli przed nawiasem zawierającym sumę stoi minus, należy zdjąć nawias, a każdemu ze składników wewnątrz odwrócić znak z 
			dodatniego na ujemny i z ujemnego na dodatni.
		</p>

		$$(3a-2b+c)-(6a+5b-3c)\ \ =\ \ 
		3a-2b+c-6a-5b+3c\ \ =\ \ 
		-3a-7b+4c\\$$
		$$-(2a^2 b-3abc+3ab+abc)-(-3ab+a^2 b-abc+3abc+2ab)=\\
		=-2a^2 b+3abc-3ab-abc+3ab-a^2 b+abc-3abc-2ab=\\
		=-3a^2 b-2ab$$
        </lesson-chapter>			

        <lesson-chapter><template #title>Mnożenie sum algebraicznych</template> 

		<p> 
			Aby pomnożyć jednomian przez sumę algebraiczną, należy pomnożyć go przez każdy ze składników tej sumy
		</p>

		<center><img src="./.images/Screenshot_8.png" align="middle"></center>

		$$
			a(b+c)=ab+ac
		$$

		<p> 
			Aby uprościć wyrażenie zawierające mnożenie nawiasów, należy pomnożyć każdy składnik pierwszego nawiasu przez każdy składnik drugego wyrazu.
		</p>

		<center><img src="./.images/Screenshot_9.png" align="middle"></center>

		<center><img src="./.images/Screenshot_10.png" align="middle"></center>

		<p> 
			Oto kilka przykładów:
		</p>

		$$(a+b+c)(a+b)\ \ =\ \ 
		(a^2+ab)+(ba+b^2)+(ca+cb)\ \ =\ \ 
		a^2+2ab+b^2+ac+bc$$

		$$(2a-3b)(3a^2+4ab^3 )\ \ =\ \ 
		2a \cdot 3a^2+2a \cdot 4ab^3-3b \cdot 3a^2-3b \cdot 4ab^3\ \ =\ \ 
		6a^3+8a^2 b^3-9a^2 b-12ab^4$$

		$$-(2a-2b)(3b^2-6a^2 )\ \ =\ \ 
		-(2a \cdot 3b^2+2a \cdot (-6a^2 )-2b \cdot 3b^2-2b \cdot (-6a^2 ))=\\
		-(6ab^2-12a^3-6b^3+12a^2 b)\ \ =\ \ 
		-6ab^2+12a^3+6b^3-12a^2 b$$

		$$(a+b)(b+c)(a+c)\ \ =\ \ 
		(ab+ac+b^2+bc)(a+c)=\\
		=(a^2 b+a^2 c+ab^2+abc) + (abc+ac^2+b^2 c+bc^2)\ \ =\ \ 
		a^2 b+a^2 c+ab^2+b^2 c+ac^2+bc^2+2abc$$

        </lesson-chapter>			

        <lesson-chapter><template #title>Potęgowanie wyrażeń algebraicznych</template> 
		<p> 
			Aby sprawnie wykonywać podnoszenie sum algebraicznych do naturalnych potęg, wykorzystuje się <i>wzory skróconego mnożenia</i>:
		</p>

		<ul class="formula">
			<li style="text-align: left">Kwadrat sumy: $(a+b)^2=a^2+2ab+b^2$</li>	
			<li style="text-align: left">Kwadrat różnicy: $(a-b)^2=a^2-2ab+b^2$</li>
			<li style="text-align: left">Różnica kwadratów: $(a-b)(a+b)=a^2-b^2\\$</li>
			<li style="text-align: left">Sześcian sumy: $(a+b)^3=a^3+3a^2 b+3ab^2+b^3$</li>
			<li style="text-align: left">Sześcian różnicy: $(a-b)^3=a^3-3a^2 b+3ab^2-b^3$</li>
			<li style="text-align: left">Suma sześcianów: $(a+b)(a^2-ab+b^2 )=a^3+b^3$</li>
			<li style="text-align: left">Różnica sześcianów: $(a-b)(a^2+ab+b^2 )=a^3-b^3$</li>
		</ul>

		<p> 
			W powyższych wzorach litery $a$ i $b$ należy traktować jak okienka, w które można wstawić dowolne liczby lub wyrażenia algebraiczne, 
			nieważne jak bardzo rozbudowane:
		</p>

		$$(3n^2m+5nm)^2=(3n^2 m)^2+2(3n^2 m)(5nm)+(5nm)^2=9n^4 m^2+30n^3 m^2+25n^2 m^2$$
		$$99^3 = (100 - 1)^3 = 100^3 - 3 \cdot 100^2 \cdot 1 + 3\cdot 100 \cdot 1^2 - 1 = 1\ 000\ 000 - 30\ 000 + 300 - 1 = 970\ 299$$
		$$(a+b+c)^2=(a+b)^2+2(a+b)c+c^2=a^2+2ab+b^2+2ac+2bc+c^2=\\
			=a^2+b^2+c^2+2ab+2ac+2bc$$
		$$51 \cdot 49 = (50 + 1)(50 - 1) = 50^2 - 1^2 = 2500 - 1 = 2499$$
        </lesson-chapter>			

        <lesson-chapter><template #title>Wyłączanie czynnika przed nawias</template> 
		<p> 
			Jest to operacja odwrotna do wymnażania nawiasów: z postaci przedstawiającej sumę jednomianów próbujemy uzyskać iloczyn sum algebraicznych. 
			W przyszłości zależnie od kontekstu jedna z tych dwóch postaci będzie dla nas bardziej użyteczna.
		</p>

		$$4ab+6ac=2a(2b+3c)$$
		$$-12a-15b=-3(4a+5b)$$
		$$12a^2 b+15a^3 b^4 c^5+21a^5 b^3 c = 3a^2 b(4+5ab^3 c^5+7a^3 b^2 c)$$
		$$-2m^3-4n^4 m^5-8k^5 m^3=-2m^3(1+2n^4 m^2+4k^5)$$
        </lesson-chapter>			

        <lesson-chapter><template #title>Działaia na ułamkach algebraicznych</template> 
		<p> 
			Podobnie jak w przypadku ułamków zwykłych: aby dodać lub odjąć ułamki, należy sprowadzić je do wspólnego mianownika; aby pomnożyć ułamki, 
			należy pomnożyć ich liczniki i mianowniki; aby podzielić ułamki, należy wykonać mnożenie przez odwrotność.
		</p>

		$$
			\frac{3a^2+2b^2}{ab}-\frac{(2a+3b) \cdot a}{b \cdot a} = \frac{3a^2+2b^2}{ab}-\frac{2a^2+3ab}{ab} = 
			\frac{3a^2+2b^2-(2a^2+3ab)}{ab} = \frac{a^2-3ab+2b^2}{ab}
		$$

		$$\frac{a}{c} \cdot \frac{6ab}{d} \cdot \frac{a^2 c}{2bd^2} \cdot \frac{4cd}{ba^2} = 
			\frac{\require{cancel} a }{\cancel {c}} \cdot \frac{\cancel{6}^3 a \cancel{b}}{5} \cdot \frac{\cancel{a^2} \cancel{c}}{\cancel{2} \cancel{b} d^\cancel{2}} \cdot \frac{4c\cancel{d}}{b\cancel{a^2}} =
			\frac{12a^2c}{5bd}$$

		$$\frac{x+y}{3} : \frac{2}{x-y} = \frac{x+y}{3} \cdot \frac{x-y}{2} = \frac{(x+y)(x-y)}{3 \cdot 2} = \frac{x^2-y^2}{6}$$
        </lesson-chapter>			

    </lesson>
</template>

<script>
import LessonTitleShort from "../../../lesson/LessonTitleShort";
import LessonIntro from "../../../lesson/LessonIntro";
import LessonChapter from "../../../lesson/chapter/LessonChapter";
import Lesson from "../../../lesson/Lesson.vue";

export default {
  name: "DzialaniaNaWyrazeniachAlgebraicznychShort",
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
