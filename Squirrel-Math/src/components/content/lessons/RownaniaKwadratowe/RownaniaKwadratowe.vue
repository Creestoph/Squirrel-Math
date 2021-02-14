<template>
  <lesson routeShortVersion="/rownania-kwadratowe-short" routeLongVersion="/rownania-kwadratowe">
    <lesson-title>Równania kwadratowe</lesson-title>

    <lesson-intro>   
    <p>
        Wchodzimy na wyższy poziom. Zajmiemy się równaniami, które na pierwszy rzut oka wydają się bardzo trudne do rozwiązania: niewiadome będą występować nie tylko 
        w pierwszej, ale też w drugiej potędze. Gdy uda nam się przebić przez tę barierę nieliniowości, będziemy o krok od rozwiązywania równań z niewiadomymi o 
        dowolnym wykładniku.
	</p>
    </lesson-intro>   

	<lesson-chapter><template #title>Teraz przydadzą się wzory skróconego mnożenia</template>
    <p class = "type">
		Intuicje
	</p>
    <p> 
        Zacznijmy od przypomnienia niedocenianych trzech wzorów z lekcji
        <router-link tag="a" :to="'/dzialania-na-wyrazeniach-algebraicznych#powering-algebraic-sums'" class="link">
        Działania na wyrażeniach algebraicznych</router-link>. 
    </p>

    <div class="formula">
        <ul>
            <li style="text-align: left">Kwadrat sumy: $(a+b)^2=a^2+2ab+b^2$</li>	
            <li style="text-align: left">Kwadrat różnicy: $(a-b)^2=a^2-2ab+b^2$</li>
            <li style="text-align: left">Różnica kwadratów: $(a-b)(a+b)=a^2-b^2$</li>
        </ul>
    </div>

    <p> 
        Wstawiając w miejsce liter $a$ i $b$ dowolne liczby lub wyrażenia algebraiczne, dostajemy prosty sposób na rozwijanie kwadratów/iloczynów do postaci sum, 
        jak również na odwrót: sumy po prawej stronie równości możemy zwinąć do postaci zwięzłych kwadratów/iloczynów po lewej stronie. Poświęćmy kilkaset sekund na kontemplację 
        wyglądu tych wzorów: dobre obeznanie z ich schematem przyda się zaraz do rozpracowania równań kwadratowych.
    </p>

    <p class = "type">
		Formalnie
	</p>
    <p> 
        Równania kwadratowe to równania, które da się sprowadzić do postaci 
        $$ax^2 + bx + c = 0$$
        gdzie liczby $a \in \mathbb{R} \setminus \{0\}, b \in \mathbb{R}, c \in \mathbb{R}$ nazywane są współczynnikami równania kwadratowego. 
        Zastrzega się $a \neq 0$ - w przypadku $a = 0$ składnik $ax^2$ znika, a równanie ma postać równania liniowego.
    </p>

    <p class = "type">
		Intuicje
	</p>
    <p> 
        Przed nami następujący dylemat: jak rozwiązywać równania postaci:
    </p>
    $$
        x^2 - 6x + 5 = 0
    $$
    <p> 
        czyli jaką liczbę rzeczywistą możemy wstawić w miejsce $x$, by otrzymać poprawną równość. Podstawowe metody w rodzaju "obustronne dodawanie/odejmowanie i 
        mnożenie/dzielenie", które wystarczały w przypadku równań liniowych, tutaj w niczym nam nie pomogą; 
        potrzebujemy sprytniejszych zabiegów. Ale po kolei. Zacznijmy od najprostszych przypadków.
    </p>
    $$
        x^2 = 1
    $$
    <p>
        Równanie ma dwa rozwiązania: $x = 1$ oraz $x = -1$; zarówno $1$, jak i $-1$ podniesione do kwadratu daje $1$. Aby uwydatnić tę dwoistość rozwiązania, dokonamy 
        nieoczywistego przekształcenia z zastosowaniem wzoru skróconego mnożenia na różnicę kwadratów:
    </p>
    $$
        x^2 = 1^2\\
        x^2 - 1^2 = 0\\
        (x - 1)(x + 1) = 0
    $$
    <p>
        Równanie zapisane w powyższej formie, nazywanej <i>postacią iloczynową</i>, jest bardzo wygodne w obsłudze: mówi ono tyle, że iloczyn liczb 
        $x - 1$ oraz $x + 1$ wynosi $0$, co prowadzi do nieuniknionego wniosku, że jedna z tych liczb musi być równa $0$, czyli w istocie $x = 1$ lub $x = -1$. 
        Potraktujmy w ten sposób inne równanie:
    </p>
    $$
        (x - 3)^2 = 4\\
        (x - 3)^2 = 2^2\\
        (x - 3)^2 - 2^2 = 0\\
        ((x - 3) - 2)((x - 3) + 2) = 0\\
        (x - 5)(x - 1) = 0
    $$
    <p>
        Zatem równanie $(x - 3)^2 = 4$ ma dwa rozwiązania: $x = 5$ oraz $x = 1$. Zauważmy teraz, że równanie $(x - 3)^2 = 4$ mogło zostać zapisane w innej formie, wynikającej 
        z rozwinięcia znanego nam jako wzór skróconego mnożenia na kwadrat różnicy:
    </p>
    $$
        (x - 3)^2 = 4\\
        x^2 - 2 \cdot 3 \cdot x + 3^2 = 4\\
        x^2 - 6x + 9 = 4\\
        x^2 - 6x + 5 = 0
    $$
    <p>
        I oto niespodzianka: równanie $x^2 - 6x + 5 = 0$, wyglądające na bardzo nieoczywiste i trudne, dało się rozwiązać łatwo, gdy było zwinięte do zgrabnej postaci 
        z użyciem wzoru skróconego mnożenia. Spróbujemy ugryźć równania kwadratowe właśnie w taki sposób: zaczynając od nieoczywistej, koślawej formy równania $ax^2 + bx + c = 0$,
        spróbujemy znaleźć w jego strukturze wzór skróconego mnożenia, by dokonać kompresji do postaci $(x - n)^2 + m = 0$, zwanej <i>postacią kanoniczną równania kwadratowego</i>.
    </p>
    <div class="example">
        $$x^2 + 2x + 1 = 9$$
        <p>
            Nie przemęczając się na początek, zauważamy, że lewą stronę równania można od razu spakować z pomocą wzoru skróconego mnożenia na kwadrat sumy:
        </p>
        $$
            (x + 1)^2 = 9\\
            (x + 1)^2 - 3^2 = 0\\
            ((x + 1) - 3)((x + 1) + 3) = 0\\
            (x - 2)(x + 4) = 0
        $$
        <p> 
            Równanie ma dwa rozwiązania: iloczyn ten będzie równy $0$, gdy $x = 2$ lub $x = -4$.
        </p>
    </div>
    <div class="example">
        $$x^2 + 6x - 7 = 0$$
        <p> 
            Chcielibyśmy, by po lewej stronie równania znalazło się wyrażenie algebraiczne, które można łatwo spakować z pomocą wzoru skróconego mnożenia.
            Dostrzegamy, że równanie ma na to zadatki:
        </p>
        $$x^2 + 2 \cdot \color{#dd0000}{3} \cdot x -7 = 0$$
        <p> 
            Gdyby tylko zamiast $-7$ siedziała tam liczba $3^2$, <comment text="Jeżeli czytasz to, mając dom, samochód, rodzinę i dobrą pracę, nie musisz 
            się martwić, gdyż najpewniej już osiągnąłeś sukces.">osiągnęlibyśmy sukces</comment>. Lecz co stoi na przeszkodzie?
        </p>
        $$
            \begin{align}
            x^2 + 2 \cdot 3 \cdot x - 7 &= 0\ \ \ \ \ \ \ \ \ \color{#888888}{|+16}\\
            x^2 + 2 \cdot 3 \cdot x + 9 &= 16\\
            (x + 3)^2 &= 16\\
            (x + 3)^2 - 4^2 &= 0\\
            ((x + 3) - 4)((x + 3) + 4) &= 0\\
            (x - 1)(x + 7) &= 0
            \end{align}
        $$
        <p> 
            Mamy to: równanie spełniają dwie liczby, $1$ oraz $-7$. Zwracamy uwagę, że odczytując rozwiązania z postaci iloczynowej, musimy odwrócić znaki liczbom w 
            nawiasach: nawias $(x - 1)$ informuje o rozwiązaniu o wartości $1$ (na plusie), a nawias $(x + 7)$ daje rozwiązanie $-7$ (na minusie).
        </p>
    </div>
    <div class="example">
        $$2x^2 - 16x + 9 = 0$$
        <p> 
            Żeby nie komplikować procesu myślowego, pozbądźmy się dwójki stojącej przed $x^2$ przez obustronne dzielenie przez $2$:
        </p>
        $$x^2 - 8x + 4,5 = 0$$
        <p>
            Próbujemy zmusić równanie, by dało się spakować wzorem na kwadrat różnicy. W tym celu składnik $8x$ przedstawimy jako $2 \cdot 4 \cdot x$, a do szczęścia 
            brakuje nam tylko składnika $16$ zamiast $4,5$:
        </p>
        $$
            \begin{align}
            x^2 - 2 \cdot 4 \cdot x + 4,5 &= 0\ \ \ \ \ \ \ \ \ \color{#888888}{|+11,5}\\
            x^2 - 2 \cdot 4 \cdot x + 16 &= 11,5\\
            (x - 4)^2 &= \sqrt{11.5}^2\\
            (x - 4)^2 &= \sqrt{\frac{23}{2}}^2\\
            (x - 4)^2 &= \left(\frac{\sqrt{46}}{2}\right)^2\\
            \left(x - 4 - \frac{\sqrt{46}}{2}\right)\left(x - 4 + \frac{\sqrt{46}}{2}\right) &= 0
            \end{align}
        $$
        <p> 
            Równanie ma dwa rozwiązania: $x = 4 + \frac{\sqrt{46}}{2}$ oraz $x = 4 - \frac{\sqrt{46}}{2}$. Niestety, równania kwadratowe dość często dają rozwiązania 
            niewymierne.
        </p>
    </div>
    <div class="example">
        $$x^2 + 5x + 1 = 0$$
        <p> 
            Równanie wydaje się niechętnie współpracować ze wzorem skróconego mnożenia. Pozostaje nam użyć przemocy, by przedstawić współczynnik $5$ jako iloczyn $2 \cdot \frac{5}{2}$
        </p>
        $$
            x^2 + 2 \cdot \frac{5}{2} \cdot x + 1 = 0\\
            x^2 + 2 \cdot \frac{5}{2} \cdot x + \left(\frac{5}{2}\right)^2 - \left(\frac{5}{2}\right)^2 + 1 = 0\\
            \left(x + \frac{5}{2}\right)^2 - \left(\frac{5}{2}\right)^2 + 1 = 0\\
            \left(x + \frac{5}{2}\right)^2 - \frac{21}{4} = 0\\
            \left(x + \frac{5}{2}\right)^2 - \left(\frac{\sqrt{21}}{2}\right)^2 = 0\\
            \left(x + \frac{5}{2} - \frac{\sqrt{21}}{2}\right)\left(x + \frac{5}{2} + \frac{\sqrt{21}}{2}\right) = 0\\
        $$
        <p> 
            Mimo lekko uciążliwych obliczeń, otrzymaliśmy rozwiązania: $x = \frac{-5 + \sqrt{21}}{2}$ oraz $x = \frac{-5-\sqrt{21}}{2}$.
        </p>
    </div>

    Powyższe przykłady przedstawiają metodę, dzięki której powinniśmy być w stanie rozwiązać dowolne równanie kwadratowe. Zobaczmy jeszcze kilka "wyjątkowych" przypadków.

    <div class="example">
        $$x^2 - 7x = 0$$
        <p> 
            Równania kwadratowe bez <i>wyrazu wolnego</i>, czyli tej luźno fruwającej liczby niezwiązanej ze zmienną $x$, są najprostsze do rozwiązywania.
            Wystarczy wyłączyć przed nawias zmienną $x$, by od razu dostać postać iloczynową:
        </p>
        $$
            x(x - 7) = 0
        $$
        <p> 
            Skąd natychmiastowy wniosek, że równanie rozwiązują $x = 0$ oraz $x = 7$.
        </p>
    </div>
    <div class="example">
        <p> 
            Nie zawsze równanie kwadratowe ma dwa rozwiązania. Istnieją równania z jednym rozwiązaniem.
        </p>
        $$x^2 + 14x + 49 = 0$$
        <p> 
            Lewa strona równania od razu przedstawia wzór skróconego mnożenia, zaś prawa jest zerem:
        </p>
        $$
            (x + 7)^2 = 0
        $$
        <p> 
            Jeśli kwadrat liczby $x + 7$ wynosi $0$, to z pewnością $x + 7 = 0$, czyli $x = -7$. Innych opcji nie ma. Takie rozwiązanie równania kwadratowego nazywamy 
            <i>rozwiązaniem podwójnym</i>.
        </p>
    </div>
    <div class="example">
        <p> 
            Zdarza się też, że równanie kwadratowe nie ma rozwiązań:
        </p>
        $$
            x^2 - 2x + 2 = 0\\
            x^2 - 2x + 1 + 1 = 0\\
            (x - 1)^2 + 1 = 0\\
        $$
        <p> 
            Nie jesteśmy w stanie, tak jak zazwyczaj, przedstawić lewej strony równania w postaci różnicy kwadratów. Zauważmy, że bez względu na wartość $x$, wyrażenie 
            $(x - 1)^2$ jest zawsze nieujemne, ponieważ jest kwadratem pewnej liczby. Po lewej stronie równania mamy więc sumę liczby nieujemnej i jedynki, czyli coś 
            na pewno różnego od $0$. Równanie jest sprzeczne.
        </p>
    </div>
	</lesson-chapter>

	<lesson-chapter><template #title>Przestroga przed pierwiastkowaniem</template>
    <p class = "type">
		Intuicje
	</p>
    <p>
        Gdy rozwiązując równanie kwadratowe, dotrzemy do czegoś podobnego:
    </p>
    $$
        (x - 3)^2 = 16
    $$
    <p> 
        nasuwa się naturalna pokusa, by dokonać <span style="color: #ff0000; font-weight: bold">obustronnego pierwiastkowania</span> i uprościć równanie do postaci 
    </p> 
    $$
        x - 3 = 4
    $$
    <p> 
        by ogłosić dumnie, że znalazło się rozwiązanie $x = 7$. Tylko że... jest to jedno z dwóch rozwiązań, a gdzieś po drodze zgubiło się drugie z nich: $x = -1$.
        Pomyłka wynika z faktu, że $\sqrt{(x - 3)^2}$ nie jest tym samym, co $(x - 3)$. Zastanówmy się dlaczego.
    </p>
    <p> 
        Czy podnosząc liczbę do kwadratu, a następnie wyciągając z niej pierwiastek, otrzymujemy tę samą liczbę? Owszem - gdy mówimy o liczbie nieujemnej, np. 
        $\sqrt{6^2} = 6$ lub $\sqrt{0^2} = 0$. Jednak gdy podniesiemy do kwadratu liczbę ujemną, a następnie wyciągniemy z niej pierwiastek, otrzymamy jej dodatnie przeciwieństwo:
        $\sqrt{(-6)^2} = \sqrt{36} = 6$. W ogólności: gdy podniesiemy liczbę do kwadratu, a następnie wyciągniemy z niej pierwiastek, otrzymamy jej <b>wartość bezwzględną</b>.
    </p>
    <p class="formula">
        $$\sqrt{x^2} = |x|$$
    </p>
    <p>
        Wracając do oryginalnego problemu, równanie 
    </p>
    $$(x - 3)^2 = 16$$
    <p> 
        można spierwiastkować obustronnie i otrzymać
    </p>
    $$
        \sqrt{(x - 3)^2} = \sqrt{16}\\
        |x - 3| = 4
    $$
    <p> 
        Jest to równanie z wartością bezwzględną, które ma dwa rozwiązania: $x = 7$ oraz $x = -1$. Rozwiązywaliśmy już takie w lekcji 
        <router-link tag="a" :to="'/rownania-i-nierownosci-liniowe#equations-with-absolute-value'" class="link">
        Równania i nierówności liniowe</router-link>. 
    </p>
    <p>
        Obustronne pierwiastkowanie równania lub nierówności jest zabiegiem ryzykownym. Stosując taką operację, należy zachować szczególną ostrożność: musimy upewnić się, 
        że obydwie strony równania mają zawsze wartość nieujemną (dla każdej możliwej wartości niewiadomej $x$) - w przeciwnym razie ryzykujemy pierwiastkowaniem liczb ujemnych.
        Pierwiastkując kwadrat, należy nałożyć na wyrażenie wartość bezwzględną.
    </p>

    <p class="type">
        Rozszerzenie
    </p>
    <p> 
        Obustronne pierwiastkowanie jest niebezpieczną, choć w niektórych warunkach dopuszczalną techniką rozwiązywania równań. Równie (jeśli nie bardziej) niebezpieczne 
        jest obustronne podnoszenie równania do kwadratu. Startujemy z równaniem
    </p>
    $$
        x - 6 = 2
    $$
    <p>
        Którego jedynym rozwiązaniem jest oczywiście $8$. Gdyby podnieść je do kwadratu
    </p>
    $$
        (x - 6)^2 = 4
    $$
    <p> 
        dostalibyśmy równanie kwadratowe z dwoma rozwiązaniami $x = 8$ oraz $x = 4$. Skąd wzięło się dodatkowe, fałszywe rozwiązanie? Należy mieć na uwadze, że 
        obustronne podnoszenie do kwadratu nie jest przekształceniem równoważnym. Oznacza to, że równania przed i po podniesieniu do kwadratu przedstawiają inny problem 
        algebraiczny. Istotnie, jeśli do pierwotnego równania wstawimy rozwiązanie $x = 8$, otrzymamy poprawną równość $2 = 2$. Jednak dla $x = 4$ mielibyśmy $-2 = 2$, czyli 
        równość, która nie jest prawdziwa, jednak staje się prawdziwa po podniesieniu do kwadratu: $(-2)^2 = 2^2$.
    </p>

    <p> 
        Obustronnego podnoszenia do kwadratu można dokonać jedynie, mając pewność, że obydwie strony równania są zawsze (dla każdej możliwej wartości z dziedziny niewiadomej)
        dodatnie lub zawsze ujemne. O tym, które przekształcenia obustronne są bezpieczne, a które nie, decyduje dziedzina i różnowartościowość funkcji tego przekształcenia
        (więcej w lekcji "Funkcje").
    </p>
	</lesson-chapter>

	<lesson-chapter><template #title>Zautomatyzujmy obliczenia</template>
    <p class = "type">
		Intuicje
	</p>
    <p> 
        Na powyższych przykładach wypracowaliśmy metodę rozwiązywania dowolnych równań kwadratowych zapisanych według schematu:
    </p>
    $$ax^2 + bx + c = 0,\ \ \ a \neq 0$$
    <p> 
        Wystarczy postępować według kroków:
    </p>
    <ul>
        <li>Dzielimy obustronnie przez współczynnik $a$ stojący przy $x^2$, by w równaniu pozostało "czyste $x^2$";</li>
        <li>Współczynnik liczbowy stojący przy $x$ przedstawiamy jako iloczyn dwójki i "czegoś";</li>
        <li>Sprawiamy, by obok pojawiło się to "coś" do kwadratu - przez obustronne dodanie go do równania albo przez dodanie i odjęcie po jego lewej stronie;</li>
        <li>Pakujemy pierwsze trzy składniki według wzoru na kwadrat sumy lub różnicy;</li>
        <li>Stosujemy wzór na różnicę kwadratów, by otrzymać postać iloczynową równania; jeżeli nie jest to możliwe, równanie nie ma rozwiązań.</li>
        <li>Odczytujemy rozwiązania.</li>
    </ul>

     <p class = "type">
		Formalnie
	</p>
    <p> 
        Wykonajmy opisane powyżej kroki raz, a porządnie. Rozwiążmy równanie kwadratowe w ogólnej postaci $ax^2 + bx + c = 0$, operując na współczynnikach literowych 
        $a$, $b$, $c$. W ten sposób rozwiążemy wszystkie istniejące równania kwadratowe za jednym zamachem.
    </p>
    $$
        \begin{align}
        ax^2 + bx + c &= 0\ \ \ \ \ \ \ \ \ \color{#888888}{|:a}\\
        x^2 + \frac{b}{a}x + \frac{c}{a} &= 0\\
        x^2 + 2\frac{b}{2a}x + \frac{c}{a} &= 0\\
        x^2 + 2\frac{b}{2a}x + \left(\frac{b}{2a}\right)^2 - \left(\frac{b}{2a}\right)^2 + \frac{c}{a} &= 0\\
        \left(x + \frac{b}{2a}\right)^2 - \left(\frac{b}{2a}\right)^2 + \frac{c}{a} &= 0\\
        \left(x + \frac{b}{2a}\right)^2 - \left(\left(\frac{b}{2a}\right)^2 - \frac{c}{a}\right) &= 0\\
        \left(x + \frac{b}{2a}\right)^2 - \left(\frac{b^2}{4a^2} - \frac{4ac}{4a^2}\right) &= 0\\
        \left(x + \frac{b}{2a}\right)^2 - \frac{b^2 - 4ac}{4a^2} &= 0\\
        \left(x + \frac{b}{2a}\right)^2 - \frac{b^2 - 4ac}{(2a)^2} &= 0\\
        \end{align}
    $$
    <p> 
        Aby sprowadzić równanie do postaci iloczynowej, musimy przedstawić cały ułamek $\frac{b^2 - 4ac}{(2a)^2}$ w postaci kwadratu. Problamatyczny 
        jest jego licznik. Najprościej byłoby zapisać: $\frac{b^2 - 4ac}{(2a)^2} = \frac{\left(\sqrt{b^2 - 4ac}\right)^2}{(2a)^2}$ i jest to generalnie prawda, 
        ale tylko pod warunkiem, że wartość pod pierwiastkiem nie jest ujemna. Rozważmy dwa przypadki:
    </p>
    <ul>
        <li>
            Jeżeli przy pewnych konkretnych wartościach $a, b, c$ okazuje się, że wyrażenie $b^2 - 4ac$ jest ujemne, to ułamek $\frac{b^2 - 4ac}{(2a)^2}$
            jest w całości ujemny (bo ma dodatni mianownik). W takim razie 
            w wyjściowym równaniu: $\left(x + \frac{b}{2a}\right)^2 - \frac{b^2 - 4ac}{(2a)^2} = 0$ lewa strona stanowi różnicę, w której odjemną jest kwadrat, 
            a odjemnikiem ujemny ułamek, a więc cała różnica ma na pewno dodatnią wartość. W takim przypadku nie może zachodzić równość z zerem, czyli równanie 
            nie ma rozwiązań.
        </li>
        <li>
            Jeżeli wyrażenie $b^2 - 4ac$ jest nieujemne, to można wyciągać z niego pierwiastek. Dla tego przypadku kontynuujemy rozwiązywanie 
            równania:
        </li>
    </ul>
    $$
        \begin{align}
        \left(x + \frac{b}{2a}\right)^2 - \frac{b^2 - 4ac}{(2a)^2} &= 0\\
        \left(x + \frac{b}{2a}\right)^2 - \frac{\sqrt{b^2 - 4ac}^2}{(2a)^2} &= 0\\
        \left(x + \frac{b}{2a}\right)^2 - \left(\frac{\sqrt{b^2 - 4ac}}{2a}\right)^2 &= 0\\
        \left(x + \frac{b}{2a} - \frac{\sqrt{b^2 - 4ac}}{2a}\right)\left(x + \frac{b}{2a} + \frac{\sqrt{b^2 - 4ac}}{2a}\right) &= 0\\
        \left(x + \frac{b - \sqrt{b^2 - 4ac}}{2a}\right)\left(x + \frac{b + \sqrt{b^2 - 4ac}}{2a}\right) &= 0\\
        \end{align}
    $$
    <p> 
        Odczytujemy rozwiązania (uwaga na znaki!):
    </p>
    $$
        x = -\frac{b - \sqrt{b^2 - 4ac}}{2a}\ \ \ \text{lub}\ \ \ x = -\frac{b + \sqrt{b^2 - 4ac}}{2a}
    $$
    <p> 
        Włączając minus do liczników ułamków:
    </p>
    $$
        x = \frac{-b + \sqrt{b^2 - 4ac}}{2a}\ \ \ \text{lub}\ \ \ x = \frac{-b - \sqrt{b^2 - 4ac}}{2a}
    $$
    <p> 
        W ten sposób rozpracowaliśmy równanie kwadratowe w ogólnej postaci, otrzymując wzory na wartości rozwiązań w zależności od współczynników $a$, $b$, $c$. 
        Rozwiązania te różnią się jedynie znakiem +/- przed pierwiastkiem $\sqrt{b^2 - 4ac}$. Matematycy lubią kompresować tak zapisane dwa wzory do jednego:
    </p>
    <p class="formula">
    $$
        x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
    $$
    </p>
    <p> 
        Znaczek $\pm$ należy interpretować jako informację, że wzór przechowuje podwójną wartość: jest prawdziwy, gdy pod tym symbolem znajdzie się $+$, jak również,
        gdy zastąpi się go przez $-$. 
    </p>
    <p> 
        Gdzieś od połowy tego rozdziału w obliczeniach przewija się trudny do przeoczenia zlepek algebraiczny: $b^2 - 4ac$. Ten charakterystyczny zestaw liter 
        będzie pojawiał się notorycznie w trakcie naszej znajomości z równaniami (a w przyszłości także funkcjami) kwadratowymi. Z uwagi na wysoką rozpoznawalność oraz 
        nieoczywiste zachowanie pod pierwiastkiem wyrażenie to uzyskało swoją indywidualną nazwę: <i>delta równania kwadratowego</i> oraz zarezerwowano dla niego 
        unikalny symbol $\Delta$. Trójkącik ten jest w istocie czwartą literą alfabetu greckiego o nazwie "delta".
    </p>
    <p class="formula">
    $$
        \Delta = b^2 - 4ac
    $$
    </p>
    <p> 
        Po takim podstawieniu wzór na rozwiązanie równania kwadratowego skraca się:
    </p>
    <p class="formula">
    $$
        x = \frac{-b \pm \sqrt{\Delta}}{2a}
    $$
    </p>
    <p> 
        Delta równania kwadratowego służy nie tylko do zwięźlejszego zapisu wzorów. Stanowi ona informację o tym, ile rozwiązań ma równanie kwadratowe.
    </p>
    <ul> 
        <li>
            Jeżeli $\Delta \lt 0$, równanie nie ma rozwiązań (jest sprzeczne). W takim przypadku nie wolno stosować powyższego wzoru, ponieważ niedozwolone jest 
            wyciąganie pierwiastka z ujemnej delty.
        </li>
        <li>
            Jeżeli $\Delta = 0$, równanie ma tylko jedno rozwiązanie o wartości $x = \frac{-b}{2a}$.
        </li>
        <li>
            Jeżeli $\Delta \gt 0$, równanie ma dwa rozwiązania o wartościach $x = \frac{-b + \sqrt{\Delta}}{2a}$ oraz $x = \frac{-b - \sqrt{\Delta}}{2a}$.
        </li>
    </ul>

    <div class="example">
        Rozwiążmy z pomocą nowo odkrytych wzorów równanie:
        $$x^2 + 5x + 1 = 0$$
        Rozpoznajemy współczynniki $a = 1$, $b = 5$, $c = 1$. Zaczynamy od obliczenia delty:
        $$\Delta = b^2 - 4ac = 25 - 4 \cdot 1 \cdot 1 = 21$$
        Skoro $\Delta > 0$, równanie ma dwa rozwiązania:
        $x = \frac{-5 - \sqrt{21}}{2}$ oraz $x = \frac{-5 + \sqrt{21}}{2}.$
    </div>
    <div class="example">
        $$4x^2 - 6x + 3 = 0$$
        Współczynniki wynoszą odpowiednio $a = 4$, $b = -6$, $c = 3$.
        $$\Delta = b^2 - 4ac = 36 - 4 \cdot 4 \cdot 3 = 36 - 48 = -12$$
        Delta poniżej $0$ oznacza brak rozwiązań.
    </div>
    <div class="example">
        $$-25x^2 + 40x - 16 = 0$$
        Odczytujemy $a = -25$, $b = 40$, $c = 16$.
        $$\Delta = b^2 - 4ac = 40^2 - 4(-25)(-16) = 40^2 - 4 \cdot 25 \cdot 16 = 1600 - 1600 = 0$$
        Mamy tylko jedno rozwiązanie: $x = \frac{-40 \pm \sqrt{0}}{2 \cdot (-25)} = \frac{-40}{-50} = \frac{4}{5}$.
    </div>
	</lesson-chapter>

	<lesson-chapter><template #title>Wzory Viète'a</template>
    <p class="type">
        Formalnie
    </p>
    <p> 
        Blisko 500 lat temu podczas badań nad równaniami kwadratowymi francuski matematyk François Viète zauważył, że jeżeli równanie kwadratowe posiada 
        dwa rozwiązania, to ich suma i iloczyn dają się zgrabnie wyrazić poprzez współczynniki $a$, $b$, $c$. 
    </p>

    <p> 
        Oznaczmy $x_1 = \frac{-b - \sqrt{\Delta}}{2a}$, $x_2 = \frac{-b + \sqrt{\Delta}}{2a}$. Suma tych dwóch rozwiązań wynosi:
    </p>
    $$
        x_1 + x_2 = \frac{-b - \sqrt{\Delta}}{2a} + \frac{-b + \sqrt{\Delta}}{2a} = \frac{-b - \sqrt{\Delta} + -b + \sqrt{\Delta}}{2a} = \frac{-2b}{2a} = -\frac{b}{a}
    $$
    <p>
        Zaś iloczyn:
    </p>
    $$
        x_1 \cdot x_2 = \frac{-b - \sqrt{\Delta}}{2a} \cdot \frac{-b + \sqrt{\Delta}}{2a} = \frac{(-b)^2 - (\sqrt{\Delta})^2 }{4a^2} = 
        \frac{b^2 - \Delta }{4a^2} = \frac{b^2 - (b^2 - 4ac) }{4a^2} = \frac{4ac }{4a^2} = \frac{c}{a}
    $$
    <p> 
        Wzory te działają również, gdy równanie ma tylko jedno rozwiązanie, a pod $x_1$ i $x_2$ wstawimy $-\frac{b}{2a}$. Te eleganckie zależności, zwane wzorami Viète'a, ukazują prawdę na temat struktury ogólnej postaci równania kwadratowego. Widać to szczególnie dobrze, gdy 
        $a = 1$: 
    </p>
    $$
        x^2 + bx + c = 0
    $$
    <p> 
        Wtedy, według wzorów Viète'a, współczynnik $b$ jest przeciwieństwem sumy rozwiązań równania ($x_1 + x_2 = -b$), zaś współczynnik $c$ stanowi ich iloczyn 
        ($x_1 \cdot x_2 = c$). Nie powinno to dziwić, gdyż równanie w postaci iloczynowej:
    </p>
    $$
        (x - x_1)(x - x_2) = 0\\
        x^2 - x \cdot x_2 - x \cdot x_1 + x_1x_2 = 0\\
        x^2 - (x_1 + x_2)x + x_1x_2
    $$
    <p> 
        po rozpisaniu do postaci ogólnej wskazuje, że to, co stoi przed niewiadomą $x$, to właśnie suma $x_1 + x_2$ na minusie, zaś wyrazem wolnym jest $x_1x_2$. 
        Skorzystamy z tej obserwacji w poniższym rozdziale.
    </p>
	</lesson-chapter>

    
	<lesson-chapter><template #title>Rozwiązywanie równań kwadratowych w pamięci</template>
    <p class="type">
        Warsztat | Rozszerzenie
    </p>
    <p> 
        Wzór z użyciem delty stanowi doskonałe narzędzie do rozwiązywania wszystkich równań kwadratowych, jednak mimo swej zwięzłości i wielkiej mocy, wymaga wykonania 
        stosunkowo dużej liczby obliczeń - na tyle dużej, że ciężko wykonać wszystkie, nie wspomagając się kartką i długopisem. Dzięki wnioskowi wysuniętemu ze 
        wzorów Viète'a, będziemy w stanie nabrać wprawy w rozwiązywaniu prostych równań w pamięci. Prostych - to znaczy mających wymierne rozwiązania. Patrząc jedynie 
        na wygląd tego równania, damy radę je odgadnąć.
    </p>

    <p> 
        Zacznijmy od prostych przypadków, gdy współczynnik przy $x^2$ jest jedynką, a pozostałe współczynniki są całkowite.
    </p>

    <div class="example">
        Spójrzmy na równanie 
        $$x^2 - 9x + 20 = 0$$
        Chcemy przedstawić je w postaci iloczynowej - spróbujemy odgadnąć, jakie liczby należy wstawić w miejsce kropek:
        $$(x - \ldots)(x - \ldots) = 0$$
        Ze wzorów Viète'a wiemy, że liczba $20$ stanowi iloczyn poszukiwanych liczb, zaś $-9$ to ich suma na minusie (czyli $9$ to ich suma po prostu).
        Problem sprowadza się do odgadnięcia takich dwóch liczb, by ich iloczyn wynosił $20$, a suma $9$. Próbujemy rozłożyć $20$ na czynniki: $1$ i $20$ dają za 
        dużą sumę, podobnie jak $2$ i $10$, ale $4$ i $5$ sumują się właśnie do $9$. A więc po prostu:
        $$(x - 4)(x - 5) = 0$$
        Rozwiązaniami są $x = 4$ i $x = 5$.
    </div>
    <div class="example">
        $$x^2 - 5x + 6 = 0$$
        Szukamy takich liczb, by ich suma wynosiła $5$, a iloczyn $6$. Łatwo odgadnąć, że chodzi o $2$ i $3$.
        $$(x - 2)(x - 3) = 0$$
    </div>
    <div class="example">
        $$x^2 + x - 12 = 0$$
        Suma ma wynosić $-1$, a iloczyn $-12$. Jedna z nich musi być dodatnia, a druga ujemna, przy czym ta ujemna musi być większa (co do wartości bezwzględnej).
        Odgadujemy $x = -4$ i $x = 3$.
        $$(x + 4)(x - 3) = 0$$
    </div>
    <div class="example">
        $$x^2 - 2x - 35 = 0$$
        Suma: $2$, iloczyn: $-35$. Rozwiązania muszą być przeciwnych znaków, przy czym tym razem dodatnie musi być większe co do wartości bezwzględnej niż ujemne. Zgadujemy $x = 7$ i $x = -5$.
        $$(x - 7)(x + 5)$$
    </div>
    <div class="example">
        $$x^2 + 9x + 8 = 0$$
        Suma: $-9$, iloczyn: $8$. Skoro iloczyn ma wyjść dodatni, a suma ujemna, obydwa rozwiązania muszą być ujemne: $x = -8$ i $x = -1$.
        $$(x + 8)(x + 1)$$
    </div>

    <p> 
        Jeśli współczynnik $a$ przy $x^2$ nie jest równy $1$, metoda trochę się komplikuje. Przypuśćmy, że rozwiązania równania nie są całkowite, lecz ułamkowe. Oznaczmy 
        je przez $\frac{n}{m}$ oraz $\frac{p}{q}$. Postać iloczynowa takiego przypadku przedstawia się jako
    </p>

    $$
        (mx - n)(qx - p)
    $$

    <p> 
        Po rozpisaniu do postaci kanonicznej:
    </p>

    $$
        \left(mq\right) x^2 - \left(nq + mp\right) x + np
    $$

    <p> 
        Widzimy, że współczynnik stojący przy $x^2$ musi stanowić iloczyn mianowników rozwiązań, wyraz wolny stanowi iloczyn liczników, a środkowy współczynnik $\left(nq + mp\right)$ 
        stanowi nieoczywisty splot: mianownik pierwszego razy licznik drugiego plus mianownik drugiego razy licznik pierwszego.
    </p>

    <div class="example">
        $$
            5x^2 - 13x + 6 = 0
        $$
        Współczynnik $5$ stanowi iloczyn mianowników rozwiązań. Ponieważ jedynym rozkładem piątki na czynniki jest $\bf 5 \cdot \bf 1$, z pewnością jedno z rozwiązań ma w mianowniku 
        $\bf{5}$, a drugie ma w mianowniku $\bf{1}$ (czyli jest liczbą całkowitą). Szóstka z kolei sugeruje, że jeden z liczników wynosi $\color{#dd3333}3$, a drugi 
        $\color{#dd3333}2$. Trzynastka musi powstać 
        jako $\color{#dd3333} 3$ plus $\color{#dd3333} 2$, przy czym jedna z tych liczb będzie pomnożona przez $\bf 5$, a druga przez $\bf 1$, czyli 
        $13 = {\bf 1} \cdot \color{#dd3333} 3 + {\bf 5} \cdot \color{#dd3333} 2$. Skoro trójkę mnożymy przez $1$, jedynka ta dotyczy mianownika dwójki. Z kolei mnożenie dwójki 
        przez $5$ oznacza, że piątka idzie do mianownika trójki. Mamy więc rozwiązania: $x = \frac{\color{#dd3333}{3}}{\bf 5}$ oraz $x = \color{#dd3333} 2$. 
        $$(5x - 3)(x - 2)$$
    </div>
    <div class="example">
        $$
            3x^2 - 17x + 20 = 0
        $$
        Iloczyn liczników ma dać $20$, a ich (tak jakby) suma $17$, przy czym w tej sumie jeden z liczników będzie trzeba pomnożyć przez $3$, a drugi przez $1$. Zgadujemy 
        rozkład $20 = 4 \cdot 5$ i zastanawiamy się, jak przedstawić $17$ jako $\ldots \cdot 4 + \ldots \cdot 5$, tak by w jedno z tych miejsc wylądowało $3$, a w drugie $1$.
        Dostrzegamy, że $17 = 3 \cdot 4 + 5 \cdot 1$, skąd wniosek, że rozwiązaniami są $x = 4$ oraz $x = \frac{5}{3}$. 
        $$(3x - 5)(x - 4) = 0$$
    </div>
     <div class="example">
        $$
            6x^2 - x - 35 = 0
        $$
        Znaki sugerują, że jedno z rozwiązań musi być ujemne, a drugie dodatnie. Rozkładamy $35$ na liczniki $5$ oraz $7$ i próbujemy tak nimi zmanipulować przez czynniki 
        $2$ i $3$, by ich różnica dała $1$. Dostrzegamy, że $1 = 3 \cdot 5 - 2 \cdot 7$, co daje ułamkowe rozwiązania $x = \frac{5}{2}$ oraz $x = -\frac{7}{3}$ (minus dotyczy 
        $\frac{7}{3}$, ponieważ w odgadniętej różnicy licznik $7$ jest na minusie).
        $$(2x - 5)(3x + 7) = 0$$
        Choć rozwiązanie tego równania w pamięci nie jest łatwe, zapewniamy, że jest możliwe przy pewnej wprawie. Polecamy dla porównania użyć wzoru na deltę. Prowadzi on 
        do tragicznych rachunków.
    </div>

    <p> 
        Przez zgadnięcie wyniku da się z powodzeniem rozwiązywać równania kwadratowe, których współczynniki są małe, najlepiej nieułamkowe, a rozwiązania wymierne. 
        Przed starciem z dowolnym równaniem kwadratowym polecamy poświęcić kilkadziesiąt sekund na próbę odgadnięcia rozkładu na czynniki. Jeżeli wydaje się 
        to trudne, należy skorzystać ze wzoru na deltę.
    </p>

    <p> 
        Skorzystaj z poniższego okienka, by poćwiczyć choć przez chwilę grę w zgadywanie równań kwadratowych. Jedno poprawnie 
        zgadnięte rozwiązanie = jedna szczęśliwa wiewiórka więcej.
    </p>

    <simple-quadratic-equations-training></simple-quadratic-equations-training>

	</lesson-chapter>

  </lesson>
</template>

<script>
import LessonTitle from "../../../lesson/LessonTitle";
import LessonIntro from "../../../lesson/LessonIntro";
import LessonChapter from "../../../lesson/chapter/LessonChapter";
import Lesson from "../../../lesson/Lesson";
import SimpleQuadraticEquationsTraining from "./SimpleQuadraticEquationsTraining"

export default {
  name: "RownaniaKwadratowe",
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
    SimpleQuadraticEquationsTraining
  }
};
</script>

<style scoped lang="scss">

</style>
