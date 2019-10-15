<template>
  <lesson routeShortVersion="/podzielnosc-liczb-short" routeLongVersion="/podzielnosc-liczb">
    <lesson-title>Podzielność liczb</lesson-title>

    <lesson-intro>
	<p>
		Uwaga: Lekcja ociera się o dział matematyki zwany <i>teorią liczb</i>. <comment text="Może zawierać śladowe ilości orzechów arachidowych.">
		Temat zawiera duże ilości nowych pojęć, twierdzeń i zależności.</comment> Wchodzisz na własne ryzyko. 
	</p>
		
	<p>
		W temacie o dzieleniu napotkaliśmy na problem, próbując rozłożyć $7$ kamieni na $3$
		równe grupy. Z drugiej strony podzielenie 
		$75$ pierogów pomiędzy $15$ gości nie sprawiło większych trudności. 
		Na czym polega różnica?
	</p>
	</lesson-intro>

    <lesson-chapter><template #title>Trochę słownictwa</template>
	<p class = "type">
		Intuicje
	</p>

	<p>
		Istotna różnica jest taka, że $7 : 3$ to przykład dzielenia z resztą, a $75 : 15$ 
		to dzielenie bez reszty. Mówimy, że $7$ 
		daje resztę $1$ przy dzieleniu przez $3$ lub inaczej, że nie <i>dzieli się</i> przez 
		$3$. Z kolei $75$ dzieli się przez $15$, 
		ponieważ dzielenie $75 : 15$ nie daje reszty. Mówimy, że liczba jest <i>podzielna</i> przez drugą liczbę, jeśli nie 
		daje reszty przy dzieleniu.
	</p>

	<ul>
		<li>$75$ jest podzielne przez $15$, ponieważ $75 : 15 = 5$</li>
		<li>$7$ nie jest podzielne przez $3$, ponieważ $7 : 3 = 2 \ r. 1$</li>
		<li>$20$ jest podzielne przez $10$, ponieważ $20 : 10 = 2$</li>
		<li>$20$ nie jest podzielne przez $9$, ponieważ $20 : 9 = 2 \ r. 2$</li>
	</ul>
	
	<p>
		Matematycy używają czasem też sformułowania, że jedna liczba <i>dzieli</i> drugą liczbę. Powiedzą więc, że 
	</p>

	<ul>
		<li>$15$ dzieli $75$</li>
		<li>$10$ dzieli $20$</li>
		<li>$3$ nie dzieli $7$</li>
		<li>$9$ nie dzieli $20$</li>
	</ul>

	<p>
		Ponieważ zapisanie sześcioliterowego słowa „dzieli” przerasta ambicje matematyków, wprowadzono w jego miejsce symbol $|$ . 
		Z kolei zamiast słownego „nie dzieli” mamy symbol $∤$ . Wbrew pozorom nie jest to litera ł. Jest to 
		przekreślona pionowa kreska. To istotna różnica. Powyższe stwierdzenia możemy zapisać symbolicznie:
	</p>

	<ul>
		<li>$15 \mid 75$</li>
		<li>$10 \mid 20$</li>
		<li><comment text='czyt. „trzy nie dzieli siedmiu” - nie zaś „trzyłsiedem”'>$3 ∤ 7$</comment></li>
		<li><comment text='czyt. „dziewięć nie dzieli dwudziestu” - nie zaś „dziewięćłdwadzieścia'>$9 ∤ 20$</comment></li>
	</ul>
    </lesson-chapter>

    <lesson-chapter><template #title>Cechy podzielności</template>   
	<p class = "type">
		Intuicje
	</p>

	<p>
		W jaki sposób stwierdzić, że jedna liczba jest podzielna przez drugą? Możemy spróbować wykonać dzielenie i sprawdzić, 
		czy otrzymamy resztę. Zobaczmy dla przykładu, jak to jest z dzieleniem przez $2$.
	</p>

	<ul>
		<li>$1$ nie jest podzielne przez $2$, bo $1 : 2 = 0 \ r. 1$</li>
		<li>$2$ jest podzielne przez $2$, bo $2 : 2 = 1$</li>
		<li>$3$ nie jest podzielne przez $2$, bo $3 : 2 = 1 \ r. 1$</li>
		<li>$4$ jest podzielne przez $2$, bo $4 : 2 = 2$</li>
		<li>$5$ nie jest podzielne przez $2$, bo $5 : 2 = 2 \ r. 1$</li>
		<li>$6$ jest podzielne przez $2$, bo $6 : 2 = 3$</li>
		<li>$7$ nie jest podzielne przez $2$, bo $7 : 2 = 3 \ r. 1$</li>
		<li>$8$ jest podzielne przez $2$, bo $8 : 2 = 4$</li>
		<li>$9$ nie jest podzielne przez $2$, bo $9 : 2 = 4 \ r. 1$</li>
		<li>$10$ jest podzielne przez $2$, bo $10 : 2 = 5$</li>
	</ul>

	<p>
		Nasuwa się pewna tendencja - kolejne liczby są na przemian podzielne przez $2$ i niepodzielne przez 
		$2$. Ponieważ problem 
		podzielności przez $2$ pojawia się w matematyce stosunkowo często, wprowadzono dodatkowe nazwy: 
	</p>

	<ul>
		<li><i>liczba parzysta</i> to liczba podzielna przez $2$</li>
		<li><i>liczba nieparzysta</i> to liczba niepodzielna przez $2$</li>
	</ul>

	<p>
		Gdy nabierzemy wprawy, jesteśmy w stanie bez wykonania dzielenia stwierdzić, czy dana liczba jest podzielna, czy też nie. 
		Pomagają nam w tym cechy podzielności.
	</p>

	<div class="example">
		<p>
			Cecha podzielności przez $1$:
		</p>
		<p class="formula">
			Każda liczba jest podzielna przez $1$.
		</p>
		<p>
			Co do tego raczej nie ma wątpliwości. Gdy podzielimy dowolną liczbę przez $1$, otrzymamy tą samą liczbę.
		</p>
	</div>
		
	<div class="example">
		<p>
			Cecha podzielności przez $2$:
		</p>
		<p class = "formula">
			Liczba jest podzielna przez $2$ wtedy i tylko wtedy, gdy jej ostatnią cyfrą jest 
			$0$, $2$, $4$, $6$ lub 
			$8$.
		</p>
		<ul>
			<li>$18$ jest podzielne przez $2$, ponieważ ostatnią cyfrą jest $8$.</li>
			<li>$10000$ jest podzielne przez $2$, ponieważ ostatnią cyfrą jest $0$.</li>
			<li>$23 789 264$ jest podzielne przez $2$, ponieważ ostatnią cyfrą jest $4$.</li>
		</ul>
	</div>
	
	<div class="example">	
		<p>
			Cecha podzielności przez $3$:
		</p>
		<p class ="formula">
			Liczba jest podzielna przez $3$ wtedy i tylko wtedy, gdy suma jej cyfr jest podzielna przez $3$.
		</p>
		<ul>
			<li>$123$ jest podzielne przez $3$, ponieważ $1 + 2 + 3 = 6$ jest podzielne przez $3$.</li>
			<li>$3000$ jest podzielne przez $3$, ponieważ $3 + 0 + 0 + 0 = 3$ jest podzielne przez $3$.</li>
			<li>$100 010 001$ jest podzielne przez $3$, ponieważ $1 + 0 + 0 + 0 + 1 + 0 + 0 + 0 + 1 = 3$ jest podzielne przez $3$.</li>
		</ul>
	</div>
		
	<div class="example">
		<p>
			Cecha podzielności przez $4$:
		</p>
		<p class ="formula">
			Liczba jest podzielna przez $4$ wtedy i tylko wtedy, gdy jej dwie ostatnie cyfry tworzą liczbę podzielną przez 
			$4$.
		</p>
		<p>
			Zasada ta jest pomocna tylko w przypadku liczb trzycyfrowych lub większych.
		</p>
		<ul>
			<li>$124$ jest podzielne przez $4$, ponieważ $24$ jest podzielne przez $4$.</li>
			<li>$1000$ jest podzielny przez $4$, <comment text="Dokładniej 00">ponieważ $0$</comment> jest podzielne przez $4$.</li>
			<li>$12 894 782 712$ jest podzielne przez $4$, ponieważ $12$ jest podzielne przez $4$.</li>
		</ul>
	</div>
	
	<div class="example">
		<p>
			Cecha podzielności przez $5$:
		</p>
		<p class ="formula">
			Liczba jest podzielna przez $5$ wtedy i tylko wtedy, gdy jej ostatnią cyfrą jest $0$ lub $5$.
		</p>
		<ul>
			<li>$125$ jest podzielne przez $5$, ponieważ ostatnią cyfrą jest $5$.</li>
			<li>$10 000$ jest podzielne przez $5$, ponieważ ostatnią cyfrą jest $0$.</li>
			<li>$4 847 968 475$ jest podzielne przez $5$, ponieważ ostatnią cyfrą jest $5$.</li>
		</ul>
	</div>
		
	<div class="example">	
		<p>
			Cecha podzielności przez $8$:
		</p>
		<p class ="formula">
			Liczba jest podzielna przez $8$ wtedy i tylko wtedy, gdy jej trzy ostatnie cyfry tworzą liczbę podzielną przez 
			$8$. 
		</p>
		<p>
			Zasada ta jest pomocna tylko w przypadku liczb czterocyfrowych lub większych.
		</p>
		<ul>
			<li>$1008$ jest podzielne przez $8$, ponieważ $8$ jest podzielne przez $8$.</li>
			<li>$100 024$ jest podzielne przez $8$, ponieważ $24$ jest podzielne przez $8$.</li>
			<li>$224 797 438 128$ jest podzielne przez $8$, ponieważ $128$ jest podzielne przez $8$.</li>
		</ul>
	</div>
		
	<div class="example">
		<p>
			Cecha podzielności przez $9$:
		</p>
		<p class ="formula">
			Liczba jest podzielna przez $9$ wtedy i tylko wtedy, gdy suma jej cyfr jest podzielna przez $9$. 
		</p>
		<ul>
			<li>$153$ jest podzielne przez $9$, ponieważ $1 + 5 + 3 = 9$ jest podzielne przez $9$.</li>
			<li>$111 111 111$ jest podzielne przez $9$, ponieważ $1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 = 9$ jest podzielne przez $9$.</li>
			<li>$123 456 789$ jest podzielne przez $9$, ponieważ $1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 = 45$ jest podzielne przez $9$.</li>
		</ul>
	</div>
		
	<div class="example">
		<p>
			Cecha podzielności przez $10$:
		</p>
		<p class ="formula">
			Liczba jest podzielna przez $10$ wtedy i tylko wtedy, gdy jej ostatnią cyfrą jest $0$. 
		</p>
		<ul>
			<li>$20$ jest podzielne przez $10$, ponieważ ostatnią cyfrą jest $0$.</li>
			<li>$1 000 000$ jest podzielny przez $10$, ponieważ ostatnią cyfrą jest $0$.</li>
			<li>$364 683 980$ jest podzielne przez $10$, ponieważ ostatnią cyfrą jest $0$.</li>
		</ul>
	</div>
		
	<p>
		Tajemnicze może wydawać się milczenie na temat cechy podzielności przez $6$. Zauważmy, że $6 = 2 \cdot 3$. 
		Wypiszmy kilka 
		początkowych liczb naturalnych. W pierwszym rządku wyróżnimy liczby podzielne przez $2$, 
		w drugim rządku liczby podzielne 
		przez $3$, a w trzecim liczby podzielne przez $6$.
	</p>

	<table style="color: #AAAAAA; width: 100%">
		<tr>
			<td>1</td>
			<td style="color: 994444; font-weight: bold">2</td>
			<td>3</td>
			<td style="color: 994444; font-weight: bold">4</td>
			<td>5</td>
			<td style="color: 994444; font-weight: bold">6</td>
			<td>7</td>
			<td style="color: 994444; font-weight: bold">8</td>
			<td>9</td>
			<td style="color: 994444; font-weight: bold">10</td>
			<td>11</td>
			<td style="color: 994444; font-weight: bold">12</td>
			<td>13</td>
			<td style="color: 994444; font-weight: bold">14</td>
			<td>15</td>
			<td style="color: 994444; font-weight: bold">16</td>
			<td>17</td>
			<td style="color: 994444; font-weight: bold">18</td>
			<td>19</td>
			<td style="color: 994444; font-weight: bold">20</td>
			<td>21</td>
			<td style="color: 994444; font-weight: bold">22</td>
			<td>23</td>
			<td style="color: 994444; font-weight: bold">24</td>
			<td>25</td>
			<td style="color: 994444; font-weight: bold">26</td>
			<td>27</td>
			<td style="color: 994444; font-weight: bold">28</td>
			<td>29</td>
			<td style="color: 994444; font-weight: bold">30</td>
		</tr>
		<tr>
			<td>1</td>
			<td>2</td>
			<td style="color: 994444; font-weight: bold">3</td>
			<td>4</td>
			<td>5</td>
			<td style="color: 994444; font-weight: bold">6</td>
			<td>7</td>
			<td>8</td>
			<td style="color: 994444; font-weight: bold">9</td>
			<td>10</td>
			<td>11</td>
			<td style="color: 994444; font-weight: bold">12</td>
			<td>13</td>
			<td>14</td>
			<td style="color: 994444; font-weight: bold">15</td>
			<td>16</td>
			<td>17</td>
			<td style="color: 994444; font-weight: bold">18</td>
			<td>19</td>
			<td>20</td>
			<td style="color: 994444; font-weight: bold">21</td>
			<td>22</td>
			<td>23</td>
			<td style="color: 994444; font-weight: bold">24</td>
			<td>25</td>
			<td>26</td>
			<td style="color: 994444; font-weight: bold">27</td>
			<td>28</td>
			<td>29</td>
			<td style="color: 994444; font-weight: bold">30</td>
		</tr>
		<tr>
			<td>1</td>
			<td>2</td>
			<td>3</td>
			<td>4</td>
			<td>5</td>
			<td style="color: 994444; font-weight: bold">6</td>
			<td>7</td>
			<td>8</td>
			<td>9</td>
			<td>10</td>
			<td>11</td>
			<td style="color: 994444; font-weight: bold">12</td>
			<td>13</td>
			<td>14</td>
			<td>15</td>
			<td>16</td>
			<td>17</td>
			<td style="color: 994444; font-weight: bold">18</td>
			<td>19</td>
			<td>20</td>
			<td>21</td>
			<td>22</td>
			<td>23</td>
			<td style="color: 994444; font-weight: bold">24</td>
			<td>25</td>
			<td>26</td>
			<td>27</td>
			<td>28</td>
			<td>29</td>
			<td style="color: 994444; font-weight: bold">30</td>
		</tr>
	</table>

	<p>
		Widzimy, że jeśli liczba jest podzielna przez $2$ i jest podzielna przez $3$, 
		to jest też podzielna przez $6$.
	</p>
	
	<div class="example">
		<p>
			Cecha podzielności przez $6$
		</p>
		<p class="formula">
			Liczba jest podzielna przez $6$ wtedy i tylko wtedy, gdy jest podzielna przez 
			$2$ i przez $3$.
		</p>
		<ul>
			<li>$24$ jest podzielne przez $6$, ponieważ ostatnią cyfrą jest $4$, a suma cyfr $2 + 4 = 6$ jest podzielna przez $3$.</li>
			<li>$330$ jest podzielne przez $6$, ponieważ ostatnią cyfrą jest $0$, a suma cyfr $3 + 3 + 0 = 6$ jest podzielna przez $3$.</li>
			<li>$14 718$ jest podzielne przez $6$, ponieważ ostatnią cyfrą jest $8$, a suma cyfr $1 + 4 + 7 + 1 + 8 = 21$ jest 
			podzielna przez $3$.</li>
		</ul>
	</div>
	
	<p>
		Podobne reguły możemy tworzyć samodzielnie także dla innych liczb. Przykładowo $15 = 3 \cdot 5$, więc 
	</p>
	
	<p class = "formula">
		Liczba jest podzielna przez $15$ wtedy i tylko wtedy, gdy jest podzielna przez $3$ i przez $5$.
	</p>

	<table style="color: #AAAAAA; width: 100%">
		<tr>
			<td>1</td>
			<td>2</td>
			<td style="color: 994444; font-weight: bold">3</td>
			<td>4</td>
			<td>5</td>
			<td style="color: 994444; font-weight: bold">6</td>
			<td>7</td>
			<td>8</td>
			<td style="color: 994444; font-weight: bold">9</td>
			<td>10</td>
			<td>11</td>
			<td style="color: 994444; font-weight: bold">12</td>
			<td>13</td>
			<td>14</td>
			<td style="color: 994444; font-weight: bold">15</td>
			<td>16</td>
			<td>17</td>
			<td style="color: 994444; font-weight: bold">18</td>
			<td>19</td>
			<td>20</td>
			<td style="color: 994444; font-weight: bold">21</td>
			<td>22</td>
			<td>23</td>
			<td style="color: 994444; font-weight: bold">24</td>
			<td>25</td>
			<td>26</td>
			<td style="color: 994444; font-weight: bold">27</td>
			<td>28</td>
			<td>29</td>
			<td style="color: 994444; font-weight: bold">30</td>
		</tr>
		<tr>
			<td>1</td>
			<td>2</td>
			<td>3</td>
			<td>4</td>
			<td style="color: 994444; font-weight: bold">5</td>
			<td>6</td>
			<td>7</td>
			<td>8</td>
			<td>9</td>
			<td style="color: 994444; font-weight: bold">10</td>
			<td>11</td>
			<td>12</td>
			<td>13</td>
			<td>14</td>
			<td style="color: 994444; font-weight: bold">15</td>
			<td>16</td>
			<td>17</td>
			<td>18</td>
			<td>19</td>
			<td style="color: 994444; font-weight: bold">20</td>
			<td>21</td>
			<td>22</td>
			<td>23</td>
			<td>24</td>
			<td style="color: 994444; font-weight: bold">25</td>
			<td>26</td>
			<td>27</td>
			<td>28</td>
			<td>29</td>
			<td style="color: 994444; font-weight: bold">30</td>
		</tr>
		<tr>
			<td>1</td>
			<td>2</td>
			<td>3</td>
			<td>4</td>
			<td>5</td>
			<td>6</td>
			<td>7</td>
			<td>8</td>
			<td>9</td>
			<td>10</td>
			<td>11</td>
			<td>12</td>
			<td>13</td>
			<td>14</td>
			<td style="color: 994444; font-weight: bold">15</td>
			<td>16</td>
			<td>17</td>
			<td>18</td>
			<td>19</td>
			<td>20</td>
			<td>21</td>
			<td>22</td>
			<td>23</td>
			<td>24</td>
			<td>25</td>
			<td>26</td>
			<td>27</td>
			<td>28</td>
			<td>29</td>
			<td style="color: 994444; font-weight: bold">30</td>
		</tr>
	</table>

	<p>
		Tak samo
	</p>

	<p class = "formula">
		Liczba jest podzielna przez $14$ wtedy i tylko wtedy, gdy jest podzielna przez $2$ i przez $7$.
	</p>

	<p>
		Niestety… nie powiedzieliśmy, jaka jest cecha podzielności przez $7$. To trochę trudniejszy temat.
	</p>

	<p class = "type optional-hide">
		Rozszerzenie
	</p>
	<p class="warning">wymagana znajomość tematu: Potęgowanie</p>
	<div>
		<p>
			Mając nieco większy zasób wiedzy, możemy wprowadzić więcej cech podzielności.
		</p>

		<div class="example">
			<p>
				Cecha podzielności przez $7$:
			</p>
			<p class="formula">
				Oznaczmy pozycję cyfry jedności jako $0$, pozycję cyfry dziesiątek jako $1$ itd. Liczba 
				jest podzielna przez $7$ wtedy i 
				tylko wtedy, gdy podzielna przez $7$ jest suma cyfr mnożonych przez 
				$3^n$, gdzie $n$ jest pozycją danej cyfry. 
			</p>
			<ul>
				<li>
					Weźmy liczbę $91$.
					<ul>
						<li>
							Cyfra $1$ ma pozycję $0$, więc mnożymy ją przez 
							$3^0:\ \ \ \ 1 \cdot 3^0=1$
						</li>
						<li>
							Cyfra $9$ ma pozycję $1$, więc mnożymy ją przez 
							$3^1:\ \ \ \ 9 \cdot 3^1=27$
						</li>
					</ul>
					Dodajemy otrzymane wyniki: $1+27=28$. Liczba $28$ jest podzielna przez 
					$7$, więc również $91$ jest podzielne przez $7$.
				</li>

				<li>
					Weźmy liczbę $1547$.
					<ul>
						<li>
							Cyfra $7$ ma pozycję $0$, więc mnożymy ją przez 
							$3^0:\ \ \ \ 7 \cdot 3^0=7$
						</li>
						<li>
							Cyfra $4$ ma pozycję $1$, więc mnożymy ją przez 
							$3^1:\ \ \ \ 4 \cdot 3^1=12$
						</li>
						<li>
							Cyfra $5$ ma pozycję $2$, więc mnożymy ją przez 
							$3^2:\ \ \ \ 5 \cdot 3^2=45$
						</li>
						<li>
							Cyfra $1$ ma pozycję $3$, więc mnożymy ją przez 
							$3^3:\ \ \ \ 1 \cdot 3^3=27$
						</li>
					</ul>
					Dodajemy otrzymane wyniki: $7+12+45+27=91$. Liczba $91$ jest podzielna przez 
					$7$, więc $1547$ jest podzielne przez $7$.
					$7000$ jest podzielne przez $7$, ponieważ 
					$7 \cdot 3^3+0 \cdot 3^2+0\cdot3^1+0\cdot3^0=7$ jest podzielne przez $7$.
				</li>
			</ul>
		</div>
		
		<div class="example">
			<p>	
				Cecha podzielności przez $11$:
			</p>
			<p class ="formula">
				Oznaczmy pozycję cyfry jedności jako $0$, pozycję cyfry dziesiątek jako $1$ 
				itd. Liczba jest podzielna przez $11$ wtedy i tylko 
				wtedy, gdy suma cyfr o pozycjach parzystych pomniejszona o sumę cyfr o pozycjach nieparzystych jest podzielna przez $11$. 
			</p>
			<ul>
				<li>
					Weźmy liczbę $649$. Cyfry o pozycjach parzystych to $9$ i $6$. 
					Ich suma wynosi $9$ + $6$ = $15$. 
					Cyfra o pozycji nieparzystej to $4$. 
					Odejmujemy: $15 - 4 = 11$. Wynik jest podzielny przez $11$, więc $649$
					jest podzielne przez $11$.
				</li>
				<li>
					Weźmy liczbę $24 574$. Cyfry o pozycjach parzystych to $4$, 
					$5$ i $2$. Ich suma wynosi $11$. Cyfry o pozycjach nieparzystych to 
					$7$ i $4$. Ich suma wynosi $11$. 
					Odejmujemy: $11 - 11 = 0$. Wynik jest podzielny przez $11$, więc 
					$24 574$  jest podzielne przez $11$.
				</li>
				<li>
					$5093$ jest podzielne przez $11$, ponieważ $3 + 0 - (9 + 5) = -11$
					jest podzielne przez $11$.
				</li>
			</ul>
		</div>
			
		<p>
			Cechy podzielności przez $7$, $11$ i $9$ to szczególne przypadki 
			ogólniejszego twierdzenia:
		</p>

		<p class="formula">
			Oznaczmy pozycję cyfry jedności jako $0$, pozycję cyfry dziesiątek jako $1$ itd. 
			Liczba daje resztę  z dzielenia przez 
			$p$ taką 
			samą, jak reszta z dzielenia przez $p$ sumy cyfr mnożonych przez $(10-p)^n$, gdzie 
			$n$ jest pozycją danej cyfry.
		</p>

		<p>
			Dowód tego twierdzenia jest dość skomplikowany.
		</p>

		<div class ="proof">
			<div class = "proof-sticker">Uzasadnienie</div>
			<p class="warning">
				wymagana znajomość tematu: Działania na wyrażeniach algebraicznych
			</p>
			<p>
				Najpierw przeczytajmy na spokojnie, co tak naprawdę mówi twierdzenie. Weźmy dla przykładu $p=8$ i rozważmy liczbę $3158$. 
				Reszta z dzielenia $3157$ przez $p$ wynosi $5$, 
				ponieważ $3157 : 8 = 19 \ r. 5$. „Suma cyfr mnożonych przez $(10-p)^n$ ” oznacza tyle, że 
				$3157$ rozbijamy na cyfry, każdą mnożymy 
				przez odpowiednią potęgę liczby $(10-p)$, a potem dodajemy wyniki.
			</p>

			<ul>
				<li>Cyfra $7$ ma pozycję $0$, więc mnożymy ją przez $2^0$. 
				Dostajemy $7 \cdot 2^0=7$.</li>
				<li>Cyfra $5$ ma pozycję $1$, więc mnożymy ją przez $2^1$. 
				Dostajemy $5 \cdot 2^1=10$.</li>
				<li>Cyfra $1$ ma pozycję $2$, więc mnożymy ją przez $2^2$. 
				Dostajemy $1 \cdot 2^2=4$.</li>	
				<li>Cyfra $3$ ma pozycję $3$, więc mnożymy ją przez $2^3$. 
					Dostajemy $3 \cdot 2^3=24$.</li>	
			</ul>

			<p>
				Razem: $7 + 10 + 4 + 24 = 45$. Reszta z dzielenia $45$ przez $8$ 
				wynosi $5$, bo $45 : 8 = 5 \ r. 5$. Obydwie reszty są równe - za sprawą 
				magii twierdzenia. Skąd się ta magia bierze? Spójrzmy na "sumę cyfr mnożonych przez $(10 - 8)^n$". Nazwiemy ją w skrócie $m$.
			</p>

			$$m = 3 \cdot (10 - 8)^3 + 1 \cdot (10 - 8)^2 + 5 \cdot (10 - 8) ^ 1 + 7 \cdot (10 - 1) ^ 0$$

			<p>
				Z dobrze nam znanych wzorów skróconego mnożenia rozpisujemy $(10 - 2)$ podniesione do drugiej i trzeciej potęgi:
			</p>

			$$m = 3 \cdot (10^3 - 3 \cdot 10^2 \cdot 8 + 3 \cdot 10 \cdot 8^2 - 8^3) + 1 \cdot (10^2 - 2 \cdot 10 \cdot 8 + 8^2) + 5 \cdot (10 - 8) + 7$$

			<p>
				Zauważmy, że wśród składników powyższej sumy spora ilość jest podzielna przez $8$, ponieważ posiada ósemkę jako jeden z czynników:
			</p>

			$$m = (3 \cdot 10^3 - 3 \cdot 3 \cdot 10^2 \cdot \color{#dd3333}{8} + 3 \cdot 3 \cdot 10 \cdot \color{#dd3333}{8^2} - 3 \cdot \color{#dd3333}{8^3}) + 
			(1 \cdot 10^2 - 1 \cdot 2 \cdot 10 \cdot \color{#dd3333}{8} + 1 \cdot \color{#dd3333}{8^2}) + (5 \cdot 10 - 5 \cdot \color{#dd3333}{8}) + 7$$

			<p>
				Dokonamy teraz drobnych zabiegów żeby wyłączyć wyróżnioną ósemkę przed wspólny nawias.
			</p>

			$$m = 3 \cdot 10^3 + 1 \cdot 10^2 + 5 \cdot 10 + 7 + 
			\color{#dd3333}{8} \cdot \left( (- 3 \cdot 3 \cdot 10^2 + 3 \cdot 3 \cdot 10 \cdot \color{#dd3333}{8} - 3 \cdot \color{#dd3333}{8^2}) + 
			(- 1 \cdot 2 \cdot 10 + 1 \cdot \color{#dd3333}{8}) + (- 5) \right) $$

			$$m = 3157 + 
			\color{#dd3333}{8} \cdot \left( (- 3 \cdot 3 \cdot 10^2 + 3 \cdot 3 \cdot 10 \cdot \color{#dd3333}{8} - 3 \cdot \color{#dd3333}{8^2}) + 
			(- 1 \cdot 2 \cdot 10 + 1 \cdot \color{#dd3333}{8}) + (- 5) \right) $$

			<p>
				W ten oto magiczny sposób wyraziliśmy liczbę $m$ w postaci wyjściowej $3157$ zsumowanej z pewną liczbą podzielną przez 8. W takim razie jeśli
				$3157$ daje pewną resztę z dzielenia przez 8, to $m$ da dokładnie tą samą resztę z dzielenia. 
			</p>

		</div>

		<div class ="proof">
			<div class = "proof-sticker">Dowód</div>
			<p class="warning">
				wymagana znajomość tematu: Dwumian Newtona
			</p>

			<p>
				Weźmy dowolne $p$ oraz dowolną liczbę $a$ postaci 
			</p>
			
			$$
				10^k a_k+10^{k-1} a_{k-1}+⋯+10^1 a_1+10^0 a_0
			$$
			
			<p>
				Przypuśćmy, że daje ona resztę $r$ z dzielenia przez $p$.
			</p>
			
			<p>
				Rozważmy liczbę
			</p>
			
			$$
				m=(10-p)^k a_k+(10-p)^{k-1} a_{k-1}+⋯+(10-p)^1 a_1+(10-p)^0 a_0
			$$
			
			<p>
				Z dwumianu Newtona możemy rozpisać:
			</p>
			
			<p>
				$m=\left( {k \choose 0}10^k (-p)^0+{k \choose 1}10^{k-1}(-p)^1+{k \choose 2}10^{k-2}(-p)^2+⋯+{k \choose k}10^0(-p)^k \right)a_k+\\
				\ \ \ +\left( {k-1 \choose 0}10^{k-1}(-p)^0+{k-1 \choose 1}10^{k-2}(-p)^1+{k-1 \choose 2}10^{k-2}(-p)^2+⋯+{k-1 \choose k-1}10^0 (-p)^{k-1} \right)a_{k-1}+\\
				\ \ \ +⋯+\\
				\ \ \ +\left( {1 \choose 0} 10^1 (-p)^0+{1 \choose 1} 10^0 (-p)^1 \right) a_1+\\
				\ \ \ +a_0=\\
				=\left( 10^k+{k \choose 1}10^{k-1}(-p)^1+{k \choose 2}10^{k-2}(-p)^2+⋯+{k \choose k}10^0 (-p)^k \right)a_k+\\
				\ \ \ +\left( 10^{k-1} + {k-1 \choose 1}10^{k-2}(-p)^1 + {k-1 \choose 2}10^{k-2}(-p)^2 + ⋯ + {k-1 \choose k-1}10^0 (-p)^{k-1}\right) a_{k-1}+\\
				\ \ \ +⋯+\\
				\ \ \ +\left(10^1+{1 \choose 1} 10^0 (-p)^1\right) a_1+\\
				\ \ \ +a_0=\\
				=10^k a_k+ (-p)\left({k \choose 1}10^{k-1}(-p)^0+{k \choose 2}10^{k-2}(-p)^1+⋯+{k \choose k}10^0 (-p)^{k-1}\right)a_k+\\
				\ \ \ +10^{k-1} a_{k-1}+(-p)\left({k-1 \choose 1}10^{k-2}(-p)^0+{k-1 \choose 2}10^{k-2}(-p)^1+⋯+{k-1 \choose k-1}10^0 (-p)^{k-2}\right)a_{k-1}+\\
				\ \ \ +⋯+\\
				\ \ \ +10^1 a_1+(-p)\left({1 \choose 1} 10^0 (-p)^0 \right) a_1+\\
				\ \ \ +a_0=\\
				=10^k a_k+10^{k-1} a_{k-1}+⋯+10^1 a_1+a_0+\\
				\ \ \ (-p)\left(\left({k \choose 1} 10^{k-1} (-p)^0+{k \choose 2} 10^{k-2} (-p)^1+⋯+{k \choose k} 10^0 (-p)^{k-1} \right)a_k+\\
				\ \ \ +\left({k-1 \choose 1} 10^{k-2} (-p)^0+{k-1 \choose 2} 10^{k-2} (-p)^1+⋯+{k-1 \choose k-1} 10^0 (-p)^{k-2} \right) a_{k-1}+\\
				\ \ \ ⋯\\
				\ \ \ +\left({1 \choose 1} 10^0 (-p)^0 \right) a_1 \right)=\\
				=a-pm'$
			</p>

			<p>
				Gdzie $m'$ jest liczbą całkowitą równą
			</p>
			
			<p>
				$\left({k \choose 1} 10^{k-1} (-p)^0+{k \choose 2} 10^{k-2} (-p)^1+⋯+{k \choose k} 10^0 (-p)^{k-1} \right)a_k+\\
				+\left({k-1 \choose 1} 10^{k-2} (-p)^0+{k-1 \choose 2} 10^{k-2} (-p)^1+⋯+{k-1 \choose k-1} 10^0 (-p)^{k-2} \right) a_{k-1}+\\
				+⋯+{1 \choose 1} 10^0 (-p)^0 a_1$
			</p>
			
			<p>
				Liczba $m=a-pm'$ jest więc sumą liczby $a$ oraz liczby podzielnej przez 
				$p$, zatem jej reszta z dzielenia przez $p$ wynosi $r$. □
			</p>
				
		</div>

		<p>
			Mając to twierdzenie, możemy udowodnić cechy podzielności przez $7$, $9$, 
			$11$ i $3$. 
		</p>

		<div class="example">
			Z cechą podzielności przez $7$ jest łatwo: w formule twierdzenia wystarczy wstawić w miejsce 
			$p$ liczbę $7$ i otrzymamy żądaną cechę. 
		</div>
		<div class="example">
			<p>Jeśli w miejsce $p$ wstawimy liczbę $9$, twierdzenie będzie brzmiało:</p>
			<p class ="formula">
				Oznaczmy pozycję cyfry jedności jako $0$, pozycję cyfry dziesiątek jako $1$ itd. 
				Liczba daje resztę  z dzielenia przez $p$ 
				taką samą, jak reszta z dzielenia przez $p$ sumy cyfr mnożonych przez $1^n$, gdzie 
				$n$ jest pozycją danej cyfry.
			</p>
			<p>Ponieważ mnożenie przez $1$ można pominąć, wystarczy nam sumować cyfry danej liczby.</p>
		</div>
		<div class="example">
			<p>Jeśli wstawimy w miejsce $p$ liczbę $11$, twierdzenie będzie brzmiało:</p>
			<p class="formula">
				Oznaczmy pozycję cyfry jedności jako $0$, pozycję cyfry dziesiątek jako $1$ itd. 
				Liczba daje resztę z dzielenia przez $p$ 
				taką samą, jak reszta z dzielenia przez $p$ sumy cyfr mnożonych przez $(-1)^n$, 
				gdzie $n$ jest pozycją danej cyfry.
			</p>
			<p>Jest to równoważne z tym, że liczby o pozycjach parzystych bierzemy ze znakiem $+$, 
			a liczby o pozycjach nieparzystych bierzemy ze znakiem $-$.</p>
		</div>
		<div class="example">
			<p>Z podzielnością przez $3$ jest trochę ciekawiej. Wynika ona z przypadku dla $p=9$:</p>
			<p class ="formula">
				Liczba daje resztę  z dzielenia przez $9$ taką samą, jak suma cyfr tej liczby.
			</p>
			<p>
				Zauważmy, że gdy weźmiemy liczbę podzielną przez $3$ i dokonamy jej dzielenia przez $9$, otrzymamy resztę $0$, $3$ lub $6$.
				Wtedy suma cyfr daje taką samą resztę z dzielenia przez $9$, suma cyfr także jest podzielna przez $3$.
			</p>

			<table style="color: #AAAAAA; width: 100%">
					<tr>
						<td>1</td>
						<td>2</td>
						<td style="color: 994444; font-weight: bold">3</td>
						<td>4</td>
						<td>5</td>
						<td style="color: 994444; font-weight: bold">6</td>
						<td>7</td>
						<td>8</td>
						<td style="color: 994444; font-weight: bold">9</td>
						<td>10</td>
						<td>11</td>
						<td style="color: 994444; font-weight: bold">12</td>
						<td>13</td>
						<td>14</td>
						<td style="color: 994444; font-weight: bold">15</td>
						<td>16</td>
						<td>17</td>
						<td style="color: 994444; font-weight: bold">18</td>
						<td>19</td>
						<td>20</td>
						<td style="color: 994444; font-weight: bold">21</td>
						<td>22</td>
						<td>23</td>
						<td style="color: 994444; font-weight: bold">24</td>
						<td>25</td>
						<td>26</td>
						<td style="color: 994444; font-weight: bold">27</td>
						<td>28</td>
						<td>29</td>
						<td style="color: 994444; font-weight: bold">30</td>
					</tr>
					<tr>
						<td>1</td>
						<td>2</td>
						<td>3</td>
						<td>4</td>
						<td>5</td>
						<td>6</td>
						<td>7</td>
						<td>8</td>
						<td style="color: 994444; font-weight: bold">9</td>
						<td>10</td>
						<td>11</td>
						<td>12</td>
						<td>13</td>
						<td>14</td>
						<td>15</td>
						<td>16</td>
						<td>17</td>
						<td style="color: 994444; font-weight: bold">18</td>
						<td>19</td>
						<td>20</td>
						<td>21</td>
						<td>22</td>
						<td>23</td>
						<td>24</td>
						<td>25</td>
						<td>26</td>
						<td style="color: 994444; font-weight: bold">27</td>
						<td>28</td>
						<td>29</td>
						<td>30</td>
					</tr>
				</table>
		</div>

		<p>
			Twierdzenie to pozwala stworzyć cechę podzielności przez $p$ dla dowolnego $p$. 
			Nie zawsze jednak tak sformułowana cecha 
			podzielności ma praktyczną użyteczność, zwłaszcza gdy $p$ jest duże. Czasem bardziej praktyczne jest inne ujęcie 
			cechy podzielności. Na przykład:
		</p>

		<p class ="formula">
			Liczba jest podzielna przez $2^n$ wtedy i tylko wtedy, gdy jej $n$ ostatnich cyfr tworzy 
			liczbę podzielną przez $2^n$.
		</p>

		<div class ="proof">
			<div class = "proof-sticker">Uzasadnienie</div>
			<p>
				Spójrzmy, czemu tak się dzieje. Weźmy dla przykładu $n=2$, czyli cechę podzielności przez 
				$4$. Gdy chcemy stwierdzić, że 
				liczba $324$ jest podzielna przez $4$, wystarczy spojrzeć na $2$ 
				ostatnie cyfry, ponieważ 
				$324 = 300 + 24 = 3 \cdot 100 + 24 = 3 \cdot 4 \cdot 25 + 24$. Składnik "$300$" jest podzielny przez $4$, czyli podzielność liczby przez $4$ 
				zależy tylko od dwóch ostatnich cyfr. 
				Podobnie $2566340 = 2566300 + 40 = 25663 \cdot 100 + 40 = 25663 \cdot 4 \cdot 25 + 40$, a więc cząstka 
				$2566300$ jest 
				podzielna przez $4$. Podobnie będzie dla innych $n$, przykładowo dla 
				$n=3$ mamy $746320 = 746000 + 320 = 746 \cdot 1000 + 320 = 
				746 \cdot 8 \cdot 125 + 320$, czyli cząstka $746000$ jest podzielna przez $8$, a o podzielności całej liczby decyduje trzycyfrowa końcówka $320$.
			</p>
		</div>

		<div class="proof">
			<div class = "proof-sticker">Dowód</div>
			<p>
				Weźmy dowolną liczbę $a$. Można ją zapisać w postaci 
			</p>

			$$
				10^k a_k+10^{k-1} a_{k-1}+⋯+10^1 a_1+10^0 a_0
			$$

			<p>
				gdzie <span class="comment_visibleLOL" id="Przykładowo liczbę 158 możemy zapisać jako 10^2\cdot1+10^1\cdot5+10^0\cdot8.   k wynosi tu 2.">$a_0,a_1,…,a_k∈\{0,1,2,3,4,5,6,7,8,9\}$
				są cyframi tej liczby.</span> <span class="comment_visibleLOL" id="Jeśli liczba ma n cyfr lub mniej,  to liczba utworzona przez n ostatnich cyfr to ta sama liczba. Wtedy twierdzenie jest mało pomocne.">
				Jeśli $k \lt n$, to
				liczba utworzona przez $n$ ostatnich 
				cyfr tej liczby jest równa $a$ i twierdzenie jest prawdziwe.</span> Gdy $k≥n$,
				liczba utworzona przez 
				$n$ ostatnich cyfr ma postać
			</p>

			$$
				q=10^{n-1} a_{n-1}+⋯+10^1 a_1+10^0 a_0
			$$

			<p>
				Wtedy:
			</p>

			$$
				a=10^k a_k+⋯+10^n a_n+10^{n-1} a_{n-1}+⋯+10^1 a_1+10^0 a_0=\\
				=2^k 5^k a_k+⋯+2^n 5^n a_n+q=2^n (2^{k-n} 5^k a_k+⋯+2^0 5^n a_n )+q
			$$

			<p>
				Mamy więc 
			</p>

			$$
				a=2^n (2^{k-n} 5^k a_k+⋯+2^0 5^n a_n )+q
			$$

			<p>
				gdzie $2^n (2^{k-n} 5^k a_k+⋯+2^0 5^n a_n )$ jest liczbą podzielną przez $2^n$.
			</p>

			<p>
				Jeśli $2^n |q$, to prawa strona równości jest podzielna przez $2^n$, więc lewa strona 
				też jest podzielna przez $2^n$, 
				mamy więc $2^n |q \Rightarrow 2^n |a$. Jeśli $2^n |a$, to w równości 
				$a-2^n (2^{k-n} 5^k a_k+⋯+2^0 5^n a_n )=q$, lewa strona 
				jest podzielna przez $2^n$, więc prawa strona też jest podzielna przez $2^n$, mamy 
				więc $2^n |a \Rightarrow 2^n |q$. A zatem
			</p>

			$$
				2^n |a \Leftrightarrow 2^n |q □
			$$
		</div>

		<p>
			Z tego twierdzenia wynikają cechy podzielności przez $2$, $4$, $8$ 
			itd. Podobnie cecha podzielności przez $5$ wynika z ogólniejszego 
			twierdzenia:
		</p>

		<p class ="formula">
			Liczba jest podzielna przez $5^n$ wtedy i tylko wtedy, gdy jej $n$ ostatnich cyfr tworzy 
			liczbę podzielną przez $5^n$.
		</p>

		<div class = "proof">
			<div class = "proof-sticker">Uzasadnienie</div>
			Dowód przebiega analogicznie jak w przypadku poprzedniego twierdzenia.
		</div>

		<div class ="proof">
			<div class = "proof-sticker">Dowód</div>
			<p>
				Weźmy dowolną liczbę $a$. Można ją zapisać w postaci 
			</p>
			$$
				10^k a_k+10^{k-1} a_{k-1}+⋯+10^1 a_1+10^0 a_0
			$$

			<p>
				gdzie $a_0,a_1,…,a_k \in \{0,1,2,3,4,5,6,7,8,9\}$ są cyframi tej liczby. Jeśli $k \lt n$, to liczba utworzona przez 
				$n$ ostatnich cyfr 
				tej liczby jest równa $a$ i twierdzenie jest prawdziwe. Gdy $k≥n$, 
				liczba utworzona przez $n$ ostatnich cyfr ma postać
			</p>

			$$
				q=10^{n-1} a_{n-1}+⋯+10^1 a_1+10^0 a_0
			$$

			<p>
				Wtedy:
			</p>

			$$
			a=10^k a_k+⋯+10^n a_n+10^{n-1} a_{n-1}+⋯+10^1 a_1+10^0 a_0=\\
			=2^k 5^k a_k+⋯+2^n 5^n a_n+q=5^n (2^k 5^{k-n} a_k+⋯+2^n 5^0 a_n )+q
			$$

			<p>
				Mamy więc 
			</p>

			$$
				a=5^n (2^k 5^{k-n} a_k+⋯+2^n 5^0 a_n )+q
			$$

			<p>
				gdzie $5^n (2^k 5^{k-n} a_k+⋯+2^n 5^0 a_n )$ jest liczbą podzielną przez $5^n$.
			</p>

			<p>
				Jeśli $5^n |q$, to prawa strona równości jest podzielna przez $5^n$, więc lewa strona też 
				jest podzielna przez $5^n$, mamy 
				więc $5^n |q \Rightarrow 5^n |a$. Jeśli $5^n |a$, to w równości 
				$a-5^n (2^k 5^{k-n} a_k+⋯+2^n 5^0 a_n )=q$, lewa strona jest podzielna 
				przez $5^n$, więc prawa strona też jest podzielna przez $2^n$, mamy więc 
				$5^n |a \Rightarrow 5^n |q$. A zatem
			</p>
			$$
				5^n |a \Leftrightarrow 5^n |q □
			$$
		</div>
	</div>
    </lesson-chapter>

    <lesson-chapter><template #title>Dzielniki liczby</template>   
	<p class = "type">
		Intuicje
	</p>

	<p>
		Nazewnictwa ciąg dalszy. Filozofia jest taka: Jeśli jedna liczba dzieli drugą, to mówimy, że jest jej <i>dzielnikiem</i>.
	</p>

	<ul>
		<li>Dzielniki liczby $12$ to $1$, $2$, 
		$3$, $4$, $6$ i $12$.</li>
		<li>Dzielniki liczby $16$ to $1$, $2$, 
		$4$, $8$ i $16$.</li>
		<li>Dzielniki liczby $60$ to $1$, $2$, 
		$3$, $4$, $6$, $10$, 
		$12$, $15$, $20$, $30$ i 
		$60$.</li>
		<li>Dzielniki liczby $7$ to $1$ i $7$.</li>
	</ul>

	<p>
		Poszukiwanie dzielników liczby to tak na prawdę <comment text="Bardzo głębokie pytanie">pytanie</comment>, na ile równych 
		grupek możemy podzielić stertę kamieni. 
		Gdy weźmiemy kupkę $60$ kamieni, możemy to zrobić na całkiem sporo sposobów - możemy dzielić kamienie na 
		$1$ grupkę 
		(nie dzielić wcale), dzielić na $2$ grupki, $3$ grupki, $4$ grupki, $5$ grupek, $6$ grupek, $10$ grupek, $12$ grupek, $15$ grupek, $20$ grupek, $30$
		grupek, aż w końcu położymy każdy 
		kamień osobno, czyli rozłożymy stertę na $60$ grupek.
	</p>

	<p>
		Z drugiej strony, gdy weźmiemy $7$ kamieni, nasze możliwości są ograniczone. Możemy jedynie zostawić kupkę w 
		spokoju albo rozłożyć każdy kamień osobno.
	</p>

	<p>
		Bez względu na to, ile weźmiemy kamieni na naszą stertę, za każdym razem na pewno możemy:
		<ul>
			<li>Zostawić stertę w spokoju, czyli inaczej mówiąc rozdzielić ją na jedną grupkę.</li>
			<li>Położyć każdy z tych kamieni osobno, czyli rozdzielić stertę na tyle grupek, ile było kamieni na stercie.</li>
		</ul>
	</p>

	<p>
		Dochodzimy do dość istotnego spostrzeżenia:
	</p>

	<p class ="formula">
		Każda liczba dzieli się przez $1$ oraz samą siebie.
	</p>

	<p>
		Wyjątkiem jest liczba $0$. Zera przez zero dzielić nie wolno.
	</p>

	<p class = "type">
		Rozszerzenie
	</p>

	<p>
		<i>Dzielnikiem właściwym</i> liczby nazywamy każdy dzielnik tej liczby oprócz jej samej.
	</p>

	<ul>
		<li>Dzielniki właściwe liczby $12$ to $1$, $2$, 
		$3$, $4$ i $6$.</li>
		<li>Dzielniki właściwe liczby $16$ to $1$, $2$, 
		$4$ i $8$.</li>
		<li>Dzielnikiem właściwym liczby $7$ jest $1$.</li>
	</ul>

	<p>
		Fascynujące to to nie jest, ale daje podstawę do ciekawszego zagadnienia. <i>Liczba doskonała</i> to liczba będąca sumą swoich dzielników właściwych.
	</p>

	<ul>
		<li>$6$ jest liczbą doskonałą. Dzielniki właściwe szóstki to $1$, 
		$2$ i $3$, a $1 + 2 + 3 = 6$.</li>
		<li>$28$ jest liczbą doskonałą. Dzielniki właściwe $28$ to $1$, 
		$2$, $4$, $7$ oraz $14$ i tak się składa, że
		$1 + 2 + 4 + 7 + 14 = 28$.</li>
		<li>$496$ jest liczbą doskonałą, ponieważ dzielniki właściwe $496$ to 
		$1$, $2$, $4$, $8$, 
		$16$, $31$, $62$, $124$ i 
		$248$, a ich suma wynosi
		$1 + 2 + 4 + 8 + 16 + 31 + 62 + 124 + 248 = 496$.</li>
	</ul>

	<p>
		Magia. Sprawa jest tym bardziej ciekawa, że $6$, $28$, $496$ i 
		jeszcze kilka dalszych liczb doskonałych to liczby parzyste. 
		Matematycy nie mają pojęcia, czy istnieje nieparzysta liczba doskonała. Jeśli taką znajdziesz, nie ukrywaj się z tym. 
		Prawdopodobnie czeka Cię chwała, sława i pieniądze. Miej jednak na uwadze, że liczba taka ma przynajmniej $1500$ cyfr. 
		Wszystkie mniejsze matematycy już zdyskwalifikowali. Natknęliśmy się na pierwszy 
		<comment text="Jeśli żyjesz w dalekiej przyszłości i 
		problem ten jest już rozwiązany, zgłoś proszę tę nieścisłość do administracji strony.">nierozwiązany problem matematyki</comment>:
	</p>

	<p class = "formula">
		Czy istnieje nieparzysta liczba doskonała?
	</p>

	<p>
		To naprawdę poważna sprawa. Wyobraź sobie, że żaden tęgi umysł przez tysiąclecia istnienia cywilizacji nie rozgryzł tego 
		problemu, chociaż liczby doskonałe interesowały już starożytnych Greków. Z dzielnikami właściwymi wiąże się jeszcze 
		jedna ciekawostka:
	</p>

	<p>
		<i>Liczby zaprzyjaźnione</i> to takie dwie liczby, że każda jest sumą dzielników właściwych drugiej.
		<ul>
			<li>$220$ i $284$ to liczby zaprzyjaźnione. Dzielniki właściwe 
			$220$ to $1$, $2$, $4$, 
			$5$, $10$, $11$, $20$, 
			$22$, $44$, $55$, $110$, a 
			$1 + 2 + 4 + 5 + 10 + 11 + 20 + 22 + 44 + 55 + 110 = 284$. 
			Dzielniki właściwe $284$ to $1$, $2$, 
			$4$, $71$, $142$, a 
			$1 + 2 + 4 + 71 + 142 = 220$.</li>
			<li>$1184$ i $1210$ to liczby zaprzyjaźnione. Dzielniki właściwe $1184$ to 
			$1$, $2$, $4$, $8$, 
			$16$, $32$, $37$, $74$, 
			$148$, $296$, $592$, a ich suma
			$1 + 2 + 4 + 8 + 16 + 32 + 37 + 74 + 148 + 296 + 592 = 1210$. Dzielniki właściwe $1210$ to 
			$1$, $2$, $5$, $10$, 
			$11$, $22$, $55$, $110$, 
			$121$, $242$, $605$ i niespodzianka:
			$1 + 2 + 5 + 10 + 11 + 22 + 55 + 110 + 121 + 242 + 605 = 1184$.</li>
		</ul>
	</p>

	<p>
		To jeszcze bardziej magiczne i jeszcze bardziej niepojęte. Na tyle magiczne i na tyle niepojęte, że matematycy nie dali rady 
		z odpowiedzią na pytania:
	</p>

	<p class="formula">
		Czy istnieją liczby takie zaprzyjaźnione, że jedna jest parzysta, a druga nieparzysta?
	</p>

	<p>
		oraz
	</p>

	<p class ="formula">
		Czy par liczb zaprzyjaźnionych jest nieskończenie wiele?
	</p>

	<p>
		Oto dwa kolejne nierozwiązane problemy matematyki. Bądź pierwszy - pokaż, na co cię stać.
	</p>
    </lesson-chapter>

    <lesson-chapter><template #title>Liczby pierwsze</template>   
	<p class = "type">
		Intuicje
	</p>

	<p>
		Zauważyliśmy pewną niesforność sterty liczącej $7$ kamieni. Oprócz banalnego podziału na $1$
		grupkę lub $7$ grupek, nie jesteśmy 
		w stanie nic z nią zrobić. Podobnie byłoby, gdyby wziąć stertę $3$ kamieni, $5$ kamieni, 
		albo $11$ kamieni… Za każdym razem 
		jedyne co możemy, to zostawić stertę taką, jak ją Pan Bóg stworzył, albo rozrzucić wszystkie kamienie w cały świat. Gdy 
		liczba ma tylko dwa dzielniki: <span class="math">1</span> oraz samą siebie, mówimy, że jest <i>liczbą pierwszą</i>. 
		<comment text="Czyli kilka pierwszych liczb pierwszych">Kilka początkowych liczb pierwszych</comment> to:
	</p>

	<p style="text-align: center">
		$2$, $3$, $5$, $7$, 
		$8$, $11$, $13$, $17$, 
		$19$, $23$, $29$, $31$, 
		$37$, $41$, $43$, $47$, 
		$53$, $59$, $61$, $67$, 
		$71$, $73$, $79$, $83$, 
		$89$, $97$
	</p>

	<p>
		Liczby pierwsze to bardzo niesforne istoty. Ze względu na to, że na nic się nie dzielą, nazywa się je czasem 
		<comment text="Jeśli nie wiesz, czym są 
		atomy, pozwolimy Ci cierpieć z powodu niewiedzy.">atomami</comment> wśród liczb.
	</p>

	<p>
		Jeśli liczba jest iloczynem co najmniej dwóch liczb pierwszych, to jest <i>liczbą złożoną</i>. Każda liczba złożona ma więcej 
		niż dwa dzielniki.
	</p>
	<ul>
		<li>$4$ jest liczbą złożoną, ponieważ $4 = 2 \cdot 2$. Dzielniki $4$ to $1$, $2$, $4$.</li>
		<li>$6$ jest liczbą złożoną, ponieważ $6 = 2 \cdot 3$. Dzielniki $6$ to $1$, $2$, $3$, $6$.</li>
		<li>$8$ jest liczbą złożoną, ponieważ $8 = 2 \cdot 2 \cdot 2$. Dzielniki $8$ to $1$, $2$, $4$, $8$.</li>
		<li>$9$ jest liczbą złożoną, ponieważ $9 = 3 \cdot 3$. Dzielniki $9$ to $1$, $3$, $9$.</li>
		<li>$10$ jest liczbą złożoną, ponieważ $10 = 2 \cdot 5$. Dzielniki $10$ to $1$, $2$, $5$, $10$.</li> 
		<li>$12$ jest liczbą złożoną, ponieważ $12 = 2 \cdot 2 \cdot 3$. Dzielniki $12$ to $1$, $2$, $3$, $4$, $6$, $12$.</li>
	</ul> 

	<p>
		Oprócz liczb pierwszych i liczb złożonych mamy jeszcze dwóch delikwentów: liczbę $0$ oraz liczbę $1$. 
		Co można powiedzieć o 
		liczbie $0$? Gdy podzielimy $0$ przez jakąkolwiek liczbę, dostajemy $0$, 
		czyli $0$ zawsze dzieli się bez reszty. W takim razie 
		$0$ jest podzielne przez dowolną liczbę, więc każda  liczba jest dzielnikiem $0$. Skoro 
		tak, to na pewno $0$ nie jest liczbą 
		pierwszą. Poza tym $0$ nie da się zapisać w postaci iloczynu liczb pierwszych, więc $0$
		nie jest też liczbą złożoną. A co się 
		dzieje z $1$? Jedynka ma tylko jeden dzielnik: $1$. Nie kwalifikuje się więc do 
		liczb pierwszych, bo te mają $2$ dzielniki. Tym bardziej nie jest liczbą złożoną.
	</p>

	<p>
		Każda liczba oprócz $0$ i $1$ jest liczbą pierwszą albo liczbą złożoną. 
		Zarówno jednych, jak i drugich, jest nieskończenie wiele.
	</p>
    </lesson-chapter>

    <lesson-chapter><template #title>Rozkład na czynniki pierwsze</template> 
	<p class = "type">
		Warsztat
	</p>

	<p>
		Ogłosiliśmy dumnie, że każda liczba złożona jest iloczynem jakichś liczb pierwszych. Pytanie tylko, jakich? Gdy uda nam 
		się wyłuskać z liczby informację o tym, z jakich liczb pierwszych się składa, dokonamy jej <i>rozkładu na czynniki pierwsze</i>, 
		zwanego tez <i>faktoryzacją</i>. Jak to robimy? Dość żmudnie. Weźmy pod lupę liczbę $120$. 
		Zastanówmy się najpierw, czy liczba ta 
		będzie miała w rozkładzie $2$, czyli czy można zapisać $120$ 
		jakoś tak: $120 = 2 \cdot … \cdot … \cdot … \cdot …$
		$120$ dzieli się przez $2$, ponieważ $120 : 2 = 60$, 
		czyli inaczej mówiąc $120 = 2 \cdot 60$. Tak oto dwójka pojawiła się w 
		rozkładzie. Niestety to nie koniec. Chcemy rozbić $120$ na taki iloczyn, w którym pojawiają się tyko 
		liczby pierwsze, a 
		$60$ taką nie jest. W takim razie musimy jeszcze dokonać rozkładu liczby $60$.
		Bierzemy ją i pytamy, czy w jej rozkładzie występuje $2$. Stwierdzamy, że 
		$60 : 2 = 30$, czyli $60 = 2 \cdot 30$. Mamy więc 
		$120 = 2 \cdot 60 = 2 \cdot 2 \cdot 30$. Teraz bierzemy $30$ i pytamy, 
		czy dzieli się przez $2$. Ponieważ $30 : 2 = 15$, 
		to $30 = 2 \cdot 15$, a więc 
		$120 = 2 \cdot 60 = 2 \cdot 2 \cdot30 = 2 \cdot 2 \cdot 2 \cdot 15$. Teraz 
		bierzemy $15$. Piętnaście nie dzieli się na $2$, ponieważ 
		$15 : 2 = 7 \ r. 1$. W takim razie $15$ nie posiada $2$ 
		w swoim rozkładzie. 
		No to może posiada $3$? Dzielimy $15 : 3 = 5$, czyli mamy 
		$15 = 3 \cdot 5$. Sukces. 
		Piszemy ostatecznie:
	</p>

	$$
		120 = 2 \cdot 60 = 2 \cdot 2 \cdot 30 = 2 \cdot 2 \cdot 2 \cdot 15 = 2 \cdot 2 \cdot 2 \cdot 3 
		\cdot 5
	$$
	<p>
		Na koniec otrzymaliśmy $5$, a $5$ jest liczbą pierwszą. W takim razie rozkład 
		$120$ na czynniki pierwsze wygląda tak: 
		$120 = 2 \cdot 2 \cdot 2 \cdot 3 \cdot 5$. 
	</p>

	<p>
		Gdy przeprowadzamy rozkład na czynniki, umownie stosujemy taki zapis: rysujemy pionową kreskę, po lewej na górze piszemy 
		liczbę do rozkładu.
	</p>

	<table class="factorisation center">
		<tr><td>$120$</td><td></td></tr>
		<tr><td></td><td></td></tr>
		<tr><td></td><td></td></tr>
		<tr><td></td><td></td></tr>
		<tr><td></td><td></td></tr>
		<tr><td></td><td></td></tr>
	</table>

	<p>
		Szukamy liczby pierwszej, która dzieli $120$. Znajdujemy $2$, więc zapisujemy 
		$2$ z prawej i wykonujemy dzielenie. Wynik zapisujemy poniżej z lewej.
	</p>

	<table class="factorisation center">
		<tr><td>$120$</td><td>$2$</td></tr>
		<tr><td>$60$</td><td></td></tr>
		<tr><td></td><td></td></tr>
		<tr><td></td><td></td></tr>
		<tr><td></td><td></td></tr>
		<tr><td></td><td></td></tr>
	</table>

	<p>
		Powtarzamy czynności: szukamy dzielnika pierwszego liczby $60$, dzielimy i piszemy wynik pod spodem.
	</p>

	<table class="factorisation center">
		<tr><td>$120$</td><td>$2$</td></tr>
		<tr><td>$60$</td><td>$2$</td></tr>
		<tr><td>$30$</td><td></td></tr>
		<tr><td></td><td></td></tr>
		<tr><td></td><td></td></tr>
		<tr><td></td><td></td></tr>
	</table>

	<p>
		Idziemy dalej, aż do skutku.
	</p>

	<table class="factorisation center">
		<tr><td>$120$</td><td>$2$</td></tr>
		<tr><td>$60$</td><td>$2$</td></tr>
		<tr><td>$30$</td><td>$2$</td></tr>
		<tr><td>$15$</td><td>$3$</td></tr>
		<tr><td>$5$</td><td>$5$</td></tr>
		<tr><td>$1$</td><td></td></tr>
	</table>

	<p>
		Na koniec z dzielenia dostaliśmy $1$ i tu nasza praca się kończy - nie znajdziemy już liczby pierwszej, na którą 
		rozkłada się $1$. Po prawej stronie kreski widzimy wszystkie liczby pierwsze z rozkładu. Odczytujemy, że 
		$120 = 2 \cdot 2 \cdot 2 \cdot 3 \cdot 5$. Zobaczmy jeszcze podobne przykłady:
	</p>
	
	<table style="width: 100%">
		<tr>
			<td>
				<table class="factorisation center">
					<tr><td>$630$</td><td>$2$</td></tr>
					<tr><td>$315$</td><td>$3$</td></tr>
					<tr><td>$105$</td><td>$3$</td></tr>
					<tr><td>$35$</td><td>$5$</td></tr>
					<tr><td>$7$</td><td>$7$</td></tr>
					<tr><td>$1$</td><td></td></tr>
				</table>
				<p>
					$$630 = 2 \cdot 3 \cdot 3 \cdot 5 \cdot 7$$
				</p>
			</td>
			<td>
				<table class="factorisation center">
					<tr><td>$440$</td><td>$2$</td></tr>
					<tr><td>$220$</td><td>$2$</td></tr>
					<tr><td>$110$</td><td>$42$</td></tr>
					<tr><td>$55$</td><td>$5$</td></tr>
					<tr><td>$11$</td><td>$11$</td></tr>
					<tr><td>$1$</td><td></td></tr>
				</table>
				<p>
					$$440 = 2 \cdot 2 \cdot 2 \cdot 5 \cdot 11$$
				</p>
			</td>
			<td>
				<table class="factorisation center">
					<tr><td>$24310$</td><td>$2$</td></tr>
					<tr><td>$12155$</td><td>$5$</td></tr>
					<tr><td>$2431$</td><td>$11$</td></tr>
					<tr><td>$221$</td><td>$13$</td></tr>
					<tr><td>$17$</td><td>$17$</td></tr>
					<tr><td>$1$</td><td></td></tr>
				</table>
				<p>
					$$24310 = 2 \cdot 5 \cdot 11 \cdot 13 \cdot 17$$
				</p>
			</td>
		</tr>
	</table>

	<p>
		Mówimy, że rozkład na czynniki pierwsze jest <i>jednoznaczny</i>, to znaczy, że jedna liczba nie może zostać rozłożona na 
		czynniki pierwsze w różny sposób. Niemożliwe jest, by dokonać rozkładu jakiejś liczby dwa razy, by otrzymać w wynikowych iloczynach różne
		liczby pierwsze albo odmienną ich ilość.
	</p>
    </lesson-chapter>

    <lesson-chapter><template #title>NWD i NWW</template> 
	<p class = "type">
		Intuicje
	</p>

	<p>
		Temat rozdziału brzmi jak nazwa partii politycznej Polski Ludowej, ale nie jest to nic równie strasznego.
		$NWD$ to skrót od „największy wspólny dzielnik”. Gdy rozważamy dwie liczby, powiedzmy $30$
		i $75$, możemy wypisać wszystkie 
		dzielniki jednej liczby i wszystkie dzielniki drugiej liczby. 
	</p>
	<ul>
		<li>Dzielniki liczby $30$ to $1$, $2$, $3$, $5$, $6$, $10$, $15$ i $30$.</li>
		<li>Dzielniki liczby $75$ to $1$, $3$, $5$, $15$, $25$ i $75$.</li>
	</ul>

	<p>
		Gdy przyjrzymy się im uważnie, zauważymy, że niektóre dzielniki występują zarówno w pierwszej, jak i w drugiej liczbie. 
		Takie dzielniki nazywamy <i>dzielnikami wspólnymi</i> tych liczb.
	</p>
	<ul>
		<li>Dzielniki wspólne liczb $30$ i $75$ to $1$, 
		$3$, $5$ i $15$.</li>
	</ul>

	<p>
		Największy spośród tych dzielników to właśnie $NWD$ tych liczb. W przypadku liczb $30$
		i $75$ ich największy wspólny dzielnik 
		to $15$. Zapisujemy to symbolicznie: $NWD (30, 75) = 15$.
	</p>
	<ul>
		<li>Szukamy $NWD (30, 42)$. Dzielniki $30$ to 
		$1$, $2$, $3$, $5$, 
		$6$, $10$, $15$, $30$. 
		Dzielniki $42$ to $1$, $2$, $3$, 
		$6$, $7$, $14$, $21$, 
		$42$. 
		W takim razie $NWD (30, 42) = 6$.</li>
		<li>Szukamy $NWD (60, 105)$. Dzielniki $60$ to $1$, 
		$2$, $3$, $4$, $6$, 
		$10$, $12$, $15$, $20$, 
		$30$ i $60$. 
		Dzielniki $105$ to $1$, $3$, 
		$5$, $7$, $15$, $21$, 
		$35$, $105$. W takim razie $NWD (60, 105)$ to $15$.</li>
		<li>Szukamy $NWD (28, 65)$. Dzielniki $28$ to $1$, 
			$2$, $4$, $7$, $14$, 
			$28$. Dzielniki $65$ to $1$, $5$, 
			$13$, $65$.
			W takim razie $NWD (28, 65) = 1$.</li>
	</ul>

	<p>
		$NWW$ to skrót od „najmniejsza wspólna wielokrotność”. Gdy pomnożymy jakąś liczbę przez dowolną inną, 
		otrzymamy jej <i>wielokrotność</i>.
	</p>
	<ul>
		<li>
			Kolejne wielokrotności liczby $5$ to $5$, $10$, 
			$15$, $20$, $25$, $30$, 
			$35$, $40$, $45$, $50$, 
			$55$, $60…$ Są to wyniki mnożenia $5$ przez 
			kolejne liczby naturalne, czyli $1 \cdot 5$, $2 \cdot 5$, 
			$3 \cdot 5$, $4 \cdot 5$, $5 \cdot 5…$
		</li>
		<li>
			Kolejne wielokrotności liczby $12$ to $12$, $24$, 
			$36$, $48$, $60$, $72$, 
			$84$, $96$, $108$, $120$, 
			$132$, $144$, $156$, $168$, 
			$180…$ czyli inaczej 
			$1 \cdot 12$, $2 \cdot 12$, $3 \cdot 12$, 
			$4 \cdot 12$, $5 \cdot 12$, $6 \cdot 12…$
		</li>
		<li>
			Kolejne wielokrotności liczby $21$ to $21$, $42$, 
			$63$, $84$, $105$, $126$, 
			$147$, $168$, $189$, $210…$ 
			każda kolejna wielokrotność jest o $21$ większa od poprzedniej.
		</li>
	</ul>

	<p>
		Możemy wziąć dwie liczby, np. $12$ i $21$ i wypisać dla każdej z nich kilka początkowych 
		wielokrotności. W końcu musi się 
		zdarzyć, że wielokrotność jednej i drugiej będzie taka sama. Taka wielokrotność to <i>wspólna wielokrotność</i> tych liczb. 
		Dla $12$ i $21$ widzimy powyżej wspólne wielokrotności $84$ i 
		$168$. Gdybyśmy szukali dalej, znaleźlibyśmy ich dużo więcej, a 
		nawet dowolnie dużo więcej. Najmniejsza spośród wspólnych wielokrotności dwóch liczb to ich $NWW$. Możemy zapisać 
		symbolicznie $NWW (12, 21) = 84$.
	</p>

	<p>
		Poszukiwanie wspólnej wielokrotności można przedstawić bardziej obrazowo. Weźmy liczby $4$ i $6$. 
		Ustawmy kulki jedna za drugą 
		i ponumerujmy je od $1$ wzwyż. W pierwszym rządku pomalujemy te kule, których numer jest wielokrotnością 
		$4$. W drugim rządku 
		te kule, których numer jest wielokrotnością $6$.
	</p>

	<br>
	<table id="NWW_1" width=100% class="center"></table>
	<br>

	<p>
		Tam, gdzie kule są pomalowane  obydwu rządkach, mamy wspólne wielokrotności obydwu liczb. Wspólne wielokrotności $4$ i 
		$6$ to m.in. $12$ i $24$. Dla $5$ i 
		$6$ mamy z kolei:
	</p>

	<br>
	<table id="NWW_2" width=100% class="center"></table>
	<br>

	<p>
		Najmniejszą wielokrotność napotkaliśmy dopiero przy $30$.
	</p>

	<p class="type">
		Warsztat
	</p>
	
	<p>
		Znajdowanie $NWW$ i $NWD$ można nieco przyspieszyć wykorzystując rozkład na czynniki 
		pierwsze. Bierzemy dwoje delikwentów i rozbijamy ich na iloczyny liczb pierwszych
	</p>
		 
	<table style="width: 100%">
		<tr>
			<td>
				<table class="factorisation center">
					<tr><td>$120$</td><td>$2$</td></tr>
					<tr><td>$60$</td><td>$2$</td></tr>
					<tr><td>$30$</td><td>$2$</td></tr>
					<tr><td>$15$</td><td>$3$</td></tr>
					<tr><td>$5$</td><td>$5$</td></tr>
					<tr><td>$1$</td><td></td></tr>
				</table>
			</td>
			<td>
				<table class="factorisation center">
					<tr><td>$300$</td><td>$2$</td></tr>
					<tr><td>$150$</td><td>$2$</td></tr>
					<tr><td>$75$</td><td>$3$</td></tr>
					<tr><td>$25$</td><td>$5$</td></tr>
					<tr><td>$5$</td><td>$5$</td></tr>
					<tr><td>$1$</td><td></td></tr>
				</table>
			</td>
		</tr>
	</table>
		 
	<p>
		Zaznaczamy te czynniki, które powtarzają się w obydwu rozkładach.
	</p>

	<table width="100%">
		<tr>
			<td>
				<table class="factorisation center">
					<tr><td>$120$</td><td style="color: #cc2222; font-weight: bold">$\bf 2$</td></tr>
					<tr><td>$60$</td><td style="color: #cc2222; font-weight: bold">$\bf 2$</td></tr>
					<tr><td>$30$</td><td>$2$</td></tr>
					<tr><td>$15$</td><td style="color: #cc2222; font-weight: bold">$\bf 3$</td></tr>
					<tr><td>$5$</td><td style="color: #cc2222; font-weight: bold">$\bf 5$</td></tr>
					<tr><td>$1$</td><td></td></tr>
				</table>
			</td>
			<td>
				<table class="factorisation center">
					<tr><td>$300$</td><td style="color: #cc2222; font-weight: bold">$\bf 2$</td></tr>
					<tr><td>$150$</td><td style="color: #cc2222; font-weight: bold">$\bf 2$</td></tr>
					<tr><td>$75$</td><td style="color: #cc2222; font-weight: bold">$\bf 3$</td></tr>
					<tr><td>$25$</td><td style="color: #cc2222; font-weight: bold">$\bf 5$</td></tr>
					<tr><td>$5$</td><td>$5$</td></tr>
					<tr><td>$1$</td><td></td></tr>
				</table>
			</td>
		</tr>
	</table>
	
	<p>
		Iloczyn zaznaczonych czynników tworzy największy wspólny dzielnik liczb:
	</p>
	
	$$
		NWD(120, 300) = {\bf \color{#dd3333}{2}} \cdot {\bf \color{#dd3333}{2}} \cdot {\bf \color{#dd3333}{3}} \cdot {\bf \color{#dd3333}{5}} = 60
	$$
	
	<p>
		Z kolei iloczyn zaznaczonych czynników wraz ze wszystkimi niezaznaczonymi czynnikami tworzy najmniejszą wspólną wielokrotność:
	</p>
	
	$$
		NWW(120, 300) = {\bf \color{#dd3333}{2}} \cdot {\bf \color{#dd3333}{2}} \cdot {\bf \color{#dd3333}{3}} \cdot {\bf \color{#dd3333}{5}} \cdot 2 \cdot 5
		 = 600
	$$

	<p>
		Dlaczego tak jest? Nie jest tajemnicą, że każdy czynnik występujący w rozkładzie $300$ jest dzielnikiem 
		$300$. Ponadto iloczyn dowolnych liczb z rozkładu także tworzy dzielnik $300$:
	</p>
	
	$$
		300=2\cdot2\cdot3\cdot5\cdot5=2\cdot2\cdot3\cdot5\ \ \ \cdot\ \ \ 5=60\cdot5
	$$
	
	<p>
		$300$ jest podzielne przez $60$, czyli liczba $2\cdot2\cdot3\cdot5$ jest 
		dzielnikiem $300$. Kiedy wybieramy czynniki występujące w obydwu rozkładach, dostajemy wspólny dzielnik 
		$120$ i $300$. Ponieważ wybieramy <b>wszystkie</b> czynniki z obydwu rozkładów, dostajemy 
		największy wspólny dzielnik $120$ i $300$.
	</p>

	<p>
		Liczba $2\cdot2\cdot3\cdot5\cdot2\cdot5$ jest wielokrotnością $300$, ponieważ wśród jej czynników pojawiają 
		się wszystkie czynniki $300$:
	</p>
	
	$$
		2\cdot2\cdot3\cdot5\cdot2\cdot5=2\cdot2\cdot3\cdot5\cdot5\ \ \ \cdot\ \ \ 2=300\cdot2
	$$
	
	<p>
		oraz wszystkie czynniki $120$
	</p>
	
	$$
		2\cdot2\cdot3\cdot5\cdot2\cdot5=2\cdot2\cdot2\cdot3\cdot5\ \ \ \cdot\ \ \ 5=120\cdot5
	$$
	
	<p>
		czyli $2\cdot2\cdot3\cdot5\cdot2\cdot5=600$ jest wspólną wielokrotnością $300$ i $120$. 
		Co więcej, jest to najmniejsza wspólna wielokrotność $300$ i $120$, ponieważ czynniki 
		$600$ wybieraliśmy „oszczędnie”: liczba będąca wspólną wielokrotnością $300$ i 
		$120$ musi posiadać w rozkładzie wszystkie czynniki $300$, jak również wszystkie czynniki 
		$120$; dlatego wybieramy je, ale z pominięciem tych czynników, które się powtarzają - czynniki 
		<span style="color: #cc2222">$2$</span>, <span style="color: #cc2222">$2$</span>, 
		<span style="color: #cc2222">$3$</span>, <span style="color: #cc2222">$5$</span> 
		bierzemy tylko raz.
	</p>
	
	<p class = "type">
		Rozszerzenie
	</p>
	<div class = "optional-show">
		<p>
			Mówimy, że dwie liczby są <i>względnie pierwsze</i>, jeśli ich $NWD$ wynosi $1$. Nie możemy wtedy znaleźć 
			żadnej <comment text="z całym szacunkiem dla jedynki">sensownej</comment> liczby, 
			przez którą można podzielić i jedną, i drugą.
		</p>
		<ul>
			<li>Liczby $5$ i $6$ są względnie pierwsze, ponieważ nie mają wspólnego dzielnika 
			innego niż $1$.</li>
			<li>Liczby $12$ i $35$ są względnie pierwsze, ponieważ nie mają wspólnego dzielnika 
			innego niż $1$.</li>
			<li>$42$ i $77$ nie są względnie pierwsze, ponieważ $7$ dzieli 
			obydwie liczby.</li>
		</ul>

		<p>
			Gdy rozważamy więcej niż dwie liczby, mówimy że są względnie pierwsze, gdy największy wspólny dzielnik wszystkich tych 
			liczb wynosi $1$.
		</p>
		<ul>
			<li>Liczby $3$, $5$ i $7$ są względnie pierwsze.</li>
			<li>Liczby $22$, $23$, $39$ i $85$ 
			są względnie pierwsze.</li>
			<li>Liczby $24$, $12$ i $7$ są względnie pierwsze, mimo że 
			$24$ i $12$ nie są względnie pierwsze.</li>
		</ul>
		
		<p>
			Jeśli chcemy podkreślić, że wśród wielu liczb dowolne dwie są ze sobą względnie pierwsze, mówimy, że są <i>parami względnie 
			pierwsze</i>. 
		</p>

		<ul>
			<li>$24$, $12$ i $7$ są względnie pierwsze, ale nie są parami 
			względnie pierwsze.</li>
		</ul>

		<p>
			Najmniejsza wspólna wielokrotność dwóch liczb względnie pierwszych jest ich iloczynem. Wynika to z bardziej ogólnego 
			twierdzenia:
		</p>

		<p class ="formula">
			Iloczyn $NWW$ i $NWD$ dwóch liczb jest równy iloczynowi tych liczb.
		</p>

		<div class="proof">
			<div class = "proof-sticker">Dowód</div>
			Eh…
		</div>
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
  name: "PodzielnoscLiczb",
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

	circle.empty
	{
		fill: url(#gradient_2);
	}
</style>
