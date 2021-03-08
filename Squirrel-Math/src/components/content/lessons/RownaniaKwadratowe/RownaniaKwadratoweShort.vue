<template>
  <lesson routeShortVersion="/rownania-kwadratowe-short" routeLongVersion="/rownania-kwadratowe">
    <lesson-title-short>Równania kwadratowe</lesson-title-short>

	<lesson-chapter><template #title>Co to są równania kwadratowe?</template>
    <p> 
      Są to równania postaci
      $$
        ax^2 + bx + c = 0
      $$
      gdzie $a \neq 0$, $b$ i $c$ to liczby rzeczywiste nazywane współczynnikami równania.
    </p>
	</lesson-chapter>

  <lesson-chapter><template #title>Rozwiązywanie przy pomocy wzorów skróconego mnożenia</template>
    <div class="formula">
      <ul>
          <li style="text-align: left">Kwadrat sumy: $(a+b)^2=a^2+2ab+b^2$</li>	
          <li style="text-align: left">Kwadrat różnicy: $(a-b)^2=a^2-2ab+b^2$</li>
          <li style="text-align: left">Różnica kwadratów: $(a-b)(a+b)=a^2-b^2$</li>
      </ul>
    </div>

    <p> 
      Metoda ma na celu sprowadzenie równania do postaci $(x + n)^2 + m = 0$ za pomocą wzoru na kwadrat sumy lub kwadrat różnicy, a następnie do postaci iloczynowej 
      $(x - p)(x - q) = 0$ za pomocą wzoru na różnicę kwadratów.
    </p>

    <div class="example">
        $$
            \begin{align}
            x^2 + 6x - 7 &= 0\\
            x^2 + 2 \cdot 3 \cdot x - 7 &= 0\ \ \ \ \ \ \ \ \ \color{#888888}{|+16}\\
            x^2 + 2 \cdot 3 \cdot x + 9 &= 16\\
            (x + 3)^2 &= 16\\
            (x + 3)^2 - 4^2 &= 0\\
            ((x + 3) - 4)((x + 3) + 4) &= 0\\
            (x - 1)(x + 7) &= 0
            \end{align}
        $$
        <p> 
            Iloczyn jest równy $0$ tylko jeśli jeden z czynników wynosi $0$, zatem $x - 1 = 0$ lub $x + 7 = 0$, co prowadzi do dwóch rozwiązań równania: $x = 1$ oraz $x = -7$.
        </p>
    </div>

    <div class="example">
      $$
          \begin{align}
          3x^2 + 15x + 17 &= 0\ \ \ \ \ \ \ \ \ \color{#888888}{|:3}\\
          x^2 + 5x + \frac{17}{3} &= 0\\
          x^2 + 2 \cdot \frac{5}{2}x + \frac{17}{3} &= 0\\
          x^2 + 2 \cdot \frac{5}{2}x + \left(\frac{5}{2}\right)^2 - \left(\frac{5}{2}\right)^2 + \frac{17}{3} &= 0\\
          \left(x + \frac{5}{2} \right)^2 - \left(\frac{5}{2}\right)^2 + \frac{17}{3} &= 0\\
          \left(x + \frac{5}{2} \right)^2 - \frac{7}{12} &= 0\\
          \left(x + \frac{5}{2} \right)^2 - \left(\frac{\sqrt{21}}{6}\right)^2 &= 0\\
          \left(x + \frac{5}{2} - \frac{\sqrt{21}}{6}\right)\left(x + \frac{5}{2} + \frac{\sqrt{21}}{6}\right) &= 0
          \end{align}
      $$
      <p> 
          Z postaci iloczynowej odczytujemy rozwiązania (uwaga na znaki!) $x = -\frac{5}{2} + \frac{\sqrt{21}}{6}$ oraz $x = -\frac{5}{2} - \frac{\sqrt{21}}{6}$.
      </p>
    </div>
	</lesson-chapter>

  <lesson-chapter><template #title>Rozwiązywanie przy pomocy delty</template>
    <p> 
      Rozwiązanie powyższą metodą równania w postaci ogólnej $ax^2 + bx + c = 0$ prowadzi do rozwiązań:
    </p>

    $$
        x = \frac{-b + \sqrt{b^2 - 4ac}}{2a}\ \ \ \text{lub}\ \ \ x = \frac{-b - \sqrt{b^2 - 4ac}}{2a}
    $$

    <p> 
      Rozwiązania te istnieją tylko pod warunkiem, że wyrażenie $b^2 - 4ac$ pod pierwiastkiem nie jest ujemne, w przeciwnym razie równanie jest sprzeczne. 
      Wartość $b^2 - 4ac$ oznaczamy symbolem $\Delta$ i nazywamy deltą równania kwadratowego.
    </p>

    <p class="formula">
    $$
        \Delta = b^2 - 4ac
    $$
    $$
        x = \frac{-b \pm \sqrt{\Delta}}{2a}
    $$
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
        $$2x^2 + x - 6 = 0$$
        Współczynniki tego równania to $a = 2$, $b = 1$, $c = -6$.
        $$\Delta = b^2 - 4ac = 1 - 4 \cdot 2 \cdot (-6) = 49$$
        Skoro $\Delta > 0$, obliczamy $\sqrt{\Delta} = 7$ i znajdujemy dwa rozwiązania:
        $x = \frac{-1 - 7}{2\cdot 2} = -2$ oraz $x = \frac{-1 + 7}{2 \cdot 2} = \frac{2}{3}$
    </div>

	</lesson-chapter>

  <lesson-chapter><template #title>Rozwiązywanie równań w pamięci</template>
    <p> 
      Jeśli rozwiązaniami równania są liczby wymierne, a jego współczynniki to niewielkie liczby całkowite, warto podjąć się rozwiązania równania 
      w pamięci, przez zgadnięcie rozwiązań. W przypadku równań bez współczynnika przy $x^2$, tj. $x^2 + bx + c$, zgadywane rozwiązania muszą spełniać warunek: 
      ich iloczyn ma wynosić $c$, zaś suma $-b$.
    </p>
    <div class="example">
        $$x^2 - 9x + 20 = 0$$
        Równanie spełniają $x = 4$ i $x = 5$, (ponieważ $4 \cdot 5 = 20$ oraz $4 + 5 = 9$), co łatwo sprawdzić, zapisując postać iloczynową:
        $$
          (x - 4)(x - 5) = 0\\
          x^2 - 4x - 5x + 4\cdot 5 = 0\\
          x^2 - 9x + 20 = 0
        $$
    </div>
    <div class="example">
        $$x^2 + x - 12 = 0$$
        Suma ma wynosić $-1$, a iloczyn $-12$, czyli rozwiązania muszą być przeciwnych znaków. Odgadujemy $x = -4$ i $x = 3$. Łatwo sprawdzić słuszność tych rozwiązań, 
        rozpisując postać iloczynową:
        $$(x + 4)(x - 3) = 0$$
    </div>
    <div class="example">
        $$x^2 + 9x + 8 = 0$$
        Suma: $-9$, iloczyn: $8$. Dodatni iloczyn i ujemna suma oznaczają, że obydwa rozwiązania muszą być ujemne: $x = -8$ i $x = -1$.
        $$(x + 8)(x + 1)$$
    </div>
    <p> 
      W przypadku równań ze współczynnikiem przy $x^2$, tj. $ax^2 + bx + c$w, zgadywane rozwiązania będą ułamkami $\frac{n}{m}$ oraz $\frac{p}{q}$ spełniającymi warunki: 
      $np = a$, $mq = c$, $nq + mp = -b$.
    </p>
    <div class="example">
        $$
            5x^2 - 13x + 6 = 0
        $$
        Iloczyn mianowników musi wynosić $5$, a iloczyn liczników $6$, ponadto liczniki pomnożone przez sąsiednie mianowniki mają dać w sumie $13$. Sumę tę można osiągnąć 
        poprzez $13 = 1 \cdot 3 + 5 \cdot 2$, co prowadzi do rozwiązań $x = \frac{3}{5}$ oraz $x = \frac{2}{1}$.
    </div>
    <div class="example">
        $$
            6x^2 - x - 35 = 0
        $$
        Znaki sugerują, że jedno z rozwiązań musi być ujemne, a drugie dodatnie. Rozkładamy $1 = 3 \cdot 5 - 2 \cdot 7$, co daje ułamkowe rozwiązania $x = \frac{5}{2}$ oraz $x = -\frac{7}{3}$ (minus dotyczy 
        $\frac{7}{3}$, ponieważ w odgadniętej różnicy licznik $7$ jest na minusie).
        $$(2x - 5)(3x + 7) = 0$$
    </div>

    <p> 
      Możesz przećwiczyć tę metodę poniżej:
    </p>

    <simple-quadratic-equations-training></simple-quadratic-equations-training>

	</lesson-chapter>

  <lesson-chapter><template #title>Nowe pojęcia</template>
    <p> 
      <b>Postać ogólna równania kwadratowego</b> to $ax^2 + bx + c,\ \ \ a \in \mathbb{R} \setminus \{0\},\ b \in \mathbb{R},\ c \in \mathbb{R}$. Liczby $a, b, c$ nazywane są 
      <b>współczynnikami</b>, a współczynnik $c$ określamy <b>wyrazem wolnym</b>.<br>
      <b>Postać kanoniczna równania kwadratowego</b> to $(x + n)^2 + m = 0,\ \ \ n \in \mathbb{R},\ m \in \mathbb{R}$.<br>
      <b>Postać iloczynowa równania kwadratowego</b> to $(x + p)(x + q) = 0,\ \ \ p \in \mathbb{R},\ q \in \mathbb{R}$. Z postaci tej łatwo odczytać rozwiązania równania
      $x = -p$ lub $x = -q$. Jeżeli $p = q$, rozwiązanie $x = -p$ nazywamy <b>rozwiązaniem podwójnym</b>.
    </p>

    <p> 
      <b>Delta równania kwadratowego</b> o postaci ogólnej $ax^2 + bx + c$ to liczba $b^2 - 4ac$. Jej znak określa liczbę rozwiązań równania. 
    </p>

    <p> 
      <b>Wzory Viete'a</b> ukazują zależność sumy oraz iloczynu rozwiązań $x_1$, $x_2$ równania kwadratowego od jego współczynników: $x_1 + x_2 = -\frac{b}{a}$, $x_1x_2 = \frac{c}{a}$. 
      Spostrzeżenia te stanowią podstawę do opisanej metody rozwiązywania równań kwadratowych w pamięci.
    </p>
	</lesson-chapter>

  </lesson>
</template>

<script>
import LessonTitleShort from "../../../lesson/LessonTitleShort";
import LessonIntro from "../../../lesson/LessonIntro";
import LessonChapter from "../../../lesson/chapter/LessonChapter";
import Lesson from "../../../lesson/Lesson.vue";
import SimpleQuadraticEquationsTraining from './SimpleQuadraticEquationsTraining'

export default {
  name: "RownaniaKwadratoweShort",
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
    SimpleQuadraticEquationsTraining
  }
};
</script>

<style scoped lang="scss">

</style>
