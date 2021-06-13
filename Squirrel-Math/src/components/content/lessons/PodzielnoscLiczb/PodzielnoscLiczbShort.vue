<template>
    <lesson routeShortVersion="/podzielnosc-liczb-short" routeLongVersion="/podzielnosc-liczb">
        <lesson-title-short>Podzielność</lesson-title-short>    
        
        <lesson-chapter><template #title>Cechy podzielności</template> 
        <p>
			Jeśli w wyniku dzielenia nie pojawia się reszta (czyli wynik jest liczbą naturalną), mówimy, że dzielna jest <i>podzielna</i> 
			przez dzielnik. Jeszcze przed wykonaniem dokładnych obliczeń da się ocenić, czy jedna liczba jest podzielna przez drugą. 
			Wystarczy skorzystać z poniższych reguł zwanych cechami podzielności.
		</p>

		<p class = "formula">
			Liczba jest podzielna przez $2$ wtedy i tylko wtedy, gdy jej ostatnią cyfrą jest 
			$0$, $2$, $4$, $6$ lub $8$.
		</p>
		<p class='mt-0'>
			$18$ jest podzielne przez $2$, ponieważ ostatnią cyfrą jest $8$
		</p>
	
		<p class ="formula">
			Liczba jest podzielna przez $3$ wtedy i tylko wtedy, gdy suma jej cyfr jest podzielna przez $3$.
		</p>
		<p class='mt-0'>
			$123$ jest podzielne przez $3$, ponieważ $1 + 0+0+2+0+0 + 3 = 6$ jest podzielne przez $3$.
		</p>
		
		<p class ="formula">
			Liczba jest podzielna przez $4$ wtedy i tylko wtedy, gdy jej dwie ostatnie cyfry tworzą liczbę podzielną przez 
			$4$.
		</p>
		<p class='mt-0'>
			$712$ jest podzielne przez $4$, ponieważ $12$ jest podzielne przez $4$.
		</p>
	
		<p class ="formula">
			Liczba jest podzielna przez $5$ wtedy i tylko wtedy, gdy jej ostatnią cyfrą jest $0$ lub $5$.
		</p>
		<p class='mt-0'>
			$125$ jest podzielne przez $5$, ponieważ ostatnią cyfrą jest $5$.
		</p>
		
		<p class ="formula">
			Liczba jest podzielna przez $8$ wtedy i tylko wtedy, gdy jej trzy ostatnie cyfry tworzą liczbę podzielną przez 
			$8$. 
		</p>
		<p class='mt-0'>
			$1008$ jest podzielne przez $8$, ponieważ $8$ jest podzielne przez $8$.
		</p>
		
		<p class ="formula">
			Liczba jest podzielna przez $9$ wtedy i tylko wtedy, gdy suma jej cyfr jest podzielna przez $9$. 
		</p>
		<p class='mt-0'>
			$123 456 789$ jest podzielne przez $9$, ponieważ $1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 = 45$ jest podzielne przez $9$.
		</p>
		
		<p class ="formula">
			Liczba jest podzielna przez $10$ wtedy i tylko wtedy, gdy jej ostatnią cyfrą jest $0$. 
		</p>
		<p class='mt-0'>
			$1 000 000$ jest podzielny przez $10$, ponieważ ostatnią cyfrą jest $0$.
		</p>

		</lesson-chapter>

		<lesson-chapter><template #title>Cechy podzielności przez liczby złożone</template> 
		<p>
			<i>Liczba złożona</i> to liczba, którą da się zapisać w postaci iloczynu mniejszych liczb, np. $6 = 2 \cdot 3$. Cecha podzielności przez $6$ 
			jest złożeniem cech podzielności przez $2$ i $3$:
		</p>

		<p class="formula">
			Liczba jest podzielna przez $6$ wtedy i tylko wtedy, gdy jej ostatnią cyfrą jest 
			$0$, $2$, $4$, $6$ lub $8$, a suma jej cyfr jest podzielna przez $3$.
		</p>

		<p>
			Wynika to z prostej obserwacji: gdy wypiszemy kolejne liczby, co druga jest podzielna przez $2$, co trzecia jest podzielna przez $3$, a co szósta 
			przez $6$. Liczy podzielne przez $6$ to te podzielne zarówno przez $2$ jak i przez $3$:
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
			Podobnie określamy cechę podzielności przez $14 = 2 \cdot 7$. Nie można jednak stwierdzić, że skoro $4 = 2 \cdot 2$, to podzielność przez $4$
			jest równoważna z podzielnością przez $2$ i przez $2$.
		</p>

		</lesson-chapter>

		<lesson-chapter><template #title>Rozkład na czynniki pierwsze</template> 
			<p>
				Liczby pierwsze to takie liczby, które dzielą się tylko przez $1$ i przez samą siebie. Są to m.in. $2, 3, 5, 7, 11, 13, 17, 23, 29, ...$
				Podczas rozważań na temat podzielności są to najbardziej podstawowe liczby: nie dają się rozbić na mniejsze jednostki.
			</p>

			<p> 
				Liczby $0$ i $1$ nie są uznawane za liczby pierwsze ani za złożone.
			</p>

			<p> 
				Liczby złożone dają się przedstawić w postaci iloczynu liczb pierwszych, np.
			</p>

			<ul>
				<li>$12 = 2 \cdot 2 \cdot 3$</li> 
				<li>$30 = 2 \cdot 3 \cdot 5$</li> 
				<li>$91 = 7 \cdot 13$</li> 
			</ul> 

			<p> 
				Proces znajdowania, z jakich liczb pierwszych składa się dana liczba, nazywa się jej rozkładem na czynniki 
				lub <i>faktoryzacją</i>. Zwyczajowo zapisujemy pionową kreskę i po lewej stronie zapisujemy liczbę, którą rozkładamy. Po prawej stronie 
				dopisujemy kolejne odgadnięte czynniki pierwsze. Gdy zauważymy, że $60$ jest podzielne przez $2$, dokonamy częściowego rozkładu $60 = 2 \cdot 30$.
				Następnie rozkładamy liczbę $30$. Ponieważ jest podzielna przez $2$, postępujemy dalej z rozkładem: $60 = 2 \cdot 2 \cdot 15$. Liczba $15$ jest 
				podzielna przez $3$, czyli $60 = 2 \cdot 2 \cdot 3 \cdot 5$ Liczba $5$ jest niepodzielna, czyli tu rozkład się kończy.
			</p> 

			<table class="factorisation center">
				<tr><td>$60$</td><td>$2$</td></tr>
				<tr><td>$30$</td><td>$2$</td></tr>
				<tr><td>$15$</td><td>$3$</td></tr>
				<tr><td>$5$</td><td>$5$</td></tr>
				<tr><td>$1$</td><td></td></tr>
			</table>
		</lesson-chapter>

		<lesson-chapter><template #title>Największy wspólny dzielnik</template> 
			<p>
				<i>Dzielnikiem</i> liczby nazwyamy liczbę, przez którą jest ona podzielna. Dzielniki liczby $48$ to liczby, przez które $48$ jest podzielne, czyli 
				$1, 2, 3, 4, 6, 8, 12, 16, 24, 48$.
			</p>

			<p> 
				Obydwie liczby $40$ i $60$ dzielą się przez $1, 2, 4, 5, 10, 20$. Są to ich wspólne dzielniki. Największym z nich jest $20$. Dlatego $20$ jest 
				największym wspólnym dzielnikiem $40$ i $60$. Symbolicznie:
			</p>

			$$
				NWD(40, 60) = 20
			$$

			<p> 
				Aby znaleźć $NWD$ zadanych liczb, najprościej dokonać rozkładu na czynniki pierwsze każdej z nich, a następnie wybrać te czynniki, które 
				pojawiają się w obydwu rozkładach.
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
			
			$$
				NWD(120, 300) = {\bf \color{#dd3333}{2}} \cdot {\bf \color{#dd3333}{2}} \cdot {\bf \color{#dd3333}{3}} \cdot {\bf \color{#dd3333}{5}} = 60
			$$

		</lesson-chapter>

		<lesson-chapter><template #title>Najmniejsza wspólna wielokrotność</template> 
		<p> 
			<i>Wielokrotnością</i> liczby nazywamy jej iloczyn przez dowolną liczbę naturalną. Wielokrotności $20$ to jedna dwudziestka, dwie dwudziestki, 
			trzy dwudziestki, ..., czyli $20$, $40$, $60$, $80$, $100$, $...$.
		</p>

		<p>
			Zarówno $12$ jak i $20$ mają wśród swoich wielokrotności $60$, $120$, $180$, $240$, $...$. Najmniejszą spośród nich jest $60$, dlatego $60$ jest najmniejszą 
			wspólną wielokrotnością $12$ i $20$. Symbolicznie:
		</p>

		$$
			NWW(12, 20) = 60
		$$

		<p>
			Aby znaleźć $NWW$ zadanych liczb, najprościej dokonać rozkładu na czynniki każdej z nich i zaznaczyć czynniki, które pojawiają się w obydwu 
			rozkładach. Biorąc jednokrotnie wszystkie powtarzające się czynniki oraz wszystkie niepowtarzające się czynniki, dostajemy $NWW$.
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

		$$
			NWW(120, 300) = {\bf \color{#dd3333}{2}} \cdot {\bf \color{#dd3333}{2}} \cdot {\bf \color{#dd3333}{3}} \cdot {\bf \color{#dd3333}{5}} \cdot 2 \cdot 5
			= 600
		$$

		</lesson-chapter>

		<lesson-chapter><template #title>Nowe pojęcia</template> 
		<p> 
			<b>Teoria liczb</b> to dział matematyki zajmujący się badaniem podzielności liczb oraz tematów pokrewnych.
		</p>

		<p>
			Jeśli jedną liczbę można podzielić przez drugą bez reszty, to jest przez nią <b>podzielna</b> lub inaczej <b>dzieli się</b> przez nią. Można też 
			powiedzieć, że jedna liczba <b>dzieli</b> drugą lub że jest jej <b>dzielnikiem</b>. Poniższe stwierdzenia są równoznaczne:
			<ul>
				<li>$20$ jest podzielne przez $5$</li>
				<li>$20$ dzieli się przez $5$</li>
				<li>$5$ dzieli $20$</li>
				<li>$5$ jest dzielnikiem $20$</li>
			</ul>
			Symbolicznie zapisuje się ten fakt za pomocą pionowej kreski: $20 \mid 5$. 
		</p>

		<p>
			<b>Liczba parzysta</b> to liczba podzielna przez $2$.<br>
			<b>Liczba nieparzysta</b> daje resztę $1$ przy dzieleniu przez $2$
		</p>

		<p>
			<b>Dzielnik właściwy</b> danej liczby to dzielnik od niej mniejszy.<br>
			<b>Liczba doskonała</b> to liczba będąca sumą swoich dzielników właściwych, np. $6 = 1 + 2 + 3$<br>
			<b>Liczby zaprzyjaźnione</b> to takie dwie liczby, że każda jest sumą dzielników właściwych drugiej, np. $220$ i $284$.
		</p>

		<p>
			<b>Liczba pierwsza</b> to liczba większa od $1$ mająca dokładnie dwa dzielniki: $1$ oraz samą siebie. Są to m.in. $2$, $3$, $5$, $7$.<br>
			<b>Liczba złożona</b> to liczba dająca się przedstawić jako iloczyn co najmniej dwóch liczb pierwszych. Są to m.in. $4$, $6$, $8$, $9$<br>
			<b>Rozkład na czynniki pierwsze</b> lub inaczej <b>faktoryzacja</b> to proces prowadzący do zapisu liczby złożonej w postaci iloczynu liczb pierwszych.
		</p>

		<p>
			<b>NWD</b> dwóch liczb to największa liczba, która dzieli je obydwie. Np. $NWD(50, 45) = 5$.<br>
			<b>Wielokrotność</b> liczby dowolna liczba, która się przez nią dzieli. Wielokrotnościami $7$ są m.in. $7$, $14$, $21$, $28$, $...$<br>
			<b>NWW</b> dwóch liczb to najmniejsza liczba, którea dzieli się przez nie obydwie. Np. $NWW(50, 45) = 450$
		</p>

		<p>
			<b>Liczby względnie pierwsze</b> to takie liczby, dla których $NWD$ wynosi $1$. Liczby $24$, $10$ i $15$ są względnie pierwsze, ponieważ nie istnieje 
			liczba (oprócz $1$), która dzieli wszystkie trzy.<br>
			<b>Liczby parami względnie pierwsze</b> to takie liczby, że dowolne dwie spośród nich są względnie pierwsze. Powyższe trzy liczby nie są parami względnie 
			pierwsze, za to $10, 21, 13$ są.
		</p>
		</lesson-chapter>

    </lesson>
</template>

<script>
import LessonTitleShort from "../../../lesson/LessonTitleShort";
import LessonIntro from "../../../lesson/LessonIntro";
import LessonChapter from "../../../lesson/chapter/LessonChapter";
import Lesson from "../../../lesson/Lesson.vue";

export default {
  name: "PodzielnoscLiczbShort",
  data() {
    return {
      chapters: []
    };
  },
  components: {
    LessonIntro,
    LessonTitleShort,
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
