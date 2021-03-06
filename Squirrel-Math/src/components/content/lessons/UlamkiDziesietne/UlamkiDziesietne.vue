<template>
	<lesson routeShortVersion="/ulamki-dziesietne-short" routeLongVersion="/ulamki-dziesietne">
		<lesson-title>Ułamki dziesiętne</lesson-title>

		<lesson-intro>
		<p>
			Świat znający wyłącznie z ułamki zwykłe byłby bardzo ciężki i smutny. Wystarczy wyobrazić sobie konkurs na top modelkę, 
			w którym komisja spisywałaby wymiary kandydatek: <br>
			Krystyna, lat $29$, wzrost: $\frac{11925}{67} \text{ cm}$, waga: $\frac{789}{12} \text{ kg}$, biust: 
			$\frac{171}{2} \text{ cm}$, talia: $\frac{355}{6} \text{ cm}$, biodra: $\frac{968}{11} \text{ cm}$. <br>
			Bożena, lat $21$, wzrost: $\frac{1268}{7} \text{ cm}$, waga: $\frac{2379}{34} \text{ kg}$, biust: 
			$\frac{4319}{54} \text{ cm}$, talia: $\frac{987}{17} \text{ cm}$, biodra: $\frac{629}{7} \text{ cm}$.<br>
			Obok stolika jurorów urzęduje sztab matematyków, którzy sprowadzają wszystkie parametry do wspólnego mianownika, 
			a następnie porównują liczniki biustu, talii i bioder. Da się z tym żyć, jednak co to za życie.
		</p>
		</lesson-intro>

		<lesson-chapter><template #title>Nowe spojrzenie</template>
		<p class = "type">
			Intuicje
		</p>
		
		<p>
			W praktyce zależy nam na tym, aby jeden rzut oka na liczbę wystarczył, by ocenić, czy jest ona duża, czy mała. 
			Liczby naturalne mają stosunkowo łatwą konstrukcję: cyfry bardziej po lewej mają większą wagę, a bardziej po prawej są 
			mniej znaczące. Analogiczną metodę można wprowadzić do zapisu ułamków.
		</p>
		
		<p>
			W tym celu stosuje się przecinek. Liczbę zapisaną w postaci 
		</p>
		
		$$
			21,7
		$$
		
		<p>
			rozumiemy jako liczbę mieszaną $21 \frac{7}{10}$, czyli ułamek $\frac{217}{10}$. Liczba 
		</p>
		
		$$
			0,74
		$$
		
		<p>
			Oznacza ułamek $\frac{74}{100}$ lub ekscentrycznie zapisaną liczbę mieszaną $0 \frac{74}{100}$. 
		</p>
		
		<p>
			Liczba zapisana za pomocą przecinka zawsze zawiera ułamek, którego mianownik to $10$, $100$, 
			$1000$, $10000$ itd. 
			Zer w mianowniku zawsze będzie tyle, ile cyfr występuje po przecinku.
		</p>
		
		<ul>
			<li>
				$0,873=\frac{873}{1000}$
			</li>
			<li>
				$37,843=37 \frac{843}{1000}=\frac{37843}{1000}$
			</li>
			<li>
				$0,000001=\frac{1}{1000000}$
			</li>
		</ul>
		
		<p>
			Liczba zapisana z użyciem przecinka to właśnie ułamek dziesiętny. Ułamki dziesiętne dominują w fizyce i naukach 
			technicznych. Matematyka jest jedyną <comment text="dziedziną „życia”">dziedziną życia</comment>, 
			w której ułamki zwykłe stosuje się częściej niż dziesiętne.
		</p>
		</lesson-chapter>

		<lesson-chapter><template #title>Nazewnictwo</template>    
		<p class = "type">
			Intuicje
		</p>
		
		<p>
			Gdy zapiszemy liczbę w postaci ułamka dziesiętnego, widzimy jej <i>rozwinięcie dziesiętne</i>. Sam przecinek nazywa się 
			czasem <i>przecinkiem dziesiętnym</i> albo rzadziej <i>separatorem dziesiętnym</i>. Bardzo często (zwłaszcza za granicą) zamiast przecinka stosuje się 
			kropkę. W krajach zagranicznych użycie przecinka byłoby wręcz niezrozumiane. 
		</p>
		
		<p>
			W przestarzałych źródłach możemy znaleźć słowo „koma” (ang. comma - przecinek) zaznaczające pozycję przecinka. 
			Dziś zamiast czytać $1,67$ jako „jeden koma sześćdziesiąt siedem” mówimy „jeden przecinek sześćdziesiąt siedem” albo 
			profesjonalniej „jeden i sześćdziesiąt siedem setnych”. 
		</p>
		
		<p>
			Ułamki dziesiętne stanowią płynne rozszerzenie liczb naturalnych. Liczba zapisana jest za pomocą serii cyfr od lewej 
			do prawej, a każda kolejna coraz mniej modyfikuje wartość liczby. Cyfry te mają swoje nazwy – idąc w lewo od przecinka mamy cyfry jedności, dziesiątek, setek i tysięcy. 
			Idąc w prawo od przecinka napotkamy kolejno <i>cyfrę części dziesiętnych</i>, <i>cyfrę części setnych</i>, 
			<i>cyfrę części tysięcznych</i> itd.
		</p>
		
		<ul>
			<li>	
				W liczbie $121,34$ cyfrą setek jest $1$, cyfrą dziesiątek jest $2$, cyfrą jedności 
				jest $1$, cyfrą części dziesiętnych jest $3$, cyfrą części setnych jest $4$.
			</li>
		</ul>
		
		<p>
			Chociaż liczba $121,34$ zapisana jest przy pomocy $5$ cyfr, nie mówimy, że jest to liczba pięciocyfrowa. 
			Gdy mówimy o iluś-cyfrowej liczbie, mamy na myśli liczby naturalne. W przeciwnym razie nazwa ta wprowadzałaby 
			zbyt wiele niejednoznaczności.
		</p>
		
		<p>
			Fragment liczby przedstawiający jej całkowitą część (przed przecinkiem) to <i>cecha liczby</i>. 
			Fragment przedstawiający część ułamkową (po przecinku) to <i>mantysa liczby</i>.
		</p>
		
		<ul>
			<li>W liczbie $35,034$ cecha ma wartość $35$, zaś mantysa $0,034$.</li>
		</ul>
		</lesson-chapter>

		<lesson-chapter><template #title>Mierzenie długości</template>   
		<p class = "type">
			Intuicje
		</p>
		
		<p>
			Przydatność liczb w zapisie dziesiętnym wychodzi na jaw przy mierzeniu <comment text="Wprawdzie nie 
			tłumaczyliśmy jeszcze, czym jest długość, jednak mając Cię za osobę rozgarniętą, zakładamy, że wiesz, czym jest 
			metr.">długości</comment>. 
		</p>
		
		<p>
			Pewnego dnia Krzyś postanowił zmierzyć szerokość swojego biurka. Wziął miarkę o długości <comment
			text="Jeśli ta tasiemka na Twoim monitorze nie ma metra, powinieneś zaopatrzyć się w większy wyświetlacz.">metra</comment>.  
			Jeden metr to dość dużo – miarka okazała się wystawać poza krawędź biurka
		</p>

		<center><img src="./.images//Screenshot_1.png" align="middle"></center>
		
		<p>
			Ponieważ Krzyś jest perfekcjonistą, chce dokładnie określić szerokość biurka. W tym celu dzieli w myślach tasiemkę z 
			miarką na $10$ równych części.
		</p>

		<center><img src="./.images//Screenshot_2.png" align="middle"></center>
		
		<p>
			Każda z nich ma długość $\frac{1}{10} \text{ m}$, czyli $0,1 \text{ m}$. Spostrzegawczy Krzyś zauważa, że do szerokości biurka 
			najlepiej dopasowuje się $8$ takich fragmentów, czyli $\frac{8}{10} \text{ m}=0,8 \text{ m}$. Jednak ta 
			dokładność wciąż nie zadowala Krzysia – teraz tasiemka nie dosięga krawędzi stołu.
		</p>

		<center><img src="./.images//Screenshot_3.png" align="middle"></center>
		
		<p>
			Idealna długość tasiemki będzie mieścić się gdzieś pomiędzy $0,8 \text{ m}$ a $0,9 \text{ m}$. Dla uzyskania perfekcyjnego wyniku 
			Krzyś dzieli dziewiąty segment taśmy na $10$ fragmentów. Każdy z nich ma długość $\frac{1}{10}$ takiego 
			segmentu, czyli $\frac{1}{100} \text{ m}=0,01 \text{ m}$.
		</p>

		<center><img src="./.images//Screenshot_4.png" align="middle"></center>
		
		<p>
			Gdy weźmiemy $4$ takie mini-segmenty, tasiemka całkiem nieźle dotyka krawędzi stołu. Wyznaczamy więc orientacyjną 
			długość biurka na $0,84 \text{ m}$. Aby osiągnąć samospełnienie, Krzyś wyciąga lupę. Stwierdza, że $0,84 \text{ m}$ nadal nie jest 
			idealną długością.
		</p>

		<center><img src="./.images//Screenshot_5.png" align="middle"></center>
		
		<p>
			Długość $0,842 \text{ m}$ jest dla Krzysia zadowalająco dokładna.
		</p>
		</lesson-chapter>

		<lesson-chapter><template #title>Przybliżenia</template>   
		<p class = "type">
			Intuicje
		</p>
		
		<p>
			Przed chwilą stosowaliśmy lupę, żeby przybliżyć sobie tasiemkę i lepiej zobaczyć jej segmenty. Przybliżanie liczb nie 
			oznacza jednak przyglądania się im z bliska. 
		</p>

		<p>
			Gdyby Krzyś nie był pedantem, zadowoliłby się wynikiem pomiarów przy $0,8 \text{ m}$. Wtedy Krzyś dokonałby <i>przybliżenia</i> 
			lub inaczej <comment text="Słownik podaje, że „szacowny” oznacza „posiadający dużą wartość”. Nie jest 
			to w pełni prawda – w matematyce szacować można także bardzo małe liczby."><i>szacowania</i></comment> długości biurka. 
			W praktyce przybliżanie wielkości to po prostu branie na oko. W matematyce 
			jednak metody przybliżania liczb są ściśle określone.
		</p>

		<p>
			Najczęściej dokonywanym przybliżeniem jest <i>zaokrąglenie</i> liczby. Weźmy wynik pomiarów Krzysia równy $0,842 \text{ m}$. 
		</p>
		<ul>
			<li>Zaokrąglenie $0,842$ do części setnych wynosi $0,84$.</li>
			<li>Zaokrąglenie $0,842$ do części dziesiętnych wynosi $0,8$.</li>
			<li>Zaokrąglenie $0,842$ do jedności wynosi $1$.</li>
		</ul>
		
		<p>
			Im bardziej zaokrąglamy liczbę, tym bardziej jesteśmy niedbali o jej dokładną wartość.
		</p>

		<p>
			Zaokrąglenia zawsze dokonujemy do pewnej cyfry, np. do części tysięcznych, do części setnych, do części dziesiętnych, 
			do jedności, albo do wyższych cyfr – do dziesiątek, do setek, do tysięcy. Aby zaokrąglić liczbę do części dziesiętnych, 
			patrzymy na cyfrę bezpośrednio po prawej - cyfrę części setnych. Jeśli wynosi ona $0$, $1$, 
			$2$, $3$ albo $4$, 
			przybliżenie polega po prostu na ucięciu cyfry części setnych i wszystkich kolejnych. Jeśli jednak wynosi $5$, 
			$6$, $7$, $8$ 
			albo $9$, cyfrę części dziesiętnych zwiększamy o $1$ i ucinamy wszystkie z prawej.
		</p>
		
		<ul>
			<li>Zaokrąglenie $17,65401$ do części dziesięciotysięcznych wynosi $17,6540$.</li>
			<li>Zaokrąglenie $17,65401$ do części tysięcznych wynosi $17,654$.</li>
			<li>Zaokrąglenie $17,65401$ do części setnych wynosi $17,65$.</li>
			<li>Zaokrąglenie $17,65401$ do części dziesiętnych wynosi $17,7$.</li>
			<li>Zaokrąglenie $17,65401$ do jedności wynosi $18$.</li>
			<li>Zaokrąglenie $17,65401$ do dziesiątek wynosi $20$.</li>
			<li>Zaokrąglenie $17,65401$ do setek wynosi $0$.</li>
		</ul>

		<p>
			Symbolicznie określenie przybliżenia wyraża znak $≈$ przypominający znak równości po kilku głębszych. 
			Możemy zapisać $17,65401≈17,65$ lub $17,65401≈17,7$ lub $17,65401≈18$. 
			Czasem zamiast podwójnej fali spotyka się też $≅$, 
			jednak na poziomie wyższej matematyki symbol ten przybiera inne znaczenie.
		</p>
		
		<ul>
			<li>
				Według międzynarodowych przeliczników miar długości mila angielska to <comment text="Poprawnie liczbę 
				tę wypadałoby odczytać „jeden i sześćset dziewięć tysięcy trzysta czterdzieści cztery milionowe”. W praktyce i 
				tak czytamy „jeden przecinek sześć zero dziewięć trzy cztery cztery”.">$1,609344$</comment> kilometra. Od patrzenia na taką 
				liczbę bolą oczy. W praktyce wystarczy nam pojęcie, że mila to około $1,6$ kilometra, czyli $1,609344 \text{ km} ≈ 1,6 \text{ km}$
			</li>
		</ul>

		<p>
			W zapisie dziesiętnym cyfry z lewej strony mają większą wagę i mocniej wpływają na wielkość liczby niż cyfry po 
			prawej stronie. Każda cyfra ma wagę $10$ razy większą niż cyfra bezpośrednio po prawej. Gdy czytamy liczbę od lewej do 
			prawej, kolejne cyfry mają coraz mniejsze znaczenie i jedynie precyzują wartość liczby. Z tego powodu w praktyce 
			możemy czasami „zaniedbać” niektóre cyfry i oglądać liczbę w uproszczonej postaci. 
		</p>
		
		<p class = "type">
			Rozszerzenie
		</p>
		
		<p>
			W kontekście ułamków dziesiętnych wprowadzono wątpliwej przydatności pojęcia <comment text="Ty też bądź 
			bohaterem w swoim domu."><i>podłoga</i> i <i>sufit</i></comment>. Podłoga liczby to jej 
			część całkowita. Symbolicznie zdanie „część całkowita (podłoga) liczby $24,389$ wynosi $24$” zapisujemy jako: 
			<comment text ="Podobnie ⌊Łazienka pana Janusza⌋=różowe kafle">$⌊24,389⌋=24$</comment>. Podłoga to jakby "przybliżanie liczby w 
			dół". Z kolei sufit to "przybliżanie liczby w górę". Symbolicznie $⌈24,389⌉=25$. Podłoga i sufit liczb naturalnych są równe.
		</p>
		</lesson-chapter>

		<lesson-chapter><template #title>Nieskończone rozwinięcie dziesiętne</template>   
		<p class = "type">
			Intuicje
		</p>
		
		<p>
			Liczba $\frac{2}{10}$ zapisana jako ułamek dziesiętny to $0,2$. Jeśli przypomnimy sobie właściwości 
			rozszerzania ułamków zwykłych, stwierdzimy, że 
		</p>
		
		$$
			\frac{2}{10}=\frac{20}{100}
		$$
		
		<p>
			Z kolei $\frac{20}{100}$ zapisane w postaci dziesiętnej to $0,20$. Oznacza to, że
		</p>
		
		$$
			0,2 = 0,20
		$$
		
		<p>
			Kontynuując tendencję rozszerzania licznika i mianownika przez $10$, otrzymamy
		</p>
		
		$$
			\frac{2}{10}=\frac{20}{100}=\frac{200}{1000}=\frac{2000}{10000}=\frac{20000}{100000}=...
		$$
		
		<p>
			czyli
		</p>
		
		$$
			0,2 = 0,20 = 0,200 = 0,2000 = 0,20000 = …
		$$
		
		<p>
			Dopisywanie zer po przecinku na końcu liczby nic nie zmienia: możemy dopisywać zera bez opamiętania, tak długo, 
			jak chcemy. W gruncie rzeczy możemy dopisać <b>nieskończenie wiele</b> zer na końcu ułamka dziesiętnego – i nie zmienimy 
			jego wartości.
		</p>
		
		$$
			\frac{2}{10}=0,2000000000…
		$$
		
		<p>
			Każdej liczbie o skończonym rozwinięciu dziesiętnym możemy urodzić (trochę na siłę) nieskończone rozwinięcie dziesiętne. 
		</p>

		<p>
			Niektóre ułamki zwykłe nie posiadają skończonego rozwinięcia. Zastanówmy się, jak zapisać ułamek dziesiętny równy $\frac{1}{3}$. 
			Szukamy takiego ułamka dziesiętnego, który pomnożony przez $3$ 
			ma wartość $1$. Pierwszą myślą jest $0,3$, jednak $3 \cdot \frac{3}{10} = \frac{9}{10}$, czyli trochę za mało. Lepszym pomysłem jest ułamek 
			$0,33$, wtedy $3 \cdot \frac{33}{100} = \frac{99}{100}$. Jeszcze bliżej dokładnej liczby będzie ułamek $0,333$ albo $0,3333$, jednak każdy z nich 
			jest za mały. Okazuje się, że dokładna wartość będzie miała po przecinku nieskończenie wiele trójek: $0,33333333333333...$
		</p>

		<center><img src="./.images//Screenshot_6.png" align="middle"></center>
		
		<p>
			Niektóre ułamki zwykłe mają mniej eleganckie rozwinięcia dziesiętne. Przykładowo
		</p>
		<ul>
			<li>$\frac{1}{6}=0,166666666666666666666666666666666666666666666…$</li>
			<li>$\frac{1}{7}=0,142857142857142857142857142857142857142857142…$</li>
			<li>$\frac{1}{11}=0,09090909090909090909090909090909090909090909…$</li>
			<li>$\frac{1}{23}=0,04347826086956521739130434782608695652173913…$</li>
			<li>$\frac{1}{36}=0,02777777777777777777777777777777777777777777…$</li>
		</ul>
		
		<p>
			W powyższych rozwinięciach zauważamy pewne tendencje. W rozwinięciu ułamka $\frac{1}{7}$
			powtarza się zbitek liczb $142857$. Taki powtarzający się fragment nieskończonego rozwinięcia dziesiętnego nazywamy <i>okresem dziesiętnym</i>. 
			Gdy uda nam się zauważyć okres w rozwinięciu, możemy zapisać ułamek w bardziej przejrzystej formie: 
		</p>
		
		$$
			\frac{1}{7}=0,(142857)
		$$
		
		<p>
			Co czytamy jako „zero i sto czterdzieści dwa tysiące osiemset pięćdziesiąt siedem milionowych w okresie”. Podobnie 
		</p>
		
		$$
			\frac{1}{36}=0,02(7)
		$$
		
		<p>
			Tu już nikt nie wie, jak się to czyta.
		</p>
		
		<p>
			Co ciekawe, każdy ułamek zwykły da się przedstawić w postaci skończonego ułamka dziesiętnego albo 
			nieskończonego posiadającego okres. O tym, w jaki sposób przeskakiwać z jednego zapisu do drugiego, powiemy za chwilę.
		</p>
		</lesson-chapter>

		<lesson-chapter id="operations-on-decimals"><template #title>Działania na ułamkach dziesiętnych</template>   
		<p class = "type">
			Warsztat
		</p>
		
		<p>
			Ponieważ ułamki dziesiętne stanowią płynne przedłużenie liczb naturalnych, działania na nich przebiegają bardzo podobnie 
			do tych, które poznaliśmy w tematach o dodawaniu, odejmowaniu, mnożeniu i dzieleniu.
		</p>
		
		<p>
			Dodawanie liczb dziesiętnych najlepiej wykonywać w słupku. Kandydatów do sumowania zapisujemy wyrównując do 
			przecinka – tak, aby odpowiadające sobie cyfry (dziesiątek, jedności, części dziesiętnych, części setnych) 
			znajdowały się jedna pod drugą. 
		</p>
		
        <columnar-operation-table :operation='"+"' :numbers='[[], ["3", "4", "2", ",", "6", "7", "", ""], ["", "1", "9", ",", "1", "5", "8", "2"],
			["", "", "", ",", "", "", "", ""]]'></columnar-operation-table> 
			
		<p>
			Procedura dodawania przebiega identycznie jak w przypadku liczb naturalnych.
		</p>
		
		<columnar-operation-table :operation='"+"' :numbers='[["", "1", "", "", "1", "", "", ""], ["3", "4", "2", ",", "6", "7", "", ""], 
			["", "1", "9", ",", "1", "5", "8", "2"], ["3", "6", "1", ",", "8", "2", "8", "2"]]'></columnar-operation-table> 

		<p>
			Tak samo działa odejmowanie w słupku – najpierw wyrównujemy odjemną i odjemnik względem przecinka.
		</p>
		
		<columnar-operation-table :operation='"-"' :numbers='[[], [], ["1", "4", "1", ",", "2", "1", "", ""], ["", "7", "4", ",", "1", "3", "6", "4"], ["", "", "", ",", "", "", "", ""]]'></columnar-operation-table> 
		
		<p>
			Jeśli odjemna i odjemnik mają różną ilość cyfr po przecinku, wypełniamy brakujące pola zerami.
		</p>
		
		<columnar-operation-table :operation='"-"' :numbers='[[], [], ["1", "4", "1", ",", "2", "1", "0", "0"], ["", "7", "4", ",", "1", "3", "6", "4"], ["", "", "", ",", "", "", "", ""]]'></columnar-operation-table> 

		<p>
			Odejmujemy liczby według znanej metody.
		</p>
		
		<columnar-operation-table :operation='"-"' :numbers='[["", "13", "", "", "", "10", "", ""], ["0", "/s: 3", "11", "", "1", "/s: 0", "9", "10"], 
			["/s: 1", "/s: 4", "/s: 1", ",", "/s: 2", "/s: 1", "/s: 0", "/s: 0"], ["", "7", "4", ",", "1", "3", "6", "4"], ["", "6", "7", ",", "0", "7", "3", "6"]]'></columnar-operation-table> 

		<p>
			Zanim przystąpimy do mnożenia i dzielenia ułamków dziesiętnych, zauważmy pewne własności. Gdy chcemy pomnożyć $53,243$ 
			przez $10$, otrzymamy:
		</p>
		
		$$
			53,243\cdot10=\frac{53243}{1000}\cdot10=\frac{53243}{100}=532,43
		$$
		
		<p>
			Okazuje się, że pomnożenie liczby dziesiętnej przez $10$ jest równoważne z przesunięciem przecinka o jedną pozycję w prawo. 
			W tym momencie cyfry dziesiątek stają się cyframi setek, cyfry jedności stają się cyframi dziesiątek, 
			cyfry części dziesiętnych stają się cyframi jedności itd., w rezultacie liczba zyskuje $10$ razy większą 
			wartość. Na tej samej zasadzie mnożenie przez $100$ jest równoważne przesunięciu przecinka o dwie pozycje w 
			prawo, mnożenie przez $1000$ oznacza przesunięcie przecinka o trzy miejsca itd.
		</p>
		
		<p>
			Podobnie, gdybyśmy chcieli podzielić $53,243$ przez $10$, mielibyśmy
		</p>
		
		$$
			53,243∶10=\frac{53243}{1000} :10=\frac{53243}{10000}=5,3243
		$$
		
		<p>
			Czyli dzielenie przez $10$ jest tym samym, co przesunięcie przecinka o jedną pozycję w lewo, dzielenie przez $100$ 
			jest przesunięciem przecinka o dwie pozycje w lewo itd.
		</p>
		
		<ul>
			<li>$45,292 \cdot 100 = 4529,2$</li>
			<li>$347 \cdot 10 = 347,0000 \cdot 10 = 3470,000 = 3470$</li>
			<li>$0,349 : 10 = 0,0349$</li>
			<li>$94 : 1000 = 94,0 : 1000 = 0,0940 = 0,094$</li>
		</ul>
		
		<p>
			Mając to na uwadze, spróbujmy pomnożyć dwie dowolne liczby dziesiętne. Przypuśćmy, że chcemy pomnożyć liczby $12,4$ 
			oraz $1,03$. Zauważmy, że 
		</p>
		
		$$
			12,4 \cdot1,03=\frac{124}{10}\cdot \frac{103}{100}=\frac{124\cdot103}{1000}
		$$
		
		<p>
			Oznacza to, że wynik takiego mnożenia będzie taki, jak wynik $124\cdot103$ z przecinkiem przesuniętym o trzy pozycje w lewo. 
			Mnożenie $124\cdot103$ wykonujemy standardową metodą
		</p>
		
		<columnar-operation-table :operation='""' :numbers='[["/c:", "/c:", "/c:", "/c:", "/c:", "/c:1", "/c:"], ["", "", "", "", "1", "2", "4"], ["/u:", "/u:", "/u:", "/u:", "/u:1", "/u:0", "/u:3"], ["", "", "", "", "3", "7", "2"], 
			["", "", "", "0", "0", "0", ""], ["/u:+", "/u:", "/u:1", "/u:2", "/u:4", "/u:", "/u:"], ["", "", "1", "2", "7", "7", "2"]]'></columnar-operation-table> 
		
		<p>
			Mamy więc $12,4 \cdot 1,03 = 12,772$. Ogólnie, aby obliczyć iloczyn liczb z przecinkiem, mnożymy je bez przecinka, a potem 
			wstawiamy przecinek w odpowiednim miejscu: wynik powinien mieć tyle cyfr po przecinku, co pierwsza i druga łącznie.
		</p>

		<p>
			Dzielenie liczb dziesiętnych jest już bardziej wyczynowym sportem. Weźmy dla przykładu $37,58 : 1,6$. Na początek 
			wygodnie jest pozbyć się przecinka z dzielnika i „przerzucić go” do dzielnej:
		</p>
		
		$$
			37,58∶1,6=\frac{3758}{100} ∶  \frac{16}{10}=\frac{3758}{100} \cdot \frac{10}{16}=\frac{3758}{10} \cdot \frac{1}{16}=\frac{3758}{10} :16=375,8∶16
		$$
		
		<p>
			W ogólności przesuwamy przecinek dzielnej o tyle pozycji w prawo, ile cyfr po przecinku ma dzielnik. 
			Przygotowujemy się do dzielenia pisemnego:
		</p>
		
		<columnar-operation-table :operation='""' :numbers='[["/u:", "/u:", "/u:", "/u:,", "/u:", "/u:", "/u:", "/u:"], ["3", "7", "5", ",", "8", ":", "1", "6"]]'></columnar-operation-table> 

		<p>
			W $37$ liczba $16$ mieści się dwa razy, zapisujemy więc dwójkę i odejmujemy $32$, 
			dopisujemy kolejną cyfrę.
		</p>
		
		<columnar-operation-table :operation='""' :numbers='[["/u:", "/u:", "/u:", "/u:2", "/u:", "/u:,", "/u:", "/u:", "/u:", "/u:"], ["", "", "3", "7", "5", ",", "8", ":", "1", "6"], 
			["/u:-", "/u:", "/u:3", "/u:2", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:"], ["", "", "", "5", "5", "", "", "", "", ""]]'></columnar-operation-table> 

		<p>
			W liczbie $55$ szesnastka mieści się $3$ razy – zapisujemy $3$, odejmujemy 
			$48$ i spisujemy kolejną cyfrę – tym razem już zza przecinka:
		</p>
		
		<columnar-operation-table :operation='""' :numbers='[["/u:", "/u:", "/u:", "/u:2", "/u:3", "/u:,", "/u:", "/u:", "/u:", "/u:"], ["", "", "3", "7", "5", ",", "8", ":", "1", "6"], 
			["/u:-", "/u:", "/u:3", "/u:2", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:"], ["", "", "", "5", "5", "", "", "", "", ""], ["/u:-", "/u:", "/u:", "/u:4", "/u:8", "/u:", "/u:", "/u:", "/u:", "/u:"], 
			["", "", "", "", "7", "8", "", "", "", ""]]'></columnar-operation-table> 	

		<p>
			W liczbie $78$ liczba $16$ mieści się $4$ razy – zapisujemy $4$ 
			i odejmujemy $64$. W dzielnej nie ma już cyfr do spisania, 
			jednak jej rozwinięcie dziesiętne możemy przedłużać o dowolną ilość zer. Spisujemy więc cyfrę $0$ i kontynuujemy:
		</p>
		
		<columnar-operation-table :operation='""' :numbers='[["/u:", "/u:", "/u:", "/u:2", "/u:3", "/u:,", "/u:4", "/u:", "/u:", "/u:"], ["", "", "3", "7", "5", ",", "8", ":", "1", "6"], 
			["/u:-", "/u:", "/u:3", "/u:2", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:"], ["", "", "", "5", "5", "", "", "", "", ""], ["/u:-", "/u:", "/u:", "/u:4", "/u:8", "/u:", "/u:", "/u:", "/u:", "/u:"], 
			["", "", "", "", "7", "8", "", "", "", ""], ["/u:-", "/u:", "/u:", "/u:", "/u:6", "/u:4", "/u:", "/u:", "/u:", "/u:"], ["", "", "", "", "1", "4", "0", "", "", ""]]'></columnar-operation-table> 

		<p>
			Kontynuujemy procedurę, za każdym razem spisując zero. W końcu docieramy do momentu, gdy wynik odejmowania jest zerem. 
			Dalsze dzielenie nie ma już sensu, więc przerywamy i odczytujemy wynik: $37,58 : 1,6 = 23,4875$. 
		</p>
		
		<columnar-operation-table :operation='""' :numbers='[["/u:", "/u:", "/u:", "/u:2", "/u:3", "/u:,", "/u:4", "/u:8", "/u:7", "/u:5"], ["", "", "3", "7", "5", ",", "8", ":", "1", "6"], 
			["/u:-", "/u:", "/u:3", "/u:2", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:"], ["", "", "", "5", "5", "", "", "", "", ""], ["/u:-", "/u:", "/u:", "/u:4", "/u:8", "/u:", "/u:", "/u:", "/u:", "/u:"], 
			["", "", "", "", "7", "8", "", "", "", ""], ["/u:-", "/u:", "/u:", "/u:", "/u:6", "/u:4", "/u:", "/u:", "/u:", "/u:"], ["", "", "", "", "1", "4", "0", "", "", ""], ["/u:-", "/u:", "/u:", "/u:", "/u:1", "/u:2", "/u:8", "/u:", "/u:", "/u:"], 
			["", "", "", "", "", "1", "2", "0", "", ""], ["/u:-", "/u:", "/u:", "/u:", "/u:", "/u:1", "/u:1", "/u:2", "/u:", "/u:"], ["", "", "", "", "", "", "", "8", "0", ""], ["/u:-", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:8", "/u:0", "/u:"], 
			["", "", "", "", "", "", "", "", "0", ""]]'></columnar-operation-table> 

		<p>
			Nie zawsze będziemy mieć tyle szczęścia, by tak jak przed chwilą dotrzeć do jawnego końca tych żmudnych robótek. 
			Czasami wynik jest liczbą o nieskończonym rozwinięciu dziesiętnym. Zastanówmy się nad działaniem $1 : 7$. Do tej 
			pory posługiwaliśmy się pojęciem reszty z dzielenia, ale nie jesteśmy już dziećmi – mamy przecież ułamki. W 
			jaki sposób odkryć rozwinięcie dziesiętne ułamka $\frac{1}{7}$ ? Spróbujmy dokonać dzielenia pisemnego:
		</p>
		
		<columnar-operation-table :operation='""' :numbers='[["/u:", "/u:", "/u:"], ["1", ":", "7"]]'></columnar-operation-table> 

		<p>
			Trochę nie wiadomo, jak się za to zabrać – nie zaszkodzi wzbogacić jedynki o zapasowe zero
		</p>
		
		<columnar-operation-table :operation='""' :numbers='[["/u:", "/u:,", "/u:", "/u:", "/u:"], ["1", ",", "0", ":", "7"]]'></columnar-operation-table> 

		<p>
			Teraz możemy już dokonać dzieła: w samej jedynce siódemka się nie mieści, więc w wyniku przed przecinkiem będzie 
			widniało $0$.
		</p>
		
		<columnar-operation-table :operation='""' :numbers='[["/u:0", "/u:,", "/u:", "/u:", "/u:"], ["1", ",", "0", ":", "7"]]'></columnar-operation-table> 

		<p>
			W $10$ siódemka mieści się raz – zapisujemy $1$, odejmujemy $7$ i spisujemy kolejne 
			$0$.
		</p>
		
		<columnar-operation-table :operation='""' :numbers='[["/u:", "/u:", "/u:0", "/u:,", "/u:1", "/u:", "/u:"], ["", "", "1", ",", "0", ":", "7"], ["/u:-", "/u:", "/u:", "/u:", "/u:7", "/u:", "/u:"], ["", "", "", "", "3", "0", ""]]'></columnar-operation-table> 
		
		<p>
			Kontynuujemy procedurę:
		</p>
		
		<columnar-operation-table :operation='""' :numbers='[["/u:", "/u:", "/u:0", "/u:,", "/u:1", "/u:4", "/u:2", "/u:8", "/u:5", "/u:7", "/u:"], ["", "", "1", ",", "0", ":", "7", "", "", "", ""], ["/u:-", "/u:", "/u:", "/u:", "/u:7", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:"], 
			["", "", "", "", "3", "0", "", "", "", "", ""], ["/u:-", "/u:", "/u:", "/u:", "/u:2", "/u:8", "/u:", "/u:", "/u:", "/u:", "/u:"], ["", "", "", "", "", "2", "0", "", "", "", ""], 
			["/u:-", "/u:", "/u:", "/u:", "/u:", "/u:1", "/u:4", "/u:", "/u:", "/u:", "/u:"], ["", "", "", "", "", "", "6", "0", "", "", ""], ["/u:-", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:5", "/u:6", "/u:", "/u:", "/u:"], 
			["", "", "", "", "", "", "", "4", "0", "", ""], ["/u:-", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:3", "/u:5", "/u:", "/u:"], ["", "", "", "", "", "", "", "", "5", "0", ""], 
			["/u:-", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:4", "/u:9", "/u:"], ["", "", "", "", "", "", "", "", "", "1", "0"]]'></columnar-operation-table> 
		
		<p>
			W tym momencie zauważamy, że zatoczyliśmy koło: w tej chwili mamy do podzielenia $10$ przez $7$ i jest to dokładnie 
			ta sama czynność, jakiej dokonaliśmy na samym początku słupka. Łatwo przewidzieć, że wszystkie kolejne kroki 
			przebiegałyby w ten sam sposób i zwracałyby te same wyniki:
		</p>
		
		<columnar-operation-table :operation='""' :numbers='[["/u:", "/u:", "/u:0", "/u:,", "/u:1", "/u:4", "/u:2", "/u:8", "/u:5", "/u:7", "/u:1", "/u:4", "/u:2", "/u:8", "/u:5", "/u:7", "/u:"], ["", "", "1", ",", "0", ":", "7", "", "", "", "", "", "", "", "", "", ""], 
			["/u:-", "/u:", "/u:", "/u:", "/u:7", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:"], ["", "", "", "", "3", "0", "", "", "", "", "", "", "", "", "", "", ""], 
			["/u:-", "/u:", "/u:", "/u:", "/u:2", "/u:8", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:"], ["", "", "", "", "", "2", "0", "", "", "", "", "", "", "", "", "", ""], 
			["/u:-", "/u:", "/u:", "/u:", "/u:", "/u:1", "/u:4", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:"], ["", "", "", "", "", "", "6", "0", "", "", "", "", "", "", "", "", ""], 
			["/u:-", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:5", "/u:6", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:"], ["", "", "", "", "", "", "", "4", "0", "", "", "", "", "", "", "", ""], 
			["/u:-", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:3", "/u:5", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:"], ["", "", "", "", "", "", "", "", "5", "0", "", "", "", "", "", "", ""], 
			["/u:-", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:4", "/u:9", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:"], ["", "", "", "", "", "", "", "", "", "1", "0", "", "", "", "", "", ""],
			["/u:-", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:7", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:"], ["", "", "", "", "", "", "", "", "", "", "3", "0", "", "", "", "", ""],
			["/u:-", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:2", "/u:8", "/u:", "/u:", "/u:", "/u:", "/u:"], ["", "", "", "", "", "", "", "", "", "", "", "2", "0", "", "", "", ""],
			["/u:-", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:1", "/u:4", "/u:", "/u:", "/u:", "/u:"], ["", "", "", "", "", "", "", "", "", "", "", "", "6", "0", "", "", ""],
			["/u:-", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:5", "/u:6", "/u:", "/u:", "/u:"], ["", "", "", "", "", "", "", "", "", "", "", "", "", "4", "0", "", ""],
			["/u:-", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:3", "/u:5", "/u:", "/u:"], ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "5", "0", ""],
			["/u:-", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:4", "/u:9", "/u:"], ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "1", "0"]]'></columnar-operation-table> 

		<p>
			Nie ma sensu przedłużanie tej męki – zapisujemy wynik jako okresowy i kończymy robotę: 
		</p>
		
		$$
			1 : 7 = 0,(142857)
		$$

		<columnar-operation :operation="'all'" :floats="true"></columnar-operation>

		</lesson-chapter>

		<lesson-chapter id="conversion-of-decimals-to-fractions"><template #title>Zamiana ułamków dziesiętnych na zwykłe</template>  
	
		<p class = "type">
			Warsztat | Rozszerzenie
		</p>
		
		<p class="warning">
			wymagana znajomość tematu: Równania
		</p>

		<p>
			Za pomocą dzielenia pisemnego umiemy już konwertować ułamki zwykłe na dziesiętne. A w drugą stronę?
		</p>
		
		<p>
			Z przypadkami ułamków skończonych potrafimy sobie radzić – wystarczy stworzyć mianownik mający jedynkę i odpowiednią 
			ilość zer.
		</p>
		
		<ul>
			<li>$0,347=  \frac{347}{1000}$</li>
			<li>$43,25=\frac{4325}{100}=\frac{173}{4}$</li>
			<li>$0,0000005=\frac{5}{10000000}=\frac{1}{2000000}$</li>
		</ul>

		<p>
			Sprawa nieco się komplikuje, gdy mamy do czynienia z okresami. Spróbujmy dowiedzieć się prawdy o liczbie $0,(259)$. 
			Oznaczmy tymczasowo
		</p>
		
		$$
			0,(259)=x
		$$
		
		<p>
			Trik polega na tym, by pomnożyć równanie obustronnie przez $1000$ (jedynkę i trzy zera – bo tyle cyfr ma okres). 
			Pomnożenie $0,(259)$ przez $1000$ oznacza przesunięcie przecinka o trzy pozycje w prawo, a więc liczba 
			$0,259259259259…$ stanie się liczbą $259,259259259…$ Mamy:
		</p>
		
		$$
			259,(259)=1000x
		$$
		
		<p>
			Wszystko staje się jasne, gdy odejmiemy dwa powyższe równania stronami:
		</p>
		
		$$
			259,(259)-0,(259)=1000x-x
		$$
		
		$$
			259=999x
		$$
		
		$$
			x=\frac{259}{999}
		$$
		
		<p>
			Tajemnica rozwiązana: $0,(259)=\frac{259}{999}=\frac{7}{27}$. Analizując powyższą metodę, możemy przewidzieć, że
		</p>
		
		<ul>
			<li>$0,(132)=\frac{132}{999}=\frac{44}{333}$</li>
			<li>$4,(15)=4 \frac{15}{99}=4 \frac{5}{33}=\frac{137}{33}$</li>
			<li>$43,(5)=43 \frac{5}{9}=\frac{392}{9}$</li>
			<li>$0,(0045)=\frac{45}{9999}=\frac{5}{1111}$</li>
		</ul>
			
		<p>
			Jeśli okres rozpoczyna się zaraz po przecinku, wystarczy stworzyć ułamek o liczniku równym okresowi i mianowniku 
			złożonym z tylu dziewiątek, ile cyfr ma okres. A co jeśli okres nie zaczyna się zaraz po przecinku? 
			Nie dajmy się ogarnąć bezradności:
		</p>
		
		<ul>
			<li>$0,0(34)=0,(34) :10=  \frac{34}{99} :10=\frac{34}{990}=\frac{17}{495}$</li>
			<li>$1,1(6)=11,(6) :10=11 \frac{6}{9}:10=\frac{35}{3}:10=\frac{35}{30}=\frac{7}{6}$</li>
			<li>$3,355(1)=78355,(1) ∶1000=78355 \frac{1}{9} :1000=\frac{705196}{9000}=\frac{176299}{2250}$</li>
		</ul>
			
		<p>
			Przy okazji natrafiliśmy na dość kontrowersyjną równość, mianowicie
		</p>
		
		$$
			0,(9)=\frac{9}{9}=1
		$$
		
		<p>
			Liczba $0,(9)=0,99999999999999999999999999999999999…$ naprawdę bardzo chce być jedynką. Chce być jedynką tak bardzo, 
			że matematyka dała jej na to przyzwolenie. Mogłoby się wydawać, że $0,(9)$ jest jakby mniejsze niż jeden. Ale 
			jeśli jest mniejsze, to o ile? Mniejsze o „nieskończenie małą” liczbę. Nieskończenie małą, czyli zerową…
		<p>
		
		<p>
			W przypływie geniuszu niektórych mogłoby olśnić, że 
		</p>
		
		$$
			1-0,(9)=0,(0)1
		$$
		
		<p>
			Aby uniknąć upokorzenia na scenie matematycznej, nie zapominajmy, że coś takiego jak $0,(0)1$ nie istnieje. 
			Ubranie zera w okresowy nawias oznacza, że zero będzie się ciągnąć w <b>nieskończoność</b>. Nie można więc powiedzieć, 
			że na <b>końcu</b> będzie jedynka.
		</p>
		</lesson-chapter>

	</lesson>
</template>

<script>
import LessonTitle from "../../../lesson/LessonTitle";
import LessonIntro from "../../../lesson/LessonIntro";
import LessonChapter from "../../../lesson/chapter/LessonChapter";
import Lesson from "../../../lesson/Lesson.vue";
import ColumnarOperationTable from "../../../utils/columnar_operation_table/ColumnarOperationTable";
import ColumnarOperation from "../../../utils/columnar_operation/ColumnarOperation";

export default {
	name: "UlamkiDziesietne",
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
		ColumnarOperationTable,
		ColumnarOperation
	}
};
</script>

<style scoped>
</style>
