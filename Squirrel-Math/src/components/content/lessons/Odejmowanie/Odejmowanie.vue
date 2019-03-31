<template>
  <lesson>
    <lesson-title>Odejmowanie</lesson-title>

    <lesson-intro>   
    <p>
        Skoro nauczyliśmy się powiększać jedną liczbę o drugą, to teraz wypadałoby powiedzieć o pomniejszaniu jednej o drugą. 
        Istotę odejmowania słusznie ujął <span class="comment" id="Sidney Polak stwierdził również, że „człowiek jest tylko sumą oddechów”. 
		Skoro już umiesz dodawać, jesteś w stanie ocenić słuszność jego śmiałej teorii.">Sidney Polak: „Popatrz jak wszystko szybko się zmienia, 
		coś jest, a później tego nie ma”.</span>
	</p>
    </lesson-intro>   
	<lesson-chapter><template #title>Baba z wozu, koniom lżej</template>
    <p class = "type">
        Intuicje
    </p>
      
    <p>
        Zastanawiało Cię kiedyś, czemu koniom lżej? W chwili początkowej mamy wóz, a na nim babę. 
        Biedne konie męczą się z ciągnięciem ciężaru wozu i damy słusznego rozmiaru. Następnie obserwujemy, że baba z wozu. 
        Wtedy ciężar, który konie mają dźwigać, ogranicza się jedynie do wozu, <span class="comment" id="co kończy dowód">a więc koniom lżej</span>.
    </p>
        
    <p>
        <span class="comment" id="Wiem, że nie mogłeś się doczekać">Wróćmy lepiej do kulek na stole</span>. Powiedzmy, 
		że rozłożyliśmy $7$ kulek.
    </p>
      
    <p style="text-align: center">
        <svg height="200" width="800">
			<defs>
				<linearGradient id="gradient">
					<stop offset="20%" stop-color="#C33" />
					<stop offset="90%" stop-color="#833" />
				</linearGradient>
			</defs>
			<circle cx="230" cy="130" r="20" class = "draggable"></circle>
			<circle cx="210" cy="70" r="20" class = "draggable"></circle>
			<circle cx="190" cy="160" r="20" class = "draggable"></circle>
			<circle cx="450" cy="90" r="20" class = "draggable"></circle>
			<circle cx="490" cy="140" r="20" class = "draggable"></circle>
			<circle cx="540" cy="64" r="20" class = "draggable"></circle>
           <circle cx="530" cy="120" r="20" class = "draggable"></circle>
        </svg>
    </p> 
      
    <p>
        Stwierdziwszy, że położenie tych kulek przeczy naszemu poczuciu estetyki, zabieramy $4$ kulki.
    </p>
      
    <p style="text-align: center">
		<svg height="200" width="800">
			<circle cx="230" cy="130" r="20" class = "draggable"></circle>
			<circle cx="210" cy="70" r="20" class = "draggable"></circle>
			<circle cx="190" cy="160" r="20" class = "draggable"></circle>
        </svg>
    </p> 
      
    <p>
        Nietrudno zauważyć, że zostały nam $3$ kulki. Od $7$ kulek 
		zabieramy $4$ kulki, otrzymujemy $3$ kulki. Matematycznie zapiszemy 
        to tak:
    </p>
        
    $$
        7\ \text{kulek} - 4\ \text{kulki} = 3\ \text{kulki}
    $$
        
    <p>
        Znaczek $-$ podobnie jak $+$ jest symbolem matematycznym. 
		<span class="comment" id = "Jak dorośniesz, zrozumiesz różnicę.">
		Sam znaczek nazywa się „minus”, ale w działaniu czytamy go jako „odjąć”.</span> Znaczy on tyle, że od tego, co po lewej stronie, 
		zabieramy (czyli odejmujemy) to, co po prawej stronie. 
        Symbol $=$ jest Ci już znany. Mówi on tyle, że 
		$7 \text{ kulek} - 4 \text{ kulki}$ to to samo, co $3 \text{ kulki}$. 
    </p>
      
    <p>
        Odejmowanie nie musi odnosić się jedynie do kulek. Napotkamy je w wielu innych sytuacjach. 
    </p>
    
	<div class="example">
		Pasterz miał $10$ owiec. Pewnego dnia zły wilk zjadł $3$ owce. 
		Pozostało $7$ owiec.
		$$10\ \text{owiec} - 3\ \text{owce} = 7\ \text{owiec}$$
	</div>

	<div class="example">
		Pan Janusz niósł na urodziny pana Marka $5$ butelek 
		<span class="comment" id = "Lekcja zawiera lokowanie produktu.">Piccolo</span>. 
		Zamyślony teorią odejmowania potknął się o krawężnik i stłukł $2$ butelki. Do celu doniósł jedynie 
		$3$ butelki.
		$$5\ \text{butelek} - 2\ \text{butelki} = 3\ \text{butelki}$$
	</div>

	<div class="example">
		Kupiłeś $30$ ciastek z zamiarem spędzenia miłego wieczoru. Nie wiesz, że kiedy czytasz „Squirrel Math”, 
		młodsza siostra zjada Ci wszystkie ciastka. Najadłeś się zamiarem.
		$$30\ \text{ciastek} - 30\ \text{ciastek} = 0\ \text{ciastek}$$
	</div>
      
    <p>
        Ponieważ jesteśmy profesjonalistami, umiemy wykonywać odejmowanie nie tylko na kulkach, owcach, butelkach i ciastkach, 
        ale też na liczbach jako takich. Powyższe równości można zapisać ogólniej:
    </p>
    
    $$
        7 - 4 = 3\\
        10 - 3 = 7\\
        5 - 2 = 3\\
        30 - 30 = 0\\
    $$
        
	</lesson-chapter>

    <lesson-chapter><template #title>Nazewnictwo</template>   
    <p class = "type">
        Intuicje
    </p>
      
    <p>
        Podobnie, jak w przypadku dodawania określamy składniki i sumę, tak w odejmowaniu matematycy pokusili się o wyróżnienie 
        poszczególnych składowych działania. Tu jednak ma znaczenie, czy liczba stoi przed znakiem $-$, czy po nim. Liczbę, 
        od której <i>odejmujemy</i> (po lewej), nazywamy <i>odjemną</i>, a liczbę, którą odejmujemy (po prawej), nazywamy 
        <i>odjemnikiem</i>. Wynik odejmowania określamy mianem <i>różnica</i>.
    </p>
        
    $$
        \text{odjemna} - \text{odjemnik} = \text{różnica}
    $$
    
    <ul>
        <li>W działaniu $10 - 4 = 6$ odjemną jest $10$, odjemnikiem jest $4$, a różnicą $6$.</li>
        <li>W działaniu $12 - 7 = 5$ odjemną jest $12$, odjemnikiem jest $7$, a różnicą $5$.</li>
        <li>W działaniu $4 = 9 - 5$ odjemną jest $9$, odjemnikiem $5$, a różnicą $4$.</li>
    </ul>
    </lesson-chapter>

    <lesson-chapter><template #title>Odejmowanie jako odwrotność dodawania</template>   
    <p class = "type">
        Intuicje
    </p>
    
    <p>
        Przyjrzyjmy się kulkom raz jeszcze.
    </p>
    
    <p style="text-align: center">
        <svg height="150" width="800">
			<circle cx="190" cy="130" r="20" class = "draggable"></circle>
			<circle cx="220" cy="70" r="20" class = "draggable"></circle>
			<circle cx="230" cy="30" r="20" class = "draggable"></circle>
			<circle cx="250" cy="100" r="20" class = "draggable"></circle>
			<circle cx="490" cy="30" r="20" class = "draggable"></circle>
			<circle cx="520" cy="100" r="20" class = "draggable"></circle>
			<circle cx="540" cy="30" r="20" class = "draggable"></circle>
			<circle cx="480" cy="70" r="20" class = "draggable"></circle>
			<circle cx="570" cy="70" r="20" class = "draggable"></circle>
			<circle cx="560" cy="120" r="20" class = "draggable"></circle>
        </svg>
    </p> 
    
    <p>
        Obrazek ten może nas <span class="comment" id="Chłoń go pełną piersią.">zainspirować</span> do stwierdzenia, że:
    </p>
        
    <p style="text-align: center">
        $4$ kulki i $6$ kulek to razem $10$ kulek<br>
        $4 + 6 = 10$
    </p>
        
    <p style="text-align: center">
        Kiedy od $10$ kulek zabierzemy $6$ kulek, to pozostaną nam $4$ kulki<br>
        $10 - 6 = 4$
    </p>

    <p style="text-align: center">
        Kiedy od $10$ kulek zabierzemy $4$ kulki, to pozostanie nam $6$ kulek<br>
        $10 - 6 = 4$
    </p>

    <p>
        Nasuwa się wyraźna zależność pomiędzy dodawaniem i odejmowaniem. Kiedy napotkamy problem, próbując odjąć $10 - 4$, 
        możemy zadać sobie pytanie „co należy dodać do $4$, by otrzymać $10$?”. Stwierdzimy wtedy, że od $4$ do $10$ brakuje jeszcze $6$.
    </p>
        
    <p>
        Z powodu występowania takiej zależności mówimy, że odejmowanie jest działaniem odwrotnym do dodawania.
        Spostrzeżenie to bywa bardzo praktyczne.
    </p>
    
	<div class="example">
		Za złe zachowanie pensja pana Janusza spada ze $120 \text{ zł}$ do $110 \text{ zł}$ za dzień. 
		Zdruzgotany pan Janusz zastanawia się, 
		jak bardzo jest stratny, czyli jaka jest różnica między jego poprzednią a obecną pensją. Napotykając problem z 
		obliczeniem $120 - 110$ pan Janusz zastanawia się, ile musiałby dołożyć do $110$, 
		aby otrzymać $120$:
		$$110 + \text{∎} = 120$$
		Stwierdza, że różnica wynosi $10 \text{ zł}$.
	</div>

	<div class="example">
		Gutek zbiera na wymarzony zestaw Lego, który kosztuje $120 \text{ zł}$. 
		<span class="comment" id="Zwyczajowo zwaną kieszonkowym">Ciężką pracą</span>
		zarobił $40 \text{ zł}$ i zastanawia się, ile 
		jeszcze musi uzbierać. Stoi więc przed problemem:
		$$40 + \text{∎} = 120$$
		Odpowiedź $80$ to wynik odejmowania $120 - 40$.
	</div>
    
	</lesson-chapter>

    <lesson-chapter><template #title>Własności odejmowania</template>   
	  
    <p class = "type">
        Rozszerzenie
    </p>
    
    <p>
        Przy wprowadzaniu nazw odjemna i odjemnik dumnie ogłosiliśmy, że w odejmowaniu ma znaczenie, czy liczba stoi przed 
        znakiem $-$, czy po nim. <span class="comment" id="Chyba że jesteś wrażliwy. Wtedy po prostu to przeczytaj.">
		Wyobraź sobie</span>, że w stadzie jest $10$ owiec, a wilk zjada spośród nich dwie. Pozostaje $8$ owiec. 
        $10 - 2 = 8$ i <span class="comment" id="Pomijając fakt, że dwie owce właśnie zostały zagryzione.">z tym 
		większego problemu nie ma</span>. Teraz wyobraź sobie, że w stadzie są dwie owce, a wilk zjada spośród 
        nich $10$. Sytuacja taka najpewniej pozwoliłaby rozwiązać problem głodu na świecie, jednak rzeczywistość nie 
		jest łaskawa. 
        Jak widać, $10 - 2$ to nie to samo, co $2 - 10$, a więc odejmowanie nie jest przemienne.
    </p>
      
    <p>
        Zastanówmy się jeszcze, czy odejmowanie jest łączne. Gdyby tak było, działanie
    </p>
    
    $$
        8 - 5 - 2
    $$
    
    <p>
        można by wykonać na dwa sposoby, otrzymując ten sam wynik:
    </p>
       
    <p style="text-align: center">
        Odejmujemy najpierw $8 - 5$, a potem od wyniku odejmujemy $2$<br>
        $8 - 5 = 3$<br>
        $3 - 2 = 1$<br>
        Dostajemy $1$
    </p>

    <p style="text-align: center">
        Najpierw obliczamy $5 - 2$, a potem odejmujemy wynik od $8$<br>
        $5 - 2 = 3$<br>
        $8 - 3 = 5$<br>
        Dostajemy $5$<br>
    </p>
      
    <p>
        Ponieważ wyniki są różne, odejmowanie nie jest łączne. Reguła mówi, że gdy napotkamy wiele znaków $-$ w jednym działaniu, 
        należy je rozpracowywać od lewej do prawej. Licząc poprawnie: $8 - 5 - 2 = 1$.
    </p>    
	</lesson-chapter>

    <lesson-chapter><template #title>Odejmowanie w słupku</template>   
    <p class = "type">
        Warsztat
    </p>
    
    <p>
        Podobnie jak w przypadku dodawania, matematycy pokusili się na wynalezienie metody <span class="comment" id="Nie bój się, będzie dobrze.">
		<i>odejmowania w słupku</i></span> zwanej też 
        <i>odejmowaniem pisemnym</i>.
    </p>
    
    <p>
        W przypadku liczb jednocyfrowych odejmowanie nie powinno sprawiać większych trudności - na dobry początek warto 
        skorzystać z faktu, że odejmowanie jest odwrotne do dodawania. Gdy zastanawiamy się, ile jest $7 - 3$, musimy znaleźć 
        taką liczbę, że po dodaniu do niej $3$ otrzymamy $7$. W razie potrzeby można nawet 
		skorzystać z tabliczki dodawania:
    </p>

    <operation-table 
    :default_loperand="3" 
    :default_roperand="4" 
    :f="function(a,b){return a+b}" 
    :print="function(a,b,c){return c + ' - ' + a + ' = ' + b}"
    ></operation-table>

    <p>
        Patrzymy na kolumnę zatytułowaną jako „$3$”. Jedziemy wzrokiem wzdłuż niej, aż napotkamy interesujący nas wynik - $7$. 
        Sprawdzamy, że $7$ występuje w wierszu oznaczonym jako „$4$”. Oznacza to tyle, że 
		$3 + 4 = 7$, a więc $7 - 3 = 4$. Prawdziwa zabawa zaczyna się przy odejmowaniu większych liczb.
    </p>
     
    <div class = "example">
        <p>
            Odejmowania w słupku nauczymy się na przykładzie 
            $3698 - 1274$. Zaczynamy podobnie jak z dodawaniem - piszemy liczby jedna pod drugą z wyrównaniem do prawej i 
            podkreślamy.
        </p>
        
        <columnar-operation-table :operation='"-"' :numbers='[[], [], ["3", "6", "9", "8"], ["1", "2", "7", "4"], []]'></columnar-operation-table>
        
        <p>
            Teraz odejmujemy po kolei cyfry jedności, cyfry dziesiątek, cyfry setek i cyfry tysięcy. Wyniki zapisujemy odpowiednio pod kreską
            <ul>
                <li>$8 - 4 = 4$, więc pod $8$ i $4$ piszemy $4$.</li>
                <li>$9 - 7 = 2$, więc pod $9$ i $7$ piszemy $2$.</li>
                <li>$6 - 2 = 4$, więc pod $6$ i $2$ piszemy $4$.</li>
                <li>$3 - 1 = 2$, więc pod $3$ i $1$ piszemy $2$.</li>
            </ul>
        </p>    
        
        <columnar-operation-table :operation='"-"' :numbers='[[], [], ["3", "6", "9", "8"], ["1", "2", "7", "4"], ["2", "4", "2", "4"]]'></columnar-operation-table>
        
        <p>
            Odczytujemy, że wynik odejmowania to $2424$. Proste, prawda? Trochę zbyt proste.
        </p> 
    </div>
        
    <div class="example">
        <p>
            Teraz czas na intensywne wrażenia: obliczmy $2737 - 683$.
        </p>

        <columnar-operation-table :operation='"-"' :numbers='[[], [], ["2", "7", "3", "7"], ["", "6", "8", "3"], []]'></columnar-operation-table>

        <p>
            Odejmujemy cyfrę jedności od cyfry jedności: $7 - 3 = 4$.
        </p>

        <columnar-operation-table :operation='"-"' :numbers='[[], [], ["2", "7", "3", "7"], ["", "6", "8", "3"], ["", "", "", "4"]]'></columnar-operation-table>
        
        <p>
            Odejmujemy cyfrę dziesiątek od cyfry dziesiątek: $3 - 8 = …$ no i mamy problem. 
            <span class="comment" id="Chyba że jesteś poborcą podatkowym.">
            Ciężko byłoby zabrać od czegoś małego coś dużego.</span> Robimy taki trik: trójkę zwiększamy o $10$ 
            (robimy z niej $13$) kosztem cyfry po lewej - siódemkę zmniejszamy 
            o $1$ (robimy z niej $6$).
        </p>
    
        <columnar-operation-table :operation='"-"' :numbers='[[], ["", "6", "13"], ["2", "/s: 7", "/s: 3", "7"], ["", "6", "8", "3"], ["", "", "", "4"]]'></columnar-operation-table>
            
        <p>
            Po takim zabiegu reszta działań jest łatwa:
            <ul>
                <li>$13 - 8 = 5$, więc pod $13$ i $8$ piszemy $5$.</li>
                <li>$6 - 6 = 0$, więc pod $6$ i $6$ piszemy $0$.</li>
                <li>$2$ jest sama, więc pozostaje bez zmian.</li>
            </ul>
        </p>
        
        <columnar-operation-table :operation='"-"' :numbers='[[], ["", "6", "13"], ["2", "/s: 7", "/s: 3", "7"], ["", "6", "8", "3"], ["2", "0", "5", "4"]]'></columnar-operation-table>
        
        <p>
            Wynikiem jest $2054$. Największym problemem przy odejmowaniu w słupku jest wykonywanie „pożyczania”, czyli właśnie 
            tego triku z trzynastką i szóstką. 
        </p>
    </div>

    <div class="example">
        <p>
            Czasami sprawy bywają jeszcze bardziej skomplikowane. 
            Zobaczmy, jak odjąć $1358 - 489$.
        </p>

        <columnar-operation-table :operation='"-"' :numbers='[[], [], ["1", "3", "5", "8"], ["", "4", "8", "9"], []]'></columnar-operation-table>

        <p>
            Próbujemy odjąć $8 - 9$. Ponieważ są problemy, robimy pożyczkę i odejmujemy $18 - 9 = 9$.
        </p>
    
        <columnar-operation-table :operation='"-"' :numbers='[[], ["", "", "4", "18"], ["1", "3", "/s: 5", "/s: 8"], ["", "4", "8", "9"], ["", "", "", "9"]]'></columnar-operation-table>
            
        <p>
            Teraz pora na $4 - 8$. Widzimy, że znowu są problemy, więc dokonujemy kolejnej pożyczki i odejmujemy $14 - 8 = 6$.
        </p>
    
        <columnar-operation-table :operation='"-"' :numbers='[["", "", "14", ""], ["", "2", "/s: 4", "18"], ["1", "/s: 3", "/s: 5", "/s: 8"], ["", "4", "8", "9"], ["", "", "6", "9"]]'></columnar-operation-table>

        <p>
            Odejmowanie $2 - 4$ ponownie wymaga zaciągnięcia pożyczki. 
        </p>
        
        <columnar-operation-table :operation='"-"' :numbers='[["", "12", "14", ""], ["0", "/s: 2", "/s: 4", "18"], ["/s: 1", "/s: 3", "/s: 5", "/s: 8"], ["", "4", "8", "9"], ["", "8", "6", "9"]]'></columnar-operation-table>
        
        <p>
            Z zapożyczonej jedynki nic już nie zostało. Skoro tak, to $869$ jest ostatecznym wynikiem.
        </p>
    </div>

    <div class="example">
        <p>
            Zróbmy jeszcze jeden przykład. 
            Jeśli go zrozumiesz, odejmowanie w słupku nie będzie miało przed Tobą tajemnic.
        </p>

        <columnar-operation-table :operation='"-"' :numbers='[[], [], ["1", "0", "0", "0"], ["", "6", "7", "9"], []]'></columnar-operation-table>

        <p>
            Na dobry początek dostajemy $0 - 9$. Widać, że musimy zaciągnąć pożyczkę. Ale nawet zaciąganie pożyczki 
            jest kłopotliwe. 
            Z zera w cyfrach jedności chcemy uczynić $10$ kosztem zera w cyfrach dziesiątek. Ale przecież nie możemy dokonywać zapożyczenia z zera,
            bo nie jesteśmy w stanie zmniejszyć zera. Napotykamy dość nieprzyjemną serię pożyczek, gdzie jedna pożyczka wymaga zaciągnięcia kolejnej.
            Przesuńmy się w takim razie jeszcze bardziej na lewo i dokonajmy pożyczki z cyfry tysięcy:
        </p>
        
        <columnar-operation-table :operation='"-"' :numbers='[[], ["0", "10", "", ""], ["/s: 1", "/s: 0", "0", "0"], ["", "6", "7", "9"], []]'></columnar-operation-table>

        <p>
            Teraz możemy wykonać pożyczkę o krok wcześniej
        </p>

        <columnar-operation-table :operation='"-"' :numbers='[["", "9", "", ""], ["0", "/s: 10", "10", ""], ["/s: 1", "/s: 0", "/s: 0", "0"], ["", "6", "7", "9"], []]'></columnar-operation-table>
        
        <p>
            I jeszcze o krok wcześniej:
        </p>
        
        <columnar-operation-table :operation='"-"' :numbers='[["", "9", "9", ""], ["0", "/s: 10", "/s: 10", "10"], ["/s: 1", "/s: 0", "/s: 0", "/s: 0"], ["", "6", "7", "9"], []]'></columnar-operation-table>

        <p>
            Wreszcie możemy wykonać odejmowanie i otrzymać wynik $321$.
        </p>
        
        <columnar-operation-table :operation='"-"' :numbers='[["", "9", "9", ""], ["0", "/s: 10", "/s: 10", "10"], ["/s: 1", "/s: 0", "/s: 0", "/s: 0"], ["", "6", "7", "9"], ["", "3", "2", "1"]]'></columnar-operation-table>
    </div>

    <p>
        <span class="comment" id="to nie zaciągaj kredytu hipotecznego. To cię zrujnuje">Jeśli czujesz się trochę zagubiony w tych wszystkich pożyczkach,</span>
        prześledź dowolne własne przykłady wpisując je do poniższego pola. Poza tym nie martw się,
        odejmowanie w słupku jest głównie po to, żeby męczyć nim dzieci w podstawówce. Z czasem nabierzesz wprawy w liczeniu i będziesz w stanie
        odejmować nawet duże liczby w pamięci. A jeśli nie, to przecież zawsze jest kalkulator.
    </p>
      
      
    <columnar-operation :operation="'subtraction'" :floats="false"></columnar-operation>

	<p class = "type optional-hide">
        Rozszerzenie
    </p>
    <p class = "warning">wymagana znajomość tematu: Kolejność wykonywania działań</p>
    <div>
        <p>
            Jeśli jesteś dociekliwy, możemy przyjrzeć się metodzie odejmowania w słupku i zobaczyć, dlaczego te wszystkie pożyczki 
            działają poprawnie. Weźmy pod lupę przykład $2737 - 683$.
        </p>
        
        <p style="text-align: center">
            $2737 - 683 =$<br>
            <span class="comment_visible" id="Rozbijamy liczbę na cyfry">$= (2000 + 700 + 30 + 7) - (600 + 80 + 3) =$</span><br>
            $= 2000 + 700 + 30 + 7 - 600 - 80 - 3 =$<br>
            <span class="comment_visible" id="Porządkujemy cyfry tysięcy, setek, dziesiątek i jedności">$  = 2000 + (700 - 600) + (30 - 80) + (7 - 3) =$</span><br>
            <span class="comment_visible" id="Odejmujemy cyfry jedności">$ = 2000 + (700 - 600) + (30 - 80) + 4 =$</span><br>
            <span class="comment_visible" id="Zaciągamy pożyczkę">$   = 2000 + (600 + 100 - 600) + (30 - 80) + 4 =$</span><br>
            $ = 2000 + (600 - 600) + (100 + 30 - 80) + 4 =$ <br>
            $ = 2000 + (600 - 600) + (130 - 80) + 4 =$<br>
            <span class="comment_visible" id="Odejmujemy cyfry dziesiątek">$  = 2000 + (600 - 600) + 50 + 4 =$</span><br>
            <span class="comment_visible" id="Odejmujemy cyfry setek">$  = 2000 + 0 + 50 + 4 =$</span><br>
            $= 2054$<br>
        </p>
    
        <p>
            Spójrzmy jeszcze na $1000 - 679$.
        </p>
        
        <p style="text-align: center">
            $1000 - 679 =$<br>
            <span class="comment_visible" id="Rozbijamy na cyfry">$  = (1000 + 0 + 0 + 0) - (600 + 70 + 9) =$</span><br>
            $ = 1000 + 0 + 0 + 0 - 600 - 70 - 9 =$<br>
            <span class="comment_visible" id="Porządkujemy wszystkie cyfry">$  = 1000 + (0 - 600) + (0 - 70) + (0 - 9) =$</span><br>
            <span class="comment_visible" id="Zaciągamy „trzecią” pożyczkę">$  = 0 + (1000 - 600) + (0 - 70) + (0 - 9) =$</span><br>
            <span class="comment_visible" id="Zaciągamy „drugą” pożyczkę">$  = 0 + (900 + 100 - 600) + (0 - 70) + (0 - 9) =$</span><br>
            $  = 0 + (900 - 600) + (100 - 70) + (0 - 9) =$ 	<br>
            <span class="comment_visible" id="Zaciągamy „pierwszą” pożyczkę">$  = 0 + (900 - 600) + (90 + 10 - 70) + (0 - 9) =$</span><br>
            $= 0 + (900 - 600) + (90 - 70) + (10 - 9) =$<br>
            <span class="comment_visible" id="Odejmujemy wszystkie cyfry">$  = 0 + 300 + 20 + 1$</span><br>
            $= 321$<br>
        </p>
        
        <p>
            Poniżej omawiamy dodawanie pisemne z formalnego punktu widzenia, zaspokajając dociekliwość najbardziej zagorzałych matematyków. Nie polecamy zagłębiać
            się w poniższe wywody, jeśli nie jesteś matematycznym weteranem, który lubi znać odpowiedź na każde pytanie.
        </p>
  
        <p class = "type">
            Formalnie
        </p>
        <p class = "warning">wymagana znajomość tematu: Indukcja matematyczna</p>
        <p>
            Formalnie algorytm odejmowania pisemnego przedstawia się następująco. Dane są liczby $a$ i $b$ ($a \geq b$) o reprezentacjach dziesiętnych
            $a = \sum_{j = 0}^{l_a} 10^j a_j, b = \sum_{j = 0}^{l_b} 10^j b_j$, gdzie $l_a, l_b$ oznaczają długość (liczbę cyfr) odpowiednio liczb $a$ i $b$, zaś 
            $a_j, b_j \in \{0, 1, 2, 3, 4, 5, 6, 7, 8, 9\}$, zakłądamy też $a_{l_a}, b_{l_b} \neq 0$.
            Poszukiwana jest reprezentacja dziesiętna ich różnicy $d = a - b$.
        </p>
        
        <p>
            Z założenia $a \geq b$ wynika, że $l_a \geq l_b$. Wobec tego wprowadźmy symbol $l = l_a$ (wtedy $a = \sum_{j = 0}^{l} 10^j a_j$) oraz rozwińmy
            postać dziesiętną liczby $b$ do długości $l$ cyfr przez dodanie zer z przodu: $b = \sum_{j = 0}^{l} 10^j b_j$, 
            przy czym $b_j = 0$ dla $j > l_b$. Wtedy
        </p>

        $$
            d = a - b = \sum_{j = 0}^{l} 10^j a_j - \sum_{j = 0}^{l} 10^j b_j = \sum_{j = 0}^{l} 10^j \left(a_j - b_j \right)
        $$

        <p>
            Dokonamy teraz kroku indukcyjnego, który odpowiada wyznaczeniu różnicy cyfr $a_i$ oraz $b_i$ z tej samej kolumny podczas odejmowania pisemnego. Niech $c_k$
            oznacza różnicę obliczoną dla kolumny $k$. Zakładamy, że w momencie wykonywania $i$-tego kroku wartości
            $c_0, c_1, ..., c_{i-1}$ zostały już obliczone i mieszczą się w zbiorze $\{0, 1, 2, 3, 4, 5, 6, 7, 8, 9\}$. Oznaczmy 
            przez $r_i$ ewentualne zapożyczenie dokonane na kolumnie $i$. $r_i$ będzie przyjmować wartość $1$, jeśli zapożyczenie zostało dokonane lub $0$, jeśli nie zostało.
            Dla kroku zerowego ustalamy $r_0 = 0$. Zakładamy więc, że w momencie sumowania cyfr $i$-tej kolumny liczbę $d$ można przedstawić w postaci
            $$
                d = c_0 + 10^1c_1 + 10^2c_2 + ... + 10^i(a_i - r_i - b_i) + \sum_{j = i + 1}^{l} 10^j \left(a_j - b_j \right)
            $$
            W wyniku obecnego kroku indukcyjnego będziemy chcieli rozwinąć tę postać o jeden element dalej, co sprowadza się do wyznaczenia wartości $c_i$ oraz $r_{i+1}$.
            Rozważmy dwa przypadki:
        </p>

        <ol>
            <li>
                <p>$a_i - r_i \geq b_i$</p>
                <p>
                    Przypadek ten odpowiada sytuacji, w której od cyfry odjemnej jest odejmowana cyfra o mniejszej (lub równej) wartości.
                    Ustalamy $c_i = a_i - r_i - b_i, r_{i+1} = 0$ Z założenia dla tego przypadku wynika, że $c_i \geq 0$, ponadto $a_i \leq 9$, więc również $c_i \leq 9$, czyli
                    $0 \leq c_i \leq 9$. Mamy więc
                    $$
                        d = c_0 + 10^1c_1 + ... + 10^i c_i + 10^{i+1}(a_{i+1} - r_{i+1} - b_{i+1}) + \sum_{j = i + 2}^{l} 10^j \left(a_j - b_j \right)
                    $$
                </p>
            </li>
            <li>
                <p>$a_i - r_i \lt b_i$</p>
                <p>
                    Przypadek ten odpowiada sytuacji, w której od cyfry o mniejszej wartości jest odejmowana cyfra o większej wartości, wobec czego
                    zachodzi potrzeba dokonania zapożyczenia z kolejnej kolumny.
                    Ustalamy $c_i = 10 + a_i - r_i - b_i, r_{i+1} = 1$. Z założenia $a_i - r_i \lt b_i$ zachodzą implikacje:
                    $$a_i - r_i \leq b_i - 1\\
                    a_i - b_i \leq r_i - 1\\
                    10 - r_i + a_i - b_i \leq 10 - r_i + r_i - 1 \\
                    c_i \leq 9$$
                    Ponadto $a_i \geq 0$, $-r_i \geq -1$ oraz $-b_i \geq -9$, więc 
                    $$10 + a_i - r_i - b_i \geq 10 + 0 - 1 - 9 \\
                    c_i \geq 0$$
                    a zatem $0 \leq c_i \leq 9$. Mamy więc 
                    $$
                        d = c_0 + 10^1c_1 + 10^2c_2 + ... + 10^i(10 - 10 + a_i - r_i - b_i) + 10^{i+1}(a_{i+1} - b_{i+1}) + \sum_{j = i + 2}^{l} 10^j \left(a_j - b_j \right) =\\
                        = c_0 + 10^1c_1 + 10^2c_2 + ... + 10^i(10 + a_i - r_i - b_i) + 10^{i+1}(a_{i+1} - 1 - b_{i+1}) + \sum_{j = i + 1}^{l} 10^j \left(a_j - b_j \right) =\\
                        = c_0 + 10^1c_1 + 10^2c_2 + ... + 10^ic_i + 10^{i+1}(a_{i+1} - r_{i+1} - b_{i+1}) + \sum_{j = i + 1}^{l} 10^j \left(a_j - b_j \right)
                    $$
                </p>
            </li>
        </ol>

        <p>
            Na zasadzie indukcji liczba $d$ zostaje rozwinięta do postaci dziesiętnej:
            $$
                d = c_0 + 10^1c_1 + 10^2c_2 + ... + 10^lc_l
            $$
            Pozostaje jeszcze uzasadnić, że $r_{l+1} = 0$, czyli że nie zostało wykonane zapożyczenie z kolumny na pozycji większej niż $l$. Dowodząc nie wprost,
            przypuśćmy, że $r_{l+1} = 1$. Cofając się o jeden krok wstecz w dokonanej indukcji, stwierdzamy, że dla kolumny $l$ zaszedł przypadek ($2$): 
            $a_l - r_l \lt b_l$ (gdyby było inaczej, wartość
            $r_{l+1}$ zostałaby ustalona na $0$). Z pierwotego założenia $a \geq b$ wynika, że $a_l \geq b_l$ (najbardziej znacząca cyfra $a$ jest nie mniejsza niż
            najbardziej znacząca cyfra $b$). W takim razie jedyną sytuacją spełniającą wszystkie warunki jest przypadek $a_l = b_l, r_l = 1$. Ponownie, oznacza to,
            że $a_{l - 1} - r_{l - 1} \lt b_{l - 1}$, przy czym z uwagi na równość najbardziej znaczących cyfr $a$ i $b$ musi zachodzić $a_{l-1} \geq b_{l-1}$
            (w przeciwnym razie $a \lt b$). To zaś implikuje $a_{l-1} = b_{l-1}, r_{l-1} = 1$. Kontynuując rozumowanie wstecz, dochodzimy do wniosku,
            że $r_0 = 1$ wbrew założeniu indukcyjnemu, co kończy dowód nie wprost.
        </p>
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
import OperationTable from "../../../utils/OperationTable";

export default {
  name: "Odejmowanie",
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
    OperationTable
  }
};
</script>

<style scoped>
</style>
