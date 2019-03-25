<template>
  <lesson>
    <lesson-title>Dzielenie</lesson-title>

    <lesson-intro>
    <p>
        Idzie nam całkiem nieźle. Dzielenie jest ostatnim z czterech podstawowych działań matematyki. Brzmi dumnie. 
        Matematyczna idea dzielenia nieco trąci socjalizmem, zakłada bowiem, że należy wszystkim dawać po równo.
    </p>
    </lesson-intro>

    <lesson-chapter><template #title>Ciocia i jej cukierki</template>
    <p class = "type"> 
        Intuicje
    </p>
      
    <p>
        Dana jest ciocia. Ciocia ma czterech siostrzeńców: Maciusia, Michasia, Krzysia i Onufrego oraz paczkę dwudziestu 
        cukierków, które przytachała z wyjazdu do Zimbabwe. 
    </p>
      
    <p style="text-align: center">
        <svg height="200" width="800">
			<defs>
				<linearGradient id="gradient">
					<stop offset="20%" stop-color="#C33" />
					<stop offset="90%" stop-color="#833" />
				</linearGradient>
			</defs>
			<circle cx="120" cy="110" r="20" class = "draggable"></circle>
			<circle cx="370" cy="80" r="20" class = "draggable"></circle>
			<circle cx="510" cy="100" r="20" class = "draggable"></circle>
			<circle cx="400" cy="40" r="20" class = "draggable"></circle>
			<circle cx="280" cy="180" r="20" class = "draggable"></circle>
			<circle cx="680" cy="120" r="20" class = "draggable"></circle>
			<circle cx="630" cy="70" r="20" class = "draggable"></circle>
			<circle cx="570" cy="20" r="20" class = "draggable"></circle>
			<circle cx="320" cy="160" r="20" class = "draggable"></circle>
			<circle cx="410" cy="130" r="20" class = "draggable"></circle>
			<circle cx="580" cy="160" r="20" class = "draggable"></circle>
			<circle cx="690" cy="70" r="20" class = "draggable"></circle>
			<circle cx="120" cy="40" r="20" class = "draggable"></circle>
			<circle cx="250" cy="60" r="20" class = "draggable"></circle>
			<circle cx="310" cy="100" r="20" class = "draggable"></circle>
			<circle cx="250" cy="140" r="20" class = "draggable"></circle>
			<circle cx="510" cy="150" r="20" class = "draggable"></circle>
			<circle cx="340" cy="30" r="20" class = "draggable"></circle>
			<circle cx="710" cy="150" r="20" class = "draggable"></circle>
			<circle cx="160" cy="120" r="20" class = "draggable"></circle>
        </svg>
    </p> 
      
    <p>
        Po entuzjastycznym przywitaniu ciocia zaczyna częstować cukierkami: Maciuś dostał $6$ cukierków, Michaś dostał 
        $6$ cukierków, Krzyś dostał $6$ cukierków, a Onufry dostał $2$ cukierki.
    </p>
      
	<table class="center">
		<tr style="text-align: center"><td>Maciuś</td><td>Michaś</td><td>Krzyś</td><td>Onufry</td></tr>
		<tr>
			<td>
				<svg height="180" width="150">
					<circle cx="51" cy="30" r="20" class = "draggable"></circle>
					<circle cx="109" cy="32" r="20" class = "draggable"></circle>
					<circle cx="56" cy="94" r="20" class = "draggable"></circle>
					<circle cx="107" cy="91" r="20" class = "draggable"></circle>
					<circle cx="54" cy="147" r="20" class = "draggable"></circle>
					<circle cx="108" cy="143" r="20" class = "draggable"></circle>
				</svg>
			</td>
			<td>
				<svg height="180" width="150">
					<circle cx="53" cy="30" r="20" class = "draggable"></circle>
					<circle cx="108" cy="32" r="20" class = "draggable"></circle>
					<circle cx="51" cy="94" r="20" class = "draggable"></circle>
					<circle cx="105" cy="91" r="20" class = "draggable"></circle>
					<circle cx="53" cy="147" r="20" class = "draggable"></circle>
					<circle cx="104" cy="143" r="20" class = "draggable"></circle>
				</svg>
			</td>
			<td>
				<svg height="180" width="150">
					<circle cx="52" cy="30" r="20" class = "draggable"></circle>
					<circle cx="104" cy="32" r="20" class = "draggable"></circle>
					<circle cx="56" cy="94" r="20" class = "draggable"></circle>
					<circle cx="103" cy="91" r="20" class = "draggable"></circle>
					<circle cx="51" cy="147" r="20" class = "draggable"></circle>
					<circle cx="104" cy="143" r="20" class = "draggable"></circle>
				</svg>
			</td>
			<td>
				<svg height="180" width="150">
					<circle cx="51" cy="30" r="20" class = "draggable"></circle>
					<circle cx="109" cy="32" r="20" class = "draggable"></circle>
				</svg>
			</td>
		</tr>
	</table>
      
    <p>
        Pytanie brzmi: dlaczego Onufremu jest smutno? Pomijając fakt, że może martwić się swoim imieniem, ma prawo 
        poczuć się ofiarą niesprawiedliwości ze strony cioci. Można było przecież rozdać cukierki inaczej - każdy mógł 
        dostać $5$ cukierków.
    </p>
      
	<table class="center">
		<tr style="text-align: center"><td>Maciuś</td><td>Michaś</td><td>Krzyś</td><td>Onufry</td></tr>
		<tr>
			<td>
				<svg height="180" width="150">
					<circle cx="51" cy="30" r="20" class = "draggable"></circle>
					<circle cx="109" cy="32" r="20" class = "draggable"></circle>
					<circle cx="56" cy="94" r="20" class = "draggable"></circle>
					<circle cx="107" cy="91" r="20" class = "draggable"></circle>
					<circle cx="76" cy="147" r="20" class = "draggable"></circle>
				</svg>
			</td>
			<td>
				<svg height="180" width="150">
					<circle cx="51" cy="31" r="20" class = "draggable"></circle>
					<circle cx="109" cy="33" r="20" class = "draggable"></circle>
					<circle cx="56" cy="92" r="20" class = "draggable"></circle>
					<circle cx="107" cy="93" r="20" class = "draggable"></circle>
					<circle cx="76" cy="144" r="20" class = "draggable"></circle>
				</svg>
			</td>
			<td>
				<svg height="180" width="150">
					<circle cx="51" cy="33" r="20" class = "draggable"></circle>
					<circle cx="109" cy="31" r="20" class = "draggable"></circle>
					<circle cx="56" cy="95" r="20" class = "draggable"></circle>
					<circle cx="107" cy="93" r="20" class = "draggable"></circle>
					<circle cx="76" cy="143" r="20" class = "draggable"></circle>
				</svg>
			</td>
			<td>
				<svg height="180" width="150">
					<circle cx="51" cy="30" r="20" class = "draggable"></circle>
					<circle cx="109" cy="31" r="20" class = "draggable"></circle>
					<circle cx="56" cy="92" r="20" class = "draggable"></circle>
					<circle cx="107" cy="93" r="20" class = "draggable"></circle>
					<circle cx="76" cy="141" r="20" class = "draggable"></circle>
				</svg>
			</td>
		</tr>
	</table>
      
    <p>
		I wszyscy byliby szczęśliwi. Niestety, Onufry ma w życiu ciężko.
		Rozdawanie cukierków tak, by każdy dostał tyle samo, oddaje istotę dzielenia. Podzielenie $20$ cukierków na $4$ równe 
        grupy daje $5$ cukierków na każdą grupę. Matematyk ujmie to tak:
    </p>
      
    $$
        20 : 4 = 5
    $$
      
    <p>
        Symbol : czytamy jako „podzielić na”, ewentualnie „dzielone przez”. Oznacza on, że jedną liczbę chcemy rozłożyć na 
        kilka mniejszych liczb; po jego lewej stronie występuje liczba, którą chcemy rozdzielić, a po prawej stronie jest 
        informacja, na ile równych grup będziemy rozkładać. Jeżeli ktoś ma przeciwwskazania wobec używania dwukropka, może też 
        stosować zapis
    </p>
      
    <p style="text-align: center">
        $20 \text{ / } 4 = 5$<br>
        lub<br>
        $20 ÷ 4 = 5$<br>
    </p>
      
    <p>
        <span class="comment" id="Jeśli nie pałasz sympatią do kamieni, weź stertę cukierków, kulek, owiec albo apostołów.">Weźmy stertę $12$ kamieni.</span> 
		Wychodzimy z szalonym pomysłem, by dzielić tę stertę na mniejsze grupki.
    </p>
      
	<div class="example">
		Dzieląc $12$ kamieni na $2$ równe grupy, dostajemy $6$ kamieni w grupie.
		<p style="text-align: center">$12 : 2 = 6$<br>
			<table class="center">
				<tr>
					<td>
						<svg height="150" width="200">
							<circle cx="51" cy="50" r="20" class = "draggable"></circle>
							<circle cx="53" cy="102" r="20" class = "draggable"></circle>
							<circle cx="106" cy="52" r="20" class = "draggable"></circle>
							<circle cx="107" cy="101" r="20" class = "draggable"></circle>
							<circle cx="166" cy="53" r="20" class = "draggable"></circle>
							<circle cx="165" cy="104" r="20" class = "draggable"></circle>
						</svg>
					</td>
					<td>
						<svg height="150" width="200">
							<circle cx="51" cy="50" r="20" class = "draggable"></circle>
							<circle cx="53" cy="102" r="20" class = "draggable"></circle>
							<circle cx="106" cy="52" r="20" class = "draggable"></circle>
							<circle cx="107" cy="101" r="20" class = "draggable"></circle>
							<circle cx="166" cy="53" r="20" class = "draggable"></circle>
							<circle cx="165" cy="104" r="20" class = "draggable"></circle>
						</svg>
					</td>
				</tr>
			</table>
		</p>
	</div>

	<div class="example">
		Dzieląc $12$ kamieni na $3$ równe grupy, dostajemy $4$ kamienie w grupie.
		<p style="text-align: center">$12 : 3 = 4$<br>
			<table class="center">
				<tr>
					<td>
						<svg height="150" width="150">
							<circle cx="51" cy="50" r="20" class = "draggable"></circle>
							<circle cx="53" cy="102" r="20" class = "draggable"></circle>
							<circle cx="106" cy="52" r="20" class = "draggable"></circle>
							<circle cx="107" cy="101" r="20" class = "draggable"></circle>
						</svg>
					</td>
					<td>
						<svg height="150" width="150">
							<circle cx="51" cy="50" r="20" class = "draggable"></circle>
							<circle cx="53" cy="102" r="20" class = "draggable"></circle>
							<circle cx="106" cy="52" r="20" class = "draggable"></circle>
							<circle cx="107" cy="101" r="20" class = "draggable"></circle>
						</svg>
					</td>
					<td>
						<svg height="150" width="150">
							<circle cx="51" cy="50" r="20" class = "draggable"></circle>
							<circle cx="53" cy="102" r="20" class = "draggable"></circle>
							<circle cx="106" cy="52" r="20" class = "draggable"></circle>
							<circle cx="107" cy="101" r="20" class = "draggable"></circle>
						</svg>
					</td>
				</tr>
			</table>
		</p>
	</div>

	<div class="example">
		Dzieląc $12$ kamieni na $4$ równe grupy, dostajemy $3$ kamienie w grupie.
		<p style="text-align: center">$12 : 4 = 3$<br>
			<table class="center">
				<tr>
					<td>
						<svg height="150" width="150">
							<circle cx="51" cy="50" r="20" class = "draggable"></circle>
							<circle cx="103" cy="52" r="20" class = "draggable"></circle>
							<circle cx="77" cy="102" r="20" class = "draggable"></circle>
						</svg>
					</td>
					<td>
						<svg height="150" width="150">
							<circle cx="51" cy="50" r="20" class = "draggable"></circle>
							<circle cx="103" cy="52" r="20" class = "draggable"></circle>
							<circle cx="77" cy="102" r="20" class = "draggable"></circle>
						</svg>
					</td>
					<td>
						<svg height="150" width="150">
							<circle cx="51" cy="50" r="20" class = "draggable"></circle>
							<circle cx="103" cy="52" r="20" class = "draggable"></circle>
							<circle cx="77" cy="102" r="20" class = "draggable"></circle>
						</svg>
					</td>
					<td>
						<svg height="150" width="150">
							<circle cx="51" cy="50" r="20" class = "draggable"></circle>
							<circle cx="103" cy="52" r="20" class = "draggable"></circle>
							<circle cx="77" cy="102" r="20" class = "draggable"></circle>
						</svg>
					</td>
				</tr>
			</table>
		</p>
	</div>
      
    <p>
        Umiejętność dzielenia bywa bardzo przydatna:
    </p>
      
	<div class="example">
		<span class="comment" id="Jak Pan Bóg przykazał.">Pan Janusz ma $2$ jajka</span> i chce z nich przyrządzić $2$ omlety. 
		W takim razie musi zużyć jedno jajko na jeden omlet.
		$$2 : 2 = 1$$
	</div>

	<div class="example">
		Stefan przygotował $30 \text{ zł}$ na wydatki w <span class="comment" id="czekolady">pijalni</span>. Pojedyncza degustacja 
		kosztuje $6 \text{ zł}$. W takim razie Stefan może 
		cieszyć się degustacją $5$ razy.
		$$30 : 6 = 5$$
	</div>

	<div class="example">
		Biegacz przebył $5$ okrążeń boiska w ciągu godziny (czyli $60$ minut). Jeśli biegł w równym tempie, przebiegał jedno okrążenie w 
		ciągu $12$ minut
		$$60 : 5 = 12$$
	</div>

	<div class="example">
		Babcia Teresa ma w planie ulepić na wigilię $75$ pierogów i $120$ uszek. Na kolację przyjdzie $15$ osób. Każda dostanie $5$ 
		pierogów i $8$ uszek.
		$$75 : 15 = 5\\
		120 : 15 = 8$$
	</div>

	<div class="example">
		Babcia Teresa przymierza się do szykowania $120$ uszek wigilijnych. Zastanawia się, ile czasu musi sobie zagospodarować, jeśli
		przygotowanie jednego uszka zajmuje jej $20$ sekund. $20 \cdot 120 = 2400$, czyli cała praca zajmie $2400$ sekund. Jedna minuta to $60$ sekund,
		a więc w puli $2400$ sekund mieści się $40$ minut -tyle czasu potrzeba na przygotowanie uszek.
		$$2400 : 60 = 40$$
	</div>
	</lesson-chapter>

    <lesson-chapter><template #title>Nazewnictwo</template>
    <p class = "type">
        Intuicje
    </p>
      
    <p>
        Liczbę, którą dzielimy (po lewej znaku $:$ ), nazywamy <i>dzielną</i>. Liczbę, przez którą dzielimy (po prawej znaku $:$ ), 
        nazywamy <i>dzielnikiem</i>. Wynik dzielenia to <i>iloraz</i>.
    </p>
        
    $$
        \text{dzielna} : \text{dzielnik} = \text{iloraz}
    $$
      
    <p>
        Widzimy tu pewne podobieństwo do formułki odejmowania, w której najpierw występowała odjemna, a potem odjemnik. 
        Jak widać, nawet w matematyce kobiety mają pierwszeństwo.
    </p>
      
    <ul>
        <li>W działaniu $16 : 2 = 8$ dzielną jest $16$, dzielnikiem $2$, a wynikiem (ilorazem) $8$.</li>
        <li>W działaniu $9 : 3 = 3$ dzielną jest $9$, dzielnikiem $3$, a wynikiem (ilorazem) $3$.</li>
        <li>W działaniu $7 = 14 : 2$ dzielną jest $14$, dzielnikiem $2$, a wynikiem (ilorazem) $7$.</li>
    </ul>
    </lesson-chapter>

    <lesson-chapter><template #title>Dzielenie jako odwrotność mnożenia</template>
    <p class = "type">
        Intuicje
    </p>
      
    <p>
        Wróćmy do rozkładania $12$ kamieni na grupy. Za każdym razem po pogrupowaniu kamieni możemy stwierdzić, że 
        wszystkie razem dają wyjściowe $12$ kamieni.
    </p>
      
	<div class="example">
		$12 : 2 = 6$<br>
		Z drugiej strony $6 + 6 = 12$ lub inaczej $2 \cdot 6 = 12$
	</div>

	<div class="example">
		$12 : 3 = 4$<br>
		Jednocześnie $4 + 4 + 4 = 12$, czyli $3 \cdot 4 = 12$
	</div>

	<div class="example">
		$12 : 4 = 3$<br>
		Przy okazji $3 + 3 + 3 + 3 = 12$, więc $4 \cdot 3 = 12$
	</div>
      
    <p> 
        Dzielenie jest odwrotne do mnożenia. Gdy chcemy poznać wynik dzielenia, np. $28 : 7$, możemy zadać sobie pytanie: 
        przez co należy pomnożyć $7$, aby otrzymać $28$? Stwierdzimy, że odpowiedzią jest $4$. 
        <!--Mam dylemat: przemienność oznaczyłem jako temat rozszerzony, a tu pojawia się normalnie-->
        Z przemienności mnożenia wynika ponadto ciekawa zależność. Skoro 
    </p>
      
    <p style="text-align: center">
        $7 \cdot 8 = 56$   oraz   $8 \cdot 7 = 56$, <br>
        to<br>
        $56 : 7 = 8$    oraz   $56 : 8 = 7$<br>
    </p>
      
    <p>
        Tak samo będzie dla dowolnych dwóch liczb.
    </p>
	</lesson-chapter>

    <lesson-chapter><template #title>Dzielenie przez zero</template>
    <p class = "type">
        Intuicje
    </p>
      
    <p>
        Po powrocie z Seulu ciocia przywiozła tyle cukierków, że Maciuś, Michaś, Krzyś i Onufry nie byli w stanie ich zjeść. 
        Każdy z nich postanowił rozdać $18$ cukierków pomiędzy swoich przyjaciół.
    </p>
      
    <ul>
        <li>Maciuś ma trzech przyjaciół, więc każdy z nich dostał $6$ cukierków.</li>
        <li>Michaś ma dwóch przyjaciół, więc każdy z nich dostał $9$ cukierków.</li>
        <li>Krzyś ma jednego przyjaciela, więc oddał mu wszystkie $18$ cukierków.</li>
        <li>Onufry nie ma przyjaciół. W takim razie…</li>
    </ul>
      
    <p>
        <span class="comment" id="Nie martw się. Onufry ma więcej problemów.">mamy problem…</span> Ile cukierków powinien dostać każdy z jego przyjaciół, jeśli nie ma przyjaciół? Nie ma osoby, 
        której można by te cukierki podarować. W takim razie nie ma nawet mowy o dzieleniu. Gdybyśmy napisali 
    </p>
      
    $$
        18 : 0
    $$
      
    <p>
        to popełnilibyśmy <span class="comment" id="Naprawdę śmiertelny. Nawet nie próbuj.">śmiertelny grzech matematyczny</span>. 
		  Wreszcie przyłapaliśmy matematykę na czymś, czego nie 
        potrafi - matematyka nie daje sposobu, żeby podzielić przez $0$. Jest to dosłownie niemożliwe.
    </p>
      
    <p>
		Ma to nawet sens uwzględniając, że dzielenie jest odwrotne do mnożenia. Nie możemy znaleźć liczby, która pomnożona przez $0$ daje $18$. 
		Iloczyn zera i dowolnej liczby zawsze wynosi $0$.
    </p>
      
    <ul>
        <li>$18 : 3 = 6$, ponieważ $3 \cdot 6 = 18$.</li>
        <li>$18 : 2 = 9$, ponieważ $2 \cdot 9 = 18$.</li>
        <li>$18 : 1 = 18$, ponieważ $1 \cdot 18 = 18$.</li>
        <li>$18 : 0$ nie ma wartości, ponieważ $0 \cdot {\bf \text{cokolwiek}} = 0$.</li>
    </ul>
      
    <p>
        Dzielenia przez $0$ należy unikać jak ognia. Prawdopodobnie jeszcze nie raz się sparzysz.
    </p>
	</lesson-chapter>

    <lesson-chapter><template #title>Dzielenie z resztą</template>
    <p class = "type">
        Intuicje
    </p>
      
    <p>
        Pora na małe wyjaśnienie. We wszystkich przykładach do tej pory specjalnie dobraliśmy takie liczby, żeby „udało” 
        nam się wykonać dzielenie. A teraz niespodzianka - spróbujmy wykonać dzielenie $7 : 3$. Chcielibyśmy rozłożyć $7$ 
        kamieni na $3$ równe sterty… i coś nam nie wychodzi. Rozłożymy po dwa kamienie na jedną stertę i zostaje nam jeden 
        złośliwy kamień, z którym nie mamy co zrobić.
    </p>
	
	<table class="center">
		<tr>
			<td>
				<svg height="150" width="100">
					<circle cx="50" cy="50" r="20" class = "draggable"></circle>
					<circle cx="50" cy="100" r="20" class = "draggable"></circle>
				</svg>
			</td>
			<td>
				<svg height="150" width="100">
					<circle cx="50" cy="50" r="20" class = "draggable"></circle>
					<circle cx="50" cy="100" r="20" class = "draggable"></circle>
				</svg>
			</td>
			<td>
				<svg height="150" width="100">
					<circle cx="50" cy="50" r="20" class = "draggable"></circle>
					<circle cx="50" cy="100" r="20" class = "draggable"></circle>
				</svg>
			</td>
		</tr>
		<tr>
			<td colspan ="3">
				<svg height="50" width="300">
					<circle cx="150" cy="25" r="20" class = "draggable"></circle>
				</svg>
			</td>
		</tr>
	</table>

    <p>
        Moglibyśmy rozłupać go na trzy mniejsze kamienie równej wielkości, ale przecież nie jesteśmy barbarzyńcami. 
        W takiej sytuacji mówimy, że została nam <i>reszta</i>. Zapiszemy to w taki sposób: 
    </p>
      
    $$
        7 : 3 = 2 \ r. 1
    $$
      
    <p>
        Czyli „$7$ podzielić na $3$ to $2$, reszta $1$”.
    </p>
      
	<div class="example">
		Pan Janusz ma $8$ jajek, a na jajecznicę potrzebuje $3$ jajek. Może przygotować jajecznicę dla siebie i swojego syna i jeszcze zostaną mu dwa.
		$$8 : 3 = 2 \ r. 2$$
	</div>

	<div class="example">
		Stefan zabrał $27 \text{ zł}$ do pijalni. Jeden <span class="comment" id="czekolady">kufel</span> kosztuje $6 \text{ zł}$, więc po czterokrotnej degustacji 
		zostało mu $3 \text{ zł}$ na napiwek.
		$$27 : 6 = 4 \ r. 3$$
	</div>

	<div class="example">
		Babcia Teresa przygotowała $10$ gołąbków dla $5$ gości. Po ostatnim obiedzie jeden z nich wciąż czuje się przejedzony, więc tym 
		razem przyszło tylko $4$ gości. Każdy dostał po dwa. Zostały dwa gołąbki, którymi zajął się pan Janusz.
		$$10 : 4 = 2 \ r. 2$$
	</div>
    </lesson-chapter>

    <lesson-chapter><template #title>Własności dzielenia</template>
    <p class = "type">
        Rozszerzenie
    </p>
      
    <p>
        Co do tego, że dzielenie nie jest przemienne, raczej nie ma zastrzeżeń. Dać $14$ dzieciom $2$ cukierki do zjedzenia, 
        <span class="comment" id="co dać 14 cukierkom 2 dzieci do zjedzenia">to nie to samo</span>, co dać $2$ dzieciom $14$ cukierków. 
    </p>
      
    <p>
        Jeśli chodzi o łączność dzielenia, rozważmy przykład $60 : 6 : 2$. Licząc na dwa sposoby:
    </p>
      
    <p style="text-align: center">
        $60 : 6 = 10$<br>
        $10 : 2 = 5$
    </p>
      
    <p style="text-align: center">
        $6 : 2 = 3$<br>
        $60 : 3 = 20$
    </p>
      
    <p>
        Wyniki są dość różne, więc dzielenie nie jest łączne.
    </p>
    </lesson-chapter>

    <lesson-chapter><template #title>Dzielenie w słupku</template>
    <p class = "type">
        Warsztat
    </p>
      
    <p>
        W przypadku małych liczb warto mieć na uwadze, że dzielenie jest odwrotnością mnożenia. 
        Zawsze w razie problemów warto zastąpić sobie dzielenie odpowiednim mnożeniem, można nawet wspomóc się 
        tabliczką mnożenia. Jeśli chcemy znaleźć wynik $72 : 8$, szukamy kolumny zatytułowanej „$8$” i szukamy w niej wyniku $72$. 
        Wynik występuje w wierszu „$9$”, w takim razie $8 \cdot 9 = 72$, więc $72 : 8 = 9$.
    </p>

    <br>
	<table class="operation_table center" id="dividing_table">
		<tr><th> </th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th style="background: #F0E0E0">8</th><th>9</th></tr>
		<tr><th>0</th><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td style="background: #F0E0E0">0</td><td>0</td></tr>
		<tr><th>1</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td style="background: #F0E0E0">8</td><td>9</td></tr>
		<tr><th>2</th><td>0</td><td>2</td><td>4</td><td>6</td><td>8</td><td>10</td><td>12</td><td>14</td><td style="background: #F0E0E0">16</td><td>18</td></tr>
		<tr><th>3</th><td>0</td><td>3</td><td>6</td><td>9</td><td>12</td><td>15</td><td>18</td><td>21</td><td style="background: #F0E0E0">24</td><td>27</td></tr>
		<tr><th>4</th><td>0</td><td>4</td><td>8</td><td>12</td><td>16</td><td>20</td><td>24</td><td>28</td><td style="background: #F0E0E0">32</td><td>36</td></tr>
		<tr><th>5</th><td>0</td><td>5</td><td>10</td><td>15</td><td>20</td><td>25</td><td>30</td><td>35</td><td style="background: #F0E0E0">40</td><td>45</td></tr>
		<tr><th>6</th><td>0</td><td>6</td><td>12</td><td>18</td><td>24</td><td>30</td><td>36</td><td>42</td><td style="background: #F0E0E0">48</td><td>54</td></tr>
		<tr><th>7</th><td>0</td><td>7</td><td>14</td><td>21</td><td>28</td><td>35</td><td>42</td><td>49</td><td style="background: #F0E0E0">56</td><td>63</td></tr>
		<tr><th>8</th><td>0</td><td>8</td><td>16</td><td>24</td><td>32</td><td>40</td><td>48</td><td>56</td><td style="background: #F0E0E0">64</td><td>72</td></tr>
		<tr><th>9</th><td>0</td><td>9</td><td>18</td><td>27</td><td>36</td><td>45</td><td>54</td><td>63</td><td style="background: #CC4444">72</td><td>81</td></tr>
	</table>
    <p id ="dividing_table_field" style="visibility: hidden; text-align: center">
		a
	</p>
      
    <p>
        Zapewne zdążyłeś już polubić działania w słupku. Oto ich kwintesencja - <i>dzielenie w słupku</i> (czyli 
		<i>dzielenie pisemne</i>).
	</p>

	<div class="example">
		<p>
			Spróbujmy podzielić $978 : 2$. Zapewne spodziewasz się, że zapiszemy obie liczby jedna pod 
			drugą i podkreślimy je. Otóż nie. Piszemy je jedna obok drugiej i rysujemy kreskę nad obydwiema. Wynik będziemy pisać 
			ponad kreską.
		</p>
		
        <columnar-operation-table :operation='""' :numbers='[["/u:", "/u:", "/u:", "/u:", "/u:"], ["9", "7", "8", ":", "2"]]'></columnar-operation-table>
		
		<p>
			Teraz zaczynamy analizować liczbę, którą dzielimy, zaczynając od lewej. Bierzemy cyfrę $9$ i próbujemy podzielić ją 
			przez $2$. Nie interesuje nas jednak dokładne dzielenie z resztą, a jedynie odpowiedź na pytanie: ile razy mieści się liczba $2$ w liczbie $9$?
			Stwierdzamy, że mieści się $4$ razy (innymi słowy wykonujemy dzielenie $9 : 2$, jednak nie interesuje nas reszta z dzielenia). 
			Wynik zapisujemy nad kreską.
		</p>
		
        <columnar-operation-table :operation='""' :numbers='[["/u:4", "/u:", "/u:", "/u:", "/u:"], ["9", "7", "8", ":", "2"]]'></columnar-operation-table>

		<p>
			Teraz robimy coś odwrotnego - mnożymy otrzymane $4$ przez dzielnik, czyli przez $2$. Otrzymujemy $8$ i zapisujemy je pod 
			cyfrą setek dzielnej.
		</p>
		
        <columnar-operation-table :operation='""' :numbers='[["/u:4", "/u:", "/u:", "/u:", "/u:"], ["9", "7", "8", ":", "2"], ["8", "", "", "", ""]]'></columnar-operation-table> 
		
		<p>
			W tym momencie odejmujemy zapisaną ósemkę od wyjściowej dziewiątki. Dostaliśmy $1$.
		</p>
		
        <columnar-operation-table :operation='""' :numbers='[["/u:", "/u:", "/u:4", "/u:", "/u:", "/u:", "/u:"], ["", "", "9", "7", "8", ":", "2"], ["/u:-", "/u:", "/u:8", "/u:", "/u:", "/u:", "/u:"], ["", "", "1", "", "", "", "", ""]]'></columnar-operation-table> 

		<p>
			Z dzielnej przepisujemy kolejną cyfrę, czyli $7$. 
		</p>
		
        <columnar-operation-table :operation='""' :numbers='[["/u:", "/u:", "/u:4", "/u:", "/u:", "/u:", "/u:"], ["", "", "9", "7", "8", ":", "2"], ["/u:-", "/u:", "/u:8", "/u:", "/u:", "/u:", "/u:"], ["", "", "1", "7", "", "", "", ""]]'></columnar-operation-table> 
		
		<p>
			Teraz powtarzamy serię czynności. Sprawdzamy, ile razy dwójka mieści się w $17$. Zapisujemy wynik $8$ nad kreską i robimy działanie 
			odwrotne - mnożymy go przez dzielnik i piszemy $16$ na dole.
		</p>
		
        <columnar-operation-table :operation='""' :numbers='[["/u:", "/u:", "/u:4", "/u:8", "/u:", "/u:", "/u:"], ["", "", "9", "7", "8", ":", "2"], ["/u:-", "/u:", "/u:8", "/u:", "/u:", "/u:", "/u:"], 
			["", "", "1", "7", "", "", "", ""], ["", "", "1", "6", "", "", "", ""]]'></columnar-operation-table> 
		
		<p>
			Odejmujemy $17 - 16$ i dostajemy $1$.
		</p>

        <columnar-operation-table :operation='""' :numbers='[["/u:", "/u:", "/u:4", "/u:8", "/u:", "/u:", "/u:"], ["", "", "9", "7", "8", ":", "2"], ["/u:-", "/u:", "/u:8", "/u:", "/u:", "/u:", "/u:"], 
			["", "", "1", "7", "", "", "", ""], ["/u:-", "/u:", "/u:1", "/u:6", "/u:", "/u:", "/u:", "/u:"], ["", "", "", "1", "", "", ""]]'></columnar-operation-table>
		
		<p>
			Przepisujemy $8$ i powtarzamy czynności. Osiemnastka zawiera $9$ dwójek, $9 \cdot 2 = 18$, $18 - 18 = 0$.
		</p>
		
        <columnar-operation-table :operation='""' :numbers='[["/u:", "/u:", "/u:4", "/u:8", "/u:9", "/u:", "/u:"], ["", "", "9", "7", "8", ":", "2"], ["/u:-", "/u:", "/u:8", "/u:", "/u:", "/u:", "/u:"], 
			["", "", "1", "7", "", "", "", ""], ["/u:-", "/u:", "/u:1", "/u:6", "/u:", "/u:", "/u:", "/u:"], ["", "", "", "1", "8", "", ""], ["/u:-", "/u:", "/u:", "/u:1", "/u:8", "/u:", "/u:"], ["", "", "", "", "0", "", ""]]'></columnar-operation-table> 

		<p>
			Nie mamy już czego przepisać, więc zakończyliśmy męki. Otrzymaliśmy wynik $489$. Tym razem było nudno, bo 
			dzielenie przez $2$ jest raczej łatwe.		
		</p>
	</div>
	
	<div class="example">
		<p>
			Zróbmy coś brawurowego - obliczmy $5724 : 4$
		</p>

        <columnar-operation-table :operation='""' :numbers='[["/u:", "/u:", "/u:", "/u:", "/u:", "/u:"], ["5", "7", "2", "4", ":", "4"]]'></columnar-operation-table> 
		
		<p>
			Bierzemy pierwszą cyfrę z lewej, czyli $5$. Czwórka miesci się raz w piątce - piszemy wynik $1$. Następnie 
			mnożymy $1 \cdot 4 = 4$ i odejmujemy.
		</p>
		
        <columnar-operation-table :operation='""' :numbers='[["/u:", "/u:", "/u:1", "/u:", "/u:", "/u:", "/u:", "/u:"], ["", "", "5", "7", "2", "4", ":", "4"], ["/u:-", "/u:", "/u:4", "/u:", "/u:", "/u:", "/u:", "/u:"], ["", "", "1", "", "", "", "", ""]]'></columnar-operation-table> 
		
		<p>
			Przepisujemy kolejną cyfrę, czyli $7$. $4$ mieści się $4$ razy w $17$, więc piszemy $4$ jako wynik. Mnożymy $4 \cdot 4 = 16$ i odejmujemy.
		</p>
		
        <columnar-operation-table :operation='""' :numbers='[["/u:", "/u:", "/u:1", "/u:4", "/u:", "/u:", "/u:", "/u:"], ["", "", "5", "7", "2", "4", ":", "4"], ["/u:-", "/u:", "/u:4", "/u:", "/u:", "/u:", "/u:", "/u:"], ["", "", "1", "7", "", "", "", ""],
			["/u:-", "/u:", "/u:1", "/u:6", "/u:", "/u:", "/u:", "/u:"], ["", "", "", "1", "", "", "", ""]]'></columnar-operation-table> 
		
		<p>
			Przepisujemy kolejną cyfrę, czyli $2$. Dzielimy $12 : 4 = 3$. 
			Piszemy $3$ nad kreską, mnożymy $3 \cdot 4 = 12$ i odejmujemy.
		</p>
		
        <columnar-operation-table :operation='""' :numbers='[["/u:", "/u:", "/u:1", "/u:4", "/u:3", "/u:", "/u:", "/u:"], ["", "", "5", "7", "2", "4", ":", "4"], ["/u:-", "/u:", "/u:4", "/u:", "/u:", "/u:", "/u:", "/u:"], ["", "", "1", "7", "", "", "", ""],
			["/u:-", "/u:", "/u:1", "/u:6", "/u:", "/u:", "/u:", "/u:"], ["", "", "", "1", "2", "", "", ""], ["/u:-", "/u:", "/u:", "/u:1", "/u:2", "/u:", "/u:", "/u:"], ["", "", "", "", "0", "", "", ""]]'></columnar-operation-table> 
		
		<p>
			Przepisujemy $4$, dzielimy $4 : 4 = 1$, mnożymy $1 \cdot 4 = 4$, odejmujemy $4 - 4 = 0$.
		</p>
		
        <columnar-operation-table :operation='""' :numbers='[["/u:", "/u:", "/u:1", "/u:4", "/u:3", "/u:1", "/u:", "/u:"], ["", "", "5", "7", "2", "4", ":", "4"], ["/u:-", "/u:", "/u:4", "/u:", "/u:", "/u:", "/u:", "/u:"], ["", "", "1", "7", "", "", "", ""],
			["/u:-", "/u:", "/u:1", "/u:6", "/u:", "/u:", "/u:", "/u:"], ["", "", "", "1", "2", "", "", ""], ["/u:-", "/u:", "/u:", "/u:1", "/u:2", "/u:", "/u:", "/u:"], ["", "", "", "", "0", "4", "", ""], 
			["/u:-", "/u:", "/u:", "/u:", "/u:", "/u:4", "/u:", "/u:"], ["", "", "", "", "", "0", "", ""]]'></columnar-operation-table> 
		
		<p>
			Kończymy robotę i odczytujemy wynik $1431$. 
		</p>
	</div>
	
	<div class="example">
		<p>
			Jeśli to było brawurowe, to teraz będziemy dzielić jak szaleni - $33684 : 28$
		</p>

        <columnar-operation-table :operation='""' :numbers='[["/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:"], ["3", "3", "6", "8", "4", ":", "2", "8"]]'></columnar-operation-table> 
		
		<p>
			Zabieramy się za dzielną od lewej, czyli bierzemy pierwszą z brzegu trójkę. $28$ nie mieści się ani raz w trójce, co oznacza, że 
			początek jest niezbyt dobry. Lepiej weźmy dwie pierwsze cyfry dzielnej, czyli $33$, w których $28$ mieści się jednokrotnie.
			Piszemy wynik, czyli $1$, nad drugą trójką. Potem mnożymy $1 \cdot 28 = 28$ i odejmujemy $33 - 28 = 5$.
		</p>
		
        <columnar-operation-table :operation='""' :numbers='[["/u:", "/u:", "/u:", "/u:1", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:"], ["", "", "3", "3", "6", "8", "4", ":", "2", "8"], ["/u:-", "/u:", "/u:2", "/u:8", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:"],
			["", "", "", "5", "", "", "", "", "", ""]]'></columnar-operation-table> 
		
		<p>
			Przepisujemy kolejną cyfrę, czyli $6$. $28$ idealnie mieści się dwa razy w $56$. Mnożymy $2 \cdot 28 = 56$ i odejmujemy $56 - 56 = 0$.
		</p>
		
        <columnar-operation-table :operation='""' :numbers='[["/u:", "/u:", "/u:", "/u:1", "/u:2", "/u:", "/u:", "/u:", "/u:", "/u:"], ["", "", "3", "3", "6", "8", "4", ":", "2", "8"], ["/u:-", "/u:", "/u:2", "/u:8", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:"],
			["", "", "", "5", "6", "", "", "", "", ""], ["/u:-", "/u:", "/u:", "/u:5", "/u:6", "/u:", "/u:", "/u:", "/u:", "/u:"], ["", "", "", "", "0", "", "", "", "", ""]]'></columnar-operation-table> 

		<p>
			Przepisujemy kolejną cyfrę, czyli $8$. $28$ nie mieści się w $8$, więc piszemy wynik $0$, mnożymy $0 \cdot 28 = 0$, 
			odejmujemy $8 - 0 = 8$.
		</p>
		
        <columnar-operation-table :operation='""' :numbers='[["/u:", "/u:", "/u:", "/u:1", "/u:2", "/u:0", "/u:", "/u:", "/u:", "/u:"], ["", "", "3", "3", "6", "8", "4", ":", "2", "8"], ["/u:-", "/u:", "/u:2", "/u:8", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:"],
			["", "", "", "5", "6", "", "", "", "", ""], ["/u:-", "/u:", "/u:", "/u:5", "/u:6", "/u:", "/u:", "/u:", "/u:", "/u:"], ["", "", "", "", "0", "8", "", "", "", ""], ["/u:-", "/u:", "/u:", "/u:", "/u:", "/u:0", "/u:", "/u:", "/u:", "/u:"], 
			["", "", "", "", "", "8", "", "", "", ""]]'></columnar-operation-table> 
		
		<p>
			Spisujemy czwórkę, sprawdzamy że $84 : 28 = 3$, mnożymy $3 \cdot 28 = 84$, odejmujemy $84 - 84 = 0$.
		</p>
		
        <columnar-operation-table :operation='""' :numbers='[["/u:", "/u:", "/u:", "/u:1", "/u:2", "/u:0", "/u:3", "/u:", "/u:", "/u:"], ["", "", "3", "3", "6", "8", "4", ":", "2", "8"], ["/u:-", "/u:", "/u:2", "/u:8", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:"],
			["", "", "", "5", "6", "", "", "", "", ""], ["/u:-", "/u:", "/u:", "/u:5", "/u:6", "/u:", "/u:", "/u:", "/u:", "/u:"], ["", "", "", "", "0", "8", "", "", "", ""], ["/u:-", "/u:", "/u:", "/u:", "/u:", "/u:0", "/u:", "/u:", "/u:", "/u:"], 
			["", "", "", "", "", "8", "4", "", "", ""], ["/u:-", "/u:", "/u:", "/u:", "/u:", "/u:8", "/u:4", "/u:", "/u:", "/u:"], ["", "", "", "", "", "", "0", "", "", ""]]'></columnar-operation-table> 
		
		<p>
			Jakoś poszło. Jak widać, dzielenie w słupku wymaga wykonania w pamięci niektórych działań, nawet tych trudnych. 
			Na koniec musieliśmy sprawdzić, ile razy mieści się $28$ w $84$ i słupek w żaden sposób nam w tym nie pomógł. 
			Jedyne co możemy zrobić, to sprawdzać na piechotę. Czy mieści się raz? No tak. Dwa razy?  $28 + 28 = 56$, czyli się mieści. 
			Trzy razy? $56 + 28 = 84$, czyli tak, mieści się na styk. W takim razie $84 : 28 = 3$. 
		</p>
	</div>

	<div class="example">
		<p>
			Na deser podzielmy jeszcze $102$ przez $9$.
		</p>

        <columnar-operation-table :operation='""' :numbers='[["/u:", "/u:", "/u:", "/u:", "/u:"], ["1", "0", "2", ":", "9"]]'></columnar-operation-table> 
		
		<p>
			W jedynce dziewiątka się nie mieści, więc bierzemy pierwsze dwie cyfry i sprawdzamy, że w $10$ mieści się jedna $9$.
		</p>
		
        <columnar-operation-table :operation='""' :numbers='[["/u:", "/u:", "/u:", "/u:1", "/u:", "/u:", "/u:"], ["", "", "1", "0", "2", ":", "9"], ["/u:-", "/u:", "/u:", "/u:9", "/u:", "/u:", "/u:"], ["", "", "", "1", "", "", ""]]'></columnar-operation-table> 
		
		<p>
			Spisujemy $2$ i dzielimy dalej.
		</p>
		
        <columnar-operation-table :operation='""' :numbers='[["/u:", "/u:", "/u:", "/u:1", "/u:1", "/u:", "/u:"], ["", "", "1", "0", "2", ":", "9"], ["/u:-", "/u:", "/u:", "/u:9", "/u:", "/u:", "/u:"], ["", "", "", "1", "2", "", ""], 
			["/u:-", "/u:", "/u:", "/u:", "/u:9", "/u:", "/u:"], ["", "", "", "", "3", "", ""]]'></columnar-operation-table> 
		
		<p>
			Niespodzianka - nie mamy już żadnej cyfry do spisania, a zostało nam jakieś $3$. Oznacza to, że $3$ jest resztą z 
			dzielenia $102$ przez $9$, czyli $102 : 9 = 11 \ r. 3$
		</p>
		
        <columnar-operation-table :operation='""' :numbers='[["/u:", "/u:", "/u:", "/u:1", "/u:1", "/u:r.", "/u:3"], ["", "", "1", "0", "2", ":", "9"], ["/u:-", "/u:", "/u:", "/u:9", "/u:", "/u:", "/u:"], ["", "", "", "1", "2", "", ""], 
			["/u:-", "/u:", "/u:", "/u:", "/u:9", "/u:", "/u:"], ["", "", "", "", "3", "", ""]]'></columnar-operation-table> 
	</div>

	<div class="modal" id="divide_by_0">
		<div class = "modal_content" style="text-align: center">
			<p style="text-align: center" id = "modal_text">Nie wolno dzielić przez 0!<br></p>
			<button class="modal_close" id = "modal_button" style="float: center" onclick="CloseModal()">Rozumiem</button>
		</div>
	</div>
	<LOL>
		var modal_display_count = 0;
		function CloseModal() {
			document.getElementById("divide_by_0").style.display = "none"; 
			modal_display_count++;
			if (modal_display_count == 1)
			{
				document.getElementById("modal_text").innerHTML = "Nie próbuj dzielić przez zero!";
				document.getElementById("modal_button").innerHTML = "Przepraszam";
			}
			if (modal_display_count == 2)
			{
				document.getElementById("modal_text").innerHTML = "Znowu dzielisz przez 0.";
				document.getElementById("modal_button").innerHTML = "Już nie będę";
			}
			if (modal_display_count == 3)
			{
				document.getElementById("divide_by_0").style.backgroundColor = "#000000";
				document.getElementById("modal_text").innerHTML = "#$#A%64g@##@!!!<br>%%@#%5HGF!<br>-_$@^&amp;##$@%!!!!<br>*$(&amp;#!!AK_==3??";
				document.getElementById("modal_button").style.display = "none";
				//window.open('','_self',''); 
				//window.close();
				//self.close();
			}
		};
	</LOL>
	

	<p style="text-align: center">
		<input style="width: 800px" name="numberInput" type="text" id="columnar_division_input" />
	</p>
	<LOL>
		var columnar_division = new Columnar_division( "columnar_division_table","columnar_division_comment", "columnar_operation_button_right", "columnar_operation_button_left");
		function ColumnarDivisionStartArgs() {
			var success = columnar_division.generate_from_input("columnar_division_input","columnar_division_area", false);
			if (success)columnar_division.print_step(0);
		}

	</LOL>
	<p style="text-align: center">
		<button id="columnar_division_start" style="float: center;" onclick="ColumnarDivisionStartArgs()">Start</button>
	</p>
	<LOL>
		SetInputEnterEvent("columnar_division_input","columnar_division_start")
	</LOL>


	<table class="columnar_operation_script center" id="columnar_division_area" >
		<tr>
			<td id="columnar_operation_button_left" onclick="columnar_division.prev()">
				<svg height="0" width="30">
					<defs>
						<linearGradient id="gradient">
							<stop offset="20%" stop-color="#C33" />
							<stop offset="90%" stop-color="#833" />
						</linearGradient>
						<linearGradient id="hover_gradient">
							<stop offset="20%" stop-color="#A33" />
							<stop offset="90%" stop-color="#433" />
						</linearGradient>
					</defs>
					<polygon points="20,0 0,30 20,60"/>
				</svg>
			</td>
			<td>
				<div id="columnar_division_table" class="no_selection"></div>
				<p id="columnar_division_comment" class="no_selection"></p>
			</td>
			<td id = "columnar_operation_button_right" onclick="columnar_division.next()">
				<svg height="0" width="30">
					<polygon points="0,0 20,30 0,60"/>
				</svg>
			</td>
		</tr>
	</table>

    <p class = "type optional-hide">
        Rozszerzenie
    </p>
    <p class = "warning">wymagana znajomość tematu: Kolejność wykonywania działań</p>
	<div>
		<p>
			Spróbujmy uchwycić matematyczną istotę dzielenia w słupku. Weźmy dzielenie $33684 : 28$. Najpierw badamy rząd tysięcy, czyli 
			patrzymy na $33$ w liczbie $33684$. Stwierdzamy, że w $33$ liczba $28$ mieści się raz, więc w $33 000$
			liczba $28$ mieści się 
			$1000$ razy
		</p>
		
		<p style="text-align: center">
			$33 684 =$ <br>
			$= 28 \cdot 1000 + (33 684 - 28 \cdot 1000) =$<br>
			$= 28 \cdot 1000 + (33 000 - 28 000 + 684) =$<br>
			$= 28 \cdot 1000 + (5000 + 684) =$<br>
			$= 28 \cdot 1000 + 5684$<br>
		</p>
		
		<p>
			Teraz rozpatrujemy rząd setek. Stwierdzamy, że w $56$ liczba $28$ mieści się $2$ razy, 
			więc w $5600$ mieści się $200$ razy
		</p>
		
		<p style="text-align: center">
			$28 \cdot 1000 + 5684 =$<br>
			$= 28 \cdot 1000 + 28 \cdot 200 + (5684 - 28 \cdot 200) =$<br>
			$= 28 \cdot 1000 + 28 \cdot 200 + (5600 - 5600 + 84) =$<br>
			$= 28 \cdot (1000 + 200) + 84$<br>
		</p>
		
		<p>
			Rozpatrujemy rząd jedności. W $84$ liczba $28$ mieści się $3$ razy.
		</p>
		
		<p style="text-align: center">
			$28 \cdot (1000 + 200) + 84 =$<br>
			$= 28 \cdot (1000 + 200) + 28 \cdot 3 =$<br>
			$= 28 \cdot (1000 + 200 + 3) =$<br>
			$= 28 \cdot 1203$<br>
		</p>
		
		<p>
			W rezultacie $33 684 = 28 \cdot 1203$, czyli $33 684 : 28 = 1203$. 
		</p>
		
		<p class = "type">
			Formalnie
		</p>
			
		<p class = "warning">
			wymagana znajomość tematu: Indukcja matematyczna
		</p>

		<p>
			Formalnie algorytm dzielenia pisemnego przedstawia się następująco. Dany jest dzielnik $b$ oraz dzielna $a$ o reprezentacji dziesiętnej
			$a = \sum_{j = 0}^l 10^j a_j$, gdzie $l$ oznacza długość (liczbę cyfr) $a$, zaś $a_j \in \{0, 1, 2, 3, 4, 5, 6, 7, 8, 9\}$.
			Poszukiwana jest reprezentacja dziesiętna ich ilorazu $q = a : b$.
		</p>

		<p>
			Oznaczmy przez $c_l, r_{l-1}$ część całkowitą i resztę z dzielenia $a_l$ przez $b$, tzn. $a_l = c_l \cdot b + r_{l-1}$. Odpowiada to
			wykonywaniu dzielenia najbardziej znaczącej cyfry przez dzielnik $b$ podczas dzielenia pisemnego. Jednocześnie $r_{l-1} = a_l - c_l \cdot b$, 
			co odpowiada operacjom mnożenia i odejmowania w procedurze dzielenia pisemnego. Należy zwrócić uwagę, że $a_l \leq 9$, więc $0 \leq c_l \leq 9$ oraz 
			oczywiście $r_{l-1} \lt b$ jako reszta z dzielenia przez $b$.
		</p>

		$$
			a = 10^l a_l + 10^{l - 1} a_{l - 1} + \sum_{j = 0}^{l-2} 10^j a_j = 
			10^{l} \left(c_{l} \cdot b + r_{l-1}\right) + 10^{l - 1} a_{l - 1} + \sum_{j = 0}^{l-2} 10^j a_j = \\
			= b \cdot 10^{l} c_{l} + 10^{l - 1} \cdot 10r_{l-1} + 10^{l - 1} a_{l - 1} + \sum_{j = 0}^{l-2} 10^j a_j =
			b \cdot 10^{l} c_{l} + 10^{l - 1} \left(a_{l - 1} + 10r_{l-1}\right) + \sum_{j = 0}^{l-2} 10^j a_j
		$$

		<p>
			Oznaczmy przez $c_{l-1}, r_{l-2}$ część całkowitą i resztę z dzielenia $a_{l-1} + 10r_{l-1}$ przez $b$, tzn. 
			$a_{l-1} + 10r_{l-1} = c_{l-1} \cdot b + r_{l-2}$. Zauważmy, że $a_{l-1} \leq 9$, $r_{l-1} \leq b-1$ oraz $-r_{l-2} \leq 0$, więc
			$$c_{l-1} \cdot b = a_{l-1} + 10r_{l-1} - r_{l-2} \leq 9 + 10(b-1) + 0 = 10b - 1 \lt 10b$$ 
			czyli $c_{l-1} \cdot b \lt 10b$, stąd $c_{l-1} \lt 10$, więc również $0 \leq c_{l-1} \leq 9$.
		</p>	

		$$
			a = b \cdot 10^{l} c_{l} + 10^{l - 1} \left(a_{l - 1} + 10r_{l-1}\right) + 10^{l - 2} a_{l - 2} + \sum_{j = 0}^{l-3} 10^j a_j =
			b \cdot 10^{l} c_{l} + 10^{l - 1} \left( c_{l-1} \cdot b + r_{l-2} \right) + 10^{l - 2} a_{l - 2} + \sum_{j = 0}^{l-3} 10^j a_j =\\
			= b \cdot 10^{l} c_{l} + b \cdot 10^{l - 1} c_{l-1} + 10^{l - 2} \left(a_{l - 2} + 10r_{l-2} \right) + \sum_{j = 0}^{l-3} 10^j a_j =
			b \left(10^{l} c_{l} + 10^{l - 1} c_{l-1} \right) + 10^{l - 2} \left(a_{l - 2} + 10r_{l-2} \right) + \sum_{j = 0}^{l-3} 10^j a_j
		$$

		<p>
			Na zasadzie indukcji rozpisujemy liczbę $a$ do postaci
		</p>

		$$
			a = b \left(10^{l} c_{l} + 10^{l - 1} c_{l-1} + 10^{l - 2} c_{l-2} + \dotsb + 10^0 c_0 \right)
		$$

		<p>
			Skąd wprost wynika postać dziesiętna ilorazu $q$:
		</p>

		$$
			q = a : b = 10^{l} c_{l} + 10^{l - 1} c_{l-1} + 10^{l - 2} c_{l-2} + \dotsb + 10^0 c_0
		$$
	</div>

    </lesson-chapter>

  </lesson>
</template>

<script>
import LessonTitle from "../../../lesson/LessonTitle";
import LessonIntro from "../../../lesson/LessonIntro";
import LessonChapter from "../../../lesson/chapter/LessonChapter";
import Lesson from "../../../lesson/Lesson";
import ColumnarOperationTable from "../../../utils/columnar_operation_table/ColumnarOperationTable";

export default {
  name: "Dzielenie",
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
  }
};
</script>

<style scoped>
</style>
