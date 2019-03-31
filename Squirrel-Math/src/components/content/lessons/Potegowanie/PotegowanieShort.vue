<template>
    <lesson>
        <lesson-title-short>Potęgowanie</lesson-title-short>    
        
        <lesson-chapter><template #title>Czym jest potęga</template> 
		<p> 
			Podobnie jak mnożenie oznacza wielokrotne dodawanie tej samej liczby, tak potęgowanie oznacza wielokrotne mnożenie przez siebie 
			tej samej liczby. Potęgowanie jest działaniem "wyższego rzędu" niż mnożenie.
		</p>

		$$
			3 \cdot 3 \cdot 3 \cdot 3 \cdot 3=3^5
		$$

		<p>
			Zapis $3^5$ czytamy „trzy do potęgi piątej”. Liczba, którą mnożymy przez siebie wielokrotnie, to <i>podstawa potęgi</i>, a ilość mnożeń, jakich 
			dokonujemy (mała liczba w prawym górnym rogu, czyli w tzw. <i>indeksie górnym</i>), to <i>wykładnik potęgi</i>. Formalnie potęgę 
			dla dowolnej podstawy $a$ i naturalnego wykładnika $n$ definiujemy jako
		</p>

		$$
			a^n = \underbrace{a \cdot a \cdot a \cdot a \cdot \dotsb \cdot a}_n
		$$
        </lesson-chapter>			

		<lesson-chapter><template #title>Potęgowanie a kolejność wykonywania działań</template>  
		<p class="type">
			Intuicje
		</p>
		
		<p>
			W dowolnym działaniu, w którym pojawia się wiele działań, jak dodawanie, mnożenie, potęgowanie, działania wykonujemy w kolejności:
		</p>
		
		<ol style="margin-top: 0" class="formula">
			<li style="text-align: left">Działania w nawiasach;</li>
			<li style="text-align: left">Potęgowanie;</li>
			<li style="text-align: left">Mnożenie i dzielenie w kolejności występowania;</li>
			<li style="text-align: left">Dodawanie i odejmowanie w kolejności występowania.</li>
		</ol>

		<p>
			Warto mieć na uwadze, że zapis $-2^4$ oznacza „dwa do czwartej na minusie”, czyli liczbę ujemną o wartości 
			$-16$, ale zapis $(-2)^4$ to czwarta potęga liczby $-2$, a więc $16$.
		</p>
        </lesson-chapter>			

    	<lesson-chapter><template #title>Potęgi o wykładniku całkowitym</template>  
		<p>
			Określimy teraz definicje potęg dla wykładników innych niż dodatnie. 
		</p>

		<p>
			Dowolna liczba podniesiona do potęgi 
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
  name: "PotegowanieShort",
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
