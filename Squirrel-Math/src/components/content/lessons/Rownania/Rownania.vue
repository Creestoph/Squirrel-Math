<template>
  <lesson>
    <lesson-title>Równania</lesson-title>

    <lesson-intro>   
    <p>
        Rozwiązywanie równań to odkrywanie tajemnic, poznawanie tego, co nieznane, zyskiwanie pewności w sytuacjach niepewnych. Każdemu z nas zdarza się czasem stracić grunt pod nogami w obliczu problemu, z którym musimy się zmierzyć. Jest to etap w naszym życiu, w którym szukamy pewnych 
        wartości. Wynikiem tych poszukiwań jest coś, czego do tej pory nie znaliśmy, coś niebywałego, nieoczywistego, a jednocześnie gdy już to znajdziemy, nie mamy wątpliwości,
        że właśnie o to nam chodziło. Że jest to rozwiązanie naszego dylematu. Że właśnie tego było nam trzeba. Nawet w burzliwym okresie
        Rewolucji Francuskiej tłumy wykrzykiwały doniośle: "wolność, równość, braterstwo". Zajmiemy się dziś drugim spośród tych wymownych haseł.
	</p>
    </lesson-intro>   
	<lesson-chapter><template #title>Szukając wartości</template>
    <p class = "type">
		Intuicje
	</p>
    <p> 
        Z pojęciem równania spotkaliśmy się kilkakrotnie w poprzednich lekcjach:
    </p>

    <p class="problem"> 
        Gutek zbiera na wymarzony zestaw Lego, który kosztuje $120 \text{ zł}$. 
		<span class="comment" id="Zwyczajowo zwaną kieszonkowym">Ciężką pracą</span>
		zarobił $40 \text{ zł}$ i zastanawia się, ile 
		jeszcze musi uzbierać. Stoi więc przed problemem:
		$$40 + \text{∎} = 120$$
    </p>

    <p class="problem">
        $60$ jest podzielna przez $2$, czyli można ją zapisać w postaci iloczynu dwójki i jakiejś liczby. 
        $$60 = 2 \cdot \text{∎}$$
    </p>

    <p class="problem">
        Ile razy ułamek $\frac{1}{4}$ mieści się w liczbie $\frac{3}{4}$? 
        $$\text{∎} \cdot \frac{1}{4} = \frac{3}{4}$$
    </p>

    <p> 
        Każdy z powyższych zapisków przedtawia równanie, w którym <i>niewiadomą</i> oznaczono symbolem $\text{∎}$. To takie okienko, w które należałoby wpisać 
        właściwą liczbę, dzięki której otrzymalibyśmy poprawnie zapisane działanie. Taka liczba to <i>rozwiązanie równania</i> (czasem mówi się także <i>pierwiastek równania</i>,
        choć nazwa ta brzmi co najmniej śmiesznie).
    </p>

    <p>
        Stosowanie symbolu $\text{∎}$ dla określenia nieznanej wartości jest cokolwiek niepraktyczne. Bardziej serdeczne jest zastosowanie pewnej literki. Z jakiegoś powodu 
        przyjęło się globalnie, że niewiadomą w równaniu zapisuje się za pomoca litery $x$:
    </p>

	$$40 + x = 120$$
    $$60 = 2x$$
    $$x \cdot \frac{1}{4} = \frac{3}{4}$$

    <p> 
        Aby rozwiązać równanie, należy w jakiś sposób odgadnąć, jaką wartość należy podstawić pod $x$, by <i>spełnić równanie</i>. Powyższe przykłady są bardzo proste; łatwo 
        można obliczyć, że pierwsze równanie spełnia $x = 80$, w drugim równaniu należy wstawić $x = 30$, zaś rozwiązaniem trzeciego jest $x = 3$.
    </p>
	</lesson-chapter>

	<lesson-chapter><template #title>Zgadywanie wyniku</template>
    <p class = "type">
		Warsztat
	</p>
    <p> 
        Zmierzmy się z kilkoma mniej oczywistymi równaniami.
    </p>
    
    <div class="example">
        Pewną liczbę potrojono i dodano do niej $4$, a w wyniku otrzymano $25$. Jaka to liczba?
        $$3x + 4 = 25$$
        Możemy spróbować odgadnąć wynik: gdy w miejsce $x$ wstawimy $5$, otrzymamy po lewej stronie znaku równości $3 \cdot 5 + 4$, czyli $19$. Jest to mniej niż po prawej stronie. 
        Spróbujmy z ósemką: $3 \cdot 8 + 4$ daje w wyniku $28$, czyli trochę za dużo. Okazuje się, że $x = 7$ jest rozwiązaniem równania, ponieważ $3 \cdot 7 + 4 = 25$.
    </div>

    <div class="example">
        Jaka liczba pomnożona przez samą siebie daje $9$?
        $$x \cdot x = 9$$
        Znając dobrze tabliczkę mnożenia odpowiemy bez wachania, że rozwiązaniem jest $x = 3$. Jednak w tym równaniu kryje się pułapka! W miejsce $x$ można wstawić także 
        liczbę ujemną: $-3$, ponieważ $(-3) \cdot (-3)$ także ma wartość $9$. Okazuje się, że to równanie ma dwa rozwiązania.
    </div>

    <div class="example">
        $$(x - 3) \cdot (x  + 2) \cdot (x - 5) = 0$$
        Na powyższe równanie możemy spojrzeć w taki sposób: mamy trzy liczby, $(x - 3)$, $(x + 2)$ oraz $(x - 5)$, każda z nich zależy od niewiadomej $x$. Ich iloczyn 
        ma być równy $0$. Skoro iloczyn trzech liczb ma być zerem, to z pewnością któraś z nich musi być zerem: w przeciwnym razie mielibyśmy iloczyn dodatnich i ujemnych 
        liczb, które w wyniku dadzą coś różnego od zera. W takim razie $x - 3$ jest zerem lub $x + 2$ jest zerem lub $x - 5$ jest zerem. W pierwszym przypadku warunek spełnia
        $x = 3$, w drugim przypadku $x = -2$ a w trzecim $x = 5$. W takim razie równanie ma trzy rozwiązania: $3$, $-2$ oraz $5$. Możemy wziąć dowolną z tych liczb, wstawić 
        ją zamiast każdego iksa, a otrzymamy poprawnie zapisane działanie.
    </div>

    <div class="example">
        $$\frac{2x}{2x+3} = \frac{2}{3}$$
        Po lewej stronie równania widzimy ułamek, który w liczniku ma $2x$, a w mianowniku $2x+3$, czyli mianownik jest o $3$ większy od licznika. 
        Po prawej stronie mamy ułamek $\frac{2}{3}$, którego mianownik jest tylko o $1$ większy od licznika. Aby zapobiec tej rozbieżności, zapiszemy ułamek $\frac{2}{3}$
        w równoważnej, rozszerzonej postaci: $\frac{2x}{2x+3} = \frac{6}{9}$. Teraz widzimy, że licznik $2x$ powinien mieć wartość $6$, zaś powiększony o $3$ mianownik powinien 
        zrównać się z dziewiątką. Równanie upraszcza się do postaci $2x = 6$, zatem $x = 3$. Możemy sprawdzić, czy otrzymaliśmy poprawne rozwiązanie:

        $$\frac{2 \cdot 3}{2 \cdot 3 + 3} = \frac{6}{6 + 3} = \frac{6}{9} = \frac{2}{3}$$
    </div>

    <div class="example"> 
        Jaka liczba powiększona o $6$ jest równa swojej czterokrotności?
        $$x + 6 = 4x$$
        Możemy wyobrazić sobie, że $x$ to paczka o nieznanej wadze, zaś między jedną taką paczką a czterema paczkami jest odstęp sześciu jednostek.
        W takim razie $3$ paczki mają wagę $6$, czyli jedna paczka ma wagę $2$, zatem $x = 2$.
	    <center><img src="./.images/Screenshot_1.png" align="middle"></center>
    </div>
	</lesson-chapter>

    <lesson-chapter><template #title>Rozwiązywanie równań</template>
    <p class = "type">
		Warsztat
	</p>

    <p> 
        Umiejętność kombinowania, improwizowania i radzenia sobie w każdej sytuacji jest niebywale przydatna w matematyce. Tylko że nie zawsze jest potrzeba odwoływania się 
        do tak drastyczych metod. Z pokolenia na pokolenie wypracowano coraz lepsze metody na rozwiązywanie różnego rodzaju równań - w nadchodzących lekcjach poznamy 
        sporo przydanych technik rozpracowywania różnych zawiłych problemów algebraicznych. Na razie wprowadzimy kilka bardzo podstawowych i uniwersalnych narzędzi.
    </p>

    <p>
        Na równaniach wolno dokonywać pewnych przekształceń, które nie zmieniają jego istoty, a zbliżają nas do znalezienia rozwiązania. Wolno nam dokonywać
        obustronnego dodawania, odejmowania oraz mnożenia i dzielenia stron równości przez tą samą liczbę. 
    </p>

    <div class="example">
        Weźmy równanie:
        $$3x + 3 = 9$$
        Niewiadomą $x$ będziemy traktować jak paczuszkę o nieznanej wadze, a liczby, w których zmienna się nie pojawia, jak pewną ilość ciężarków jednostkowych. 
        Gdy położymy na jednej szalce wagi $3$ paczki i $3$ ciężarki, a na drugiej szalce $9$ ciężarków, to waga będzie w równowadze.
        <center><img src="./.images/Screenshot_2.png" align="middle"></center>
        Gdy z obu stron szalki odejmiemy po trzy ciężarki, waga wciąż będzie w równowadze. Rozwiązując równanie, możemy zanotować obok wynonane przekształcenie i przepisać
        równanie w nowej postaci:

        $$\begin{align} 3x + 3 &= 9\ \ \ \ \ \ \ \ \color{#888888}{| -3}\\
        3x + 3 - 3 &= 9 - 3\\
        3x &= 6
        \end{align}$$
	    <center><img src="./.images/Screenshot_3.png" align="middle"></center>
        Teraz każde z ramion szalki rozdzielamy na trzy równe porcje. Każda z porcji na lewej szalce będzie miała taką samą wagę, jak porcja na prawej szalce.
        $$\begin{align} 3x &= 6\ \ \ \ \ \ \ \ \color{#888888}{| :3}\\
        3x : 3 &= 6 : 3\\
        x &= 2
        \end{align}$$
	    <center><img src="./.images/Screenshot_4.png" align="middle"></center>
        Otrzymujemy rozwiązanie równania: $2$.
    </div>

    <div class="example">
        Zmierzmy się z równaniem:
        $$\frac{1}{2}x - 3 = 1$$
        Gdyby połowę paczki $x$ odchudzić o wagę trzech ciężarków, to miałaby wagę jednego ciężarka. W takim razie gdyby jej nie odchudzać, to połowa paczki miałaby wagę 
        $3$ ciężarków. Do obydwu stron równania dodaliśmy liczbę $3$:
        $$\begin{align} \frac{1}{2}x - 3 &= 1\ \ \ \ \ \ \ \ \color{#888888}{| +3}\\
        \frac{1}{2}x - 3 + 3 &= 1 + 3\\
        \frac{1}{2}x &= 4
        \end{align}$$
        <center><img src="./.images/Screenshot_5.png" align="middle"></center>
        Na obu szalkach podwajamy ilość składników. Skoro jedna połówka miała wagę $4$ paczek, to dwie połówki będą miały wagę $8$ paczek:
        $$\begin{align} \frac{1}{2}x &= 4\ \ \ \ \ \ \ \ \color{#888888}{| \cdot 2}\\
        \frac{1}{2}x \cdot 2 &= 4 \cdot 2\\
        x &= 8
        \end{align}$$
        <center><img src="./.images/Screenshot_6.png" align="middle"></center>
    </div>

    <div class="example">
        Zobaczmy, co się dzieje, gdy po obu stronach równania pojawiają się niewiadome.
        $$2x + 10 = 5x + 1 $$
        Dwie paczki i dziesięć ciężarków mają taką samą wagę jak pięć paczek i jeden ciężarek.
        <center><img src="./.images/Screenshot_7.png" align="middle"></center>
        Z obydwu szalek zabieramy dwie paczki:
        $$\begin{align} 2x + 10 &= 5x + 1\ \ \ \ \ \ \ \ \color{#888888}{| -2x}\\
        10 &= 3x + 1
        \end{align}$$
        <center><img src="./.images/Screenshot_8.png" align="middle"></center>
        Oraz zabieramy po jednym ciężarku:
        $$\begin{align} 10 &= 3x + 1\ \ \ \ \ \ \ \ \color{#888888}{| -1}\\
        9 &= 3x
        \end{align}$$
        <center><img src="./.images/Screenshot_9.png" align="middle"></center>
        Każdą szalkę porcjujemy na trzy równe części i porównujemy ze sobą tylko te trzykrotnie mniejsze porcje:
        $$\begin{align} 9 &= 3x\ \ \ \ \ \ \ \ \color{#888888}{| :3}\\
        3 &= x
        \end{align}$$
        <center><img src="./.images/Screenshot_10.png" align="middle"></center>
        Rozwiązaniem równania jest liczba $3$.
    </div>
	</lesson-chapter>

    <lesson-chapter><template #title>Metoda na zagadki</template>
    <p class = "type">
		Intuicje
	</p>
    <p> 
        Rozwiązywanie równań przypomina rozwiązywanie zagadek logicznych. Zmyślna historyjka z niebanalną fabułą wprowadza bohaterów wydarzeń i opisuje ich 
        doniosłe dokonania, a następnie przedstawia rezultaty ich działań. Znając te rezultaty, mamy odgadnąć pewne cechy tych bohaterów, czyli znaleźć pewną niewiadomą, 
        na podstawie której powstały znane wartości.
    </p>

    <div class="example"> 
        Jednym z pierwszych matematyków zajmujących się arytmetyką i algebrą był grecki matematyk Diofantos żyjący około roku $200$ naszej ery. Na jego cześć równania, 
        których rozwiązaniami są liczby całkowite, nazywa się <i>równaniami diofantycznymi</i>. Jego autorstwu przypisuje się jedną z pierwszych zagadek w historii: 
        suma dwóch liczb wynosi $100$, a ich różnica $40$. Jakie to liczby?<br><br>

        Oznaczmy przez $x$ mniejszą z tych liczb, wtedy większa z nich będzie o $40$ większa, czyli będzie to $x + 40$. Ich suma wynosi $100$, czyli 
        $$\begin{align} 
        x + (x + 40) &= 100\\
        2x + 40 &= 100 &\color{#888888}{| -40}\\
        2x &= 60 &\color{#888888}{| :2}\ \ \ \\
        x &= 30
        \end{align} $$
        Odpowiedź dają liczby $30$ i $70$.
    </div>

    <div class="example"> 
        Klasyka: cegła waży kilogram i pół cegły. Ile waży cegła?<br><br>
        Oznaczmy przez $x$ wagę cegły. Wagę tę można przedstawić równoważnie w postaci sumy kilograma i połowy $x$, czyli
        $$\begin{align} 
        x &= \frac{1}{2}x + 1 &\color{#888888}{| -\frac{1}{2}x}\\
        \frac{1}{2}x&= 1 &\color{#888888}{| \cdot 2}\ \ \ \ \ \\
        x &= 2
        \end{align} $$
        Istotnie, dwa kilogramy to kilogram i jeszcze połowa z dwóch kilogramów.
    </div>

    <div class="example"> 
        Maciuś i Michaś dostali od babci Teresy równe porcje pierogów. Ponieważ Maciusia przeraził ogrom porcji babci Teresy, oddał Michasiowi jedną trzecią swojej porcji. 
        W wyniku tej machlojki Michaś miał na talerzu o $10$ pierogów więcej niż Maciuś. Ile pierogów zawierała oryginalna porcja babci Teresy?<br><br>

        Oznaczmy przez $x$ pierwotną liczbę pierogów na talerzach. Maciuś postanowił ofiarować $\frac{1}{3}x$ pierogów Michasiowi, w wyniku czego Maciusiowi zostało na 
        talerzu $x - \frac{1}{3}x$  pierogów, a Michaś miał ich $x + \frac{1}{3}x$. Skoro porcje te różnią się o $10$ pierogów, to

        $$\begin{align} 
        x -\frac{1}{3}x + 10 &= x + \frac{1}{3}x &\color{#888888}{| -x}\ \ \ \ \\
        -\frac{1}{3}x + 10 &= \frac{1}{3}x &\color{#888888}{| +\frac{1}{3}x}\\
        10 &= \frac{2}{3}x &\color{#888888}{| \cdot 3}\ \ \ \ \ \\
        30 &= 2x &\color{#888888}{| : 2}\ \ \ \ \\
        15 &= x
        \end{align} $$

        A więc to było tak: Maciuś i Michaś mieli po $15$ pierogów, potem Maciuś przetransferował $5$ pierogów, w wyniku czego spiskowcy mieli odpowiednio $10$ i $20$ pierogów.
    </div>

    <div class="example"> 
        Mama Krzysia jest od niego trzy razy starsza, a za dziesięć lat będzie od niego dwa razy starsza. Ile lat ma Krzyś?<br><br>
        Oznaczmy przez $x$ wiek Krzysia. Jego mama ma $3x$ lat. Za $10$ lat Krzyś będzie miał $x + 10$ lat, zaś jego mama $3x + 10$. Skoro wtedy będzie od niego $2$ razy starsza, to 
        $$\begin{align} 2(x+10) &= 3x+10\\
        2x + 20 &= 3x+10 &\color{#888888}{| -2x}\\
        20 &= x + 10 &\color{#888888}{| -10}\\
        10 &= x
        \end{align}$$
        Krzyś ma $10$ lat.
    </div>
	</lesson-chapter>

	<lesson-chapter><template #title>Dziedzina równania</template>
    <p class = "type">
		Rozszerzenie
	</p>
    <p> 
        Z formalnego punktu widzenia, przed przystąpieniem do rozwiązywania równania, powinno się określić, jakie liczby "teoretycznie" mogą, a jakie nie mogą być rozwiązaniem 
        tego równania. Nie jest to wprawdzie istotne przy rozwiązywaniu podstawowych równań jak te, które poznaliśmy do tej pory. Jednak nadejdą mroczne czasy, a wtedy będziemy 
        musieli być silni. Nie zaszkodzi przestrzec już teraz, że nieostrożność może wprowadzić nas w pułapkę. Rozważmy równanie 
        $$x = \frac{x - 1}{x - 1}$$
        Moglibyśmy poddać się rozumowaniu: po prawej stronie widzimy ułamek $\frac{x - 1}{x - 1}$, czyli ułamek, który ma taki sam licznik jak i mianownik. Bez względu na to, jaką 
        dokładnie wartość liczbową wstawimy w miejsce $x$, na pewno licznik i mianownik będą takie same, więc ułamek ten skraca się do jedynki: $\frac{x - 1}{x - 1} = 1$. W takim 
        razie powyższe równanie upraszcza się do postaci 
        $$x = 1$$
        czyli rozwiązaniem tego równania jest liczba $1$. Jednak dokonajmy sprawdzenia: czy po wstawieniu jedynki w miejsce wystąpień $x$ otrzymamy poprawną równość? Równanie przyjmie 
        postać
        $$1 = \frac{1 - 1}{1 - 1}$$
        czyli inaczej
        $$1 = \frac{0}{0}$$
        A przecież przez $0$ dzielić nie wolno. Z tego powodu <b>przed</b> przystąpieniem do rachunków powinniśmy zauważyć, że w pierwotnym równaniu znajduje się mianownik 
        z niewiadomą $x - 1$, czyli już na samym początku wiadomo, że zabroniona jest wartość $x = 1$. Jest to tzw. określenie dziedziny równania: określiliśmy, że 
        "potencjalne" rozwiązania mieszczą się wszędzie z wyjątkiem jedynki. Po rozwiązaniu równania otrzymujemy $x = 1$, jednak rozwiązanie to jest spoza dziedziny, 
        wobec czego równanie nie ma rozwiązań.
    </p>
	</lesson-chapter>

	<lesson-chapter><template #title>Równania sprzeczne i tożsamościowe</template>
    <p class = "type">
		Intuicje
	</p>
    <p> 
        Równania, które nia mają żadnych rozwiązań, nazywamy sprzecznymi. Rozważmy równanie: 
    </p>
    $$|x - 5| = -2$$
    <p> 
        Nie ma takiej liczby, która pomniejszona o $5$ ma wartość bezwzględną równą $-2$, ponieważ wartość bezwzględna dowolnej liczby jest nieujemna. Innym przykładem 
        równania sprzecznego jest
    </p> 

    $$x \cdot x = -4$$

    <p> 
        Iloczyn liczby przez samą siebie nie może być ujemny. Gdy pomnożymy przez siebie liczbę dodatnią, otrzymamy dodatnią. Gdy pomnożymy przez siebie liczbę ujemną, również 
        otrzymamy wynik dodatni. Gdy pomnożymy przez siebie $0$, otrzymamy $0$.
    </p> 

    <p> 
        Istnieją także równania, które spełnione są przez dowolne liczby - nazywamy je równaniami tożsamościowymi, na przykład:
    </p>
    
    $$2x + 3x = 5x$$

    <p> 
        Bez względu na wartość $x$, ciężko się kłócić, że dwa iksy i jeszcze trzy iksy to razem pięć iksów. Gdybyśmy próbowali "rozwiązać" to równanie przez obustronne odjęcie 
        $2x$ i $3x$, otrzymalibyśmy postać $0 = 0$. Jeśli w trakcie rozwiązywania równania otrzymamy $0 = 0$, to równanie jest tożsamościowe i spełnia je każda liczba 
        (precyzyjniej: każda liczba z dziedziny równania).
    </p>

    <p> 
        Równanie sprzeczne oznacza, że warunki zadania zostały sformułowane zbyt restrykcyjnie i nie da się znaleźć liczby rozwiązującej tak postawiony problem. 
        Równanie tożsamościowe sugeruje, że jego warunki nie wnoszą żadnej przydatnej informacji i stanowią po prostu prawdziwą prawdę.
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
  name: "Rownania",
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
