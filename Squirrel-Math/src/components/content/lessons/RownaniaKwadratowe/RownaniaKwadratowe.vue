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
        Wstawiając w miejsce liter $a$ i $b$ dowolne liczby lub wyrażenia algebraiczne, dostajemy prosty sposób na rozwijanie ich kwadratów/iloczynów do postaci sum, 
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
        mnożenie/dzielenie", które wystarczały w przypadku równań liniowych, tutaj w niczym nam nie pomogą. 
        Potrzebujemy sprytniejszych zabiegów. Ale po kolei. Zacznijmy od najprostszych przypadków.
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
        Równanie zapisane w powyższej formie, nazywanej <i>postacią iloczynową</i> jest bardzo wygodne w obsłudze: mówi ono tyle, że iloczyn liczb $x - 1$ i $x + 1$ wynosi $0$, 
        co prowadzi do nieuniknionego wniosku, że jedna z tych liczb musi być równa $0$, czyli w istocie $x = 1$ lub $x = -1$. Potraktujmy w ten sposób inne równanie:
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
            Mamy to: równanie ma dwa rozwiązania, $1$ oraz $-7$. Zwracamy uwagę, że odczytując rozwiązania z postaci iloczynowej, musimy odwrócić znaki liczbom w 
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
            Równanie ma dwa rozwiązania: $x = 4 + \frac{\sqrt{46}}{2}$ oraz $x = 4 - \frac{\sqrt{46}}{2}$. Niestety, nie zawsze rozwiązania równań kwadratowych są wymierne.
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
            Mimo lekko uciążliwych obliczeń, otrzymaliśmy rozwiązania: $x = -\frac{5}{2} + \frac{\sqrt{21}}{2}$ oraz $x = -\frac{5}{2} - \frac{\sqrt{21}}{2}$.
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
            Nie zawsze równanie kwadratowe ma dwa rozwiązania. Istnieją równania z jednym rozwiązaniem
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
        Obustronnego podnoszenia do kwadratu można dokonać, jedynie mając pewność, że obydwie strony równania są zawsze (dla każdej możliwej wartości z dziedziny niewiadomej)
        dodatnie lub zawsze ujemne. O tym, które przekształcenia obustronne są bezpieczne, a które nie, decyduje dziedzina i różnowartościowość funkcji tego przekształcenia
        (więcej w lekcji "Funkcje").
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
  }
};
</script>

<style scoped lang="scss">

</style>
