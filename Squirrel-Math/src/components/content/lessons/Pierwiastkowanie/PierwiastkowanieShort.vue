<template>
    <lesson routeShortVersion="/pierwiastkowanie-short" routeLongVersion="/pierwiastkowanie">
        <lesson-title-short>Pierwiastkowanie</lesson-title-short>    
        
        <lesson-chapter><template #title>Czym jest pierwiastek</template> 
				<p> 
					Podobnie jak odejmowanie jest odwrotnością dodawania, a dzielenie odwrotnością mnożenia, tak pierwiastkowanie to odwrotność potęgowania. 
					Odpowiedź na pytanie "jaką liczbę należy podnieść do potęgi $3$ by otrzymać $8$", przynosi pierwiastkowanie: 
				</p>

				$$
					\sqrt[3]{125}=5
				$$

				<p> 
					Co jest równoważne z tym, że $5^3 = 125$. Powyższy zapis odczytujemy „pierwiastek trzeciego stopnia z $125$ wynosi $5$” i oznacza on 
					właśnie tyle, że $5$ podniesione do potęgi trzeciej daje $125$. Przy zapisie pierwiastka drugiego stopnia pomija się zapisywanie dwójki: 
					$\sqrt{9}$ jest tym samym, co $\sqrt[2]{9}$ i wynosi $3$, ponieważ $3^2 = 9$.
				</p> 

				<p>
					Formalnie definiujemy pierwiastek $n$-tego stopnia z liczby $a$ jako taką 
					liczbę $b$, że $n$-ta potęga liczby $b$ wynosi $a$ (symbol $\Leftrightarrow$ czytamy "jest równoważne z")
				</p>

				$$
					\sqrt[n]{a}=b \Leftrightarrow b^n=a
				$$

        <p>
					Jeśli stopień pierwiastka jest parzysty, zastrzega się, że $a$ oraz $b$ muszą być dodatnie. Nie wolno wyciągać pierwiastka parzystego 
					stopnia z liczb ujemnych: $\sqrt[2]{-4}$ nie istnieje, ponieważ nie ma liczby, która podniesiona do drugiej potęgi daje $-4$.
				</p>
        </lesson-chapter>					

        <lesson-chapter><template #title>Jak obliczać pierwiastki?</template> 
				<p> 
					Obliczenie pierwiastka polega na odgadnięciu takiej liczby, która podniesiona do odpowiedniej potęgi daje właściwy wynik.
				</p>
				<ul> 
					<li>$\sqrt{4} = 2$, ponieważ $2^2 = 4$</li>
					<li>$\sqrt{25} = 5$, ponieważ $5^2 = 25$</li> 
					<li>$\sqrt{0} = 0$, ponieważ $0^2 = 0$</li>
					<li>$\sqrt[3]{8} = 2$, ponieważ $2^3 = 8$</li>
					<li>$\sqrt[3]{-64} = -4$, ponieważ $(-4)^3 = -64$</li>
				</ul>
				<p> 
					Nie zawsze jednak obliczanie pierwiastka przychodzi tak łatwo. Aby obliczyć $\sqrt{2}$ trzeba znaleźć taką liczbę, która podniesiona do kwadratu daje $2$.
					Metodą prób i błędów można szacować, że jest to więcej niż $1,4$, ponieważ $1,4^2 = 1,96$ ale mniej niż $1,5$, ponieważ $1,5^2 = 2,25$. 
					Zwiększając dokładność, można określić, że jest to więcej niż $1,41$, ale mniej niż $1,42$. Odgadując kolejne cyfry po przecinku dotrzemy do postaci:
				</p>

				$$
					\sqrt{2}=1,414213562373095048801688724209698078569671875376948073176…
				$$

				<p> 
					W praktyce aby poznać przybliżoną postać dziesiętną pierwiastka, należy skorzystać z kalkulatora. Przeprowadzając obliczenia, w których pojawiają się 
					trudne do obliczenia pierwiastki, pozostawiamy ich zapis w niezmienionej postaci. W pewnym sensie takie pierwiastki będziemy traktować jak 
					"nieobliczalne".
				</p>
        </lesson-chapter>					

        <lesson-chapter><template #title>Liczby niewymierne</template> 
				<p> 
					Okazuje się, że $\sqrt{2}$ ma nieskończenie wiele cyfr po przecinku i nigdy nie pojawia się wśród nich okresowość. W związku z tym nie da się 
					przedstawić dokładnej wartości $\sqrt{2}$ w postaci ułamka zwykłego typu $\frac{p}{q}$. Z powodu takiego zachowania niektórych pierwiastków
					określa się je mianem <i>liczby niewymierne</i>. Poniższe rozumowanie wyjaśnia, dlaczego $\sqrt{2}$ nie może zostać zapisany w postaci 
					ułamka zwykłego.
				</p>

				<div class="proof">
					<div class="proof-sticker">Dowód</div>
					Zastanówmy się, czy jest możliwe, żeby $\sqrt{2}$ był liczbą wymierną. Gdyby tak było, moglibyśmy zapisać ten pierwiastek w postaci ułamka 
					zwykłego:
					$$
						\sqrt{2} = \frac{p}{q}
					$$
					gdzie $p$ i $q$ są jakimiś liczbami całkowitymi. Niech ułamek ten będzie zapisany w postaci nieskracalnej, to znaczy: zakładamy, że $p$ i $q$ nie 
					mają wspólnych dzielników. Powyższą równość możemy zapisać w równoważnej postaci:
					$$
						2 = \left(\frac{p}{q}\right)^2\\
						2 = \frac{p^2}{q^2}\\
						2 \cdot q^2 = p^2
					$$
					Powyższa równość mówi tyle: liczbę $p^2$ można zapisać jako iloczyn liczby $2$ i liczby całkowitej $q^2$. W takim razie $p^2$ na pewno 
					jest liczbą podzielną przez $2$. A skoro tak, to w nieunikniony sposób $p$ jest podzielne przez $2$. Ujmijmy to spostrzeżenie w formie 
					zapisu: $p = 2k$, gdzie $k$ jest jakąś liczbą całkowitą. W takim razie powyższą równość możemy zmodyfikować do postaci:
					$$
						2 \cdot q^2 = (2k)^2\\
						2 \cdot q^2 = 4 k^2\\
						q^2 = \frac{4 k^2}{2}\\
						q^2 = 2 k^2
					$$
					Dochodzimy do spostrzeżenia analogicznego, jak w poprzednim akapicie: liczbę $q^2$ można zapisać jako iloczyn liczby $2$ i liczby całkowitej $k^2$, 
					co oznacza, że $q$ musi być podzielne przez $2$. Przypomnijmy sobie teraz założenie, którego dokonaliśmy na samym początku: ułamek $\frac{p}{q}$ miał 
					być zapisany w postaci nieskracalnej. A okazało się, że zarówno $p$, jak i $q$, są podzielne przez $2$. Nastąpiła sprzeczność. Próbowaliśmy 
					zapisać $\sqrt{2}$ w postaci ułamka nieskracalnego, a okazało się, że ułamek ten nie może być nieskracalny. Stąd wniosek, że próba zapisu 
					pierwiastka z dwóch w postaci ułamka zwykłego jest skazana na porażkę. Pierwiastek z dwóch nie może być liczbą wymierną. $□$
				</div>
        </lesson-chapter>					

        <lesson-chapter><template #title>Potęgi z wykładnikiem ułamkowym</template> 
				<p> 
					Określimy teraz definicję potęgi dla wykładnika wymiernego. Dla dowolnej liczby $a$ oraz całkowitych $m$ i $n$ definiujemy:
				</p>

				$$
					a^{\frac{n}{m}}=\sqrt[m]{a}^n
				$$

				<p> 
					Na przykład $3^\frac{1}{2} = \sqrt{3}$ ponieważ $\left(3^\frac{1}{2} \right)^2 = 3$ tak samo jak $\left( \sqrt{3} \right)^2 = 3$. Podobnie 
					$5^\frac{3}{7} = \sqrt[7]{5}^3$, ponieważ $5^\frac{3}{7} = 5^{\frac{1}{7} \cdot 3} = \left( 5^\frac{1}{7} \right)^3 = \sqrt[7]{5}^3$.
				</p>

				<p> 
					Należy zachować wysoką ostrożność podczas podnoszenia ujemnych liczb do potęg z ułamkowym wykładnikiem. Jeśli mianownik ułamka jest nieparzysty, 
					można skorzystać z powyższej definicji, np. $(-8)^\frac{2}{3} = \sqrt[3]{-8}^2 = (-2)^2 = 4$, jednak jeśli mianownik jest parzysty, 
					działanie jest zabronione, np. nie wolno zapisać, że $(-9)^\frac{2}{2} = \sqrt{-9}^2$
				</p>

				<p> 
					W przypadku obliczania wyniku potęgowania liczby z wykładnikiem niewymiernym, można jedynie dokonywać przybliżeń wykładnika do postaci wymiernej, np.
					$3^\sqrt{2} \approx 3^{1,41}=3^{\frac{141}{100}}=\sqrt[100]{3}^{141}≈4,70696500172$
				</p>
        </lesson-chapter>					

        <lesson-chapter><template #title>Własności pierwiastkowania</template> 
				<p> 
					Dla pierwiastków zachodzą równości dość podobne do własności potęgowania. Dla dowolnych $a$, $b$, $n$ i $m$ (także niewymiernych) zachodzą:
				</p>

				<p class="formula">
					$$\sqrt[n]{\sqrt[m]{a}}=\sqrt[n \cdot m]{a}$$
				</p>
				<div class="proof">
					<div class="proof-sticker">
						Dowód
					</div>
					Oznaczmy wartość wyrażenia $\sqrt[n]{\sqrt[m]{a}}$ przez $x$. Zgodnie z definicją 
					pierwiastkowania:
					$$ \sqrt[n]{\sqrt[m]{a}}=x \Leftrightarrow \sqrt[m]{a}=x^n \Leftrightarrow a=(x^n )^m \Leftrightarrow a=x^{n \cdot m} \Leftrightarrow \sqrt[n \cdot m]{a}=x$$
					Zatem
					$$\sqrt[n]{\sqrt[m]{a}}=x=\sqrt[n \cdot m]{a}$$
				</div>
				<br><br>

				<p class="formula">
					$$\sqrt[n]{a \cdot b}=\sqrt[n]{a} \cdot  \sqrt[n]{b}$$
				</p>
				<div class="proof">
					<div class="proof-sticker">Dowód</div>
					Oznaczmy wartość wyrażenia $\sqrt[n]{a}$ przez $x$ oraz wartość wyrażenia 
					$ \sqrt[n]{b}$ przez $y$. Z definicji pierwiastkowania:
					$$\sqrt[n]{a}=x \Leftrightarrow a=x^n\\
						\sqrt[n]{b}=y \Leftrightarrow b=y^n$$
					Skoro $a=x^n$ oraz $b=y^n$, to $a \cdot b=x^n \cdot y^n=(x \cdot y)^n$. 
					Mamy więc
					$$a \cdot b=(x \cdot y)^n \Leftrightarrow \sqrt[n]{a \cdot b}=x \cdot y=\sqrt[n]{a} \cdot  \sqrt[n]{b}$$
				</div>
				<br><br>

				<p class="formula">
					$$\sqrt[n]{\frac{a}{b}}=\frac{\sqrt[n]{a}}{\sqrt[n]{b}}$$
				</p>
				<div class="proof">
					<div class="proof-sticker">Dowód</div>
					Oznaczmy wartość wyrażenia $\sqrt[n]{a}$ przez $x$ oraz wartość wyrażenia $
						\sqrt[n]{b}$ przez $y$. Z definicji pierwiastkowania:
					$$\sqrt[n]{a}=x \Leftrightarrow a=x^n \\
						\sqrt[n]{b}=y \Leftrightarrow b=y^n$$
					Skoro $a=x^n$ oraz $b=y^n$, to $\frac{a}{b}=\frac{x^n}{y^n} = \left(\frac{x}{y} \right)^n$. Mamy więc
					$$\frac{a}{b} = \left(\frac{x}{y} \right)^n \Leftrightarrow \sqrt[n]{\frac{a}{b}} = \frac{x}{y} = \frac{\sqrt[n]{a}}{\sqrt[n]{b}} $$
				</div>
        </lesson-chapter>					

				<lesson-chapter><template #title>Wyłączanie czynnika przed pierwiastek</template>  
				<p> 
					Jest to operacja polegająca na "spierwiastkowaniu liczby na tyle na ile można", czyli możliwym zminimalizowaniu cząstki, która pozostanie pod 
					pierwiastkiem jako nieobliczalna. Sprowadza się to do wykonania (przynajmniej częściowego) rozkładu na czynniki pierwsze liczby podpierwiastkowej:
				</p>

				$$
					\sqrt{20}=\sqrt{4 \cdot 5} = \sqrt{4} \cdot \sqrt{5} = 2 \cdot \sqrt{5}=2\sqrt{5}
				$$
				$$
					\sqrt{6804} = \sqrt{4 \cdot 1701} = 2\sqrt{1701} = 2\sqrt{9 \cdot 189} = 2 \cdot 3\sqrt{189} = 6\sqrt{9 \cdot 21} = 18\sqrt{21}
				$$
				$$
					\sqrt{20250} = \sqrt{3^2 \cdot 3^2 \cdot 5^2 \cdot 10} = 3 \cdot 3 \cdot 5 \cdot \sqrt{10}
				$$
        </lesson-chapter>					

				<lesson-chapter><template #title>Wyciąganie niewymierności z mianownika</template>
				<p> 
					Przyjęło się, że nieelegancki jest zapis liczby, która posiada pierwiastek w mianowniku i w związku z tym zaleca się dokonywać przekształceń, 
					w wyniku których pierwiastek przeniesie się z mianownika do licznika. Okazuje się, że przy szacowaniu wartości takiej liczby dokładniejsze 
					wyniki uzyskuje się mnożąc przez przybliżony pierwiastek niż dzieląc przez przybliżony pierwiastek.
				</p>  

				$$
					\frac{3}{\sqrt{2}} = \frac{3 \cdot \sqrt{2}}{\sqrt{2} \cdot \sqrt{2}} = \frac{3 \cdot \sqrt{2}}{\sqrt{2}^2} = \frac{3\sqrt{2}}{2}
				$$
				$$
					\sqrt{\frac{3}{5}} = \frac{\sqrt{3}}{\sqrt{5}} = \frac{\sqrt{3} \cdot \sqrt{5}}{\sqrt{5} \cdot \sqrt{5}} = \frac{\sqrt{3 \cdot 5}}{5} =
				\frac{\sqrt{15}}{5}
				$$
				$$
					\frac{7}{\sqrt[3]{6}} = \frac{7 \cdot \sqrt[3]{6} \cdot \sqrt[3]{6}}{\sqrt[3]{6} \cdot \sqrt[3]{6} \cdot \sqrt[3]{6}} = \frac{7\sqrt[3]{36}}{6}
				$$
				$$
					\frac{5}{2+\sqrt{3}} = \frac{5 \cdot (2-\sqrt{3})}{(2+\sqrt{3}) \cdot (2-\sqrt{3})} = \frac{10-5\sqrt{3}}{2^2-\sqrt{3}^2} = \frac{10-5\sqrt{3}}{4-3} 
					= \frac{10-5\sqrt{3}}{1} = 10-5\sqrt{3}
				$$
				$$
					\frac{1}{2+\sqrt[3]{5}} = \frac{2^2-2\sqrt[3]{5}+\sqrt[3]{5}^2}{(2+\sqrt[3]{5}) \cdot (2^2-2\sqrt[3]{5}+\sqrt[3]{5}^2 )} =
					\frac{4-2\sqrt[3]{5}+\sqrt[3]{25}}{2^3+\sqrt[3]{5}^3} = \frac{4-2\sqrt[3]{5}+\sqrt[3]{25}}{8+5} =
					\frac{4-2\sqrt[3]{5}+\sqrt[3]{25}}{13}
				$$
        </lesson-chapter>					

				<lesson-chapter><template #title>Nowe pojęcia</template>
				<p>
					Gdy wykonujemy pierwiastkowanie, liczbę, której z której pierwiastek wyciągamy, nazywamy <b>liczbą podpierwiastkową</b>, 
					a liczba zapisana po lewej stronie nad symbolem pierwiastka to <b>stopień pierwiastka</b>. W zapisie $\sqrt[5]{243} = 3$ liczba 
					$243$ jest liczbą podpierwiastkową, a $5$ to stopień pierwiastka.
				</p>

				<p> 
					<b>Pierwiastek kwadratowy</b> to pierwiastek drugiego stopnia. Zwyczajowo nie zapisuje się stopnia pierwiastka kwadratowego, np. $\sqrt{36} = 6$.<br>
					<b>Pierwiastek sześcienny</b> to pierwiastek trzeciego stopnia, np. $\sqrt[3]{216} = 6$.
				</p>

				<p> 
					<b>Liczby niewymierne</b> to liczby, których rozwinięcie dziesiętne jest nieskończone i nieokresowe. Liczba niewymierna nie daje się zapisać 
					w postaci ułamka zwykłego. Wszystkie pierwiastki z liczb całkowitych, które nie dają w wyniku liczby całkowitej, są niewymierne, np. $\sqrt{5}$.<br> 
					<b>Liczby rzeczywiste</b> to zbiorcze określenie liczb wymiernych i niewymiernych. 
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
  name: "PierwiastkowanieShort",
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