<template>
    <lesson routeShortVersion="/dzielenie-short" routeLongVersion="/dzielenie">
        <lesson-title-short>Dzielenie</lesson-title-short>    
        
        <lesson-chapter><template #title>Co to znaczy</template> 
        <p>
			Dzielenie polega na rozkładaniu jednej liczby na kilka równych liczb. Gdybyśmy chcieli rozłożyć $20$ kulek na $4$ równe grupki,
			otrzymalibyśmy po $5$ kulek na grupę.
		</p>

		<div class="row align-items-center">
			<div class="col-3">
				Przed uporządkowaniem:
			</div>
			<div class="col">
				<p style="text-align: center">
					<svg height="200" width="650">
						<defs>
							<linearGradient id="gradient">
								<stop offset="20%" stop-color="#C33" />
								<stop offset="90%" stop-color="#833" />
							</linearGradient>
						</defs>
						<circle cx="20" cy="110" r="20" class = "draggable"></circle>
						<circle cx="270" cy="80" r="20" class = "draggable"></circle>
						<circle cx="350" cy="100" r="20" class = "draggable"></circle>
						<circle cx="300" cy="40" r="20" class = "draggable"></circle>
						<circle cx="180" cy="180" r="20" class = "draggable"></circle>
						<circle cx="580" cy="120" r="20" class = "draggable"></circle>
						<circle cx="530" cy="70" r="20" class = "draggable"></circle>
						<circle cx="470" cy="20" r="20" class = "draggable"></circle>
						<circle cx="220" cy="160" r="20" class = "draggable"></circle>
						<circle cx="310" cy="130" r="20" class = "draggable"></circle>
						<circle cx="480" cy="160" r="20" class = "draggable"></circle>
						<circle cx="590" cy="70" r="20" class = "draggable"></circle>
						<circle cx="20" cy="40" r="20" class = "draggable"></circle>
						<circle cx="150" cy="60" r="20" class = "draggable"></circle>
						<circle cx="210" cy="100" r="20" class = "draggable"></circle>
						<circle cx="150" cy="140" r="20" class = "draggable"></circle>
						<circle cx="410" cy="150" r="20" class = "draggable"></circle>
						<circle cx="240" cy="30" r="20" class = "draggable"></circle>
						<circle cx="610" cy="150" r="20" class = "draggable"></circle>
						<circle cx="60" cy="120" r="20" class = "draggable"></circle>
					</svg>
				</p> 
			</div>
		</div>
		
		<br>

		<div class="row align-items-center">
			<div class="col-3">
				Po uporządkowaniu na cztery sterty:
			</div>
			<div class="col">
				<table class="center">
					<tr>
						<td>
							<svg height="180" width="150">
								<circle cx="51" cy="30" r="20" class = "draggable"></circle>
								<circle cx="109" cy="32" r="20" class = "draggable"></circle>
								<circle cx="56" cy="94" r="20" class = "draggable"></circle>
								<circle cx="107" cy="91" r="20" class = "draggable"></circle>
								<circle cx="76" cy="147" r="20" class = "draggable"></circle>
							</svg>
						</td>
						<td>
							<svg height="180" width="150">
								<circle cx="51" cy="31" r="20" class = "draggable"></circle>
								<circle cx="109" cy="33" r="20" class = "draggable"></circle>
								<circle cx="56" cy="92" r="20" class = "draggable"></circle>
								<circle cx="107" cy="93" r="20" class = "draggable"></circle>
								<circle cx="76" cy="144" r="20" class = "draggable"></circle>
							</svg>
						</td>
						<td>
							<svg height="180" width="150">
								<circle cx="51" cy="33" r="20" class = "draggable"></circle>
								<circle cx="109" cy="31" r="20" class = "draggable"></circle>
								<circle cx="56" cy="95" r="20" class = "draggable"></circle>
								<circle cx="107" cy="93" r="20" class = "draggable"></circle>
								<circle cx="76" cy="143" r="20" class = "draggable"></circle>
							</svg>
						</td>
						<td>
							<svg height="180" width="150">
								<circle cx="51" cy="30" r="20" class = "draggable"></circle>
								<circle cx="109" cy="31" r="20" class = "draggable"></circle>
								<circle cx="56" cy="92" r="20" class = "draggable"></circle>
								<circle cx="107" cy="93" r="20" class = "draggable"></circle>
								<circle cx="76" cy="141" r="20" class = "draggable"></circle>
							</svg>
						</td>
					</tr>
				</table>
			</div>
		</div>
		<br>
		$$
			20 : 4 = 5
		$$
		
		<p>
			Powyższy zapis oznacza, że gdy liczbę $20$ rozłożymy na $4$ równe części, każda z nich będzie miała wartość $5$. Symbol $:$
			czytamy jako "podzielić na" lub "dzielone przez". Równoważny jest zapis $20\ /\ 4 = 5$ lub $20 ÷ 4 = 5$.
		</p>
		</lesson-chapter>

        <lesson-chapter><template #title>Dzielenie to odwrotność mnożenia</template>
		<p>
			Gdy chcemy poznać wynik dzielenia $28 : 7$, zadajemy sobie pytanie: kiedy rozłożę $28$ na $7$ grup, to jaką liczność będzie miała każda 
			z tych grup? Równoważnie moglibyśmy spytać: $7$ razy ile daje wyniku $28$? lub inaczej:
			przez co należy pomnożyć $7$, aby otrzymać $28$? Odpowiedzią jest $4$. 
		</p>
		
		$$
			28 : 7 = 4 \ \ \text{ bo }\ \  4 \cdot 7 = 28
		$$
		</lesson-chapter>

		<lesson-chapter><template #title>Dzielenie przez zero</template>
		<p>
			Bardzo problematyczne w matematyce jest dzielenie przez liczbę $0$. Co właściwie miałoby oznaczać $18 : 0$? Łatwo wyobrazić sobie, co 
			znaczy podzielenie $18$ kulek na trzy równe grupy, na dwie grupy, albo na jedną grupę. Ale co ocznacza podzielenie na zero grup? Ile kulek 
			miałoby się znaleźć na każdej stercie, kiedy nie ma żadnej sterty? Dzielenie przez zero jest <b>niewykonalne</b>. W pewnym sensie zakazane.
			Wynika to choćby z faktu, że dzielenie jest odwrotnością mnożenia: $18 : 0$ nie ma wartości, ponieważ $0 \cdot {\bf \text{cokolwiek}} = 0$.
		</p>
		</lesson-chapter>

		<lesson-chapter><template #title>Dzielenie z resztą</template>
		<p>
			Wynik dzielenia nie zawsze jest liczbą naturalną. O ile przykłady $12 : 3 = 4$ albo $28 : 4 = 7$ dają się wykonać dość łatwo, tak
			dzielenie $7 : 3$ nie daje oczywistego wyniku - nie da się rozłożyć liczby $7$ na $3$ równe liczby naturalne.
		</p>

		<table class="center">
			<tr>
				<td>
					<svg height="150" width="100">
						<circle cx="50" cy="50" r="20" class = "draggable"></circle>
						<circle cx="50" cy="100" r="20" class = "draggable"></circle>
					</svg>
				</td>
				<td>
					<svg height="150" width="100">
						<circle cx="50" cy="50" r="20" class = "draggable"></circle>
						<circle cx="50" cy="100" r="20" class = "draggable"></circle>
					</svg>
				</td>
				<td>
					<svg height="150" width="100">
						<circle cx="50" cy="50" r="20" class = "draggable"></circle>
						<circle cx="50" cy="100" r="20" class = "draggable"></circle>
					</svg>
				</td>
			</tr>
			<tr>
				<td colspan ="3">
					<svg height="50" width="300">
						<circle cx="150" cy="25" r="20" class = "draggable"></circle>
					</svg>
				</td>
			</tr>
		</table>

		<p>
			W takiej sytuacji mówimy, że została nam reszta. W siódemce mieszczą się trzy dwójki, a poza tym zostaje samotna jedynka, która nie daje się już 
			podzielić na trzy części. Zapiszemy to w taki sposób: 
		</p>
		
		$$
			7 : 3 = 2\ r. 1
		$$
		</lesson-chapter>

        <lesson-chapter><template #title>Jak się dzieli</template>
        <p>
			Aby obliczyć wynik dzielenia małych liczb warto mieć na uwadze, że dzielenie jest odwrotnością mnożenia - można wtedy korzystać z
			tabliczki mnożenia. Aby obliczyć $72 : 8$, zlokalizuj kolumnę o nazwie "$8$" i znajdź 
			w niej pole z wartością $72$. Wiersz, w którym znajduje się ta liczba: $9$ stanowi wynik dzielenia.
		</p>

		<operation-table :defaultLoperand="8" :defaultRoperand="9" 
    :f="function(a,b){return a*b}" :print="function(a,b,c){return a > 0 ? c + ' : ' + a + ' = ' + b : '0 : 0 nie ma wartości'}"></operation-table>

		<p>
			Dla większych liczb stosuje się metodę <i>dzielenia w słupku</i>, zwaną też <i>dzieleniem pisemnym</i>. 
			Wpisz poniżej liczby do podzielenia, np. $700893 : 12$
		</p>

    <columnar-operation :operation="'division'" :floats="false"></columnar-operation>
		
    </lesson-chapter>

		<lesson-chapter><template #title>Nowe pojęcia</template>
		<p>
            Gdy wykonujemy dzielenie, liczbę, od której dzielimy (po lewej), nazywamy <b>dzielną</b>, a liczbę, którą odejmujemy (po prawej), nazywamy 
			<b>dzielnikiem</b>. Wynik odejmowania to <b>iloraz</b>. W działaniu $42 : 6 = 7$ dzielną jest $42$, dzielnikiem jest $6$, a różnicą $7$.
        </p>

		$$
			\text{dzielna} : \text{dzielnik} = \text{iloraz}
		$$

		<p>
			<b>Reszta z dzielenia</b> to niepodzielna cząstka, która pozostaje przy próbie obliczenia ilorazu. Jest to taka liczba, że gdyby pomniejszyć o 
			nią dzielną, udałoby się wykonać dzielenie bez problemu i otrzymać w wyniku liczbę naturalną. W działaniu $14 : 4 = 3 r. 2$ liczba $2$ jest 
			resztą z dzielenia, ponieważ w czternastce mieszczą się trzy czwórki i pozostaje jeszcze niepodzielne $2$.
		</p>
		</lesson-chapter>

    </lesson>
</template>

<script>
import LessonTitleShort from "../../../lesson/LessonTitleShort";
import LessonIntro from "../../../lesson/LessonIntro";
import LessonChapter from "../../../lesson/chapter/LessonChapter";
import Lesson from "../../../lesson/Lesson";
import OperationTable from "../../../utils/OperationTable";
import ColumnarOperation from "../../../utils/columnar_operation/ColumnarOperation";

export default {
  name: "DzielenieShort",
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
