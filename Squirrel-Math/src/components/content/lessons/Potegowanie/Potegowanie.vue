<template>
  <lesson routeShortVersion="/potegowanie-short" routeLongVersion="/potegowanie">
    <lesson-title>Potęgowanie</lesson-title>

    <lesson-intro>
	<p>
		Dodawanie, odejmowanie, mnożenie i dzielenie to dopiero przedsmak tego, co można wyczyniać z liczbami. 
		Jeśli już wydawało Ci się, że posiadasz pewną władzę nad arytmetyką, czas zobaczyć, czym w matematyce jest prawdziwa potęga.
	</p>
    </lesson-intro>

    <lesson-chapter><template #title>Mnożenie to za mało</template>
	<p class="type">
		Intuicje
	</p>
	
	<p>
		Przypomnijmy sobie pierwsze kroki, jakie stawialiśmy w świecie matematyki, 
		poznając, czym jest mnożenie. Zdefiniowaliśmy je jako wielokrotne dodawanie do siebie tej samej liczby:
	</p>

	$$
		3+3+3+3+3=5 \cdot 3
	$$
	<p>
		Pięciokrotne dodanie do siebie trójki oznaczaliśmy jako „pięć razy trzy”, propagując, że mnożenie jest działaniem wyższego rzędu niż 
		dodawanie. Na tej samej zasadzie definiujemy potęgowanie, jako działanie wyższego rzędu niż mnożenie:
	</p>
	
	$$
		3 \cdot 3 \cdot 3 \cdot 3 \cdot 3=3^5
	$$

	<p>
		Pięciokrotne pomnożenie przez siebie trójki oznaczamy jako „trzy do potęgi piątej” i zapisujemy to jako trójkę posiadającą w 
		<i>indeksie górnym</i> piątkę. Liczba, którą mnożymy przez siebie wielokrotnie, to <i>podstawa potęgi</i>, a ilość mnożeń, jakich 
		dokonujemy (mała liczba w prawym górnym rogu), to <i>wykładnik potęgi</i>. 
	</p>
	
	<p>
		W zagadnieniach informatycznych potęgę zapisujemy z użyciem symbolu $ \text{^}$ widocznego na klawiszu 
		$6$ klawiatury 
		komputera.
	</p>
	
	$$
		3 \cdot 3 \cdot 3 \cdot 3 \cdot 3=3 \text{^}5
	$$
	
	<p>
		Jest to wygodny zapis, gdy nie mamy możliwości sformatowania tekstu w indeksie górnym.
	</p>
	
	<p class="type">
		Formalnie
	</p>
	
	<p>
		Formalna definicja potęgi o wykładniku naturalnym przedstawia się następująco:
	</p>

	$$
		a^n = \underbrace{a \cdot a \cdot a \cdot a \cdot \dotsb \cdot a}_n
	$$
	
	<p>
		Definicja ta mówi, że pod $a$ oraz $n$ możemy podstawić dowolne 
		liczby i zinterpretować napis $a^n$ jako pomnożenie 
		liczby $a$ przez siebie $n$ razy. W takim zapisie liczba $a$ jest 
		podstawą potęgi, zaś liczba $n$ to wykładnik potęgi, a sam zapis $a^n$ nazywamy potęgą 
		liczby $a$. 
	</p>

	<p class="type">
		Rozszerzenie
	</p>
	
	<p>
		Co ciekawe, chociaż dodawanie oraz mnożenie są działaniami łącznymi i przemiennymi, potęgowanie nie jest ani łączne, ani przemienne:
	</p>
	
	<ul>
		<li>$2^3=2 \cdot 2 \cdot 2=8$ nie jest tym samym co $3^2=3 \cdot 3=9$</li>
		<li>$(2^2 )^3=(2 \cdot 2)^3=4^3=4 \cdot 4 \cdot 4=64$ nie jest tym samym, co 
		$2^{2^3}=2^{2 \cdot 2 \cdot 2}=2^8=2 \cdot 2 \cdot 2 \cdot 2 \cdot 2 \cdot 2 \cdot 2 \cdot 2=256$</li>
	</ul>
    </lesson-chapter>

    <lesson-chapter><template #title>Kwadraty i sześciany</template>  
	<p class="type">
		Intuicje
	</p>
	
	<p>
		W praktyce potęgowanie pełni rolę narzędzia matematycznego, dzięki któremu nie musimy pisać nużąco długich iloczynów, gdy jako czynnik 
		pojawia się kilka razy ta sama liczba. Im dalej zagłębiamy się w matematyczne fantazje, tym bardziej oddalamy się <comment text=
		"i od Boga.">od przyziemnych, 
		namacalnych, życiowych zagadnień</comment>, przez co ilustrowanie matematyki "codziennymi" problemami staje się niemożliwe.
		Potęgowanie stoi jeszcze na granicy abstrakcji i przy odrobinie dobrej woli możemy zobaczyć 
		potęgowanie w akcji.
	</p>

	<p>
		Potrzebujemy klocków. Dużo klocków. Potęgowanie może być dobrą zabawą, a żeby tego dowieść 
		ustawimy klocki jeden obok drugiego, wzdłuż linii:
	</p>

	<center><img src="./.images/Screenshot_2.png" align="middle"></center>
	
	<p>
		Pięć klocków w jednej linii możemy postrzegać jako $5^1$, jakby piątka występująca w iloczynie tylko jeden raz. 
		Następnie rozmieśćmy 
		klocki na podłodze, jeden obok drugiego w regularnych rządkach i kolumnach: 
	</p>

	<center><img src="./.images/Screenshot_3.png" align="middle"></center>
	
	<p>
		Mamy pięć poziomych rzędów, a w każdym z nich mieści się pięć klocków, czyli razem:
	</p>
	
	$$
		5 \cdot 5=5^2
	$$
	
	<p>
		Jeżeli masz pewną wprawę w rozpoznawaniu kształtów geometrycznych, możesz zauważyć, że powyższy obrazek przedstawia klocki ułożone w 
		kwadrat. Z tego powodu drugą potęgę liczby nazywamy <i>kwadratem</i> tej liczby. Będziemy więc mówić, że 
		„$25$ jest kwadratem liczby $5$” lub że „$5$ do kwadratu 
		wynosi $25$”.
		Postępując dalej w naszym szaleństwie, ułóżmy kwadraty z klocków w warstwy, jedna nad drugą:
	</p>

	<center><img src="./.images/Screenshot_4.png" align="middle"></center>
	
	<p>
		Liczba klocków w naszej pokaźnej konstrukcji wynosi
	</p>
	
	$$
		5 \cdot 5 \cdot 5=5^3
	$$
	
	<p>
		ponieważ składa się ona z $5$ warstw, a każda ma 
		$25$ klocków. Kształt, który przypomina nasza konstrukcja, to sześcian i z tego powodu trzecią potęgę liczby 
		nazywamy <i>sześcianem</i> tej liczby. Będziemy mówić, że „$125$ jest sześcianem liczby $5$” 
		lub że „$5$ do sześcianu wynosi $125$”.
		Niestety tu nasza wizualizacja się kończy, jak również kończy się specjalne nazewnictwo kolejnych potęg. 
		$5^4$ będziemy czytać po prostu jako „pięć do potęgi czwartej”. Graficzna reprezentacja czwartej potęgi 
		wymagałaby właściwie czegoś w rodzaju czwartego wymiaru przestrzennego, a my jeszcze nie jesteśmy gotowi na Sci-Fi.
	</p>
	
	<p class="type">
		Warsztat
	</p>
	
	<p>
		Wkrótce okaże się, że znajomość kwadratów i sześcianów niewielkich liczb naturalnych jest bardzo pomocna, by nabrać biegłości w rachunkach.
		Jeśli zależy Ci na osiągnięciu poziomu oficera, a nie jedynie marnego kadeta, przyzwyczaj swoje oczy do tych wartości:
	</p>
	
	<table class="table1 center">
		<tr><td>$0^2=0$</td><td>$0^3=0$</td></tr>
		<tr><td>$1^2=1$</td><td>$1^3=1$</td></tr>
		<tr><td>$2^2=4$</td><td>$2^3=8$</td></tr>
		<tr><td>$3^2=9$</td><td>$3^3=27$</td></tr>
		<tr><td>$4^2=16$</td><td>$4^3=64$</td></tr>
		<tr><td>$5^2=25$</td><td>$5^3=125$</td></tr>
		<tr><td>$6^2=36$</td><td>$6^3=216$</td></tr>
		<tr><td>$7^2=49$</td><td>$7^3=343$</td></tr>
		<tr><td>$8^2=64$</td><td>$8^3=512$</td></tr>
		<tr><td>$9^2=81$</td><td>$9^3=729$</td></tr>
		<tr><td>$10^2=100$</td><td>$10^3=1000$</td></tr>
		<tr><td>$11^2=121$</td><td>$11^3=1331$</td></tr>
		<tr><td>$12^2=144$</td><td>$12^3=1728$</td></tr>
		<tr><td>$13^2=169$</td><td>$13^3=2197$</td></tr>
		<tr><td>$14^2=196$</td><td>$14^3=2744$</td></tr>
		<tr><td>$15^2=225$</td><td>$15^3=3375$</td></tr>
		<tr><td>$16^2=256$</td><td>$16^3=4096$</td></tr>
		<tr><td>$17^2=289$</td><td>$17^3=4913$</td></tr>
		<tr><td>$18^2=324$</td><td>$18^3=5832$</td></tr>
		<tr><td>$19^2=361$</td><td>$19^3=6859$</td></tr>
		<tr><td>$20^2=400$</td><td>$20^3=8000$</td></tr>
	</table>
	
	<p>
		Aby uchodzić za człowieka wykształconego, <comment text="No przynajmniej kwadraty">powinieneś dobrze znać kwadraty i sześciany pierwszych 
		dziesięciu liczb naturalnych.</comment>
	</p>
    </lesson-chapter>

    <lesson-chapter><template #title>Potęgowanie a kolejność wykonywania działań</template>  
	<p class="type">
		Intuicje
	</p>
	
	<p>
		Ponieważ mnożenie jest działaniem wyższego rzędu niż dodawanie, wykonujemy je jako pierwsze w działaniu. Podobnie, skoro potęgowanie 
		jest działaniem wyższego rzędu niż mnożenie, będzie ono miało pierwszeństwo  przed mnożeniem. Zaktualizowana kolejność wykonywania 
		działań wyglądałaby następująco:
	</p>
	
	<ol style="margin-top: 0" class="formula">
		<li style="text-align: left">Działania w nawiasach;</li>
		<li style="text-align: left">Potęgowanie;</li>
		<li style="text-align: left">Mnożenie i dzielenie w kolejności występowania;</li>
		<li style="text-align: left">Dodawanie i odejmowanie w kolejności występowania.</li>
	</ol>

	<p>
		Tak więc:
	</p>
	
	<ul>
		<li>$3 \cdot 4^{2+1}+5=3 \cdot 4^3+5=3 \cdot 64+5=192+5=197$</li>
		<li>$6:3^2-(6:3)^2=6:9-2^2=\frac{2}{3}-4=-\frac{10}{3}$</li>
		<li>$2^{3^2}=2^9=512$</li>
		<li>$5^2-4^2-(-3)^2=25-16-9=0$</li>
	</ul>
	
	<p>
		Warto mieć na uwadze, że zapis $-2^4$ oznacza „dwa do czwartej na minusie”, czyli liczbę ujemną o wartości 
		$-16$, ale zapis $(-2)^4$ to czwarta potęga liczby $-2$, a 
		więc $16$.
	</p>
    </lesson-chapter>

    <lesson-chapter><template #title>Potęgi o wykładniku całkowitym</template>  
	<p class="type">
		Intuicje
	</p>
	
	<p>
		Potrafimy już rozpracowywać zapiski typu $a^n$, gdzie $n$ jest jakąś liczbą naturalną 
		typu $1$, $2$, $3$, $4$, 
		$5$… zaś $a$ może być dowolną znaną nam liczbą: dodatnią, ujemną, ułamkową... W ramach ćwiczenia:
	</p>
	
	<ul>
		<li>$2^5=2 \cdot 2 \cdot 2 \cdot 2 \cdot 2=32$</li>
		<li>$(-3)^4=(-3) \cdot (-3) \cdot (-3) \cdot (-3)=81$</li>
		<li>$(\frac{5}{4})^2=\frac{5}{4} \cdot \frac{5}{4}=\frac{25}{16}$</li>
		<li>$(-\frac{1}{7})^3=(-\frac{1}{7}) \cdot (-\frac{1}{7}) \cdot (-\frac{1}{7})=-\frac{1}{343}$</li>
	</ul>
	
	<p>
		Warto zauważyć kilka podstawowych cech potęgowania:
	</p>
	
	<ul>
		<li>
			Dowolna liczba podniesiona do potęgi pierwszej to ta sama liczba: 
			$$
				a^1=a
			$$
		</li>
		<li>
			Jedynka podniesiona do dowolnej potęgi wynosi zawsze $1$: 
			$$
				1^n=1
			$$
		</li>
		<li>
			Zero podniesione do dowolnej potęgi wynosi zawsze $0$: 
			$$
				0^n=0
			$$
		</li>
		<li>
			Liczba ujemna podniesiona do potęgi parzystej daje wynik dodatni, a do potęgi nieparzystej ujemny:
			$$
				\text{Jeśli} \  a \lt 0 \text{, to}  \  a^n \gt 0  \  \text{dla}  \  n  \  \text{parzystych oraz} \ a^n \lt 0  \ 
				\text{dla}  \  n  \  \text{nieparzystych}
			$$
		</li>
	</ul>

	<p>
		Zastanówmy się, co się stanie, gdy podniesiemy liczbę do potęgi ujemnej. Warto zwrócić uwagę, że gdy podnosimy liczbę 
		do coraz wyższych potęg, przy każdym kroku mnożymy poprzedni wynik przez tę liczbę:
	</p>

	<center><img src="./.images/Screenshot_5.png" align="middle"></center>
	
	<p>
		Możemy spojrzeć na to z drugiej strony: gdy podnosimy liczbę do coraz niższych potęg, przy każdym kroku dzielimy poprzedni wynik przez 
		podstawę:
	</p>

	<center><img src="./.images/Screenshot_6.png" align="middle"></center>
	
	<p>
		Trzymając się tendencji, pójdźmy jeszcze o kilka kroków w lewo:
	</p>

	<center><img src="./.images/Screenshot_7.png" align="middle"></center>
	
	<p>
		Ukradkiem wyłoniła się prosta zależność:
	</p>
	
	<ul>
		<li>$3^{-1} = \frac{1}{3}$, podczas gdy $3^1=3$</li>
		<li>$3^{-2} = \frac{1}{9}$, podczas gdy $3^2=9$</li>
		<li>$3^{-3} = \frac{1}{27}$, podczas gdy $3^3=27$</li>
		<li>$3^{-4} = \frac{1}{81}$, podczas gdy $3^4=81$</li>
	</ul>
	
	<p>
		Powyższe tendencje stanowią dobrą podstawę, by zdefiniować potęgi dla wykładników całkowitych:
	</p>
	
	<ul>
		<li>Dowolna liczba podniesiona do potęgi zerowej daje $1$: 
			$$
				a^0=1
			$$
		</li>
		<li>
			Potęga o wykładniku ujemnym jest równa odwrotności potęgi o przeciwnym wykładniku:
			$$
				a^{-n}=\frac{1}{a^n} 
			$$
		</li>
	</ul>
	
	<p>
		Podkreślamy, że powyższe wzory stanowią <b>definicję</b> potęg o wykładnikach całkowitych, a nie twierdzenia o potęgowaniu - teraz powiedzieliśmy po raz pierwszy, w jaki sposób rozumieć
		potęgę z niedodatnim wykładnikiem.
	</p>
	
	<p>
		Zauważmy, że przy badaniu potęg o ujemnych wykładnikach dokonywaliśmy dzielenia przez podstawę, a nie zapominajmy, 
		że nie wolno dzielić przez $0$. Co za tym idzie, nie wolno podnosić zera do potęg ujemnych. 
		Kontrowersyjne pozostaje podnoszenie zera do potęgi zerowej. Technicznie rzecz biorąc przejście z $0^1$ do 
		$0^0$ wymagałoby podzielenia przez $0$, więc spora część matematyków nie godzi się 
		na istnienie „zera do zerowej”. Z drugiej strony własność $a^0=1$ dotyczy dokładnie każdej liczby, 
		zarówno dodatniej, jak i ujemnej, więc dlaczego by nie miała dotyczyć zera?... Ten dylemat podzielił matematyków – według niektórych 
		$0^0$ nie istnieje, a według innych $0^0=1$, jakkolwiek dziwnie to nie wygląda.
	</p>

	<p>
		Jeśli jesteś ciekaw, jak dobrać się do potęg mających ułamek w wykładniku, zajrzyj do tematu „Pierwiastkowanie”.
	</p>
    </lesson-chapter>

    <lesson-chapter><template #title>Własności potęgowania</template>  
	<p class="type">
		Formalnie
	</p>

	<p>
		Dokonajmy jeszcze kilku przydatnych spostrzeżeń na temat potęgowania. Ponieważ zależy nam na osiągnięciu dojrzałości matematycznej, 
		wprowadzimy ogólne przypadki, czyli będziemy pracować na zmiennych literowych. W każdej chwili możemy podstawić pod 
		$a$, $b$ lub $n$ jakieś konkretne liczby i zobaczyć, jak poniższe 
		twierdzenia działają na żywo.
	</p>

	<p class="formula">
		Jeśli $n$-tą potęgę pewnej liczby pomnożymy przez $m$-tą potęgę tej liczby, to otrzymamy potęgę o wykładniku $n+m$
		$$a^n \cdot a^m=a^{n+m}$$
	</p>
	<div class="proof">
		<div class = "proof-sticker">Uzasadnienie</div>
		$$2 ^3 \cdot 2^5 = 2 \cdot 2 \cdot 2 \ \ \ \cdot \ \ \ 2 \cdot 2 \cdot 2 \cdot 2 \cdot 2 = 2^8$$
		$$3 ^2 \cdot 3^4 = 3 \cdot 3 \ \ \ \cdot \ \ \ 3 \cdot 3 \cdot 3 \cdot 3 = 3^6$$
	</div>
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
		<div class = "proof-sticker">Uzasadnienie</div>
		$$\frac{2^6}{2^4} = \frac{2 \cdot 2 \cdot 2 \cdot 2 \cdot 2 \cdot 2}{2 \cdot 2 \cdot 2 \cdot 2} =
		\require{cancel} \frac{\cancel{2 \cdot 2 \cdot 2 \cdot 2} \ \ \ \cdot \ \ \  2 \cdot 2}{\cancel{2 \cdot 2 \cdot 2 \cdot 2}} = 
		2 \cdot 2 = 2^2$$
		$$\frac{5^3}{5^7} = \frac{5 \cdot 5 \cdot 5}{5 \cdot 5 \cdot 5 \cdot 5 \cdot 5 \cdot 5 \cdot 5} =
		\frac{\cancel{5 \cdot 5 \cdot 5}}{\cancel{5 \cdot 5 \cdot 5} \ \ \ \cdot \ \ \ 5 \cdot 5 \cdot 5 \cdot 5} = 
		\frac{1}{5 \cdot 5 \cdot 5 \cdot 5} = \frac{1}{5^4} = 5^{-4}
		$$
	</div>
	<div class="proof">
		<div class = "proof-sticker">Dowód</div>
		Jeśli $n≥m$:
		$$ \frac{a^n}{a^m} = 
		\frac{\overbrace{a \cdot a \cdot a \cdot a \cdot a \cdot \cancel{a \cdot a \cdot \dotsb \cdot a}}^{n} }{\underbrace {\cancel{a \cdot a \cdot \dotsb \cdot a}}_m } =
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
		<div class = "proof-sticker">Uzasadnienie</div>
		$$
			(2^3)^4 = 2^3 \cdot 2^3 \cdot 2^3 \cdot 2^3 = (2 \cdot 2 \cdot 2) \cdot (2 \cdot 2 \cdot 2) \cdot (2 \cdot 2 \cdot 2) \cdot (2 \cdot 2 \cdot 2) =
			2 \cdot 2 \cdot 2 \cdot 2 \cdot 2 \cdot 2 \cdot 2 \cdot 2 \cdot 2 \cdot 2 \cdot 2 \cdot 2 = 2^{12}
		$$
		$$
			(3^2)^3 = 3^2 \cdot 3^2 \cdot 3^2 = (3 \cdot 3) \cdot (3 \cdot 3) \cdot (3 \cdot 3) =
			3 \cdot 3 \cdot 3 \cdot 3 \cdot 3 \cdot 3 = 3^6
		$$
	</div>
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
		<div class = "proof-sticker">Uzasadnienie</div>
		$$
			(5 \cdot 2)^3 = (5 \cdot 2) \cdot (5 \cdot 2) \cdot (5 \cdot 2) = 5 \cdot 2 \cdot 5 \cdot 2 \cdot 5 \cdot 2 =
			5 \cdot 5 \cdot 5 \ \ \ \cdot \ \ \ 2 \cdot 2 \cdot 2 = 5^3 \cdot 2^3
		$$
		$$
			\left( 3 \cdot \frac{1}{2} \right)^4 = \left(3 \cdot \frac{1}{2}\right) \cdot \left(3 \cdot \frac{1}{2}\right) \cdot \left(3 \cdot \frac{1}{2}\right) \cdot \left(3 \cdot \frac{1}{2}\right) =
			3 \cdot 3 \cdot 3 \cdot 3 \cdot \frac{1}{2} \cdot \frac{1}{2} \cdot \frac{1}{2} \cdot \frac{1}{2} = 3^4 \cdot \left(\frac{1}{2}\right)^4
		$$
		
	</div>
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
		<div class = "proof-sticker">Uzasadnienie</div>
		$$
			\left(\frac{2}{3} \right)^5 = \frac{2}{3} \cdot \frac{2}{3} \cdot \frac{2}{3} \cdot \frac{2}{3} \cdot \frac{2}{3} = 
			\frac{2 \cdot 2 \cdot 2 \cdot 2 \cdot 2}{3 \cdot 3 \cdot 3 \cdot 3 \cdot 3} = \frac{2^5}{3^5}
		$$
		$$
			\left(\frac{5}{7} \right)^2 = \frac{5}{7} \cdot \frac{5}{7} = 
			\frac{5 \cdot 5}{7 \cdot 7} = \frac{5^2}{7^2}
		$$
	</div>
	<div class="proof">
		<div class = "proof-sticker">Dowód</div>
		$$
			\left(\frac{a}{b} \right)^n = \underbrace{\frac{a}{b} \cdot \frac{a}{b} \cdot \frac{a}{b} \cdot \dotsb \cdot \frac{a}{b}}_n = 
			\frac{\overbrace{a \cdot a \cdot a \cdot \dotsb \cdot a}^n}{\underbrace{b \cdot b \cdot b \cdot \dotsb \cdot b}_n} = \frac{a^n}{b^n}
		$$
		</div>
	<br><br>

	<p class="type optional-hide">
		Formalnie | Rozszerzenie
	</p>
	<p class="warning">wymagana znajomość tematu: Działania na wyrażeniach algebraicznych</p>
	<div>
		<p>
			Powyższe wzory działają także dla wykładników ujemnych. Aby tego dowieść, wykorzystamy własności dla wykładników dodatnich, które 
			udowodniliśmy powyżej.
		</p>

		<p class="formula">
			$a^k \cdot a^l=a^{k+l}$ dla $k$ i $l$ całkowitych
		</p>
		<div class="proof">
			<div class = "proof-sticker">Dowód</div>
			<ul>
				<li>
					Rozważmy przypadek, gdy tylko jeden z wykładników jest ujemny (ze względu na przemienność mnożenia i dodawania, nie ma 
					znaczenia, który). Mamy uzasadnić równość
					$$a^k \cdot a^{-l}=a^{k-l}$$
					przy czym same zmienne $k$ oraz $l$ mają wartości naturalne. Wykorzystując 
					definicję potęgi o ujemnym wykładniku:<br>
					$$a^k \cdot a^{-l}=a^k \cdot \frac{1}{a^l} = \frac{a^k}{a^l} =a^{k-l}$$
				</li>
				<li>
					W przypadku obydwu wykładników ujemnych mamy:<br>
					$$a^{-k} \cdot a^{-l}=\frac{1}{a^k}  \cdot \frac{1}{a^l} =\frac{1}{a^k \cdot a^l}=\frac{1}{a^{k+l}}=a^{-(k+l) }=a^{-k-l}$$
				</li>
			</ul>
		</div>
		<br><br>

		<p class="formula">
			$\frac{a^k}{a^l} =a^{k-l}$ dla $k$ i $l$ całkowitych
		</p>
		<div class="proof">
			<div class = "proof-sticker">Dowód</div>
			<ul>
				<li>
					Przypadek, gdy wykładnik potęgi w liczniku jest ujemny:
					$$\frac{a^{-k}}{a^l} =\frac{\frac{1}{a^k}}{a^l} =\frac{1}{a^k \cdot a^l}=\frac{1}{a^{k+l}} =a^{-(k+l) }=a^{-k-l}$$
				</li>
				<li>
					Przypadek, gdy wykładnik potęgi w mianowniku jest ujemny:
					$$\frac{a^k}{a^{-l}} =\frac{a^k}{\frac{1}{a^l}}=a^k \cdot a^l=a^{k+l}=a^{k-(-l)}$$
				</li>
				<li>
					Przypadek, gdy obydwa wykładniki są ujemne:
					$$\frac{a^{-k}}{a^{-l}}=\frac{\frac{1}{a^k}}{\frac{1}{a^l}}=\frac{1}{a^k}  \cdot a^l=\frac{a^l}{a^k} =a^{l-k}=a^{-k+l}=a^{-k-(-l)}$$
				</li>
			</ul>
		</div>
		<br><br>

		<p class="formula">
			$(a^k)^l=a^{k \cdot l}$ dla $k$ i $l$ całkowitych
		</p>
		<div class="proof">
			<div class = "proof-sticker">Dowód</div>
			<ul>
				<li>
					Przypadek, gdy wykładnik wewnętrznej potęgi jest ujemny:
					$$(a^{-k} )^l=\left(\frac{1}{a^k} \right)^l=\frac{1^l}{(a^k)^l} =\frac{1}{a^{k \cdot l}} =a^{-(k \cdot l)}=a^{(-k) \cdot l}$$
				</li>
				<li>
					Przypadek, gdy wykładnik zewnętrznej potęgi jest ujemny:
					$$(a^k )^{-l}=\frac{1}{(a^k )^l}=\frac{1}{a^{k \cdot l}} =a^{-(k \cdot l)}=a^{k \cdot (-l)}$$
				</li>
				<li>
					Przypadek, gdy obydwa wykładniki są ujemne:
					$$(a^{-k} )^{-l}=\frac{1}{(a^{-k} )^l}=\frac{1}{ \left(\frac{1}{a^k} \right)^l} =\frac{1}{ \frac{1^l}{(a^k )^l} }
					=\frac{1}{\frac{1}{a^{k \cdot l} }}=a^{k \cdot l}=a^{(-k) \cdot (-l)}$$
				</li>
			</ul>
		</div>
		<br><br>

		<p class="formula">
			$(a \cdot b)^k = a^k \cdot b^k$ dla $k$ całkowitego
		</p>
		<div class="proof">
			<div class = "proof-sticker">Dowód</div>
			Gdy wykładnik jest ujemny:
			$$(a \cdot b)^{-k} = \frac{1}{(a \cdot b)^k} = \frac{1}{a^k \cdot b^k} = \frac{1}{a^k} \cdot \frac{1}{b^k} = a^{-k} \cdot b^{-k}=\frac{1}{a^k}  \cdot \frac{1}{b^k}$$
		</div>
		<br><br>

		<p class="formula">
			$\left(\frac{a}{b}\right)^k=\frac{a^k}{b^k}$ dla $k$ całkowitego
		</p>
		<div class="proof">
			<div class = "proof-sticker">Dowód</div>
			Gdy wykładnik jest ujemny:
			$$\left(\frac{a}{b}\right)^{-k}=\frac{1}{\left(\frac{a}{b}\right)^k} =\frac{1}{\frac{a^k}{b^k}}=\frac{b^k}{a^k}=\frac{1}{a^k}  \cdot b^k=\frac{\frac{1}{a^k}}{\frac{1}{b^k}}=
			\frac{a^{-k}}{b^{-k}}$$
		</div>

	</div>
    </lesson-chapter>

    <lesson-chapter><template #title>Notacja wykładnicza</template> 
	<p class="type">
		Rozszerzenie
	</p>

	<p>
		Zapis z użyciem potęgi bywa przydatny do reprezentacji liczb o wartościach bardzo dużych lub bardzo bliskich zera. Przypomnijmy sobie kilka olbrzymów 
		z rozdziału lekcji <router-link tag="a" :to="'/liczba#giant-numbers'" class="link">Liczba: Liczby giganty</router-link>.
	</p>

	<ul>
		<li>$1\ 000$ - tysiąc to jedynka i $3$ zera</li>
		<li>$1\ 000\ 000$ - milion to jedynka i $6$ zer</li>
		<li>$1\ 000\ 000\ 000$ - miliard to jedynka i $9$ zer</li>
		<li>$1\ 000\ 000\ 000\ 000$ - bilion to jedynka i $12$ zer</li>
		<li>$1\ 000\ 000\ 000\ 000\ 000$ - biliard to jedynka i $15$ zer</li>
		<li>$1\ 000\ 000\ 000\ 000\ 000\ 000$ - trylion to jedynka i $18$ zer</li>
		<li>$1\ 000\ 000\ 000\ 000\ 000\ 000\ 000$ - tryliard to jedynka i $21$ zer</li>
		<li>$1\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000$ - kwadrylion to jedynka i $24$ zera</li>
		<li>$1\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000$ - kwadryliard to jedynka i $27$ zer</li>
	</ul>

	<p>
		Zapis tak dużych liczb staje się dość uciążliwy ze względu na przytłaczająco dużą ilość cyfr. Właściwie bardziej wymowny jest opis informujący, ile 
		zer posiada ta liczba z tyłu. A przecież każdego z tych kolosów da się zapisać zwięźle za pomocą potegi dziesiątki:
	</p>

	<ul>
		<li>$10^3$ - tysiąc to jedynka i $3$ zera</li>
		<li>$10^6$ - milion to jedynka i $6$ zer</li>
		<li>$10^9$ - miliard to jedynka i $9$ zer</li>
		<li>$10^{12}$ - bilion to jedynka i $12$ zer</li>
		<li>$10^{15}$ - biliard to jedynka i $15$ zer</li>
		<li>$10^{18}$ - trylion to jedynka i $18$ zer</li>
		<li>$10^{21}$ - tryliard to jedynka i $21$ zer</li>
		<li>$10^{24}$ - kwadrylion to jedynka i $24$ zera</li>
		<li>$10^{27}$ - kwadryliard to jedynka i $27$ zer</li>
	</ul>

	<p>
		Z ciekawszych liczb warty wspomnienia jest googol: $10^{80}$ przekraczający szacowaną liczbę atomów we Wszechświecie oraz googolplex: $10^{10^{80}}$ mający 
		w swoim zapisie googol zer. Przy okazji chcielibyśmy zwrócić uwagę, że liczby postaci $10^{6n}$ to kolejne "liony". Dla $n = 1$ jest to <b>mi</b>lion, dla
		$n = 2$ <b>bi</b>lion, dla $n = 3$ <b>try</b>lion itd. Z kolei liczby postaci $10^{6n + 3}$ to kolejne "liardy". Dla $n = 1$ mamy <b>mi</b>liard, dla 
		$n = 2$ <b>bi</b>liard itd.
	</p>

	<p>
		Użycie potęgi pozwala na zwięzły zapis również innych ogromnych liczb, niekoniecznie składających się jedynie z jedynki i zer. 
		Stała fizyczna $c = 299\ 792\ 458$ opisuje, ile metrów pokonuje światło w ciągu jednej sekundy. Jeśli nie używamy tej stałej do przeprowadzania 
		bardzo poważnych i dokładnych obliczeń, powinno wystarczyć nam pojęcie, że stała ta ma przybliżoną wartość $c \approx 300\ 000\ 000$, którą z kolei 
		można zapisać w skrócie jako $c \approx 3 \cdot 10^8$ czyli w istocie jest to "trójka i osiem zer". Odległość od Ziemi do Słońca wynosi 
		$149\ 600\ 000 \text{ m}$, czyli w skrócie $1,496 \cdot 10^8$ metrów.
	</p>

	<p>
		Na podobnej zasadzie zapisuje się liczby o bardzo małej wartości. Wielkość mrówki wynosi około $5 \text{ mm}$. Malutkie pajęczaki zwane roztoczami 
		osiągają rozmiary rzędu $0,1 \text{ mm}$. Atomy, czyli najmniejsze znane nauce budulce otaczającego nas świata, mają rozmiary skali $0,0000001 \text{ mm}$, czyli inaczej 
		$\frac{1}{10\ 000\ 000} = \frac{1}{10^7} = 10^{-7}$ milimetra. Wartość $10^{-7}$ możemy interpretować jako 
		"ułamek dziesiętny, który ma łącznie $7$ zer z przodu (jedno przed przecinkiem i $6$ po przecinku) i jedynkę na końcu". Na przykład atom wodoru ma rozmiar 
		$0,000000037 \text{ mm}$, czyli $3,7 \cdot 10^{-8} \text{ mm}$.
	</p>

	<p>
		Formalnie rzecz ujmując, liczba jest zapisana w postaci wykładniczej, jeśli ma postać 
	</p>

	$$
		c \cdot 10^m
	$$

	<p>
		Gdzie $c$ przedstawia ułamek dziesiętny o wartości od $1$ (włącznie) do $10$ (bez dziesięciu): $1 \leq c \lt 10$,
		zaś $m$ jest dowolną liczbą całkowitą, dodatnią, ujemną lub zerową. Właściwie liczba $c$ może przedstawiać także ujemną wartość, czyli tak na prawdę 
		dopuszczamy również $-10 \lt c \leq -1$. Oto kilka liczb zapisanych w postaci notacji wykładniczej:
	</p>

	<ul>
		<li>Masa Ziemi wynosi około $5\ 980\ 000\ 000\ 000\ 000\ 000\ 000\ 000 = 5,98 \cdot 10^{24}$ kilogramów</li>
		<li>Obwód Ziemi (tzn. długość drogi, jaką pokonamy, odbywając podróż dookoła świata) wynosi: $40\ 075 \approx 4 \cdot 10^4$ kilometrów</li>
		<li>Masa atomu (dokładniej atomu wodoru) wynosi około: $0,000000000000000000000001673 = 1,673 \cdot 10^{-24}$ grama</li>
		<li>Temperaturę jądra Słońca szacuję się na $15\ 709\ 999\ 700 \approx 1,57 \cdot 10^{10}$ stopni Celsjusza</li>
	</ul>

	<p> 
		Z notacją wykładniczą spotykamy się również, gdy wykonujemy obliczenia na dużych liczbach za pomocą kalkulatora. Gdy spróbujesz na kalkulatorze 
		lub w przeglądarce pomnożyć przez siebie piątkę $20$ razy (czyli obliczyć $5^{20}$), jest spora szansa, że zobaczysz w wyniku coś podobnego do 
		$9.5367432\text{e+}13$. Jest to właśnie przybliżony wynik zapisany przy pomocy notacji wykładniczej: $9,5367432 \cdot 10^{13}$. Literka $\text{e}$, od angielskiego 
		"exponent" (wykładnik), oddziela cyfry wyniku od wykładnika dziesiątki (plus oznacza wykładnik dodatni, minus ujemny). 
	</p>

	<p class="type">
		Warsztat | Rozszerzenie
	</p>

	<p>
		Aby zapisać liczbę w postaci notacji wykładniczej, musimy zapisać ją w postaci ułamka dziesiętnego (z użyciem przecinka), odpowiednio przesunąć 
		przecinek i dopisać dziesiątkę w odpowiedniej potędze.
	</p>

	<ul>
		<li>
			Jeśli mamy do czynienia z liczbą większą niż $1$ (lub mniejszą niż $-1$): lokalizujemy przecinek (jeśli liczba jest całkowita, wstawiamy 
			przecinek na końcu liczby) i przesuwamy go w lewo aż do pierwszej cyfry (kończymy z przecinkiem na prawo od pierwszej cyfry); zliczamy, ile 
			razy przesunęliśmy przecinek i wstawiamy tę liczbę w wykładniku dziesiątki
		</li>
		<li>
			Jeśli mamy do czyninia z liczbą od $-1$ do $1$: lokalizujemy przecinek i przesuwamy go w prawo aż do napotkania pierwszej cyfry, 
			która nie jest zerem (kończymy z przecinkiem na prawo od pierwszej niezerowej cyfry); zliczamy, o ile 
			cyfr przesunęliśmy przecinek i wstawiamy tę ilość na minusie w wykładniku dziesiątki
		</li>
	</ul>

	<p>
		W praktyce:
	</p>

	<ul>
		<li>$15\ 374 = 15\ 374,0 = 1,5374 \cdot 10^4$ (przecinek powędrował 4 miejsca w lewo)</li>
		<li>$-10\ 004\ 321,364 = -1,0004321364 \cdot 10^7 \approx -10^7$ (przecinek powędrował 7 miejsc w lewo)</li>
		<li>$0,0423 = 4,23 \cdot 10^{-2}$ (przecinek powędrował 2 miejsa w prawo)</li>
		<li>$0,0009999 = 9,999 \cdot 10^{-4} \approx 10 \cdot 10^{-4} = 10^{-3}$ (przecinek powędrował 4 miejsa w prawo)</li>
	</ul>

    </lesson-chapter>

  </lesson>
</template>

<script>
import LessonTitle from "../../../lesson/LessonTitle";
import LessonIntro from "../../../lesson/LessonIntro";
import LessonChapter from "../../../lesson/chapter/LessonChapter";
import Lesson from "../../../lesson/Lesson.vue";

export default {
  name: "Potegowanie",
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
</style>
