<template>
    <lesson>
        <lesson-title-short>Odejmowanie</lesson-title-short>    
        
        <lesson-chapter><template #title>Co to znaczy</template> 
		<p style="text-align: center">
			<svg height="200" width="800">
				<defs>
					<linearGradient id="gradient">
						<stop offset="20%" stop-color="#C33" />
						<stop offset="90%" stop-color="#833" />
					</linearGradient>
				</defs>
				<circle cx="230" cy="130" r="20" class = "draggable"></circle>
				<circle cx="210" cy="70" r="20" class = "draggable"></circle>
				<circle cx="190" cy="160" r="20" class = "draggable"></circle>
				<circle cx="450" cy="90" r="20" class = "draggable"></circle>
				<circle cx="490" cy="140" r="20" class = "draggable"></circle>
				<circle cx="540" cy="64" r="20" class = "draggable"></circle>
			<circle cx="530" cy="120" r="20" class = "draggable"></circle>
			</svg>
		</p>  

		<p>
			Istotą odejmowania jest zmniejszanie jednej liczby o drugą. Gdy od $7$ kulek zabierzemy 
			$4$ kulki, otrzymamy $3$ kulki. Matematycznie zapiszemy to tak:
		</p>
			
		$$
			7\ \text{kulek} - 4\ \text{kulki} = 3\ \text{kulki}
		$$
		
		<p>
			Znaczek $–$ jest symbolem matematycznym o nazywie „minus”. W działaniu czytamy go jako „odjąć”. Znaczy on tyle, 
			że od tego, co po lewej stronie, zabieramy (czyli odejmujemy) to, co po prawej stronie.
		</p>
		</lesson-chapter>

		<lesson-chapter><template #title>Odejmowanie to odwrotność dodawania</template> 		
		<p>
			Odejmowanie jest działaniem odwrotnym do dodawania. Kiedy napotkamy problem, próbując odjąć $10 - 4$, 
			możemy zadać sobie 
			pytanie „co należy dodać do $4$, by otrzymać $10$?”. Stwierdzimy wtedy, że od 
			$4$ do $10$ brakuje jeszcze $6$. Tak więc spostrzeżenie
			$4 + 6 = 10$ oznacza tyle samo co $10 - 4 = 6$. 
		</p>
		</lesson-chapter>

        <lesson-chapter><template #title>Jak się odejmuje</template>
        <p>
            Gdy chcesz odjąć od siebie dwie liczby, zadaj sobie pytanie "ile brakuje od mniejszej do większej?" czyli inaczej "co należy dodać do 
			mniejszej, by otrzymać większą?". Możesz wtedy posłużyć się tabliczką dodawania: aby obliczyć $17 - 8$ zlokalizuj kolumnę o nazwie "$8$" i znajdź 
			w niej pole z wartością $17$. Wiersz, w którym znajduje się ta liczba: $9$ stanowi wynik odejmowania.
        </p>

   	 	<operation-table :default_loperand="3" :default_roperand="4"  :f="function(a,b){return a+b}" :print="function(a,b,c){return c + ' - ' + a + ' = ' + b}"></operation-table>

        <p>
			Dla większych liczb stosuje się metodę <i>odejmowania w słupku</i>, zwaną też <i>odejmowaniem pisemnym</i>. 
			Wpisz poniżej liczby do odjęcia, np. $200547 - 2384$
		</p>

	    <columnar-operation :operation="'subtraction'" :floats="false"></columnar-operation>

        </lesson-chapter>

        <lesson-chapter><template #title>Nowe pojęcia</template>
        <p>
            Gdy wykonujemy dodawanie, liczbę, od której odejmujemy (po lewej), nazywamy <b>odjemną</b>, a liczbę, którą odejmujemy (po prawej), nazywamy 
        	<b>odjemnikiem</b>. Wynik odejmowania to <b>różnica</b>. W działaniu $10 - 4 = 6$ odjemną jest $10$, odjemnikiem jest 
			$4$, a różnicą $6$.
        </p>
		$$
			\text{odjemna} - \text{odjemnik} = \text{różnica}
		$$
        </lesson-chapter>

    </lesson>
</template>

<script>
import LessonTitleShort from "../../../lesson/LessonTitleShort";
import LessonIntro from "../../../lesson/LessonIntro";
import LessonChapter from "../../../lesson/chapter/LessonChapter";
import Lesson from "../../../lesson/Lesson";
import OperationTable from "../../../utils/operation_table/OperationTable";
import ColumnarOperation from "../../../utils/columnar_operation/ColumnarOperation";

export default {
  name: "OdejmowanieShort",
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
