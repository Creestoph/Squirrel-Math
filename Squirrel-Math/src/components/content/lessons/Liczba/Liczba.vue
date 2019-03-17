<template>
	<lesson>
		<lesson-title>Liczba</lesson-title>

		<lesson-intro>
		<p>  
			<i>Liczba</i> to podstawowe pojęcie matematyki. Jest tak podstawowe… że matematycy nie wiedzą, czym jest liczba. 
			Wyróżniają jednak różne rodzaje liczb. W trakcie naszych przygód w świecie matematyki poznamy liczby całkowite, wymierne, rzeczywiste, urojone i kto wie jakie jeszcze.
			Na dobry zajmiemy się <i>liczbami naturalnymi</i>. Naturalnymi, bo z ich pomocą opisujemy otaczającą nas naturę. Określamy ilość albo oceniamy wartość rzeczy z naszego środowiska. 
		</p>
		</lesson-intro>

   	 	<lesson-chapter><template #title>Czym jest liczba</template>
		<p class = "type">
			Intuicje
		</p>
		
		<p> 
			Wyobraźmy sobie pasterza, który sprowadza owce do zagrody. Na początku zagroda z owcami jest pusta. Mówimy wtedy, że w 
			zagrodzie jest <i>zero</i> owiec. Do pustej zagrody wchodzi owca. Wtedy liczba owiec w zagrodzie wynosi <i>jeden</i>. Następnie do owcy 
			dołącza kolejna. W zagrodzie są <i>dwie</i> owce. Utrzymując pozytywną tendencję, stwierdzimy, że następnie liczba owiec w zagrodzie 
			wynosi <i>trzy</i>, <i>cztery</i>, <i>pięć</i>, <i>sześć</i>, <i>siedem</i>, <i>osiem</i>, <i>dziewięć</i>. Gdy patrzymy na trzodę, 
			możemy określić jej liczebność, czyli właśnie podać liczbę owiec. Dla wygody zapisu matematycy używają w tym celu formy krótszej niż słowna – stosują <i>cyfry</i>.
		</p>
			
		<div class="example">
			<br><br><br><br>
			<table class = "sheep_big center">
				<tr><td></td></tr>
			</table>
			<p style="text-align: center">zero: $0$</p>
			<p>
				To co widzimy powyżej, to biała, pusta przestrzeń. Nie ma na niej żadnej owieczki. Inaczej mówiąc, widzimy tu zero owieczek. Do skrótowego zapisu słowa "zero"
				stosuje się symbol (cyfrę) $0$. Wygląda jak szeroko otwarte oko, które próbuje dopatrzyć się powyżej jakiejkolwiek owieczki.
			</p>
		</div>

		<div class="example">
			<table class = "sheep_big center">
				<tr><td><img src="./.images//sheep.png"></td></tr>
			</table>
			<p style="text-align: center">jeden: $1$</p>
			<p>
				W zagrodzie stoi samotna owieczka. Gdy ktoś spyta nas, ile owieczek widzimy w zagrodzie, odpowiemy, że widzimy jedną owieczkę. Aby zapisać tę liczbę na papierze,
				stosujemy cyfrę $1$. Wygląda trochę jak pionowa pałka albo po prostu zwykła kreska. Albo wyprostowany palec. Prawdopodobnie stąd wzięło się określenie "sam jak palec".
			</p>
		</div>

		<div class="example">
			<table class = "sheep_big center">
				<tr><td><img src="./.images//sheep.png"><img src="./.images//sheep.png"></td></tr>
			</table>
			<p style="text-align: center">dwa: $2$</p>
			<p>
				Teraz owieczka ma towarzyszkę. Na obrazku widzimy dwie owce. Spostrzeżenie to zapiszemy za pomocą cyfry $2$ wyglądającej jak łabądź sunący po powierzchni wody. 
				Tata łabądź i mama łabądź to razem dwa łabędzie. Twoja mama i Twój tata także tworzą parę, czyli inaczej stanowią dwie osoby.
			</p>
		</div>

		<div class="example">
			<table class = "sheep_big center">
				<tr><td><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"></td></tr>
			</table>
			<p style="text-align: center">trzy: $3$</p>
			<p>
				Liczba trzy przez wielu uważana jest za magiczną. Chrześcijanie wyznają Świętą Trójkę składającą się z Ojca, Syna i Ducha Świętego. 
				W mowie codziennej słyszymy "do trzech razy sztuka". Nawet sama cyfra $3$ posiada trzy spiczaste wierzchołki.
			</p>
		</div>

		<div class="example">
			<table class = "sheep_big center">
				<tr><td><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"></td></tr>
			</table>
			<p style="text-align: center">cztery: $4$</p>
			<p>
				Twój pokój ma cztery ściany. Jak również cztery kąty. Gdybyś był niegrzeczny i musiał iść do kąta, mógłbyś wybrać jeden z czterech kątów w swoim pokoju.
				Według niektórych naukowców gdy widzimy zgromadzone blisko siebie cztery przedmioty, jesteśmy w stanie ogarnąć je wszystkie na raz wzrokiem i powiedzieć natychmiast "widzę cztery przedmioty".
				Jeśli jest ich więcej, zaczynami je podświadomie liczyć pojedynczo: jeden, dwa, trzy, cztery, pięć...
			</p>
		</div>

		<div class="example">
			<table class = "sheep_big center">
				<tr><td><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"></td></tr>
			</table>
			<p style="text-align: center">pięć: $5$</p>
			<p>
				Twoja ręka ma pięć palców. Za pomocą jednej ręki możesz policzyć do pięciu albo przybić komuś piątkę.
			</p>
		</div>

		<div class="example">
			<table class = "sheep_big center">
				<tr><td><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"></td></tr>
			</table>
			<p style="text-align: center">sześć: $6$</p>
			<p>
				Kostka do gry składa się z sześciu ścianek. Jeśli w wyniku dobrego rzutu kostką dostajesz sześć oczek, pewnie wygrywasz turę.	
				Jeśli w wyniku kilku dobrych strzałów dostajesz z testu szóstkę, wygrywasz życie.
			</p>
		</div>

		<div class="example">
			<table class = "sheep_big center">
				<tr><td><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"></td></tr>
			</table>
			<p style="text-align: center">siedem: $7$</p>
			<p>
				Poniedziałek, wtorek, środa, czwartek, piątek, sobota i niedziela to razem siedem dni tygodnia. 
				Pycha, chciwość, nieczystość, zazdrość, obżarstwo, gniew i lenistwo to razem siedem grzechów głównych.
				Chris, Vin, Lee, Britt, Bernardo, Harry i Chico to razem siedmiu wspaniałych.
			</p>
		</div>

		<div class="example">
			<table class = "sheep_big center">
				<tr><td><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"></td></tr>
			</table>
			<p style="text-align: center">osiem: $8$</p>
			<p>
				Ciężko coś powiedzieć o liczbie osiem oprócz tego że cyfra $8$ wygląda jak bałwanek albo odwrócone okulary.
			</p>
		</div>

		<div class="example">
			<table class = "sheep_big center">
				<tr><td><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"></td></tr>
			</table>
			<p style="text-align: center">dziewięć: $9$</p>
			<p>
				Dziewięć to ostatnia liczba która posiada swój własny unikalny symbol (cyfrę). Jest w niej coś ostatecznego, ale jakby napawającego nadzieją. Nadzieją, że uda nam się doliczyć do czegoś większego niż $9$.
			</p>
		</div>

		<p>
			Oczywiście entuzjazm pasterza nie ograniczy się do dziewięciu owiec. Pasterz może mieć ich sporo więcej:
		</p>
			
		<table class = "sheep_small center">
			<tr><td><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"></td></tr>
		</table>
		<p style="text-align: center">dziesięć</p>

		<table class = "sheep_small center">
			<tr><td><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"></td></tr>
		</table>
		<p style="text-align: center">jedenaście</p>

		<table class = "sheep_small center">
			<tr><td><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"></td></tr>
		</table>
		<p style="text-align: center">dwanaście</p>

		<table class = "sheep_small center">
			<tr><td><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"></td></tr>
		</table>
		<p style="text-align: center">trzynaście</p>

		<table class = "sheep_small center">
			<tr><td><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"></td></tr>
		</table>
		<p style="text-align: center">czternaście</p>

		<table class = "sheep_small center">
			<tr><td><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"></td></tr>
		</table>
		<p style="text-align: center">piętnaście</p>

		<table class = "sheep_small center">
			<tr><td><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"></td></tr>
		</table>
		<p style="text-align: center">szesnaście</p>

		<table class = "sheep_small center">
			<tr><td><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"></td></tr>
		</table>
		<p style="text-align: center">siedemnaście</p>

		<table class = "sheep_small center">
			<tr><td><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"></td></tr>
		</table>
		<p style="text-align: center">osiemnaście</p>

		<table class = "sheep_small center">
			<tr><td><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"></td></tr>
		</table>
		<p style="text-align: center">dziewiętnaście</p>

		<table class = "sheep_small center">
			<tr><td><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"></td></tr>
		</table>
		<p style="text-align: center">dwadzieścia</p>

		<table class = "sheep_small center">
			<tr><td><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"></td></tr>
		</table>
		<p style="text-align: center">dwadzieścia jeden</p>

		<table class = "sheep_small center">
			<tr><td><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"></td></tr>
		</table>
		<p style="text-align: center">dwadzieścia dwa</p>

		<table class = "sheep_small center">
			<tr><td><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"></td></tr>
		</table>
		<p style="text-align: center">dwadzieścia trzy</p>

		<table class = "sheep_small center">
			<tr><td><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"></td></tr>
		</table>
		<p style="text-align: center">dwadzieścia cztery</p>

		<table class = "sheep_small center">
			<tr><td><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"></td></tr>
		</table>
		<p style="text-align: center">dwadzieścia pięć</p>

		<table class = "sheep_small center">
			<tr><td><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"></td></tr>
		</table>
		<p style="text-align: center">dwadzieścia sześć</p>

		<table class = "sheep_small center">
			<tr><td><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"></td></tr>
		</table>
		<p style="text-align: center">dwadzieścia siedem</p>

		<table class = "sheep_small center">
			<tr><td><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"></td></tr>
		</table>
		<p style="text-align: center">dwadzieścia osiem</p>

		<table class = "sheep_small center">
			<tr><td><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"><img src="./.images//sheep.png"></td></tr>
		</table>
		<p style="text-align: center">dwadzieścia dziewięć</p>

		<p>
			W tej chwili entuzjazm pasterza przekracza rozmiar naszego podręcznika. Mimo tego owiec wciąż może być więcej. W sekcji "Od dziesięciu wzwyż" ustalimy, jak
			nazywamy i zapisujemy przy pomocy cyfr liczby większe niż zero, jeden, dwa, trzy, cztery, pięć, sześć, siedem, osiem i dziewięć.
		</p>
				
		<p>
			Pojęcie liczby najprościej uzmysłowić sobie poprzez ilość owiec w trzódce. Jednak liczba jako taka jest tworem znacznie bardziej 
			ogólnym i abstrakcyjnym niż owca. Liczba może dotyczyć jakiegokolwiek namacalnego obiektu. Możemy określić liczbę kupionych 
			samochodów, liczbę zjedzonych paluszków albo liczbę obalonych <span class="comment" id ="+18">flaszek</span>. 
			W matematyce jednak liczba występuje samodzielnie, jako twór 
			istniejący sam dla siebie i bez odniesienia do owiec ani flaszek. Matematyk po prostu przyjmuje, że jest coś takiego jak liczba jeden, 
			liczba dwa, liczba trzy itd., choć nic nie stoi na przeszkodzie, żeby dopowiedzieć sobie „jedna owca”, „dwie owce”, „trzy owce”. 
		</p>
				
		<p>
			Liczby, które do tej pory poznaliśmy, czyli $1$, $2$, $3$, $4$, $5$, 
			$6$, $7$, $…$ nazywamy właśnie liczbami naturalnymi.
		</p>
    </lesson-chapter>

    <lesson-chapter><template #title>Od dziesięciu wzwyż</template>   
		<p class = "type">
			Intuicje
		</p>

		<p>
			Liczba dziesięć zajmuje w naszym systemie liczbowym szczególne znaczenie. Człowiek mający obydwie ręce posiada dziesięć palców. Oprócz kilku innych zastosowań,
			są one szczególnie użyteczne w celu zliczania obiektów. Pasterz Eustachy wpuszcza swoje owce do zagrody. Chce się upewnić, że żadna z jego ukochanych
			podopiecznych nie zabłądziła, dlatego chce określić ich liczebność i upewnić się, wyszło mu tyle samo co wczoraj. Wpuszczając kolejne owce do zagrody,
			prostuje kolejne palce i przebiega myślami przez kolejne cyfry: $1$, $2$, $3$, $4$, $5$, $6$, $7$, $8$, $9$. Prostując ostatniego palca
			dobija do liczby dziesięć, którą zapisujemy symbolicznie jako $10$. Pasterzowi Eustachemu skończyły się palce, a owiec do zliczenia wciąż całe mnóstwo. 
			Eustachy prosi o pomoc swojego znajomego Wirgiliusza: "Wirgiliuszu, mój najdroższy, wyciągnij proszę palec". <span class="comment" id="I nastał spokój">
			I wtedy Wirgiliusz najdroższy wyciąga palec.</span> Palec jego (wyciągnięty) symbolizuje, że Eustachy doliczył do liczby dziesięć. Na to Eustachy chowa wszystkie
			palce i leci od nowa. Idąc dalej, Eustachy dociera do liczby jedenaście, którą zapiszemy jako $11$. Kolejno nadchodzą:
		</p>

		<table class = "center">
			<tr><td align = "right" style="padding-right: 20px">$10$</td><td>dziesięć</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$11$</td><td>jedenaście</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$12$</td><td>dwanaście</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$13$</td><td>trzynaście</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$14$</td><td>czternaście</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$15$</td><td>piętnaście</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$16$</td><td>szesnaście</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$17$</td><td>siedemnaście</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$18$</td><td>osiemnaście</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$19$</td><td>dziewiętnaście</td></tr>
		</table>

		<p>
			Liczby te zapisujemy za pomocą dwóch znaków: jedynki po lewej stronie i kolejnych cyfr po prawej stronie. Jedynka z przodu oznacza, że Wirgiliusz trzyma
			wyciągnięty jeden palec (który symbolizuje, że Eustachy dobił raz do pełnej dziesiątki). Cyfra po prawej stronie mówi, 
			ile palców w tej chwili prostuje Eustachy: żeby zliczyć owce, potrzebuje wszystkich dziesięciu palców i jeszcze TYLU. 
			Liczba $14$ to tyle co "wszystkie dziesięć palców i jeszcze $4$". Liczba $19$ to "wszystkie dziesięć palców i jeszcze dziewięć". 
		</p>

		<p>
				W tym momencie Eustachy znowu wyczerpał wszystkie palce, a nieugaszone jest jego pragnienie by liczyć dalej! 
				Eustachy po raz drugi wykorzystał obydwie dłonie, wobec czego zwraca się do Wirgiliusza z prośbą o wyciągnięcie drugiego palca.
				Pozwala swoim starym kostkom chwilę odpocząć, po czym zlicza kolejno:
		</p>


		<table class = "center">
			<tr><td align = "right" style="padding-right: 20px">$20$</td><td>dwadzieścia</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$21$</td><td>dwadzieścia jeden</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$22$</td><td>dwadzieścia dwa</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$23$</td><td>dwadzieścia trzy</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$24$</td><td>dwadzieścia cztery</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$25$</td><td>dwadzieścia pięć</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$26$</td><td>dwadzieścia sześć</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$27$</td><td>dwadzieścia siedem</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$28$</td><td>dwadzieścia osiem</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$29$</td><td>dwadzieścia dziewięć</td></tr>
		</table>

		<p>
				Cyfra $2$ po lewej stronie mówi "Eustachy już dwukrotnie wykorzystał wszystkie dziesięć palców", a cyfra po prawej stronie mówi "ponadto wykorzystał TYLE palców".
				Nietrudno przewidzieć, co będzie dalej. Wirgiliusz wyciąga trzeci palec, a Eustachy kontynuuje:
		</p>

		<table class = "center">
			<tr><td align = "right" style="padding-right: 20px">$30$</td><td>trzydzieści</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$31$</td><td>trzydzieści jeden</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$32$</td><td>trzydzieści dwa</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$33$</td><td>trzydzieści trzy</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$34$</td><td>trzydzieści cztery</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$35$</td><td>trzydzieści pięć</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$36$</td><td>trzydzieści sześć</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$37$</td><td>trzydzieści siedem</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$38$</td><td>trzydzieści osiem</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$39$</td><td>trzydzieści dziewięć</td></tr>
		</table>

		<p>
				Wtedy Wirgiliusz wyciąga czwarty palec, a wraz z nim nadchodzą liczby czterdzieści ($40$), czterdzieści jeden ($41$), czterdzieści dwa ($42$) itd. 
				Przy pięciu Wirgiliuszowych palcach będziemy mieli liczby o nazwach w stylu "pięćdziesiąt ...", następnie sześćdziesiąt, siedemdziesiąt, osiemdziesiąt i 
				dziewięćdziesiąt. W tym momencie historia zbliża się do punktu kulminacyjnego w postaci liczby dziewięćdziesiąt dziewięć: $99$. Teraz Eustachy wykorzystuje
				swojego dziesiątego palca i prosi Wirgiliusza o palcową celebrację kolejnej dziesiątki. 
				Wirgiliusz ku swojemu zaskoczeniu wykorzystał właśnie wszystkie dziesięć palców. Panika ogarnia go na myśl, że zostanie poproszony o dalsze odliczanie.
				Wypożycza więc do pomocy swojego syna, Zenona: "Zenonie, synu mój, wyprostuj palec swój i trzymaj go, kieruj go synu w stronę niebios". A Zenon,
				nie zadając pytań, kieruje palec swój w stronę niebios, symbolizując w ten sposób nową, potężną liczbę: sto, którą zapisuje się: $100$.
		</p>

		<p>
			W taki sposób trzem pasterzom upływa popołudnie. Owce wchodzą do zagrody, każdą owcę Eustachy uświetnia prostując kolejny palec, każde Eustachowe 
			dziesięć palców Wirgiliusz anonsuje podniesieniem swego kolejnego palca, a Zenon w tym czasie stoi i czeka, kierując swój palec w stronę niebios. I zliczają pasterze:
		</p>

		<table class = "center">
			<tr><td align = "right" style="padding-right: 20px">$100$</td><td>sto</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$101$</td><td>sto jeden</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$102$</td><td>sto dwa</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$103$</td><td>sto trzy</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$104$</td><td>sto cztery</td></tr>
			<tr><td align = "right" style="padding-right: 20px"></td><td>...</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$110$</td><td>sto dziesięć</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$111$</td><td>sto jedenaście</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$112$</td><td>sto dwanaście</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$113$</td><td>sto trzynaście</td></tr>
			<tr><td align = "right" style="padding-right: 20px"></td><td>...</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$120$</td><td>sto dwadzieścia</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$121$</td><td>sto dwadzieścia jeden</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$122$</td><td>sto dwadzieścia dwa</td></tr>
			<tr><td align = "right" style="padding-right: 20px"></td><td>...</td></tr>
		</table>

		<p>
			Po pewnym czasie krąg się zatacza, a Zenon wysuwa drugi palec, obwieszczając nadejście liczby dwieście. Po niej nadejdą (wraz z kolejnymi palcami Zenona)
			liczby trzysta, czterysta, pięćset, sześćset, siedemset, osiemset i dziewięćset. A gdy wszystkich palców zabraknie i trzech pasterzy nie wystarczy, nadejdą kolejni.
			Czwarty pasterz oznaczać będzie tysiąc zapisywany jako $1000$, dwa tysiące ($2000$), trzy tysiące ($3000$), cztery tysiące ($4000$), pięć tysięcy ($5000$), 
			sześć tysięcy ($6000$), siedem tysięcy ($7000$), osiem tysięcy ($8000$), dziewięć tysięcy ($9000$). Jeżeli Eustachy do zliczenia swoich owiec potrzebuje
			jeszcze większych liczb, niech Pan Bóg ma go w opiece.
		</p>
    </lesson-chapter>

    <lesson-chapter><template #title>Ile jest liczb?</template>   
		<p class = "type">
			Intuicje
		</p>

		<p>
			Cóż… ile chcesz. Gdy wydaje się już, że jakaś liczba jest olbrzymia, zawsze możemy znaleźć kolejną liczbę, która będzie 
			jeszcze większa. Zabawa zaczyna się od malutkich liczb:
		</p>
				
		<p style = "text-align: center">
			$1$, $2$, $3$, $4$, $5$, $6$, $7$, $8$, $9$
		</p>
				
		<p>
			Gdy napotykamy liczbę $9$ i zechcemy pójść dalej, dopisujemy po lewej stronie
			$1$, zaś samą cyfrę $9$ resetujemy do $0$. 
			Otrzymujemy $10$ i liczymy dalej: 
		</p>
			
		<p style = "text-align: center">
				$10$, $11$, $12$, $13$, $14$, $15$, $16$, $17$, $18$, $19$
		</p>
			
		<p>
			Aby utworzyć kolejną liczbę, cyfrę $1$ po lewej zamieniamy na następną (czyli $2$), a dziewiątkę znowu resetujemy do $0$:
		</p>
				
		<p style = "text-align: center">
			$20, 21, 22, 23, 24, 25, 26, 27, 28, 29,\\
			30, 31, 32, 33, 34, 35, 36, 37, 38, 39,\\
			40, 41, 42, 43, 44, 45, 46, 47, 48, 49,\\
			50, 51, 52, 53, 54, 55, 56, 57, 58, 59,\\
			60, 61, 62, 63, 64, 65, 66, 67, 68, 69,\\
			70, 71, 72, 73, 74, 75, 76, 77, 78, 79,\\
			80, 81, 82, 83, 84, 85, 86, 87, 88, 89,\\
			90, 91, 92, 93, 94, 95, 96, 97, 98, 99$  
		</p>
				
		<p>
			I co teraz? Z przodu, po lewej stronie dopisujemy $1$, a obydwie cyfry $9$ zamieniamy na $0$, otrzymując w ten sposób liczbę $100$. 
			Liczymy dalej:
		</p>
			
		<p style = "text-align: center">
			$100, 101, 102, 103, 104, 105, 106, 107, 108, 109,\\
			110, 111, 112, 113, 114, 115, 116, 117, 118, 119,\\
			120, …,\\
			130, …,\\
			140, …,\\
			150, …,\\
			160, …,\\
			170, …,\\
			180, …,\\
			190, …,\\
			200$
		</p>
			
		<p>
			Następnie przebiegniemy przez kolejne setki, mijając po drodze liczby $300$, $400$, $500$, $600$, $700$, $800$, $900$ aż do $999$.
			Nietrudno odgadnąć, co nastąpi po liczbie $999$: będzie to $1000$. Gdy przebrniemy już przez $2000$, 
			$3000$, $4000$, $5000$, $6000$, $7000$, 
			$8000$, $9000$, doliczymy do $10000$ (dziesięciu tysięcy). Możemy kontynuować takie postępowanie tak długo, jak potrzeba. W ten sposób odkryjemy tyle 
			liczb, ile chcemy. I nigdy nie dotrzemy do ostatniej. Możemy powiedzieć, że liczb jest <i>nieskończenie</i> wiele.
		</p>
		
		<p>
			Sporo liczb, również tych bardzo dużych, posiada swoje nazwy. Do tej pory dobrnęliśmy do dziesiątek, setek i tysięcy, ale istnieją liczby znacznie
			większe, dla których również wprowadzono pewne konwencje nazewnicze. Na końcu sekcji "Liczby giganty" możesz sprawdzić, jak słownie zapisać dowolną liczbę.
		</p>
    </lesson-chapter>

    <lesson-chapter><template #title>Trochę o nazewnictwie</template>   
		<p class = "type">
			Intuicje
		</p>
			
		<p>
			Jeśli do zapisu liczby używamy jednej cyfry, to jest to <i>liczba jednocyfrowa</i>. Liczby jednocyfrowe to $0$, $1$, 
			$2$, $3$, $4$, $5$, $6$, $7$, 
			$8$, $9$. 
			Jeśli zapis liczby wymaga użycia dwóch cyfr, to jest to <i>liczba dwucyfrowa</i>. Liczby dwucyfrowe to m.in.  
			$10$, $11$, $12$, $13$, $20$, 
			$35$, $67$, $89$, $91$, $99$. 
			W ten sam sposób określamy <i>liczbę trzycyfrową</i>, <i>liczbę czterocyfrową</i> itd. 
		</p>
				
		<p>
			Zawsze cyfra stojąca najbardziej z prawej nazywana jest <i>cyfrą jedności</i>.
		</p>
		
		<ul>
			<li>W liczbie $26$ cyfrą jedności jest $6$.</li>
			<li>W liczbie $769$ cyfrą jedności jest $9$.</li>
			<li>W liczbie $100477$ cyfrą jedności jest $7$.</li>
		</ul>
		
		<p>
			Cyfra stojąca po lewej od cyfry jedności to <i>cyfra dziesiątek</i>. 
		</p>
		
		<ul>
			<li>W liczbie $97$ cyfrą dziesiątek jest $9$.</li>
			<li>W liczbie $4782$ cyfrą dziesiątek jest $8$.</li>
			<li>Liczba $7$ nie posiada cyfry dziesiątek.</li>
		</ul>
		
		<p>
			Cyfra stojąca po lewej od cyfry dziesiątek to <i>cyfra setek</i>. Cyfra stojąca po lewej od cyfry setek to <i>cyfra tysięcy</i>. 
			Tutaj matematykom przeszła chęć na kontynuowanie nazewnictwa.
		</p>
			
		<p>
			Nie należy mylić pojęcia liczby z pojęciem cyfry. Liczba ma matematyczną wartość i to na liczbach niedługo będziemy 
			wykonywali <span class="comment" id ="Jeśli odezwał się w tobie skryty chirurg, to rozminąłeś się z powołaniem.">operacje</span>.
			Cyfra jest niczym więcej niż graficznym sposobem na zapisanie liczby. Można powiedzieć, że cyfry są 
			tym dla liczb, czym litery dla słów.
		</p>
    </lesson-chapter>

    <lesson-chapter><template #title>Porównywanie liczb</template>   
		<p class = "type">
			Intuicje
		</p>
			
		<p>
			Pasterz miał $7$ owiec. W ciemnej dolinie odnalazł zbłąkaną owieczkę, więc <span class="comment" id="Przez wzgląd na swoje imię.">poprowadził ją właściwą ścieżką.
			</span> Teraz ma już $8$ owieczek. 
			Trudno się nie zgodzić, że teraz pasterz ma więcej owieczek niż do tej pory, czyli mówiąc inaczej, przedtem miał mniej niż ma teraz. 
			W ten sam sposób, jeśli pasterz Eustachy ma $18$ owieczek, a pasterz Wirgiliusz ma $67$ owieczek, to Eustachy jest zazdrosny.
		</p>
			
		<p>
			Spostrzeżenia, których dokonaliśmy, to matematycznie rzecz biorąc porównanie liczb. Ponieważ matematyków bardzo często interesuje, 
			czy jedna liczba jest większa od drugiej, wprowadzono specjalne znaczki na określenie mniejszości lub większości. 
			Stwierdzenie „Liczba $7$ jest mniejsza niż $8$” zapiszemy jako
		</p>
			
		$$7 \lt 8$$
			
		<p>
			Zaś stwierdzenie „$67$ to więcej niż $18$” zapisujemy jako
		</p>
			
		$$67 \gt 18$$
			
		<p>
			Te dziubaski to operatory porównania. Łatwo zapamiętać, w którą stronę należy obrócić dziubaska: 
		</p>
			
		<table class = "center">
			<tr>
				<td style = "font-size: 80px">$67$</td>
				<td>
					<svg height="100" width="100">
						<defs>
							<linearGradient id="gradient">
								<stop offset="20%" stop-color="#C33" />
								<stop offset="90%" stop-color="#833" />
							</linearGradient>
						</defs>
						<polygon points="0,0 100,50 0,100"/>
					</svg>
				</td>
				<td>$18$</td>
			</tr>
		</table>
			
		<p>
			Gdy dostajemy dwie liczby, zawsze jesteśmy w stanie je porównać, czyli stwierdzić, czy jedna z nich jest większa, 
			czy mniejsza od drugiej. Czasami jednak może się zdarzyć, że ktoś spyta nas o porównanie liczb, które są takie same. 
			Jeśli pasterz Eustachy ma $18$ owieczek, a pasterz Euzebiusz też ma $18$ owieczek, to Eustachy i Euzebiusz żyją w zgodzie. 
			Zapisujemy to za pomocą znaku równości:
		</p>
			
		$$18 = 18$$
			
		<p>
			Znaczek $=$ jest symbolem matematycznym, który czytamy jako „równa się” albo „jest równe”. Mówi on tyle, że po jego lewej stronie 
			jest to samo, co po prawej stronie.
		</p>

		<p class = "type">
			Rozszerzenie
		</p>
			
		<p>
			Czasami porównanie liczb pozwala na wprowadzenie pewnego kryterium. Gdy w ruchu drogowym uzbierasz więcej niż $24$ punkty karne, 
			tracisz prawo jazdy. 
		</p>
			
		<ul>
			<li>Pan Zygfryd ma $30$ punktów karnych, więc przekroczył dozwolony limit ($30 \gt 24$).</li>
			<li>Pan Janusz ma $10$ punktów karnych, więc chwilowo jest bezpieczny ($10 \lt 24$).</li>
			<li>Stefan ma $24$ punkty karne. Żyje na krawędzi ($24 = 24$).</li>
		</ul>
			
		<p>
			W tym przypadku kryterium można sformułować tak: Tracisz prawo jazdy, jeśli
		</p>
			
		$$\text{liczba&nbsp;punktów&nbsp;karnych} \gt 24$$
			
		<p>
			Zobaczmy inny przykład. Aby zostać przyjętym do elitarnej szkoły imienia Kujona Kołłątaja, należy uzyskać z egzaminu wstępnego przynajmniej ocenę $4$.
		</p>
			
		<ul>
			<li>Michaś dostał z egzaminu $2$. Członkowie komisji rekrutacyjnej wzgardzili jego osobą ($2 \lt 4$).</li>
			<li>Onufry dostał z egzaminu $6$. Zostaje przyjęty z otwartymi ramionami ($6 \gt 4$).</li>
			<li>Maciuś dostał z egzaminu $4$. Zostaje przyjęty, chociaż wszyscy krzywo na niego patrzą ($4 = 4$).</li>
		</ul>
			
		<p>
			Tym razem kryterium można zapisać w taki sposób: Zostajesz przyjęty do koła, jeśli
		</p>
			
		<p style = "text-align: center">
			$\text{ocena&nbsp;z&nbsp;egzaminu} \gt 4$ <br>
			lub <br>
			$\text{ocena&nbsp;z&nbsp;egzaminu} = 4$
		</p>
			
		<p>
			Ponieważ zapis ten jest trochę przydługi, wprowadzono symbol uogólniający te dwa fakty:
		</p>
			
		$$ \text{ocena&nbsp;z&nbsp;egzaminu} \geq 4 $$
			
		<p>
			Operator $\geq$ czytamy „większe lub równe” albo krócej „większe równe”. Podobne znaczenie ma operator $\leq$ („mniejsze równe”). 
			Więcej przygód z tymi wszystkimi dziubaskami czeka w temacie „Nierówności”.
		</p>
    </lesson-chapter>

    <lesson-chapter><template #title>Czy zero jest liczbą naturalną?</template>   
		<p class = "type">
			Rozszerzenie
		</p>

		<p>
			Wśród matematyków na całym świecie panuje niezgoda, czy liczbę $0$ powinno się traktować jako naturalną, czy też nie. Krótko mówiąc, odpowiedź zależy od tego, czy masz w sobie duszę programisty. 
		</p>


		<p>
			Liczby naturalne służą w matematyce do wprowadzania porządku. Mają na celu wskazanie "miejsca w którym zaczynamy", a następnie pojedynczych "kroków wprzód".
			Stosujemy liczby naturalne, gdy chcemy policzyć kolejno owce w zagrodzie. Albo dzieci na wycieczce szkolnej. Albo dzieci w zagrodzie. Numerujemy po kolei
			dni miesiąca. Numerujemy lata, które upływają. Numerujemy przykazania w dekalogu. Odliczamy sekundy, gdy sprawdzamy, jak długo umiemy wstrzymać oddech.
		</p>

		<p>
			I teraz pytanie brzmi: czy jeśli coś numerujesz po kolei, to zaczynasz od zera, czy od jedynki? Jest to kwestia sporna, która mogłaby poróżnić ludzi.
			<span class="comment" id="właściwie to dziwne, że nie było o to wojny">A zwłaszcza matematyków.</span> Większość osób zapewne powiedziałaby, że
			numeruje rzeczy od jedynki. Taka numeracja przychodzi, chciałoby się powiedzieć, naturalnie, gdy liczymy po kolei jakieś przedmioty: mam jeden żeton, dwa żetony, trzy żetony itd.
			Jednak gdy odliczamy, ile sekund minęło od pewnego wydarzenia, powinniśmy zaczynać od zera. Powiedzmy, że Maciuś spuszcza kamyczek z trzeciego piętra i 
			odlicza w głowie, ile sekund minie do chwili stuknięcia kamyczka o ziemię. W momencie, gdy Maciuś wypuszcza kamyk z ręki, powinien zacząć odliczanie 
			mówiąc: zero. Po sekundzie powinien odliczyć: jeden. Następnie "dwa". Wtedy kamyczek upada na ziemię. Gdyby Maciuś rozpoczął odliczanie od jedynki, sfałszowałby wynik o sekundę.
		</p>

		<p>
			W większości języków programowania istnieją struktury zwane "tablicami" które pozwalają przechowywać dane w uporządkowany sposób. W większości języków (choć nie w kazdym) odwołujemy się do elementów tablicy, rozpoczynając od zerowego. Jeśli w języku programowania pierwszy element oznaczany jest numerem $1$, to język ten po prostu nie jest szanowany.
		</p>

		<p>
			Tak więc, jeśli w środowisku matematycznym ktoś mówi o liczbach naturalnych, nigdy nie wiadomo, czy ma na myśli liczby włącznie z zerem, czy bez niego.
			Przeważnie nie ma to znaczenia. Jeśli ma, powinno się tę kwestię doprecyzować. Według matematyki Squirrel-Math, zero jest uznawane za liczbę naturalną.
		</p>
    </lesson-chapter>

    <lesson-chapter><template #title>Liczby giganty</template> 
		<p class = "type">
			Rozszerzenie
		</p>
			
		<p>
			Liczb naturalnych naprawdę jest nieskończenie wiele, więc matematycy/poloniści nie podołali wyzwaniu wymyślenia nazw dla 
			nich wszystkich. Postarali się jednak na tyle, aby nazwać wszystkie liczby, z jakimi w praktyce kiedykolwiek będziesz mieć do 
			czynienia. Kolejne nazwy wyglądają z grubsza tak:
		</p>
				
		<table class = "center">
			<tr><td align = "right" style="padding-right: 20px">$1$</td><td>jeden</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$10$</td><td>dziesięć</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$100$</td><td>sto</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$1\ 000$</td><td>tysiąc</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$10\ 000$</td><td>dziesięć tysięcy</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$100\ 000$</td><td>sto tysięcy</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$1\ 000\ 000$</td><td>milion</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$10\ 000\ 000$</td><td>dziesięć milionów</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$100\ 000\ 000$</td><td>sto milionów</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$1\ 000\ 000\ 000$</td><td>miliard</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$10\ 000\ 000\ 000$</td><td>dziesięć miliardów</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$100\ 000\ 000\ 000$</td><td>sto miliardów</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$1\ 000\ 000\ 000\ 000$</td><td>bilion</td></tr>
		</table>
				
		<p>
			Żeby odczytanie tych liczb było łatwiejsze, przeważnie stosuje się odstęp pomiędzy kolejnymi partiami trzech zer. 
			Liczbę $136\ 747\ 980\ 490\ 006$ można zapisać oczywiście bez odstępów jako $136747980490006$. Sam oceń, który zapis jest przystępniejszy. 
			Czasem zamiast odstępów stosuje się też kropki: $136.747.980.490.006$. <span class="comment" id='Jak dotrzesz do tematu "Ułamki dziesiętne", 
			to zrozumiesz'>Nie polecamy jednak tej metody</span>.     
		</p>
			
		<p>
			Istotną zmianę w nazewnictwie obserwujemy dopiero „co trzy cyfry”. „Milion” wałkowany jest w formie dziesięciu milionów oraz 
			stu milionów. W ten sam sposób miliard, bilion i wszystkie następne wystąpią z dopiskiem dziesięć oraz sto. Skupmy się na tym, 
			co najciekawsze:
		</p>
			
		<table class="center">
			<tr><td align = "right" style="padding-right: 20px">$1\ 000\ 000\ 000\ 000\ 000$</td><td>biliard</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$1\ 000\ 000\ 000\ 000\ 000\ 000$</td><td>trylion</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$1\ 000\ 000\ 000\ 000\ 000\ 000\ 000$</td><td>tryliard</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$1\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000$</td><td>kwadrylion</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$1\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000$</td><td>kwadryliard</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$1\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000$</td><td>kwintylion</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$1\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000$</td><td>kwintyliard</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$1\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000$</td><td><span class="comment" id="Wiem o czym myślisz, perwersie">sekstylion</span></td></tr>
			<tr><td align = "right" style="padding-right: 20px">$1\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000$</td><td>sekstyliard</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$1\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000$</td><td>septylion</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$1\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000$</td><td>septyliard</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$1\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000$</td><td>oktylion</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$1\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000$</td><td>oktyliard</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$1\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000$</td><td>nonylion (lub nonilion)</td></tr>
			<tr><td align = "right" style="padding-right: 20px">$1\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000\ 000$</td><td>nonyliard (lub noniliard)</td></tr>
		</table>
			
		<p>
			W nazewnictwie możemy dostrzec pewną tendencję – na przemian występują przyrostki 
			-lion oraz –liard. Z kolei podstawy tych wyrazów: mi-, bi-, try-, kwadry- , kwinty-, seksty-, septy-, okty-, nony- pochodzą od 
			liczebników łacińskich. 
		</p>
			
		<p>
			Ponieważ zapis powyższych liczb powoli staje się uciążliwy, możemy dać Ci ruszyć wyobraźnią i powiedzieć, że:
		</p>

		<ul>
			<li>milion to jedynka i $6$ zer</li>
			<li>miliard to jedynka i $9$ zer</li>
			<li>bilion to jedynka i $12$ zer, </li>
		</ul>

		<ul>
			<li>noniliard to jedynka i $57$ zer</li>
			<li>decylion to jedynka i $60$ zer</li>
			<li>decyliard to jedynka i $63$ zera</li>
			<li>undecylion to jedynka i $66$ zer</li>
			<li>undecyliard to jedynka i $69$ zer</li>
			<li>duodecylion to jedynka i $72$ zera</li>
			<li>duodecyliard to jedynka i $75$ zer</li>
			<!--trzeba poszukać w źródłach czy po drodze nie ma nic więcej-->
			<li>googol to jedynka i $100$ zer</li>
			<li>trycylion to jedynka i $180$ zer</li>
			<li>trycyliard to jedynka i $183$ zera</li>
			<li>kwadragilion to jedynka i $240$ zer</li>
			<li>kwadragiliard to jedynka i $243$ zera</li>
			<li>oktogilion to jedynka i $480$ zer</li>
			<li>oktogiliard to jedynka i $483$ zera</li>
			<li>centylion to jedynka i $600$ zer</li>
			<li>centyliard to jedynka i $603$ zera</li>
			<li>googolplex to jedynka i googol zer </li>   
		</ul>
		<!--przykłady poniżej trzeba by zweryfikować / wymyślić inne-->
		<p>
			<span class="comment" id="Spokojnie, my też nie.">Prawdopodobnie nie uzmysławiasz sobie, jak wielkie są te liczby</span>. 
			Liczba wszystkich ludzi na świecie wynosi trochę ponad 
			<span class="comment" id = "Jeśli czytasz to w przyszłości, wspomnij stare dobre czasy.">$7\ 000\ 000\ 000$</span>. 
			Liczba gwiazd w naszej 
			galaktyce to około $100\ 000\ 000\ 000$. Szacuje się, że w całym Wszechświecie 
			jest $40\ 000\ 000\ 000\ 000\ 000\ 000\ 000$ planet. 
			Liczbę <span class = "comment_visible" id ="Jeśli nie wiesz, czym jest atom, przyjmij, że jedynka i 80 zer to BARDZO dużo.">atomów</span>
			w całym Wszechświecie zapisujemy jako jedynkę i $80$ zer. <span class="comment" id = "Googolplex to jedynka i googol zer. Zaś googol jest liczbą większą
			niż liczba atomów we wszechświecie. Nawet gdyby posłużyć się jednym atomem do zapisania jednego zera tej liczby, Wszechświat wciąż będzie na to za mały.">Nie da się zapisać 
			wszystkich cyfr liczby googolplex</span>. 
		</p>
				
		<p>
			Jeśli powyższe kompendium wzbudza w Tobie trwogę, możesz tu z pełną dowolnością sprawdzić pisownię jakiejkolwiek liczby:
		</p>

		<div style="text-align: center">
			<input style="width: 800px" type="text" id="number_to_str" />
			<center>
				<div id="out_mask" style="overflow: hidden; transition: height 1s ease; border: 1px solid #dddddd; border-top: none; width: 797px; display: block; margin-top: -10px">
					<div class="center" id="out" style="padding: 30px 20px 30px 20px; font-size: 0.8em"></div>
				</div>
			</center>
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
  name: "Liczba",
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
	.sheep_big img
	{
		height: 70px;
	}

	.sheep_big
	{
		margin-bottom: -0.5em;
	}

	.sheep_small img
	{
		height: 30px;
	}

	.sheep_small
	{
		margin-bottom: -1em;
	}
</style>
