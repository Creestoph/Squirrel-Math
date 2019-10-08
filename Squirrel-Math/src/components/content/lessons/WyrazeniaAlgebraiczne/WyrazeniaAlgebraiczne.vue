<template>
  <lesson>
    <lesson-title>Wyrażenia algebraiczne</lesson-title>

    <lesson-intro>
	<p>
		Wreszcie przychodzi pora, by przestać bawić się w księgowość, a wkroczyć w prawdziwą matematykę. Dziedzina, którą głównie zajmowaliśmy 
		się do tej pory, to <i>arytmetyka</i> – stosunkowo żmudna nauka, mówiąca jedynie, jak grzebać w kałuży liczb naturalnych, wymiernych i 
		całkowitych, aby nie pobrudzić sobie za bardzo rąk. Teraz wchodzimy o szczebel wyżej w wysokiej drabinie abstrakcji – rozpoczynamy 
		znajomość z <i>algebrą</i>.
	</p>
	</lesson-intro>

    <lesson-chapter><template #title>Wzór na doskonałość</template>		
	<p class="type">
		Intuicje
	</p>
	
	<p>
		Po kilku miesiącach intensywnego odchudzania tabletkami „Nopain” Michaś zaczął dostrzegać rzeczywiste rezultaty – patrząc w lustro, 
		nie może odmówić swej sylwetce cech boskich. Z obawy przed czyhającą za rogiem anoreksją, Michaś postanowił upewnić się, czy nie grozi 
		mu niedowaga. Z głową zajętą planowaniem, w jaki sposób zacząłby walkę ze swoją niedowagą, przystąpił do obliczenia swojego wskaźnika BMI, o którym 
		usłyszał na lekcjach biologii. Aby uzyskać wskaźnik BMI, bierzemy swój wzrost w metrach i mnożymy jego wartość przez samą siebie, 
		a następnie dzielimy swoją wagę w kilogramach przez uzyskany wynik. Jeżeli wskaźnik jest mniejszy niż $18,5$, mamy niedowagę, wartość między 
		$18,5$ a $25$ oznacza normę, zaś 
		wskaźnik powyżej $25$ sugeruje nadwagę.
	</p>

	<p>
		Powyższą regułkę matematyk zapisze w postaci <i>wzoru</i>: 
	</p>
		
	$$
		BMI=\frac{waga}{wzrost \cdot wzrost}
	$$
		
	<p>
		Prawdopodobnie niejedna osoba o niebanalnym poczuciu estetyki zauważy, że użycie polskiego słowa „waga” w uniwersalnym matematycznym
		wzorze jest przynajmniej nieeleganckie. Z tego powodu zamiast słownych opisów w matematycznych formułach zawsze będziemy używać
		jednoliterowych oznaczeń:
	</p>
	
	$$
		B=\frac{m}{h \cdot h}
	$$
		
	<p>
		Następnie po dumnym zapisaniu wzoru wyjaśnimy z dowolną dokładnością i czułością osobie niewtajemniczonej nasze oznaczenia:
		<br>
		&emsp;&emsp;$m$ – masa ciała w kilogramach<br>
		&emsp;&emsp;$h$ – wzrost w metrach<br>
		&emsp;&emsp;$B$ – współczynnik BMI niosący konsekwencje: <br>
		&emsp;&emsp;&emsp;&emsp;$B \lt 18,5$ – niedowaga<br>
		&emsp;&emsp;&emsp;&emsp;$18,5 \lt B \lt 25$ – norma<br>
		&emsp;&emsp;&emsp;&emsp;$B&gt;25$ – nadwaga<br>
	</p>
		
	<p>		
		Z punktu widzenia rachunków, które należy wykonać, zapis za pomocą wzoru jest znacznie bardziej przejrzysty niż wyjaśnienie słowne. 
		Możemy teraz taśmowo przyjmować kolejnych delikwentów i wydawać wyroki dotyczące ich budowy ciała.
	</p>
	
	<div class="example">
		Pani Krystyna: waga $64 \text{ kg}$, wzrost $1,87 \text{ m}$
		$$B=\frac{64}{1,87 \cdot 1,87}≈18,3$$
		Niedowaga to niska cena za $20$ miejsce w konkursie top-model.
	</div>
	
	<div class="example">
		Stefan: waga $79 \text{ kg}$, wzrost $1,78 \text{ m}$
		$$B=\frac{79}{1,78 \cdot 1,78}≈24,93$$
		Waga w normie to ulga dla Stefanowego sumienia, targanego czwartkowym pączkiem z różą.
	</div>
	
	<div class="example">
		Michaś: waga $103 \text{ kg}$, wzrost $1,75 \text{ m}$
		$$B=\frac{103}{1,75 \cdot 1,75}≈33,63$$
		Michaś pełen niedowierzania postanowił przerzucić się na tabletki „Nogain”.
	</div>
    </lesson-chapter>

    <lesson-chapter><template #title>Oznaczenia literowe</template>  
	<p class="type">
		Intuicje
	</p>
	
	<p>
		Aby z łatwością wyrażać ogólne myśli matematyczne, stosujemy litery, które pełnią rolę dość dowolnych liczb – liczb jakby 
		„czekających na swoją wartość”. We wzorze
	</p>
	
	$$
		B=\frac{m}{h \cdot h}
	$$
	
	<p>
		Litery $m$ i $h$ to <i>zmienne</i>, pod które należy podstawić konkretne wartości liczbowe, 
		kiedy przyjdzie na to pora. 
	</p>
		
	<p>
		Litery mogą zastępować także dowolne <i>stałe</i> matematyczne lub fizyczne. Dla przykładu weźmy wzór fizyczny pozwalający określić jak
		daleko przemieszcza się światło w ciągu zadanego czasu:
	</p>
	
	$$
		d=299\ 792\ 458 \cdot t
	$$
	
	<p>
		gdzie $t$ oznacza jakąkolwiek wartość wyrażoną w sekundach, zaś $d$ 
		oznacza oznacza ilość metrów, jakie światło przebędzie w ciągu tylu sekund. Przykładowo podstawiając $t=60$ otrzymamy 
		$d=299\ 792\ 458 \cdot 60=17\ 987\ 547\ 480$ i oznacza to tyle, że w ciągu $60$
		sekund (w ciągu minuty) światło przebywa $17\ 987\ 547\ 480$ metrów, czyli prawie $18$
		milionów kilometrów. Dla porównania, w ciągu $499$ sekund ($8$ minut i $19$ sekund)
		światło przebywa $149\ 600\ 000\ 000$ metrów, czyli odległość od Ziemi do Słońca. Tak więc gdyby Słońce nagle zgasło, 
		zauważylibyśmy to dopiero po $8$ minutach. Powyższy wzór moglibyśmy zapisać jako
	</p>
	
	$$
		d=c \cdot t
	$$
	
	<p>
		zastępując literą $c$ dość długą liczbę o stałej wartości $299\ 792\ 458$. 
		Stała $c$ w fizyce nosi nazwę "prędkość światła w próżni" i pojawia się w całkiem wielu wzorach opisujących fale świetlne oraz energię.
		Jeśli jakaś wartość liczbowa często pojawia się w fizyce, naukowcy chętnie nazywają je stałą i przydzielają jej unikalne oznaczenie literowe.
		Fizycy nie lubią, kiedy w ich wzorach pojawiają się przydługie liczby wymierne.
	</p>
		
	<p>
		Gdy wzory stają się rozbudowane i wymagają użycia wielu zmiennych, bądź też jeśli do oznaczenia różnych zmiennych chcielibyśmy 
		zastosować tę samą literę, zaleca się stosowanie <i>indeksów dolnych</i>. Weźmy wzór wynaleziony przez dietetyków mający rzekomo 
		określać liczbę kalorii, jaką dana osoba powinna spożyć w ciągu dnia:
	</p>
	
	$$
		K=K_{mat}+K_{akt}+K_ż+K_{poż}
	$$
	
	<p>
		gdzie:
		<br>
		&emsp;&emsp;$K_{mat}$ to kalorie przeznaczone na przemianę materii<br>
		&emsp;&emsp;$K_{akt}$ to kalorie spalane podczas aktywności fizycznej<br>
		&emsp;&emsp;$K_ż$ to kalorie potrzebne do wykonywania podstawowych czynności życiowych<br>
		&emsp;&emsp;$K_{poż}$ to kalorie wykorzystywane do spalania pożywienia
	</p>
	
	<p>
		każdy ze składników powyższej sumy oznacza jakieś kalorie, więc każdy z nich oznaczamy literką $K$, 
		jednak dla rozróżnienia <i>indeksujemy</i> 
		te zmienne adekwatnymi przypisami.
	</p>
	
	<p>
		Wgłębiając się w dietetyczny szał, <comment 
		text="Ponieważ mamy zapędy seksistowskie, uwzględniamy tylko wzory dla mężczyzn. Właściwie tylko statystycznych mężczyzn.">
		zobaczmy, jak wyliczyć każdy z powyższych składników:</comment>
	</p>
	
	<ul>
		<li>
			$K_{mat}=5+9,99 \cdot m + 6,25 \cdot h - 4,92 \cdot a$<br>
			gdzie <br>
			&emsp;&emsp;$m$ oznacza masę ciała w kilogramach<br>
			&emsp;&emsp;$h$ to wzrost w centymetrach<br>
			&emsp;&emsp;$a$ to wiek w latach<br><br>
		</li>
			
		<li>
			$K_{akt}=8 \cdot t_{sił}+7 \cdot t_{aero}+0,05 \cdot K_{mat} \cdot l$<br>
			gdzie <br>
			&emsp;&emsp;$t_{sił}$ – liczba minut poświęconych dziennie na trening siłowy<br>
			&emsp;&emsp;$t_{aero}$ - liczba minut poświęconych dziennie na trening aerobowy<br>
			&emsp;&emsp;$l$ – liczba podjętych treningów<br><br>
		</li>
			
		<li>
			$K_ż=300$ dla osoby szczupłej, $K_ż=800$ dla osoby tęższej, 
			$K_ż=450$ dla osoby atletycznie zbudowanej<br><br>
		</li>

		<li>
			$K_{poż}=0,08 \cdot (K_{mat}+K_{akt}+K_ż)$
		</li>
	</ul>
	
	<div class="example">
		Ten jakże złożony wzór możemy z przyjemnością zaaplikować dla przypadku Michasia:
		
		<ul>
			<li>
				Waga: $103 \text{ kg}$, wzrost: $175 \text{ cm}$, wiek: $14 \text{ lat}$<br>
				$K_{mat}=5+9,99 \cdot 103 + 6,25 \cdot 175 - 4,92 \cdot 14=2058,84$
			</li>
			<li>
				$K_{akt}=0$ ze względu na brak aktywności fizycznej
			</li>
			<li>
				$K_ż=800$, z całym szacunkiem dla Michasia
			</li>
			<li>
				$K_{poż}=0,08 \cdot (2058,84+0+800)=228,7072$
			</li>
		</ul>
		
		<p>
			Stąd
		</p>
		
		$$
			K=2058,84+0+800+228,7072=3087,5472
		$$
			
		<p>
			Jeśli kawałek tortu czekoladowego ma $700 \text{ kcal}$, Michaś zapełniłby swoje dzienne zapotrzebowanie na 
			energię czterema kawałkami tortu… 
			jednak do odważnych świat należy – im większa masa ciała, tym większe zapotrzebowanie na kalorie!
		</p>
	</div>	
    </lesson-chapter>

    <lesson-chapter><template #title>Jednomiany</template>  
	<p class="type">
		Intuicje
	</p>
		
	<p>
		Bardzo często w różnego rodzaju wzorach i matematycznych zapiskach pojawiają się mieszaniny liczb i liter połączonych działaniami 
		matematycznymi, coś w rodzaju
	</p>
	
	$$
		5 \cdot a \cdot b+6 \cdot m+5,5 \cdot g \cdot h
	$$
	
	<p>
		Każdy taki zlepek liczb (<comment text="i nie tylko">naturalnych, wymiernych, całkowitych…</comment> ) oraz liter (zmiennych, stałych, parametrów…) nazywamy 
		<i>wyrażeniem algebraicznym</i> albo po prostu <i>wyrażeniem</i>. 
		Wyrażenia algebraiczne bardzo często mają postać kilku iloczynów, które do siebie dodajemy, tak jak powyższa suma 
		iloczynów $(5 \cdot a \cdot b)$, $(6 \cdot m)$ oraz 
		$(5,5 \cdot g \cdot h)$. Ze względu na kolejność wykonywania działań mnożenie wykonujemy w pierwszej kolejności, 
		a więc kiedy obliczamy wartość wyrażenia algebraicznego (po podstawieniu wartości liczbowych) zawsze musimy najpierw rozpracować poszczególne 
		grupy iloczynów, a na koniec zajmujemy się ich sumowaniem. O każdym takim iloczynie możemy myśleć jak o unikalnej indywidualności, 
		jakby bohaterze naszych matematycznych przygód. Sumowanie to tylko wprowadzanie tych bohaterów na scenę, zebranie ich wszystkich 
		razem w celu odegrania spektaklu. 
		Każdego takiego bohatera nazywamy <i>jednomianem</i>. Jednomian to iloczyn liczby oraz zmiennych literowych, przykładowo
	</p>
	
	<ul>
		<li>$a \cdot b \cdot b$</li>
		<li>$-5,4 \cdot m \cdot f$</li>
		<li>$\frac{4}{3} \cdot x \cdot y$</li>
	</ul>
	
	<p>
		W każdym jednomianie można wyróżnić liczbę (widniejącą w postaci cyfr), przez którą zostały pomnożone pozostałe litery. Jest to tzw. <i>współczynnik jednomianu</i>.
	</p>
	
	<ul>
		<li>W jednomianie $25,3 \cdot b \cdot d \cdot e$ współczynnikiem jest $25,3$</li>
		<li>W jednomianie $\frac{a \cdot b \cdot c}{3}$ współczynnikiem jest $\frac{1}{3}$ 
		(bardziej elegancka forma zapisu tego jednomianu to $\frac{1}{3} \cdot a \cdot b \cdot c$)</li>
		<li>W jednomianie $-x \cdot y \cdot z$ współczynnikiem jest $-1$</li>
		<li>W jednomianie $4$ współczynnikiem jest $4$</li>
		<li>W jednomianie $h \cdot 3 \cdot n \cdot 2 \cdot j \cdot j$ współczynnikiem jest $6$</li>
	</ul>
	
	<p>
		W jednomianie nie mogą występować inne działania, jak dodawanie, odejmowanie czy dzielenie (dopuszczalne jest dzielenie w postaci ułamka, 
		którego mianownikiem jest liczba; wtedy taki mianownik w istocie jest częścią współczynnika liczbowego)
	</p>
	
	<p>
		Wyrażenie będące sumą jednomianów nazywamy <i>sumą algebraiczną</i> lub czasem <i>wielomianem</i>, choć pojęcie wielomianu odnosi się 
		do trochę innej idei matematycznej. 
	</p>
	
	<p>
		Dla przejrzystości zapisu i lepszego poczucia „jedności” i „zbitości” jednomianów pomija się znak mnożenia w 
		jednomianach. Matematycy nie będą pisać sumy
	</p>
	
	$$
		5 \cdot a \cdot b+6 \cdot m+5,5 \cdot g \cdot h
	$$
	
	<p>
		Zamiast tego zapisujemy
	</p>
	
	$$
		5ab+6m+5,5gh
	$$
	
	<p>
		Dzięki temu zapis jest krótszy i pozwala łatwiej rozróżnić od siebie poszczególne jednomiany, a nie powoduje niejednoznaczności. W 
		ciągu przyszłej kariery matematycznej szybko odzwyczaisz się od zapisywania kropki mnożenia. W praktyce znak mnożenia zapisujemy tylko
		wtedy, gdy wykonujemy mnożenie dwóch liczb (zapisanych cyframi, nie za pomocą liter).
	</p>

	<p>
		Teraz staje się jasne, dlaczego zmienne zapisujemy za pomocą jednoliterowych oznaczeń. Dla matematyka zapis
	</p>
	
	$$
		BMI=\frac{waga}{wzrost \cdot wzrost}
	$$
	
	<p>
		oznacza, że
	</p>
	
	$$
		B \cdot M \cdot I=\frac{w \cdot a \cdot g \cdot a}{w \cdot z \cdot r \cdot o \cdot s \cdot t \cdot w \cdot z \cdot r \cdot o \cdot s \cdot t}
	$$
	
	<p>
		Wciąż, jeśli chcemy dokładnie opisywać swoje zmienne, jak najbardziej dopuszczalne jest ściubienie dopisków w indeksach dolnych zmiennych.
	</p>
	
    </lesson-chapter>

  </lesson>
</template>

<script>
import LessonTitle from "../../../lesson/LessonTitle";
import LessonIntro from "../../../lesson/LessonIntro";
import LessonChapter from "../../../lesson/chapter/LessonChapter";
import Lesson from "../../../lesson/Lesson";

export default {
  name: "WyrazeniaAlgebraiczne",
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
