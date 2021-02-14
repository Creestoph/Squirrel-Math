<template>
    <lesson routeShortVersion="/procenty-short" routeLongVersion="/procenty">
        <lesson-title-short>Procenty</lesson-title-short>    
        
        <lesson-chapter><template #title>Czym jest procent</template> 
		<p> 
			Procenty stanowią inny sposób zapisu ułamków dziesiętnych. Symbol $%$ (czyt. procent) stojący obok liczby czyni z niej ułamek o mianowniku
			sto (z łaciny pro cent - na sto): 
		</p>
		<ul>
			<li>$47\% = 0,47 = \frac{47}{100}$</li>
			<li>$5\% = 0,05 =  \frac{5}{100}$</li>
			<li>$100\% = 1$</li>
			<li>$130\% = 1,3 = 1 \frac{3}{10}$</li>
			<li>$66,7\% = 0,667 = \frac{667}{1000}$</li>
		</ul>
		<p> 
			Promile służą do wyrażania ułamków o mianowniku $1000$:
		</p>
		<ul>
			<li>$432‰ = 0,432 = \frac{432}{1000}$</li>
			<li>$57\% = 570‰ = 0,570$</li>
		</ul>
		<p> 
			Procenty nie mają istotnego matematycznego zastosowania. Odgrywają rolę głównie w kontekście gospodarki, przemysłu i marketingu, ponieważ dobrze działają na wyobraźnię. 
			W procentach zwyczajowo podaje się zawartość tłuszczu w produktach mlecznych, wysokość podatku czy też wyniki badań statystycznych.
		</p>
        </lesson-chapter>

		<lesson-chapter><template #title>Obliczanie procentu liczby</template> 
		<p>
			Aby obliczyć procent z zadanej liczby, mnożymy ją przez odpowiedni ułamek:
		</p>

		<ul>
			<li>$4\%$ z $2 \text{ kg}$ wynosi $4\% \cdot 2 \text{ kg} = \frac{4}{100} \cdot 2\text{ kg} = \frac{8}{100} \text{ kg} = 0,08 \text{ kg} = 80 \text{ g}$.</li>
			<li>$50\%$ z $1\ 000\ 000$ wynosi $\frac{50}{100} \cdot 1\ 000\ 000 = \frac{1}{2} \cdot 1\ 000\ 000 = 500\ 000$.</li> 
		</ul>
        </lesson-chapter>

		<lesson-chapter><template #title>Obliczanie, jakim procentem jest liczba</template> 
		<p>
			Aby obliczyć, ile procent pewnej liczby stanowi inna liczba, wykonujemy ich dzielenie:
		</p>

		<ul>
			<li>$0,08 \text{ kg}$ w stosunku dp $2 \text{ kg}$ wynosi $\frac{0,08}{2} = 0,04 = 4\%$, czyli $0,08$ to $4\%$ z $2$.</li>
			<li>$20$ osób spośród $50$ to $\frac{20}{50} = \frac{40}{100} = 40\%$ całej grupy.</li> 
		</ul>
        </lesson-chapter>

		<lesson-chapter><template #title>Obliczanie liczby, gdy znany jest jej procent</template> 
		<p>
			Gdy wiemy, że pewna liczba jest jakimś procentem nieznanej liczby, wykonujemy dzielenie przez procent:
		</p>

		<ul>
			<li>$20$ osób stanowi $25\%$ pewnej społeczności. W takim razie cała grupa liczy $\frac{20}{25\%} = 20 \cdot \frac{100}{25} = 20 \cdot 4 = 80$ osób.</li>
			<li>Jeśli $15$ minut stanowi $20\%$ długości podróży, to podróż trwa $\frac{15}{20\%} = 15 \cdot {100}{20} = 15 \cdot 5 = 75$ minut, czyli $1\text{ godz} 15 \text{ min}$.</li>
		</ul>
        </lesson-chapter>

		<lesson-chapter><template #title>Podwyżki i obniżki</template> 
		<p>
			Jeśli cena została obniżona o $60\%$, to znaczy, że 
			$60\%$ pierwotnej ceny zostało skasowane. 
			Jeśli przed przeceną kilogram parówek kosztował $15 \text{ zł}$, to po przecenie będzie to jedynie $6 \text{ zł}$, czyli o 
			$9 \text{ zł}$ mniej (jako że $9\text{ zł}$ to $60\%$ z $15 \text{ zł}$).
		</p>

		<center><img src="./.images/Screenshot_1.png" align="middle"></center>
		
		<p>
			Jeśli cena towaru idącego po $40 \text{ zł}$ zostanie podniesiona o $30\%$, to znaczy, że 
			$30\%$ pierwotnej ceny zostanie dodane – nowa cena będzie wynosić $52\text{ zł}$.
		</p>

		<center><img src="./.images/Screenshot_2.png" align="middle"></center>
        </lesson-chapter>

		<lesson-chapter><template #title>Obliczanie, o ile procent większa/mniejsza jest liczba</template> 
		<p>
			Gdy znamy cenę towaru przed podwyżką i po podwyżce, możemy obliczyć, o ile nastąpiła podwyżka. Musimy wtedy obliczyć, 
			jak duża jest różnica cen w stosunku do pierwotnej ceny. Przykład: o ile procent większa jest liczba $2,25$ od $2$?
		</p>
		$$
			\frac{2,25 - 2}{2} = \frac{0,25}{2} = 0,125 = 12,5\%
		$$
		<p>
			Podobnie możemy obliczyć, o ile nastąpiła obniżka cen, czyli 
			jak duża jest różnica cen w stosunku do pierwotnej ceny. Przykład: o ile procent mniejsza jest liczba $72$ od $80$?
		</p>
		$$
			\frac{80 - 72}{80} = \frac{8}{80} = 0,1 = 10\%
		$$
        </lesson-chapter>		

		<lesson-chapter><template #title>Punkty procentowe</template> 
		<p>
			Gdy porównujemy dwie liczby wyrażone w procentach, różnicę między nimi określamy za pomocą <i>punktów procentowych</i>. 
			$50\%$ to o $10$ punktów procentowych więcej niż $40\%$. Nie jest prawdą stwierdzenie, że liczba $50\%$ jest o $10\%$ większa od liczby 
			$50\%$, ponieważ $\frac{50\%-40\%}{40\%} = \frac{10\%}{40\%} = \frac{1}{4} = 25\%$, czyli $50\%$ jest liczbą o $25\%$ większą niż $40\%$.
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
