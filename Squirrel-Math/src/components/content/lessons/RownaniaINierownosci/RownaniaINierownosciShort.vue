<template>
  <lesson routeShortVersion="/rownania-i-nierownosci-short" routeLongVersion="/rownania-i-nierownosci">
    <lesson-title-short>Równania i nierówności</lesson-title-short>

    <lesson-chapter><template #title>Czym są równania</template>
    <p>
      Równania to problemy algebraiczne polegające na znalezieniu pewnej wartości niewiadomej. Równanie składa się z dwóch połączonych znakiem równości 
      wyrażeń algebraicznych zawierających literowe oznaczenie zmiennej. Równanie 
      $$40 + x = 120$$
      zawiera niewiadomą oznaczoną literą $x$. Jego <i>rozwiązaniem</i> jest $80$, ponieważ wstawiając liczbę $80$ w miejsce wystąpienia $x$, otrzymamy poprawne działanie: $40 + 80 = 120$.
      Niewiadomą można traktować jak okienko, w które należy wstawić taką wartość liczbową, by otrzymać poprawną równość. 
    </p>

    <ul> 
      <li>Rozwiązaniem równania $3x + 4 = 25$ jest $x = 7$, ponieważ $3 \cdot 7 + 4 = 25$.</li>
      <li>Równanie $x \cdot x = 9$ ma dwa rozwiązania: $3$ oraz $-3$, ponieważ $3\cdot3 = 9$ jak również $(-3)\cdot(-3)=9$.</li>
      <li>Równanie $(x - 3) \cdot (x  + 2) \cdot (x - 5) = 0$ spełnia każda z liczb: $3$, $-2$, $5$.</li>
      <li>Równanie $x + 6 = 4x$ spełnia liczba $x = 2$, ponieważ $2 + 6 = 4\cdot2$.</li>
      <li>Równania $|x - 5| = -2$ nie spełnia żadna liczba.</li>
      <li>Równanie $2x + 3x = 5x$ spełnia każda liczba.</li>
    </ul>
    
    <p>
      Istnieje wiele metod na rozwiązywanie równań, zależnie od tego, jakiego typu są to równania. Różne rodzaje równań i metody ich rozwiązywania pojawią się w nadchodzących lekcjach.
    </p>
    </lesson-chapter>

    <lesson-chapter><template #title>Czym są nierówości</template>
    <p> 
      Nierówności to problemy przypominające równania, jednak zamiast znaku $=$ występują operatory porównywania: $\lt$ (mniejsze niż), $\gt$ (większe niż), 
      $\leq$ (mniejsze lub równe), $\geq$ (większe lub równe). Nierówności 
      posiadają przeważnie nieskończenie wiele rozwiązań, na przykład nierówność $x \lt 5$ stanowi kryterium wyznaczające liczby o wartości mniejszej niż $5$. Rozwiązania 
      tej nierówności to między innymi $4$, $0$, $-10$, $4.999$. Przykładem bardziej skomplikowanej nierówności jest 
      $$3x + 2 \lt x + 8$$
      Rozwiązanie nierówności będzie polegało na wskazaniu jej <i>zbioru rozwiązań</i>. Na obecnym etapie 
      nierówność uznamy za rozwiązaną, gdy zostanie uproszczona do postaci $x \geq 2$, $x \lt -10$, $x \leq \frac{5}{2}$ lub podobnej.
    </p>
    </lesson-chapter>

    <lesson-chapter><template #title>Podstawowe techniki rozwiązywania równań</template>
    <p>
      Na równaniach można dokonywać przekształceń, które nie zmieniają istoty tego równania, ale ułatwiają znalezienie rozwiązania. Wolno dokonywać
      obustronnego dodawania, odejmowania oraz mnożenia i dzielenia stron równości przez tą samą liczbę. 
    </p>

    <div class="example">
      Aby rozwiązać równanie $2x + 10 = 5x + 1$, odejmujemy od obydwu stron $2x$ oraz $1$, a następnie dzielimy obie strony przez $3$.
      $$\begin{align} 2x + 10 &= 5x + 1 &\color{#888888}{| -2x}\\
      10 &= 3x + 1 &\color{#888888}{| -1}\\
      9 &= 3x &\color{#888888}{| :3}\\
      3 &= x
      \end{align}$$

      <center><img src="./.images/Screenshot_7.png" align="middle"></center>
      <center><img src="./.images/Screenshot_8.png" align="middle"></center>
      <center><img src="./.images/Screenshot_9.png" align="middle"></center>
      <center><img src="./.images/Screenshot_10.png" align="middle"></center>
    </div>

    <div class="example">
      Aby rozwiązać równanie $\frac{1}{2}x - 3 = 1$, dodajemy obustronnie $3$ i mnożymy przez $2$:
      $$\begin{align} \frac{1}{2}x - 3 &= 1 &\color{#888888}{| +3}\\
      \frac{1}{2}x &= 4 &\color{#888888}{| \cdot 2}\\
      x &= 8
      \end{align}$$
    </div>
    </lesson-chapter>

    <lesson-chapter><template #title>Podstawowe techniki rozwiązywania nierówności</template>
    <p> 
      Techniki opisane w powyższej sekcji działają także dla nierówności, z jednym istotnym zastrzeżeniem: podczas dzielenia lub mnożenia obu stron nierówności 
      przez liczbę ujemną, należy dokonać odwrócenia znaku nierówności. Na przykład nierówność $x \lt 4$ po pomnożeniu przez $-1$ powinna przyjąć postać $-x \gt -4$.
    </p>

    <div class="example">
        Aby uprościć nierówność $3x + 2 \lt x + 8$, odejmujemy od obu jej stron $x$ oraz $2$ i dzielimy przez $2$ (nie zmieniając znaku nierówności).
        $$\begin{align} 
        3x + 2 &\lt x + 8\ \ \ \ \ \ \ \ \color{#888888}{| -x}\\
        2x + 2 &\lt 8\ \ \ \ \ \ \ \ \ \ \ \ \ \ \color{#888888}{| -2}\\
        2x &\lt 6\ \ \ \ \ \ \ \ \ \ \ \ \ \  \color{#888888}{| :2}\\
        x &\lt 3
        \end{align}$$
    </div>

    <div class="example">
      Aby uprościć nierówność $-4x - 3 \leq 9$, dodajemy obustronnie $3$ i dzielimy przez $-4$, odwracając znak nierówności.
      $$\begin{align} -4x - 3 &\leq 9\ \ \ \ \ \ \ \ \color{#888888}{| +3}\\
      -4x &\leq 12\ \ \ \ \ \ \color{#888888}{| :(-4)}\\
      x &\geq -3
      \end{align}$$
    </div>
    </lesson-chapter>

    <lesson-chapter><template #title>Nowe pojęcia</template>
    <p>
      <b>Niewiadoma</b> to nieznana wartość liczbowa, której obliczenie jest celem rozwiązywania równań i nierówności. Oznaczana jest pewną literą, zwyczajowo $x$, która 
      pojawia się w wyrażeniach algebraicznych po obu stronach znaku równości lub nierówności.<br>
      <b>Rozwiązanie równania (pierwiastek równania)</b> to wartość liczbowa, która, wstawiona w miejsce występowania niewiadomej, tworzy poprawnie zapisaną równość. Mówimy, że 
      liczby będące rozwiązaniem równania <b>spełniają</b> to równanie.
    </p>

    <p>
      <b>Dziedzinę równania/nierówności</b> stanowią wszystkie liczby, które "potencjalnie" mogą stanowić rozwiązanie. Z dziedziny wyklucza się takie wartości, które 
      wstawione w miejsce $x$ utworzyłyby wyrażenia niezdefiniowane. Na przykład dziedziną równania $\frac{2}{x} = 4$ są wszystkie liczby oprócz $0$, ponieważ dzielenie przez
      $0$ jest niedozwolone.
    </p>

    <p>
      <b>Równanie sprzeczne</b> to równanie, którego nie spełnia żadna liczba z dziedziny, np. $x \cdot x = -4$. Analogiczne znaczenie ma <b>nierówność sprzeczna</b><br>
      <b>Równanie tożsamościowe</b> to równanie, które spełnia każda liczba z dziedziny, np. $\frac{x}{x} = 1$ Analogiczne znaczenie ma <b>nierówność tożsamościowa</b>.
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
  name: "RownaniaINierownosciShort",
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
