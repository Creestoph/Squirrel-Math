<template>
  <lesson routeShortVersion="/procenty-short" routeLongVersion="/procenty">
    <lesson-title>Procenty</lesson-title>

    <lesson-intro>
	<p>
		Pewnego wiosennego poranka pan Janusz ze smakiem kawy w ustach i leniwym nieładem we włosach wyrusza w stronę skrzynki pocztowej, 
		oczekując listów od miłości sprzed lat. Niepewna, acz wprawna ręka wyciąga stertę papierów, wśród 
		których przeważają prośby i groźby rodzaju „od czerwca podwyżka cen gazu o $30\%$”. Pocierając lewy pośladek, niewzruszony pan Janusz 
		przegląda dalej. Jego uwagę przykuwa ulotka hipermarketu „Bułka - stać nawet Ciebie!” 
		niosąca światu nowinę „Tylko dzisiaj! Parówki babuni tańsze o $60\%$”. Czując przyspieszone bicie serca, pan Janusz kumuluje w sobie 
		gotowość do podjęcia walki o przecenione parówki. Ciska stertą ulotek i czym prędzej wskakuje na rower.
	</p>
    </lesson-intro>

    <lesson-chapter><template #title>Tanie parówki</template>
	<p class = "type">
		Intuicje
	</p>
	
	<p>
		Stoczywszy zacięty bój z panią Krystyną o pierwszeństwo w kolejce do mięsnego, pan Janusz zaopatruje się w dwa kilogramy parówek babuni. 
		Kierując się roztropnością i poradami matki, 
		uważnie czyta skład zakupionych kiełbasek: <comment text="Może zawierać śladowe ilości orzechów arachidowych">
		„Woda: $40\%$, Skóry wieprzowe: $30\%$, Seler: $10\%$, 
		Konserwanty: $10\%$, Mięso drobiowe: $4\%$, Skrobia ziemniaczana: $4\%$, 
		Gorczyca: $1\%$, Polepszacze smaku: $1\%$”</comment>. Zadowolony z dobrego zakupu kieruje się do kasy.
	</p>

	<p>
		Z procentami spotykamy się prawie na co dzień. Właściwie są one niczym więcej niż innym sposobem na zapisanie ułamków dziesiętnych. 
		Symbol $\%$ oznajmia, że mamy do czynienia z ułamkiem o mianowniku $100$ (z łac. „pro centum” – na sto). 
		Konwersja procentów na ułamki zwykłe i dziesiętne jest bardzo prosta:
	</p>
	
	<ul>
		<li>$40\% = 0,40 = \frac{40}{100}$</li>
		<li>$57\% = 0,57 = \frac{57}{100}$</li>
		<li>$100\% = 1$</li>
		<li>$66,7\% = 0,667 = \frac{667}{1000}$</li>
	</ul>
	
	<p>
		Matematyka doskonale mogłaby się obyć bez procentów. Jednak nie hipermarkety, banki, przedsiębiorstwa. Procenty stosujemy z prostego 
		powodu: dobrze działają na wyobraźnię. Najczęściej procentów używamy do opisania „części czegoś”. 
		Dość łatwo sobie uzmysłowić, że $100\%$ odpowiada pełni, jedności, a pomniejsze procenty to coraz mniejsze fragmenty całości. 
		Gdy widzimy informację, że $40\%$ <comment text="parówki pana Janusza">parówki</comment> stanowi woda, mamy dość dobre wyobrażenie, 
		jak bardzo… ciekła… jest ta parówka. 
	</p>

	<div class="example">
		Pan Janusz zahacza o alejkę z kosmetykami i higieną. Etykieta na dezodorancie „Unholy Man Species” głosi, że produkt jest 
		polecany przez $90\%$ mężczyzn. Oznacza to, że gdy wybierzemy losowych $10$ mężczyzn, 
		$9$ spośród 
		nich powinno wypowiedzieć się przychylnie na temat dezodorantu. Pan Janusz nie przypomina sobie, by ktokolwiek pytał go o zdanie na 
		ten temat.
	</div>
	<div class="example">
		W mleku $3,2\%$ tłuszcz stanowi $0,032$ całej masy mleka. Michaś patrzy na mleko 
		$3,2\%$ niechętnie. Preferuje śmietankę $30\%$.
	</div>
	<div class="example">
		Batonik „Banana Ecstasy” ma nałożony podatek VAT w wysokości $23\%$. Oznacza to, że gdy płacimy za kupowany batonik, 
		$\frac{23}{100}$ tej kwoty jest <comment text="kradzione">odprowadzane</comment> do skarbu państwa.
	</div>
    </lesson-chapter>

    <lesson-chapter><template #title>Procent liczby</template>  
	<p class = "type">
		Intuicje
	</p>
	
	<p class="problem">
		Zakładając, że pan Janusz zje zakupione $2 \text{ kg}$ parówek, w których składzie mięso drobiowe stanowi $4\%$, 
		to ile mięsa drobiowego pan Janusz spożyje?
	</p>
	
	<p>
		Pytanie, które sobie zadajemy, brzmi „Ile to jest $4\%$ z $2 \text{ kg}$?”. Obliczanie procentu liczby jest 
		tym samym, co obliczanie ułamka liczby. Odpowiedź daje proste mnożenie 
	</p>
	
	$$
		4\%\cdot2 \text{ kg}=\frac{4}{100}\cdot2 \text{ kg}=\frac{8}{100} \text{ kg}=0,08 \text{ kg}=80 \text{ g}
	$$
	
	<p>
		Podobnie, moglibyśmy zapytać	
	</p>
	
	<p class="problem">
		Jeśli w dwóch kilogramach parówek mieści się $80 \text{ g}$ mięsa, to ile procent składu stanowi mięso?
	</p>
	
	<p>
		Wtedy obliczylibyśmy
	</p>
	
	$$
		\frac{0,08 \text{ kg}}{2 \text{ kg}}=0,04=4\%
	$$
	
	<p>
		Wykonując różne operacje na procentach nie zapominajmy, że symbol $\%$ ma takie samo znaczenie jak ułamek $\frac{1}{100}$. 
		Użycie procentu to po prostu wstydliwy sposób zapisu ułamka.
	</p>
	
	<div class="example">
		Dumny z udanego zakupu, pan Janusz udaje się z parówkami w torebce foliowej do eleganckiej restauracji włoskiej, by świętować 
		dobrze dokonaną oszczędność. Zamawia spaghetti i <comment text="Czy masz ukończone 18 lat?  Tak - zrozumiałem, 
		wkraczam / Nie - powrót do bezpieczeństwa"> butelkę $0,75 \text{ l}$ wina Château de Camensac zawierającego 
		$13\%$ alkoholu</comment>. 
		Wypicie całej butelki zapewnia panu Januszowi niezapomniane doznania oraz $13\% \cdot 0,75 \text{ l} = 0,13 \cdot 0,75 \text{ l} = 0,0975 \text{ l}$ alkoholu w 
		organizmie.
	</div>
	<div class="example">
		Jadąc do domu na rowerze, pan Janusz spostrzega, że droga jest wyjątkowo długa, kręta i wyboista. W trosce o komfort jazdy pana 
		Janusza, policjant z drogówki rozporządza test alkomatem. Załóżmy, że w ciele pana Janusza znalazło 
		się $0,09 \text{ kg}$ alkoholu. Płyny limfatyczne stanowią $70\%$ masy ciała, czyli szacując po sylwetce 
		$70\% \cdot 100 \text{ kg} = 70 \text{ kg}$ ważą Januszowskie 
		płyny limfatyczne. W takim razie ile jest procent alkoholu we krwi Janusza? Niezawodne narzędzie oznajmia 
		zawartość $\frac{0,09 \text{ kg}}{70 \text{ kg}}≈0,00129=0,129\%$ alkoholu. Przejażdżka <comment text="zależy od łapówki">
		zapewne</comment> skończy się w tym miejscu.
	</div>
	
	<p>
		Procenty dobrze służą do wyrażania ułamków rzędu jednej setnej. Wtedy przed znakiem $\%$ będzie stała liczba naturalna. Gdy schodzimy na 
		rząd jednej tysięcznej, do użytku wchodzą <i>promile</i> wyrażane symbolem $‰$. <comment text="Jak dobrze pójdzie, 
		stanie się to polskim przysłowiem.">Powszechnie mówi się, że pan Janusz ma $1,29‰$ alkoholu we krwi</comment>, nie zaś 
		$0,129\%$.
	</p>

	<p>
		Spójrzmy na procenty od jeszcze innej strony.
	</p>
	
	<p class="problem">
		Jeśli pan Janusz jedzie radiowozem już piętnaście minut i znajduje się w $20\%$ 
		drogi na komisariat, to ile czasu będzie trwała cała podróż?
	</p>
	
	<p>
		Aby sprostać temu trudnemu problemowi, 
		zastanawiamy się najpierw „ile razy większy jest pełen okres czasu od podanego fragmentu?”. Stwierdzamy, że $100\%$ jest 
		$5$ razy większe 
		niż $20\%$. Cała podróż będzie więc trwała $5$ razy dłużej niż $15$ minut, 
		co daje godzinę i piętnaście minut. To będzie długa przejażdżka.
	</p>

	<p>
		Aby obliczyć wartość całej liczby, gdy znamy jakiś jej procent, musimy wykonać dzielenie: 
	</p>
	
	$$
		\frac{15 \text{ min}}{20\%}=\frac{15 \text{ min}}{\frac{1}{5}}=5\cdot15 \text{ min}=1 \text{ godz } 15 \text{ min}
	$$
	
	<ul>
		<li>
			Ile wynosi $13\%$ liczby $58$?
			$$13\%\cdot58=0,13\cdot58=7,54$$
		</li>
		
		<li>
			Jakim procentem liczby $60$ jest liczba $27$?
			$$\frac{27}{60}=\frac{9}{20}=45\%$$
		</li>
		
		<li>
			$18$ stanowi $24\%$ pewnej liczby. Jakiej?
			$$\frac{18}{24\%}=\frac{18}{0,24}=\frac{1800}{24}=75$$
		</li>
		
	</ul>
    </lesson-chapter>

    <lesson-chapter><template #title>Podwyżki i obniżki</template>  
	<p class = "type">
		Intuicje
	</p>
	
	<p>
		Przecena parówek o $60\%$ to nie przelewki. Jeśli cena została obniżona o $60\%$, to znaczy, że 
		$60\%$ pierwotnej ceny zostało skasowane. 
		Jeśli przed przeceną kilogram parówek kosztował $15 \text{ zł}$, to po przecenie będzie to jedynie $6 \text{ zł}$, czyli o 
		$9 \text{ zł}$ mniej (jako że $9 \text{ zł}$ to $60\%$ z $15 \text{ zł}$).
	</p>

	<center><img src="./.images/Screenshot_1.png" align="middle"></center>
	
	<p>
		Podobnie, jeśli cena towaru idącego po $40 \text{ zł}$ zostanie podniesiona o $30\%$, to znaczy, że 
		$30\%$ pierwotnej ceny zostanie dodane - nowa cena będzie wynosić $52 \text{ zł}$.
	</p>

	<center><img src="./.images/Screenshot_2.png" align="middle"></center>
	
	<div class="example">
		<p>
			Rogale piekarza Bogdana sprzedawały się po $3,20 \text{ zł}$. Bogdan kocha swoje rogale i doszedł do wniosku, że są warte znacznie 
			więcej - podniósł cenę o $25\%$. 
		</p>
		
		$$
			3,20 \text{ zł}+ 25\%\cdot3,20 \text{ zł}=3,20 \text{ zł}+0,80 \text{ zł}=4 \text{ zł}
		$$
		
		<p>
			Widząc smutne twarze rozczarowanych dzieci, Bogdan umiłował się. Obniżył cenę o $25\%$. 
		</p>
		
		$$
			4 \text{ zł}-25\%\cdot4 \text{ zł}=4\text{ zł}-1\text{ zł}=3\text{ zł} 
		$$
		
		<p>
			Ku swemu zdziwieniu, Bogdan po obniżce nie otrzymał tej samej ceny, co na początku. Obniżka o $25\%$ poprzedzona przez podwyżkę 
			o $25\%$ w rezultacie obniża cenę.
		</p>
	</div>
	<div class="example">
		Krzyś postanowił sprzedać swoje biurko, by wymienić je na dłuższe. Przepełniony optymizmem wystawił biurko na licytację i ustanowił cenę $600 \text{ zł}$. Po miesiącu 
		uatrakcyjnił ofertę, obniżając cenę o $50\%$ do $300 \text{ zł}$. Kolejny miesiąc napełnił Krzysia rezygnacją - 
		znów obniżył cenę o $50\%$ do $150 \text{ zł}$. Biurko sprzedało się dopiero po kolejnej obniżce o 
		$50\%$. $75 \text{ zł}$ zabolało dumę Krzysia. Taki sam efekt osiągnąłby, 
		obniżając cenę od razu o $87,5\%$.
	</div>

	<p class = "type">
		Warsztat
	</p>
		
	<p>
		Gdy chcemy obliczyć wartość ceny po podwyżce lub obniżce, możemy wykonać to na dwa sposoby:
	</p>
	
	<ul>
		<li>
			Do początkowej ceny dodać (lub odjąć) odpowiedni jej procent
			$$
				45 \text{ zł}+20\%\cdot45 \text{ zł}=45 \text{ zł}+9 \text{ zł}=54 \text{ zł}
			$$
			$$
				70 \text{ zł}-10\%\cdot70\text{ zł}=70 \text{ zł}-7 \text{ zł}=63 \text{ zł} 
			$$
		</li>
		<li>
			Początkową cenę pomnożyć przez odpowiedni ułamek
			$$
				45 \text{ zł} \cdot1,2=54 \text{ zł}
			$$
			$$
				70 \text{ zł}\cdot0,9=63 \text{ zł}
			$$
		</li>
	</ul>
	
	<p>
		Obydwie operacje są sobie równoważne i sprowadzają się do wykonania tych samych rachunków, jednak w drugiej metodzie zapis jest trochę 
		przejrzystszy i znacznie wygodniejszy, gdy łączymy ze sobą wiele przecen i podwyżek. 
		Następujące po sobie: podwyżkę o $25\%$ i obniżkę o $25\%$ ceny $3,20 \text{ zł}$ 
		możemy zapisać w jednej linijce:
	</p>
	
	$$
		3,20 \text{ zł} \cdot 1,25\cdot0,75 = 3,20 \text{ zł}\cdot \frac{5}{4} \cdot \frac{3}{4} = 4 \text{ zł} \cdot \frac{3}{4} = 3 \text{ zł}
	$$
	
	<p>
		Co więcej, ponieważ mnożenie jest łączne:
	</p>
	
	$$
		3,20 \text{ zł} \cdot 1,25 \cdot 0,75 = 3,20 \text{ zł} \cdot \frac{5}{4} \cdot \frac{3}{4} = 3,20 \text{ zł} \cdot \frac{15}{16} = 
		3,20 \text{ zł} \cdot 0,9375 = 3\text{ zł}
	$$
	
	<p>
		Widzimy teraz, że działania piekarza Bogdana były równoważne jednorazowej obniżce o $6,25\%$.
	</p>

	<p class = "type">
		Intuicje
	</p>
	
	<p>
		Czasami interesuje nas zagadnienie odwrotne do obliczania podwyżki o dany procent: „O ile procent większa jest jedna liczba od drugiej?” 
		Początkowo pączek różany u Bogdana kosztował $2 \text{ zł}$, a teraz kosztuje $2,25 \text{ zł}$. Podejrzliwe dzieci chcą 
		wiedzieć, jak bardzo Bogdan z nich zdziera. <comment text="Ach ta dzisiejsza młodzież…">Chcą więc się dowiedzieć</comment>
		„o ile procent podwyższono cenę $2 \text{ zł}$, skoro wyszło $2,25 \text{ zł}$ ?”. 
		Nowa cena jest o $0,25 \text{ zł}$ większa od pierwotnej. Wystarczy obliczyć, jaką 
		część początkowej ceny stanowi $0,25 \text{ zł}$:
	</p>
	
	$$
		\frac{0,25 \text{ zł}}{2 \text{ zł}} = \frac{1}{8} = 12,5\%
	$$
	
	<p>
		Prawda jest brutalna: Bogdan podniósł cenę o $12,5\%$. Na tej samej zasadzie możemy obliczyć, o ile procent jedna liczba jest 
		mniejsza od drugiej. Pani Krystyna ważyła $72 \text{ kg}$. Od kiedy postanowiła wziąć udział w konkursie na top modelkę, schudła do 
		$64 \text{ kg}$. O ile procent mniej waży? Różnica wag wynosi $72 \text{ kg} - 64 \text{ kg} = 8 \text{ kg}$, czyli 
		$\frac{8 \text{ kg}}{72 \text{ kg}} = 11,(1)\%$ początkowej wagi. 
		Pani Krystyna zrzuciła ponad jedną dziesiątą masy ciała.
	</p>
    </lesson-chapter>

    <lesson-chapter><template #title>Punkty procentowe</template>  
	<p class = "type">
		Intuicje
	</p>
	
	<p>
		Wyobraźmy sobie taką sytuację: W mieście Gotham pojawia się Joker. Współczynnik przestępczości wzrasta do $35\%$, co oznacza, 
		że statystycznie $35$ na $100$ mieszkańców miasta popełnia zbrodnie. Wtedy do miasta przybywa Batman i 
		zaprowadza porządek, by zwrócić obywatelom spokojny sen. Przegrana Jokera wstrząsnęła kryminalnym półświatkiem i w rezultacie przestępczość spadła do 
		$14\%$. Do miasta Gotham przybywa matematyk i pyta: o ile procent 
		spadła przestępczość w wyniku działań Batmana? Sierżant James Gordon przedstawia matematykowi dane i odpowiada z dumą, że o 
		$21\%$. Matematyk wyśmiewa go w twarz i opuszcza Gotham zdegustowany.
	</p>
	
	<p>
		Zastanówmy się nad poprawną odpowiedzią. Przypuśćmy chwilowo, że miasto Gotham liczy 
		$100\ 000$ mieszkańców. Jeśli po przybyciu Jokera współczynnik przestępczości wynosił $35\%$, w mieście 
		znajdowało się $35\ 000$ przestępców. 
		Gdy Batman posprzątał śmieci, w mieście pozostało $14\ 000$ przestępców. O ile procent liczba $14 000$
		jest mniejsza od $35\ 000$? 
	</p>
	
	$$
		\frac{35\ 000-14\ 000}{35\ 000}=\frac{21\ 000}{35\ 000}=\frac{3}{5}=60\%
	$$
	
	<p>
		I oto fakty: przestępczość w mieście spadła o $60\%$. 
	</p>

	<p>
		Gdy napotykamy problem: „o ile procent mniejszy jest odsetek $14\%$ niż odsetek $35\%$?”, procenty możemy 
		potraktować jako zwykłe ułamki. Pytanie: „o ile procent mniejsza jest liczba $0,14$ niż $0,35$?” 
		jest już znacznie bardziej zrozumiałe, choć wyraża ten sam dylemat.
	</p>

	<p>
		Liczba, którą podał James Gordon, wyrażała tzw. <i>punkty procentowe</i>. Gdyby sierżant stwierdził, że współczynnik przestępczości spadł o 
		$21$ punktów procentowych, zasłużyłby na szacunek matematyka. 
		Punkty procentowe służą właśnie do wyrażania różnicy pomiędzy dwoma wielkościami reprezentowanymi w postaci procentów.
	</p>

	<div class="example">
		Chipsy „Lay’s Prosto z Pieca” reklamują się zawartością tłuszczu obniżoną o $70\%$. Jeśli w zwykłych chipsach zawartość tłuszczu 
		wynosi $30\%$, to po obniżeniu zawartości tłuszczu o $70\%$ będziemy mieli
	$$
		30\%-70\%\cdot30\%=30\%-21\%=9\%
	$$
		
	Czyli Chipsy „Lay’s Prosto z Pieca” powinny zawierać $9\%$ tłuszczu. Obniżka wynosi zatem $21$ punktów procentowych.
	</div>
	<div class="example">
		<comment text="Raczej nie musimy mieć bujnej wyobraźni.">Wyobraźmy sobie kraj, w którym poziom bezrobocia jest wysoki</comment>
		i sięga $15\%$. Jeśli pewien szanowny polityk ogłosi, że obniży bezrobocie o $10\%$, to nie oczekujmy, 
		że w wyniku będzie ono wynosiło $5\%$. 
		Liczba o $10\%$ mniejsza niż $15\%$ to
		$$15\%\cdot0,9=13,5\%$$
	czyli w najlepszym wypadku bezrobocie spadnie o $1,5$ punktu procentowego.
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
  name: "Procenty",
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
