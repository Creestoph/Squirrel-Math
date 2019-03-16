<template>
  <lesson>
    <lesson-title>Dodawanie</lesson-title>
    <lesson-intro>
        <p>
          Zgodnie z obietnicą zaczniemy poznawać <i>operacje</i>, zwane też <i>działaniami</i> na liczbach. „Przeprowadzanie operacji” w matematyce 
          znaczy mniej więcej tyle, co przyrządzanie zupy studenckiej. Wrzucasz dowolne składniki i patrzysz, co wyszło. 
          Przyjrzyjmy się takiej operacji, jak dodawanie liczb naturalnych.
        </p>
    </lesson-intro>
    <lesson-chapter>
      <template #title>
        Dodawanie, czyli łączenie składników
      </template>
      <p class = "type">
        Intuicje
      </p>
          
        <p>
          Dodawanie to inaczej łączenie, powiększanie, scalanie mniejszych elementów w większą całość. 
          <span class="comment" id="Kulki zostały rzucone">Rozłóżmy na stole kulki.</span>
        </p>
          
        <p style="text-align: center">
          <svg height="200" width="800">
            <defs>
              <linearGradient id="gradient">
                <stop offset="20%" stop-color="#C33" />
                <stop offset="90%" stop-color="#833" />
              </linearGradient>
            </defs>
            <circle cx="240" cy="130" r="20" class = "draggable"></circle>
            <circle cx="200" cy="70" r="20" class = "draggable"></circle>
            <circle cx="580" cy="160" r="20" class = "draggable"></circle>
            <circle cx="500" cy="90" r="20" class = "draggable"></circle>
            <circle cx="480" cy="140" r="20" class = "draggable"></circle>
            <circle cx="620" cy="64" r="20" class = "draggable"></circle>
          </svg>
        </p>  
          
        <p>
          Kulki rozłożyły się na dwie widoczne grupy. W grupie po lewej stronie widzimy dwie kulki. W grupie po prawej stronie są cztery kulki. Kiedy policzymy 
          po kolei wszystkie widoczne kulki, stwierdzimy, że jest ich sześć. Na tym polega właśnie magia dodawania. $2$ kulki oraz $4$ kulki to to samo, 
          co $6$ kulek. 
          Matematycy nie lubią używać zbyt wielu słów, więc zapiszą to spostrzeżenie krócej:
        </p>
          
        $$
          2\ \text{kulki} + 4\ \text{kulki} = 6\ \text{kulek}
        $$
          
        <p>
          Znaczek $+$ rozumiemy jako „oraz”, a znaczek $=$ jako „to to samo, co”. Znaczki te to pierwsze <i>symbole matematyczne</i>, z jakimi masz 
          <span class="comment" id="Czujesz ją?">przyjemność</span> 
          się spotkać. Bardziej profesjonalnie symbol $+$ czytamy jako „dodać”. Mniej profesjonalnie jako „plus”. Symbol $=$ czytamy jako „równa się”. Ma on 
          dużo szerszą i ogólniejszą rolę, niż tylko opowiadanie o łączeniu kulek. Symbol $=$ mówi tyle, że po jego lewej stronie jest dokładnie to samo, co po 
          prawej stronie. Można na przykład zapisać, że 
        </p>
          
        $$
          2\ \text{kulki} = 2\ \text{kulki}
        $$
          
        <p>
          Pytanie tylko po co. Wróćmy lepiej do kulek, żeby oswoić się z nowym zapisem.
        </p>
          
        <p style="text-align: center">
          <svg height="150" width="800">
            <circle cx="280" cy="120" r="20" class = "draggable"></circle>
            <circle cx="190" cy="50" r="20" class = "draggable"></circle>
            <circle cx="540" cy="100" r="20" class = "draggable"></circle>
            <circle cx="600" cy="24" r="20" class = "draggable"></circle>
          </svg>
        </p>  
          
        <p style="margin-bottom: 0">
          Dwie kule po lewej, dwie kule po prawej, razem widzimy $4$ kule.
        </p>
          
        $$
          2\ \text{kule} + 2\ \text{kule} = 4\ \text{kule}
        $$
          
        <p style="text-align: center">
          <svg height="250" width="800">
            <circle cx="140" cy="130" r="20" class = "draggable"></circle>
            <circle cx="90" cy="170" r="20" class = "draggable"></circle>
            <circle cx="80" cy="210" r="20" class = "draggable"></circle>
            <circle cx="340" cy="100" r="20" class = "draggable"></circle>
            <circle cx="370" cy="150" r="20" class = "draggable"></circle>
            <circle cx="400" cy="90" r="20" class = "draggable"></circle>
            <circle cx="310" cy="180" r="20" class = "draggable"></circle>
            <circle cx="640" cy="130" r="20" class = "draggable"></circle>
            <circle cx="700" cy="160" r="20" class = "draggable"></circle>
            <circle cx="580" cy="200" r="20" class = "draggable"></circle>
            <circle cx="690" cy="100" r="20" class = "draggable"></circle>
            <circle cx="580" cy="100" r="20" class = "draggable"></circle>
            <circle cx="670" cy="220" r="20" class = "draggable"></circle>
          </svg>
        </p>  
          
        <p style="margin-bottom: 0">
          Trzy kule po lewej, cztery kule po środku, sześć kul po prawej. Razem $13$ kul.
        </p>
          
        $$
          3\ \text{kule} + 4\ \text{kule} + 6\ \text{kul} = 13\ \text{kul}
        $$
          
        <p>
            Jak już mówiliśmy, liczby w matematyce nie muszą odnosić się do żadnych konkretnych przedmiotów, takich jak kule. 
            Istnieją one niezależnie, po prostu jako liczby. Powyższe przykłady można zapisać ogólniej, bez powiązania z kulami:
        </p>
          
        $$2 + 4 = 6\\
        2 + 2 = 4\\
        3 + 4 + 6 = 13$$
          
        <p>
            Jeśli w trakcie nauki dodawania napotkasz trudności, zawsze możesz wyobrazić lub narysować sobie odpowiedni obrazek z 
            kulkami i policzyć je jedna po drugiej. 
        </p>
          
        <p>
            Dodawanie możemy rozumieć także jako powiększanie jednej liczby o drugą:
      </p>
      
      <div class="example">
        <p>
          Jeśli pasterz miał dziesięć owiec i 
          postanowił dokupić siedem owiec, to teraz ma siedemnaście owiec.
        </p>
          
        $$
          10 + 7 = 17
        $$
      </div>
      
      <div class="example">
        <p>
          <span class="comment" id = "To ile czasu spędzi w toalecie?">Jeśli pan Janusz zjadł na śniadanie $3$ golonki, na obiad $4$ golonki, a na kolację 
          $2$ golonki,</span> 
          to w ciągu całego dnia zjadł $9$ golonek.
        </p>
          
        $$
          3 + 4 + 2 = 9
        $$
      </div>
          
      <div class="example">
        <p>
          Jeśli $5$ razy w ciągu dnia wypijesz dwie <span class="comment" id="soku">szklaneczki</span>, to łącznie wypijesz $10$ szklaneczek.
        </p>
          
        $$
          2 + 2 + 2 + 2 + 2 = 10
        $$
      </div>
    </lesson-chapter>

    <lesson-chapter title="Zaczynamy">zaczelismy</lesson-chapter>
    <lesson-chapter title="Zaczynamy">zaczelismy</lesson-chapter>
    <lesson-chapter title="Zaczynamy">zaczelismy</lesson-chapter>
    <lesson-chapter title="Zaczynamy">zaczelismy</lesson-chapter>
  </lesson>
</template>

<script>
import LessonTitle from "../../lesson/LessonTitle";
import LessonIntro from "../../lesson/LessonIntro";
import LessonChapter from "../../lesson/chapter/LessonChapter";
import Lesson from "../../lesson/Lesson";

export default {
  name: "Dodawanie",
  data() {
    return {
      chapters: []
    };
  },
  components: {
    LessonIntro,
    LessonTitle,
    LessonChapter,
    Lesson
  }
};
</script>

<style scoped>
</style>
