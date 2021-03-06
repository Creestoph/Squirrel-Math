<template>
	<lesson routeShortVersion="/dzialania-na-wyrazeniach-algebraicznych-short" routeLongVersion="/dzialania-na-wyrazeniach-algebraicznych">
		<lesson-title>Działania na wyrażeniach algebraicznych</lesson-title>

		<lesson-intro>   
		<p>
			Skoro potrafimy wykonywać operacje arytmetyczne na liczbach, a liczby coraz częściej będą pojawiały się w postaci zmiennych literowych, 
			warto nauczyć się wykonywać działania typu dodawanie, odejmowanie, mnożenie, dzielenie i potęgowanie bezpośrednio na wyrażeniach 
			algebraicznych. Cały temat, choć przydługi i toporny, stanowi konieczny trening przygotowujący do dalszej przygody w świecie matematyki.
		</p>
		</lesson-intro>   

		<lesson-chapter><template #title>Porządkowanie jednomianów</template>   
		<p class="type">
			Warsztat
		</p>
		
		<p>
			Z estetycznego punktu widzenia jednomiany powinno się zapisywać, zaczynając od współczynnika liczbowego, a następnie <comment text="I tak nikt o to nie dba">wypisując kolejne 
			zmienne w kolejności alfabetycznej</comment>. Dzięki potęgowaniu możemy uczynić jednomiany jeszcze przejrzystszymi: jeśli pewna zmienna występuje 
			jako czynnik więcej niż jeden raz, nie piszemy jej dwukrotnie, a jedynie zwiększamy jej wykładnik.
		</p>
		
		<ul>
			<li>$a \cdot 3 \cdot a \cdot 5 \cdot b \cdot a \cdot b \cdot a^3 \cdot (-2) \cdot b^2=-30a^6 b^4$</li>
			<li>$\frac{c}{3} \cdot \frac{b^2}{2} \cdot d \cdot a^3 \cdot 6=a^3 b^2 cd$</li>
			<li>$bogdan \cdot ma \cdot 2 \cdot jajca=2a^4 bcdgj^2 mno $</li>
			<li>$dodawanie=oddawanie=a^2d^2einow$</li>
		</ul>
		
		<p>
			Na podobnej zasadzie działa mnożenie przez siebie dwóch jednomianów. Wyrażenia $2a^3 bc^2$ oraz 
			$3ab^2 c^3$ stanowią odrębne jednomiany, ale gdy pomnożymy je przez siebie, $2a^3 bc^2 \cdot 3ab^2 c^3$
			możemy traktować jak jeden jednomian, który wymaga uporządkowania: $2a^3 bc^2 3ab^2 c^3=6a^4 b^3 c^5$.
		</p>
			
		</lesson-chapter>

		<lesson-chapter><template #title>Redukcja wyrazów podobnych</template>   
		<p class="type">
			Intuicje
		</p>
		
		<p>
			Oznaczmy przez $m$ wagę pojedynczego bochenka chleba. Gdy położymy na wadze elektronicznej dwa bochenki, wskaże ona masę równą 
			$2m$. Gdy położymy na wadze jeszcze trzy bochenki, będziemy mieli $5$ bochenków ledwo 
			mieszczących się na wadze, która wskaże masę $5m$. Stąd prosty wniosek:
		</p>
		
		$$
			2m+3m=5m
		$$

		<p>
			Sumując dwa jednomiany, uzyskaliśmy w wyniku inny jednomian. Dodawanie do siebie jednomianów mocno przypomina spostrzeżenia których 
			dokonywaliśmy dawno temu, w temacie o dodawaniu liczb naturalnych:
		</p>
		
		$$
			2\text{ kulki} + 4\text{ kulki} = 6\text{ kulek}
		$$
		
		$$
			10\text{ owiec} + 7\text{ owiec} = 17\text{ owiec}
		$$
		
		$$
			3\text{ golonki} + 4\text{ golonki} + 2\text{ golonki} = 9\text{ golonek}
		$$
		
		<p>
			Tak samo, jak intuicyjne jest dodawanie do siebie przedmiotów z naszego otoczenia, tak samo nie ma nic dziwnego w dodawaniu do siebie 
			jednomianów. Jednomiany to „bohaterowie opowiadanej przez nas historii”, każdy z nich ma swój unikalny, odmienny charakter. Współczynniki 
			jednomianów określają liczbę tych bohaterów. Gdy więc dodajemy jednomiany, które mają „ten sam charakter”, po prostu zwiększamy ich ilość. 
		</p>

		<p>
			Jak by nie patrzeć:
		</p>
		
		$$
			4abc+10abc+6abc=20abc
		$$
		
		<p>
			i nie ma absolutnie żadnego znaczenia, co właściwie reprezentują zmienne $a$, $b$ i 
			$c$. Mogą one reprezentować Twoje najśmielsze pragnienia.
		</p>

		<div class="example">
			Wyobraźmy sobie kierowcę Stefana, zarabiającego na życie w firmie produkującej parówki. Stefan rozwozi parówki między Warszawą a 
			Sosnowcem, miejscowościami które dzieli $a$ kilometrów. Ciężarówka Stefana pali $b$ 
			litrów benzyny na jeden kilometr jazdy, zaś jeden litr paliwa kosztuje $c$ złotych. Wtedy cząstka 
			$abc$ jest bohaterem o imieniu „koszt jednokrotnego kursu między Warszawą a Sosnowcem”. Jeśli Stefan wyrobił 
			$4$ kursy w październiku, $10$ kursów w grudniu i $6$ kursów w 
			styczniu, to łącznie musiał wydać $20abc$ złotych na paliwo.
		</div>
		
		<div class="example">
			Jeśli w jednej klatce schodowej jest $a$ pięter, na jednym piętrze $b$ mieszkań, a w 
			każdym mieszkaniu żyje średnio $c$ osób, to $abc$ oznacza liczbę osób mieszkających w 
			jednej klatce. Zliczając $4$ klatki schodowe w budynku od strony wschodniej, $10$ 
			klatek w molochu od strony północnej i $6$ klatek w bloku zachodnim otrzymamy ilość osób mieszkających w 
			osiedlu „Pierwiosnek sześcienny”.
		</div>

		<p>
			Jeśli w dwóch jednomianach występują dokładnie te same zmienne (w tej samej potędze), to jednomiany te opisują to samo zjawisko, 
			„mają ten sam charakter” i możemy je do siebie dodać poprzez dodanie ich współczynników. Takie jednomiany nazywamy <i>wyrazami podobnymi</i>.
			Nie możemy jednak dodawać jednomianów, które mają różne zmienne lub różne wykładniki przy odpowiadających zmiennych. 
			$5\text{ gruszek} + 3\text{ jabłka}$ to po prostu 
			$5\text{ gruszek} + 3\text{ jabłka}$, a nie jakieś $8\text{ owoców}$.
		</p>

		<ul>
			<li>
				$\color{#000000}{2ab} + \color{#dd3333}{3mn} + \color{#000000}{7ab} + \color{#dd3333}{5mn} - \color{#ffaaaa}{10m} + \color{#aaaaaa}{5n}\ \ =\ \  
				\color{#000000}{9ab} + \color{#dd3333}{ 8mn} - \color{#ffaaaa}{10m} + \color{#aaaaaa}{5n}$
			</li>
			<li>$4abc + 3cba +  \color{#dd3333}{2abd} - \color{#ffaaaa}{4dac} + 5bca + 6cab +  \color{#dd3333}{abd} - acb +  \color{#dd3333}{adb} + \color{#ffaaaa}{6cad} 
				\ \ =\ \  17abc + \color{#dd3333}{4abd} + \color{#ffaaaa}{2acd}$	
			</li>
			<li>
				$aab + aba + \color{#dd3333}{bba} + \color{#ffaaaa}{ab} + \color{#dd3333}{bab} + \color{#aaaaaa}{abba} + \color{#ffaaaa}{ba} 
				\ \ =\ \  2a^2b + \color{#dd3333}{2ab^2} + \color{#ffaaaa}{2ab} + \color{#aaaaaa}{a^2b^2}$
			</li>
		</ul>
		</lesson-chapter>

		<lesson-chapter><template #title>Dodawanie i odejmowanie sum algebraicznych</template>   
		<p class="type">
			Intuicje
		</p>
		
		<p>
			Dodawanie jednomianów i sum algebraicznych jest bardzo łatwe, sprowadza się do zredukowania wyrazów podobnych. Wyrażenie 
			$3a+5ab+2b$ możemy potraktować jako jedną sumę algebraiczną, a $7ab+5a-b+a^2$ jako drugą 
			sumę algebraiczną. Ich dodanie stworzy nową sumę algebraiczną:
		</p>
		
		$$
			(3a+5ab+2b)+(7ab+5a-b+a^2 )=\\
			=3a+5ab+2b+7ab+5a-b+a^2=\\
			=8a+12ab+b+a^2
		$$

		<p>
			Więcej ostrożności należy poświęcić odejmowaniu wyrażeń algebraicznych. Rozważmy odejmowanie:
		</p>

		$$
			(5a+3a^2+6ab+2b)-(3a+3a^2+2ab)
		$$

		<p>
			Odejmowanie to zabieranie od tego, co po lewej, tego, co po prawej. Wprowadzamy „lewych” bohaterów na scenę:
		</p>

		<center><img src="./.images/Screenshot_5.png" align="middle"></center>
		
		<p>
			A następnie <comment text="W wersji dla młodszych: zwalniamy">zabijamy</comment> ich tylu, ilu zażyczył sobie reżyser po znaku odejmowania:
		</p>

		<center><img src="./.images/Screenshot_6.png" align="middle"></center>
		
		<p>
			Nie powinno dziwić, że
		</p>

		$$
			(5a+3a^2+6ab+2b)-(3a+3a^2+2ab)=2a+4ab+2b
		$$

		<p>
			Gdy odejmujemy sumy algebraiczne, właściwie odejmujemy od siebie poszczególne wyrazy podobne. Zastanówmy się nad trochę bardziej 
			abstrakcyjnym przypadkiem:
		</p>

		$$
			(5ab+ab^2+3a)-(2ab+ab^2+5a+2a^2 b^3)
		$$

		<p>
			Tym razem reżyser ma wyraźnie ma zły nastrój, gdyż chce zabić więcej aktorów, niż ma do dyspozycji. Możemy sobie wyobrazić, że 
			obliczenia dotyczą finansów, a jednomiany $ab$, $ab^2$, $a^2 b^3$, 
			a wyrażają pewne kwoty pieniężne. Odejmując od $3a$ kwotę $5a$, stajemy się zadłużeni na 
			$2a$, więc jesteśmy na minusie. Tak samo, skoro nie posiadamy żadnych $a^2 b^3$, ale ktoś od 
			nas chce aż $2a^2 b^3$, to mamy dług wielkości $2a^2 b^3$. Tak więc:
		</p>

		$$
			(5ab+ab^2+3a)-(2ab+ab^2+5a+2a^2 b^3 )=\\
			=3ab+(-2a)+(-2a^2 b^3 )=\\
			=3ab-2a-2a^2 b^3
		$$

		<p>
			Z obliczeniowego punktu widzenia, gdy odejmujemy sumę, tak na prawe odejmujemy osobno jej poszczególne składniki:
		</p>

		$$
			(5ab+ab^2+3a)-(2ab+ab^2+5a+2a^2 b^3 )=\\
			=5ab+ab^2+3a-2ab-ab^2-5a-2a^2 b^3=\\
			=3ab-2a-2a^2 b^3
		$$

		<p>
			W ten sposób możemy obliczać jeszcze bardziej skomplikowane różnice:
		</p>
		
		<div class="example">
			$$(3a-2b+c)-(6a+5b-3c)=\\
			=3a-2b+c-6a-5b-(-3c)=\\
			=3a-2b+c-6a-5b+3c=\\
			=-3a-7b+4c$$
		</div>

		<div class="example">
			$$-(2a^2 b-3abc+3ab+abc)-(-3ab+a^2 b-abc+3abc+2ab)=\\
			=-2a^2 b+3abc-3ab-abc+3ab-a^2 b+abc-3abc-2ab=\\
			=-3a^2 b-2ab$$
		</div>
			
		<p>
			Wystarczy trzymać się reguły: minus stojący przed nawiasem odwraca znaki wszystkich składników wewnątrz. Zalecamy wielką ostrożność przy 
			zdejmowaniu nawiasów z minusem. Zabawy z plusami i minusami są jednym z najczęstszych źródeł błędów rachunkowych, niezależnie od poziomu 
			edukacji.
		</p>
		</lesson-chapter>

		<lesson-chapter><template #title>Mnożenie sum algebraicznych</template>   
		<p class="type">
			Intuicje
		</p>
		
		<p>
			Posłużmy się pewną wizualizacją. Gdy układamy kosteczki w równe rzędy i kolumny, ilość zużytych kosteczek wynosi 
		</p>
		
		$$
			\text{ilość rzędów} \cdot \text{ilość kolumn}
		$$

		<p>
			Jeśli ilość kafli w pionie oznaczymy literką $a$, zaś ilość kafli w poziomie literką $b$, 
			będziemy mieli $a \cdot b$ kafli.
		</p>

		<center><img src="./.images/Screenshot_7.png" align="middle"></center>
		
		<p>
			Jeśli w pionie ułożymy $a$ kafli, zaś w poziomie $b+c$ kafli, zużyjemy 
			$a \cdot (b+c)$ kafli.
		</p>

		<center><img src="./.images/Screenshot_8.png" align="middle"></center>
		
		<p>
			Z drugiej strony, dokonaliśmy podziału tabliczki na dwie części: jedna ma $a$ kafli wysokości i 
			$b$ kafli szerokości (czyli zawiera $a \cdot b$ kafli), druga ma $a$ 
			kafli wysokości i $c$ kafli szerokości (czyli zawiera $a \cdot c$ kafli). Okazuje się, że
		</p>

		$$
			a(b+c)=ab+ac
		$$

		<p>
			Tak więc kiedy mnożymy cały nawias przez jakąś liczbę, mnożymy tak naprawdę każdy z jego składników osobno.
		</p>
		
		<ul>
			<li>$2(a+b)=2a+2b$</li>
			<li>$2a(2b+3c)=4ab+6ac$</li>
			<li>$-3(4a+5b)=-3 \cdot 4a+(-3) \cdot 5b=-12a-15b$</li>
			<li>$-2a^2 b(4ab^3+3a^3 b^4-5ab)=-8a^3 b^4-6a^5 b^5+10a^3 b^2$</li>
		</ul>
		
		<p>
			Możemy postąpić jeszcze dalej w tym szaleństwie: skonstruujmy tabelkę, która ma w pionie $a+b$ kafli, zaś w 
			poziomie $c+d$ kafli.
		</p>

		<center><img src="./.images/Screenshot_9.png" align="middle"></center>
		
		<p>
			Z jednej strony zużyliśmy $(a+b) \cdot (c+d)$ kafli, z drugiej strony, licząc oddzielnie każdy z czterech obszarów, 
			zużyliśmy $a \cdot c+a \cdot d+b \cdot c+b \cdot d$ kafli. Tak więc:
		</p>

		$$
			(a+b)(c+d)=ac+ad+bc+bd
		$$

		<p class="type">
			Warsztat
		</p>

		<p>
			W ogólności, gdy mnożymy przez siebie dwa nawiasy zawierające sumy algebraiczne, mnożymy składniki „każdy z każdym”.
			Jest to uogólnienie własności zwanej "rozdzielnością mnożenia względem dodawania", o której wspomnieliśmy pobieżnie w temacie 
			<router-link tag="a" :to="'/kolejnosc-wykonywania-dzialan#distributive-property'" class="link">Kolejność wykonywania działań</router-link>.
		</p>

		<center><img src="./.images/Screenshot_10.png" align="middle"></center>
		
		<div class="example">
			Mnożymy prawy nawias kolejno przez $a$, $b$ i $c$, a następnie redukujemy wyrazy podobne.
			$$(a+b+c)(a+b)=\\
			=(a^2+ab)+(ba+b^2)+(ca+cb)=\\
			=a^2+2ab+b^2+ac+bc$$
		</div>

		<div class="example">
			Mnożymy składniki prawego nawiasu przez $2a$ oraz przez $-3b$, pamiętając, że mnożenie przez liczbę ujemną odwraca znak wyrażenia.
			$$(2a-3b)(3a^2+4ab^3 )=\\
			=2a \cdot 3a^2+2a \cdot 4ab^3-3b \cdot 3a^2-3b \cdot 4ab^3=\\
			=6a^3+8a^2 b^3-9a^2 b-12ab^4$$
		</div>

		<div class="example">
			Mnożymy prawy nawias przez $2a$ oraz przez $-2b$. Należy zachować szczególną ostrożność przy mnożeniu liczb ujemnych: iloczyn elementów "na minusie"
			przez elementy "bez minusa" daje w wyniku minus, zaś iloczyn dwóch elementów "na minusie" da w wyniku plus. Na sam koniec zdejmujemy minus stojący 
			przed całym wyrażeniem, odwracając wszystkie znaki wewnątrz nawiasu.
			$$-(2a-2b)(3b^2-6a^2 )=\\
			=-(2a \cdot 3b^2+2a \cdot (-6a^2 )-2b \cdot 3b^2-2b \cdot (-6a^2 ))=\\
			=-(6ab^2-12a^3-6b^3+12a^2 b)=\\
			=-6ab^2+12a^3+6b^3-12a^2 b$$
		</div>

		<div class="example">
			Najpierw mnożymy nawias pierwszy przez drugi, a następnie zajmujemy się mnożeniem przez trzeci.
			$$(a+b)(b+c)(a+c)=\\
			=(ab+ac+b^2+bc)(a+c)=\\
			=(a^2 b+a^2 c+ab^2+abc) + (abc+ac^2+b^2 c+bc^2)=\\
			=a^2 b+a^2 c+ab^2+b^2 c+ac^2+bc^2+2abc$$
		</div>
		</lesson-chapter>

		<lesson-chapter id="powering-algebraic-sums"><template #title>Potęgowanie wyrażeń algebraicznych</template>   
		<p class="type">
			Warsztat
		</p>
		
		<p>
			Podnoszenie do potęgi to nic innego jak wielokrotne mnożenie. Jakkolwiek żmudne i pracochłonne, podpina się pod schemat wymnażania 
			nawiasów:
		</p>

		<ul>
			<li>$(2a-b)^2=(2a-b)(2a-b)=4a^2-2ab-b \cdot 2a+b^2=4a^2-4ab+b^2$</li>
			<li>$(n+3)^3=(n+3)(n+3)(n+3)=(n^2 + 3n + 3n + 9)(n + 3)=\\
			=(n^2 + 6n + 9)(n + 3)=(n^3 + 6n^2 + 9n) + (3n^2 + 18n + 27)=n^3 + 9n^2 + 27n + 27$
			</li>
		</ul>

		<p>
			Ze względu na pracochłonność tych obliczeń, warto pamiętać tzw. wzory skróconego mnożenia,  które mówią, w jaki sposób radzić sobie z 
			potęgami w wyrażeniach algebraicznych. Dla drugiej potęgi wyróżniono trzy wzory skróconego mnożenia.
		</p>

		<div class="formula">
			<ul>
				<li style="text-align: left">Kwadrat sumy: $(a+b)^2=a^2+2ab+b^2$</li>	
				<li style="text-align: left">Kwadrat różnicy: $(a-b)^2=a^2-2ab+b^2$</li>
				<li style="text-align: left">Różnica kwadratów: $(a-b)(a+b)=a^2-b^2$</li>
			</ul>
		</div>

		<p>
			Na pierwszy rzut oka trudno docenić wkład tych wzorów w nasze życie. Dumna nazwa „wzory skróconego mnożenia” to przecież nic innego niż 
			wyniki kilku prostych rachunków:
		</p>
		
		<ul>
			<li>$(a+b)^2=(a+b)(a+b)=a^2+ab+ba+b^2=a^2+2ab+b^2$</li>
			<li>$(a-b)^2=(a-b)(a-b)=a^2-ab-ba-b(-b)=a^2-2ab+b^2$</li>
			<li>$(a+b)(a-b)=a^2-ab+ba-b^2=a^2-b^2$</li>
		</ul>

		<p>
			Istotnie, pamiętając każdy z tych wzorów, zaoszczędzimy sobie aż jednej linijki przekształceń. Miejmy jednak na uwadze, że w tak 
			sformułowanych wzorach litery $a$ oraz $b$ mogą zastępować <b>dowolne</b> wartości liczbowe, a także 
			<b>dowolne</b> wyrażenia algebraiczne, nie ważne jak bardzo złożone. Literki $a$ oraz $b$ 
			możemy traktować jak okienka, w które wolno nam wstawić jakiekolwiek jajko-niespodziankę. Możemy więc walić na ślepo:
		</p>
		
		<div class="example">
			We wzorze na kwadrat sumy, w miejsce okienka "$a$" wstawiamy wyrażenie $3n^2m$, a w miejsce okienka "$b$" wyrażenie $5nm$
			$$(3n^2m+5nm)^2=(3n^2 m)^2+2(3n^2 m)(5nm)+(5nm)^2=9n^4 m^2+30n^3 m^2+25n^2 m^2$$
		</div>
		<div class="example">
			We wzorze na kwadrat różnicy, w miejsce okienka "$a$" wstawiamy $1000$, a w miejsce "$b$" wstawiamy $1$
			$$999^2 = (1000 - 1)^2 = 1000^2 - 2\cdot1000\cdot1 + 1^2 = 1\ 000\ 000 - 2000 + 1 = 998\ 001$$
		</div>
		<div class="example">
			We wzorze na kawadrat sumy, w miejsce okienka "$a$" wstawiamy wyrażenie $a+b$, a w miejsce okienka "$b$" literkę $c$
			$$(a+b+c)^2=(a+b)^2+2(a+b)c+c^2=a^2+2ab+b^2+2ac+2bc+c^2=\\
			=a^2+b^2+c^2+2ab+2ac+2bc$$
		</div>
		<div class="example">
			We wzorze na różnicę kwadratów, w miejsce "$a$" wstawiamy $50$, a w miejsce okienka "$b$" wartośc $1$
			$$51 \cdot 49 = (50 + 1)(50 - 1) = 50^2 - 1^2 = 2500 - 1 = 2499$$
		</div>

		<p>
			Cyniczniejsi z was wciąż mogą bagatelizować wagę tych wzorów. Dydaktycy jednak wiedzą, co robią, gdy tłuką je do głowy. Gdy będziemy 
			zagłębiać się w coraz bardziej zaawansowaną algebrę, dobra znajomość tych wzorów okaże się bardzo przydatna do uzyskania biegłości w 
			przekształceniach. Zachwalamy te wzory zasadniczo z trzech powodów:
		</p>
		
		<ul>
			<li>Pamiętając je, łatwiej podnosić nawiasy do kwadratu (mało istotne);</li>
			<li>Niewłaściwe podnoszenie sum i różnic do kwadratu jest jednym z najczęstszych błędów rachunkowych; wiele osób zapomina o wzorach 
			skróconego mnożenia i wykonuje przekształcenia typu $(a+b)^2=a^2+b^2$ lub 
			$(a-b)^2=a^2-b^2$ (bardziej istotne);</li>
			<li>Najtrudniejsza jest umiejętność wykorzystania tych wzorów od prawej strony równości do lewej. Niejednokrotnie będziemy musieli np. 
			zauważyć, że $a^2-b^2$ można przedstawić jako $(a+b)(a-b)$. Bez dobrej znajomości wzoru na 
			różnicę kwadratów takie przekształcenie jest bardzo nieoczywiste. Kształtujmy dobre odruchy! (bardzo istotne).
			</li>
		</ul>

		<p>
			Istnieją podobne „wzory skróconego mnożenia” dla trzeciej potęgi:
		</p>
		
		<ul class="formula">
			<li style="text-align: left">Sześcian sumy: $(a+b)^3=a^3+3a^2 b+3ab^2+b^3$</li>
			<li style="text-align: left">Sześcian różnicy: $(a-b)^3=a^3-3a^2 b+3ab^2-b^3$</li>
			<li style="text-align: left">Suma sześcianów: $(a+b)(a^2-ab+b^2 )=a^3+b^3$</li>
			<li style="text-align: left">Różnica sześcianów: $(a-b)(a^2+ab+b^2 )=a^3-b^3$</li>
		</ul>

		<p>
			Ich uzasadnienie również jest bardzo proste:
		</p>
		
		<ul>
			<li>$(a+b)^3=(a+b) (a+b)^2=(a+b)(a^2+2ab+b^2 )=\\
			=(a^3+2a^2 b+ab^2) + (ba^2+2ab^2+b^3) = a^3+3a^2 b+3ab^2+b^3$</li>
			<li>$(a-b)^3=(a-b) (a-b)^2=(a-b)(a^2-2ab+b^2 )=\\
			=(a^3-2a^2 b+ab^2) + (-ba^2-b(-2ab)-b^3) = a^3-3a^2 b+3ab^2-b^3$</li>
			<li>$(a+b)(a^2-ab+b^2 )=(a^3-a^2 b+ab^2) + (ba^2-ab^2+b^3) = a^3+b^3$</li>
			<li>$(a-b)(a^2+ab+b^2 )=(a^3+a^2 b+ab^2) - (ba^2-ab^2-b^3) = a^3-b^3$</li>
		</ul>
			
		<p>
			zaś ich przydatność duża, choć może nie tak duża jak dla drugiej potęgi.
		</p>

		<p class="type">
			Rozszerzenie
		</p>
		
		<p>
			Gdyby bardzo nam zależało, moglibyśmy stworzyć coś w rodzaju „wzorów skróconego mnożenia” dla dowolnie dużych potęg. Zajmijmy się najpierw 
			podnoszeniem sumy do coraz wyższych potęg:
		</p>

		<ul>
			<li>$(a+b)^1=a+b$</li>
			<li>$(a+b)^2=a^2+2ab+b^2$</li>
			<li>$(a+b)^3=a^3+3a^2 b+3ab^2+b^3$</li>
			<li>$(a+b)^4=a^4+4a^3 b+6a^2 b^2+4ab^3+b^4$</li>
			<li>$(a+b)^5=a^5+5a^4 b+10a^3 b^2+10a^2 b^3+5ab^4+b^5$</li>
			<li>$(a+b)^6=a^6+6a^5 b+15a^4 b^2+20a^3 b^3+15a^2 b^4+6ab^5+b^6$</li>
			<li>$(a+b)^7=a^7+7a^6 b+21a^5 b^2+35a^4 b^3+35a^3 b^4+21a^2 b^5+7ab^6+b^7$</li>
		</ul>

		<p>
			Jeśli nie wierzysz w któryś z powyższych wzorów, samodzielnie rozpisz go na kolanie. We wzorach na kolejne potęgi wyłania się 
			twarda tendencja: gdy czytamy wzór od lewej do prawej, w każdym kolejnym jednomianie wykładnik zmiennej $a$ zmniejsza się o 
			$1$, a wykładnik zmiennej $b$ zwiększa się o $1$. Współczynniki tych 
			jednomianów także są nieprzypadkowe. Zapiszmy w kolejnych linijkach same współczynniki stojące przy kolejnych wyrazach:
		</p>

		<center><img src="./.images/Screenshot_11.png" align="middle"></center>

		<p>
			Struktura ta, zwana <i>trójkątem Pascala</i>, zachowuje przyjemną właściwość: każda liczba jest sumą dwóch znajdujących się bezpośrednio 
			powyżej. Na brzegach znajdują się jedynki.
		</p>

		<center><img src="./.images/Screenshot_12.png" align="middle"></center>

		<p>
			Rozpisując w dół trójkąt Pascala, znaleźlibyśmy współczynniki dla coraz dalszych wzorów na potęgę sumy. Chwilowo możemy uznać to za 
			magię matematyki. Czar pryśnie, gdy dotrzemy do tematu „Dwumian Newtona”.
		</p>

		<p>
			Jeśli chodzi o wzory na potęgę różnicy, wyglądają one tak samo jak wzory na potęgę sumy, tylko co drugi wyraz jest na minusie:
		</p>

		<ul>
			<li>$(a-b)^1=a-b$</li>
			<li>$(a-b)^2=a^2-2ab+b^2$</li>
			<li>$(a-b)^3=a^3-3a^2 b+3ab^2-b^3$</li>
			<li>$(a-b)^4=a^4-4a^3 b+6a^2 b^2-4ab^3+b^4$</li>
			<li>$(a-b)^5=a^5-5a^4 b+10a^3 b^2-10a^2 b^3+5ab^4-b^5$</li>
			<li>$(a-b)^6=a^6-6a^5 b+15a^4 b^2-20a^3 b^3+15a^2 b^4-6ab^5+b^6$</li>
			<li>$(a-b)^7=a^7-7a^6 b+21a^5 b^2-35a^4 b^3+35a^3 b^4-21a^2 b^5+7ab^6-b^7$</li>
		</ul>

		<p>
			Wynika to z dość prostej obserwacji: jeśli we wzorach na potęgę sumy wstawimy wszędzie $-b$ w miejsce 
			$b$, okaże się, że minus zamieni się na plus przy wszystkich jednomianach, w których wykładnik 
			$b$ jest parzysty; tak więc co drugi wyraz pozostanie ujemny, a co drugi dodatni.
		</p>

		<p>
			Wzory na różnicę potęg także dają się uogólnić:
		</p>
		
		<ul>
			<li>$a^2-b^2=(a-b)(a+b)$</li>
			<li>$a^3-b^3=(a-b)(a^2+ab+b^2)$</li>
			<li>$a^4-b^4=(a-b)(a^3+a^2 b+ab^2+b^3)$</li>
			<li>$a^5-b^5=(a-b)(a^4+a^3 b+a^2 b^2+ab^3+b^4)$</li>
			<li>$a^6-b^6=(a-b)(a^5+a^4 b+a^3 b^2+a^2 b^3+ab^4+b^5)$</li>
			<li>$a^7-b^7=(a-b)(a^6+a^5 b+a^4 b^2+a^3 b^3+a^2 b^4+ab^5+b^6)$</li>
		</ul>

		<p>
			W ogólności:
		</p>
		
		$$
			a^n-b^n=(a-b)(a^{n-1}+a^{n-2} b+a^{n-3} b^2+a^{n-4} b^3+⋯+a^2 b^{n-3}+ab^{n-2}+b^{n-1})
		$$

		<div class="proof">
			<div class="proof-sticker">Dowód</div>
			$(a-b)(a^{n-1}+a^{n-2} b+a^{n-3} b^2+a^{n-4} b^3+⋯+a^2 b^{n-3}+ab^{n-2}+b^{n-1} )=\\
			=a^n+a^{n-1} b+a^{n-2} b^2+a^{n-3} b^3+⋯+a^3 b^{n-3}+a^2 b^{n-2}+ab^{n-1}+\\
			\ \ \ \ \ \ \ \ -a^{n-1} b-a^{n-2} b^2-a^{n-3} b^3-a^{n-4} b^4-…-a^2 b^{n-2}-ab^{n-1}-b^n=\\
			=a^n-b^n  □
			$
		</div>

		<p>
			Wzory na sumę potęg dotyczą tylko wykładników nieparzystych. Wzory na sumę potęg parzystych nie istnieją.
		</p>
		
		<ul>
			<li>$a^3+b^3=(a+b)(a^2-ab+b^2)$</li>
			<li>$a^5+b^5=(a+b)(a^4-a^3 b+a^2 b^2-ab^3+b^4)$</li>
			<li>$a^7+b^7=(a+b)(a^6-a^5 b+a^4 b^2-a^3 b^3+a^2 b^4-ab^5+b^6)$</li>
		</ul>

		<p>
			W ogólności, dla $n$ nieparzystych:
		</p>
		
		$$
			a^n+b^n=(a+b)(a^{n-1}-a^{n-2} b+a^{n-3} b^2-a^{n-4} b^3+⋯+a^2 b^{n-3}-ab^{n-2}+b^{n-1})
		$$

		<div class="proof">
			<div class="proof-sticker">Dowód</div>
			$(a+b)(a^{n-1}-a^{n-2} b+a^{n-3} b^2-a^{n-4} b^3+⋯+a^2 b^{n-3}-ab^{n-2}+b^{n-1})=\\
			=a^n-a^{n-1} b+a^{n-2} b^2-a^{n-3} b^3+⋯+a^3 b^{n-3}-a^2 b^{n-2}+ab^{n-1}+\\
			\ \ \ \ \ \ \ \ \ \ \ \ a^{n-1} b-a^{n-2} b^2+a^{n-3} b^3-a^{n-4} b^4+⋯+a^2 b^{n-2}-ab^{n-1}+b^n=\\
			=a^n+b^n  □$
			<br>
			Uwaga: własność ta wynika ze wzoru na różnicę potęg: gdy we wzorze 
			$$
				a^n-b^n=(a-b)(a^{n-1}+a^{n-2} b+a^{n-3} b^2+a^{n-4} b^3+⋯+a^2 b^{n-3}+ab^{n-2}+b^{n-1})
			$$
			zamienimy $b$ na $-b$, znaki odwrócą się przy składnikach mających $b$ w nieparzystej potędzie. Jeśli $n$ jest nieparzyste, po 
			lewej i prawej stronie pojawią się wyrażenia ze wzoru na sumę potęg (zaś dla $n$ parzystych po lewej stronie wciąż mielibyśmy różnicę).
			Dla $n$ parzystych nie moglibyśmy dokonać powyższego rozpisania: skoro co drugi element w nawiasie jest "na plusie", a co drugi "na minusie",
			ostatni składnik $b^{n-1}$ nie pojawiłby się ze znakiem $+$. 
		</div>
		</lesson-chapter>

		<lesson-chapter><template #title>Wyłączanie czynnika przed nawias</template>   	
		<p class="type">
			Warsztat
		</p>
		
		<p>
			Wymnażanie nawiasów pozwala zamienić iloczyn na sumę algebraiczną. Zależnie od sytuacji, jedna z tych dwóch form okaże się bardziej 
			użyteczna: czasem będziemy chcieli przedstawić wyrażenie jako sumę jednomianów, a czasem będziemy pożądali właśnie postaci zawierającej 
			iloczyn kilku sum. Wymnażanie wyrażeń algebraicznych opanowaliśmy już wcześniej:
		</p>
		
		<ul>
			<li>$2(a+b)=2a+2b$</lI>
			<li>$2a(2b+3c)=4ab+6ac$</li>
			<li>$-3(4a+5b)=-12a-15b$</li>
		</ul>

		<p>
			Wykonując przekształcenia w drugą stronę, dokonujemy <i>wyłączenia czynnika przed nawias</i>.
		</p>

		<ul>
			<li>$2a+2b=2(a+b)$</li>
			<li>$4ab+6ac=2a(2b+3c)$</li>
			<li>$-12a-15b=-3(4a+5b)$</li>
		</ul>

		<p>
			Aby wyłączyć czynnik przed nawias z zadanej sumy algebraicznej, musimy znaleźć czynnik powtarzający się we wszystkich składnikach. 
			Weźmy sumę
		</p>
		
		$$
			12a^2 b+15a^3 b^4 c^5+21a^5 b^3 c
		$$
		
		<p>
			Szukamy zmiennych, które pojawiają się w każdym jednomianie: zmienna $a$ powtarza się w kolejnych składnikach z potegą 
			$a^2$, $a^3$ i $a^5$; wybieramy najmniejszą potęgę $(a^2)$ i wyłączamy tę cząstkę przed nawias. Jednocześnie dla każdej 
			zmiennej wewnątrz nawiasu zmniejszamy wykładnik $a$ o $2$
		</p>
		
		$$
			a^2 (12b+15ab^4 c^5+21a^3 b^3 c)
		$$

		<p>
			Zmienna $b$ pojawia się w kolejnych składnikach jako $b$, $b^4$ i $b^3$; wyłączamy najmniejszą potęgę, 
			czyli $b$, zmniejszając każdy składnik $b$-krotnie:
		</p>

		$$
			a^2 b(12+15ab^3 c^5+21a^3 b^2 c)
		$$

		<p>
			Wyczerpaliśmy powtarzające się zmienne, możemy jeszcze zająć się współczynnikami liczbowymi. Szukamy $NWD$ wszystkich czynników, w tym 
			przypadku $NWD(12,15,21)=3$, więc możemy wyłączyć trójkę przed nawias.
		</p>
		
		$$
			3a^2 b(4+5ab^3 c^5+7a^3 b^2 c)
		$$

		<p>
			Tu nasza misja dobiega końca. Oczywiście
		</p>

		$$
			3a^2 b(4+5ab^3 c^5+7a^3 b^2 c)=12a^2 b+15a^3 b^4 c^5+21a^5 b^3 c
		$$

		<p>
			ponieważ wyłączanie  czynnika nie może zmienić wartości wyrażenia, ma jedynie przedstawić je w innej formie. Dokonaliśmy najpełniejszego 
			wyłączenia przed nawias – nie możemy w żaden sposób wzmocnić czynnika przed nawiasem, aby po wymnożeniu wyrażenie wciąż przedstawiało wyjściową sumę. 
			Mając wprawne oko, można dokonywać wyłączania czynnika za jednym zamachem:
		</p>

		<ul>
			<li>$16a^4 b^6 c^3+14a^3 b^7 c^4 - 18a^2 b^4 c^5 = 2a^2 b^4 c^3 (8a^2 b^2+7ab^3 c - 9c^2)$</li>
			<li>$-2m^3-4n^4 m^5-8k^5 m^3=-2m^3(1+2n^4 m^2+4k^5)$</li>
		</ul>

		<p class="type">
			Rozszerzenie
		</p>
		
		<p>
			Uogólnieniem wyłączania czynnika przed nawias jest bardziej zaawansowana operacja: rozkład wyrażenia na czynniki. Czasami daną sumę 
			algebraiczną można przedstawić w postaci iloczynu innych sum algebraicznych. Doświadczony matematyk mógłby zauważyć, że sumę
		</p>
		
		$$
			2a^2+7ab+6b^2
		$$

		<p>
			można przedstawić jako iloczyn
		</p>

		$$
			(2a+3b)(a+2b)
		$$

		<p>
			W tym przypadku czynnikiem wyłączonym przed nawias nie jest pojedynczy jednomian, ale suma jednomianów. Aby zauważyć takie 
			przekształcenie, trzeba w pamięci wykonać kilka nieoczywistych manewrów:
		</p>

		$$
			2a^2+7ab+6b^2=\\
			=2a^2+4ab+3ab+6b^2=\\
			=2a(a+2b)+3b(a+2b)=\\
			=(2a+3b)(a+2b)
		$$

		<p>
			Umiejętność rozbijania skomplikowanych sum na iloczyny jest niesamowicie przydatna m.in. do rozwiązywania równań wielomianowych 
			(temat „Wielomiany”), jednak w praktyce bardzo ciężko wykonywać takie przekształcenia w pamięci.
		</p>
		</lesson-chapter>

		<lesson-chapter><template #title>Działania na ułamkach algebraicznych</template>  
		<p class="type">
			Warsztat
		</p>
		
		<p>
			Dodanie lub odjęcie dwóch ułamków wymaga sprowadzenia ich do wspólnego mianownika. Jeśli w mianownikach pojawiają się wyrażenia 
			algebraiczne, najprościej uzyskać wspólny mianownik poprzez iloczyn wyjściowych mianowników. Gdy dodajemy / odejmujemy dwa ułamki, 
			zawsze możemy rozszerzyć pierwszy ułamek przez mianownik drugiego oraz rozszerzyć drugi ułamek przez mianownik pierwszego:
		</p>
		
		$$
			\frac{a^2}{3b}+\frac{b}{2a} = \frac{a^2 \cdot 2a}{3b \cdot 2a}+\frac{b \cdot 3b}{2a \cdot 3b} = \frac{2a^3}{6ab}+\frac{3b^2}{6ab} = \frac{2a^3+3b^2}{6ab}
		$$

		<p>
			W niektórych przypadkach warto dokonać rozszerzania nieco oszczędniej. Dla ułamków
		</p>

		$$
			\frac{3a^2+2b^2}{ab}-\frac{2a+3b}{b}
		$$

		<p>
			Rozszerzanie obydwu przez sąsiednie mianowniki nie ma sensu. Wystarczy rozszerzyć drugi ułamek przez $a$:
		</p>
			
		$$
			\frac{3a^2+2b^2}{ab}-\frac{(2a+3b) \cdot a}{b \cdot a} = \frac{3a^2+2b^2}{ab}-\frac{2a^2+3ab}{ab} = 
			\frac{3a^2+2b^2-(2a^2+3ab)}{ab} = \frac{a^2-3ab+2b^2}{ab}
		$$

		<p>
			Gdyby wykonać powyższy przykład, rozszerzając ułamki bardziej ordynarnie, musielibyśmy później dokonać wyłączenia czynnika przed nawias i skrócenia:
		</p>
		
		$$
			\frac{(3a^2+2b^2 ) \cdot b}{ab \cdot b}-\frac{(2a+3b) \cdot ab}{b \cdot ab} = 
			\frac{3a^2 b+2b^3}{ab^2}-\frac{2a^2 b+3ab^2}{ab^2} = \frac{3a^2 b+2b^3-(2a^2 b+3ab^2 )}{ab^2} =\\
			=\frac{a^2 b-3ab^2+2b^3}{ab^2} = \frac{b(a^2-3ab+2b^2 )}{ab^2} = \frac{a^2-3ab+2b^2}{ab}
		$$
			
		<p>
			Ponownie zwracamy uwagę na niebezpieczeństwo odejmowania. Minus stojący przed ułamkiem dotyczy całego ułamka, a nie tylko pierwszego 
			składnika w liczniku:
		</p>

		$$
			\frac{3a^2+2b^2}{ab}-\frac{2a^2+3ab}{ab} = \frac{3a^2+2b^2-(2a^2+3ab)}{ab}\\
			\frac{3a^2+2b^2}{ab}-\frac{2a^2+3ab}{ab} ≠ \frac{3a^2+2b^2-2a^2+3ab}{ab}
		$$

		<p>
			Mnożenie i dzielenie ułamków jest raczej schematyczne. Aby pomnożyć ułamki, mnożymy ich liczniki i mianowniki. Dzielenie to 
			mnożenie przez odwrotność.
		</p>
		
		<div class="example">
			$$\frac{a}{c} \cdot \frac{6ab}{d} \cdot \frac{a^2 c}{2bd^2} \cdot \frac{4cd}{ba^2} = 
			\frac{\require{cancel} a }{\cancel {c}} \cdot \frac{\cancel{6}^3 a \cancel{b}}{5} \cdot \frac{\cancel{a^2} \cancel{c}}{\cancel{2} \cancel{b} d^\cancel{2}} \cdot \frac{4c\cancel{d}}{b\cancel{a^2}} =
			\frac{12a^2c}{5bd}$$
		</div>
		<div class="example">
			$$\frac{x+y}{3} : \frac{2}{x-y} = \frac{x+y}{3} \cdot \frac{x-y}{2} = \frac{(x+y)(x-y)}{3 \cdot 2} = \frac{x^2-y^2}{6}$$
		</div>		

		<div class="example">
			$$\frac{1}{\frac{1}{x} + \frac{1}{y}} = \frac{1}{\frac{x}{xy} + \frac{y}{xy}} = \frac{1}{\frac{x + y}{xy}} = 
			\frac{xy}{x + y}$$
		</div>
		</lesson-chapter>

		<lesson-chapter><template #title>Przećwicz to!</template>  
		<p class="type">
			Warsztat
		</p>
		<p> 
			Wpisz poniżej swoje ulubione wyrażenie algebraiczne i zobacz, w jaki sposób można je uprościć.
		</p>
		<algebraic-calculator></algebraic-calculator>
		</lesson-chapter>

	</lesson>
</template>

<script>
import LessonTitle from "../../../lesson/LessonTitle";
import LessonIntro from "../../../lesson/LessonIntro";
import LessonChapter from "../../../lesson/chapter/LessonChapter";
import Lesson from "../../../lesson/Lesson.vue";
import AlgebraicCalculator from "./AlgebraicCalculator";

export default {
	name: "DzialaniaNaWyrazeniachAlgebraicznych",
	data() {
		return {
			chapters: []
		};
	},
	components: {
		LessonIntro,
		LessonTitle,
		LessonChapter,
		Lesson,
		AlgebraicCalculator
	}
};
</script>

<style scoped>
	.table1 tr td
	{
		padding: 0px 60px;
	}

	.table2
	{
		border-collapse: collapse;
		margin: 50px 0 50px 0;
	}

	.table2 th
	{
		border-bottom: 2px solid black;
		font-size: 20px;
		text-align: center;
		border-right: 2px solid black;
		color: #772222;
			text-shadow: 1px 1px #CCCCCC;
		padding: 8px;
	}

	.table2 th:last-child
	{
		border-right: 0
	}

	.table2 td
	{
		border-right: 2px solid black;
		text-align: center;
		width: 20%;
	}

	.table2 td:nth-child(2),
	.table2 td:nth-child(4),
	.table2 th:nth-child(2),
	.table2 th:nth-child(4)
	{
		border-right: 1px solid #888888;
	}

	.table2 td:last-child
	{
		border-right: 0
	}

	table.factorisation
	{
		border-collapse: collapse;
		font-family: Cambria Math;
	}

	table.factorisation td:nth-child(odd)
	{
		border-right: 1px solid black;
		height: 30px;
		padding-right: 5px;
		text-align: right;
	}

	table.factorisation td:nth-child(even)
	{
		height: 30px;
		padding-left: 5px;
		text-align: left;
	}
</style>
