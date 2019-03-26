<template>
    <lesson>
        <lesson-title-short>Liczby ujemne</lesson-title-short>    
        
        <lesson-chapter><template #title>Czym są liczby ujemne</template> 
		<p>
			Liczby ujemne służą do przedstawiania wartości mniejszych niż $0$. Liczba $-1$ (czyt. minus jeden) ma wartość o $1$ mniejszą niż zero, $-2$
			to dwa poniżej zera itd. Z liczbami ujemnymi spotykamy się najczęściej przy pomiarze temperatur lub numeracji pięter podziemnych.
			Liczby naturalne wraz z liczbami ujemnymi nazywami <i>liczbami całkowitymi</i>.
		</p>
		<center><img src="./.images/Screenshot_1.png" align="middle"></center>
        </lesson-chapter>			

        <lesson-chapter><template #title>Dodawanie i odejmowanie liczb całkowitych</template> 
		<p> 
			Aby sprawnie dodać i odejmować liczby ujemne, warto posłużyć się <i>osią liczbową</i> (jak powyżej). Dodawanie oznacza przeskok 
			w prawo o odpowiednią liczbę pól. Odejmowanie oznacza przeskok w lewo o odpowiednią liczbę pól. Dodawanie liczby ujemnej jest tym samym, 
			co odejmowanie. Odejmowanie liczby ujemnej jest tym samym, co dodawanie.
		</p>

		<div class="row align-items-center">
			<div class="col">
				$$3 + 5 = 8$$
			</div>
			<div class="col">
				<center><img src="./.images/Screenshot_2.png" align="middle"></center>
			</div>
		</div>

		<div class="row align-items-center">
			<div class="col">
				$$6 - 4 = 2$$
			</div>
			<div class="col">
				<center><img src="./.images/Screenshot_3.png" align="middle"></center>
			</div>
		</div>

		<div class="row align-items-center">
			<div class="col">
				$$-7 + 5 = -2$$
			</div>
			<div class="col">
				<center><img src="./.images/Screenshot_4.png" align="middle"></center>
			</div>
		</div>
		
		<div class="row align-items-center">
			<div class="col">
				$$8 - 12 = -4$$
			</div>
			<div class="col">
				<center><img src="./.images/Screenshot_5.png" align="middle"></center>
			</div>
		</div>

		<div class="row align-items-center">
			<div class="col">
				$$4 + (-2) = 4 - 2 = 2$$
			</div>
			<div class="col">
				<center><img src="./.images/Screenshot_12.png" align="middle"></center>
			</div>
		</div>

		<div class="row align-items-center">
			<div class="col">
				$$5 - (-3) = 5 + 3 = 8$$
			</div>
			<div class="col">
				<center><img src="./.images/Screenshot_13.png" align="middle"></center>
			</div>
		</div>

		<p>
			Liczby ujemne zapisujemy w nawiasie, gdy chcemy oddzielić znak $-$ od znaku działania.
			Po znaku równości oraz na początku działania można zapisać liczbę ujemną bez nawiasu.
		</p>
		</lesson-chapter>					

        <lesson-chapter><template #title>Mnożenie i dzielenie liczb całkowitych</template> 
		<p> 
			Gdy wykonujemy mnożenie lub dzielenie liczb całkowitych, przeprowadzamy obliczenia tak, jakby wszystkie były dodatnie. Na sam koniec 
			określamy, czy wynik zapisać z plusem, czy z minusem: jeśli liczb ujemnych była parzysta ilość, wynik będzie dodatni.
			Jeśli liczb ujemnych była nieparzysta ilość, wynik będzie ujemny.
		</p>

		<ul>
			<li>$-3 \cdot 4 = -12$ (tylko jedna z liczb była ujemna, wynik jest ujemny)</li>
			<li>$(-5) \cdot (-4) = 20$ (dwie liczby były ujemne, wynik jest dodatni)</li>
			<li>$(-3) \cdot (-4) \cdot 2 \cdot (-1) = -24$ (trzy liczby były ujemne, wynik jest dodatni)</li>
			<li>$-20 : 4 = -5$ (tylko jedna z liczb była ujemna, wynik jest ujemny)</li>
			<li>$12 : (-3) = -4$ (tylko jedna z liczb była ujemna, wynik jest ujemny)</li>
			<li>$(-12) : (-3) = 4$ (dwie liczby były ujemne, wynik jest dodatni)</li>
		</ul>
		</lesson-chapter>					

        <lesson-chapter><template #title>Nowe pojęcia</template> 
		<p>
			<b>Liczba dodatnia</b> to liczba większa od zera<br>
			<b>Liczba ujemna</b> to liczba mniejsza od zera<br>
			<b>Liczba niedodatnia</b> to liczba o wartości mniejszej lub równej $0$<br>
			<b>Liczba nieujemna</b> to liczba o wartości większej lub równej $0$<br>
			<b>Liczy całkowite</b> to liczby naturalne wraz z zerem i ich ujemnymi odpowiednikami
		</p>

		<p> 
			<b>Znak liczby</b> określa, czy jest ona dodatnia, czy ujemna. Liczby ujemne zapisujemy z minusem z przodu.
		</p>

		<p> 
			<b>Liczby przeciwne</b> to liczby różniące się jedynie znakiem. Przeciwne do siebie są $2$ i $-2$, $4734$ i $-4734$; zero jest przeciwne samo do siebie.
			<b>Wartość bezwzględna</b> liczby to jej wartość z pominięciem znaku, symbolicznie $|-3| = 3$, $|5| = 5$, $|0| = 0$ (czytamy 
			"wartość bezwzględna liczby -3 wynosi 3")
			
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
  name: "ProcentyShort",
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
