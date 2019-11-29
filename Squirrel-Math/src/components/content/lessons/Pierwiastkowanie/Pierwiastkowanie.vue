<template>
  <lesson routeShortVersion="/pierwiastkowanie-short" routeLongVersion="/pierwiastkowanie">
    <lesson-title>Pierwiastkowanie</lesson-title>

    <lesson-intro>
		<p>
			Podczas gdy humaniści będą szukać pierwiastka dobra w potępionych niegodziwcach, chemicy brakujących pierwiastków w tablicy 
			Mendelejewa, my zajmiemy się poszukiwaniem pierwiastków liczb w naszym odrealnionym świecie. Tak jak odejmowanie jest odwrotnością 
			dodawania, dzielenie jest odwrotnością mnożenia, tak pierwiastkowanie to odwrotność potęgowania. 
		</p>
    </lesson-intro>

    <lesson-chapter><template #title>Potęga na opak</template>
		<p class="type">
			Intuicje
		</p>
		
		<p>
			Maciuś uzbierał w skarbonce $80 \text{ zł}$ na nowy zestaw Lego, a teraz chce naciągnąć rodziców na taką kwotę, żeby w 
			sumie wyszło $130 \text{ zł}$ na <comment text= 
			"Właściwie patrząc na dzisiejsze ceny, może starczyłoby na figurkę Chewbacki">Falcona Millenium</comment>.  
		</p>

		$$
			80 \text{ zł}+ \text{∎}=130 \text{ zł}
		$$

		<p>
			Aby poznać brakujący składnik, Maciuś musi wykonać odejmowanie, czyli spojrzeć na dodawanie od drugiej strony. 
		</p>

		$$
			130 \text{ zł}-80 \text{ zł} =50\text{ zł}
		$$

		<p>
			Rok później przyjaciele Maciusia postanowili kupić mu na urodziny zestaw <comment text="Ponieważ dobrze wiedzieli, 
			że Maciuś nigdy nie zostanie wielkim architektem"> małego architekta</comment> za 
			$200 \text{ zł}$. Było ich pięcioro, a każdy z nich powinien mieć równy wkład w prezent. Powstało pytanie, po ile 
			powinni się złożyć:
		</p>

		$$
			5 \cdot \text{∎}=200 \text{ zł}
		$$

		<p>
			Odpowiedź przynosi wykonanie dzielenia:
		</p>

		$$
			\frac{200 \text{ zł}}{5}=40\text{ zł}
		$$

		<p>
			Maciuś, szczęśliwy posiadacz od groma klocków, postanowił zbudować dzieło swojego życia: ogromną, wypełnioną w środku bryłę w
			sześciennym kształcie. Oczywiście Maciuś wie, że idealna bryła powinna mieć tyle samo klocków wysokości, szerokości i głębokości. 
			Ponieważ Maciuś nigdy nie był normalnym dzieckiem, postanowił najpierw policzyć, ile ma klocków, aby zdecydować się co do wymiarów 
			pokaźnej budowli. Okazało się, że jest ich $512$ w przeliczeniu na klocki jednostkowe. Pytanie brzmi, jakie powinny być wymiary budowli, 
			aby starczyło na nią $512$ klocków? Pojawia się dylemat:
		</p>

		$$
			\text{∎}^3=512
		$$

		<p>
			Gdy przypomnimy sobie wartości podstawowych kwadratów i sześcianów liczb, dotrzemy do prawdy:
		</p>

		$$
			8^3=512
		$$

		<p>
			A więc Maciuś może pozwolić sobie na niesamowitą budowlę o wymiarach $8×8×8$ klocków.
			Operacja, której dokonaliśmy, aby poznać odpowiedź, to właśnie działanie odwrotne do potęgowania: dokonaliśmy pierwiastkowania liczby 
			$512$.
		</p>

		$$
			\sqrt[3]{512}=8
		$$

		<p>
			Powyższy zapis odczytujemy „pierwiastek trzeciego stopnia z $512$ wynosi $8$” i oznacza on 
			właśnie tyle, że $8$ podniesione do potęgi trzeciej daje $512$.
		</p>

		<p class="type">
			Formalnie
		</p>
		
		<p>
			Jeśli $a$ oraz $b$ są liczbami dodatnimi, stwierdzenie, że 
			$\sqrt[n]{a}=b$ jest dokładnie równoważne równości $b^n=a$. W taki właśnie sposób 
			definiujemy pierwiastek: Jeśli $a$ jest liczbą nieujemną, $\sqrt[n]{a}$ to taka nieujemna 
			liczba $b$, dla której $b^n=a$. 
			Matematycznie zapiszemy definicję pierwiastka (dla nieujemnych $a$) w jednej linijce:
		</p>

		$$
			\sqrt[n]{a}=b \Leftrightarrow b^n=a ∧ b≥0
		$$

		<p>
			Symbol $∧$ to matematyczny spójnik "oraz", w powyższej formule oznacza on, że obydwa warunki są potrzebne do zdefiniowania pierwiastka.
			Przypadek dla ujemnych $a$ jest trochę bardziej kłopotliwy; wówczas warunek $b≥0$ 
			nie będzie potrzebny, jednak pojawią się inne obostrzenia. Więcej w sekcji "Ograniczenia".
		</p>
    </lesson-chapter>

    <lesson-chapter><template #title>Oznaczenia</template>    
		<p class="type">
			Intuicje
		</p>
		
		<p>
			O pierwiastkowaniu należy myśleć jak o działaniu, które przyjmuje dwa parametry i zwraca w odpowiedzi wynik. Liczba zapisana pod 
			symbolem $\sqrt{\ \ \ }$ to <i>liczba podpierwiastkowa</i>, a liczba umieszczona „na dłoni” tego symbolu w lewym górnym rogu 
			to <i>stopień pierwiastka</i>. 
		</p>

		<p>
			Ponieważ drugą potęgę liczby nazywamy kwadratem, a trzecią sześcianem tej liczby, analogiczne nazewnictwo wprowadzono dla 
			pierwiastków: pierwiastek drugiego stopnia nazywamy <i>pierwiastkiem kwadratowym</i>, a pierwiastek trzeciego stopnia <i>pierwiastkiem 
			sześciennym</i>. Co więcej, ponieważ pierwiastki kwadratowe spotyka się w matematyce najczęściej, zwyczajowo pomija się dwójkę do 
			oznaczania pierwiastka drugiego stopnia. Zapisy: $\sqrt[2]{25}=5$ oraz $\sqrt{25}=5$ oznaczają 
			dokładnie to samo. Zazwyczaj kiedy mówimy po 
			prostu „pierwiastek z $4$”, mamy na myśli właśnie pierwiastek kwadratowy.
		</p>
			
		<p>
			W dziedzinie informatycznej do oznaczania pierwiastka drugiego stopnia stosuje się oznaczenie $\text{sqrt}$
			jako skrót od „square root” – 
			pierwiastek kwadratowy. Jeśli chcesz obliczyć pierwiastek kwadratowy z 
			$25$ w wyszukiwarce lub w kalkulatorze internetowym, spróbuj wpisać $\text{sqrt}(25)$.
		</p>
    </lesson-chapter>

    <lesson-chapter><template #title>Obliczanie pierwiastków</template>  
		<p class="type">
			Intuicje
		</p>
		
		<p>
			Przypomnijmy sobie tabelkę z wartościami kwadratów i sześcianów liczb naturalnych. Możemy przedstawić ją w równoważnej, 
			nieco zmodyfikowanej formie:
		</p>

		<table class="table1 center">
			<tr><td>$\sqrt{0}=0$</td><td>$\sqrt[3]{0}=0$</td></tr>
			<tr><td>$\sqrt{1}=1$</td><td>$\sqrt[3]{1}=1$</td></tr>
			<tr><td>$\sqrt{4}=2$</td><td>$\sqrt[3]{8}=2$</td></tr>
			<tr><td>$\sqrt{9}=3$</td><td>$\sqrt[3]{27}=3$</td></tr>
			<tr><td>$\sqrt{16}=4$</td><td>$\sqrt[3]{64}=4$</td></tr>
			<tr><td>$\sqrt{25}=5$</td><td>$\sqrt[3]{125}=5$</td></tr>
			<tr><td>$\sqrt{36}=6$</td><td>$\sqrt[3]{216}=6$</td></tr>
			<tr><td>$\sqrt{49}=7$</td><td>$\sqrt[3]{343}=7$</td></tr>
			<tr><td>$\sqrt{64}=8$</td><td>$\sqrt[3]{512}=8$</td></tr>
			<tr><td>$\sqrt{81}=9$</td><td>$\sqrt[3]{729}=9$</td></tr>
			<tr><td>$\sqrt{100}=10$</td><td>$\sqrt[3]{1000}=10$</td></tr>
		</table>

		<p>
			Obliczanie pierwiastka jest bardzo łatwe, jeżeli pierwiastkujemy liczbę, którą rozpoznajemy jako odpowiednią potęgę liczby naturalnej. 
			Sprawa robi się ciekawa, gdy zapytamy o wartość pierwiastka z liczby leżącej pomiędzy powyższymi. 
		</p>

		<p>
			Jaką wartość ma $\sqrt{2}$ ? Innymi słowy, jaka liczba podniesiona do kwadratu daje $2$? 
			Zauważmy, że $1$ podniesione do kwadratu daje $1$, czyli mniej niż chcemy, a 
			$2$ podniesione do kwadratu daje $4$, czyli więcej niż chcemy. Możemy więc podejrzewać, 
			że tajemnicza wartość $\sqrt{2}$ leży gdzieś pomiędzy $1$ a $2$, czyli
			z pewnością musi to być liczba z częścią ułamkową. A więc próbujemy:
		</p>
		
		<ul>
			<li>$(1,5)^2=2,25$, czyli $1,5$ to za dużo</li>
			<li>$(1,3)^2=1,69$, czyli $1,3$ to za mało</li>
			<li>$(1,4)^2=1,96$, czyli $1,4$ to wciąż za mało, chociaż jesteśmy już bardzo blisko</li>
			<li>$(1,41)^2=1,9881$, a więc $1,41$ to już bardzo bliska wartość, choć wciąż za mała</li>
			<li>$(1,42)^2=2,0164$, czyli powinniśmy szukać pomiędzy $1,41$ a $1,42$</li>
		</ul>
			
		<p>
			Grę w zgaduj zgadula moglibyśmy kontynuować jeszcze bardzo, bardzo długo. Gdyby starczyło nam cierpliwości, znaleźlibyśmy więcej 
			cyfr mistycznej liczby $\sqrt{2}$:
		</p>

		$$
			\sqrt{2}=1,414213562373095048801688724209698078569671875376948073176…
		$$

		<p>
			Do tej pory zawsze, gdy obcowaliśmy z ułamkami dziesiętnymi, rozwinięcie dziesiętne albo kończyło się w pewnym miejscu, albo zaczynało 
			zataczać pętle, ujawniając swój okres. Okazuje się, że w przypadku liczby $\sqrt{2}$ nic takiego nie ma miejsca: 
			rozwinięcie dziesiętne $\sqrt{2}$ jest <b>nieskończone</b> i <b>nieokresowe</b>. Z powodu takiego zachowania wyróżnia się nowy 
			rodzaj liczb: <i>liczby niewymierne</i>. Wprowadźmy istotne rozróżnienie:
		</p>

		<ul>
			<li>Liczby wymierne to takie, których rozwinięcie dziesiętne jest skończone lub posiada okres. Każdą liczbę wymierną można przedstawić w 
			postaci ułamka zwykłego, który posiada w liczniku oraz w mianowniku liczbę całkowitą;</li>
			<li>Liczby niewymierne posiadają nieskończone rozwinięcie dziesiętne, w którym nie ma okresu. Liczby niewymiernej nie da się zapisać jako 
			ułamka zwykłego mającego w liczniku i mianowniku liczbę całkowitą.</li>
		</ul>

		<p>
			Liczby wymierne i niewymierne obejmujemy wspólnym mianem <i>liczby rzeczywiste</i>. Praktycznie patrząc, liczba rzeczywista to każda 
			liczba, którą da się zapisać w systemie dziesiętnym. W obserwowalnym świecie wszystko, co chcemy opisać przy pomocy pewnej miary – 
			czy to długość, temperaturę, wagę, odcień koloru, poziom jasności czy ilość sąsiadek obgadujących nas za plecami – można wyrazić 
			liczbą rzeczywistą. Liczby nierzeczywiste to już wyłącznie wymysły matematyków na poziomie czarnoksiężników.
		</p>

		<p>
			Ostatecznie jednak nie odpowiedzieliśmy na pytanie, jak obliczać pierwiastki. Smutna lecz prawdziwa odpowiedź brzmi: na kalkulatorze. 
			Metoda „zgaduj zgadula” przedstawiona przed chwilą to jedna z prostszych i bardziej efektywnych metod obliczania pierwiastków, gdy 
			nie mamy pod ręką komputera. Miejmy na uwadze, że obliczenie pierwiastka czwartego stopnia przez zgadywanie wymagałoby podnoszenia do 
			czwartej potęgi każdego kandydata…
		</p>

		<p>
			W praktyce najczęściej spotykanymi pierwiastkami są pierwiastki kwadratowe i sześcienne. Gdy w przyszłości w trakcie obliczeń 
			napotkamy np. $\sqrt{5}$, nie będziemy próbowali „obliczyć go” przez rozpisanie rozwinięcia dziesiętnego – zostawimy go 
			w spokoju. Liczby niewymierne są w pewnym sensie nietykalne obliczeniowo.
		</p>

		<p>
			Mimo wszystko dobrze jest mieć wyobrażenie, jak mniej więcej wyglądają niektóre pierwiastki:
		</p>

		<table class="table1 center">
			<tr><td>$\sqrt{0}=0$</td><td>$\sqrt[3]{0}=0$</td></tr>
			<tr><td>$\sqrt{1}=1$</td><td>$\sqrt[3]{1}=1$</td></tr>
			<tr><td>$\sqrt{2}≈1,41$</td><td>$\sqrt[3]{2}≈1,26$</td></tr>
			<tr><td>$\sqrt{3}≈1,73$</td><td>$\sqrt[3]{3}≈1,44$</td></tr>
			<tr><td>$\sqrt{4}=2$</td><td>$\sqrt[3]{4}≈1,59$</td></tr>
			<tr><td>$\sqrt{5}≈2,24$</td><td>$\sqrt[3]{5}≈1,71$</td></tr>
			<tr><td>$\sqrt{6}≈2,45$</td><td>$\sqrt[3]{6}≈1,82$</td></tr>
			<tr><td>$\sqrt{7}≈2,65$</td><td>$\sqrt[3]{7}≈1,91$</td></tr>
			<tr><td>$\sqrt{8}≈2,83$</td><td>$\sqrt[3]{8}=2$</td></tr>
			<tr><td>$\sqrt{9}=3$</td><td>$\sqrt[3]{9}≈2,08$</td></tr>
			<tr><td>$\sqrt{10}≈3,16$</td><td>$\sqrt[3]{10}≈2,15$</td></tr>
		</table>
    </lesson-chapter>

    <lesson-chapter><template #title>Dlaczego $\sqrt{2}$ jest niewymierny?</template>  
		<p class="type">
			Rozszerzenie
		</p>

		<p>
			W poprzednim rozdziale zasialiśmy plotkę propagującą, że w liczbie $\sqrt{2}$ jest coś nietypowego. Mianowicie, że nasze próby poznania 
			dokładnej reprezentacji dziesiętnej pierwiastka z dwóch są skazane na porażkę. W przypadku liczb wymiernych, czyli ułamków zwykłych, znalezienie 
			ich reprezentacji dziesiętnej było stosunkowo proste, odbywało się poprzez wykonanie dzielenia w słupku aż do napotkania okresu. W takim razie 
			skąd wiadomo, że rozwinięcie dziesiętne $\sqrt{2}$ nie staje się w pewnym momencie powtarzalne? Skąd pewność, że gdzieś po przecinku,
			choćby bardzo daleko, nie pojawi się okres?
		</p>

		<p>
			Dylemat ten dręczył matematyków już w starożytnej Grecji, zaś błyskotliwej odpowiedzi udzielił rzekomo Pitagoras. Dowód twierdzenia, 
			że $\sqrt{2}$ nie jest liczbą wymierną, jest satysfakcjonująco prosty a zarazem nieoczywisty.
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

		<p>
			Powyższy dówód został przeprowadzony według schematu znanego jako <i>dowód przez sprzeczność</i>. Chcemy przekonać kogoś, do swoich racji, 
			czyli uzasadnić słuszność jakiegoś stwierdzenia. Rozważamy, czy jest możliwe, żeby to stwiedzenie nie było 
			prawdziwe. Zastanawiamy się "a co by było gdyby" i rozważamy scenariusz przeczący stwierdzeniu, 
			którego dowodzimy. Poprzez logiczne kroki rozumowania zbliżamy się do nieuniknionej katastrofy. Podsumowujemy argumentację stwierdzeniem "gdyby było 
			inaczej niż ja mówię, to wszystko by się kompletnie pokopało". To bardzo mocny przekaz. Ciężko się z nim kłócić.
		</p>

    </lesson-chapter>

    <lesson-chapter><template #title>Potęgi o wykładniku wymiernym</template>  
		<p class="type">
			Intuicje
		</p>
		
		<p>
			Pora rozwiązać zagadkę, która wywiązała się w temacie o potęgowaniu: co zrobić, gdy w wykładniku potęgi pojawia się ułamek? Spróbujmy 
			rozgryźć wartość
		</p>

		$$
			3^{\frac{1}{2}}
		$$

		<p>
			Chwilowo liczba „trzy do potęgi jednej drugiej” pozostaje dla nas tajemnicą. Cokolwiek by ona nie oznaczała, wolno nam przypuścić, że jej zachowanie 
			jest spójne z własnościami, które wykazują potęgi całkowite. Przypomnijmy sobie niedawno odkrytą własność potęgowania, mówiącą, że 
			gdy potęgę podnosimy do potęgi, mnożymy przez siebie wykładniki:
		</p>

		$$
			(a^n )^m=a^{n \cdot m}
		$$

		
		<p>
			W takim razie co by się stało, gdyby $3^{\frac{1}{2}}$ podnieść do kwadratu?
		</p>
		
		$$
			\left(3^{\frac{1}{2}} \right)^2=3^{\frac{1}{2} \cdot 2}=3^1=3
		$$
		
		<p>
			Odkryliśmy ciekawą rzecz: 
			$3^{\frac{1}{2}}$ to taka liczba, że jak ją podniesiemy do kwadratu, dostaniemy $3$. A 
			przecież „liczba, która podniesiona do kwadratu, daje $3$” to nic innego niż $\sqrt{3}$. 
			Wniosek jest nieunikniony:
		</p>
		
		$$
			3^{\frac{1}{2}}=\sqrt{3}
		$$

		<p>
			Trik stosuje się do wszystkich wykładników typu „jeden przez coś”:
		</p>
		
		<ul>
			<li>$\left(5^{\frac{1}{3}}\right)^3=5^{\frac{1}{3} \cdot 3}=5^1=5$, a więc $5^{\frac{1}{3}}=\sqrt[3]{5}$</li>
			<li>$\left(9^\frac{1}{5} \right)^5=9^{\frac{1}{5} \cdot 5}=9^1=9$, a więc $9^{\frac{1}{5}}=\sqrt[5]{9}$</li>
		</ul>

		<p>
			W ogólności:
		</p>
		
		$$
			\left(a^{\frac{1}{n}} \right)^n=a^{\frac{1}{n} \cdot n}=a^1=a
		$$
		
		<p>
			a więc
		</p>
		
		$$
			a^{\frac{1}{n}}=\sqrt[n]{a}
		$$

		<p>
			Poszerzmy nasze rozumowanie na wykładniki typu „coś przez coś”. Ponownie pomocna będzie własność dotycząca mnożenia wykładników:
		</p>
		
		$$
			7^{\frac{3}{5}}=7^{\frac{1}{5} \cdot 3}=\left(7^{\frac{1}{5}} \right)^3=\sqrt[5]{7}^3
		$$
		
		<p>
			W ogólności:
		</p>
		
		$$
			a^{\frac{n}{m}}=a^{\frac{1}{m} \cdot n}= \left(a^{\frac{1}{m}} \right)^n=\left(\sqrt[m]{a} \right)^n
		$$
		
		<p>
			Dotarliśmy do bardzo przydatnego wzoru, który wskazuje przejście pomiędzy pierwiastkiem i potęgą. Stanowi on sensowną definicję potęgi
			o wykładniku wymiernym:
		</p>
		
		$$
			a^{\frac{n}{m}}=\sqrt[m]{a}^n
		$$

		<p>
			To spostrzeżenie rozwiązuje przy okazji inny dylemat – <comment text="Oczywiście - z należytym szacunkiem">jak traktować 
			pierwiastki o stopniu wymiernym</comment>:
		</p>

		<ul>
			<li>$\sqrt[\frac{1}{3}]{4}=4^{\frac{1}{\frac{1}{3}}}=4^3=64$</li>
			<li>$\sqrt[\frac{3}{4}]{27}=27^{\frac{1}{\frac{3}{4}}}=27^{\frac{4}{3}}=\sqrt[3]{27}^4=3^4=81$</li>
			<li>$\sqrt[-1 \frac{2}{3}]{32}=\sqrt[-\frac{5}{3}]{32}=32^{-\frac{3}{5}}=\frac{1}{32^\frac{3}{5}} = \frac{1}{\sqrt[5]{32}^3} = \frac{1}{2^3} = \frac{1}{8}$</li>
		</ul>
    </lesson-chapter>

    <lesson-chapter><template #title>Potęgi o wykładniku rzeczywistym</template>  
		<p class="type">
			Rozszerzenie
		</p>
		
		<p>
			Zbyt ciekawskie osoby, które lubią pytania „co by było gdyby” pewnie zastanawiają się, jak wykonuje się potęgowanie o wykładniku 
			niewymiernym. Przykładowo, jak oblicza się $3^\sqrt{2}$ ? Otóż: nie oblicza się. Najlepiej zostawić to w spokoju i 
			nie tykać kijem, ale jeśli ktoś jest bardzo ciekaw wartości liczbowej takiego mutanta, może dokonywać przybliżeń. 
			$\sqrt{2}$ to około $1,41$, więc $3^\sqrt{2}$ to około 
			$3^{1,41}=3^{\frac{141}{100}}=\sqrt[100]{3}^{141}≈4,70696500172$. Jeśli zależy nam na dokładniejszym wyniku, musimy lepiej 
			przybliżyć $\sqrt{2}$. Jeśli weźmiemy $\sqrt{2}≈1,414213562373095048801688724209698078569671$,
			to  $3^\sqrt{2}$ przybliżymy jako
			$3^{1,414213562373095048801688724209698078569671}=
			3^\frac{1414213562373095048801688724209698078569671}{100000000000000000000000000000000000000000}=\\
			=\sqrt[100000000000000000000000000000000000000000]{3}^{1414213562373095048801688724209698078569671}≈
			4,72880438784$
		</p>
			
		<p>
			Coraz dokładniejsze przybliżenia $\sqrt{2}$ będą wywoływać coraz mniej znaczące modyfikacje w pożądanym wyniku.
		</p>
    </lesson-chapter>

    <lesson-chapter><template #title>Ograniczenia</template>  
		<p class="type">
			Intuicje
		</p>
		
		<p>
			Wykonywanie dzielenia narzucało dość istotną zasadę: nie wolno dzielić przez $0$. Pierwiastkowanie również 
			narzuca kilka ograniczeń, istnieją pierwiastki zabronione.
		</p>

		<p>
			Wiemy już, że dowolna liczba podniesiona do potęgi zerowej daje $1$:
		</p>
		
		$$
			a^0=1
		$$
		
		<p>
			Dlatego, jak się dobrze zastanowić, nie ma sensu pytać o pierwiastek zerowego stopnia. Pierwiastek typu 
			$\sqrt[0]{3}$ stawiałby pytanie „jaka liczba podniesiona do potęgi $0$ daje $3$?” 
			z oczywistą odpowiedzią: „żadna”. Podobnie, pierwiastek $\sqrt[0]{1}$ stawia pytanie: „jaka liczba podniesiona do 
			potęgi $0$ daje $1$?” na co odpowiedź brzmi „każda”. Ponieważ tego typu rozmówki 
			podpadają pod paranoiczne, zabrania się pierwiastkowania z zerowym stopniem.
		</p>
		
		<p>
			Wiemy także, że podnoszenie liczb ujemnych do parzystych potęg daje wynik dodatni:
		</p>
		
		$$
			(-3)^2=(-3) \cdot (-3)=9
		$$
		
		<p>
			Oczywiście podnoszenie liczb dodatnich do kwadratu także daje wynik dodatni. Uwzględniając $0$, które 
			podniesione do kwadratu daje $0$, możemy stwierdzić ogólnie, że <b>każda</b> liczba podniesiona do kwadratu daje wynik 
			nieujemny (dodatni lub zerowy). Co mógłby oznaczać pierwiastek z liczby ujemnej? $\sqrt{-4}$ to rzekomo taka liczba, 
			która podniesiona do kwadratu daje $-4$… Trochę ciężko o  takiego delikwenta, skoro podniesienie do kwadratu nie 
			może dawać liczby ujemnej. Ustalamy więc zasadę: nie wolno wyciągać pierwiastków parzystego stopnia z liczb ujemnych. 
		</p>

		<p>
			Rygor ten nie dotyczy pierwiastków nieparzystego stopnia:
		</p>
		
		<p style="text-align: center">
			$\sqrt[3]{-8}=-2$, ponieważ $(-2)^3=-8$
		</p>
			
		<p>
			Mimo wszystko pierwiastkowanie liczb ujemnych lub podnoszenie ich do ułamkowych potęg to stąpanie po cienkim lodzie. Przez 
			nieuwagę bardzo łatwo można wpaść w pułapkę:
		</p>

		$$
			-1=(-1)^1=(-1)^{\frac{2}{2}}=(-1)^{2 \cdot \frac{1}{2}}=((-1)^2 )^{\frac{1}{2}}=\sqrt{(-1)^2 }=\sqrt{1}=1
		$$

		<p>
			Właśnie za pomocą kilku przekształceń pokazaliśmy, że $-1=1$. Stwierdzenie „mieć ciastko i zjeść ciastko 
			to przecież to samo” brzmi cokolwiek nihilistycznie, dlatego miejmy na uwadze rolę licznika i mianownika w wykładniku we wzorze
		</p>
		
		$$
			a^{\frac{n}{m}}=\sqrt[m]{a}^n
		$$
		
		<p>
			Gdy podnosimy liczbę do potęgi ułamkowej, powinniśmy najpierw dokonać pierwiastkowania ze względu na mianownik, a 
			dopiero później potęgowania ze względu na licznik. Kolejność ta nie ma znaczenia dla dodatnich 
			$a$, jednak zmienia dużo w przypadku $a$ poniżej zera.
		</p>

		<p class="type">
			Rozszerzenie
		</p>
		
		<p>
			Tak naprawdę… wolno wyciągać pierwiastki parzystego stopnia z liczb ujemnych. Ale w tym momencie wychodzimy poza rozważania na temat 
			liczb rzeczywistych. W lekcji „Liczby zespolone” dowiemy się, że liczbę $\sqrt{-1}$ traktuje się w sposób specjalny, 
			jak upośledzone dziecko rozkoszy cielesnych matematyka po czterdziestce ze swoją niewyżytą wyobraźnią. Pierwiastki z 
			liczb ujemnych nazywamy (całkiem poważnie) <i>liczbami urojonymi</i>, a dla $\sqrt{-1}$ wprowadzono specjalne oznaczenie: 
			$\sqrt{-1}=i$, literka $i$ na cześć słowa „imaginary” – wyimaginowany, urojony. Aby zajmować się liczbami 
			zespolonymi na poważnie, trzeba przebyć jeszcze dość długą drogę.
		</p>
    </lesson-chapter>

    <lesson-chapter><template #title>Własności pierwiastkowania</template>  
		<p class="type">
			Formalnie
		</p>
		
		<p>
			Pierwiastkowanie jest bardzo silnie skojarzone z potęgowaniem. W poprzedniej sekcji doszliśmy nawet do wniosku, że każdy 
			pierwiastek można przedstawić w postaci potęgi o odwrotnym wykładniku. W takim razie nie powinno dziwić, że własności potęgowania przenoszą się na 
			podobne własności pierwiastkowania. Przyjmujemy, że stopnie pierwiastków mają wartości całkowite. Dla przejrzystości pomijamy cały 
			cyrk z dodatnimi/ujemnymi wartościami liczb podpierwiastkowych.
		</p>
		
		<p class="formula">
			$$\sqrt[n]{\sqrt[m]{a}}=\sqrt[n \cdot m]{a}$$
		</p>
		<div class="proof">
			<div class="proof-sticker">Uzasadnienie</div>
			$\sqrt[3]{\sqrt[2]{64}} = 2$, ponieważ $(2^3)^2 = 64$. Jednocześnie $\sqrt[6]{64} = 2$, ponieważ $2^6 = 64$
		</div>
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
			<div class="proof-sticker">Uzasadnienie</div>
			$$\sqrt{25 \cdot 4} = \sqrt{100} = 10 = 5 \cdot 2 = \sqrt{25} \cdot \sqrt{4}$$
		</div>
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
			<div class="proof-sticker">Uzasadnienie</div>
			$$\sqrt{\frac{36}{25}} = \frac{6}{5} = \frac{\sqrt{36}}{\sqrt{25}}$$
		</div>
		<div class="proof">
			<div class="proof-sticker">Dowód</div>
			Oznaczmy wartość wyrażenia $\sqrt[n]{a}$ przez $x$ oraz wartość wyrażenia $
				\sqrt[n]{b}$ przez $y$. Z definicji pierwiastkowania:
			$$\sqrt[n]{a}=x \Leftrightarrow a=x^n \\
				\sqrt[n]{b}=y \Leftrightarrow b=y^n$$
			Skoro $a=x^n$ oraz $b=y^n$, to $\frac{a}{b}=\frac{x^n}{y^n} = \left(\frac{x}{y} \right)^n$. Mamy więc
			$$\frac{a}{b} = \left(\frac{x}{y} \right)^n \Leftrightarrow \sqrt[n]{\frac{a}{b}} = \frac{x}{y} = \frac{\sqrt[n]{a}}{\sqrt[n]{b}} $$
		</div>

		<p> 
			Chcielibyśmy położyć nacisk, że <b>NIE</b> zachodzą własności na sumę i różnicę pierwiastków:
		</p>

		$$
			\sqrt{a + b} \neq \sqrt{a} + \sqrt{b}\\
			\sqrt{a - b} \neq \sqrt{a} - \sqrt{b}
		$$

		<p> 
			Wystarczy wziąć jakikolwiek przykład: $\sqrt{16 + 9} = \sqrt{25} = 5$ nie jest tym samym, co  $\sqrt{16} + \sqrt{9} = 4 + 3 = 7$.
			Albo choćby $\sqrt{5}$ nie jest tym samym, co $\sqrt{1} + \sqrt{4}$. Przestrzegamy przed tym rodzajem pomyłki, ponieważ popełniana jest ona 
			na każdym poziomie wykształcenia: od podstawowego do uniwersyteckiego.
		</p>

		<p class="type optional-hide">
			Formalnie | Rozszerzenie
		</p>
		<div>
			<p>
				Możemy teraz pełnoprawnie poszerzyć własności potęgowania na wykładniki wymierne. 
			</p>

			<p class="formula">
				$$a^{\frac{p}{q}} \cdot a^{\frac{r}{s}} = a^{\frac{p}{q}+\frac{r}{s}}$$
			</p>
			<div class="proof">
				<div class="proof-sticker">Dowód</div>
				$$a^{\frac{p}{q}} \cdot a^{\frac{r}{s}} = \left( \sqrt[q]{a} \right)^p \cdot \left( \sqrt[s]{a} \right)^r = 
				\left( \sqrt[s]{\sqrt[q]{a}^p} \right)^s \cdot \left( \sqrt[q]{\sqrt[s]{a}^r} \right)^q=
				\left( \sqrt[s]{ \sqrt[q]{a} }^p \right)^s \cdot \left( \sqrt[q]{\sqrt[s]{a}}^r \right)^q =\\
				=\sqrt[q \cdot s]{a}^{p \cdot s} \cdot \sqrt[q \cdot s]{a}^{r \cdot q} = \sqrt[q \cdot s]{a}^{ps+rq}=
				a^{\frac{ps+rq}{qs}}
				=a^{\frac{ps}{qs}+\frac{rq}{qs}}=a^{\frac{p}{q}+\frac{r}{s}}$$
			</div>
			<br><br>

			<p class="formula">
				$$\frac{a^{\frac{p}{q}}}{a^{\frac{r}{s}}} = a^{\frac{p}{q}-\frac{r}{s}}$$
			</p>
			<div class="proof">
				<div class="proof-sticker">Dowód</div>
				$$\frac{a^{\frac{p}{q}}}{a^{\frac{r}{s}}} = a^{\frac{p}{q}} \cdot a^{-\frac{r}{s}}=a^{\frac{p}{q}} \cdot a^{\frac{-r}{s}}=
				a^{\frac{p}{q}+\frac{-r}{s}}=a^{\frac{p}{q}-\frac{r}{s}}$$
			</div>
			<br><br>

			<p class="formula">
				$$\left(a^{\frac{p}{q}}\right)^{\frac{r}{s}} = a^{\frac{p}{q} \cdot \frac{r}{s}}$$
			</p>
			<div class="proof">
				<div class="proof-sticker">Dowód</div>
				$$ \left(a^\frac{p}{q} \right)^{\frac{r}{s}} = \left(\sqrt[s]{ \sqrt[q]{a}^p }\right)^r = \left(\sqrt[s]{ \sqrt[q]{a} }^p\right)^r =
				\left(\sqrt[q \cdot s]{a}\right)^{p \cdot r}=a^{\frac{p \cdot r}{q \cdot s}}=a^{\frac{p}{q} \cdot \frac{r}{s}}$$
			</div>
			<br><br>

			<p class="formula">
				$$\left(a \cdot b\right)^{\frac{p}{q}} = a^\frac{p}{q} \cdot b^{\frac{p}{q}}$$
			</p>
			<div class="proof">
				<div class="proof-sticker">Dowód</div>
				$$ \left(a \cdot b \right)^{\frac{p}{q}} = \left(\sqrt[q]{a \cdot b}\right)^p = \left(\sqrt[q]{a} \cdot \sqrt[q]{b} \right)^p =
				\sqrt[q]{a}^p \cdot \sqrt[q]{b}^p = a^{\frac{p}{q}} \cdot b^{\frac{p}{q}}
				$$
			</div>
			<br><br>

			<p class="formula">
				$$\left(\frac{a}{b}\right)^{\frac{p}{q}}=\frac{a^{\frac{p}{q}}}{b^\frac{p}{q}}$$
			</p>
			<div class="proof">
				<div class="proof-sticker">Dowód</div>
				$$\left(\frac{a}{b}\right)^{\frac{p}{q}} = \left(\sqrt[q]{\frac{a}{b}}\right)^p = \left(\frac{\sqrt[q]{a}}{\sqrt[q]{b}}\right)^p=\frac{\sqrt[q]{a}^p}{\sqrt[q]{b}^p} =
				\frac{a^\frac{p}{q}}{b^\frac{p}{q}} $$
			</div>

			<p>
				Co więcej, własności te działają także dla wykładników rzeczywistych. Ucinając w pewnym miejscu rozwinięcie dziesiętne, można 
				przybliżyć liczbę rzeczywistą (z dowolną dokładnością) do liczby wymiernej, a dla liczb wymiernych nasze własności już działają. 
				Intuicyjnie możemy sobie wyobrazić, że przybliżając liczbę rzeczywistą coraz dokładniej, coraz bardziej zbliżamy się do jej 
				rzeczywistej wartości, cały czas zachowując własności potęgowania. W końcu dotrzemy do „nieskończonej” precyzji i okaże się, że wykładniki 
				niewymierne także zachowują powyższe własności.
			</p>

			<p>
				Trzy własności pierwiastkowania wykazane na początku tej sekcji także działają dla stopni wymiernych:
			</p>
			
			<div class="proof">
				<div class="proof-sticker">Dowód</div>
				<ul>
					<li>$\sqrt[\frac{p}{q}]{\sqrt[\frac{r}{s}]{a}} = (a^{\frac{s}{r}} )^\frac{q}{p} = a^{\frac{s}{r} \cdot \frac{q}{p}} = 
						a^{\frac{s \cdot q}{r \cdot p}} = \sqrt[\frac{r \cdot p}{s \cdot q}]{a} = \sqrt[\frac{r}{s} \cdot \frac{p}{q}]{a}$</li>
					<li>$\sqrt[\frac{p}{q}]{a \cdot b} = (a \cdot b)^{\frac{q}{p}} = a^\frac{q}{p} \cdot b^\frac{q}{p} = 
						\sqrt[\frac{p}{q}]{a} \cdot \sqrt[\frac{p}{q}]{b}$</li>
					<li>$\sqrt[\frac{p}{q}]{\frac{a}{b}} = (\frac{a}{b})^\frac{q}{p} = \frac{a^{\frac{q}{p}}}{b^{\frac{q}{p}}} = 
						\frac{\sqrt[\frac{p}{q}]{a}}{\sqrt[\frac{p}{q}]{b}}$</li>
				</ul>
			</div>
			
			<p>
				Na podobnej zasadzie własności te działają także dla stopni rzeczywistych.
			</p>
		</div>
		</lesson-chapter>

		<lesson-chapter><template #title>Wyłączanie czynnika przed pierwiastek</template>  
		<p class="type">
			Warsztat
		</p>
		
		<p>
			Obliczanie pierwiastków istotnie sprowadza się do wklepania liczb do kalkulatora, zaś my jako śmiertelnicy możemy jedynie starać się o 
			sprowadzenie wyrażenia do najprostszej postaci – podobnie, jak ułamki zwykłe sprowadzamy do postaci nieskracalnej, bo tak wyglądają 
			„ładniej”, chociaż wartość dziesiętną obliczamy tak czy inaczej na kalkulatorze.
		</p>

		<p>
			Upraszczanie pierwiastków wykorzystuje drugą z wyżej wymienionych własności pierwiastkowania:
		</p>
		
		$$
			\sqrt{20}=\sqrt{4 \cdot 5} = \sqrt{4} \cdot \sqrt{5} = 2 \cdot \sqrt{5}=2\sqrt{5}
		$$

		<p>
			Liczba $20$ jest liczbą złożoną, a jednym z jej czynników składowych jest $4$ – czyli 
			dobrze znany nam kwadrat $2$. Możemy dokonać uproszczenia nazywanego <i>wyłączaniem czynnika przed pierwiastek</i> i 
			zapisać $\sqrt{20}$ w postaci $2\sqrt{5}$. Zaleta jest m.in. taka, że mało kto zna na pamięć wartość 
			$\sqrt{20}$, ale są tacy, którzy pamiętają przybliżenie $\sqrt{5}≈2,24$, co pozwala na oszacowanie 
			$\sqrt{20}≈2 \cdot 2,24=4,48$.
		</p>

		<p>
			Aby najpełniej wyłączyć czynnik przed pierwiastek, musimy dokonać rozkładu na czynniki pierwsze liczby podpierwiastkowej. Spróbujmy 
			uprościć $\sqrt{6804}$. Najpierw dokonujemy rozkładu:
		</p>

		<table class="factorisation center">
			<tr><td>$6804$</td><td>$2$</td></tr>
			<tr><td>$3402$</td><td>$2$</td></tr>
			<tr><td>$1701$</td><td>$3$</td></tr>
			<tr><td>$567$</td><td>$3$</td></tr>
			<tr><td>$189$</td><td>$3$</td></tr>
			<tr><td>$63$</td><td>$3$</td></tr>
			<tr><td>$21$</td><td>$3$</td></tr>
			<tr><td>$7$</td><td>$7$</td></tr>
			<tr><td>$1$</td><td></td></tr>
		</table>

		$$
			6804 = 2 \cdot 2 \cdot 3 \cdot 3 \cdot 3 \cdot 3 \cdot 3 \cdot 7 = 2^2 \cdot 3^5 \cdot 7
		$$

		<p>
			Interesują nas te czynniki pierwsze, które występują przynajmniej w drugiej potędze – to właśnie je będziemy wyłączać przed pierwiastek.
		</p>

		$$
			\sqrt{6804} = \sqrt{2^2 \cdot 3^2 \cdot 3^2 \cdot 3 \cdot 7} = \sqrt{2^2 \cdot 3^2 \cdot 3^2 } \cdot \sqrt{3 \cdot 7} = 
			2 \cdot 3 \cdot 3 \cdot \sqrt{3 \cdot 7} = 18\sqrt{21}
		$$

		<p>
			Możemy też wyłączać przed pierwiastek trochę bardziej „na żywioł”. Weźmy $\sqrt{20250}$.
		</p>
		
		<ul>
			<li>Sprawdzamy, czy liczba podpierwiastkowa dzieli się przez $4$. $20250$ nie jest 
			podzielne przez $4$, więc nie wyciągniemy dwójki przed pierwiastek.</li> 
			<li>Sprawdzamy więc, czy $20250$ dzieli się przez $9$ – skoro tak, wyciągamy 
			$\sqrt{20250} = \sqrt{9} \cdot \sqrt{2250} = 3\sqrt{2250}$.</li> 
			<li>Do skutku próbujemy wyciągnąć $9$ spod pierwiastka, przy kolejnej próbie: 
			$3\sqrt{2250} = 3 \cdot \sqrt{9} \cdot \sqrt{250} = 3 \cdot 3 \cdot \sqrt{250} = 9\sqrt{250}$. </li>
			<li>Więcej razy nie wyciągniemy $9$ spod pierwiastka, więc próbujemy wyciągać kwadrat kolejnej liczby pierwszej: 
			$25$. Odnosimy zwycięstwo: $9\sqrt{250}=9 \cdot \sqrt{25} \cdot \sqrt{10}=9 \cdot 5 \cdot \sqrt{10}=45\sqrt{10}$. </li>
			<li>Pierwiastek z $10$ dość zauważalnie jest już nierozkładalny.</li>
		</ul>
    </lesson-chapter>

    <lesson-chapter><template #title>Wyciąganie niewymierności z mianownika</template>  
		<p class="type">
			Warsztat | Rozszerzenie
		</p>
		
		<p class="warning">
			wymagana znajomość tematu: Działania na wyrażeniach algebraicznych
		</p>

		<p>
			Oprócz wyłączania czynnika przed pierwiastek, stosuje się jeszcze jeden zabieg mający sprawić, że liczba będzie zapisana „ładnie”. 
			Otóż matematycznie nieeleganckie jest pozostawianie pierwiastków w mianowniku ułamka. Liczbę
		</p>

		$$
			\frac{3}{\sqrt{2}}
		$$

		<p>
			można zapisać w innej postaci rozszerzając licznik i mianownik przez $\sqrt{2}$:
		</p>
			
		$$
			\frac{3}{\sqrt{2}} = \frac{3 \cdot \sqrt{2}}{\sqrt{2} \cdot \sqrt{2}} = \frac{3 \cdot \sqrt{2}}{\sqrt{2}^2} = \frac{3\sqrt{2}}{2}
		$$

		<p>
			Ułamki $\frac{3}{\sqrt{2}}$ oraz $\frac{3\sqrt{2}}{2}$ reprezentują dokładnie tę samą liczbę, jednak zapis 
			w drugiej 
			formie ma zasadniczą przewagę: pozwala na dokładniejsze szacowanie wartości. Otóż przypuśćmy, że chcemy poznać przybliżoną wartość 
			dziesiętną liczby $\frac{3}{\sqrt{2}}$, w tym celu musimy najpierw dokonać przybliżenia $\sqrt{2}$:
		</p>
		
		<ul>
			<li>Jeśli przybliżymy $\sqrt{2}≈1,4$, dostaniemy $\frac{3}{\sqrt{2}}≈\frac{3}{1,4}≈2,14285714286$</li>
			<li>Jeśli przybliżymy $\sqrt{2}≈1,41$, dostaniemy $\frac{3}{\sqrt{2}}≈\frac{3}{1,41}≈2,12765957447$</li>
			<li>Jeśli przybliżymy $\sqrt{2}≈1,414$, dostaniemy $\frac{3}{\sqrt{2}}≈\frac{3}{1,414}≈2,1216407355$</li>
			<li>Jeśli przybliżymy $\sqrt{2}≈1,4142$, dostaniemy $\frac{3}{\sqrt{2}}≈\frac{3}{1,4142}≈2,12134068731$</li>
		</ul>
		
		<p>
			Im więcej weźmiemy cyfr rozwinięcia $\sqrt{2}$, tym wierniej przybliżymy rzeczywistą wartość $\frac{3}{\sqrt{2}}$. 
			Biorąc przybliżenie 
		</p>
		
		$$
			\sqrt{2} ≈ 1,414213562373095048801688724209698078569671875376948073176
		$$
		
		<p>
			otrzymamy
		</p>
		
		$$
			\frac{3}{\sqrt{2}}≈2,12132034356
		$$
		
		<p>
			I wynik ten możemy uznać za zadowalająco dokładny. Sprawdźmy dla porównania, jak wygląda szacowanie liczby $\frac{3\sqrt{2}}{2}$:
		</p>
		
		<ul>
			<li>Jeśli przybliżymy $\sqrt{2}≈1,4$, dostaniemy $\frac{3\sqrt{2}}{2}≈\frac{3 \cdot 1,4}{2}≈2,1$</li>
			<li>Jeśli przybliżymy $\sqrt{2}≈1,41$, dostaniemy $\frac{3\sqrt{2}}{2}≈\frac{3 \cdot 1,41}{2}≈2,115$</li>
			<li>Jeśli przybliżymy $\sqrt{2}≈1,414$, dostaniemy $\frac{3\sqrt{2}}{2}≈\frac{3 \cdot 1,414}{2}≈2,121$</li>
			<li>Jeśli przybliżymy $\sqrt{2}≈1,4142$, dostaniemy $\frac{3\sqrt{2}}{2}≈\frac{3 \cdot 1,4142}{2}≈2,1213$</li>
		</ul>

		<p>
			Oprócz tego, że obliczanie przybliżonych wartości $\frac{3\sqrt{2}}{2}$ jest znacznie łatwiejsze od obliczania 
			$\frac{3}{\sqrt{2}}$ (mnożenie przez ułamek dziesiętny jest prostsze, niż dzielenie przez ułamek dziesiętny), daje także 
			dokładniejsze wyniki. Zbierzmy wnioski w tabeli:
		</p>

		<table class="table2 center">
			<tr>
				<th>Szacowanie $\sqrt{2}$</th>
				<th>Szacowanie $\frac{3}{\sqrt{2}}$</th>
				<th>Różnica od dokładnego wyniku</th>
				<th>Szacowanie $\frac{3\sqrt{2}}{2}$</th>
				<th>Różnica od dokładnego wyniku</th>
			</tr>
			<tr>
				<td>$1,4$</td>
				<td>$2,14285714286$</td>
				<td>$0,0215367993$</td>
				<td>$2,1$</td>
				<td>$0,02132034356$</td>
			</tr>
			<tr>
				<td>$1,41$</td>	
				<td>$2,12765957447$</td>
				<td>$0,00633923091$</td>
				<td>$2,115$</td>
				<td>$0,00632034356$</td>
			</tr>
			<tr>
				<td>$1,414$</td>	
				<td>$2,1216407355$</td>	
				<td>$0,00032039194$</td>
				<td>$2,121$</td>	
				<td>$0,00032034356$</td>
			</tr>
			<tr>
				<td>$1,4142$</td>
				<td>$2,12134068731$</td>	
				<td>$0,00002034375$</td>	
				<td>$2,1213$</td>
				<td>$0,00002034355$</td>
			</tr>
		</table>
		
		<p>
			Przybliżenia otrzymane po wyciągnięciu niewymierności z mianownika różnią się mniej od dokładnego wyniku, niż przybliżenia z 
			pierwiastkiem w mianowniku.
		</p>

		<p>
			W większości przypadków wyciąganie niewymierności z mianownika jest łatwe i sprowadza się do odpowiedniego rozszerzenia licznika i 
			mianownika:
		</p>
		
		<ul>
			<li>$\frac{10}{\sqrt{5}} = \frac{10 \cdot \sqrt{5}}{\sqrt{5} \cdot \sqrt{5}} = \frac{10\sqrt{5}}{5} = 2\sqrt{5}$</li>
			<li>$\sqrt{\frac{3}{5}} = \frac{\sqrt{3}}{\sqrt{5}} = \frac{\sqrt{3} \cdot \sqrt{5}}{\sqrt{5} \cdot \sqrt{5}} = \frac{\sqrt{3 \cdot 5}}{5} =
				\frac{\sqrt{15}}{5}$</li>
			<li>$\frac{7}{\sqrt[3]{6}} = \frac{7 \cdot \sqrt[3]{6} \cdot \sqrt[3]{6}}{\sqrt[3]{6} \cdot \sqrt[3]{6} \cdot \sqrt[3]{6}} = \frac{7\sqrt[3]{36}}{6}$</li>
			<li>$\frac{10}{\sqrt[4]{75}} = 
				\frac{10 \cdot \sqrt[4]{75} \cdot \sqrt[4]{75} \cdot \sqrt[4]{75}}{\sqrt[4]{75} \cdot \sqrt[4]{75} \cdot \sqrt[4]{75} \cdot \sqrt[4]{75}} =
				\frac{10 \cdot \sqrt[4]{75}^3}{75} = \frac{10 \cdot \sqrt[4]{\left(5^2 \cdot 3 \right)^3}}{75} = \frac{10 \cdot \sqrt[4]{5^6 \cdot 3^3}}{75} =
				\frac{10 \cdot \sqrt[4]{5^4 \cdot 5^2 \cdot 3^3}}{75} =
				\frac{10 \cdot 5 \cdot \sqrt[4]{5^2 \cdot 3^3}}{75} = \frac{2\sqrt[4]{675}}{3}$</li>
		</ul>

		<p>
			Nieco kłopotliwe jest usuwanie z mianownika pierwiastka będącego składnikiem sumy:
		</p>
		
		$$
			\frac{5}{2+\sqrt{3}}
		$$
		
		<p>
			Idea wyciągania niewymierności z mianownika polega na takim zmodyfikowaniu ułamka, aby pierwiastek w mianowniku uległ podniesieniu 
			do potęgi i zniknął. Łatwo się przekonać, że rozszerzenie powyższego ułamka przez mianownik nie jest skuteczną metodą - postępując w 
			ten sposób, uzyskujemy niewymierność zarówno w mianowniku, jak i w liczniku ułamka. Możemy jednak z powodzeniem skorzystać ze wzoru 
			skróconego mnożenia na różnicę kwadratów:
		</p>

		$$
			\frac{5}{2+\sqrt{3}} = \frac{5 \cdot (2-\sqrt{3})}{(2+\sqrt{3}) \cdot (2-\sqrt{3})} = \frac{10-5\sqrt{3}}{2^2-\sqrt{3}^2} = \frac{10-5\sqrt{3}}{4-3} 
			= \frac{10-5\sqrt{3}}{1} = 10-5\sqrt{3}
		$$

		<p>
			Rozszerzamy licznik i mianownik ułamka przez różnicę składników w mianowniku, a następnie korzystamy ze wzoru
		</p>
		
		$$
			(a+b)(a-b) = a^2-b^2
		$$
		
		<p>
			dzięki któremu pierwiastek w mianowniku znika.
		</p>
		
		<div class="example">
			Jeśli w mianowniku występuje różnica z pierwiastkiem, rozszerzamy ułamek przez odpowiednią sumę.
			$$\frac{2}{3-\sqrt{7}} = \frac{2 \cdot (3+\sqrt{7})}{(3-\sqrt{7}) \cdot (3+\sqrt{7})} = \frac{6+2\sqrt{7}}{3^2-\sqrt{7}^2} = 
				\frac{6+2\sqrt{7}}{9-7} = \frac{6+2\sqrt{7}}{2}=3+\sqrt{7}$$
		</div>

		<div class="example">
			Jeśli w mianowniku występuje suma z pierwiastkiem, rozszerzamy przez odpowiednią różnicę.
			$$
				\frac{5+\sqrt{2}}{4+3\sqrt{2}} = \frac{(5+\sqrt{2}) \cdot (4-3\sqrt{2})}{(4+3\sqrt{2}) \cdot (4-3\sqrt{2})}
			$$
			Po przekształceniu mianownika pierwiastki znikają:
			$$(4+3\sqrt{2}) \cdot (4-3\sqrt{2}) = 4^2-(3\sqrt{2})^2 = 16-3^2 \cdot \sqrt{2}^2 = 16-18 = -2$$
			Pozostaje jeszcze bałagan w liczniku, który warto posprzątać:
			$$
				(5+\sqrt{2}) \cdot (4-3\sqrt{2}) = 5 \cdot 4-5 \cdot 3\sqrt{2}+\sqrt{2} \cdot 4-\sqrt{2} \cdot 3\sqrt{2} =
				20-15\sqrt{2} + 4\sqrt{2}- 6 = 14-11\sqrt{2}
			$$
			W wyniku dostajemy
			$$
				\frac{14-11\sqrt{2}}{-2} = \frac{11\sqrt{2}}{2} - 7
			$$
		</div>

		<p>
			Jeśli jakiemuś nieszczęśnikowi przyjdzie kiedyś wyciągać niewymierność z mianownika, w którym jako składnik sumy występuje pierwiastek 
			inny niż kwadratowy – szczerze współczujemy. Wzór na różnicę kwadratów
		</p>
		
		$$
			(a-b)(a+b)=a^2-b^2
		$$
		
		<p>
			należy wówczas zastąpić odpowiednim wzorem na sumę/różnicę wyższych potęg. Dla pierwiastków trzeciego stopnia przydatne będą wzory
		</p>
		
		$$
			(a-b)(a^2+ab+b^2 )=a^3-b^3\\
			(a+b)(a^2-ab+b^2 )=a^3+b^3
		$$
		
		<p>
			Dla pierwiastków czwartego stopnia:
		</p>
		
		$$
			(a-b)(a+b)(a^2+b^2)=a^4-b^4
		$$
		
		<p>
			itd.
		</p>
		
		<div class="example">
			Chcemy pozbyć się z mianownika pierwiastka trzeciego stopnia, czyli rozszerzyć ułamek przez takie wyrażenie, by w rezultacie 
			pierwiastek w mianowniku uległ podniesieniu do trzeciej potęgi. Korzystamy z powyższego wzoru na sumę sześcianów.
			$$\frac{1}{2+\sqrt[3]{5}} = \frac{2^2-2\sqrt[3]{5}+\sqrt[3]{5}^2}{(2+\sqrt[3]{5}) \cdot (2^2-2\sqrt[3]{5}+\sqrt[3]{5}^2 )} =
			\frac{4-2\sqrt[3]{5}+\sqrt[3]{25}}{2^3+\sqrt[3]{5}^3} = \frac{4-2\sqrt[3]{5}+\sqrt[3]{25}}{8+5} =
			\frac{4-2\sqrt[3]{5}+\sqrt[3]{25}}{13}$$
		</div>

		<div class="example">
			Korzystamy ze wzoru na różnicę czwartych potęg, a następnie upraszczamy iloczyn w liczniku
			$$\frac{2}{1-\sqrt[4]{3}}=
			\frac{2 \cdot (1+\sqrt[3]{3}) \cdot (1^2+\sqrt[4]{3}^2 )}{(1-\sqrt[4]{3}) \cdot (1+\sqrt[4]{3}) \cdot (1^2+\sqrt[4]{3}^2 )} =
			\frac{2(1+\sqrt[4]{3}) \cdot (1+\sqrt[4]{9})}{1^4-\sqrt[4]{3}^4} =\\
			= \frac{2(1+\sqrt[4]{9}+\sqrt[4]{3}+\sqrt[4]{3} \cdot \sqrt[4]{9})}{1-3} =
			\frac{2(1+\sqrt[4]{9}+\sqrt[4]{3}+\sqrt[4]{27})}{-2}=
			-1-\sqrt[4]{9}-\sqrt[4]{3}-\sqrt[4]{27}$$
		</div>

    </lesson-chapter>

  </lesson>
</template>

<script>
import LessonTitle from "../../../lesson/LessonTitle";
import LessonIntro from "../../../lesson/LessonIntro";
import LessonChapter from "../../../lesson/chapter/LessonChapter";
import Lesson from "../../../lesson/Lesson";

export default {
  name: "Pierwiastkowanie",
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
		text-align: center;
		border-right: 2px solid black;
		color: #772222;
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
