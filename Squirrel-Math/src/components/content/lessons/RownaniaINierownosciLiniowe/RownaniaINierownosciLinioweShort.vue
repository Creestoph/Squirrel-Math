<template>
  <lesson>
    <lesson-title-short>Równania i nierówności liniowe</lesson-title-short>

    <lesson-chapter><template #title>Rozwiązywanie równań liniowych</template>
    <p>
        Równania liniowe to takie równania, w których niewiadoma nie pojawia się w potędze, pod pierwiastkiem, w mianowniku lub 
        w innym nietypowym zastosowaniu. Równania (i nierówności) liniowe składają się jedynie ze znaków dodawania, odejmowania i 
        mnożenia (jak w poniższych przykładach). Formalnie: równania liniowe to równania, które da się sprowadzić do postaci 
        $ax + b = 0$, gdzie $a \in \mathbb{R} \setminus \{0\}, b \in \mathbb{R}$.
    </p>

    <p>
        Aby rozwiązać równanie liniowe, należy:
    </p>

    <ol> 
        <li>Wymnożyć wszystkie nawiasy, żeby uprościć obie strony równań do postaci sum algebraicznych.</li>
        <li>Sprowadzić równanie do najprostszej postaci przez redukcję wyrazów podobnych.</li>
        <li>Dodać/odjąć obustronnie iksy i wartości liczbowe w taki sposób, żeby po jednej stronie równania znalazły się same iksy, a po drugiej 
            pewna wartość liczbowa.</li>
        <li>Podzielić równanie obustronnie, by wyliczyć wartość $x$.</li>
    </ol>

    <div class="example">
        $$
        \begin{align}
        x + 2x - 4(x + 7) + 10 &= 2(x - 3(5x - 6))\\
        x + 2x - 4x - 28 + 10 &= 2(x - 15x + 18)\\
        x + 2x - 4x - 28 + 10 &= 2x - 30x + 36\\
        -x - 18 &= -28x + \\
        -x - 18 &= -28x + 36 \ \ \ \color{#888888}{| +28x}\\
        27x - 18 &= 36 \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \color{#888888}{| +18}\\
        27x &= 54\\
        27x &= 54 \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \color{#888888}{| :27}\\
        x &= 2
        \end{align}
        $$
    </div>

    <div class="example"> 
        $$\begin{align}
            x &= \frac{1}{6}x + \frac{1}{12}x + \frac{1}{7}x + 5 + \frac{1}{2}x + 4\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \color{#888888}{| \cdot 84}\\
            84x &= \frac{84}{6}x + \frac{84}{12}x + \frac{84}{7}x + 84 \cdot 5 + \frac{84}{2}x + 84\cdot4\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \\
            84x &= 14x + 7x + 12x + 420 + 42x + 336\\
            84x &= 75x + 756\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \color{#888888}{| -75x}\\
            9x &= 756\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \color{#888888}{| :9}\\
            x &= 84
        \end{align}$$
    </div>
    </lesson-chapter>

    <lesson-chapter><template #title>Rozwiązywanie nierówności liniowych</template>
    <p>
        Proces rozwiązywania nierówności odbywa się analogicznie, należy jednak uważać, by przy obustronnym mnożeniu/dzieleniu 
        przez liczbę ujemną dokonać odwrócenia znaku nierówności. Jako rozwiązanie nierówności podajemy zbiór rozwiązań, na przykład 
        przedział liczb, które spełniają warunek nierówności.
    </p>

    <div class="example"> 
        $$\begin{align}
        3x - 7 &\gt x \ \ \ \ \ \ \ \ \ \ \color{#888888}{|-3x}\\
        -7 &\gt -2x \ \ \ \ \ \color{#888888}{|:(-2)}\\
        \frac{7}{2} &\lt x\\
        x &\in \left(3\frac{1}{2}, \infty \right)
        \end{align}
        $$
	    <center><img src="./.images/Screenshot_3.png" align="middle"></center>
    </div>

    <div class="example">
        $$\begin{align} 
        2x + \frac{1}{2} \cdot 10 &\lt 20\\
        2x + 5 &\lt 20\\
        2x &\lt 15\\
        x &\lt 7,5\\
        x &\in (-\infty, 7.5) 
        \end{align}$$
	    <center><img src="./.images/Screenshot_15.png" align="middle"></center>
    </div>
    </lesson-chapter>

    <lesson-chapter><template #title>Proporcje</template>
    <p>
        Proporcja to inaczej stosunek (iloraz) dwóch wartości. O proporcji mówimy zazwyczaj, gdy chcemy zwrócić uwagę, 
        że pewna wartość jest ileś razy większa od drugiej i zależność ta jest w pewnym sensie niezmienna, stabilna. Na przykład 
        ciasto do pizzy można wytworzyć, mieszając mąkę i wodę w proporcjach $2 : 1$, czyli należy zużyć dwa razy więcej mąki niż wody,
        zaś dokładną ilość tych składników można ustalić dowolnie, dostosowując ilość otrzymanego ciasta. 
    </p>

    <p>
        Na bazie tego typu scenariuszy powstają problemy mające naturę równań z proporcjami. Są to równania, w których 
        niewiadoma występuje w licznikach oraz mianownikach ułamków. Aby rozwiązać tego typu równania, należy dokonać 
        obustronnego mnożenia przez każdy z mianowników.
    </p>

    <div class="example">
        $$\begin{align}
        \frac{6x + 5}{42x} &= \frac{x + 1}{7x + 1}\ \ \ \ \ \ \ \ \ \ \ \ \ \color{#888888}{|\cdot 42x}\\
        6x + 5 &= \frac{x + 1}{7x + 1}\cdot 42x\ \ \ \ \ \color{#888888}{|\cdot (7x + 1)}\\
        (6x + 5)(7x + 1) &= (x + 1)42x\\
        42x^2 + 6x + 35x + 5 &= 42x^2 + 42x\\
        42x^2 + 41x + 5 &= 42x^2 + 42x\\
        41x + 5 &= 42x\\
        5 &= x
        \end{align}$$
    </div>
    </lesson-chapter>

    <lesson-chapter><template #title>Równania z wartością bezwzględną</template>
    <p>
        Równania tego typu to podchwytliwa wersja równań liniowych. Przypomnijmy, jak definiuje się wartość bezwzględną: dla 
        dowolnej liczby $x \in \mathbb{R}$ jej wartość bezwzględna wynosi
        $$|x| = \Bigl\{ \begin{matrix} x \ \ \ \ \text{ jeśli } x \geq 0 \\ -x \ \ \ \text{ jeśli } x \lt 0 \end{matrix}$$
    </p>
    <div class="example">
        Równanie
        $$|x| = 5$$
        ma dwa rozwiązania: $x = 5$ oraz $x = -5$. Dla każdej z tych liczb wartość bezwzględna wynosi $5$.
    </div>
    <div class="example">
        $$|2x - 3| = 5$$
        Jeśli wewnątrz wartości bezwzględnej znajduje się liczba dodatnia, mamy $2x - 3 = 5$, co prowadzi do rozwiązania $x = 4$.
        Jeśli wewnątrz wartośc bezwzględnej znajduje się liczba ujemna, mamy $-(2x - 3) = 5$ (lub równoważnie $2x - 3 = -5$), co daje 
        drugie rozwiązanie $x = -1$.
    </div>
    <div class="example">
        $$|x + 2| + |x - 3| = 7$$
        Rozważamy trzy przypadki:
        <ol>
            <li>
                Przypuśćmy, że rozwiązanie jest mniejsze od $-2$, czyli $x \in (-\infty, -2)$. Wówczas liczby $x + 2$ 
                oraz $x - 3$ są ujemne, więc $|x + 2| = -(x + 2)$ oraz $|x - 3| = -(x - 3)$. Równanie upraszcza się do postaci
                $$\begin{align}
                -(x + 2) - (x - 3) &= 7\\
                -x - 2 - x + 3 &= 7\\
                -2x + 1 &= 7\\
                x &= -3
                \end{align}$$
            </li>
            <li>
                Przypuśćmy, że $x \in [-2, 3)$. Wówczas $x + 2$ ma wartość nieujemną (wartość bezwzględna znika bez 
                zmiany znaku), a $x - 3$ ujemną (wartość bezwzględna znika ze zmianą znaku).
                $$\begin{align}
                x + 2 - (x - 3) &= 7\\
                x + 2 - x + 3 &= 7\\
                5 &= 7
                \end{align}$$
                Równanie jest sprzeczne, czyli na przedziale $[-2, 3)$ nie ma rozwiązań.
            </li>
            <li>
                Jeśli $x \in [3, \infty)$, obydwa wyrażenia są dodatnie i wartości bezwzględne można opuścić (bez zmiany znaku)
                $$\begin{align}
                x + 2 + x - 3 &= 7\\
                2x - 1 &= 7\\
                x &= 4
                \end{align}$$
            </li>
        </ol>
        Równanie ma dwa rozwiązania: $x = -3$ oraz $x = 4$.
    </div>
    <div class="example">
        $$|x - 2| \leq 4$$
        Dla dowolnych liczb $a, b$ wartość bezwzględna z ich różnicy $|a - b|$ możemy rozumieć jako ich odległość na osi liczbowej.
        Powyższej nierówności odpowiada pytanie: jaka liczba jest odległa od $2$ o $4$ lub mniej? Rozwiązanie stanowi przedział 
        $x \in [-2, 6]$
        <center><img src="./.images/Screenshot_13.png" align="middle"></center>
    </div>
     <div class="example">
        $$|x + 3| > 2$$
        W równoważnej postaci: $|x - (-3)| > 2$. Nierówność będą spełniały liczby odległe od $-3$ o ponad $2$, czyli $x \in (-\infty, -5) \cup (-1, \infty)$
        <center><img src="./.images/Screenshot_14.png" align="middle"></center>
    </div>
    </lesson-chapter>

    <lesson-chapter><template #title>Nowe pojęcia</template>
    <p>
        <b>Stosunek liczb</b> to inaczej ich iloraz.<br>
        Mówimy, że jedna wartość jest <b>wprost proporcjonalna</b> do drugiej, jeśli $n$-krotnemu wzrostowi jednej liczby 
        toważyszy $n$-krotny wzrost drugiej (ich stosunek jest stały); na przykład waga wody i jej objętość.<br>
        Jeśli wartość jest <b>odwrotnie proporcjonalna</b> do drugiej, to $n$-krotnemu wzrostowi jednej odpowiada $n$-krotny 
        spadek drugiej (ich iloczyn jest stały); na przykład liczba osób, którym rozdany zostanie zapas ryżu i wielkość porcji 
        dla każdej z nich.<br>
        <b>Współczynnik proporcjonalności</b> dla wartości wprost proporcjonalnych to ich stały stosunek. Dla wartości odwrotnie 
        proporcjonalnych to ich stały iloczyn.
    </p>

    </lesson-chapter>

  </lesson>
</template>

<script>
import LessonTitleShort from "../../../lesson/LessonTitleShort";
import LessonIntro from "../../../lesson/LessonIntro";
import LessonChapter from "../../../lesson/chapter/LessonChapter";
import Lesson from "../../../lesson/Lesson";

export default {
  name: "RownaniaINierownosciLinioweShort",
  data() {
    return {
      chapters: []
    };
  },
  components: {
    LessonIntro,
    LessonTitleShort,
    LessonChapter,
    Lesson,
  }
};
</script>

<style scoped>
</style>
