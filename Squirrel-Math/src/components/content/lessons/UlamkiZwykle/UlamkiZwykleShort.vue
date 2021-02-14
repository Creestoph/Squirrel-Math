<template>
    <lesson routeShortVersion="/ulamki-zwykle-short" routeLongVersion="/ulamki-zwykle">
        <lesson-title-short>Ułamki zwykłe</lesson-title-short>    
        
    <lesson-chapter><template #title>Czym są ułamki?</template> 
		<p>
			Liczby naturalne pozwalają jedynie na opis "pełnych", "całych" liczb jak $1$, $2$, $3$, 
			$...$ i nie dają sposobu na wyrażenie "połówek".
			Do zapisu części całości stosuje się ułamki. Jeśli dzielimy tort na $8$ kawałków i bierzemy spośród nich $3$ 
			kawałki, to bierzemy $\frac{3}{8}$ tortu.
			Ułamek ten czytamy jako "trzy ósme". Liczba u góry to <i>licznik ułamka</i>, a liczba na dole to <i>mianownik ułamka</i>. Pozioma kreska
			to <i>kreska ułamkowa</i>. 
		</p>
		</lesson-chapter>

    <lesson-chapter><template #title>Kreska ułamkowa zastępuje znak dzielenia</template> 
		<p> 
			Ułamek to po prostu inny sposób na zapisanie dzielenia. $\frac{3}{8}$ jest tym samym, co $3 : 8$. Gdyby trzy torty rozdzielić pomiędzy ośmiu gości, 
			każdy dostałby $\frac{3}{8}$ tortu. Możemy przyjąć, że ułamek $\frac{3}{8}$ jest wynikiem dzielenia $3 : 8$, czyli $3 : 8 = \frac{3}{8}$
		</p>

		<p> 
			<i>Ułamki piętrowe</i> zawsze można uprościć do formy składającej się z dzielenia:
		</p>

		$$
			\frac{3 + \frac{1}{2}}{\frac{3}{4} - 1} = (3 + 1 : 2) : (3 : 4 - 1)
		$$
		</lesson-chapter>

		<lesson-chapter><template #title>Wyciaganie całości z ułamka</template> 
		<p>
			Jeśli w liczniku ułamka znajduje się liczba większa lub taka sama jak w mianowniku, to ułamek taki nazywamy <i>niewłaściwym</i>. 
			<i>Ułamek właściwy</i> ma w liczniku liczbę mniejszą niż w mianowniku. Każdy ułamek niewłaściwy można zapisać w postaci <i>liczby mieszanej</i>, 
			czyli składającej się z części całkowitej i ułamkowej. Np. $\frac{7}{3} = 2 \frac{1}{3}$ ponieważ dzieląc siedem obiektów na trzy równe grupy, 
			dostaniemy na każdej z nich dwa całe przedmioty i jeden rozdzielony na trzy.
		</p>

		<center><img src="./.images/Screenshot_2.png" align="middle"></center>

		<p>
			Aby wyciągnąć całości z ułamka niewłaściwego (czyli zapisać go w postaci liczby mieszanej) wykonujemy dzielenie z resztą: $\frac{17}{5} = 3 \frac{2}{5}$, 
			ponieważ $17 : 5 = 3\ r. 2$.
		</p>

		<p>
			Aby wciągnąć całości do ułamka, wykonujemy odwrotną operację, czyli mnożymy całości przez mianownik i dodajemy do licznika:  
			$4 \frac{1}{3} = \frac{4 \cdot 3 + 1}{3} = \frac{13}{3} $
		</p>
		</lesson-chapter>

		<lesson-chapter><template #title>Rozszerzanie i skracanie ułamków</template> 
		<div class="row">
			<div class="col text-center"><img src="./.images/Screenshot_5.png" align="middle"></div>
			<div class="col text-center"><img src="./.images/Screenshot_6.png" align="middle"></div>
			<div class="col text-center"><img src="./.images/Screenshot_7.png" align="middle"></div>
		</div>

		$$
			\frac{3}{8} = \frac{6}{16} = \frac{9}{24}
		$$

		<p>
			Gdy pomnożymy licznik i mianownik ułamka przez tą samą wartość, jego wartość się nie zmienia. Na podobnej zasadzie jeśli licznik 
			i mianowni ułamka podzielimy przez tą samą wartość, jego wartość nie ulegnie zmianie:
		</p>

		$$
			\frac{4}{8} = \frac{2}{4} = \frac{1}{2}
		$$

		<p>
			Jeśli licznika i mianownika nie da się podzielić przez żadną liczbę (oprócz $1$), to jego postać nazywamy <b>nieskracalną</b>. Aby sprowadzić 
			ułamek do postaci nieskracalnej, należy podzielić jego licznik i mianownik przez ich $NWD$. Nieskracalne są np. $\frac{3}{5}$, $\frac{21}{10}$, 
			a skracalne są ich równoważne postaci $\frac{9}{15}$, $\frac{42}{20}$. Dobrze jest sprowadzać ułamki do postaci nieskracalnej, 
			by nie wykonywać obliczeń na niepotrzebnie dużych liczbach.
		</p>

		<p>
			Mając dwa ułamki o różnych mianownikach możemy rozszerzyć obydwa ułamki tak, by ich mianowniki stały się równe. Taka operacja nazywa się 
			<b>sprowadzeniem do wspólnego mianownika</b>. Po sprowadzeniu ułamków $\frac{4}{5}$ i $\frac{3}{4}$ do wspólnego mianownika dostaniemy 
			$\frac{16}{20}$ i $\frac{15}{20}$.
		</p>
		</lesson-chapter>

		<lesson-chapter><template #title>Dodawanie i odejmowanie ułamków</template> 
		<p>
			Aby dodać/odjąć dwa ułamki, sprowadzamy je do wspólnego mianownika, a następnie dodajemy/odejmujemy ich liczniki. 
			$$
				\frac{1}{6} + \frac{3}{4} = \frac{2}{12} + \frac{9}{12} = \frac{11}{12}
			$$
			$$
				\frac{1}{2} - \frac{2}{5} = \frac{5}{10} - \frac{4}{10} = \frac{1}{10}
			$$
		</p>
		</lesson-chapter>

		<lesson-chapter><template #title>Mnożenie ułamków</template> 
			<p> 
				Aby pomnożyć dwa ułamki, mnożymy przez siebie ich liczniki oraz ich mianowniki.
			</p>
			$$
				\frac{3}{4} \cdot \frac{5}{7} = \frac{3 \cdot 5}{4 \cdot 7} = \frac{15}{28}
			$$
			$$
				5 \cdot \frac{2}{13} = \frac{5 \cdot 2}{13} = \frac{10}{13}
			$$
		</lesson-chapter>

		<lesson-chapter><template #title>Dzielenie ułamków</template>
		<p>
			Aby podzielić przez ułamek, należy zamienić miejscami jego licznik i mianownik i wykonać mnożenie przez otrzymaną <i>odwrotność</i>
		</p>

		$$
			\frac{3}{7} : \frac{2}{5} = \frac{3}{7} \cdot \frac{5}{2} = \frac{3 \cdot 5}{7 \cdot 2} = \frac{15}{14}
		$$
		$$
			\frac{5}{3} : 2 = \frac{5}{3} \cdot \frac{1}{2} = \frac{5 \cdot 1}{3 \cdot 2} = \frac{5}{6}
		$$
		</lesson-chapter>

		<lesson-chapter><template #title>Porównywanie ułamków</template>
		<p>
			Jeśli ułamki mają równe mianowniki, większy jest ten ułamek, który ma większy licznik.<br>
			Jeśli ułamki mają równe liczniki, większy jest ten ułamek, który ma mniejszy mianownik.
		</p>

		$$
			\frac{3}{7} \lt \frac{5}{7}
		$$

		$$
			\frac{5}{22} \lt \frac{5}{21}
		$$

		</lesson-chapter>

		<lesson-chapter><template #title>Nowe pojęcia</template>
		<p>
			<b>Liczby wymierne</b> to liczby zapisywane za pomocą ułamków zwykłych. Stanowią rozszerzenie pojęcia liczb naturalnych (oraz liczb całkowitych).
		</p>

		<p>
			<b>Licznik ułamka</b> to liczba zapisywana w ułamku nad poziomą kreską.<br>
			<b>Mianownik ułamka</b> to liczba zapisywana w ułamku pod poziomą kreską.<br>
			<b>Kreska ułamkowa</b> to właśnie pozioma linia oddzielająca licznik od mianownika
		</p>

		<p>
			<b>Ułamek piętrowy</b> to ułamek mający w liczniku lub mianowniku inny ułamek. Można wyróżnić w nim <b>kreskę główną</b>, która oddziela 
			rozbudowany licznik od rozbudowanego mianownika.
		</p>

		<p>
			<b>Ułamek właściwy</b> posiada licznik mniejszy od mianownika, np. $\frac{4}{5}$<br>
			<b>Ułamek niewłaściwy</b> posiada licznik większy od mianownika lub równy mianownikowi, np. $\frac{6}{5}<br>
			<b>Liczba mieszana</b> to inny zapis ułamka niewłaściwego ujawniający jego <b>część całkowitą</b> i <b>część ułamkową</b>, np. $1 \frac{1}{5}$
		</p>

		<p>
			<b>Rozszerzanie ułamka</b> odbywa się poprzez mnożenie licznika i mianownika przez tę samą wartość, np. $\frac{3}{7} = \frac{3 \cdot 2}{7 \cdot 2} = \frac{6}{14}$<br>
			<b>Skracanie ułamka</b> odbywa się poprzez podzielenie licznika i mianownika przez tę samą wartość, np. $\frac{16}{12} = \frac{16 : 4}{12 : 4} = \frac{4}{3}$<br>
			Ułamek jest w <b>postaci nieskracalnej</b>, jeśli licznik i mianownik nie mają wspólnego dzielnika innego niż $1$
		</p>

		<p>
			<b>Odwrotność (liczba odwrotna)</b> powstaje przez zamianę miejscami licznika i mianownika. Liczbą odwrotną do $\frac{2}{5}$ jest $\frac{5}{2}$. Liczbą odwrotną 
			do $8$ jest $\frac{1}{8}$. $0$ Nie posiada odwrotności.
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
