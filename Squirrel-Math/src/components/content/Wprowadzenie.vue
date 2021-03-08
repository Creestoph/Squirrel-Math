<template>
  <lesson>
    <lesson-title>Wprowadzenie</lesson-title>

    <lesson-intro>
      <p>
        Po co nam matematyka? To bardzo dobre pytanie. Spróbujmy na nie odpowiedzieć.
        <ul>
          <li>
            Matematyka to kwintesencja prawdy, jako królowa nauk jest czysta, niezależna i nieskazitelnie logiczna. 
            Każda istota rozumna uprawia matematykę jako wytyczną swojego rozwoju umysłowego. 
          </li>
          <li>
            Matematyka jest doskonałym narzędziem opisującym świat i wszystkie występujące na nim zależności. 
            Z jej narzędzi korzystają fizycy, chemicy, biolodzy, informatycy, technicy… Postęp cywilizacyjny zawdzięczamy ich odkryciom, 
            a oni odkrycia zawdzięczają matematyce.
          </li>
          <li>
            Gdy człowiek zarazi się matematyką, uczy się jej, żeby zostać wykładowcą na uczelni. 
            Jak już nim zostanie, zasiewa tego wirusa wśród przyszłych pokoleń.
          </li>
          <li>
            Matematyka przyda Ci się na jutrzejszy sprawdzian, więc nie marudź, tylko wkuwaj.
          </li>
        </ul>
      </p>
    
      <p>
        Squirrel-Math to projekt zapoczątkowany przez studentów informatyki z Politechniki Wrocławskiej. Założenie jest proste – czemu by nie zebrać <comment
          text="Rzeczywiście okiełznanie „całej” wiedzy matematycznej to przedsięwzięcie raczej nieosiągalne, ale na 
		dobry początek zadowolimy się poziomem maturalnym."
        >
          całej
        </comment>
        wiedzy matematycznej w jednym podręczniku, który pozwoli przyswoić ją w sposób przystępny, intuicyjny i uporządkowany? 
        Obecnie strudzony uczeń żądny wiedzy matematycznej musi przebyć długą i ciężką drogę, żeby ją zdobyć – program nauczania ciągnie się 
        przez długie lata szkolne, piętrząc chaos przez ciągłe skakanie od podręcznika do podręcznika. Wiedza przekazywana jest wyrywkowo, 
        niespójnie, a często wręcz niedbale. Częste problemy w opanowaniu nauk matematycznych nie wynikają z tego, że matematyka sama w sobie jest trudna.
        Po prostu nie jest podparta właściwymi intuicjami. Jeśli zaś uczeń wyprzedza program i chce czegoś więcej, to musi szukać wiedzy tajemnej 
        w źródłach fachowych, z których bardzo ciężko uczyć się <comment text="Bez urazy.">laikowi</comment>.
      </p>
    
      <p>
        Rozumiemy Wasz problem
      </p>
    
      <p>
        i próbujemy dziarsko wyjść naprzeciw zawikłaniom programów nauczania, podsuwając podręcznik przystępny dla każdego. 
        Na starcie nie wymagamy żadnej  wiedzy, a wszystkie pojęcia, definicje, twierdzenia i metody wyjaśnimy po kolei, zawsze opierając się 
        tylko na tym, co wyjaśniliśmy wcześniej. Zaczynamy zupełnie od zera. Chociaż… wybaczcie, nie powiedzieliśmy jeszcze, czym jest zero.
      </p> 
    </lesson-intro>
  </lesson>
</template>

<script>
import LessonTitle from "../lesson/LessonTitle";
import LessonIntro from "../lesson/LessonIntro";
import LessonChapter from "../lesson/chapter/LessonChapter";
import Lesson from "../lesson/Lesson.vue";

export default {
  name: "Wprowadzenie",
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
