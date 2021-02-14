<template>
  <lesson routeShortVersion="/zbiory-liczbowe-short" routeLongVersion="/zbiory-liczbowe">
    <lesson-title>Zbiory liczbowe</lesson-title>

    <lesson-intro>   
    <p>
        Każdy sadownik dobrze wie, że aby doczekać się owoców ciężkiej pracy, najpierw trzeba dokonać zasiewu i pozwolić, by rośliny się zakorzeniły, a 
        potem należy je pielęgnować i troskliwie uprawiać. Podobnie jest z wiedzą matematyczną. A teraz przyszła pora na zbiory.
	</p>
    </lesson-intro>   

	<lesson-chapter><template #title>Zebrania i gromady</template>
    <p class = "type">
        Intuicje
    </p>
    <p> 
        Zbiór to jedno z tych pojęć matematycznych, które ciężko się definiuje, bo przecież każdy dobrze wie, czym jest zbiór. Albo Kolekcja. Ugrupowanie. Zgromadzenie.
        Zestaw. Kompozycja. Agregat. Zespół. Mieszanina. Konglomerat. Chyba każdy wie, o co chodzi. Kiedy matematycy dochodzą do wniosku, że 
        jakieś słowo rozumie się samo przez się, nadają takiemu określeniu miano <i>pojęcia pierwotnego</i>, to znaczy, że nie ma ono formalnej definicji: po prostu zakłada się, że istnieje 
        coś takiego jak zbiór i że zbiory składają się z jakichś elementów. Co ciekawe, na pojęciu zbioru opiera się bardzo obszerna część matematyki zwana teorią mnogości, która 
        stanowi podwaliny dla absolutnie <b>wszystkich</b> innych dziedzin matematyki. W lekcji "Podstawy matematyki" okaże się nawet, że liczby naturalne czy całkowite 
        definiuje się na podstawie zbiorów. Albo dodawanie. Właściwie w matematyce wszystko jest zbiorem albo wywodzi się ze zbiorów.
    </p>

    <p>
        Wróćmy do rzeczonych owoców, które uprawia poczciwy Eustachy. Słonecznego poniedziałkowego popołudnia Eustachy zebrał do koszyka soczyste plony:
        jabłka, cytryny i marchewkę (a ponieważ każde dziecko Matki Natury jest niepowtarzalne, <comment text="Mimo że niektóre z nich są szare lub czarne, 
        Eustachy zapewnia, że wszystkie są świeże">owoce mają różne kolory i rozmiary</comment>).
    </p>

    <!--<div class="container">
        <div class="row">
            <div class="column"><i class="fas fa-apple-alt fa-5x" style="color: #dd2222"></i></div>&nbsp;&nbsp; 
            <div class="column"><i class="far fa-lemon fa-4x" style="color: #aaaaaa"></i></div>&nbsp;&nbsp;&nbsp;
            <div class="column"><i class="fas fa-carrot fa-7x"></i></div>
        </div>
    </div>-->

	<center><img src="./.images/Screenshot_1.png" align="middle"></center>

    <p> 
        Zawartość koszyka to przykład tego, co matematycy nazywają zbiorem: zestaw unikalnych elementów, rozrzuconych bezładnie we wspólnym pojemniku. 
        Ponieważ matematycy cenią skrótowy, symboliczny zapis, stworzyli także umowną notację określającą zbiory. Elementy zbioru zapisujemy wewnątrz nawiasów 
        klamrowych $\{\ \ \ \}$ zapisane jeden obok drugiego, rozdzielone przecinkami:
    </p>

	<center><img src="./.images/Screenshot_2.png" align="middle"></center>

    <p> 
        Możemy nawet nadać naszemu zbiorowi jakąś soczystą nazwę. Przyjęło się, że zbiory oznaczamy dużymi literami, dla odróżnienia od liczb, którym przypisywaliśmy 
        małe litery. 
        
    </p>

	<center><img src="./.images/Screenshot_3.png" align="middle"></center>

    <p> 
        Tak oto dzięki Eustachemu powstał zbiór $A$ składający się z siedmiu elementów, wśród których znajdziemy trzy jabłka, trzy cytryny i marchew.
        Gdy chcemy symbolicznie wyrazić przynależność elementu do zbioru, stosujemy znaczek $\in$ przypominający walutę euro. Poniższy zapis czytamy "biała, duża cytryna 
        z sadu Eustachego jest elementem zbioru $A$".
    </p>

	<center><img src="./.images/Screenshot_4.png" align="middle"></center>

    <p> 
        Oczywiście zbiory mogą składać się z najróżniejszych elementów; możemy je konstruować z bogatych w witaminy składników odżywczych, owieczek w zagrodzie pasterza 
        Eustachego, dzieci przymierających w salach lekcyjnych, kolorowych kulek albo mniej poetycko: z liczb. Na przykład poniższy zbiór $B$ składa się z kliku
        reprezentacyjnych liczb.
    </p>

    $$B = \{ 3, 34, 12, 74, 5, 4 \}$$

    <p>
        Tu mamy zbiór liczb jednocyfrowych: 
    </p>

    $$\{0, 1, 2, 3, 4, 5, 6, 7, 8, 9\}$$

    <p> 
        Poniżej zbiór naturalnych dzielników liczby $60$:
    </p>

    $$\{ 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60\}$$

    <p> 
        Zbiór pierwiastków liczb naturalnych o wartościach mniejszych niż $3$:
    </p>

    $$\{0, 1, \sqrt{2}, \sqrt{3}, 2, \sqrt{5}, \sqrt{6}, \sqrt{7}, \sqrt{8} \}$$

    <p> 
        Zwracamy uwagę na istotne dwie cechy każdego zbioru:
    </p>

    <ul> 
        <li>
            Elementy zbioru nie są uporządkowane, to znaczy nie ma wśród nich narzuconej żadnej kolejności. Wewnątrz nawiasów klamrowych można zapisywać 
            elementy w dowolnym ułożeniu: $\{2, 4, 7, 9\} = \{7, 4, 2, 9\}$ 
        </li>
        <li>
            Wszystkie elementy zbioru są różne: zbiór nie zawiera duplikatów. Matematycznie nie ma sensu zbiór składający się z dwóch trójek $\{3, 3\}$. Zbiór może jedynie 
            posiadać trójkę lub jej nie posiadać.
        </li>
    </ul>
	</lesson-chapter>

	<lesson-chapter><template #title>Moc zbioru</template>
    <p class = "type">
        Intuicje
    </p>
    <p> 
        Gdy dochodzi do starcia dwóch wrogich armii, spodziewamy się, że mocniejsza jest ta, która składa się z większej liczby żołnierzy. To samo dotyczy 
        wszystkich zbiorów w matematyce: moc zbioru to liczba elementów, z jakich się składa. Będziemy zapisywać moc zbioru za pomocą dwóch pionowych kresek, 
        tak samo, jak wartość bezwzględną:
    </p>

    <ul>
        <li>Zbiór $P = \{5, 7, 3, 11, 2\}$ składa się z pięciu liczb: $|P| = 5$</li>
        <li>Zbiór $X = \{a, b, c, d\}$ złożony jest z czterech zmiennych literowych. Jego moc wynosi cztery: $|\{a, b, c, d\}| = 4$</li>
        <li>Zbiór $M = \{ \text{ Jasiu } \}$ to zbiór składający się z Jasia. Jednego Jasia. $|M| = 1$</li>
        <li>Zbiór $W = \bigl\{\{1, 2, 3\}, \{4, 5\}\bigr\}$ składa się z dwóch zbiorów. Jest to zbiór dwuelementowy: $|W| = 2$</li>
    </ul>

    <p> 
        Patologiczny przypadek zbioru, który nie ma żadnych elementów, czyli <i>zbiór pusty</i> oznaczamy specjalnym symbolem $\emptyset$. Wygląda jak kółko, które miało nadzieję, 
        że znajdą się w nim jakieś elementy, ale te nadzieje zostały przekreślone. Na przykład jeśli burmistrz zorganizuje na rynku "spotkanie fanów dzielenia w słupku", 
        ale nikt na nie nie przyjdzie, to zbiór obecnych tam fanów dzielenia w słupku jest zbiorem pustym. Zbiór taki ma moc zero: $|\emptyset| = 0$.
    </p>

    <p> 
        Zbiory mogą posiadać także nieskończoną liczbę elementów. Zbiór wszystkich liczb pierwszych jest zbiorem nieskończonym: $\{2, 3, 5, 7, 11, 13, 17, ...\}$. 
        Zbiór naturalnych potęg dwójki jest nieskończony: $\{1, 2, 4, 8, 16, 32, 64, 128, 256, ...\}$. Zbiór wszystkich możliwych bazgrołów, jakie jesteś w stanie narysować 
        na kartce papieru, jest zbiorem nieskończonym.
    </p>

    <p class = "type">
        Rozszerzenie
    </p>

    <p> 
        Istnieją pewne ograniczenia co do tego, jakie zbiory nieskończone można stworzyć, a jakich nie można. Na przykład matematyka nie pozwala na stworzenie 
        "zbioru wszystkich czerwonych rzeczy" albo po prostu "zbioru wszystkich rzeczy". Wynika to z tego, że nie istnieje coś takiego, jak "zbiór wszystkich możliwych zbiorów" (a więc także zbiór wszystkich "czerwonych"
        zbiorów). Wiąże się to z ciekawą sprzecznością nazywaną <i>paradoksem Russela</i>. Wyobraźmy sobie próbę stworzenia następującego zbioru $X$: 
    </p>

    $$
        \text{Zbiór } X \text{ składa się ze wszystkich zbiorów, które się nie posiadają wśród elementów samego siebie}
    $$

    <ul>
        <li>Zbiór $A = \{1, 2, A\}$ posiada jako jeden z elementów samego siebie. Wobec tego nie dorzucamy go do naszego worka o nazwie $X$.</li>
        <li>Zbiór $\{4, 5, 6\}$ składa się tylko z trzech liczb i nie zawiera samego siebie. Wobec tego znajdzie się w worku $X$.</li>
    </ul>

    <p>
        Przypuśćmy, że udałoby nam się stworzyć pokaźną kolekcję $X$ "wszystkich zbiorów, które nie posiadają samego siebie". Pytanie brzmi: czy zbiór $X$ posiada samego siebie?
        Jeśli tak, to nie spełnia powyższego warunku. Jeśli nie, to go spełnia, więc powinien się znaleźć w kolekcji $X$. Z powodu wystąpienia tej niedogodności
        nie wolno w ogóle dopuszczać myśli, że istnieje coś takiego, jak "zbiór wszystkich zbiorów, które się nie posiadają". A nawet w ogóle: nie dopuszcza się czegoś takiego, 
        jak "zbiór wszystkich zbiorów" jak również nie dopuszcza się "zbiorów, które się posiadają".
    </p>
	</lesson-chapter>

	<lesson-chapter><template #title>Podzbiory</template>
    <p class = "type">
        Intuicje
    </p>

    <p> 
        Wybór kilku elementów spośród pewnego zbioru nazywamy jego podzbiorem. Weźmy zbiór kilku liczb: $\{4, 5, 2, 9, 12, 31, 1\}$. Wybierając garstkę jego reprezentantów, 
        otrzymamy jego podzbiór, na przykład $\{5, 9, 1\}$ albo $\{12, 31, 9\}$. Możemy także wybrać wszystkie jego elementy: $\{4, 5, 2, 9, 12, 31, 1\}$ i również jest to 
        podzbiór. Możemy także nie wybierać żadnego elementu: $\emptyset$. Zbiór pusty jest podzbiorem każdego zbioru. 
    </p>

    <p>
        Taką relację zapisujemy za pomocą symbolu $\subseteq$. Zapis $A \subseteq B$ czytamy "zbiór $A$ jest podzbiorem zbioru $B$". Zgodnie z tą konwencją moglibyśmy zapisać 
        $\{5, 9, 1\} \subseteq \{4, 5, 2, 9, 12, 31, 1\}$. Jeśli chcemy podkreślić, że chodzi nam o <i>podzbiór właściwy</i> czyli taki, który nie składa się ze wszystkich 
        elementów wyjściowego, możemy zastosować oznaczenie $A \subset B$. Wygląda to podobnie do znaczków nierówności: symbol $\leq$ oznaczał, że jedna liczba jest mniejsza 
        lub równa drugiej, a symbol $\lt$, że jest jednoznacznie mniejsza. Gdy ktoś chce <b>bardzo</b> dobitnie podkreślić, że podzbiór jest różny od zbioru-rodzica, zastosuje 
        symbol $A \subsetneq B$, w którym część "lub równe" została wyraźnie przekreślona.
    </p>

    <p>
        Należy zwrócić uwagę, że symbole $\in$ (przynależności do zbioru) oraz $\subseteq$ (zawierania) mają różne znaczenie. Pierwszy z nich wskazuje, że jakiś obiekt 
        znajduje się w worku stanowiącym zbiór. Drugi, że pewna garść obiektów znajduje się w tym worku. Do zbioru $\{1, 2, 3\}$ należą trzy elementy:
    </p>

    <ul>
        <li>$1 \in \{1, 2, 3\}$</li>
        <li>$2 \in \{1, 2, 3\}$</li>
        <li>$3 \in \{1, 2, 3\}$</li>
    </ul>

    <p>
        oraz zawiera on osiem podzbiorów:
    </p>

    <ul>
        <li>$\emptyset \subseteq \{1, 2, 3\}$</li>
        <li>$\{1\} \subseteq \{1, 2, 3\}$</li>
        <li>$\{2\} \subseteq \{1, 2, 3\}$</li>
        <li>$\{3\} \subseteq \{1, 2, 3\}$</li>
        <li>$\{1, 2\} \subseteq \{1, 2, 3\}$</li>
        <li>$\{1, 3\} \subseteq \{1, 2, 3\}$</li>
        <li>$\{2, 3\} \subseteq \{1, 2, 3\}$</li>
        <li>$\{1, 2, 3\} \subseteq \{1, 2, 3\}$</li>
    </ul>

    <p>
        Zbiór wszystkich podzbiorów zbioru $A$ nazywamy jego zbiorem potęgowym. Stosujemy do tego zapis $\mathcal{P}(A)$ (zapisujemy literkę P - od angielskiego 
        powerset - w dość fikuśny sposób, żeby odróżniała się od innych dużych liter; tak właśnie będziemy oznaczać zbiór potęgowy). Zbierając powyżej wylistowane 
        podzbiory jedynko-dwójko-trójki, dostaniemy jej zbiór potęgowy:
    </p>

    $$\mathcal{P}\bigl(\{1, 2, 3\}\bigr) = \bigl\{ \emptyset, \{1\}, \{2\}, \{3\}, \{1, 2\}, \{1, 3\}, \{2, 3\}, \{1, 2, 3\} \bigr\}$$
	</lesson-chapter>

	<lesson-chapter><template #title>Unie i wspólnoty</template>
    <p class = "type">
        Intuicje
    </p>
    <p> 
        Krzyś i Maciuś niedawno wkroczyli w świat kinematografii i stawiają pierwsze kroki w stronę filmowej ekspertyzy. Oto zbiór filmów, które obejrzał Krzysiu:
    </p>

    $$K = \{\text{Suma wszystkich strachów}, \text{Wymierny ogrodnik}, \text{Siedem}, \text{Przerwana lekcja matematyki}, \text{Mianowniki rozrabiają} \}$$

    <p>
        Zaś filmy, które obejrzał Maciuś, to:
    </p>

    $$M = \{ \text{Symetria}, \text{Dzielnik Bridget Jones}, \text{Mianowniki rozrabiają}, \text{Ukryte działania}, \text{Macierz: Reaktywacja}, \text{Siedem} \}$$
	
    <p> 
        Przy najbliższym spotkaniu będą mogli wymienić się wrażeniami z filmów, które obydwaj widzieli, czyli $\text{Siedem}$ oraz $\text{Mianowniki rozrabiają}$. 
        Jest to <i>część wspólna zbiorów</i> ich doświadczeń filmowych. Część wspólną nazywa się również <i>przekrojem</i>; nazwa ta nabierze więcej sensu, gdy poznamy 
        więcej zagadnień z dziedziny geometrii. Symbolicznie:
    </p>

    $$K \cap M = \{\text{Siedem}, \text{Mianowniki rozrabiają}\}$$

    <p> 
        Gdyby Maciuś i Krzyś zechcieli połączyć siły, by popisać się swoją zbiorczą wiedzą filmową, mogliby opowiedzieć o dziewięciu tytułach. Zbiór filmów, które widział Krzyś 
        lub Maciuś, nazywa się <i>sumą zbiorów</i> Maciusiowego i Krzysiowego:
    </p>

    $$K \cup M = \{\text{Suma wszystkich strachów}, \text{Wymierny ogrodnik}, \text{Siedem}, \text{Przerwana lekcja matematyki}, \text{Mianowniki rozrabiają}, 
    \text{Symetria}, \text{Dzielnik Bridget Jones}, \text{Ukryte działania}, \text{Macierz: Reaktywacja}\}$$

    <p> 
        Sumowanie zbiorów bywa podchwytliwe: mimo że moc zbioru Krzysia wynosi $5$, a moc zbioru Maciusia wynosi $6$, moc ich sumy wynosi $9$, czyli nie jest to po prostu 
        wynik dodawania $5 + 6$. Wynika to z tego, że elementy, które powtarzają się w obydwu zbiorach (czyli ich część wspólną) zliczamy tylko jednokrotnie. Uwzględniając, że 
        wśród $5 + 6$ filmów dwa powtarzają się w obydwu zbiorach, moglibyśmy zapisać $9 = 5 + 6 - 2$. Taki rachunek uogólnia się na dowolne dwa zbiory o skończonej liczbie 
        elementów: $|K \cup M| = |K| + |M| - |K \cap M|.$
    </p>

    <p> 
        <i>Różnica zbiorów</i> składa się ze wszystkich elementów, które znajdują się w jednym z nich, a nie znajdują się w drugim. Różnicę zbiorów zapisuje się 
        w bardzo dziwny sposób: $K \setminus M$. Jest to zbiór wszystkich tych filmów, które widział Krzyś, a nie widział ich Maciuś:
    </p>

    $$K \setminus M = \{\text{Suma wszystkich strachów}, \text{Wymierny ogrodnik}, \text{Przerwana lekcja matematyki} \}$$

    <p> 
        Ponownie, w przypadku różnicy nieintuicyjne są własności dotyczące liczby elementów poszczególnych zbiorów. Zbiór $K$ ma moc $5$, zbiór $M$ ma moc $6$, ale różnica "$K$ 
        bez $M$" składa się z trzech elementów - czyli z pięciu bez dwóch będących częścią wspólną. W kontekście zbiorów różnicę możemy rozumieć jako odjęcie 
        części wspólnej: $|K \setminus M| = |K| - |K \cap M|$.
    </p>

    <p>
        Powyższe filmy stanowią kilka pozycji, które Maciuś mógłby obejrzeć w przyszłości, być może za rekomendacją Krzysia. Jednak świat kinematografii ma znacznie więcej 
        do zaoferowania, przed Maciusiem jeszcze cała masa superprodukcji i mnóstwo wrażeń. Wśród filmów, których Maciuś jeszcze nie widział, 
        są takie tytuły, jak $\text{Suma wszystkich strachów}$, $\text{Wymierny ogrodnik}$, $\text{Przerwana lekcja matematyki}$, $\text{Wyprowadzona}$, $\text{Dangerous minus}$,
        $\text{Numer 23}$, $\text{Jestem numerem cztery}$, $\text{Nienawistna ósemka}$, $\text{Nine - dziewięć}$, 
        i wiele, wiele innych. Zbiór <b>wszystkich</b> filmów, których nie widział Maciuś, nazywamy <i>dopełnieniem zbioru</i> 
        filmów, które widział; taki zbiór oznaczamy symbolem $M'$ (stosuje się również oznaczenie $M^c$, mała literka $c$ pochodzi z angielskiego "complement" - dopełnienie). 
        Jest on bardzo duży, więc pozwolimy sobie nie wypisywać wszystkich jego elementów.
    </p>

    <p> 
        Dopełnienie zbioru ma sens tylko wtedy, gdy wiemy, w jakich kategoriach się poruszamy. Dopełnienie zbioru filmów, które widział Maciuś, składa się ze wszystkich 
        <b>filmów</b> których nie widział - a nie ze wszystkich możliwych rzeczy w ogóle. Moglibyśmy zdefiniować zbiór $\Omega$, który składa się ze wszystkich filmów, jakie 
        wytworzyła ludzkość (wybraliśmy wymowną grecką literę OMEGA, żeby zaznaczyć, jak potężny jest to zbiór). W kontekście naszych rozważań taki zbiór nazywamy 
        <i>uniwersum</i> - jest to zbiór wszystkich możliwych elementów, którymi aktualnie się chcemy zajmować. Dopełnienie zbioru $M$ będą stanowić wszystkie elementy 
        $\Omega$ oprócz tych w $M$, czyli generalnie: $M' = \Omega \setminus M$.
    </p>
    </lesson-chapter>

	<lesson-chapter><template #title>Diagramy Venna</template>
    <p class = "type">
        Intuicje
    </p>
    <p> 
        Wszystkie działania na zbiorach, które przedstawiliśmy w poprzedniej sekcji, bardzo ładnie wyglądają na obrazkach przedstawiających zbiory w postaci 
        luźno zarysowanych kształtów. Zbiór możemy sobie wyobrażać jako swobodną chmurę, w której dryfują zawieszone elementy zbioru. 
    </p>

	<center><img src="./.images/Screenshot_5.png" align="middle"></center>

    <p> 
        W abstrakcyjnej formie przekrój, suma, różnica i dopełnienie zbiorów wyglądałyby jakoś tak:
    </p>

	<center><img src="./.images/Screenshot_6.png" align="middle"></center>

    <p> 
        A na przykład trzy zbiory rozdzielają uniwersum na takie fragmenty:
    </p>

	<center><img src="./.images/Screenshot_7.png" align="middle"></center>

    <p>
        Gdyby $A$ oznaczał zbiór usług, które są tanie, $B$ zbiór usług, które są dobrze wykonane, a $C$ zbiór usług, które są szybkie, po wyznaczeniu części wspólnych mielibyśmy:
    </p>

	<center><img src="./.images/Screenshot_8.png" align="middle"></center>
    </lesson-chapter>

	<lesson-chapter><template #title>Oś liczbowa</template>
    <p class = "type">
        Intuicje
    </p>
    <p> 
        Pora podsumować wiedzę, którą zebraliśmy w dotychczasowych lekcjach na temat rodzajów liczb. 
    </p>

    <p>
        Liczby naturalne to te, które służą do zliczania obiektów - sprawdzamy, ile jabłek mieści się w koszyku Eustachego i liczymy kolejno: jeden, dwa, trzy, cztery... .
        Zbiór liczb naturalnych oznaczać będziemy od tej pory stylizowaną literą $\mathbb{N}$, jak Naturalne.
    </p>

    $$\mathbb{N} = \{0, 1, 2, 3, 4, 5, 6, ...\}$$

	<center><img src="./.images/Screenshot_9.png" align="middle"></center>

    <p>
        Liczby całkowite to liczby naturalne wraz z liczbami do nich przeciwnymi. Służą do opisywania wielkości, w których "poziom zerowy" ustalony został w sposób sztuczny, 
        tak jak przy opisie wysokości nad poziomem morza, temperatury z wymyśloną pozycją $0°C$ albo pięter w stosunku do poziomu uznanego za parter. Dla liczb całkowitych 
        przyjęło się oznaczenie $\mathbb{Z}$ od niemieckiego Zahlen - liczby. Zdarza się, że w polskich źródłach znajdzie się oznaczenie $\mathbb{C}$, jednak w <b>szanującym się</b>
        środowisku matematycznym taka litera została zarezerwowana dla liczb zespolonych (o których kiedy indziej).
    </p>

    $$\mathbb{Z} = \{ ..., -4, -3, -2, -1, 0, 1, 2, 3, 4, ...\}$$
	<center><img src="./.images/Screenshot_10.png" align="middle"></center>

    <p> 
        Liczby wymierne to ułamki postaci $\frac{p}{q}$ gdzie $p$ i $q$ to liczby całkowite (moglibyśmy zapisać: $p \in \mathbb{Z}$ oraz $q \in \mathbb{Z} \setminus\{0\}$). Liczby wymierne służą do 
        mierzenia (wymierzania) różnych wielkości, na przykład długości. Gdy określimy jakąś jednostkę długości, na przykład jeden centymetr, to długości wymierne 
        będą stanowiły pewną wielokrotność tej jednostki lub pewna wielokrotność tej długości zrówna się z pewną wielokrotnością jednostki (gdy położymy obok siebie 
        trzy patyczki długości $\frac{10}{3} \text{ cm}$, możemy je zmierzyć dziesięciocentymetrową linijką). Dla liczb wymiernych zarezerowowano literę 
        $\mathbb{Q}$ odpowiadającą angielskiemu Quotient - iloraz (nie należy zwracać uwagi na polskie źródła, w których stosuje się literę $\mathbb{W}$). Gdyby na osi liczbowej 
        zaznaczyć wszystkie punkty odpowiadające liczbom wymiernym, powstałoby bardzo gęste pokrycie kropkami, ale jednak - w niektórych miejscach wciąż byłyby dziury. 
        Wprawdzie "dziury" te byłyby nieskończenie małe, to jednak wciąż istnieją miejsca na osi, których zbiór liczb wymiernych nie pokrywa.
    </p>

    $$\mathbb{Q} = \bigl\{0, 1, \frac{1}{2}, -\frac{1}{3}, -7, \frac{5}{7}, -3.14, ...\bigr\}$$
	<center><img src="./.images/Screenshot_11.png" align="middle"></center>

    <p>
        Liczby niewymierne to wszystkie te, których z różnych przyczyn nie da się zapisać w postaci ułamków zwykłych $\frac{p}{q}$. Do tej pory z liczbami niewymiernymi 
        mieliśmy styczność przy okazji badania pierwiastków - udowodniliśmy, że liczba $\sqrt{2}$ (jak i większość pozostałych pierwiastków) jest niewymierna. Oprócz pierwiastków, 
        niewymierne są wszystkie liczby, które mają po przecinku nieskończenie wiele cyfr i nie ujawnia się wśród nich cykliczność. Moglibyśmy na przykład utworzyć sztuczną 
        liczbę niewymierną: $1,101001000100001...$, której rozwinięcie dziesiętne składa się z kolejnych jedynek rozdzielonych coraz większą liczbą zer. Jakkolwiek dziwne nie 
        wydawałyby się takie twory, liczby niewymierne da się odnaleźć w otaczającym nas świecie; lekcje poświęcone geometrii ujawnią, że liczby niewymierne pojawiają się 
        bezustannie przy kształtach kwadratowych lub kolistych. Zbiór liczb niewymiernych oznaczamy po prostu jako $\mathbb{Q}'$, czyli dopełnienie zbioru liczb wymiernych (nieważne, 
        że w niektórych polskich źródłach znajdzie się oznaczenie $\mathbb{NW}$). Gdyby zaznaczyć wszystkie liczby niewymierne na osi, powstałaby sieczka podobna do tej 
        poprzedniej. Miejsca, które wtedy były dziurami, zostaną teraz zapełnione, a te, w których znajdowała się kropka wymierna, teraz będą wybrakowane.
    </p>
    $$\mathbb{Q}' = \bigl\{\sqrt{2}, \sqrt{3}, 0.12345678910111213..., 0.235711131719...,  ...\bigr\}$$

	<center><img src="./.images/Screenshot_12.png" align="middle"></center>

    <p>
        Zbiór liczb wymiernych wraz ze zbiorem liczb niewymiernych tworzy zbiór liczb rzeczywistych. Są to właściwie wszystkie liczby, z którymi można się spotkać na co dzień.
        Liczby rzeczywiste oznaczamy literą $\mathbb{R}$. Moglibyśmy zapisać: $\mathbb{R} = \mathbb{Q} \cup \mathbb{Q}'$. Dopiero z połączenia liczb wymiernych z niewymiernymi 
        powstaje ciągła linia, w pełni pokrywająca całą oś liczbową. W istocie: oś liczbowa to graficzna reprezentacja zbioru liczb rzeczywistych.
    </p>
    $$\mathbb{R} = \{0, 51.45, 1.101001000100001..., 0.(2), -5, \sqrt{3}, 3.1415926535..., ...\}$$
	<center><img src="./.images/Screenshot_13.png" align="middle"></center>

    <p> 
        Gdy będziemy chcieli zaznaczyć, że spośród któregoś z powyższych zbiorów interesują nas tylko liczby dodatnie lub ujemne, będziemy zapisywać plusa lub minusa w indeksie 
        dolnym ich symboli. Zbiór $\mathbb{R}_-$ będzie oznaczał zbiór wszystkich liczb rzeczywistych ujemnych, a $\mathbb{R}_+$ zbiór wszystkich liczb rzeczywistych dodatnich.
        $\mathbb{N}_+$ jak również $\mathbb{Z}_+$ będzie oznaczał wszystkie liczby naturalne dodatnie, czyli bez zera.
    </p>
    </lesson-chapter>

	<lesson-chapter><template #title>Przedziały liczbowe</template>
    <p class = "type">
        Intuicje
    </p>
    <p> 
        Gdy do osi liczbowej przyłożymy marker i za jednym pociągnięciem zaznaczymy jej fragment, otrzymamy podzbiór $\mathbb{R}$ zwany przedziałem. Jest to po prostu zakres 
        liczb rzeczywistych od jednej wartości do drugiej. Przedział składający się z liczb od dwóch do pięciu będziemy oznaczać 
        jako $[2, 5]$. 
    </p>

	<center><img src="./.images/Screenshot_14.png" align="middle"></center>

    <p> 
        Przedział ten nazywa się <i>obustronnie domkniętym</i>, ponieważ zawiera liczby od dwóch do pięciu <b>włącznie</b> z dwójką i piątką. Przedział ten składa się 
        z liczb, które są większe lub równe $2$ i jednocześnie mniejsze lub równe $5$, czyli w skrócie składa się z $x$ spełniających warunek $2 \leq x \leq 5$. Niektórzy 
        dla oznaczania przedziałów domkniętych preferują oznaczenie $\langle 2, 5 \rangle$. 
    </p>

    <p> 
        Jeśli z przedziału wykluczymy <i>końce przedziału</i>, otrzymamy przedział <i>obustronnie otwarty</i>. Przedział $(-4, 1)$ składa się ze wszystkich liczb od $-4$ do 
        $1$ <b>bez</b> $-4$ i $1$, czyli odpowiada iksom spełniającym warunek: $-4 \lt x \lt 1$.
    </p>
	<center><img src="./.images/Screenshot_15.png" align="middle"></center>

    <p>
        Możemy tworzyć także mieszane przedziały: lewostronnie domknięty, na przykład $[-6, -4)$ lub prawostronnie domknięty, jak $(0, 3]$. Gdy zaznaczamy przedział na rysunku, 
        domknięty koniec przedziału zaznaczamy umownie w postaci zamalowanej kropki, a otwarty w postaci pustej.
    </p>

	<center><img src="./.images/Screenshot_16.png" align="middle"></center>

    <p>
        Wyróżniamy jeszcze przedziały o nieskończonej długości: takie, które nie mają początku lub końca. Przedział odpowiadający wszystkim liczbom o wartości $2$ lub większej 
        ($x \geq 2$) będzie ciągnął się na prawo od dwójki aż do nieskończoności: $[2, \infty)$. Symbol $\infty$ przypominający przewróconą ósemkę oznacza właśnie nieskończoność 
        (geneza tego symbolu nie jest pewna, być może pochodzi on od litery CƆ będącej zniekształconym M - Rzymskie $1000$ - a być może od greckiej $\omega$, czyli generalnie "dużo").
    </p>
	<center><img src="./.images/Screenshot_17.png" align="middle"></center>

    <p> 
        Przedział liczb mniejszych od $4$ (czyli $x \lt 4$) ciągnie się od ujemnej nieskończoności aż do czterech: $(-\infty, 4)$. Jeśli końcem przedziału jest nieskończoność 
        lub minus nieskończoność, koniec ten zawsze zaznaczamy jako otwarty. Oznaczając ten koniec jako domknięty, sugerowalibyśmy, że nieskończoność sama w sobie jest częścią 
        tego przedziału - że jest elementem tego podzbioru liczb rzeczywistych. Należy pamiętać, że nieskończoność nie jest liczbą rzeczywistą, a symbol $\infty$ stanowi jedynie 
        umowne oznaczenie końca przedziału, coś w rodzaju "wyobrażenia" nieskończoności, a nie "wartości równej nieskończoność". 
    </p>
    
	<center><img src="./.images/Screenshot_18.png" align="middle"></center>

    <p>
        Przedział od minus nieskończoności do plus nieskończoności stanowi po prostu całą oś rzeczywistą: $(-\infty, \infty) = \mathbb{R}$.
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
  name: "ZbioryLiczbowe",
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

<style scoped>
</style>
