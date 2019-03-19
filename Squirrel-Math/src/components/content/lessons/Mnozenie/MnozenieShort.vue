<template>
    <lesson>
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
        <table class="operation_table center" id="multiplication_table">
            <tr><th> </th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th style="background: #F0E0E0">6</th><th>7</th><th>8</th><th>9</th></tr>
            <tr><th>0</th><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td style="background: #F0E0E0">0</td><td>0</td><td>0</td><td>0</td></tr>
            <tr><th>1</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td style="background: #F0E0E0">6</td><td>7</td><td>8</td><td>9</td></tr>
            <tr><th>2</th><td>0</td><td>2</td><td>4</td><td>6</td><td>8</td><td>10</td><td style="background: #F0E0E0">12</td><td>14</td><td>16</td><td>18</td></tr>
            <tr><th>3</th><td>0</td><td>3</td><td>6</td><td>9</td><td>12</td><td>15</td><td style="background: #F0E0E0">18</td><td>21</td><td>24</td><td>27</td></tr>
            <tr><th>4</th><td>0</td><td>4</td><td>8</td><td>12</td><td>16</td><td>20</td><td style="background: #F0E0E0">24</td><td>28</td><td>32</td><td>36</td></tr>
            <tr><th>5</th><td>0</td><td>5</td><td>10</td><td>15</td><td>20</td><td>25</td><td style="background: #F0E0E0">30</td><td>35</td><td>40</td><td>45</td></tr>
            <tr><th>6</th><td>0</td><td>6</td><td>12</td><td>18</td><td>24</td><td>30</td><td style="background: #F0E0E0">36</td><td>42</td><td>48</td><td>54</td></tr>
            <tr><th>7</th><td>0</td><td>7</td><td>14</td><td>21</td><td>28</td><td>35</td><td style="background: #F0E0E0">42</td><td>49</td><td>56</td><td>63</td></tr>
            <tr style="background: #F0E0E0"><th>8</th><td>0</td><td>8</td><td>16</td><td>24</td><td>32</td><td>40</td><td  style="background: #CC4444">48</td><td>56</td><td>64</td><td>72</td></tr>
            <tr><th>9</th><td>0</td><td>9</td><td>18</td><td>27</td><td>36</td><td>45</td><td style="background: #F0E0E0">54</td><td>63</td><td>72</td><td>81</td></tr>
        </table>
        <p id="multiplication_table_field" style="visibility: hidden; text-align: center">
            a
        </p>

        <p>
            Większe liczby zwykle <i>mnoży się w słupku</i> (wykonuje <i>mnożenie pisemne</i>). Wpisz poniżej dowolne dwie liczby, np. $629 \text{ * } 204$
        </p>

        <p style="text-align: center">
            <input style="width: 800px" name="numberInput" type="text" id="columnar_multiplication_input" />
        </p>
        <LOL>
            var columnar_multiplication = new Columnar_multiplication( "columnar_multiplication_table","columnar_multiplication_comment", "columnar_operation_button_right", "columnar_operation_button_left");
            function ColumnarMultiplicationStartArgs() {
                var success = columnar_multiplication.generate_from_input("columnar_multiplication_input","columnar_multiplication_area", false);
                if (success)columnar_multiplication.print_step(0);
            }

        </LOL>
        <p style="text-align: center">
            <button id="columnar_multiplication_start" style="float: center;" onclick="ColumnarMultiplicationStartArgs()">Start</button>
        </p>
        <LOL>
            SetInputEnterEvent("columnar_multiplication_input","columnar_multiplication_start")
        </LOL>
        
        
        <table class="columnar_operation_script center" id="columnar_multiplication_area" >
            <tr>
                <td id="columnar_operation_button_left" onclick="columnar_multiplication.prev()">
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
                    <div id="columnar_multiplication_table" class="no_selection"></div>
                    <div id="columnar_multiplication_carry" class="no_selection"></div>
                    <p id="columnar_multiplication_comment" class="no_selection"></p>
                </td>
                <td id = "columnar_operation_button_right" onclick="columnar_multiplication.next()">
                    <svg height="0" width="30">
                        <polygon points="0,0 20,30 0,60"/>
                    </svg>
                </td>	
            </tr>
        </table>
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
import Lesson from "../../../lesson/Lesson";

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
    Lesson
  }
};
</script>

<style scoped>

</style>
