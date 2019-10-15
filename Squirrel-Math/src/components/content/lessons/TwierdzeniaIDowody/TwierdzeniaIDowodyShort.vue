<template>
    <lesson>
        <lesson-title-short>Twierdzenia i dowody</lesson-title-short>    
        
        <lesson-chapter><template #title>Zapis symboliczny</template> 
				<p> 
					Oznaczenia literowe pojawiają się w matematyce w dowolnym kontekście - zawsze, gdy zajdzie potrzeba wyrażenia uniwersalnych myśli i spostrzeżeń, 
					które są prawdziwe niezależnie od konkretnych liczb.
				</p>

				<ul>
					<li>
						Dodawanie jest przemienne: 
						$
							a+b=b+a
						$
					</li>
					<li>
						Dodawanie jest łączne:
						$
							a+(b+c)=(a+b)+c
						$
					</li>
					<li>
						Mnożenie to wielokrotne dodanie do siebie tej samej liczby: 
						$$
							a \cdot b = \underbrace{a + a + a + \dotsb + a}_b
						$$
					</li>
					<li>
						Każda liczba dzieli się przez jeden:
						$
							1 \mid a
						$
					</li>
					<li>
						Ułamki można rozszerzać i skracać:
						$
							\frac{a}{b}=\frac{a \cdot c}{b \cdot c}
						$
					</li>
					<li>
						Aby pomnożyć ułamki, mnożymy ich liczniki i mianowniki:
						$
							\frac{a}{b} \cdot \frac{c}{d}=\frac{a \cdot c}{b \cdot d}
						$
					</li>
					<li>
						Aby dodać do siebie ułamki, należy sprowadzić je do wspólnego mianownika:
						$
							\frac{a}{b}+\frac{c}{d}=\frac{a \cdot d}{b \cdot d}+\frac{c \cdot b}{d \cdot b}=\frac{a \cdot d+c \cdot b}{b \cdot d}
						$
					</li>
					<li>
						Dzielenie przez ułamek to mnożenie przez jego odwrotność:
						$
							\frac{a}{b}:\frac{c}{d}=\frac{a}{b} \cdot \frac{d}{c}
						$
					</li>
				</ul>
				<p> 
					W każdym z powyższych zapisów symbolicznych można wstawić w miejsce zmiennych $a$, $b$, $c$, $d$ dowolne liczby, a zapiski te będą przedstawiały 
					poprawne stwierdzenie.
				</p>
        </lesson-chapter>			

        <lesson-chapter><template #title>Na czym polega dowód</template> 
				<p> 
					W matematyce właściwie chodzi o dostrzeganie tendencji wśród liczb (i innych przedmiotów zainteresowań matematyki) i zapisywaniu ich 
					za pomocą zwięzłej, uniwersalnej i zrozumiałej formuły. Na bazie kilku przykładów można dokonać spostrzeżenia, które sugeruje, że dla dowolnych 
					liczb $a$ i $b$ zachodzi równość
				</p>

				$$
					a \cdot b=NWD (a,b) \cdot NWW (a,b)
				$$

				<p> 
					Aby uzyskać pewność, że takie stwierdzenie jest zawsze prawdziwe, należy dokonać formalnego <i>dowodu</i>. 
					Na bazie przykładu można dokonać jego uzasadnienia:
				</p>

				<div class="proof">
				<p class="type proof-sticker">Pseudo-dowód</p>
				<p>
					Przypomnijmy sobie, w jaki sposób wyznaczaliśmy  $NWW$ i  $NWD$ liczb. Dokonywaliśmy 
					rozkładu na czynniki pierwsze obydwu liczb:
				</p>

				$$
					120=2 \cdot 2 \cdot 2 \cdot 3 \cdot 5\\
					300=2 \cdot 2 \cdot 3 \cdot 5 \cdot 5
				$$

				<p>
					A następnie wybieraliśmy te czynniki, które pojawiają się w obydwu rozkładach:
				</p>

				$$
					120 = \color{#dd3333}{\bf 2} \cdot \color{#dd3333}{\bf 2} \cdot 2 \cdot \color{#dd3333}{\bf 3} \cdot \color{#dd3333}{\bf 5}\\
					300 = \color{#dd3333}{\bf 2} \cdot \color{#dd3333}{\bf 2} \cdot \color{#dd3333}{\bf 3} \cdot \color{#dd3333}{\bf 5} \cdot 5
				$$
				<p>
					Czynniki, które pojawiają się w obydwu rozkładach, tworzą  $NWD$ tych liczb:
				</p>

				$$
					NWD(120, 300) = \color{#dd3333}{\bf 2} \cdot \color{#dd3333}{\bf 2} \cdot \color{#dd3333}{\bf 3} \cdot \color{#dd3333}{\bf 5} = 60
				$$

				<p>
					A razem z czynnikami pojawiającymi się tylko raz tworzą  $NWW$ tych liczb:
				</p>

				$$
					NWW(120, 300) = \color{#dd3333}{\bf 2} \cdot \color{#dd3333}{\bf 2} \cdot \color{#dd3333}{\bf 3} \cdot \color{#dd3333}{\bf 5} \cdot 2 \cdot 5 = 600
				$$

				<p>
					Dzięki takiemu zapisowi łatwiej zauważyć słuszność naszej hipotezy:
				</p>
				
				$$
					120 \cdot 300 = \color{#dd3333}{\bf 2} \cdot \color{#dd3333}{\bf 2} \cdot 2 \cdot \color{#dd3333}{\bf 3} \cdot \color{#dd3333}{\bf 5} \ \ \ \cdot \ \ \ 
					\color{#dd3333}{\bf 2} \cdot \color{#dd3333}{\bf 2} \cdot \color{#dd3333}{\bf 3} \cdot \color{#dd3333}{\bf 5} \cdot 5 = \\
					= \color{#dd3333}{\bf 2} \cdot \color{#dd3333}{\bf 2} \cdot \color{#dd3333}{\bf 3} \cdot \color{#dd3333}{\bf 5} \ \ \ \cdot \ \ \ 
					\color{#dd3333}{\bf 2} \cdot \color{#dd3333}{\bf 2} \cdot \color{#dd3333}{\bf 3} \cdot \color{#dd3333}{\bf 5} \cdot 2 \cdot 5 =
					NWD(120, 300) \cdot NWW(120, 300)
				$$
				</div>
					
				<p>
					Prawdziwy matematyczny dowód musi jednak przebiegać formalnie - dla ogólnego przypadku, oderwanego od konkretnych liczb $120$ i $300$. Należy 
					przeprowadzić rozumowanie w oparciu o zapis literowy.
				</p>
				
				<div class="proof">
					<p class="type proof-sticker">Dowód</p>
					<p>
						Weźmy dowolne liczby  $a$ i  $b$ i dokonajmy ich rozkładu na czynniki pierwsze. 
						Wybierzmy czynniki pojawiające się w obydwu rozkładach i oznaczmy je jako  $r_1,r_2,r_3,r_4,…,r_k$.
					</p>
					
					<p>
						Możemy zapisać
					</p>
					
					$$
						a = \color{#dd3333}{\bf r_1} \cdot  \color{#dd3333}{\bf r_2} \cdot  \color{#dd3333}{\bf r_3} \cdot … \cdot  \color{#dd3333}{\bf r_k} \cdot p_1 \cdot p_2 \cdot p_3 \cdot … \cdot p_n\\
						b = \color{#dd3333}{\bf r_1} \cdot  \color{#dd3333}{\bf r_2} \cdot  \color{#dd3333}{\bf r_3} \cdot … \cdot  \color{#dd3333}{\bf r_k} \cdot q_1 \cdot q_2 \cdot q_3 \cdot … \cdot q_m
					$$
					
					<p>
						gdzie  $p_1,p_2,p_3,…,p_n$ to pozostałe czynniki występujące w rozkładzie liczby  $a$, 
						zaś  $q_1,q_2,q_3,…,q_m$ to pozostałe czynniki rozkładu  $b$.
					</p>

					<p>
						Ponieważ 
					</p>
					
					$$
						NWD (a,b) = \color{#dd3333}{\bf r_1} \cdot  \color{#dd3333}{\bf r_2} \cdot  \color{#dd3333}{\bf r_3} \cdot … \cdot  \color{#dd3333}{\bf r_k}\\
						NWW (a,b) = \color{#dd3333}{\bf r_1} \cdot  \color{#dd3333}{\bf r_2} \cdot  \color{#dd3333}{\bf r_3} \cdot …  \color{#dd3333}{\bf \cdot r_k} \cdot p_1 \cdot p_2 \cdot p_3 \cdot … \cdot p_n \cdot q_1 \cdot q_2 \cdot q_3 \cdot … \cdot q_m
					$$
					
					<p>
						to
					</p>
					
					$$
						a \cdot b=( \color{#dd3333}{\bf r_1} \cdot  \color{#dd3333}{\bf r_2} \cdot  \color{#dd3333}{\bf r_3} \cdot … \cdot  \color{#dd3333}{\bf r_k} \cdot p_1 \cdot p_2 \cdot p_3 \cdot … \cdot p_n ) \cdot 
						( \color{#dd3333}{\bf r_1} \cdot  \color{#dd3333}{\bf r_2} \cdot  \color{#dd3333}{\bf r_3} \cdot … \cdot  \color{#dd3333}{\bf r_k} \cdot q_1 \cdot q_2 \cdot q_3 \cdot … \cdot q_m )=\\
						=( \color{#dd3333}{\bf r_1} \cdot  \color{#dd3333}{\bf r_2} \cdot  \color{#dd3333}{\bf r_3} \cdot … \cdot  \color{#dd3333}{\bf r_k} ) \cdot 
						( \color{#dd3333}{\bf r_1} \cdot  \color{#dd3333}{\bf r_2} \cdot  \color{#dd3333}{\bf r_3} \cdot … \cdot  \color{#dd3333}{\bf r_k} \cdot p_1 \cdot p_2 \cdot p_3 \cdot … \cdot p_n \cdot q_1 \cdot q_2 \cdot q_3 \cdot … \cdot q_m )=\\
						=NWD (a,b) \cdot NWW (a,b) \ □
					$$
				</div>
        </lesson-chapter>			

        <lesson-chapter><template #title>Czym jest definicja</template> 
				<p>
					Zanim matematyk przystąpi do określania, które twierdzenia są prawdziwe i jak je udowodnić, musi upewnić się, że każde z pojęć, którego używa, 
					zostało wcześniej <i>zdefiniowane</i>. Zanim ocenimy, czy zachodzi równość $120 \cdot 300 = NWD(120, 300) \cdot NWW(120, 300)$, musimy wiedzieć, 
					czym są $NWW$ oraz $NWD$. Musimy również wiedzieć, jak wykonuje się mnożenie liczb naturalnych. 
				</p>
				<p> 
					Zanim zacznie się używać jakiegokolwiek pojęcia, trzeba wyrazić, co ono właściwie oznacza (słownie lub symbolicznie).
					Oto kilka formalnie zapisanych definicji podstaowych pojęć:
				</p>
				<ul>
					<li>
						Poniższy zapis stanowi definicję mnożenia
						$$
							a \cdot b = \underbrace{a + a + a + \dotsb + a}_b
						$$
					</li>
					<li>
						Mówimy, że  $a$ jest podzielne przez  $b$, jeśli  $\frac{a}{b}$ jest liczbą całkowitą.
					</li>
					<li>
						Piszemy, że $a \mid b$ jeśli istnieje liczba całkowita  $c$, dla której  $a=b \cdot c$. 
					</li>
					<li>
						Liczby wymierne definiujemy jako ułamki  $\frac{a}{b}$ gdzie  $a$ oraz  $b$ to 
						liczby całkowite.
					</li>
					<li>
						$NWD(a,b)$ definiujemy jako największą liczbę naturalną  $c$, taką że  $c \mid a$
						oraz  $c \mid b$.
					</li>
					<li>
						$NWW(a,b)$ definiujemy jako najmniejszą liczbę naturalną  $c$, taką że  $a \mid c$ 
						oraz  $b \mid c$.
					</li>
				</ul>

        </lesson-chapter>			

    </lesson>
</template>

<script>
import LessonTitleShort from "../../../lesson/LessonTitleShort";
import LessonIntro from "../../../lesson/LessonIntro";
import LessonChapter from "../../../lesson/chapter/LessonChapter";
import Lesson from "../../../lesson/Lesson";

export default {
  name: "TwierdzeniaIDowodyShort",
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
