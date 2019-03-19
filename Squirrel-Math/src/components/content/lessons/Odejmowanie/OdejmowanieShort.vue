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

        <table class="operation_table center" id="adding_table">
            <tr><th> </th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th style="background: #F0E0E0">8</th><th>9</th></tr>
            <tr><th>0</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td style="background: #F0E0E0">8</td><td>9</td></tr>
            <tr><th>1</th><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td style="background: #F0E0E0">9</td><td>10</td></tr>
            <tr><th>2</th><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td style="background: #F0E0E0">10</td><td>11</td></tr>
            <tr><th>3</th><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td style="background: #F0E0E0">11</td><td>12</td></tr>
            <tr><th>4</th><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td style="background: #F0E0E0">12</td><td>13</td></tr>
            <tr><th>5</th><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td style="background: #F0E0E0">13</td><td>14</td></tr>
            <tr><th>6</th><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td style="background: #F0E0E0">14</td><td>15</td></tr>
            <tr><th>7</th><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td style="background: #F0E0E0">15</td><td>16</td></tr>
            <tr><th>8</th><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td style="background: #F0E0E0">16</td><td>17</td></tr>
            <tr style="background: #F0E0E0"><th>9</th><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td style="background: #CC4444">17</td><td>18</td></tr>
        </table>
        <p style = "text-align: center; visibility: hidden;" id="adding_table_field" class="math">
            &nbsp;
        </p> 

        <p>
			Dla większych liczb stosuje się metodę <i>odejmowania w słupku</i>, zwaną też <i>odejmowaniem pisemnym</i>. 
			Wpisz poniżej liczby do odjęcia, np. $200547 - 2384$
		</p>

        <p style="text-align: center">
            <input style="width: 85%" name="numberInput" type="text" id="columnar_addition_input" />
        </p>
        <LOL>
            var columnar_addition = new Columnar_addition( "columnar_addition_table","columnar_addition_comment", "columnar_operation_button_right", "columnar_operation_button_left");
            function ColumnarAdditionStartArgs() {
                var success = columnar_addition.generate_from_input("columnar_addition_input","columnar_addition_area",false);
                if (success)columnar_addition.print_step(0);
            }

        </LOL>
        <p style="text-align: center">
            <button id="columnar_addition_start" style="float: center;" onclick="ColumnarAdditionStartArgs()">Start</button>
        </p>
        <LOL>
            SetInputEnterEvent("columnar_addition_input","columnar_addition_start")
        </LOL>
        
        
        <table class="columnar_operation_script center" id="columnar_addition_area" >
            <tr>
                <td id="columnar_operation_button_left" onclick="columnar_addition.prev()">
                    <svg height="0" width="30">
                        <defs>
                            <linearGradient id="gradient">
                                <stop offset="20%" stop-color="#C33" />
                                <stop offset="90%" stop-color="#833" />
                            </linearGradient>
                            <linearGradient id="hover_gradient">
                                <stop offset="20%" stop-color="#A33" />
                                <stop offset="90%" stop-color="#433" />
                            </linearGradient>
                        </defs>
                        <polygon points="20,0 0,30 20,60"/>
                    </svg>
                </td>
                <td>
                    <div id="columnar_addition_table" class="no_selection"></div>
                    <p id="columnar_addition_comment" class="no_selection"></p>
                </td>
                <td id = "columnar_operation_button_right" onclick="columnar_addition.next()">
                    <svg height="0" width="30">
                        <polygon points="0,0 20,30 0,60"/>
                    </svg>
                </td>	
            </tr>
        </table>
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
    Lesson
  }
};
</script>

<style scoped>

</style>
