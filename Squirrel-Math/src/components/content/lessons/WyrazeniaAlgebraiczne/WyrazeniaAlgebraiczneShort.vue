<template>
  <lesson>
    <lesson-title-short>Wyrażenia algebraiczne</lesson-title-short>    
        
			<lesson-chapter><template #title>Litery zamiast liczb </template>		
			<p>
				Aby wyrazić w matematyczny sposób uniwersalne obserwacje, własności czy zależności, stosuje się oznaczenia literowe które zastępują liczby 
				zapisane cyframi. Spójrzmy na pewien <i>wzór</i> matematyczny, który ma zastosowanie w dietetyce:

				$$
					BMI=\frac{waga}{wzrost \cdot wzrost}
				$$

				Z jego pomocą każdy może obliczyć swój "wskaźnik BMI" podstawiając do powyższego wzoru swoją wagę w kilogramach i wzrost w metrach (w dietetyce wskaźnik 
				ten pomaga ocenić, czy dana osoba ma prawidłową sylwetkę: jeśli wskaźnik BMI jest mniejszy niż 18,5, to osba ma niedowagę, a jeśli większy niż 25, to 
				osoba ma nadwagę). Powyższy wzór można by zapisać słownie: 

				$$
					\text{Aby uzyskać wskaźnik BMI, bierzemy swój wzrost w metrach i mnożymy jego wartość przez samą siebie,} \\
					\text{a następnie dzielimy swoją wagę w kilogramach przez uzyskany wynik}
				$$

				jednak takie jego sformułowanie jest znacznie dłuższe niż poprzedni zapis symboliczny. Aby zapis był jeszcze prostszy, zamiast całych słów "wzrost" i 
				"waga" stosuje się pojedyncze litery:

				$$
					B=\frac{m}{h \cdot h}
				$$

				Wybór liter jest dowolny, należy jednak wyjaśnić, co mają one oznaczać. Po zapisaniu wzoru takiego, jak powyższy, powinno się wyjaśnić, że $B$
				symbolizuje obliczany wskaźnik BMI, $m$ jest masą ciała w kilogramach, zaś $h$ to wzrost w metrach. 
			</p>

			<p>
				Litery $B$, $m$ i $h$ 
				możemy traktować jak tymczasowe oznaczenia, zamiast których należy ostatecznie wstawić prawdziwe wartości liczbowe. Gdy chcemy 
				obliczyć wskaźnik osoby, która waży $72 \text{ kg}$ i ma wzrost $1,8 \text{ m}$, wystarczy wstawić te wartości do wzoru: 
			</p>

			$$
				B = \frac{72}{1,8 \cdot 1,8} = 22,(2)
			$$

			<p>
				Uzyskany wynik oznacza, że waga osoby jest w normie. Gdy chcemy obliczyć wskaźnik dla innej osoby, wystarczy wstawić inne wartości $m$ i $h$.
			</p>
			</lesson-chapter>

			<lesson-chapter><template #title>Nowe pojęcia</template>	
			<p>
				<b>Arytmetyka</b> to dział matematyki zajmujący się wykonywaniem działań na liczbach; dotychczasowe lekcje o dodawaniu, dzieleniu itd. dotyczyły 
				właśnie arymetyki.<br>
				<b>Algebra</b> to dział matematyki operujący liczbach w bardziej abstrakcyjnym sensie, wykorzystującym zapis literowy.
			</p>

			<p>
				<b>Wzór</b> to równość wyrażona za pomocą liter. Po wstawieniu w miejsce liter znanych wartości zmiennych, możemy obliczyć interesującą nas 
					nieznaną wartość. Wzór na wskaźnik BMI przedstawia się jako $B=\frac{m}{h \cdot h}$.
			</p>

			<p>
				<b>Zmienne</b> to litery, pod które wolno podstawić dowolną wartość liczbową - taką, jaka nas interesuje w pewnym kontekście. Zależności czy też 
				wzory wykorzystujące zmienne powinny być słuszne bez względu na to, jakie liczby przypiszemy pod zmienne.<br>
				<b>Stałe</b> to konkretne, ustalone wartości liczbowe, które nazwano pewną literą, choćby dlatego, że taki zapis jest krótszy. Przeprowadzając 
				pewne obliczenia, można się umówić, że np. litera $c$ będzie oznaczać wartość $299\ 792\ 458$, która często pojawia się w działaniach, a ma 
				uciążliwie długi zapis.<br>
				<b>Niewiadome</b> to litery, oznaczające wartość, którą chcemy poznać. Więcej na ich temat w lekcji "Równania".<br>
				Możemy uznać, że oznaczenia literowe pojawiają się w matematyce w jednym z powyższych trzech kontekstów. We wzorze $B=\frac{m}{h \cdot h}$ możemy uznać
				$m$ i $h$ za zmienne, a $B$ za niewiadomą, której wartość chcemy obliczyć.
			</p>

			<p>
				<b>Indeksy dolne</b> służą do numerowania zmiennych. Czasami zdarza się, że zajdzie potrzeba nazwania literami dość dużej gromady liczb, 
				które opisują wielkości tego samego typu. Możemy np. oznaczyć przez $p_1$, $p_2$, $p_3$, $p_4$, $p_5$, $p_6$, $p_7$, $p_8$, $p_9$, $p_{10}$, $p_{11}$, 
				$p_{12}$ pensję 
				otrzymywaną w kolejnych miesiącach. Indeksem (dolnym) nazywamy małą liczbę zapisaną obok oznaczenia literowego. (Indeksy górne wykorzystywane są 
				przy "Potęgowaniu", które nadejdzie w niedalekiej lekcji).
			</p>

			<p>
				<b>Wyrażenie algebraiczne</b> to dowolne działanie zapisane z użyciem liter, np. $a \cdot b \cdot c + b : a$ lub $\frac{p}{q}$ lub $32xyz$. Przyjęło się,  
				że znak mnożenia pomiędzy literami (lub literami i liczbami) nie jest zapisywany. $32xyz$ jest skróconym zapisem wyrażenia $32 \cdot x \cdot y \cdot z$.<br>
				<b>Jednomian</b> to wyrażenie składające się jedynie z iloczynów; może w nim występować dowolnie dużo liter oraz liczb zapisanych cyframi, przy czym 
				liczby te niekoniecznie muszą być naturalne, mogą np. być ułamkami. Przykłady jednomianów to $32xyz$ lub $5 \cdot n \cdot 4 \cdot m$ lub $\frac{1}{3}xyz$<br>
				<b>Współczynnik jednomianu</b> to jego czynnik będący liczbą zapisaną za pomocą cyfr. Dla jednomianu $32xyz$ jest to $32$, dla jednomianu 
				$5 \cdot n \cdot 4 \cdot m$ wspołczynnikiem jest $20$, a dla $\frac{xyz}{3}$ współczynnikiem jest $\frac{1}{3}$.<br>
				<b>Suma algebraiczna</b> to wyrażenie będące sumą jednomianów, np. $5ab+6m+5,5gh$
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
  name: "UlamkiZwykleShort",
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
