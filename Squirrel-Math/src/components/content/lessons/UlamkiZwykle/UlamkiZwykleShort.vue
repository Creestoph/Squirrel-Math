<template>
    <lesson>
        <lesson-title-short>Ułamki zwykłe</lesson-title-short>    
        
        <lesson-chapter><template #title>Czym są ułamki?</template> 
		<p>
        	Liczby naturalne pozwalają jedynie na opis "pełnych", "całych" liczb jak $1$, $2$, $3$, 
			$...$ i nie dają sposobu na wyrażenie "połówek".
			Do zapisu części całości stosuje się ułamki. Jeśli dzielimy tort na $8$ kawałków i bierzemy spośród nich $3$ 
			kawałki, to bierzemy $\frac{3}{8}$ tortu.
			Ułamek ten czytamy jako "trzy ósme". Liczba u góry to <i>licznik ułamka</i>, a liczba na dole to <i>mianownik ułamka</i>. Pozioma kreska
			to <i>kreska ułamkowa</i>. 
		</p>

		<p> 
			Ułamek to po prostu inny sposób na zapisanie dzielenia. $\frac{3}{8}$ jest tym samym, co $3 : 8$. Gdyby trzy torty rozdzielić pomiędzy ośmiu gości, 
			każdy dostałby $\frac{3}{8}$ tortu. Możemy przyjąć, że ułamek $\frac{3}{8}$ jest wynikiem dzielenia $3 : 8$, czyli $3 : 8 = \frac{3}{8}$
		</p>
		</lesson-chapter>

		<lesson-chapter><template #title>Wyciaganie całości z ułamka</template> 
		<p>
			Jeśli w liczniku ułamka znajduje się liczba większa lub taka sama jak w mianowniku, to ułamek taki nazywamy <i>niewłaściwym</i>. 
			<i>Ułamek właściwy</i> ma w liczniku liczbę mniejszą niż w mianowniku. Każdy ułamek niewłaściwy można zapisać w postaci <i>liczby mieszanej</i>, 
			czyli składającej się z części całkowitej i ułamkowej. Np. $\frac{7}{3} = 2 \frac{1}{3}$ ponieważ dzieląc siedem obiektów na trzy równe grupy, 
			dostaniemy na każdej z nich dwa całe przedmioty i jeden rozdzielony na trzy.
		</p>

		<center><img src="./.images/Screenshot_2.png" align="middle"></center>

		<p>
			Aby wyciągnąć całości z ułamka niewłaściwego (czyli zapisać go w postaci liczby mieszanej) wykonujemy dzielenie z resztą: $\frac{17}{5} = 3 \frac{2}{5}$, 
			ponieważ $17 : 5 = 3\ r. 2$.
		</p>
		</lesson-chapter>

		<lesson-chapter><template #title>Rozszerzanie i skracanie ułamków</template> 
		<p>
			Gdy podzielimy tort na $8$ kawałków i weźmiemy spośród nich $3$, dostaniemy $\frac{3}{8}$. Gdybyśmy podzielili tort na $16$ kawałków i wzięli 
			spośród nich $6$, dostalibyśmy $\frac{6}{16}$, lecz jest to dokładnie taka sama część tortu. Gdybyśmy podzielili tort na $24$ kawałki i wzięli 
			spośród nich $9$, dostalibyśmy $\frac{9}{24}$ tortu i wciąż jest to taka sama ilość ciasta.
		</p>

		<div class="row">
			<div class="col"><img src="./.images/Screenshot_5.png" align="middle"></div>
			<div class="col"><img src="./.images/Screenshot_6.png" align="middle"></div>
			<div class="col"><img src="./.images/Screenshot_7.png" align="middle"></div>
		</div>

		$$
			\frac{3}{8} = \frac{6}{16} = \frac{9}{24}
		$$

		<p>
			Gdy pomnożymy licznik i mianownik ułamka przez tą samą wartość, jego wartość się nie zmienia. Na podobnej zasadzie jeśli licznik 
			i mianowni ułamka podzielimy przez tą samą wartość, jego wartość nie ulegnie zmianie:
		</p>

		$$
			\frac{4}{8} = \frac{2}{4} = \frac{1}{2}
		$$

		<p>
			Jeśli licznika i mianownika nie da się podzielić przez żadną liczbę (oprócz $1$), to jego postać nazywamy <b>nieskracalną</b>. Aby sprowadzić 
			ułamek do postaci nieskracalnej, należy podzielić jego licznik i mianownik przez ich $NWD$. Dobrze jest sprowadzać ułamki do postaci nieskracalnej, 
			by nie wykonywać obliczeń na niepotrzebnie dużych liczbach.
		</p>

		<p>
			Mając dwa ułamki o różnych mianownikach możemy rozszerzyć obydwa ułamki tak, by ich mianowniki stały się równe. Taka operacja nazywa się 
			<b>sprowadzeniem do wspólnego mianownika</b>. Po sprowadzeniu ułamków $\frac{4}{5}$ i $\frac{3}{4}$ do wspólnego mianownika dostaniemy 
			$\frac{16}{20}$ i $\frac{15}{20}$.
		</p>
		</lesson-chapter>

		<lesson-chapter><template #title>Dodawanie i odejmowanie ułamków</template> 
		<p>
			Aby dodać/odjąć dwa ułamki, sprowadzamy je do wspólnego mianownika, a następnie dodajemy/odejmujemy ich liczniki. 
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
  name: "UlamkiZwykleShort",
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
