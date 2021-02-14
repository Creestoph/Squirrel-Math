<template>
    <lesson routeShortVersion="/ulamki-dziesietne-short" routeLongVersion="/ulamki-dziesietne">
        <lesson-title-short>Ułamki dziesiętne</lesson-title-short>    
        
		<lesson-chapter><template #title>Czym są ułamki dziesiętne?</template> 
		<p>
			Ułamek dziesiętny to inny sposób zapisu ułamka zwykłego. Składa się on z części całkowitej i części ułamkowej rozdzielonych przecinkiem.
			Liczbę po przecinku można traktować jak licznik, którego mianownik to $10$, jeśli po przecinku jest jedna cyfra, $100$, jeśli po przecinku 
			są dwie cyfry, $1000$, jeśli po przecinku są trzy cyfry itd:
		</p>
		<ul>
			<li>$21,7 = 21 \frac{7}{10} = \frac{217}{10}$</li>
			<li>$0,74 = \frac{74}{100}$</li>
			<li>$1,00005 = 1 \frac{5}{100\ 000}$</li>
			<li>$6,0 = 6$</li>
		</ul>
		<p> 
			Zapis ułamka w takiej postaci rozbudowuje pomysł na zapisywanie liczb naturalnych: gdy czytamy liczbę zapisaną z użyciem przecinka, 
			każda cyfra na lewo ma $10$ razy większą wagę od sąsiedniej cyfry (a każda cyfra na prawo ma $10$ razy mniejszą wagę). W liczbie o zapisie dziesiętnym 
			$586,241$ cyfra $5$ informuje, ile setek ($100$) mieści się w tej liczbie, cyfra $8$ informuje, ile dziesiątek ($10$) mieści się w tej liczbie, 
			$6$ opisuje liczbę jednostek ($1$), cyfra $2$ mówi, ile ułamków $\frac{1}{10}$ składa się na tę liczbę, cyfra $4$ ile ułamków $\frac{1}{100}$, 
			cyfra $1$ ile ułamków $\frac{1}{1000}$.
		</p>
		</lesson-chapter>

		<lesson-chapter><template #title>Zera po przecinku nie mają znaczenia</template> 
		<p> 
			Poprzez skracanie ułamków zwykłych możemy stwiedzić, że:
		</p>
		<ul>
			<li>$2.7 = 2 \frac{7}{10}$</li>
			<li>$2.70 = 2 \frac{70}{100} = 2 \frac{7}{10}$</li>
			<li>$2.700 = 2\frac{700}{1000} = 2 \frac{7}{10}$</li>
		</ul>
		<p> 
			Czyli $2.7 = 2.70 = 2.700 = 2.7000 = 2.70000 = ...$. Liczba zer po przecinku na końcu zapisu dziesiętnego nie ma wpływu na wartość liczby.
		</p>
		</lesson-chapter>

		<lesson-chapter><template #title>Przybliżenia</template> 
		<p>
			W przypadku bardzo dużych liczb albo takich, które mają w zapisie dużo cyfr, często nie interesuje nas jej dokładna wartość. W 2018 roku 
			w Polsce mieszkało $38\ 432\ 992$ ludzi, jednak mało kogo interesuje aż tak precyzjna wielkość: przeważnie wystarczająca jest informacja, 
			że ludnośc wynosiła około $38\ 000\ 000$, czyli $38$ milionów. Matematycznym odpowiednikiem słowa "około" jest symbol $\approx$:
			$$38\ 432\ 992 \approx 38\ 000\ 000$$
			W powyższym przykładzie dokonaliśmy przybliżenia do milionów - cyfry setek tysięcy, dziesiątek tysięcy i kolejne zostały zastąpione zerami. 
			Przybliżeń można dokonywać do dowolnej cyfry: do setek, do dziesiątek, do jedności albo do części dziesiętnych czy części setnych, gdy 
			ucinamy pewną ilość cyfr po przecinku. Według umowy, gdy dokonujemy przybliżenia do pewnej cyfry, podnosimy ją o $1$, jeśli kolejna cyfra 
			(pierwsza pomijana) jest większa lub równa $5$, na przykład $54,6$ jest bliższe do $55$ niż do $54$.
		</p>

		<ul>
			<li>Zaokrąglenie $97,6501$ do części tysięcznych wynosi $97,650$.</li>
			<li>Zaokrąglenie $97,6501$ do części setnych wynosi $97,65$.</li>
			<li>Zaokrąglenie $97,6501$ do części dziesiętnych wynosi $97,7$.</li>
			<li>Zaokrąglenie $97,6501$ do jedności wynosi $98$.</li>
			<li>Zaokrąglenie $97,6501$ do dziesiątek wynosi $100$.</li>
			<li>Zaokrąglenie $97,6501$ do setek wynosi $100$.</li>
			<li>Zaokrąglenie $97,6501$ do tysięcy wynosi $0$.</li>
		</ul>
		</lesson-chapter>

		<lesson-chapter><template #title>Okres dziesiętny</template> 
		<p>
			Zastanówmy się, jak zapisać ułamek dziesiętny równy $\frac{1}{3}$. Szukamy takiego ułamka dziesiętnego, który pomnożony przez $3$ 
			ma wartość $1$. Pierwszą myślą jest $0,3$, jednak $3 \cdot \frac{3}{10} = \frac{9}{10}$, czyli trochę za mało. Lepszym pomysłem jest ułamek 
			$0,33$, wtedy $3 \cdot \frac{33}{100} = \frac{99}{100}$. Jeszcze bliżej dokładnej liczby będzie ułamek $0,333$ albo $0,3333$, jednak każdy z nich 
			jest za mały. Okazuje się, że dokładna wartość będzie miała po przecinku nieskończenie wiele trójek: $0,33333333333333...$. W skrócie zapiszemy:
		</p>

		$$
			\frac{1}{3} = 0,33333333333333... = 0,(3)
		$$

		<p>
			Trójka w nawiasie stanowi <i>okres</i> rozwinięcia dziesiętnego jednej trzeciej: jest to cyfra, która będzie powtarzać się w nieskończoność.
		</p>
		</lesson-chapter>

		<lesson-chapter><template #title>Działania na ułamkach dziesiętnych</template> 
		<p>
			Gdy zajdzie potrzeba, by dodać, odjąć, pomnożyć lub podzielić ułamki dziesiętne, nie musimy najpierw zamieniać ich na ułamki zwykłe. 
			Można przeprowadzać na nich działania bardzo podobnie, jak wykonuje się je na zwykłych liczbach naturalnych - należy tylko uważać na przecinek:
		</p>
		<ul>
			<li>$21,64 + 3,2 = 24,84$</li>
			<li>$56,42 - 41,21 = 15,31$</li>
			<li>$3 \cdot 2,16 = 6,48$</li>
			<li>$6,3 : 2,1 = 3$</li>
		</ul>
		<p>
			Każde z tych działań można wykonywać w słupku, zwłaszcza w liczb z wieloma cyframi. Wpisz poniżej dowolne działanie, np. $23,6 + 7,504$ lub
			$56,061 - 2,32$ lub $7,453 \cdot 4,06$ lub $1 : 7$. 
		</p>
    <columnar-operation :operation="''" :floats="true"></columnar-operation>

		</lesson-chapter>

		<lesson-chapter><template #title>Zamiana ułamków zwykłych na dziesiętne</template> 
		<p> 
			Aby poznać rozwinięcie dziesiętne ułamka zwykłego, należy dokonać dzielenia pisemnego licznika przez mianownik. Możesz w tym celu skorzystać 
			z powyższego panelu.
		</p>
		</lesson-chapter>

		<lesson-chapter><template #title>Zamiana ułamków dziesiętnych na zwykłe</template> 
		<p> 
			Jeśli zapis dziesiętny ułamka ma po przecinku skończoną ilość cyfr, w jego mianowniku pojawi się $10$, $100$, $1000$, ... w zalezności od tego, 
			ile ich jest, np. $6,7 = 6 \frac{7}{10}$, $0,098$ = \frac{98}{1000}$.
		</p>

		<p> 
			Jeśli tuż po przecinku zaczyna się okres ułamka, w jego mianowniku pojawi się $9$, $99$, $999$, ... w zalezności od tego, ile cyfr ma okres.
		</p>
		<ul>
			<li>$0,(4) = \frac{4}{9} = \frac{1}{3}$</li>
			<li>$0,(18) = \frac{18}{99} = \frac{2}{11}$</li>
			<li>$0,(142857) = \frac{142\ 857}{999\ 999} = \frac{1}{7}$</li>
			<li>$0,(9) = \frac{9}{9} = 1$</li>
		</ul>

		<p> 
			Jeśli okres rozpoczyna się na dalszej pozycji po przecinku, możemy przesunąć przecinek na początek okresu, wyznaczyć ułamek zwykły, a następnie 
			podzielić go przez $10$, $100$, $1000$, ... w zalezności od liczby cyfr poprzedzających okres.
		</p>

		<ul>
			<li>$0,1(6) = 1,(6) : 10 = 1 \frac{6}{9} : 10 = 1 \frac{2}{3} : 10 = \frac{5}{3} : 10 = \frac{5}{30} = \frac{1}{6}$</li>
			<li>$0,02(27) = 2,(27) : 100 = 2 \frac{27}{99} : 100 = 2 \frac{3}{11} : 100 = \frac{25}{11} : 100 = \frac{25}{1100} = \frac{1}{44}$</li>
		</ul>
		</lesson-chapter>

		<lesson-chapter><template #title>Nowe pojęcia</template> 
		<p>
			<b>Rozwinięcie dziesiętne</b> liczby to jej zapis z użyciem cyfr i przecinka.
		</p>

		<p>
			<b>Cyfra części dziesiętnych</b> to cyfra bezpośrednio na prawo od przecinka dziesiętnego: $123,\color{#dd3333}{4}56$<br>
			<b>Cyfra części setnych</b> to cyfra na prawo od cyfry części dziesiętnych: $123,4\color{#dd3333}{5}6$<br>
			<b>Cyfra części tysięcznych</b> to cyfra na prawo od cyfry części setnych: $123,45\color{#dd3333}{6}$
		</p>

		<p>
			<b>Cecha liczby (część całkowita)</b> to część liczby na lewo od przecinka dziesiętnego: $\color{#dd3333}{123},456$<br>
			<b>Mantysa liczby (część ułamkowa)</b> to część liczby na prawo od przecinka dziesiętnego: $123,\color{#dd3333}{456}$<br>
		</p>

		<p> 
				<b>Przybliżenie (szacowanie)</b> liczby to wartość do niej umownie bliska<br>
				<b>Zaokraglenie</b> liczby do zadanej cyfry odbywa się poprzez zamianę wszystkich następujących po niej cyfr na $0$ i ewentualne zwiększenie 
				jej samej o $1$, jeśli następna cyfra to $5$, $6$, $7$, $8$ lub $9$, np.: $456 \approx 460$; $201,402 \approx 201$; $99 \approx 100$<br>
				<b>Podłoga</b> z liczby to przybliżenie "w dół" do części całkowitej, czyli liczba z uciętą częścią ułamkową, symbolicznie $\lfloor 2,65 \rfloor = 2$<br>
				<b>Sufit</b> z liczby to przybliżenie "w górę" do najbliższej liczby całkowitej, symbolicznie $\lceil 2,65 \rceil = 3$
		</p>

		<p>
			<b>Okres dziesiętny</b> to zestaw cyfr, które powtarzają się w nieskończonym rozwinięciu dziesiętnym ułamka, np $\frac{1}{15} = 0,0666666... = 0,0(6)$ 
		</p>
		</lesson-chapter>

    </lesson>
</template>

<script>
import LessonTitleShort from "../../../lesson/LessonTitleShort";
import LessonIntro from "../../../lesson/LessonIntro";
import LessonChapter from "../../../lesson/chapter/LessonChapter";
import Lesson from "../../../lesson/Lesson";
import ColumnarOperation from "../../../utils/columnar_operation/ColumnarOperation";

export default {
  name: "UlamkiDziesietneShort",
  data() {
    return {
      chapters: []
    };
  },
  components: {
    LessonIntro,
    LessonTitleShort,
    LessonChapter,
		Lesson,
    ColumnarOperation		
  }
};
</script>

<style scoped>

</style>
