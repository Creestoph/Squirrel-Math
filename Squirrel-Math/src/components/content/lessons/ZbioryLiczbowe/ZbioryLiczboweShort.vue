<template>
  <lesson>
    <lesson-title-short>Zbiory liczbowe</lesson-title-short>

    <lesson-chapter><template #title>Zapis zbioru</template>
    <p> 
      Zbiór jest <i>pojęciem pierwotnym</i> matematyki, co znaczy, że nie ma formalnej definicji. Zbiór to po prostu kolekcja elementów, worek do którego wrzucane są rozmaite 
      obiekty. Zbiory zapisuje się za pomocą nawiasów klamrowych, wewnątrz których wypisane są po przecinku wszystie jego elementy. Gdy chcemy opatrzyć zbiór oznaczeniem literowym, 
      stosujemy dużą literę - dla odróżnienia od zmiennych liczbowych opisywanych małymi literami, na przykład $A = \{12, 43, 5, 10, 33\}$. Aby określić przynależność elmentu
      do zbioru, stosuje się symbol $\in$, zapis $10 \in A$ czytamy "$10$ jest elementem zbioru $A$".
    </p>

    <p>
      Zbiór nie jest uporządkowany, co oznacza, że jego elementy można wypisywać w dowolnej kolejności: $\{12, 43, 5, 10, 33\} = \{43, 5, 33, 12, 10\}$.
    </p>

    <p>
      Wszystkie elementy zbioru są unikalne - zbiór nie może zawierać duplikatów. Zapis $\{5, 2, 3, 3\}$ nie ma sensu - trójka może należeć do zbioru lub do niego nie należeć, 
      ale nie może należeć dwukrotnie.
    </p>
    </lesson-chapter>

    <lesson-chapter><template #title>Podzbiór</template>
    <p>
      Wybierając dowolną ilość elementów pewnego zbioru, tworzymy jego podzbiór. 
    </p>

    <ul>
      <li>Zbiór $\{5, 9, 1\}$ jest podzbiorem zbioru $\{ 4, 5, 2, 9, 12, 31, 1 \}$, co zapisujemy $\{5, 9, 1\} \subseteq \{ 4, 5, 2, 9, 12, 31, 1 \}$.</li>
      <li>Nie wybierając żadnego elementu wyjściowego zbioru, dostajemy <i>zbiór pusty</i> oznaczany symbolem $\emptyset$. Zbiór pusty jest podzbiorem dowolnego zbioru.</li>
      <li>Możemy także wybrać wszystkie elementy tego zbioru: $\{ 4, 5, 2, 9, 12, 31, 1 \} \subseteq \{ 4, 5, 2, 9, 12, 31, 1 \}$.
        Podzbiór, który <b>nie</b> składa się ze wszystkich 
        elementów rodzica, to <i>podzbiór właściwy</i>. Możemy zapisać $\{5, 9, 1\} \subset \{ 4, 5, 2, 9, 12, 31, 1 \}$ lub równoważnie 
        $\{5, 9, 1\} \subsetneq \{ 4, 5, 2, 9, 12, 31, 1 \}$.
      </li>
    </ul>

    <p>
      Zbiór wszystkich podzbiorów zbioru $A$ to jego <i>zbiór potęgowy</i> oznaczany $\mathcal{P}(A)$.
    </p>

    $$\mathcal{P}\bigl(\{1, 2, 3\}\bigr) = \bigl\{ \emptyset, \{1\}, \{2\}, \{3\}, \{1, 2\}, \{1, 3\}, \{2, 3\}, \{1, 2, 3\} \bigr\}$$
    </lesson-chapter>

    <lesson-chapter><template #title>Działania na zbiorach</template>
    <p>
      <i>Przekrój zbiorów</i> $A$ i $B$ to zbiór wszystkich elementów znajdujących się w zbiorze $A$ oraz w zbiorze $B$, symbolicznie: $A \cap B$. 
      $$\{1, 2, 3\} \cap \{2, 3, 4, 5\} = \{2, 3\}$$
    </p>

	  <center><img src="./.images/Screenshot_19.png" align="middle"></center>

    <p>
      <i>Suma zbiorów</i> $A$ i $B$ to zbiór wszystkich elementów znajdujących się w zbiorze $A$ wraz ze wszystkimi elementami zbioru $B$ (jeśli jakiś element 
      pojawia się dwukrotnie, umiejszczamy go w sumie tylko raz); symbolicznie: $A \cup B$.
      $$\{1, 2, 3\} \cup \{2, 3, 4, 5\} = \{1, 2, 3, 4, 5\}$$     
    </p>
	  <center><img src="./.images/Screenshot_20.png" align="middle"></center>

    <p>
      <i>Różnica zbiorów</i> $A$ i $B$ to zbiór wszystkich elementów $A$ oprócz tych, które znajdują się w $B$, symbolicznie: $A \setminus B$.
      $$\{1, 2, 3\} \setminus \{2, 3, 4, 5\} = \{1\}$$     
    </p>
	  <center><img src="./.images/Screenshot_21.png" align="middle"></center>

    <p>
      <i>Dopełnienie zbioru</i> $A$ to zbiór wszystkich elementów, które nie mieszczą się w zbiorze $A$, symbolicznie: $A'$. Aby wyznaczać dopełnienie zbioru, należy 
      najpierw zdefiniować <i>uniwersum</i>, czyli nadzbiór, który składa się ze wszystkich możliwych elementów, które mają sens w danym kontekście. Jeśli 
      w ramach obecnych tu przykładów uniwersum stanowią liczby naturalne, to:
    </p>
    $$\{1, 2, 3\}' = \{0, 4, 5, 6, 7, 8, 9, ...\}$$     
	  <center><img src="./.images/Screenshot_22.png" align="middle"></center>
    </lesson-chapter>

    <lesson-chapter><template #title>Rodzaje liczb</template>
    <p>
      Przypomnijmy i zbierzmy informacje dotyczące nazewnictwa różnych rodzajów liczb.
    </p>

    <p>
      <b>Liczby naturalne</b> służą do zliczania, ile obiektów widzimy. Zbiór liczb naturalnych będziemy oznaczać literą $\mathbb{N}$.
    </p>
    $$\mathbb{N} = \{0, 1, 2, 3, 4, 5, 6, ...\}$$

  	<center><img src="./.images/Screenshot_9.png" align="middle"></center>

    <p>
      <b>Liczby całkowite</b> to liczby naturalne wraz z liczbami do nich przeciwnymi. Zbiór liczb całkowitych będziemy oznaczać $\mathbb{Z}$.
    </p>
    $$\mathbb{Z} = \{ ..., -4, -3, -2, -1, 0, 1, 2, 3, 4, ...\}$$
	  <center><img src="./.images/Screenshot_10.png" align="middle"></center>

    <p>
      <b>Liczby wymierne</b> stanowią ułamki postaci $\frac{p}{q}$, gdzie $p$ i $q$ to liczby całkowite. Ich zbiór będziemy oznaczać $\mathbb{Q}$.
    </p>
    $$\mathbb{Q} = \bigl\{0, 1, \frac{1}{2}, -\frac{1}{3}, -7, \frac{5}{7}, -3.14, ...\bigr\}$$
	  <center><img src="./.images/Screenshot_11.png" align="middle"></center>

    <p>
      <b>Liczby niewymierne</b> to liczby, których nie da się zapisać w postaci ułamka zwykłego $\frac{p}{q}$. Mają nieskończone rozwinięcie dziesiętne, które nie posiada okresu. 
      Przykładowymi liczbami niewymiernymi jest większość pierwiastków liczb naturalnych. Symbolicznie zbiór liczb niewymiernych oznaczamy po prostu jako dopełnienie 
      zbioru liczb wymiernych: $\mathbb{Q}'$.
    </p>
    $$\mathbb{Q}' = \bigl\{\sqrt{2}, \sqrt{3}, 0.12345678910111213..., 1.101001000100001...,  ...\bigr\}$$
	  <center><img src="./.images/Screenshot_12.png" align="middle"></center>

    <p>
      Liczby rzeczywiste: $\mathbb{R}$ to liczby wymierne wraz z niewymiernymi. Są to właściwie wszystkie liczby, które można zaobserwować w prawdziwym świecie.
    </p>
    $$\mathbb{R} = \{0, 51.45, 1.101001000100001..., 0.(2), -5, \sqrt{3}, 3.1415926535..., ...\}$$
	  <center><img src="./.images/Screenshot_13.png" align="middle"></center>

    <p>
      Symbole powyższych zbiorów z plusem lub minusem w indeksie dolnym będą oznaczać ich obcięcie do elementów dodatnich lub 
      ujemnych, na przykład $\mathbb{R}_+$ będzie oznaczać zbiór liczb rzeczywistych dodatnich.
    </p>

    </lesson-chapter>

    <lesson-chapter><template #title>Przedziały liczbowe</template>
    <p>
      Zakres liczb od jednej wartości do drugiej to przedział liczbowy.
    </p>

    <ul>
      <li>$[2, 5]$ to przykład przedziału <i>obustronnie domkniętego</i>, składa się z liczb od $2$ do $5$ wraz z $2$ i $5$.</li>
      <li>$(-4, 1)$ to przykład przedziału <i>obustronnie otwartego</i>, składa się z liczb od $-4$ do $1$ bez $-4$ i $1$.</li>
      <li>$[-6, 4)$ to przedział <i>lewostronnie domknięty</i>, a $(0, 3]$ jest <i>prawostronnie domknięty</i>.</li>
      <li>$[2, \infty)$ składa się ze wszystkich liczb o wartości dwa lub większej ($\infty$ to symbol nieskończoności).</li>
      <li>$(-\infty, 4)$ składa się ze wszystkich liczb o mniejszych niż $4$.</li>
    </ul>

    <center><img src="./.images/Screenshot_14.png" align="middle"></center>
    <center><img src="./.images/Screenshot_15.png" align="middle"></center>
    <center><img src="./.images/Screenshot_16.png" align="middle"></center>
    <center><img src="./.images/Screenshot_17.png" align="middle"></center>
    <center><img src="./.images/Screenshot_18.png" align="middle"></center>

    </lesson-chapter>

    <lesson-chapter><template #title>Nowe pojęcia</template>
    <p> 
      <b>Zbiór pusty</b> (oznaczany symbbolem $\emptyset$) to zbiór nieposiadający elementów.<br>
      <b>Moc zbioru</b> to liczba jego elementów. Zbiór $A = \{2, 3, 5, 7, 11\}$ ma moc $5$, symbolicznie: $|A|=5$.
    </p>

    <p>
      <b>Podzbiór</b> pewnego zbioru składa się z pewnej liczby elementów tego zbioru, np. $\{1, 2, 3\}$ jest podzbiorem $\{1, 2, 3, 4, 5\}$, symbolicznie 
      $\{1, 2, 3\} \subseteq \{1, 2, 3, 4, 5\}$.<br>
      <b>Podzbiór właściwy</b> pewnego zbioru to jego podzbiór, który jest od niego różny, np. $\{1, 2, 3\} \subset \{1, 2, 3, 4, 5\}$.
    </p>

    <p>
      <b>Część wspólna (przekrój) zbiorów</b> to zbiór elementów należących jednocześnie do obydwu zbiorów: $\{1, 2\} \cap \{2, 3\} = \{2\}$.<br>
      <b>Suma zbiorów</b> to zbiór elementów należących do pierwszego lub drugiego zbioru: $\{1, 2\} \cup \{2, 3\} = \{1, 2, 3\}$.<br>
      <b>Różnica zbiorów</b> to zbiór elementów znajdujących się w pierwszym ale nie w drugim zbiorze: $\{1, 2\} \setminus \{2, 3\} = \{1\}$.<br>
      <b>Dopełnienie zbioru</b> zawartego w innym zbiorze, zwanym <b>uniwersum</b>, to różnica uniwersum i tego zbioru: $A' = \Omega \setminus A$.
    </p>

    <p>
      <b>Przedział rzeczywisty</b> to podzbiór $\mathbb{R}$ liczb znajdujących się pomiędzy dwiema wartościami, zwanymi <b>końcami przedziału</b>.<br>
      <b>Przedział obustronnie domknięty</b> zawiera końce przedziału: $x \in [2, 5] \Leftrightarrow 2 \leq x \leq 5$.<br>
      <b>Przedział obustronnie otwarty</b> nie zawiera końców przedziału: $x \in (2, 5) \Leftrightarrow 2 \lt x \lt 5$.<br>
      <b>Przedział prawostronnie domknięty</b> zawiera prawy i nie zawiera lewego końca: $x \in (2, 5] \Leftrightarrow 2 \lt x \leq 5$.<br>
      <b>Przedział lewostronnie domknięty</b> zawiera lewy i nie zawiera prawego końca: $x \in [2, 5) \Leftrightarrow 2 \leq x \lt 5$.
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
  name: "ZbioryLiczboweShort",
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
