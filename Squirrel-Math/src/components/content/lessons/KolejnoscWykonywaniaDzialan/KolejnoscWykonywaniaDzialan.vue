<template>
	<lesson routeShortVersion="/kolejnosc-wykonywania-dzialan-short" routeLongVersion="/kolejnosc-wykonywania-dzialan">
		<lesson-title>Kolejność wykonywania działań</lesson-title>

		<lesson-intro>
		<p>
			<comment text="Myszka komputerowa to nie zabawka.">Dzierżysz w rękach potężne narzędzie</comment>. Umiejąc dodawać, 
			odejmować, mnożyć i dzielić, możesz wyruszać na podbój świata. 
			Najpierw jednak musisz zmierzyć się ze wszystkimi czterema działaniami na raz.
		</p>
		</lesson-intro>

    <lesson-chapter><template #title>Od czego zacząć?</template>
		<p class = "type">
			Intuicje
		</p>

		<p>
			Co zrobić, kiedy napotkamy działanie, w którym występuje więcej niż jeden z symboli $+  -  \cdot  :$ ? 
		</p>

		<div class="example">
			<p>
				Zacznijmy od 
				kolizji plusa z minusem. Weźmy działanie:
			</p>
			$$
				3 + 6 - 2
			$$

			<p>
				Rozumiemy je tak, że liczbę $3$ powiększamy o $6$, a potem pomniejszamy o $2$. W takim razie liczymy:
			</p>

			<ul>
				<li>Powiększamy o $6:\ \ \ \ 3 + 6 = 9$</li>
				<li>Pomniejszamy o $2:\ \ \ \ 9 - 2 = 7$</li>
			</ul>

			<p>
				Czyli $3 + 6 - 2 = 7$. 
			</p>
		</div>

		<div class="example">
			<p>
				Możemy wziąć nawet dłuższe i bardziej rozbudowane działanie.
			</p>

			$$
				7 - 2 + 11 - 16 + 5 + 3 + 1 - 5
			$$

			<p>
				Zaczynami od siódemki i bierzemy ją w obroty:
			</p>

			<ul>
				<li>Pomniejszamy o $2:\ \ \ \ 7 - 2 = 5$</li>
				<li>Powiększamy o $11:\ \ \ \ 5 + 11 = 16$</li>
				<li>Pomniejszamy o $16:\ \ \ \ 16 - 16 = 0$</li>
				<li>Powiększamy o $5:\ \ \ \ 0 + 5 = 5$</li>
				<li>Powiększamy o $3:\ \ \ \ 5 + 3 = 8$</li>
				<li>Powiększamy o $1:\ \ \ \ 8 + 1 = 9$</li>
				<li>Pomniejszamy o $5:\ \ \ \ 9 - 5 = 4$</li>
			</ul>

			<p>
				Kończymy na czwórce. 
			</p>
		</div>

		<p>
			Kiedy robimy wszystkie te powiększenia i pomniejszenia, mówimy, że wykonujemy <i>przekształcenia</i>. Działanie 
		</p>

		$$
			7 - 2 + 11 - 16 + 5 + 3 + 1 - 5
		$$

		<p>
			Możemy <i>przekształcić</i> do prostszej postaci i zapisujemy to tak:
		</p>

		$$
			7 - 2 + 11 - 16 + 5 + 3 + 1 - 5 = 5 + 11 - 16 + 5 + 3 + 1 - 5 = 16 - 16 + 5 + 3 + 1 - 5 =\\
			= 0 + 5 + 3 + 1 - 5 = 5 + 3 + 1 - 5 = 8 + 1 - 5 = 9 - 5 = 4
		$$

		<p>
			W tym przypadku wynikiem całego działania jest liczba $4$. Gdy w trakcie przekształceń zabraknie nam miejsca na papierze, 
			możemy przejść z obliczeniami do następnej linijki. Najczęściej przeskok robimy w miejscu znaku równości. Wtedy 
			zapisujemy $=$ na początku nowej i na końcu poprzedniej linijki. Dla przejrzystości w przypadku rozbudowanych działań warto 
			stosować przejście do następnej linijki po każdym przekształceniu. 
		</p>

		<p>
			Zawsze działanie z dodawaniem i odejmowaniem wykonujemy od lewej do prawej, czyli mówiąc fachowo „w kolejności występowania”. 
			Czemu to takie istotne? Weźmy działanie
		</p>

		$$
			7 - 2 + 3
		$$

		<p>
			Wykonując je poprawnie, czyli od lewej do prawej, najpierw liczymy różnicę, a potem sumę.
		</p>

		$$
			7 - 2 + 3 = 5 + 3 = 8
		$$

		<p>
			Gdyby pokusiło nas obliczyć od prawej do lewej, czyli najpierw sumę, a potem różnicę, mielibyśmy
		</p>

		$$
			7 - 2 + 3 = 7 - 5 = 2
		$$

		<p>
			czyli dość istotnie mniej.
		</p>

		<div class="example">
			Dołączmy do gry mnożenie. Działanie

			$$
				3 \cdot 4 + 5
			$$
			rozumiemy tak: trzy razy bierzemy czwórkę i jeszcze dodajemy $5$:

			$$
				3 \cdot 4 + 5 = 12 + 5 = 17
			$$
		</div>

		<div class = "example">
			Weźmy teraz działanie

			$$
				9 + 2 \cdot 4
			$$

			Taki zapis interpretujemy jako dziewiątkę powiększoną o dwa razy wziętą czwórkę. W takim razie:

			$$
				9 + 2 \cdot 4 = 9 + 8 = 17
			$$
		</div>

		<div class = "example">
				$3 \cdot 4 - 5$ oznacza, że trzy razy bierzemy czwórkę i odejmujemy od tego $5$.
				$$3 \cdot 4 - 5 = 12 - 5 = 7$$
		</div>
		<div class = "example">
				$9 - 2 \cdot 4$ oznacza, że dziewiątkę pomniejszamy o dwa razy wziętą czwórkę.
				$$9 - 2 \cdot 4 = 9 - 8 = 1$$
		</div>

		<p>
			Gdy na scenę wchodzi mnożenie, zasada liczenia od lewej do prawej przestaje obowiązywać. Gdy znajdziemy w działaniu mnożenie, wykonujemy je, 
			zanim cokolwiek dodamy albo odejmiemy.
		</p>

		<p>
			Do pełni szczęścia potrzeba nam jeszcze dzielenia. Matematycy umówili się, że dzielenie jest równorzędne z mnożeniem. 
			Oznacza to, że w rozbudowanych działaniach najpierw wykonujemy mnożenie i dzielenie w kolejności występowania, a następnie 
			dodawanie i odejmowanie w kolejności występowania. Zobaczmy, jak to wygląda w praktyce:
		</p>

		<div class="example">
			Działanie $6 \cdot 5 : 2$ zawiera tylko dzielenie i mnożenie. Liczymy od lewej do prawej, czyli najpierw mnożymy 
			$6 \cdot 5$, a potem dzielimy wynik przez $2$.
			<p style="text-align: center">$6 \cdot 5 : 2 = 30 : 2 = 15$</p>
		</div>

		<div class="example">
			W działaniu $4 : 2 + 2$ występuje dzielenie i dodawanie. Najpierw zajmujemy się dzieleniem $4 : 2$, a potem dodajemy $2$.
			<p style="text-align: center">$4 : 2 + 2 = 2 + 2 = 4$</p>
		</div>

		<div class="example">
			Działanie $2 + 7 \cdot 3 - 5 \cdot 4$ składa się z dodawania, mnożenia i odejmowania. Najpierw wykonujemy mnożenie, 
			czyli zajmujemy się $7 \cdot 3$ oraz $5 \cdot 4$. Potem dodajemy i odejmujemy od lewej do prawej.
			<p style="text-align: center">$2 + 7 \cdot 3 - 5 \cdot 4 = 2 + 21 - 20 = 23 - 20 = 3$</p>
		</div>

		<div class="example">
			$6 + 3 \cdot 10 : 5 - 6 : 3 + 5 - 2 : 1 \cdot 4$ zawiera wszystkie działania. Zaczynami od mnożenia i dzielenia, czyli 
			najpierw rozbrajamy fragmenty $3 \cdot 10 : 5,  6 : 3$ oraz $2 : 1 \cdot 4$. W tych cząstkach dzielenie i mnożenie 
			wykonujemy od lewej do prawej. Na koniec zostaje nam dodawanie i odejmowanie od lewej do prawej.
			$$6 + 3 \cdot 10 : 5 - 6 : 3 + 5 - 2 : 1 \cdot 4 = \\
			= 6 + 30 : 5 - 2 + 5 - 2 \cdot 4 = \\
			= 6 + 6 - 2 + 5 - 8 =\\
			= 12 - 2 + 5 - 8 =\\
			= 10 + 5 - 8 = \\
			= 15 - 8 = \\
			= 7$$
		</div>

		<p>
			To „pierwszeństwo” mnożenia i dzielenia względem dodawania i odejmowania jest wyłącznie kwestią umowy, która ma zapobiec niejednoznacznościom.
			A jednocześnie ma dobrze odpowiada intuicjom. Odejmowanie jest odwrotne do dodawania, 
			więc te działania są równorzędne, jakby „równouprawnione”. Mnożenie jest jednak „wyższego rzędu”, ponieważ wywodzi się z 
			dodawania przez jego wielokrotne powtarzanie. Dzielenie jest odwrotne do mnożenia, więc te dwa działania także są 
			równouprawnione. Fachowo mówi się, że mnożenie i dzielenie <i>wiążą mocniej</i> niż dodawanie i odejmowanie.
		</p>

		<p>
			Umiejąc wykonywać wszystkie cztery działania, możemy sprostać wielu problemom natury życiowej.
		</p>

		<div class="example">
			Czerwony kapturek miał $1$ babcię. Gdy wilk zjadł babcię, czerwony kapturek miał $0$ babć. Z pomocą przyszedł myśliwy, 
			który wyciągnął babcię z brzucha wilka. Czerwony kapturek znowu ma $1$ babcię.
			$$1 - 1 + 1 = 0 + 1 = 1$$
		</div>

		<div class="example">
			Liczba oczu pająka wynosi $4$. Dwugłowy pająk ma więc $8$ gałek ocznych. Gdy postawisz naprzeciw siebie $3$ dwugłowe pająki i 
			$5$ cyklopów, będzie na ciebie patrzyło $29$ sztuk oczu.
			<p style="text-align: center">$2 \cdot 4 \cdot 3 + 1 \cdot 5 = 8 \cdot 3 + 5 = 24 + 5 = 29$</p>
		</div>

		<div class="example">
			Stefan znalazł się w tłumie $4$ szczęśliwców, którym dobrodziej rozda zapas $20$ jabłek z działki. Stefan załapał się na 
			$5$ jabłek. Wracając do domu, natknął się na jabłoń. Z każdej z trzech gałęzi zerwał $2$ jabłka, okradł więc jabłoń z $6$ 
			dzieci. Po drodze zjadł $2$ jabłka, więc do domu doniósł $9$ jabłek.
			<p style="text-align: center">$20 : 4 + 3 \cdot 2 - 2 = 5 + 6 - 2 = 11 - 2 = 9$</p>
		</div>

		<div class="example">
			Każdego roku Maciuś dostawał na urodziny, imieniny, dzień dziecka i Boże Narodzenie od mamy, cioci i babci po dwie pary 
			majtek. Maciuś gromadził prezenty przez $20$ lat, aż w końcu postanowił otworzyć sklep z bielizną. Połowę towaru wykupił 
			bogaty biznesmen z Ameryki. Następnie do sklepu wkroczyło $4$ fanów odzieży męskiej i każdy z nich kupił $30$ par majtek. 
			W nocy sklep został okradziony, w wyniku czego zniknęło $100$ par majtek. Ile majtek pozostało w sklepie?
			$$4 \cdot 3 \cdot 2 \cdot 20 : 2 - 4 \cdot 30 - 100 = \\
			= 12 \cdot 2 \cdot 20 : 2 - 4 \cdot 30 - 100 = \\
			= 24 \cdot 20 : 2 - 4 \cdot 30 - 100 = \\
			=  480 : 2 - 4 \cdot 30 - 100 = \\
			= 240 - 120 - 100 = \\
			= 120 - 100 = \\
			= 20$$
			Pozostałe $20$ par Maciuś postanowił zachować na pamiątkę.
		</div>
		</lesson-chapter>

    <lesson-chapter><template #title>Działania w nawiasach</template>
		<p class ="type">
			Intuicje
		</p>

		<p>
			Przyjrzyjmy się problemowi, który dręczył doradcę Minosa, króla Krety:
		</p>

		<p class="problem">
			Raz do roku do labiryntu minotaura wpuszczamy siedmioro chłopców i siedmioro dziewcząt. Ile dzieci oddamy do labiryntu w 
			ciągu 5 lat?
		</p>

		<p>
			W ciągu jednego roku wpuszcza się $7 + 7 = 14$ dzieci, <comment text="I po problemie.">więc w ciągu $5$ lat będzie to 
			kumulacja $70$ dzieci.</comment> Napotkaliśmy obliczenia, w których najpierw należy wykonać dodawanie, a potem mnożenie. Jak zapisać 
			takie działanie? Zgodnie z umową zapis $5 \cdot 7 + 7$ wymaga najpierw mnożenia, a potem dodawania - takie działanie daje wynik $42$. 
			<comment text="Chcemy przecież oddać 70 dzieci.">Nie tego chcemy</comment>. 
			Z pomocą przychodzą nawiasy. Matematycy wprowadzili je do zapisu, aby wymusić pierwszeństwo działania wiążącego słabiej.
			Wyrażenie, o które nam chodzi, będzie wyglądało tak:
		</p>

		$$
			5 \cdot (7 + 7)
		$$

		<p>
			Wszystkie dotychczasowe przepisy dotyczące zapisu i interpretacji wyrażeń matematycznych podsumowuje reguła zwana kolejnością wykonywania działań.
		</p>

		<div class="formula">
			<p align="left" style="margin-bottom: 0">
				W dowolnym działaniu obliczenia wykonujemy według kolejności:
			</p>
			<ol style="margin-top: 0">
				<li style="text-align: left">Działania w nawiasach;</li>
				<li style="text-align: left">Mnożenie i dzielenie w kolejności występowania;</li>
				<li style="text-align: left">Dodawanie i odejmowanie w kolejności występowania.</li>
			</ol>
		</div>

		<p>
			Nawiasów możemy stosować dowolnie dużo, możemy nawet <i>zagnieżdżać</i> nawiasy, czyli stosować nawias wewnątrz nawiasu. Wtedy zaczynamy obliczenia od 
			nawiasów położonych najgłębiej.
		</p>

		<div class="example">
			$5 \cdot (3 + 4) - 10 : (2 + 3) = 5 \cdot 7 - 10 : 5 = 35 - 2 = 33$
		</div>
		<div class="example">
			$2 \cdot (3 + (7 + 3) : 2 + 3 \cdot (1 + 2) : 9) = 2 \cdot (3 + 10 : 2 + 3 \cdot 3 : 9) = \\
			= 2 \cdot (3 + 5 + 9 : 9) = 2 \cdot (3 + 5 + 1) = 2 \cdot (8 + 1) = 2 \cdot 9 = 18$
		</div>
		<div class="example">
			$2 \cdot (2 + 2 \cdot (2 + 2 \cdot (2 + 2 \cdot (2 + 2)))) =
			2 \cdot (2 + 2 \cdot (2 + 2 \cdot (2 + 2 \cdot 4))) = \\
			= 2 \cdot (2 + 2 \cdot (2 + 2 \cdot (2 + 8))) = 2 \cdot (2 + 2 \cdot (2 + 2 \cdot 10)) = \\
			= 2 \cdot (2 + 2 \cdot (2 +20)) = 2 \cdot (2 + 2 \cdot 22) = 2 \cdot (2 + 44) = 2 \cdot 46 = 92$
		</div>

		<p class="type">
			Rozszerzenie
		</p>

		<p>
			Niektórzy uważają, że zapis z użyciem wielu nawiasów, np. $2 + 2 \cdot (2 + 2 \cdot (2 + 2 \cdot 
			(2 + 2)))$ jest 
			nieprzejrzysty, ponieważ nie widać, gdzie dany nawias się zaczyna, a gdzie kończy. Powyższe wyrażenie można zapisać w inny 
			sposób:
		</p>

		$$
			2 + 2 \cdot \{2 + 2 \cdot [2 + 2 \cdot (2 + 2)]\}
		$$

		<p>
			Każdy z tych bazgrołów ma swoją nazwę:
			<ul>
				<li>$(\ \ \ )$ to <i>nawias okrągły</i></li>
				<li>$[\ \ \ ]$ to <i>nawias kwadratowy</i></li>
				<li>$\{\ \ \}$ to <i>nawias klamrowy</i></li>
			</ul>
			Gdy stosujemy taki zapis, najgłębiej położony będzie nawias okrągły, na zewnętrz będzie nawias kwadratowy. 
			Gdy mamy trzy nawiasy, jak w przykładzie powyżej, nawias klamrowy będzie najbardziej zewnętrzny.
		</p>

		<p>
			Nie polecamy takiego sposobu zapisu z kilku przyczyn:
			<ul>
				<li>Nie można użyć więcej niż trzech nawiasów, bo matematykom zabrakło pomysłów na więcej bazgrołów nawiasowych (ewentualnie po klamrowym można znowu 
					użyć okragłego i kontynuować cyklicznie)
				</li>
				<li>Nawiasy kwadratowe i klamrowe mają w matematyce również inne zastosowania, przez co czasem moglibyśmy napotkać 
				dwuznaczności.</li>
				<li>Trzeba zapamiętać, w jakiej kolejności zapisywać nawiasy. Inna kolejność będzie postrzegana jako ekstrawagancja lub błąd.</li>
			</ul>
		</p>

		<p>
			Najlepiej stosować zawsze nawiasy okrągłe. Gdy robi się ich dużo, te bardziej zewnętrzne mogą być po prostu większe.
		</p>

		$$
			2 + 2 \cdot \Bigl(2 + 2 \cdot \bigl( 2 + 2 \cdot (2 + 2) \bigr) \Bigr)
		$$
		</lesson-chapter>

    <lesson-chapter id="distributive-property"><template #title>Rozdzielność mnożenia względem dodawania</template>
		<p class="type">
			Intuicje
		</p>

		<p>
			Skoro nie boimy się już łączyć mnożenia z dodawaniem, warto wspomnieć o pewnym istotnym fakcie. Do naszych rozważań 
			zaprosimy gościa specjalnego - podłogę łazienkową pana Janusza.
		</p>

		<br>
		<table class = "tiles center">
			<tr><td></td><td></td><td></td><td></td><td></td></tr>
			<tr><td></td><td></td><td></td><td></td><td></td></tr>
			<tr><td></td><td></td><td></td><td></td><td></td></tr>
			<tr><td></td><td></td><td></td><td></td><td></td></tr>
		</table>
			<br>

		<p>
			W wyniku trzęsienia ziemi podłoga pana Janusza rozpadła się na dwa fragmenty:
		</p>
		
		<br>
		<table class = "tiles center">
			<tr><td></td><td></td><td></td><td style = "background: white; width: 20px; border-top: none; border-bottom:none;"></td><td></td><td></td></tr>
			<tr><td></td><td></td><td></td><td style = "background: white; width: 20px; border-top: none; border-bottom:none;"></td><td></td><td></td></tr>
			<tr><td></td><td></td><td></td><td style = "background: white; width: 20px; border-top: none; border-bottom:none;"></td><td></td><td></td></tr>
			<tr><td></td><td></td><td></td><td style = "background: white; width: 20px; border-top: none; border-bottom:none;"></td><td></td><td></td></tr>
		</table>
		<br>

		<p>	
			Zatroskany pan Janusz upewnia się, czy trzęsienie ziemi nie pochłonęło któregoś z kafli łazienkowych. 
			Przed katastrofą liczba kafli wynosiła $4 \cdot 5 = 20$. Pan Janusz liczy, że teraz liczba kafli wynosi
		</p>

		$$
			4 \cdot 3 + 4 \cdot 2 = 12 + 8 = 20
		$$

		<p>
			Pan Janusz może odetchnąć z ulgą. Kafli jest tyle samo.
		</p>

		<p>
			Naszą obserwację można zapisać w taki sposób:
		</p>

		$$
			4 \cdot 5 = 4 \cdot (3 + 2) = 4 \cdot 3 + 4 \cdot 2
		$$

		<p>
			Zależność ta jest bardzo ogólna. Gdy chcemy pomnożyć pewną liczbę przez sumę, możemy rozdzielić to mnożenie na dodawanie. 
			Tak więc $7 \cdot 9 = (3 + 4) \cdot 9 = 3 \cdot 9 + 4 \cdot 9$. Nie jest to specjalnie odkrywcze. Wziąć 
			siedem dziewiątek to to samo, co wziąć trzy dziewiątki, a potem jeszcze $4$ dziewiątki.
		</p>

		<ul>
			<li>$(3 + 4) \cdot 9 = 7 \cdot 9 = 9 + 9 + 9 + 9 + 9 + 9 + 9$</li>
			<li>$3 \cdot 9 + 4 \cdot 9 = 9 + 9 + 9\ \ \ \ +\ \ \ \ 9 + 9 + 9 + 9$</li>
		</ul>

		<p>
			Z powodu występowania takiej zależności mówimy, że mnożenie jest rozdzielne względem dodawania. Jest to dość przydatne,
			gdy chcemy obliczyć iloczyn wielkich liczb i nie mamy ochoty wykonywać tego w słupku.
		</p>
		
		<div class="example">
			$23 \cdot 7 = (20 + 3) \cdot 7 = 20 \cdot 7 + 3 \cdot 7 = 140 + 21 = 161$
		</div>
		<div class="example">
			$4 \cdot 124 = 4 \cdot (100 + 20 + 4) = 4 \cdot 100 + 4 \cdot 20 + 4 \cdot 4 = 400 + 80 + 16 = 496$
		</div>
		<div class="example">
			$34 \cdot 23 = (30 + 4) \cdot 23 = 30 \cdot 23 + 4 \cdot 23 = 30 \cdot (20 + 3) + 4 \cdot (20 + 3) =\\
			= 30 \cdot 20 + 30 \cdot 3 + 4 \cdot 20 + 4 \cdot 3 = 600 + 90 + 80 + 12 = 782$
		</div>
		

    </lesson-chapter>

  </lesson>
</template>

<script>
import LessonTitle from "../../../lesson/LessonTitle";
import LessonIntro from "../../../lesson/LessonIntro";
import LessonChapter from "../../../lesson/chapter/LessonChapter";
import Lesson from "../../../lesson/Lesson.vue";

export default {
  name: "KolejnoscWykonywaniaDzialan",
  data() {
    return {
      chapters: []
    };
  },
  components: {
    LessonIntro,
    LessonTitle,
    LessonChapter,
    Lesson
  }
};
</script>

<style scoped>
</style>