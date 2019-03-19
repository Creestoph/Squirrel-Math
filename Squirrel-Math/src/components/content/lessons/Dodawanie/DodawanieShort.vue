<template>
    <lesson>
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
            Liczby dwucyfrowe lub większe wygodnie dodaje się <i>w słupku</i>. Wpisz poniżej liczby do dodania, np. $13264 + 752$, aby poznać 
            metodę <i>dodawania pisemnego</i>.
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
import Lesson from "../../../lesson/Lesson";

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
    Lesson
  }
};
</script>

<style scoped>

</style>
