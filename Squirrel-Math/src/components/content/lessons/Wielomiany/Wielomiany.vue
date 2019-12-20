<template>
  <lesson routeShortVersion="/wielomiany-short" routeLongVersion="/wielomiany">
    <lesson-title>Wielomiany</lesson-title>

    <lesson-intro>   
    <p>
        Pora poskromić równania dowolnego stopnia. Nie będziemy ograniczać się do iksów w pierwszej czy drugiej potędze. Poznamy sposoby, dzięki którym damy sobie radę 
        z większością równań zawierających niewiadome w dowolnej potędze. Po tej lekcji należy się awans z juniora do kadeta algebry.
	</p>
    </lesson-intro>   

	<lesson-chapter><template #title>Jakie znowu wielomiany?</template>
    <p class = "type">
		Intuicje
	</p>

    <p> 
        W obrębie tej lekcji będziemy toczyć walkę z równaniami tego typu:
    </p>

    $$
        x^5−15x^3+10x^2+60x−72 = 0
    $$

    <p> 
        czyli z równaniami, które składają się ze zmiennych podniesionych do rozmaitych potęg naturalnych. Aby efektywnie rozwiązywać takie równania, warto dokonać 
        pewnego przeskoku myślowego: patrząc na powyższy zapis, nie będziemy myśleli o "równaniach", ale o "wielomianach".
    </p>

    <p class = "type">
		Formalnie
	</p>

    <p> 
        Wielomianem zmiennej $x$ nazywamy wyrażenie algebraiczne będące sumą naturalnych potęg tej zmiennej mnożonych przez pewne liczby, nazywane współczynikami. 
        W ogólności są to wyrażenia postaci:
    </p>

    $$
        a_nx^n + a_{n-1}x^{n-1} + \dots + a_3x^3 + a_2x^2 + a_1x + a_0
    $$

    <p> 
        Liczby $a_n, a_{n-1}, \dots, a_2, a_1, a_0$ to <i>współczynniki wielomianu</i>, przyjmujemy, że $a_n \neq 0$. Jeżeli są to liczby rzeczywiste, wielomian nazywamy 
        <i>wielomianem rzeczywistym</i>, jeżeli są całkowite, jest to <i>wielomian całkowity</i> itd. Wartość $n$ (najwyższej potęgi zmiennej $x$) nazywamy 
        <i>stopniem wielomianu</i>.
    </p>

    <ul> 
        <li>Wyrażenie $5x^3 + 2x - 7$ jest wielomianem trzeciego stopnia.</li>
        <li>Wyrażenie $2x^2 - 6x + 3$ jest wielomianem drugiego stopnia. Wielomiany (dowolnego stopnia) z trzema składnikami określamy czasem mianem <i>trójmianu</i>.</li> 
        <li>Wyrażenie $4x^2 - 5x^5$ jest wielomianem piątego stopnia. Ponieważ ma on tylko dwa składniki, jest to <i>dwumian</i>.</li> 
        <li>Wyrażenie $6x^4$ jest wielomianem czwartego stopnia, przy okazji jest to jednomian.</li> 
        <li>Liczbę $7$ możemy uznać za wielomian zerowego stopnia: $7x^0$.</li> 
        <li>Liczbę $0$ również możemy uznać za wielomian; jest to szczególny rodzaj wielomianu nazywany <i>wielomianem zerowym</i>. Nie da się okreslić 
        jego stopnia, ponieważ możemy go zapisać jako $0x$ lub $0x^2$ lub $0x^7$...</li> 
        <li>Wyrażenia $\frac{1}{x} = x^{-1}$ lub $\sqrt{x} = x^{\frac{1}{2}}$ <b>nie są</b> wielomianami. W wielomianach dopuszczamy jedynie natualne wykładniki przy zmiennej.</li>
    </ul>

    <p class = "type">
		Intuicje
	</p>

    <p> 
        Jeśli sięgniemy pamięcią do lekcji "Wyrażenia algebraiczne", możemy przypomnieć sobie, że jednomian definiowaliśmy jako iloczyn liczby oraz dowolnych zmiennych literowych, 
        a wielomianem określaliśmy sumę algebraiczną jednomianów. Istotnie, wyrażenie:
    </p>

    $$
        5ab + b^2 - 3c
    $$

    <p> 
        również jest wielomianem, jednak jest to wielomian trzech zmiennych: $a$, $b$, $c$. Wielomiany wielu zmiennych nie będą nas interesować przez dłuższy czas. Zajmiemy się 
        natomiast wielomianami jednej zmiennej - najczęściej naszym celebrytą będzie zmienna $x$. 
    </p>

    <p> 
        No więc o co chodzi z tymi wielomianami? Po pierwsze, chodzi o pewną klasyfikację pojęć matematycznych: równania takie jak
    </p>

    $$
        x^3+6x^2−16x−96 = 0
    $$

    <p> 
        czyli posiadające po jednej stronie wielomian, a po drugiej zero, nazywamy <i>równaniami wielomianowymi</i>. Mówisz matematykowi, że masz problem z równaniem wielomianowym, 
        a on od razu wie, że chodzi o pewną problematyczną sumę niewiadomych podniesionych do jakichś potęg naturalnych, ale nie pojawiają się tam jakieś straszliwe ułamki, 
        pierwiastki, niewiadome w wykładniku lub inne nieboskie stworzenia. Po drugie - i jest to nawet ważniejsze - wielomiany "same w sobie" są ciekawymi tworami matematycznymi, 
        które wykazują kilka nieoczywistych, przyjemnych dla oka własności. Wkrótce przekonamy się, że wielomiany dla algebry są równie podstawowym i istotnym obiektem, co liczby 
        naturalne dla teorii liczb.
    </p>

    <p>
         Ale o tym za chwilę. Na razie wszyscy chcemy zaspokoić ciekawość, jak rozwiązywać równania wielomianowe.
    </p>
	</lesson-chapter>

	<lesson-chapter><template #title>Pozgadujmy rozwiązania</template>
    <p class = "type">
		Intuicje
	</p>

    <p> 
        Przypomnijmy sobie, jak rozwiązywaliśmy równania kwadratowe (które, jak by nie patrzeć, są szczególnym przypadkiem równań wielomanowych). Naszym celem było 
        rozpracowanie trójmianu $ax^2 + bx + c = 0$ do postaci iloczynowej $(x - p)(x - q) = 0$, z której łatwo odczytać rozwiązania równania. Technika ta, mówiąc 
        bardzo z grubsza, będzie podstawą do dowolnych równań wielomianowych: naszym celem będzie <i>rozkład wielomianu na czynniki</i>.
    </p>

    <p> 
        Zajmijmy się równaniem 
    </p>

    $$
        x^3−3x^2−4x+12
    $$

    <p> 
        Składamy pobożne życzenie, by równanie to dało się przedstawić w postaci iloczynowej:
    </p>

    $$
        (x - p)(x - q)(x - r) = 0
    $$

    <p> 
        Czy jest to tak na prawdę możliwe, czy nie - na razie nie wiemy, ale sam tytuł rozdziału mówi, że będziemy tu zgadywać. Gdyby rozkład ten był możliwy, to 
        po rozpisaniu powyższej postaci mielibyśmy:
    </p>

    $$
        (x - p)(x - q)(x - r) = 0 \\
        (x^2 - px - qx + pq)(x - r) = 0\\
        x^3 - px^2 - qx^2 + pqx - rx^2 + prx + qrx - pqr = 0\\
        x^3 - (p + q + r)x^2 + (pq + pr + qr)x - pqr = 0\\
    $$

    <p> 
        Czyli: jeżeli rozkład na czynniki istnieje, to w wielomianie $x^3−3x^2−4x+12$ przy $x^2$ powinno stać $-(p + q + r)$, przy $x$ mamy $(pq + pr + qr)$, a wyrazem wolnym 
        jest $-pqr$. Szczególnie ciekawy jest wyraz wolny: jest to iloczyn rozwiązań $p$, $q$, $r$ (na minusie). Nasza gra w zgadywanie nabiera formy. Jeżeli przypuszczamy, 
        że w rozkładzie na czynniki pojawi się $(x - a)$ (co odpowiada rozwiązaniu o równania $x = a$), to liczba $a$ musi być jednym z czynników liczby $12$. 
    </p>

    <p> 
        No to zgadujemy. Dzielniki liczby $12$ to $\{1, 2, 3, 4, 6, 12\}$ oraz wszystkie liczby do nich przeciwne. 
        Może gdzieś wśród nich jest rozwiązanie? 
    </p> 
    <ul> 
        <li>Sprawdzamy, czy $x = 1$ rozwiązuje równanie: $1^3 - 3\cdot 1^2 - 4\cdot 1 + 12 = 6$. Pudło.</li> 
        <li>Sprawdźmy dwójkę. Dla $x = 2$ mielibyśmy $2^3 - 3\cdot 2^2 - 4 \cdot 2 + 12 = 8 - 12 - 8 + 12 = 0$. Mamy to! $x = 2$ spełnia równanie.</li> 
        <li>Sprawdźmy trójkę. Dla $x = 3$ mielibyśmy $3^3 - 3\cdot3^2 - 4\cdot 3 + 12 = 27 - 27 - 12 + 12 = 0$. To nasz szczęśliwy dzień. $x = 3$ również jest rozwiązaniem</li>
    </ul>
    
    <p> 
        Brakuje jeszcze jednego. Na razie zgadliśmy, że w równości $-pqr = 12$ jedną z liczb powinno być $2$, a drugą $3$, co upraszcza sprawę do $-2\cdot 3 \cdot r = 12$, 
        a stąd mamy $r = -2$. Według naszych koślawych obliczeń, wielomian powinien przedstawiać się w formie: 
    </p>

    $$(x - 2)(x - 3)(x + 2)$$

    <p>
        Sprawdźmy to. Po rozpisaniu takiej postaci iloczynowej:
    </p> 

    $$
        (x - 2)(x - 3)(x + 2) = (x^2 - 5x + 6)(x + 2) = x^3 - 5x^2 + 6x + 2x^2 - 10x + 12 = x^3 - 3x^2 - 4x + 12
    $$

    <p>
        okazuje się, że wyjściowy wielomian w postaci ogólnej i iloczynowej są sobie równe. Rozwiązaliśmy równanie trzeciego stopnia, ale zrobiliśmy to trochę na pałę. 
        Pora wziąć się w garść i opracować porządniejszą metodę.
    </p>
	</lesson-chapter>

	<lesson-chapter><template #title>Dzielenie wielomianów</template>
    <p class = "type">
		Warsztat
	</p>
    
    <p> 
        Usprawnimy opisaną powyżej procedurę. Powiedzmy, że rozwiązując równanie $x^3−13x^2+50x−56 = 0$, odgadliśmy jedno z rozwiązań $x = 2$, mając przypuszczenie, 
        że $(x - 2)$ jest jednym z czynników z rozkładu tego wielomianu. Już w tym momencie możemy dokonać rozkładu tego wielomianu, czyli przedstawić wielomian 
        $x^3−13x^2+50x−56$ w postaci iloczynu $(x - 2)(\dots \dots)$. Czynnik $(\dots \dots)$ będzie pewnym prostszym wyrażeniem, którym będziemy mogli się zająć 
        osobno. To, co pojawi się w miejscu kropek, wyznaczymy stosując metodę <i>dzielenia pisemnego wielomianów</i>. Metoda ta przypomina 
        <router-link tag="a" :to="'/dzielenie#columnar-division'" class="link">pisemne dzielenie liczb naturalnych</router-link>. 
    </p>

    <div class="example">
        <p> 
            Zapisujemy wielomian, który chcemy uprościć, w miejscu dzielnej, a dwumian $(x - 2)$ traktujemy jako dzielnik. Odpowiednikami cyfr z dzielenia liczb naturalnych 
            będą kolejne składniki wielomianów: dzielna składa się z komponent $x^3$, $-13x^2$, $50x$, $-56$, a dzielnik składa się z $x$ oraz $-2$.
            Nad wyrażeniami zapisujemy kreskę i przystępujemy do dzielenia. 
        </p>

        <columnar-operation-table :operation='""' :numbers='[["/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:"], ["x^3", "-13x^2", "+50x", "-56", ":", "x", "-2"]]'></columnar-operation-table>

        <p> 
            Dokonujemy algebraiczego dzielenia "lidera dzielnej" przez "lidera dzielnika", czyli patrzymy na składniki mające $x$ w najwyższych potęgach, tj. $x^3$ w dzielnej 
            oraz $x$ w dzielniku. W wyniku dzielenia otrzymujemy $x^3 : x = x^2$. Zapisujemy to nad kreską jako pierwszy składnik wyniku.
        </p>

        <columnar-operation-table :operation='""' :numbers='[["/u:x^2", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:"], ["x^3", "-13x^2", "+50x", "-56", ":", "x", "-2"]]'></columnar-operation-table>

        <p> 
            Następnie dokonujemy mnożenia tego wyniku przez cały dzielnik: $x^2 \cdot (x - 2) = x^3 - 2x^2$. Otrzymane wyrażenie zapisujemy pod dzielnikiem 
            <b>z odwróconymi znakami</b>.
        </p>

        <columnar-operation-table :operation='""' :numbers='[["/u:\\ \\ x^2", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:"], ["\\ \\ x^3", "-13x^2", "+50x", "-56", ":", "x", "-2"],
        ["-x^3", "+2x^2", "", "", "", "", ""]]'></columnar-operation-table>

        <p> 
            Dodajemy dzielną oraz zapisane wyrażenie (ponieważ zapisaliśmy je na minusie, jest to w istocie odejmowanie).
        </p>

        <columnar-operation-table :operation='""' :numbers='[["/u:\\ \\ x^2", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:"], ["x^3", "-13x^2", "+50x", "-56", ":", "x", "-2"],
        ["/u:-x^3", "/u:+2x^2", "/u:", "/u:", "/u:", "/u:", "/u:"],  ["", "-11x^2", "+50x", "-56", "", "", ""]]'></columnar-operation-table>

        <p> 
            Kontynuujemy proces w ten sam sposób: patrzymy na "lidera" wielomianu $-11x^2+50x-56$ i dzielimy go przez "lidera" dzielnej: $-11x^2 : x = -11x$. Daje 
            to kolejny składnik rozwiązania.
        </p>

        <columnar-operation-table :operation='""' :numbers='[["/u:\\ \\ x^2", "/u:-11x", "/u:", "/u:", "/u:", "/u:", "/u:"], ["\\ \\ x^3", "-13x^2", "+50x", "-56", ":", "x", "-2"],
        ["/u:-x^3", "/u:+2x^2", "/u:", "/u:", "/u:", "/u:", "/u:"],  ["", "-11x^2", "+50x", "-56", "", "", ""]]'></columnar-operation-table>

        <p> 
            Mnożymy otrzymany składnik przez dzielną: $-11x \cdot (x - 2) = -11x^2 + 22x$ i zapisujemy go pod spodem z odwróconymi znakami, po czym sumujemy wielomiany.
        </p>

        <columnar-operation-table :operation='""' :numbers='[["/u:\\ \\ x^2", "/u:-11x", "/u:", "/u:", "/u:", "/u:", "/u:"], ["\\ \\ x^3", "-13x^2", "+50x", "-56", ":", "x", "-2"],
        ["/u:-x^3", "/u:+2x^2", "/u:", "/u:", "/u:", "/u:", "/u:"],  ["", "-11x^2", "+50x", "-56", "", "", ""], ["/u:", "/u:\\ \\ 11x^2", "/u:-22x", "/u:", "/u:", "/u:", "/u:"], 
        ["", "", "\\ \\ 28x", "-56", "", "", ""]]'></columnar-operation-table>

        <p> 
            Dzielimy $28x : x = 28$, zapisujemy wynik nad kreską, mnożymy $28 \cdot (x - 2) = 28x - 56$ i dodajemy to na minusie do obecnego wyrażenia.
        </p>

        <columnar-operation-table :operation='""' :numbers='[["/u:\\ \\ x^2", "/u:-11x", "/u:+28", "/u:", "/u:", "/u:", "/u:"], ["\\ \\ x^3", "-13x^2", "+50x", "-56", ":", "x", "-2"],
        ["/u:-x^3", "/u:+2x^2", "/u:", "/u:", "/u:", "/u:", "/u:"],  ["", "-11x^2", "+50x", "-56", "", "", ""], ["/u:", "/u:\\ \\ 11x^2", "/u:-22x", "/u:", "/u:", "/u:", "/u:"], 
        ["", "", "\\ \\ 28x", "-56", "", "", ""], ["/u:", "/u:", "/u:-28x", "/u:+56", "/u:", "/u:", "/u:"], ["", "", "", "0", "", "", ""]]'></columnar-operation-table>

        <p> 
            Otrzymaliśmy ostatecznie $0$, co oznacza, że dzielenie udało się z powodzeniem wykonać. Uzyskaliśmy algebraiczną odpowiedź: 
        </p>

        $$
            (x^3−13x^2+50x−56) : (x - 2) = x^2 - 11x + 28
        $$

        lub równoważnie

         $$
            x^3−13x^2+50x−56 = (x - 2)(x^2 - 11x + 28)
        $$
    </div>

    <p> 
        Mając za sobą dzielenie przez dwumian $x - 2$, otrzymaliśmy uproszczoną wersję równania:
    </p>

    $$
        x^3−13x^2+50x−56 = 0\\
        (x - 2)(x^2 - 11x + 28) = 0\\
        x - 2 = 0\ \ \ \text{lub}\ \ \ x^2 - 11x + 28 = 0
    $$

    <p> 
        Wystarczy rozwiązać pozostałe równanie kwadratowe (np. za pomocą wzoru na deltę). $x^2 - 11x + 28 = 0$ daje dwa rozwiązania $x = 4$ oraz $x = 7$, co dokańcza 
        rozkład na czynniki: $(x - 2)(x - 4)(x - 7)$ a zarazem kompletuje zbiór rozwiązań oryginalnego równania: $\{2, 4, 7\}$.
    </p>

    <p> 
        Aby lepiej zrozumieć metodę dzielenia wielomianów w słupku, prześledźmy jeszcze jeden przykład.
    </p>

    <div class="example"> 
        <p> 
            Dokonamy dzielenia $6x^4−5x^3+17x^2+15$ przez $3x^2 + 2x + 4$. Zwracamy uwagę, że wykonując dzielenie w słupku, należy zapisać składniki wielomianu 
            malejąco względem wykładników: z przodu muszą być $x$ z najwyższymi potęgami, a z tyłu wyrazy wolne. Żeby utrzymać pewną konsekwencję 
            zapisu, proponujemy dopisać do dzielnej "brakującą" pierwszą potęgę: $0x$.
        </p>

        <columnar-operation-table :operation='""' :numbers='[["/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:"], 
        ["6x^4", "-5x^3", "+17x^2", "+0x", "+15", ":", "3x^2", "+2x", "+4"]]'></columnar-operation-table>

        <p> 
            Lider dzielnej podzielony przez lidera dzielnika daje $6x^4 : 3x^2 = 2x^2$. Zapisujemy ten iloraz w wyniku, dokonujemy mnożenia $2x^2 \cdot (3x^2 + 2x + 4) = 
            6x^4 + 4x^3 + 8x^2$, wynik ten zapisujemy na minusie i dodajemy go do odjemnej.
        </p>

        <columnar-operation-table :operation='""' :numbers='[["/u:\\ \\ 2x^2", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:"], 
        ["\\ \\ 6x^4", "-5x^3", "+17x^2", "+0x", "+15", ":", "3x^2", "+2x", "+4"], ["/u:-6x^4", "/u:-4x^3", "/u:-8x^2", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:"],
        ["", "-9x^3", "+9x^2", "+0x", "+15", "", "", "", ""]]'>
        </columnar-operation-table>

        <p> 
            Dzielimy $-9x^3 : 3x^2 = -3x$ i mnożymy $-3x \cdot (3x^2 + 2x + 4) = -9x^3 - 6x^2 - 12x$.
        </p>

        <columnar-operation-table :operation='""' :numbers='[["/u:\\ \\ 2x^2", "/u:-3x", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:"], 
        ["\\ \\ 6x^4", "-5x^3", "+17x^2", "+0x", "+15", ":", "3x^2", "+2x", "+4"], ["/u:-6x^4", "/u:-4x^3", "/u:-8x^2", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:"],
        ["", "-9x^3", "+9x^2", "+0x", "+15", "", "", "", ""], ["/u:", "/u:\\ \\ 9x^3", "/u:+6x^2", "/u:+12x", "/u:", "/u:", "/u:", "/u:", "/u:"], 
        ["", "", "\\ \\ 15x^2", "+12x", "+15", "", "", "", ""]]'>
        </columnar-operation-table>

        <p> 
            Dzielimy $15x^2 : 3x^2 = 5$ i mnożymy $5 \cdot (3x^2 + 2x + 4) = 15x^2 + 10x + 20$.
        </p>

        <columnar-operation-table :operation='""' :numbers='[["/u:\\ \\ 2x^2", "/u:-3x", "/u:+5", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:"], 
        ["\\ \\ 6x^4", "-5x^3", "+17x^2", "+0x", "+15", ":", "3x^2", "+2x", "+4"], ["/u:-6x^4", "/u:-4x^3", "/u:-8x^2", "/u:", "/u:", "/u:", "/u:", "/u:", "/u:"],
        ["", "-9x^3", "+9x^2", "+0x", "+15", "", "", "", ""], ["/u:", "/u:\\ \\ 9x^3", "/u:+6x^2", "/u:+12x", "/u:", "/u:", "/u:", "/u:", "/u:"], 
        ["", "", "\\ \\ 15x^2", "+12x", "+15", "", "", "", ""], ["/u:", "/u:", "/u:-15x^2", "/u:-10x", "/u:-20", "/u:", "/u:", "/u:", "/u:"],
        ["", "", "", "\\ \\ \\ \\ 2x", "-5", "", "", "", ""]]'>
        </columnar-operation-table>

        <p> 
            Na tym etapie kontynuacja obliczeń byłaby problematyczna. Nie możemy już podzielić $2x - 5$ przez $3x^2 + 2x + 4$, ponieważ $2x - 5$ jest wielomianem 
            o niższym stopniu niż dzielnik. Próbując wyznaczyć w aktualnym kroku stosunek "liderów", otrzymalibyśmy $2x : 3x^2 = \frac{2}{3x}$, jednak wyrażenie takiej 
            postaci nie kwalifikuje się jako składnik wielomianu. Kończymy obliczenia oznajmiając, że $2x - 5$ jest resztą z dzielenia wielomianu 
            $6x^4−5x^3+17x^2+15$ przez wielomian $3x^2 + 2x + 4$.
        </p>
    </div>

    <p> 
        W powyższym przykładzie próba podzielenia $6x^4−5x^3+17x^2+15$ przez $3x^2 + 2x + 4$ zakończyła się jedynie częściowym rozkładem. Stosując zapis, który 
        znamy z dzielenia liczb naturalnych z resztą, możemy oznajmić: 
    </p>

    $$
        (6x^4−5x^3+17x^2+15) : (3x^2 + 2x + 4) = (2x^2 - 3x + 5)\ r.\ (2x - 5)
    $$

    <p> 
        Lub równoważnie (i bardziej elegancko):
    </p>

    $$
        6x^4−5x^3+17x^2+15 = (3x^2 + 2x + 4)(2x^2 - 3x + 5) + 2x - 5
    $$

    <p> 
        Jeżeli po wykonaniu dzielenia pisemnego otrzymujemy resztę (inną niż $0$), to znaczy, że dzielony wielomian nie daje się rozłożyć na czynniki, wśród których 
        znajduje się dzielnik.
    </p>

    <p> 
        Analizując przebieg procedury dzielenia w słupku, możemy dojść do wniosku:
    </p>

    <p class="formula"> 
        Dzieląc wielomian stopnia $n \geq 0$ przez wielomian stopnia $m \geq 0$ otrzymamy wielomian stopnia $n - m$ oraz resztę równą $0$ lub będącą wielomianem 
        stopnia mniejszego od $m$.
    </p>
	</lesson-chapter>

  </lesson>
</template>

<script>
import LessonTitle from "../../../lesson/LessonTitle";
import LessonIntro from "../../../lesson/LessonIntro";
import LessonChapter from "../../../lesson/chapter/LessonChapter";
import Lesson from "../../../lesson/Lesson";
import ColumnarOperationTable from '@/components/utils/columnar_operation_table/ColumnarOperationTable'

export default {
  name: "Wielomiany",
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
    ColumnarOperationTable
  }
};
</script>

<style scoped lang="scss">

</style>
