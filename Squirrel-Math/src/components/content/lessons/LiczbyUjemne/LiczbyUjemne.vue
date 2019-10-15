<template>
	<lesson routeShortVersion="/liczby-ujemne-short" routeLongVersion="/liczby-ujemne">
		<lesson-title>Liczby ujemne</lesson-title>

		<lesson-intro>
		<p>
			Pewnego słonecznego popołudnia Jaś spacerował polną dróżką z koszykiem jabłek w ręce. Gdzieś w krzakach przycisnął go 
			<comment text="TM">mały głód</comment>. 
			Spojrzał żałobnie na dwa lśniące w słońcu jabłka wewnątrz koszyka… Czymże są dwa jabłka w obliczu Jasiowego apetytu? W końcu ścisk w 
			żołądku nie dał za wygraną. Jaś zjadł trzy jabłka. Ile jabłek zostało w koszyku? 
		</p>
		</lesson-intro>

		<lesson-chapter><template #title>Mniej niż zero</template>
		<p class = "type">
			Intuicje
		</p>
		
		<p>
			W temacie o odejmowaniu dość niechętnie wypowiadaliśmy się na temat brawurowych prób odejmowania większej liczby od mniejszej. 
			<comment text="Z wyjątkiem dzielenia przez zero…">Jako że w matematyce nie ma rzeczy niemożliwych</comment>, 
			pora sprostać takiemu wyzwaniu. Liczby ujemne służą do przedstawiania wartości 
			mniejszych niż $0$. Liczba $-1$ (czyt. minus jeden) ma wartość o $1$ mniejszą niż zero, $-2$
			to dwa poniżej zera itd. Jeśli rozszerzymy 
			pojęcie liczb naturalnych o liczby ujemne, dostaniemy dość pokaźną kolekcję:
		</p>
		
		<p style="text-align: center">
			$…$, $-12$, $-11$, $-10$, $-9$, 
			$-8$, $-7$, $-6$, $-5$, $-4$, 
			$-3$, $-2$, $-1$, $0$, $1$, 
			$2$, $3$, $4$, $5$, $6$, 
			$7$, $8$, $9$, $10$, $11$, 
			$12$, $…$
		</p>
		
		<p>
			Możemy dopisywać kolejne liczby po lewej i po prawej stronie tak długo, jak chcemy. 
		</p>

		<p>
			Z liczbami ujemnymi najczęściej spotykamy się, odczytując temperaturę na termometrze.
		</p>
		
		<ul>
			<li>Przy $40°C$ umiera się z gorąca.</li>
			<li>Przy $30°C$ narzeka się na upał i wzywa majstra od klimatyzacji.</li>
			<li>Przy $20°C$ jest komfortowo, ale nikt nie zwraca na to uwagi.</li>
			<li>Przy $10°C$ robi się chłodno i ludzie marudzą, że lato się kończy.</li>
			<li>Przy $0°C$ narzeka się na mróz. Woda ma dość, więc zamarza.</li> 
			<li>Przy $-10°C$ ludzie marudzą, że w pięciu warstwach ubrania jest niewygodnie.</li>
			<li>Przy $-20°C$ <comment text="Chyba że jest się ciepłą kluchą."> umiera się z zimna</comment>.</li>
		</ul>
		</lesson-chapter>

		<lesson-chapter><template #title>Nazewnictwo</template>   
		<p class = "type">
			Intuicje
		</p>
		
		<p>
			Zarówno <i>liczb dodatnich</i> (na prawo od zera) jak i liczb ujemnych (na lewo od zera) jest nieskończenie wiele. Liczby ujemne, 
			zero i liczby dodatnie nazywamy <comment text="i ja, i ty, i wszyscy dookoła">wspólnie</comment> <i>liczbami całkowitymi</i>. 
		</p>
		
		<p>
			Kreska stojąca przed liczbami ujemnymi to symbol „minus” - taki sam, jakiego używamy przy odejmowaniu liczb. Jego rolą jest określenie 
			<i>znaku liczby</i> - <comment text="przynajmniej na razie">każda</comment> liczba w matematyce jest dodatnia, ujemna albo 
			jest zerem. Czasami liczby ujemne wraz z zerem obejmuje się mianem 
			<i>niedodatnie</i>, a liczby dodatnie wraz z zerem nazywa się <i>nieujemnymi</i>. 
		</p>

		<p>
			Liczby, które różnią się tylko znakiem, nazywamy <i>przeciwnymi</i>. 
		</p>
		
		<ul>
			<li>Liczby $2$ i $-2$ to liczby przeciwne</li>
			<li>Liczby $2372783$ i $-2372783$ to liczby przeciwne</li>
			<li>Liczba <span class="math">0</span> jest przeciwna sama do siebie (<span class="math">0</span> i <span class="math">0</span> to ta sama liczba)</li>
		</ul>

		<p>
			Jeśli zaniedbamy znak, liczby przeciwne będą takie same. Mówimy, że liczby przeciwne są równe co do <i>wartości bezwzględnej</i>. 
			Wartość bezwzględna liczby (nazywana czasem <i>modułem liczby</i>) to jej wartość z pominięciem znaku. Symbolicznie zapisujemy ją za pomocą dwóch pionowych kresek:
		</p>
		
		<ul>
			<li>Wartość bezwzględna liczby $-10$ wynosi $10:\ \ \ |-10|=10$</li>
			<li>Wartość bezwzględna liczby $6$ wynosi $6:\ \ \ |6|=6$</li>
			<li>Wartość bezwzględna liczby $0$ wynosi $0:\ \ \ |0|=0$</li>
		</ul>
		</lesson-chapter>

		<lesson-chapter><template #title>Dodawanie i odejmowanie liczb ujemnych</template>   
		<p class = "type">
			Intuicje
		</p>
		
		<p>
			Liczby całkowite dobrze się prezentują na osi liczbowej:
		</p>

		<center><img src="./.images/Screenshot_1.png" align="middle"></center>

		<p>
			Dzięki niej łatwo uzmysłowić sobie istotę dodawania i odejmowania liczb.
		</p>
		
		<p>
			Przypuśćmy, że chcemy dodać liczby $3$ i $5$. Nasze pytanie brzmi „Jeśli do liczby $3$ dodamy $5$, ile otrzymamy?”. 
			Oś liczbowa zwraca odpowiedź: 
			znajdujemy na osi liczbowej trójkę, a następnie skaczemy o $5$ pozycji w prawo i lądujemy na ósemce.
		</p>

		<center><img src="./.images/Screenshot_2.png" align="middle"></center>

		<p>
			Podobnie, gdybyśmy chcieli wykonać odejmowanie $6 - 4$, zaczęlibyśmy od liczby $6$, 
			przeskoczyli o $4$ pozycje w lewo i skończyli na dwójce.
		</p>
		

		<center><img src="./.images/Screenshot_3.png" align="middle"></center>

		<p>
			Podobnie rzecz się ma w przypadku liczb ujemnych.
		</p>
		
		<ul>
			<li>
				$-7 + 5 = -2$

			<center><img src="./.images/Screenshot_4.png" align="middle"></center>
			</li>
			<li>
				$8 - 12 = -4$

			<center><img src="./.images/Screenshot_5.png" align="middle"></center>
			</li>
		</ul>
			
		<p>
			Zastanówmy się, co gdyby chcieć dodać do $4$ liczbę $-2$. Możemy skorzystać z przemienności dodawania, by otrzymać
		</p>
		
		$$
			4 + (-2) = -2 + 4 = 2
		$$
			
			<center><img src="./.images/Screenshot_6.png" align="middle"></center>

		<p>
			Liczbę $-2$ zapisaliśmy w nawiasie, ponieważ $4 +-2$ wygląda głupio. Liczby ujemne zapisujemy w nawiasie, jeśli przed nimi stoi jakiś 
			znak działania. Po znaku równości oraz na początku działania można zapisać liczbę ujemną bez nawiasu.
		</p>
		
		<p>
			Powyższe działanie możemy ugryźć inaczej: na osi liczbowej zaczynamy od czwórki i przesuwamy się o $-2$ pozycji w prawo… tylko co to 
			znaczy? Zauważmy pewne tendencje:
		</p>
		
		<ul>
			<li>
				$4 + 3 = 7$
				<center><img src="./.images/Screenshot_7.png" align="middle"></center>
			</li>
			
			<li>
				$4 + 2 = 6$
				<center><img src="./.images/Screenshot_8.png" align="middle"></center>
			</li>
			
			<li>
				$4 + 1 = 5$
				<center><img src="./.images/Screenshot_9.png" align="middle"></center>
			</li>
			
			<li>
				$4 + 0 = 4$
				<center><img src="./.images/Screenshot_10.png" align="middle"></center>
			</li>
			
			<li>
				$4 + (-1) = 3$
				<center><img src="./.images/Screenshot_11.png" align="middle"></center>
			</li>
			
			<li>
				$4 + (-2) = 2$
				<center><img src="./.images/Screenshot_12.png" align="middle"></center>
			</li>
			
		</ul>
		
		<p>
			Rzeczywiście: przeskakiwanie o $-2$ pozycje w prawo jest tym samym, co przeskakiwanie o dwie pozycje w lewo. 
			A przecież przeskakiwanie w lewo symbolizuje odejmowanie.
		</p>
		
		$$
			4 + (-2) = 4 - 2 = 2
		$$
		
		<p>
			To dość ogólna zasada: dodawanie liczby ujemnej jest równoważne odejmowaniu liczby do niej przeciwnej. Występujące obok siebie $+$ i $-$ zwykle 
			można zastąpić pojedynczym minusem.
		</p>

		<p>
			Zastanówmy się jeszcze nad odejmowaniem liczby ujemnej. Działanie $5 - (-3)$ możemy rozumieć jako „przesunięcie piątki o $-3$ pozycje w lewo”, 
			a więc „przesunięcie piątki o $3$ pozycje w prawo”
		</p>
		
		$$
			5 - (-3) = 5 + 3 = 8
		$$

		<center><img src="./.images/Screenshot_13.png" align="middle"></center>

		<p>
			Odejmowanie liczby ujemnej jest równoważne dodawaniu liczby do niej przeciwnej. Dwa znaki $-$ występujące obok siebie możemy zastąpić 
			pojedynczym znakiem $+$.
		</p>
		
		<div class="example">
			Stefan z $30 \text{ zł}$ w portfelu wybrał się do cukierni „Drożdże Bogdana”. Kupił pięć rogalików za $3 \text{ zł}$, zostało mu więc $15 \text{ zł}$.
			$$
				30 \text{ zł} - 5  \cdot  3\text{ zł} = 30 \text{ zł} - 15 \text{ zł} = 15 \text{ zł}
			$$
			Czekając na wydanie reszty, spostrzegł niebiański tort biszkoptowy wyceniony na $50 \text{ zł}$. Wiedząc, że nie może mu się oprzeć, 
			kupił tort na krechę. Teraz Stefan jest winien Bogdanowi $35 \text{ zł}$. 
			$$
				15 \text{ zł} - 50 \text{ zł} = -35 \text{ zł}
			$$
			Można powiedzieć, że stan konta Stefana wynosi $-35 \text{ zł}$.
		</div>
		<div class="example">
			Po powrocie do domu Stefan zaczął buszować w Internecie. Reklama „wyciskarki do cytryn za jedyne $20 \text{ zł}$” wyskoczyła w 
			przeglądarce tak nachalnie, że Stefan zdecydował się na zakup. Zrealizował zamówienie na stronie sprzedawcy i zobowiązał się do 
			„płatności przy odbiorze”. Oznacza to, że stan konta Stefana jeszcze zmalał - Stefan dodał sobie kolejny dług do zapłaty
			$$
				-35 \text{ zł} + (-20 \text{ zł}) = -55 \text{ zł}
			$$
		</div>
		<div class="example">
			Następnego dnia Stefan znalazł na chodniku banknot $50 \text{ zł}$. Uradowany od razu zapłacił Bogdanowi za tort. Jego stan konta wzrósł, 
			chociaż nadal jest zadłużony.
			$$
				-55\text{ zł} + 50 \text{ zł} = -5 \text{ zł}
			$$
		</div>
		<div class="example">
			Wieczorem Stefan uświadomił sobie, że nienawidzi cytryn. Złożył rezygnację z zamówienia. W ten sposób pozbył się długu na $20 \text{ zł}$
			(z jego stanu konta został wymazany dług na $20 \text{ zł}$).
			$$
				-5 \text{ zł} - (-20 \text{ zł}) = -5 \text{ zł} + 20 \text{ zł} = 15 \text{ zł}
			$$
		</div>
		</lesson-chapter>

		<lesson-chapter><template #title>Mnożenie i dzielenie liczb ujemnych</template>   
		<p class = "type">
			Intuicje
		</p>
		
		<p>
			Mnożenie to po prostu wielokrotne dodawanie. Działanie $5  \cdot  (-2)$ możemy interpretować jako
		</p>
		
		$$
			(-2) + (-2) + (-2) + (-2) + (-2) = -10
		$$
		
		<p>
			Jeśli tylko jeden z czynników jest ujemny, sprawa nie jest skomplikowana. Jak jednak rozumieć działanie
		</p>
		
		<p style="text-align: center">
			$(-3)  \cdot  (-2)$ ?
		</p>
		
		<p>
			Wyobraźmy sobie kolejne wielokrotności liczby $-2$
		</p>

		<center><img src="./.images/Screenshot_14.png" align="middle"></center>
		
		<p>
			Ponownie okazuje się, że podwójny minus daje plus:
		</p>
		
		$$
			(-3)  \cdot  (-2) = 6
		$$

		<p>
			Dzielenie liczb ujemnych wygląda podobnie. Skoro
		</p>
		
		$$
			5  \cdot  (-2) = (-2) + (-2) + (-2) + (-2) + (-2) = -10
		$$
		
		<p>
			to
		</p>
		
		$$
			(-10) : 5 = -2
		$$
		
		<p>
			a także
		</p>
		
		$$
			(-10) : (-2) = 5
		$$

		<p>
			Działania na liczbach ujemnych przebiegają właściwie tak samo jako działania na liczbach dodatnich. Trzeba jedynie uważać na znaki.
		</p>
		
		<ul>
			<li>Jeśli w mnożeniu lub dzieleniu obydwa elementy są dodatnie, wynik będzie dodatni.</li>
			<li>Jeśli w mnożeniu lub dzieleniu tylko jeden element jest ujemny, wynik będzie ujemny.</li>
			<li>Jeśli w mnożeniu lub dzieleniu obydwa elementy są ujemne, wynik będzie dodatni.</li>
		</ul>

		<p>
			Warto mieć na uwadze regułę, że „dwa minusy dają plus”, a „jeden minus i jeden plus dają minus”.
		</p>
		
		<div class="example">
			Stefan - znany lekkoduch - zaciągnął pożyczkę na $200 \text{ zł}$ u sześciu różnych osób. Jego konto jest $1200 \text{ zł}$ na minusie.
			$$
				6  \cdot  (-200 \text{ zł}) = -1200 \text{ zł}
			$$
		</div>
		<div class="example">
			Sytuacja wygląda kiepsko, więc Stefan zadzwonił do czterech znajomych sprzed lat, którzy winni mu byli przysługę. Stefan i jego 
			kumple podzielili zadłużenie pomiędzy siebie - teraz każdy musi się zrzucić po $240 \text{ zł}$.
			$$
				-1200 \text{ zł} : 5 = -240 \text{ zł}
			$$
		</div>
		<div class="example">
			Kupując poranne bułeczki, Stefan opowiedział Bogdanowi o swojej niesamowitej przygodzie. Najpierw jego dług wynosił $1200 \text{ zł}$, ale potem 
			podzielił go pomiędzy kilku znajomych i teraz jego konto jest zaledwie $240 \text{ zł}$ na minusie. Bogdan, słuchając historii życiowej Stefana, 
			obliczył, że Stefan musiał podzielić swój dług na $5$ osób.
			$$
				-1200 \text{ zł} : (-240 \text{ zł} ) = 5
			$$
		</div>
		<div class="example">
			Marcel i Gucio niesamowicie śmierdzą. Zawsze, kiedy siedzą w klasie, uprzykrzają życie towarzyszom. Gdyby stworzyć 
			„punkty przyjemności zapachu” każdy z nich miałby $-10$ punktów. Dzisiejszego dnia zdarzył się cud: obydwoje nie przyszli na zajęcia. 
			W klasie od razu czuć niespotykany powiew świeżości na $+20$ punktów.
			$$
				(-2)  \cdot  (-10) = 20
			$$
		</div>
		</lesson-chapter>

		<lesson-chapter><template #title>Liczby ujemne a dzielenie z resztą</template> 
		<p class="type">
			Rozszerzenie
		</p>

		<p>
			Dzieląc dwie liczby naturalne, zadawaliśmy sobie pytanie, ile razy dzielnik mieści się w dzielnej. Odpowiedź na nie stanowi wynik dzielenia
			(czyli iloraz), zaś to, co zostało z dzielnej po dokonaniu jej pokawałkowania, nazywaliśmy resztą z dzielenia.
		</p>

		<ul>
			<li>$11 : 4 = 2\ r. 3$, ponieważ czwórka mieści się dwa razy w jedenastce, poza tym zostaje niepodzielne $3$. Inaczej $11 = 2 \cdot 4 + 3$</li>
			<li>$56 : 10 = 5\ r. 6$, ponieważ $56$ mieści w sobie pięć dziesiątek i jeszcze szóstkę: $56 = 5 \cdot 10 + 6$</li>
			<li>$20 : 5 = 4\ r. 0$, ponieważ piątka mieści się dokładnie cztery razy w dwudziestce: $20 = 4 \cdot 5 + 0$</li>
		</ul>

		<p>
			Nie powinno dziwić, że reszta z dzielenia jest mniejsza od dzielnika, czyli osiąga wartości od zera do liczby o jeden mniejszej niż dzielnik.
			Na przykład gdy dzielimy przez $5$, możemy otrzymać resztę o wartości $0$, $1$, $2$, $3$ lub $4$, bez względu na to, jaką liczbę dzielimy. 
			Matematycy postanowili, że cecha ta zostanie zachowana także dla liczb ujemnych. To znaczy, gdy podzielimy liczbę ujemną przez $5$, również otrzymamy 
			resztę o wartości $0$, $1$, $2$, $3$ lub $4$.
		</p>

		<ul>
			<li>$-11 : 4 = -3\ r. 1$ lub inaczej $-11 = -3 \cdot 4 + 1$</li>
			<li>$-56 : 10 = -6\ r. 4$ lub inaczej $-56 = -6 \cdot 10 + 4$</li>
			<li>$-20 : 5 = -4\ r. 0$ lub inaczej $-20 = -4 \cdot 5 + 0$</li>
		</ul>

		<p>
			Może wydawać się to dziwne, bo właściwie dlaczego nie zdefiniowano reszty jako ujemnej, symetrycznie do działań wykonywanych na liczbach dodatnich? 
			Zdecydowano się na takie rozwiązanie właśnie po to, by zachować tę jedną własność reszty z dzielenia: chcemy być pewni, że w wyniku dzielenia 
			<b>dowolnej</b> liczby przez dzielnik otrzymamy wartość z zakresu od zera do liczby o $1$ mniejszej niż dzielnik. Po prostu daje to pewien komfort 
			psychiczny. Najpewniej powrócimy do tego tematu przy okazji omawiania operacji <i>modulo</i> (czyli właśnie reszty z dzielenia) w temacie 
			"Arytmetyka modularna". Niech zadowoli Cię świadomość, że tak określona reszta z dzielenia zachowuje wysoką przyzwoitość matematyczną i kulturalnie 
			zachowuje się na poniższym obrazku. Na poziomej osi odkładamy kolejne liczby całkowite, które będziemy dzielić przez $5$. Każdej z nich 
			przyporządkowujemy resztę z dzielenia, idąc o tyle kratek w górę, ile wynosi reszta. W rezultacie powstają schodki, które wspinają się w prawo ku górze, 
			konsekwentnie na całej rozciągłości liczb całkowitych.
		</p>

		<iframe src="https://www.desmos.com/calculator/1jt6wwmoqh?embed" width="100%" height="500px" style="border: 2px solid #ccc" frameborder=0></iframe>

		</lesson-chapter>

		</lesson>
	</template>

	<script>
	import LessonTitle from "../../../lesson/LessonTitle";
	import LessonIntro from "../../../lesson/LessonIntro";
	import LessonChapter from "../../../lesson/chapter/LessonChapter";
	import Lesson from "../../../lesson/Lesson";

	export default {
		name: "LiczbyUjemne",
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
