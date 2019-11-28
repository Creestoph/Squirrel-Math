<template>
  <lesson>
    <lesson-title>Równania i nierówności liniowe</lesson-title>

    <lesson-intro>   
    <p>
        Pierwszym i najprostszym rodzajem równań, które rozpracujemy <span class="comment" id="a może raczej od $x$ do $x$">od $a$ do $z$</span> są równania liniowe.
        Ich rozwiązywanie jest tak proste, jak podejmowanie decyzji w grach z liniową fabułą.
	</p>
    </lesson-intro>   
	<lesson-chapter><template #title>Gdzie jest ta linia?</template>
    <p class = "type">
		Intuicje
	</p>
    <p> 
        Z najprostszymi równaniami liniowymi zetknęliśmy się już w temacie wprowadzającym do równań. Są to takie równania, które po obydwu stronach 
        znaku $=$ mają jakieś zmienne $x$ przeplatane dodawaniem i mnożeniem przez liczby, na przykład
    </p>

    $$
    x + 2 \cdot x - 4 \cdot (x + 7) + 10 = 2 \cdot (x - 3 \cdot (5 \cdot x - 6))
    $$

    <p> 
        Główną cechą równań liniowych jest to, że wszystkie niewiadome $x$ występują w pierwszej potędze, czyli nigdzie wewnątrz równania nie pojawia się coś takiego, jak 
        $x^2$ - wtedy najpewniej mielibyśmy do czynienia z równaniem kwadratowym. Możemy niezobowiązująco uznać, że powyższe równanie jest "liniowe", bo kolejne symbole 
        zapisujemy obok siebie od lewej do prawej, jakbyśmy nawlekali je na prosty sznurek: najpierw piszemy iksa, potem obok plusa, dwójkę, znak mnożenia, iksa, minusa itd. Nie pojawiają się potegi w indeksach górnych, 
        nie pojawiają się $x$ w mianownikach ułamków albo pod pierwiastkami. Tak na prawdę nazwa "równania liniowe" nabierze więcej sensu po lekcji "Funkcja liniowa" - wtedy okaże się, 
        że rzeczywiście istnieje silny związek tych równań z linią prostą.
    </p>

    <p>
        Strategia na ich rozwiązywanie będzie następująca:
    </p>
    <ol> 
        <li>Najpierw wymnażamy wszystkie nawiasy, żeby uprościć obie strony równań do postaci sum algebraicznych.</li>
        <li>Sprowadzamy równanie do najprostszej postaci przez redukcję wyrazów podobnych.</li>
        <li>Dodajemy/odejmujemy obustronnie iksy i wartości liczbowe w taki sposób, żeby po jednej stronie równania znalazły się same iksy, a po drugiej 
            pewna wartość liczbowa.</li>
        <li>Dzielimy równanie obustronnie, by wyliczyć wartość $x$.</li>
    </ol>

    <div class="example"> 
        Rozpracujmy powyższe groźnie wyglądające równanie. Wymnażamy nawiasy, zwracając szczególną uwagę na znaki:
        $$
        \begin{align}
        x + 2x - 4(x + 7) + 10 &= 2(x - 3(5x - 6))\\
        x + 2x - 4x - 28 + 10 &= 2(x - 15x + 18)\\
        x + 2x - 4x - 28 + 10 &= 2x - 30x + 36\\
        \end{align}
        $$
        Dodajemy wyrazy podobne: iksy do iksów i liczby do liczb:
        $$
        \begin{align}
        x + 2x - 4x - 28 + 10 &= 2x - 30x + 36\\
        -x - 18 &= -28x + 36
        \end{align}
        $$
        Przerzucamy iksy na lewą stronę i liczby na prawą:
        $$
        \begin{align}
        \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ -x - 18 &= -28x + 36 \ \ \ \color{#888888}{| +28x}\\
        27x - 18 &= 36 \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \color{#888888}{| +18}\\
        27x &= 54
        \end{align}
        $$
        Dokonujemy obustronnego dzielenia, by poznać rozwiązanie:
        $$
        \begin{align}
        \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ 27x &= 54 \ \ \ \ \ \ \ \ \ \ \ \ \color{#888888}{| :27}\\
        x &= 2
        \end{align}
        $$
    </div>

    <p class = "type">
		Formalnie
	</p>
    <p>
        Równania liniowe to równania, które można sprowadzić do postaci
    </p>
    $$
        ax + b = 0
    $$
    <p> 
        Gdzie $a \in \mathbb{R} \setminus \{0\}, b \in \mathbb{R}$ są liczbami rzeczywistymi nazywanymi <i>współczynnikami równania</i> liniowego. 
        Rozwiązaniem takiego równania jest $x = -\frac{b}{a}$. Na przykład równanie z powyższego przykładu sprowadza się do postaci $27x - 54 = 0$, czyli 
        według konwencji $a = 27$ oraz $b = -54$. 
    </p>

    <p> 
        Gdyby w powyższej formule przyjąć $a = 0$ i $b = 0$, równanie miałoby postać $0x + 0 = 0$, czyli byłoby to równanie tożsamościowe. Gdyby 
        $a = 0$ i $b \neq 0$, równanie miałoby po lewej stronie pewną niezerową liczbę, a po drugiej stronie $0$, co stanowi równanie sprzeczne.
    </p>
	</lesson-chapter>

	<lesson-chapter><template #title>Trudniejsze zagadki</template>
    <p class = "type">
		Warsztat
	</p>
    <div class="example"> 
        Na nagrobku Diofantosa, którego uważa się za ojca arytmetyki, algebry i metod rozwiązywania równań, podobno znajdowała się zagadka, którą tylko nieliczni 
        potrafili rozwikłać. Brzmiała ona:
        "Tu jest grobowiec, w którym złożono prochy Diofantosa. Przez jedną szóstą jego życia Bóg obdarzył go młodością, przez dalszą, dwunastą część życia jego policzki były 
        pokryte brodą. Po siódmej dalszej części życia doświadczył szczęścia małżeńskiego, w którego piątym roku został ojcem syna. Nieszczęśliwie syn żył tylko połowę lat 
        ojca, który pozostał w smutku przez cztery ostatnie lata swego życia. Przechodniu, oblicz długość jego życia!""<br><br> 

        Oznaczmy przez $x$ szukaną długość życia. Na $x$ lat życia Diofantosa składają się: $\frac{1}{6}x$ (młodość), $\frac{1}{12}x$ (okres brody), $\frac{1}{7}x$ 
        (okres przedmałżeński),
        $5$ lat (wtedy nadeszło dziecko), $\frac{1}{2}x$ (czas spędzony z synem), $4$ lata (okres smutku). Stąd równanie: 
        $$x = \frac{1}{6}x + \frac{1}{12}x + \frac{1}{7}x + 5 + \frac{1}{2}x + 4$$
        Aby uniknąć uciążliwych obliczeń na ułamkach, pomnóżmy obie strony równania przez $NWW$ wszytskich mianowników, czyli przez $84$:
        $$\begin{align}
            x &= \frac{1}{6}x + \frac{1}{12}x + \frac{1}{7}x + 5 + \frac{1}{2}x + 4\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \color{#888888}{| \cdot 84}\\
            84x &= \frac{84}{6}x + \frac{84}{12}x + \frac{84}{7}x + 84 \cdot 5 + \frac{84}{2}x + 84\cdot4\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \\
            84x &= 14x + 7x + 12x + 420 + 42x + 336\\
            84x &= 75x + 756\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \color{#888888}{| -75x}\\
            9x &= 756\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \color{#888888}{| :9}\\
            x &= 84
        \end{align}$$
        Właściwie zagadkę można rozwiązać nawet bez rozwiązywania równania, jeśli założymy, że szukany wiek stanowi całkowitą liczbę lat.
        Wiemy, że wiek Diofantosa jest liczbą podzielną przez $12$ oraz przez $7$, czyli jest ich wspólną wielokrotnością. Najmniejszą niezerową wielokrotnością jest właśnie $84$, 
        a następna wynosi aż $168$, czyli trochę za dużo, nawet jak na przedwiecznego mistrza matematyki.

    </div>
    <div class="example"> 
        Pewna dwucyfrowa liczba ma cyfrę dziesiątek o $1$ mniejszą od cyfry jedności. Gdyby zamienić jej cyfry miejscami, otrzymalibyśmy liczbę większą o $\frac{1}{5}$ jej 
        wartości. Jaka to liczba?<br><br>

        Niech $x$ oznacza cyfrę jedności, a $x - 1$ cyfrę dziesiątek (należałoby zaznaczyć, że dopuszczamy jedynie 
        $x$ oraz $x-1$ będące liczbami naturalnymi jednocyfrowymi, czyli dziedziną równania jest zbiór $\{1, 2, 3, 4, 5, 6, 7, 8, 9\}$). Liczbę tę możemy zapisać jako $10(x-1) + x$ (dziesięć razy cyfra dziesiątek i jeden razy cyfra jedności). 
        Po odwróceniu cyfr dostaniemy liczbę $10x + (x-1)$, która jest od poprzedniej większa o jedną piątą, czyli stanowi $\frac{6}{5}$ tamtej liczby: 
        $$\begin{align}
            10x + (x-1) &= \frac{6}{5}\bigl(10(x-1) + x\bigr)\ \ \ \ \color{#888888}{| \cdot 5}\\
            50x + 5(x-1) &= 6\bigl(10(x-1) + x\bigr)\\
            50x + 5(x-1) &= 60(x-1) + 6x\\
            50x + 5x-5 &= 60x-60 + 6x\\
            55x - 5 &= 66x-60\ \ \ \ \ \ \ \ \ \ \ \ \ \  \ \ \ \ \color{#888888}{| -55x}\\
            -5 &= 11x-60\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \  \color{#888888}{| +60}\\
            55 &= 11x\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \color{#888888}{| :11}\\
            5 &= x
        \end{align}$$
        A więc szukana liczba ma cyfrę jedności $5$ i cyfrę dziesiątek $4$, czyli jest to $45$. Właściwie mogliśmy zgadywać, bo dwucyfrowe liczby o takiej dysproporcji 
        cyfr to jedynie $12$, $23$, $34$, $45$, $56$, $67$, $78$ i $89$.
    </div>

    <div class="example"> 
        Pluton wojskowy maszerował w szyku podzielonym na równe kolumny. Liczba szeregów żołnierzy była o $2$ większa od liczby kolumn. Na zwężeniu drogi dowódca 
        zarządził przegrupowanie, w wyniku którego liczba szeregów wzrosła o $4$, a liczba kolumn zmalała o $2$. Ile żołnierzy liczby pluton?<br><br>

        Przymijmy za $x$ początkową liczbę kolumn żołnierzy, a $x + 2$ niech oznacza liczbę szeregów. Po przegrupowaniu liczba kolumn wynosiła $x - 2$, a liczba 
        szeregów $x + 2 + 4$. W początkowym ułożeniu liczność armii obliczylibyśmy jako $x \cdot (x + 2)$, a w późniejszym jako $(x - 2) \cdot (x + 2 + 4)$. Mamy więc:
        $$\begin{align}
        x \cdot (x + 2) &= (x - 2) \cdot (x + 2 + 4)\\
        x \cdot (x + 2) &= (x - 2) \cdot (x + 6)\\
        x^2 + 2x &= x^2 + 6x - 2x - 12\\
        x^2 + 2x &= x^2 + 4x - 12\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \color{#888888}{|-x^2}\\
        2x &= 4x - 12\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \color{#888888}{| -4x}\\
        -2x &= -12\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \color{#888888}{| :(-2)}\\
        x &= 6
        \end{align}$$
        Czyli liczba kolumn wynosiła $6$, a liczba szeregów $8$, co daje $48$ żołnierzy. Sytucja zrobiła się na chwilę niebezpieczna, kiedy w równaniu pojawiło się $x^2$.
        Na szczęście po uproszczeniu obu stron sytuacja uległa złagodzeniu i wszystko skończyło się szczęśliwie.
    </div>
	</lesson-chapter>

	<lesson-chapter><template #title>Trochę o proporcjach</template>
    <p class = "type">
		Intuicje
	</p>

    <p> 
        Zajmiemy się zaraz pewnym typem problemów algebraicznych, które będą polegały na "ułożeniu właściwej proporcji", a następnie rozwiązaniu równania 
        liniowego. Ale najpierw wprowadzimy odrobinę nazewnictwa określającego, czym w matematyce jest proporcja.
    </p>

    <p> 
        Mówimy, że jedna wartość jest <i>wprost proporcjonalna</i> do drugiej, jeśli $n$-krotnemu wzrostowi jednej liczby toważyszy $n$-krotny wzrost drugiej. 
    </p>
    <ul> 
        <li>Waga wody w butelce jest wprost proporcjonalna do jej objętości: jeśli odmierzymy w naczyniu wodę o dwa razy większej objętości, będzie ważyła dwa razy więcej.</li> 
        <li>
            Koszt jabłek kupowanych na targowisku jest wprost proporcjonalny do ich wagi: jeśli $1$ kilogram kosztuje $c$ złotych, to dwa kilogramy 
            będą kosztować $2c$ złotych, trzy kilogramy $3c$ złotych, a pół kilograma $\frac{1}{2} c$ złotych.
        </li>
        <li> 
            Liczba pączków, jakie zje Michaś na śniadanie, <b>nie</b> jest wprost proporcjonalna do jego obwodu talii. Nie ważne, czy zje 
            $2$, $3$ czy $30$ pączków, i tak pozostanie nieprzyzwoicie gruby.
        </li>
    </ul>

    <p> 
        Jeśli jedna wartość jest <i>odwrotnie proporcjonalna</i> do drugiej, to $n$-krotnemu wzrostowi jednej odpowiada $n$-krotny spadek drugiej.
    </p>

    <ul> 
        <li>
            Czas potrzebny na wykonanie jakiegoś zadania jest odwrotnie proporcjonalny do liczby osób, która się nim zajmuje. Spodziewamy się, że 
            gdy zatrudnimy trzy razy więcej pracowników, ukończą to zadanie trzykrotnie szybciej. <span class="comment" id="Na przykład w informatyce czas wykonywania 
            zadania jest wprost proporcjonalny do liczby zajmujących się nim osób">Chociaż z drugiej strony, gdzie kucharek sześć, tam nie 
            ma co jeść.</span>
        </li>
        <li>
            Wysokość nagrody w Lotto jest odwrotnie proporcjonalna do liczby osób, które tego dnia wylosowały szczęśliwe numery. Jeśli kumulacja 
            wynosiła $1\ 000\ 000 \text{ zł}$, a zwycięzców nagrody jest dwóch, to każdy otrzyma $500\ 000 \text{ zł}$. Jeśli wygrały $4$ osoby, to każda dostanie $250\ 000 \text{ zł}$, 
            a jeśli $5$, to na każdą przypada $\frac{1}{5}$ nagrody głównej.
        </li>
        <li> 
            Próbka radioaktywnego izotopu Polonu traci połowę swojej masy co trzy lata. Masa tej próbki <b>nie</b> jest odwrotnie proporcjonalna do czasu rozpadu:
            Po trzech latach wynosi $\frac{1}{2}$ oryginalnej masy, a po trzykrotnie dłuższym czasie - po $9$ latach - będzie to zaledwie $\frac{1}{8}$ pierwotnej 
            wagi, czyli $4$ razy mniej niż po trzech latach.
        </li>
    </ul>

    <p> 
        Jeśli wartości $w_1$ i $w_2$ są do siebie wprost proporcjonalne, zachodzi związek $w_1 = a \cdot w_2$, gdzie $a$ jest pewnym stałym 
        parametrem. Znaczy to tyle, że jedna z nich jest zawsze "ileś" razy większa od drugiej, przy czym to "ileś" jest zawsze takie samo. 
        Mówimy, że <i>stosunek</i> tych wartości jest stały, to znaczy: $\frac{w_1}{w_2} = a$ jest pewną niezmienną liczbą, zwaną <i>współczynnikiem 
        proporcjonalności</i>. W przypadku wartości $w_1$ i $w_2$ odwrotnie proporcjonalnych zachodzi związek $w_1 = \frac{a}{w_2}$, wówczas stały iloczyn tych wartości 
        $w_1 \cdot w_2 = a$ nazywamy współczynnikiem proporcjonalności. 
    </p>

    <ul> 
        <li>
            Masa wody jest wprost proporcjonalna do jej objętości. Współczynnik tej proporcjonalności, czyli stosunek masy do objętości nazywany jest w fizyce gęstością; 
            obliczono, że gęstość wody wynosi $0,997$ kilogramów na jeden litr. 
        </li>
        <li> 
            Koszt jabłek jest wprost proporcjonalny do ich wagi. Współczynnik proporcjonalności (stosunek wartości pieniężnej do wagi) stanowi cena za kilogram, 
            która widnieje na stoisku sprzedawcy, np. $5 \text{ zł / kg}$.
        </li>
    </ul>

    <p> 
        Generalnie gdy mówimy o proporcji, mamy na myśli, że dwie wartości zachowują pewną stałą relację niezależnie od skali zjawiska. Przy określaniu rozdzielczości ekranu 
        monitora podaje się proporcję, np. $16 : 9$ albo $5 : 4$ określającą stosunek jego szerokości do wysokości. Ekrany o takiej proporcji będą miały taki sam 
        kształt niezależnie od tego, jak duży jest to monitor.
    </p>
    
    <div class="container">
        <div class="row">
            <div class="col">
                <div class = "grid-rectangle">
                    <table>
                        <tr v-for="i in 9" v-bind:key="i">
                            <td v-for="j in 16" v-bind:key="j"></td>
                        </tr>
                    </table>
                    <div>
                        $16 : 9$
                    </div>
                </div>
            </div>
            <div class="col">
                <div class = "grid-rectangle-2">
                    <table>
                        <tr v-for="i in 4" v-bind:key="i">
                            <td v-for="j in 5" v-bind:key="j"></td>
                        </tr>
                    </table>
                    <div>
                        $5 : 4$
                    </div>
                </div>
            </div>
        </div>
    </div>

    <p>
         Ciasto na pizzę można uzyskać mieszając mąkę i wodę w stosunku $2 : 1$, to znaczy, że należy zużyć dwa 
        razy więcej mąki niż wody. Od tego, jak dużo mąki i wody zużyjemy, zależy wielkość uzyskanej pizzy. Karty kredytowe i dowody tożsamości produkuje się 
        w ustalonej proporcji szerokości do wysokości, wynosi ona około $1,618$ i stanowi przybliżenie tzw. <i>złotej liczby</i>, która według matematyków 
        i znawców sztuki określa proporcje doskonałe. Gdy mówimy, że czyjaś twarz jest "proporcjonalna" lub "ma ładne proporcje", podświadomie mamy na myśli, że 
        stosunek odległości wybranych elementów twarzy przybliża złotą proporcję. Więcej o złotej proporcji w temacie "Ciąg Fibonacciego".
    </p>

	<center><img src="./.images/Screenshot_1.png" align="middle"></center>

	</lesson-chapter>

	<lesson-chapter><template #title>Proporcje w równaniach</template>
    <p class = "type">
		Warsztat
	</p>

    <p> 
        Równania z proporcjami będą miały po obu stronach znaku $=$ ułamki zawierające wyrażenia algebraiczne ze zmienną $x$. Rozwiązujemy je ulubioną techniką 
        chrześcijan: na krzyż. 
    </p>

    <div class="example"> 
        W podstawówce im. Diofantosa z Aleksandrii liczba uczennic jest o $150$ mniejsza od liczby uczniów, a stosunek chłopców do dziewcząt w tej szkole <span 
        class="comment" id="jest naganny; rozwydrzeni młodzieńcy ciągle dokuczają uciśnionym niewiastom">wynosi 
        $3 : 2$</span>. Ilu podopiecznych liczy ta szkoła?<br><br>

        Jeśli $x$ to liczba chłopców, a $x - 150$ to liczba dziewczat, to stosunek $\frac{3}{2}$ możemy zapisać jako $\frac{x}{x - 150}$. 
        $$\frac{x}{x - 150} = \frac{3}{2}$$
        Dokonujemy ubustronnego mnożenia przez $2$ oraz przez $(x - 150)$. W efekcie mnożymy licznik lewego ułamka przez mianownik prawego oraz 
        licznik prawego przez mianownik lewego, czyli jakby "na krzyż". 
        $$\begin{align}
        \frac{x}{x - 150} &= \frac{3}{2}\\
        x \cdot 2 &= 3 \cdot (x - 150)\\
        2x &= 3x - 450\\
        x &= 450
        \end{align}$$
        Liczba chłopców wynosi $450$, a dziewcząt $300$, co daje łącznie $750$ uczniów.
    </div>

    <div class="example"> 
        Zdjęcie w stosunku szerokości do wysokości $4 : 3$ oprawiono w ramkę o grubości $5 \text{ cm}$, w wyniku czego powstała instalacja o proporcjach $6 : 5$. Jaki rozmiar 
        ma zdjęcie z ramką?<br><br>

        Niech $4x$ oznacza szerokość zdjęcia bez ramki, a $3x$ jego wysokość (moglibyśmy także oznaczyć przez $x$ szerokość, a przez $\frac{3}{4}x$ wysokość, ale po co 
        angażować dodatkowe ułamki). Gdy oprawimy zdjęcie w ramkę, po jego prawej, lewej, dolnej i górnej stronie przybędzie $5\text{ cm}$, czyli szerokość oraz wysokość 
        zwiększą się o $10\text{ cm}$, a ich stosunek zmieni się do $\frac{6}{5}$. 
        $$\begin{align}
        \frac{4x + 10}{3x + 10} &= \frac{6}{5}\\
        5(4x + 10) &= 6(3x + 10)\\
        20x + 50 &= 18x + 60\\
        2x &= 10\\
        x &= 5
        \end{align}$$
        Szerokość zdjęcia wynosi więc $4x = 20$, a wysokość $3x = 15$, czyli zdjęcie z ramką ma wymiary $30 \text{ cm}$ na $25 \text{ cm}$.

	    <center><img src="./.images/Screenshot_2.png" align="middle"></center>
    </div>

    <div class="example"> 
        Na zajęciach profesora Zbójnickiego od lat panuje tendencja: liczba studentów, którzy oblewają kurs, jest wprost proporcjonalna do liczności grupy 
        zajęciowej. Zaliczenie kursu polega na przygotowaniu projektu zespołowego: studenci dzieleni są na zespoły mające każdego roku taką samą liczbę osób, a następnie 
        każdy student oceniany jest indywidualnie za swój wkład. Dwa lata temu studentów podzielono na $42$ zespoły, spośród których profesor Zbójnicki oblał $6$ zespołów 
        oraz $5$ studentów spośród reszty. W ostatnim roku w wyniku dzielenia grupy powstało $28$ zespołów i reszta: czterech studentów, którzy zostali oblani za niepodzielność, 
        ponadto $4$ z tych dwudziestu ośmiu zespołów nie zdało kursu. Jaka część grupy zajęciowej nie zdaje kursu profesora Zbójnickiego?<br><br>

        Niech $x$ oznacza liczbę osób w każdym zespole. Dwa lata temu nie zdało $6x + 5$ osób spośród wszystkich $42x$ osób, czyli stosunek osób, które nie zdały, 
        do wszystkich studentów, wynosił $\frac{6x + 5}{42x}$. W poprzednim roku nie zdało $4x + 4$ studentów spośród $28x + 4$, czyli stosunek niezdawalności wynosił 
        $\frac{4x + 4}{28x + 4}$. Skoro liczba osób, które nie zdają, jest wprost proporcjonalna do liczności grupy, stosunek ten pozostaje niezmienny w kolejnych latach, czyli:
        $$\frac{6x + 5}{42x} = \frac{4x + 4}{28x + 4}$$
        Dla uproszczenia obliczeń skróćmy ułamek po prawej stronie przez $4$:
        $$\begin{align}
        \frac{6x + 5}{42x} &= \frac{4x + 4}{28x + 4}\\
        \frac{6x + 5}{42x} &= \frac{4(x + 1)}{4(7x + 1)}\\
        \frac{6x + 5}{42x} &= \frac{x + 1}{7x + 1}\\
        \end{align}$$
        Mnożymy obustronnie przez mianowniki i obliczamy:
         $$\begin{align}
        \frac{6x + 5}{42x} &= \frac{x + 1}{7x + 1}\\
        (6x + 5)(7x + 1) &= (x + 1)42x\\
        42x^2 + 6x + 35x + 5 &= 42x^2 + 42x\\
        42x^2 + 41x + 5 &= 42x^2 + 42x\\
        41x + 5 &= 42x\\
        5 &= x
        \end{align}$$
        Możemy teraz wstawić obliczoną liczność zespołu do któregokolwiek z ułamków oryginalnego równania. Po lewej stronie mielibyśmy $\frac{6x + 5}{42x} = 
        \frac{6\cdot5 + 5}{42\cdot5} = \frac{35}{210} = \frac{1}{6}$, a po prawej $\frac{4\cdot5 + 4}{28\cdot5 + 4} = \frac{24}{144} = \frac{1}{6}$. Nieunikniona tendencja 
        wskazuje, że każdego roku oblewa jedna szósta grupy zajęciowej.
    </div>
	</lesson-chapter>

	<lesson-chapter><template #title>Nierówności na ostro</template>
    <p class = "type">
		Intuicje
	</p>
    <p> 
        W temacie <router-link tag="a" :to="'/rownania-i-nierownosci'" class="link">Równania i nierówności</router-link> pobieżnie omówiliśmy, jak rozwiązywać 
        proste nierówności, a dokładniej: jak upraszczać nierówności. Od tej pory przez "rozwiązanie nierówności" będziemy rozumieć zbiór wszystkich $x$, które 
        spełniają tę nierówność.
    </p>
    <ul>
        <li>Rozwiązaniem nierówności $x > 2$ jest zbiór liczb rzeczywistych większych od $2$, czyli przedział obustronnie otwarty $(2, \infty)$.</li>
        <li>Rozwiązaniem nierówności $x \leq \frac{5}{2}$ jest zbiór liczb nie większych niż pięć drugich, czyli przedział prawostronnie domknięty $\left(-\infty, \frac{5}{2}\right]$.</li>
        <li>Rozwiązaniem $x + 5 \geq 3$ jest zbiór liczb, które powiększone o $5$ mają wartość co najmniej $3$, czyli liczby od $-2$ wzwyż: $[-2, \infty)$.</li>
    </ul>

    <p> 
        Rozwiązywanie bardziej skomplikowanych nierówności przebiega podobnie do rozwiązywania równań: możemy dokonywać obustronnego dodawania, odejmowania, 
        mnożenia i dzielenia, należy tylko uważać na mnożenie i dzielenie obustronnie przez liczby ujemne: wówczas należy dokonać odwrócenia znaku nierówności, na przykład 
        warunek $-x \lt -4$ po pomnożeniu przez $-1$ przyjmuje postać $x \gt 4$ (liczby większe od $4$ są na minusie mniejsze od $-4$).
    </p>

    <div class="example"> 
        Jakie liczby po pomnożeniu przez $3$ i pomniejszeniu o $7$ stają się większe?<br><br>

        Rozwiązujemy nierówność:
        $$\begin{align}
        3x - 7 &\gt x \ \ \ \ \ \ \ \ \ \color{#888888}{|-3x}\\
        -7 &\gt -2x \ \ \ \ \color{#888888}{|:(-2)}\\
        \frac{7}{2} &\lt x
        \end{align}$$
        Rozwiązaniem nierówności jest zbiór liczb większych od $3\frac{1}{2}$, czyli przedział $\left(3\frac{1}{2}, \infty \right)$. Możemy ogłosić znalezione rozwiązanie poprzez zapis: 
        $x \in \left(3\frac{1}{2}, \infty \right)$.
	    <center><img src="./.images/Screenshot_3.png" align="middle"></center>
    </div>

    <div class="example"> 
        Jeśli jeden kufel piwa kosztuje $8\text{ zł}$, to ile piw można wypić, nie wydając więcej niż $50\text{ zł}$? <br><br> 

        Dziedziną tej nierówności są liczby naturalne: nie możemy przecież zamówić ułamkowej liczby piw. Nierówność ma bardzo prostą postać:
        $$\begin{align}
        8x &\leq 50\ \ \ \ \color{#888888}{|:8}\\
        x &\leq 6 \frac{1}{4}
        \end{align}$$
        i odpowiada przedziałowi $\left(-\infty, 6\frac{1}{4}\right]$, jednak ponieważ nie interesują nas rozwiązania ułamkowe lub ujemne, spośród wartości z tego przedziału należałoby 
        wziąć tylko liczby narutalne, czyli część wspólną tego przedziału z liczbami naturalnymi. Moglibyśmy zapisać jako rozwiązanie $x \in \mathbb{N} \cap \left(-\infty, 6\frac{1}{4}\right]$ 
        albo po prostu $x \in \{0, 1, 2, 3, 4, 5, 6\}$.
    </div>

    <div class="example"> 
        
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
  name: "RownaniaINierownosciLiniowe",
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
  }
};
</script>

<style scoped lang="scss">
.grid-rectangle 
{
    position: relative;
    width: 369px;
    height: 208px;
    margin: auto;

    table 
    {
        position: absolute;
        border-collapse: collapse;

        td 
        {
            width: 20px;
            height: 20px;
            border: 1px solid #dd0000;
            background-color: #cc0000;
        }
    }

    div 
    {
        position: absolute;
        width: 100%;
        height: 100%;
        line-height: 208px;
        font-size: 3em;
        font-family: "";
        color: white;
        text-align: center;
    }
}

.grid-rectangle-2
{
    position: relative;
    width: 216px;
    height: 173px;
    margin: auto;
    padding: 17px 0 17px 0;

    table 
    {
        position: absolute;
        border-collapse: collapse;

        td 
        {
            width: 40px;
            height: 40px;
            border: 1px solid #dd0000;
            background-color: #cc0000;
        }
    }

    div 
    {
        position: absolute;
        width: 100%;
        height: 100%;
        line-height: 173px;
        font-size: 3em;
        font-family: "";
        color: white;
        text-align: center;
    }
}
</style>
