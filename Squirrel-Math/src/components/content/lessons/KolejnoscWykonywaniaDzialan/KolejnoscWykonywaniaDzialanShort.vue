<template>
    <lesson routeShortVersion="/kolejnosc-wykonywania-dzialan-short" routeLongVersion="/kolejnosc-wykonywania-dzialan">
        <lesson-title-short>Kolejność wykonywania działań</lesson-title-short>    
        
        <lesson-chapter><template #title>Najpierw $:$ i $\cdot$ a potem $+$ i $-$</template> 

		$$6 + 3 \cdot 10 : 5 - 6 : 3 + 5 - 2 : 1 \cdot 4\\
		6\ \  + \ \ \color{#dd3333}{\bf 3 \cdot 10 : 5}\ \  -\ \ \color{#dd3333}{ \bf 6 : 3}\ \  +\ \ 5\ \  -\ \ \color{#dd3333}{\bf 2 : 1 \cdot 4}\\
		6\ \  + \ \ 6\ \  -\ \ 2\ \  +\ \ 5\ \  -\ \ 8\\
		7$$

		<p> 
			Działania matematyczne mogą składać się z kilku symboli dodawania, odejmowania, mnożenia i dzielenia w jednej linijce.
			Aby taki zapis nie powodował nieporozumień, wprowadzono umowę co do tego, w jaki sposób i w jakiej kolejności oblicza się wynik takiego działania.
			Najpierw lokalizujemy wszystkie wystąpienia iloczynów i ilorazów, czyli szukamy symboli $\cdot$ oraz $:$ .  
			Wykonujemy po kolei każde mnożenie i dzielenie, zaczynając od lewej strony działania i idąc w kierunku prawej:
		</p>

		<ul>
			<li>$ 3 \cdot 10 : 5 = 30 : 5 = 6 $</li>
			<li>$6 : 3 = 2$</li>
			<li>$2 : 1 \cdot 4 = 2 \cdot 4 = 8$</li>
		</ul>
		
		<p> 
			Wstawiamy otrzymane liczby w miejsce wystąpień obliczanych iloczynów i ilorazów, a na koniec dodajemy i odejmujemy kolejne liczby, czytając działanie od lewej i 
			posuwając się w kierunku prawej strony:
		</p>

		<ul>
			<li>Zaczynamy od liczby $6$. Zwiększamy ją o $6$ i otrzymujemy $12$</li>
			<li>Liczbę $12$ zmniejszamy o $2$ i dostajemy $10$</li>
			<li>Liczbę $10$ zwiększamy o $5$ i dostajemy $15$</li>
			<li>Liczbę $15$ zmniejszamy o $8$ i dostajemy $7$</li>
		</ul>

		<p> 
			Ostatecznym wynikiem jest $7$.
		</p>

		$$6 + 3 \cdot 10 : 5 - 6 : 3 + 5 - 2 : 1 \cdot 4 \ \ =\ \  6 + 30 : 5 - 2 + 5 - 2 \cdot 4 \ \ =\\
		=\ \ 6 + 6 - 2 + 5 - 8 \ \ =\ \  12 - 2 + 5 - 8 \ \ =\ \  10 + 5 - 8 \ \ =\ \  15 - 8 \ \ =\ \  7$$

		</lesson-chapter>

		<lesson-chapter><template #title>Dlaczego właśnie tak?</template>
		<p>
			Pierwszeństwo dzielenia i mnożenia względem dodawania i odejmowania wynika z tego, że są to działania "wyższego rzędu" - mnożenie
			wywodzi się z dodawania przez jego wielokrotne powtarzanie, zaś mnożenie i dzielenie są względem siebie odwrotne, czyli jakby równorzędne. 
			W pewnym sensie mnożenie i dzielenie są ważniejsze niż dodawanie i odejmowanie, dlatego wykonujemy je jako pierwsze w działaniach. 
			Mówimy, że mnożenie i dzielenie <i>wiążą mocniej</i> niż dodawanie i odejmowanie.
		</p>
		</lesson-chapter>

		<lesson-chapter><template #title>Zastosowanie nawiasów</template>
			Ubierając fragment działania matematycznego w nawiasy, oznajmiamy, że chcemy obliczyć działania wewnątrz nawiasu w pierwszej kolejności. 
			Możemy w ten sposób wymusić pierwseństwo dodawania i odejmowania. Działanie $5 \cdot (7 + 7)$ wykonujemy, 
			zaczynając od wyrażenia w nawiasie, a więc $5 \cdot (7 + 7) = 5 \cdot 14 = 70$. Gdyby działanie zostało zapisane bez nawiasu, obliczalibyśmy je jako
			$5 \cdot 7 + 7 = 35 + 7 = 42$.
		</lesson-chapter>

		<lesson-chapter><template #title>Zwięzła reguła</template>
		<div class="formula">
			<p align="left" style="margin: 0">
				W dowolnym działaniu obliczenia wykonujemy według kolejności:
			</p>
			<ol style="margin-top: 0">
				<li style="text-align: left">Działania w nawiasach;</li>
				<li style="text-align: left">Mnożenie i dzielenie w kolejności występowania;</li>
				<li style="text-align: left">Dodawanie i odejmowanie w kolejności występowania.</li>
			</ol>
		</div>
		</lesson-chapter>

		<lesson-chapter><template #title>Nawiasy w nawiasach</template>
		<p>
			Jeśli wewnątrz nawiasu pojawia się inny nawias, zacząć od wykonywania działań położonych w najbardziej wewnętrznym nawiasie.
		</p>

		$$
			2 \cdot (10 : (7 - (\color{#dd3333}{\bf 2 + 3})) + 2)\ \ = \ \ 2 \cdot (10 : (\color{#dd3333}{\bf 7 - 5}) + 2)\ \ =\ \ 
			2 \cdot (\color{#dd3333}{\bf 10 : 2 } + 2)\ \ =\ \ 2 \cdot (\color{#dd3333}{\bf 5 + 2})\ \ =\ \ 2 \cdot 7\ \ =\ \ 14
		$$

		<p>
			Gdy zapis z użyciem wielu nawiasów staje się nieprzejrzysty, można zastosować zapis z użyciem nawiasów kwadratowych i klamrowych albo 
			zapisywać bardziej zewnętrzne nawiasy jako większe.
		</p>

		$$ 
			2 \cdot \{ 10 : [ 7 - (2 + 3)] + 2 \} \\
			2 \cdot \Bigl(10 : \bigl(7 - (2 + 3) \bigr) + 2 \Bigr)
		$$
		</lesson-chapter>

		<lesson-chapter><template #title>Rozdzielność mnożenia względem dodawania</template>
		<p>
			Gdy mnożymy liczbę przez nawias, w którym występuje suma (lub różnica), możemy zdjąć nawias i pomnożyć tę liczbę przez każdy składnik w nawiasie: $9 \cdot (4 + 6) = 9 \cdot 4 + 9 \cdot 6$. Wynika to z prostej obserwacji: 
		</p>
		<ul>
			<li>$(4 + 6) \cdot 9 = 10 \cdot 9 = 9 + 9 + 9 + 9 + 9 + 9 + 9 + 9 + 9 + 9$</li>
			<li>$4 \cdot 9 + 6 \cdot 9 = 9 + 9 + 9 + 9\ \ \ \ +\ \ \ \ 9 + 9 + 9 + 9 + 9 + 9$</li>
		</ul>
		</lesson-chapter>

		<lesson-chapter><template #title>Nowe pojęcia</template>
		<p>
			<b>Przekształcenie</b> to zapisanie działania w innej formie, zwykle w celu dojścia w kilku krokach do wyniku obliczeń, np. $3 + 2 \cdot 4 = 3 + 8 = 11$.	
		</p>

		<p>
			Mnożenie i dzielenie wykonuje się w działaniach przed przystąpieniem do dodawania i odejmowania. Inaczej mówiąc, mnożenie i dzielenie <b>wiążą 
			mocniej</b> niż dodawanie i odejmowanie. W działaniu $3 + 2 \cdot 4$ dwójka jest związana z czwórką poprzez iloczyn mocniej niż z trójką poprzez sumę.
		</p>

		<p>
			<b>Zagnieżdżanie</b> nawiasów to zapisywanie nawiasów wewnątrz nawiasów. Stosujemy <b>nawiasy okragłe</b> $(\ )$, <b>nawiasy kwadratowe</b> $[\ ]$ i 
			<b>nawiasy klamrowe</b> $\{\ \}$.
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
  name: "KolejnoscWykonywaniaDzialanShort",
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
