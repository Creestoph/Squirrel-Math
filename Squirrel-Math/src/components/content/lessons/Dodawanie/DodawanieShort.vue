<template>
    <lesson routeShortVersion="/dodawanie-short" routeLongVersion="/dodawanie">
        <lesson-title-short>Dodawanie</lesson-title-short>    
        
        <lesson-chapter><template #title>Co to znaczy</template> 
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
            Pojęcie dodawania można dobrze zobrazować na fizycznych przedmiotach: $2$ kulki oraz $4$ kulki to to samo, co $6$ kulek. 
            Matematycznie zapisujemy to spostrzeżenie jako:
        </p>
        
        $$
            2\ \text{kulki} + 4\ \text{kulki} = 6\ \text{kulek}
        $$
        
        <p>
            Znaczki $+$ oraz $=$ to <i>symbole</i> matematyczne. Pierwszy z nich rozumiemy jako "razem z", a drugi jako "to to samo, co".
            Symbol $+$ czytamy jako „dodać” albo „plus”, zaś symbol $=$ jako „równa się”. Symbol $=$ ma dość ogólne zastosowanie: mówi on tyle, 
            że po jego lewej stronie jest dokładnie to samo, co po prawej stronie. 
        </p>
        
        <p>
            W matematyce dodawanie nie musi dotyczyć kulek ani żadnych materialnych przedmiotów. Dodawać możemy do siebie same liczby, oderwane od kontekstu, 
            istniejące abstrakcyjnie:
        </p>
        
            $$2 + 4 = 6\\
            2 + 2 = 4\\
            3 + 4 + 6 = 13$$
        </lesson-chapter>

        <lesson-chapter><template #title>Jak się dodaje</template>
        <p>
            Gdy chcesz dodać do siebie liczby $8$ i $9$, możesz po prostu narysować na kartce dwa kółka, potem pięć kółek i policzyć, ile kółek 
            łącznie narysowałeś. Okaże się, że jest ich $17$. Do dodawania liczb jednocyfrowych możesz wykorzystać <i>tabliczkę dodawania</i>. 
            Spójrz na kolumnę zatytułowaną "$8$" i wiersz zatytułowany "$9$", a w odpowiedniej kratce odnajdziesz wynik $17$. 
        </p>

        <operation-table :defaultLoperand="8" :defaultRoperand="9" :f="function(a,b){return a+b}" :print="function(a,b,c){return a + ' + ' + b + ' = ' + c}"></operation-table>

        <p>
            Liczby dwucyfrowe lub większe wygodnie dodaje się <i>w słupku</i>. Wpisz poniżej liczby do dodania, np. $13264 + 752$, aby poznać 
            metodę <i>dodawania pisemnego</i>.
        </p>

        <columnar-operation :operation="'addition'" :floats="false"></columnar-operation>

        </lesson-chapter>

        <lesson-chapter><template #title>Nowe pojęcia</template>
        <p>
            <b>Działanie (operacja)</b> to jakakolwiek czynność wykonywana na liczbach. Dodawanie jest jednym z podstawowych działań matematycznych.<br>
            <b>Wynik</b> to liczba, która powstaje po wykonaniu działania.
        </p>
        <p>
            Gdy wykonujemy dodawanie, liczby, które dodajemy, nazywamy <b>składnikami</b>, a wynik dodawania nazywamy <b>sumą</b>. W działaniu $3 + 5 = 8$ 
            składnikami są $3$ i $5$, a $8$ jest sumą.
        </p>
        $$
            \text{składnik} + \text{składnik} = \text{suma}
        $$
        <p>
            <b>Przemienność</b> to charakterystyczna cecha dodawania mówiąca, że nie ma znaczenia kolejność, w jakiej zapiszemy składniki dodawania.
            $4 + 5$ jest tym samym, co $5 + 4$<br>
            <b>Łączność</b> to cecha dodawania mówiąca, że wolno nam dodawać więcej niż dwa składniki na raz. Działanie $2 + 5 + 4$ można obliczać od lewej 
            do prawej: "dwójka i piątka to razem $7$, do tego jeszcze cztery to razem $11$" lub od prawej do lewej: "piątka i czwórka to razem $9$, 
            do tego jeszcze $2$ to razem $11$".
        </p>
        </lesson-chapter>

    </lesson>
</template>

<script>
import LessonTitleShort from "../../../lesson/LessonTitleShort";
import LessonIntro from "../../../lesson/LessonIntro";
import LessonChapter from "../../../lesson/chapter/LessonChapter";
import Lesson from "../../../lesson/Lesson.vue";
import OperationTable from "../../../store/operation-table/OperationTable"
import ColumnarOperation from "../../../store/columnar-operation-guide/ColumnarOperationGuide"

export default {
  name: "DodawanieShort",
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
    OperationTable,
    ColumnarOperation
  }
};
</script>

<style scoped>

</style>
