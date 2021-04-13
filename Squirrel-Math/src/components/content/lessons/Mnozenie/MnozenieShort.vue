<template>
    <lesson routeShortVersion="/mnozenie-short" routeLongVersion="/mnozenie">
        <lesson-title-short>Mnożenie</lesson-title-short>    
        
        <lesson-chapter><template #title>Co to znaczy</template> 
        <p>
            Mnożenie to wielokrotne dodawanie. Gdy chcemy policzyć liczbę kafelków poniżej:
        </p>

        <br>
        <table class = "tiles center">
            <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
        </table>
        <br>

        <p>
            możemy stwierdzić, że plansza składa się z $4$ rzędów, a w każdym znajduje się $6$ kafli:
        </p>
    
        $$
            6 + 6 + 6 + 6 = 24
        $$
        
        <p>
            Stosując mnożenie zapszemy to krócej:
        </p>
        
        $$
            4 \cdot 6 = 24
        $$
        
        <p>
            Znak $ \cdot $ czytamy jako „razy”. Zapis $4 \cdot 6$ (cztery razy sześć) oznacza, że należy cztery razy dodać do siebie 
            szóstkę. Czasami (raczej nieprofesjonalnie) zamiast kropki stosuje się oznaczenie $4\text{ * }6$ albo $4 \times 6$.
        </p>
		</lesson-chapter>

        <lesson-chapter><template #title>Jak się mnoży</template>
        <p>
            Mnożenie zawsze można sprowadzić do wielokrotnego dodawania, np. $7 \cdot 8 = 8 + 8 + 8 + 8 + 8 + 8 + 8$.
            Aby przyspieszyć rachunki, warto opanować <i>tabliczkę mnożenia</i>, czyli zapamiętać wyniki jednocyfrowych mnożeń.
        </p>

        <br>
        <operation-table :defaultLoperand="6" :defaultRoperand="8" 
        :f="function(a,b){return a*b}" :print="function(a,b,c){return a + ' · ' + b + ' = ' + c}"></operation-table>

        <p>
            Większe liczby zwykle <i>mnoży się w słupku</i> (wykonuje <i>mnożenie pisemne</i>). Wpisz poniżej dowolne dwie liczby, np. $629 \text{ * } 204$
        </p>

        <columnar-operation :operation="'multiplication'" :floats="false"></columnar-operation>

        </lesson-chapter>

        <lesson-chapter><template #title>Nowe pojęcia</template>
        <p>
            Liczby, które mnożymy, nazywamy <b>czynnikami</b>, zaś wynik mnożenia <b>iloczynem</b>. W działaniu $5 \cdot 6 = 30$ czynnikami są $5$ i $6$, 
            a wynikiem (iloczynem) $30$.
        </p>
      
        $$
            \text{czynnik}  \cdot \text{czynnik} = \text{iloczyn}
        $$
      
        <p>
            <b>Przemienność</b> to cecha mnożenia mówiąca, że nie ma znaczenia kolejność, w jakiej zapiszemy czynniki. $4 \cdot 6$ jest tym samym, co $6 \cdot 4$.<br>
            <b>Łączność</b> to cecha mnożenia mówiąca, że wolno nam mnożyć kilka liczb na raz: $2 \cdot 3 \cdot 4$ możemy obliczać od lewej (dwa razy trzy to $6$, 
            a sześć razy cztery to $24$) albo od prawej (trzy razy cztery to $12$, a dwa razy dwanaście to $24$).
        </p>
        </lesson-chapter>

    </lesson>
</template>

<script>
import LessonTitleShort from "../../../lesson/LessonTitleShort";
import LessonIntro from "../../../lesson/LessonIntro";
import LessonChapter from "../../../lesson/chapter/LessonChapter";
import Lesson from "../../../lesson/Lesson.vue";
import OperationTable from "../../../store/operation-table/OperationTable";
import ColumnarOperation from "../../../utils/columnar_operation/ColumnarOperation";

export default {
  name: "MnozenieShort",
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
