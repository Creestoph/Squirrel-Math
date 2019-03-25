<template>
  <lesson>
    <lesson-title>Mnożenie</lesson-title>

    <lesson-intro>
    <p>
        Początkowo może wydawać się, że mnożenie to trudniejsza forma dodawania. Z czasem przekonasz się, że dodawanie bywa bardziej kłopotliwe od mnożenia. 
        Biblia nakazuje: „Rośnijcie i mnóżcie się, i napełniajcie ziemię”. Nie wyjaśnia niestety, 
        w jaki sposób wykonuje się mnożenie. Postaramy się rozjaśnić wszystkie wątpliwości.
    </p>
    </lesson-intro>

    <lesson-chapter><template #title>Rzędy i kolumny</template>
    <p class = "type">
        Intuicje
    </p>
      
    <p>
        Przyjrzyjmy się łazience pana Janusza. Spoglądając w dół, możemy podziwiać kunszt wykończeń podłogowych oraz harmonię 
        układu płytek ceramicznych. Aby pozwolić Ci cieszyć oczy dłużej, specjalnie dla Ciebie przerysowaliśmy kafelki 
        poniżej: 
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
        Matematyczna rządza poznawania świata skłania nas do przemyśleń: z ilu kafelków składa się podłoga pana Janusza? 
        Możemy policzyć wszystkie kafelki po kolei i dojść do wniosku, że jest ich $24$. Możemy też zauważyć, że kafelki 
        rozłożone są na równe rzędy i kolumny: mamy $4$ rzędy, a w każdym z nich $6$ kafelków. 
    </p>

    <br>
    <table class = "tiles center">
        <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    </table>
    <br>
    <table class = "tiles center">
        <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    </table>
    <br>
    <table class = "tiles center">
        <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    </table>
    <br>
    <table class = "tiles center">
        <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    </table>
    <br>
  
    <p>
        Łączną liczbę kafelków można więc zapisać jako $6 + 6 + 6 + 6 = 24$. Matematyków boli ręka od pisania czterokrotnie 
        liczby $6$, więc użyją krótszej formy:
    </p>
      
    $$
        4 \cdot 6 = 24
    $$
      
    <p>
        Czasami w nieprofesjonalnych źródłach możesz znaleźć też zapis
    </p>
      
    <p style="text-align: center">
        $4 × 6 = 24$<br>
        lub<br>
        $4 \text{ * } 6 = 24$<br>
    </p>
      
    <p>
        Trzymajmy się jednak <span class="comment" id="Chciałeś coś powiedzieć?">jedynej słusznej metody</span> i używajmy symbolu $\cdot$ na określenie mnożenia. 
		Kropkę tę czytamy jako „razy”. Zapis $4 \cdot 6$ (cztery razy sześć) mówi tyle, że należy cztery razy dodać do siebie szóstkę. Można więc 
        zapisać
    </p>
      
    $$
        4 \cdot 6 = 6 + 6 + 6 + 6 = 24
    $$
      
    <p>
        Motyw mnożenia pozwoliliśmy sobie przemycić już w temacie o dodawaniu:
    </p>

    <p class="problem" style="text-align: center">
        Jeśli 5 razy w ciągu dnia wypijesz dwie <span class="comment" id="soku">szklaneczki</span>, to łącznie wypijesz 10 szklaneczek.
    </p>
    
    <b>
        $$
            \bf{2 + 2 + 2 + 2 + 2 = 10}
        $$
    </b>

    <p>
        Dzięki potężnym narzędziom, którymi teraz władamy, <span class="comment" id="Od razu chce się żyć.">możemy zastosować krótszy zapis</span>:
    </p>
      
    $$
        5  \cdot 2 = 10
    $$

	<div class="example">
		Jeśli każda z $10$ owiec zjada $3$ marchewki dziennie, to pasterz musi dostarczać $30$ marchewek na dzień.
		$$3 + 3 + 3 + 3 + 3 + 3 + 3 + 3 + 3 + 3 = 10  \cdot 3 = 30$$
	</div>

	<div class="example">
		<span class="comment" id="to będziesz gruby. Po prostu.">Jeśli rano, w południe i wieczorem zjesz po $4$ pączki</span>, to w ciągu dnia zjesz $12$ pączków.
		$$4 + 4 + 4 = 3  \cdot 4 = 12$$
	</div>

	<div class="example">
		Tydzień ma $7$ dni, a każdy dzień to $24$ godziny. W takim razie w ciągu tygodnia upływa $168$ godzin.
		$$24 + 24 + 24 +24 + 24 + 24 + 24 = 7  \cdot 24 = 168$$
	</div>
    </lesson-chapter>

    <lesson-chapter><template #title>Nazewnictwo</template> 
    <p class = "type">
        Intuicje
    </p>
      
    <p>
        W dodawaniu mieliśmy do czynienia ze składnikami, które dawały razem sumę. W przypadku mnożenia mówimy o <i>czynnikach</i>, 
        które po wymnożeniu dają wynik, czyli <i>iloczyn</i>.
    </p>
      
    $$
        \text{czynnik}  \cdot \text{czynnik} = \text{iloczyn}
    $$
        
    <ul>
        <li>W działaniu $5  \cdot 6 = 30$ czynnikami są $5$ i $6$, a wynikiem (iloczynem) $30$.</li>
        <li>W działaniu $24 = 12  \cdot 2$ czynnikami są $12$ i $2$, a wynikiem (iloczynem) $24$.</li>
        <li>W działaniu $2  \cdot 3  \cdot 4 = 24$ czynnikami są $2$, $3$ i $4$, a wynikiem (iloczynem) 
		$24$.</li>
    </ul>
    </lesson-chapter>

    <lesson-chapter><template #title>Własności mnożenia</template> 
    <p class = "type">
        Rozszerzenie
    </p>
      
    <p>
        Mamy przyjemność ponownie wkroczyć do łazienki pana Janusza.
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
        Poczyniliśmy słuszne spostrzeżenie, że <span class="comment" id="Wiemy, że rozbijanie kafli to dobra rzecz, ale nie praktykuj tego w domu.">
		$24$ kafelki można rozbić</span> na $4$ rzędy po $6$ kafli i zapisać 
    </p>
      
    $$
        24 = 4  \cdot 6
    $$

    <p>
        Równie dobrze jednak możemy spojrzeć na kafle jako na $6$ kolumn po $4$ kafle.
    </p>
      
    <br>
    <table class = "tiles center">
        <tr>
            <td></td><td style = "background: white; width: 20px; border-top: none; border-bottom:none;"></td>
            <td></td><td style = "background: white; width: 20px; border-top: none; border-bottom:none;"></td>
            <td></td><td style = "background: white; width: 20px; border-top: none; border-bottom:none;"></td>
            <td></td><td style = "background: white; width: 20px; border-top: none; border-bottom:none;"></td>
            <td></td><td style = "background: white; width: 20px; border-top: none; border-bottom:none;"></td>
            <td></td>
        </tr>
        <tr>
            <td></td><td style = "background: white; width: 20px; border-top: none; border-bottom:none;"></td>
            <td></td><td style = "background: white; width: 20px; border-top: none; border-bottom:none;"></td>
            <td></td><td style = "background: white; width: 20px; border-top: none; border-bottom:none;"></td>
            <td></td><td style = "background: white; width: 20px; border-top: none; border-bottom:none;"></td>
            <td></td><td style = "background: white; width: 20px; border-top: none; border-bottom:none;"></td>
            <td></td>
        </tr>
        <tr>
            <td></td><td style = "background: white; width: 20px; border-top: none; border-bottom:none;"></td>
            <td></td><td style = "background: white; width: 20px; border-top: none; border-bottom:none;"></td>
            <td></td><td style = "background: white; width: 20px; border-top: none; border-bottom:none;"></td>
            <td></td><td style = "background: white; width: 20px; border-top: none; border-bottom:none;"></td>
            <td></td><td style = "background: white; width: 20px; border-top: none; border-bottom:none;"></td>
            <td></td>
        </tr>
        <tr>
            <td></td><td style = "background: white; width: 20px; border-top: none; border-bottom:none;"></td>
            <td></td><td style = "background: white; width: 20px; border-top: none; border-bottom:none;"></td>
            <td></td><td style = "background: white; width: 20px; border-top: none; border-bottom:none;"></td>
            <td></td><td style = "background: white; width: 20px; border-top: none; border-bottom:none;"></td>
            <td></td><td style = "background: white; width: 20px; border-top: none; border-bottom:none;"></td>
            <td></td>
        </tr>
    </table>
    <br>
  
    <p>
        W takim razie 
    </p>
      
    $$
        24 = 6  \cdot 4
    $$

    <p>
        Co więcej, możemy spełnić swoje dzikie fantazje i stworzyć łazienkę o dowolnych wymiarach, czyli mającą dowolną ilość 
        rzędów i kolumn kafli. Za każdym prawdą będzie, że 
    </p>
        
    <p style="text-align: center">
        $\text{ilość kafli} = \text{ilość rzędów}  \cdot \text{ilość kolumn}$<br>
        albo<br>
        $\text{ilość kafli} = \text{ilość kolumn}  \cdot \text{ilość rzędów}$<br>
    </p>
        
    <p>
        Nie ma znaczenia, w jakiej kolejności zapiszemy czynniki. W takim razie mnożenie jest przemienne.
    </p>
      
    <p>  
        Możemy zauważyć jeszcze jedną cechę mnożenia. W tym celu zaszalejemy i stworzymy trzy łazienki.
    </p>
      
    <br>
    <table class = "tiles center">
        <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    </table>
    <br>
    <table class = "tiles center">
        <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    </table>
    <br>
    <table class = "tiles center">
        <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    </table>
    <br>

    <p>
        Jeśli chcemy policzyć wszystkie kafle w tych trzech łazienkach, możemy najpierw policzyć, ile jest kafli w jednej 
        łazience, a potem stwierdzić, że w $3$ łazienkach jest ich $3$ razy więcej. 
    </p>
      
    <p style="text-align: center">
        $4  \cdot 6 = 24$<br>
        $3  \cdot 24 = 72$
    </p>
      
    <p>
        Możemy też spojrzeć na problem inaczej: możemy potraktować te trzy łazienki jak jedną dużą, która ma $3$ razy więcej 
        rzędów kafli. W takiej łazience mamy $3  \cdot 4 = 12$ rzędów oraz $6$ kolumn kafli, czyli razem $12  \cdot 6 = 72$ kafle.
    </p>
      
    <p>
        Tak więc działanie $3  \cdot 4  \cdot 6$ można wykonać na dwa sposoby: najpierw mnożąc $3$ i $4$, a potem wynik przez $6$, 
        albo najpierw mnożąc $4$ i $6$, a wynik przez $3$. Oznacza to, że mnożenie jest łączne.
    </p>
    </lesson-chapter>

    <lesson-chapter><template #title>Mnożenie w słupku</template> 
    <p class = "type">
        Warsztat
    </p>
      
    <p>
        Gdy przyjdzie Ci wymnożyć dwie liczby, np. $6  \cdot 8$, zawsze możesz przedstawić mnożenie jako sumę:
    </p>
      
    $$
        6 \cdot 8 = 8 + 8 + 8 + 8 + 8 + 8
    $$
      
    <p>
        i obliczyć wynik przez dodawanie kolejnych składników:
    </p>
      
    <p style="text-align: center">
        $6 \cdot 8 =  8 + 8 + 8 + 8 + 8 + 8 = 16 + 8 + 8 + 8 + 8 = 24 + 8 + 8 + 8 = 32 + 8 + 8 = 40 + 8 = 48$
    </p>
      
    <p>
        Metoda ta zawsze jest poprawna, jednak cokolwiek pracochłonna. Zapewniamy, że w swojej karierze matematycznej mnożenie 
        będziesz napotykał na każdym kroku. Z tego powodu przynajmniej mnożenie liczb jednocyfrowych dobrze jest <span class="comment" id=" wkuć">opanować</span>
        na wysokim poziomie. Podstawą każdego wprawnego <span class="comment" id="gościa co dobrze liczy">rachmistrza</span> jest <i>tabliczka mnożenia</i>, 
		  która działa bardzo podobnie do tabliczki dodawania.
    </p>
      
    <br>
    <table class="operation_table center">
        <tr><th> </th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th></tr>
        <tr><th>0</th><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>
        <tr><th>1</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td></tr>
        <tr><th>2</th><td>0</td><td>2</td><td>4</td><td>6</td><td>8</td><td>10</td><td>12</td><td>14</td><td>16</td><td>18</td></tr>
        <tr><th>3</th><td>0</td><td>3</td><td>6</td><td>9</td><td>12</td><td>15</td><td>18</td><td>21</td><td>24</td><td>27</td></tr>
        <tr><th>4</th><td>0</td><td>4</td><td>8</td><td>12</td><td>16</td><td>20</td><td>24</td><td>28</td><td>32</td><td>36</td></tr>
        <tr><th>5</th><td>0</td><td>5</td><td>10</td><td>15</td><td>20</td><td>25</td><td>30</td><td>35</td><td>40</td><td>45</td></tr>
        <tr><th>6</th><td>0</td><td>6</td><td>12</td><td>18</td><td>24</td><td>30</td><td>36</td><td>42</td><td>48</td><td>54</td></tr>
        <tr><th>7</th><td>0</td><td>7</td><td>14</td><td>21</td><td>28</td><td>35</td><td>42</td><td>49</td><td>56</td><td>63</td></tr>
        <tr><th>8</th><td>0</td><td>8</td><td>16</td><td>24</td><td>32</td><td>40</td><td>48</td><td>56</td><td>64</td><td>72</td></tr>
        <tr><th>9</th><td>0</td><td>9</td><td>18</td><td>27</td><td>36</td><td>45</td><td>54</td><td>63</td><td>72</td><td>81</td></tr>
    </table>
    <br> 
      
    <p>
        Aby znaleźć odpowiedź na pytanie, ile wynosi $6  \cdot 8$, szukamy kolumny zatytułowanej „$6$” oraz wiersza zatytułowanego „$8$” 
        i  odczytujemy wynik $48$ na ich przecięciu.
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
        Ponieważ mnożenie jest przemienne, równie dobrze możemy znaleźć kolumnę zatytułowaną „$8$” i wiersz zatytułowany „$6$”.
    </p>
      
    <p>
        Gdy chcemy wykonać mnożenie większych liczb, możemy skorzystać z metody <i>mnożenia w słupku</i> 
        (<i>mnożenia pisemnego</i>). 
    </p>
    
    <div class="example">
        <p>
            Spróbujmy pomnożyć $134$ przez $2$. Zaczynamy tak, jak przy dodawaniu w słupku: zapisujemy 
            obydwie liczby jedna pod drugą z wyrównaniem do prawej i podkreślamy.
        </p>
        
        <columnar-operation-table :operation='""' :numbers='[["1", "1", "1", ""], ["", "2", "5", "6"], ["", "9", "4", "7"], ["", "2", "0", "3"]]'></columnar-operation-table>

        <div id="columnar_multiplication_1">
        </div>
        <LOL>
            Display_table.create_custom([["", "", "1", "3", "4"], ["/u:\\cdot", "/u:", "/u:", "/u:", "/u:2"], ["", "", "", "", ""]]).print("columnar_multiplication_1");
        </LOL>
        
        <p>
            Teraz mnożymy kolejne cyfry górnej liczby przez $2$ i wynik zapisujemy pod kreską. 
            <ul>
                <li>$4  \cdot 2 = 8$, więc pod $4$ piszemy $8$</li>
                <li>$3  \cdot 2 = 6$, więc pod $3$ piszemy $6$</li>
                <li>$1  \cdot 2 = 2$, więc pod $1$ piszemy $2$</li>
            </ul>
        </p>
        
        <div id="columnar_multiplication_2">
        </div>
        <LOL>
            Display_table.create_custom([["", "", "1", "3", "4"], ["/u:\\cdot", "/u:", "/u:", "/u:", "/u:2"], ["", "", "2", "6", "8"]]).print("columnar_multiplication_2");
        </LOL>
    </div>

    <div class="example">
        <p>
            To był najprostszy przypadek mnożenia. Teraz dajmy się ponieść mnożeniu przez liczbę większą niż jednocyfrową: 
            $302  \cdot 213$
        </p>
        
        <div id="columnar_multiplication_3">
        </div>
        <LOL>
            Display_table.create_custom([["", "", "3", "0", "2"], ["/u:\\cdot", "/u:", "/u:2", "/u:1", "/u:3"], ["", "", "", "", ""]]).print("columnar_multiplication_3");
        </LOL>
        
        <p>
            Zaczynamy od mnożenia górnej liczby przez cyfrę jedności dolnej.
            <ul>
                <li>$2  \cdot 3 = 6$, więc pod $2$ piszemy $6$</li>
                <li>$0  \cdot 3 = 0$, więc pod $0$ piszemy $0$</li>
                <li>$3  \cdot 3 = 9$, więc pod $3$ piszemy $9$</li>
            </ul>
        </p>
    
        <div id="columnar_multiplication_4">
        </div>
        <LOL>
            Display_table.create_custom([["", "", "3", "0", "2"], ["/u:\\cdot", "/u:", "/u:2", "/u:1", "/u:3"], ["", "", "9", "0", "6"]]).print("columnar_multiplication_4");
        </LOL>
            
        <p>
            Teraz będziemy mnożyć górną liczbę przez cyfrę dziesiątek dolnej. Wynik będziemy zapisywać pod poprzednim wynikiem, 
            dodatkowo z przesunięciem o jedną cyfrę w lewo.
            <ul>
                <li>$2  \cdot 1 = 2$, więc wynik $2$ piszemy pod dwójką z przesunięciem w lewo.</li>
                <li>$0  \cdot 1 = 0$, więc wynik $0$ piszemy pod zerem z przesunięciem w lewo.</li>
                <li>$3  \cdot 1 = 3$, więc wynik $3$ piszemy pod trójką z przesunięciem w lewo</li>
            </ul>
        </p>
    
        <div id="columnar_multiplication_5">
        </div>
        <LOL>
            Display_table.create_custom([["", "", "3", "0", "2"], ["/u:\\cdot", "/u:", "/u:2", "/u:1", "/u:3"], ["", "", "9", "0", "6"], ["", "3", "0", "2", ""]]).print("columnar_multiplication_5");
        </LOL>
    
        <p>
            Konsekwentnie mnożymy górną liczbę przez cyfrę setek dolnej. Wynik zapisujemy pod poprzednim z przesunięciem o dwie 
            cyfry w lewo.
            <ul>
                <li>$2  \cdot 2 = 4$, więc wynik $4$ piszemy pod dwójką z podwójnym przesunięciem w lewo.</li>
                <li>$0  \cdot 2 = 0$, więc wynik $0$ piszemy pod zerem z podwójnym przesunięciem w lewo.</li>
                <li>$3  \cdot 2 = 6$, więc wynik $6$ piszemy pod trójką z podwójnym przesunięciem w lewo.</li>
            </ul>
        </p>

        <div id="columnar_multiplication_6">
        </div>
        <LOL>
            Display_table.create_custom([["", "", "3", "0", "2"], ["/u:\\cdot", "/u:", "/u:2", "/u:1", "/u:3"], ["", "", "9", "0", "6"], ["", "3", "0", "2", ""], ["6", "0", "4", "", ""]]).print("columnar_multiplication_6");
        </LOL>
    
        <p>
            Najgorsze za nami. Teraz wszystkie trzy otrzymane wyniki musimy do siebie dodać. Robimy to znaną nam już metodą 
            dodawania w słupku.
            <ul>
                <li>$6$ występuje samodzielnie, więc przepisujemy ją bez zmian.</li>
                <li>$0 + 2 = 2$, więc pod zerem i dwójką piszemy 2.</li>
                <li>$9 + 0 + 4 = 13$. Wynik $13$ rozbijamy: pod $9$, $0$ i $4$ piszemy trójkę, 
                zaś jedynkę przenosimy do następnej kolumny. 
                Dla przejrzystości zapisu nie będziemy jej zapisywać, miejmy ją w pamięci.</li>
                <li>$1 + 3 + 0 = 4$. Pod trójką i zerem zapisujemy $4$. Jeśli masz wątpliwości, skąd wzięło się $1$ na początku tego 
                dodawania, przeczytaj jeszcze raz poprzedni punkt.</li>
                <li>$6$ występuje samodzielnie, więc przepisujemy ją bez zmian.</li>
            </ul>
        </p>
    
        <div id="columnar_multiplication_7">
        </div>
        <LOL>
            Display_table.create_custom([["", "", "", "", "3", "0", "2"], ["/u:\\cdot", "/u:", "/u:", "/u:", "/u:2", "/u:1", "/u:3"], ["", "", "", "", "9", "0", "6"], ["", "", "", "3", "0", "2", ""], ["/u:+", "/u:", "/u:6", "/u:0", "/u:4", "/u:", "/u:"], 
            ["", "", "6", "4", "3", "2", "6"]]).print("columnar_multiplication_7");
        </LOL>
    
        <p>
            Otrzymaliśmy wynik $64326$. Zasłużyłeś na nagrodę.
        </p>
    </div>
    
    <div class="example">
        <p>
            Będzie nią mnożenie liczb $629$ i $204$.
        </p>

        <div id="columnar_multiplication_8">
        </div>
        <LOL>
            Display_table.create_custom([["", "", "6", "2", "9"], ["/u:\\cdot", "/u:", "/u:2", "/u:0", "/u:4"], ["", "", "", "", ""]]).print("columnar_multiplication_8");
        </LOL>
    
        <p>
            Zaczynamy od mnożenia górnej liczby przez $4$. Mnożymy $9  \cdot 4$ i otrzymujemy $36$. Sytuacja problematyczna, bo 
            obydwu cyfr nie zapiszemy pod kreską. Robimy podobnie jak w przypadku dodawania – rozbijamy $36$ na $3$ oraz $6$, z 
            czego $6$ piszemy jako wynik, zaś $3$ przenosimy do następnej kolumny.
        </p>
    
        <div id="columnar_multiplication_9">
        </div>
        <LOL>
            Display_table.create_custom([["/c:", "/c:", "/c:", "/c:3", "/c:"], ["", "", "6", "2", "9"], ["/u:\\cdot", "/u:", "/u:2", "/u:0", "/u:4"], ["", "", "", "", "6"]]).print("columnar_multiplication_9");
        </LOL>
    
        <p>
            Teraz mnożymy $2 \cdot 4 = 8$. Trójkę, którą sobie zanotowaliśmy, dodajemy teraz do wyniku. Dostajemy $11$. Ponieważ 
            znowu wynik jest dwucyfrowy, rozbijamy go na dwie cyfry: pod kreską piszemy $1$ i przenosimy $1$ do następnej kolumny.
        </p>
    
        <div id="columnar_multiplication_10">
        </div>
        <LOL>
            Display_table.create_custom([["/c:", "/c:", "/c:1", "/c:3", "/c:"], ["", "", "6", "2", "9"], ["/u:\\cdot", "/u:", "/u:2", "/u:0", "/u:4"], ["", "", "", "1", "6"]]).print("columnar_multiplication_10");
        </LOL>
    
        <p>
            Mnożymy $6 \cdot 4 = 24$. Do wyniku dodajemy zanotowaną jedynkę i dostajemy $25$. Wynik rozbijamy na $2$ i $5$.
        </p>
    
        <div id="columnar_multiplication_11">
        </div>
        <LOL>
            Display_table.create_custom([["/c:", "/c:2", "/c:1", "/c:3", "/c:"], ["", "", "6", "2", "9"], ["/u:\\cdot", "/u:", "/u:2", "/u:0", "/u:4"], ["", "", "5", "1", "6"]]).print("columnar_multiplication_11");
        </LOL>
    
        <p>
            Pomnożyliśmy już wszystkie cyfry przez $4$, ale mamy jeszcze zanotowaną dwójkę, przepisujemy ją jak stoi.
        </p>
    
        <div id="columnar_multiplication_12">
        </div>
        <LOL>
            Display_table.create_custom([["/c:", "/c:2", "/c:1", "/c:3", "/c:"], ["", "", "6", "2", "9"], ["/u:\\cdot", "/u:", "/u:2", "/u:0", "/u:4"], ["", "2", "5", "1", "6"]]).print("columnar_multiplication_12");
        </LOL>

        <p>
            Teraz przechodzimy do mnożenia przez $0$. Większych problemów nie napotykamy, pamiętamy tylko o przesunięciu wyniku w 
            lewo.
        </p>
    
        <div id="columnar_multiplication_13">
        </div>
        <LOL>
            Display_table.create_custom([["/c:", "/c:2", "/c:1", "/c:3", "/c:"], ["", "", "6", "2", "9"], ["/u:\\cdot", "/u:", "/u:2", "/u:0", "/u:4"], ["", "2", "5", "1", "6"], ["", "0", "0", "0", ""]]).print("columnar_multiplication_13");
        </LOL>

        <p>
            Pozostaje nam wymnożyć górną liczbę przez $2$. Obliczmy $9  \cdot 2 = 18$ i wynik dwucyfrowy rozbijamy. $8$ piszemy pod kreską z 
            odpowiednim przesunięciem, a $1$ notujemy w następnej kolumnie. Żeby uniknąć zgrzytów z poprzednimi notatkami, zapiszemy 
            $1$ jeszcze wyżej.
        </p>
    
        <div id="columnar_multiplication_14">
        </div>
        <LOL>
            Display_table.create_custom([["/c:", "/c:", "/c:", "/c:1", "/c:"], ["/c:", "/c:2", "/c:1", "/c:3", "/c:"], ["", "", "6", "2", "9"], ["/u:\\cdot", "/u:", "/u:2", "/u:0", "/u:4"], ["", "2", "5", "1", "6"], 
            ["", "0", "0", "0", ""], ["", "", "8", "", ""]]).print("columnar_multiplication_14");
        </LOL>
    
        <p>
            Mnożymy $2  \cdot 2 = 4$ i dodajemy zanotowaną jedynkę. Dostajemy $5$.
        </p>
    
        <div id="columnar_multiplication_15">
        </div>
        <LOL>
            Display_table.create_custom([["/c:", "/c:", "/c:", "/c:1", "/c:"], ["/c:", "/c:2", "/c:1", "/c:3", "/c:"], ["", "", "6", "2", "9"], ["/u:\\cdot", "/u:", "/u:2", "/u:0", "/u:4"], ["", "2", "5", "1", "6"], 
            ["", "0", "0", "0", ""], ["", "5", "8", "", ""]]).print("columnar_multiplication_15");
        </LOL>
    
        <p>
            Mnożymy $6  \cdot 2 = 12$. Rozbijamy wynik na $1$ i $2$. Zanotowaną jedynkę możemy już przepisać bez zmian.
        </p>
    
        <div id="columnar_multiplication_16">
        </div>
        <LOL>
            Display_table.create_custom([["/c:", "/c:", "/c:1", "/c:", "/c:1", "/c:"], ["/c:", "/c:", "/c:2", "/c:1", "/c:3", "/c:"], ["", "", "", "6", "2", "9"], ["/u:\\cdot", "/u:", "/u:", "/u:2", "/u:0", "/u:4"], ["", "", "2", "5", "1", "6"], 
            ["", "", "0", "0", "0", ""], ["1", "2", "5", "8", "", ""]]).print("columnar_multiplication_16");
        </LOL>

        <p>
            Wszystkie trzy wyniki dodajemy.
        </p>
    
        <div id="columnar_multiplication_17">
        </div>
        <LOL>
            Display_table.create_custom([["/c:", "/c:", "/c:", "/c:", "/c:1", "/c:", "/c:1", "/c:"], ["/c:", "/c:", "/c:", "/c:", "/c:2", "/c:1", "/c:3", "/c:"], ["", "", "", "", "", "6", "2", "9"], ["/u:\\cdot", "/u:", "/u:", "/u:", "/u:", "/u:2", "/u:0", "/u:4"], ["", "", "", "", "2", "5", "1", "6"], 
            ["", "", "", "", "0", "0", "0", ""], ["/u:+", "/u:", "/u:1", "/u:2", "/u:5", "/u:8", "/u:", "/u:"], ["", "", "1", "2", "8", "3", "1", "6"]]).print("columnar_multiplication_17");
        </LOL>
    
        <p>
            No i poznaliśmy prawdę: $629  \cdot 204 = 128 316$. Jesteśmy przekonani, że ta informacja wzbogaciła Twoje życie.
        </p>
    
    </div>

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
  
    <p class = "type optional-hide">
        Rozszerzenie
    </p>
    <p class = "warning">wymagana znajomość tematu: Kolejność wykonywania działań</p>
    <div>
        <p>
            Jeśli ciągle Ci mało, możemy dociec logicznych podstaw mnożenia w słupku. Spójrzmy na sympatyczny przykład 
            $302 \cdot 213$.
        </p>
    
        <p style="text-align: center">
            $302  \cdot 213 =$<br>
            $= 302  \cdot (200 + 10 + 3) =$<br>
            $= (302  \cdot 200) + (302  \cdot 10) + (302  \cdot 3)$<br>
        </p>
    
        <p>
            Już na tym etapie widzimy, że obliczenie $302  \cdot 213$ sprowadza się do wykonania trzech mnożeń dających trzy wyniki, 
            które na koniec należy zsumować. Weźmy każde z nich osobno. Sprowadzają się one do pomnożenia każdej cyfry pierwszego 
            czynnika przez drugi czynnik
        </p>

        <p style="text-align: center">
            $302  \cdot 3 =$<br>
            $= (300 + 0 + 2)  \cdot 3 =$<br>
            $= (300  \cdot 3) + (0  \cdot 3) + (2  \cdot 3) = $<br>
            $= 900 + 0 + 6 =$<br>
            $= 906$<br>
            <br>
            $302  \cdot 10 =$<br>
            $= (300 + 0 + 2)  \cdot 10 =$<br>
            $= (300  \cdot 10) + (0  \cdot 10) + (2  \cdot 10) =$<br>
            $3000 + 0 + 20 =$<br>
            $= 3020$<br>
            <br>
            $302  \cdot 200 =$<br>
            $= (300 + 0 + 2)  \cdot 200 =$<br>
            $= (300  \cdot 200) + (0  \cdot 200) + (2  \cdot 200) =$<br>
            $= 60 000 + 0 + 400 =$<br>
            $= 60 400$
        </p>
    
        <p>
            Otrzymujemy do zsumowania trzy liczby: $906$, $3020$ i $60 400$. Zauważmy, że gdyby chcieć je zsumować sposobem pisemnym, 
            ułożylibyśmy je tak:
        </p>
    
        <div id="columnar_multiplication_18">
        </div>
        <LOL>
            Display_table.create_custom([["", "", "", "", "9", "0", "6"], ["", "", "", "3", "0", "2", "0"], ["/u:+", "/u:", "/u:6", "/u:0", "/u:4", "/u:0", "/u:0"], 
            ["", "", "", "", "", "", ""]]).print("columnar_multiplication_18");
        </LOL>

        <p>
            Przypomnijmy, jak wygląda to sumowanie w całym słupku:
        </p>
    
        <div id="columnar_multiplication_19">
        </div>
        <LOL>
            Display_table.create_custom([["", "", "", "", "3", "0", "2"], ["/u:\\cdot", "/u:", "/u:", "/u:", "/u:2", "/u:1", "/u:3"], ["", "", "", "", "9", "0", "6"], ["", "", "", "3", "0", "2", ""], ["/u:+", "/u:", "/u:6", "/u:0", "/u:4", "/u:", "/u:"], 
            ["", "", "6", "4", "3", "2", "6"]]).print("columnar_multiplication_19");
        </LOL>

        <p>
            Łatwiej teraz zrozumieć, dlaczego każdy kolejny wynik mnożenia zapisywaliśmy z przesunięciem o cyfrę w lewo: mnożenie 
            przez cyfrę dziesiątek daje wynik „$10$ razy większy”, a więc mający jedno zero na końcu; mnożenie przez cyfrę setek 
            daje wynik „$100$ razy większy”, a więc mający dwa zera na końcu. Zer tych nie piszemy, stosujemy za to wymowną przerwę, 
            a wynik ostateczny dostajemy i tak poprawny.
        </p>
    
        <p>
            Kontrowersyjne może się jeszcze wydawać sporządzanie tajemniczych notatek ponad całym słupkiem, które w pewnym 
            momencie należy dodać do wyniku. Weźmy mnożenie $629$ i $204$, a konkretnie rozważmy ten fragment, w którym mnożymy 
            $629  \cdot 4$.
        </p>

        <p style="text-align: center">
            $629  \cdot 4 =$<br>
            $= (600 + 20 + 9)  \cdot 4 =$<br>
            $  = (600  \cdot 4) + (20  \cdot 4) + (9  \cdot 4) =	$<br>
            <span class="comment_visible" id="mnożymy cyfrę jedności przez 4">$  = (600  \cdot 4) + (20  \cdot 4) + 36 =$</span><br>
            <span class="comment_visible" id="rozbijamy wynik na 3 i 6">$  = (600  \cdot 4) + (20  \cdot 4) + 30 + 6 =$</span><br>
            <span class="comment_visible" id="notujemy 3 w następnej kolumnie">$  = (600  \cdot 4) + (20  \cdot 4 + 30) + 6 =$</span><br>
            <span class="comment_visible" id="mnożymy cyfrę dziesiątek przez 4">$  = (600  \cdot 4) + (80 + 30) + 6 =$</span><br>
            <span class="comment_visible" id="dodajemy zanotowane 3">$  = (600  \cdot 4) + 110 + 6 =$</span><br>
            <span class="comment_visible" id="rozbijamy wynik na 1 i 1">$  = (600  \cdot 4) + 100 +10 + 6 =$</span><br>
            <span class="comment_visible" id="notujemy 1 w następnej kolumnie">$  = (600  \cdot 4 + 100) + 10 + 6 =$</span><br>
            <span class="comment_visible" id="mnożymy cyfrę setek przez 4">$  = (2400 + 100) + 10 + 6 =$</span><br>
            <span class="comment_visible" id="dodajemy zanotowane 1">$  = 2500 + 10 + 6 =$</span><br>
            <span class="comment_visible" id="rozbijamy wynik na 2 i 5">$  = 2000 + 500 + 10 + 6 =$</span><br>
            $= 2516$
        </p>
    
        <p class = "type">
            Formalnie
        </p>
            
        <p class = "warning">
            wymagana znajomość tematu: Szeregi liczbowe
        </p>

        <p>
            Formalnie algorytm mnożenia pisemnego przedstawia się następująco. Dane są liczby $a$ i $b$ o reprezentacjach dziesiętnych
            $a = \sum_{j = 0}^{l_a} 10^j a_j, b = \sum_{j = 0}^{l_b} 10^j b_j$, gdzie $l_a, l_b$ oznaczają długość (liczbę cyfr) odpowiednio liczb $a$ i $b$, zaś 
            $a_j, b_j \in \{0, 1, 2, 3, 4, 5, 6, 7, 8, 9\}$.
            Poszukiwana jest reprezentacja dziesiętna ich iloczynu $p = a \cdot b$. Mamy:
        </p>

        $$
            p = a \cdot b = \left(\sum_{j = 0}^{l_a} 10^j a_j \right) \cdot \left(\sum_{j = 0}^{l_b} 10^j b_j \right) = \\
            = 10^0 b_0 \sum_{j = 0}^{l_a} 10^j a_j + 10^1 b_1 \sum_{j = 0}^{l_a} 10^j a_j + 10^2 b_2 \sum_{j = 0}^{l_a} 10^j a_j + \dotsb + 
            10^{l_b} b_{l_b} \sum_{j = 0}^{l_a} 10^j a_j
        $$

        <p>
            Dla każdego $i \in \{0, 1, \dotsc, l_b\}$ oznaczamy $p_i = 10^i b_i \sum_{j = 0}^{l_a} 10^j a_j$ i rozpisujemy:
        </p>

        $$
            p_i = 10^i b_i \left(10^0 a_0 + 10^1 a_1 + 10^2 a_2 + \dotsb + 10^{l_a} a_{l_a} \right) = 10^i \left(10^0 a_0b_i + 10^1 a_1b_i + 10^2 a_2b_i + \dotsb + 10^{l_a} a_{l_a}b_i \right)
        $$

        <p>
            Dokonajmy dzielenia całkowitoliczbowego $a_0b_i$ przez $10$, zapisując iloraz pod $r_{1, i}$ a resztę pod $c_{0, i}$, tzn. 
            $a_0b_i = 10r_{1, i} + c_{0, i}$
        </p>

        $$
            p_i = 10^i \left(10^0 (10r_{1, i} + c_{0, i}) + 10^1 a_1b_i + 10^2 a_2b_i + \dotsb + 10^{l_a} a_{l_a}b_i \right) =
            10^i \left(10^0 c_{0, i} + 10^1 (a_1b_i + r_{1, i}) + 10^2 a_2b_i + \dotsb + 10^{l_a} a_{l_a}b_i \right)
        $$

        <p>
            Ponownie, dokonajmy dzielenia całkowitoliczbowego $a_1b_i + r_{1, i}$ przez $10$: 
            $a_1b_i + r_{1, i} = 10r_{2, i} + c_{1, i}$
        </p>

        $$
            p_i = 10^i \left(10^0 c_{0, i} + 10^1 (10r_{2, i} + c_{1, i}) + 10^2 a_2b_i + \dotsb + 10^{l_a} a_{l_a}b_i \right) =
            10^i \left(10^0 c_{0, i} + 10^1 c_{1, i} + 10^2 (a_2b_i + r_{2, i}) + \dotsb + 10^{l_a} a_{l_a}b_i \right)
        $$

        <p>
            Kontynuując postępowanie indukcyjnie, dostajemy postać $$p_i =
            10^i \left(10^0 c_{0, i} + 10^1 c_{1, i} + 10^2 c_{2, i} + \dotsb + 10^{l_a} c_{l_a, i} + 10^{l_a+1} r_{l_a+1, i} \right)$$
            Rozkładając $r_{l_a+1, i}$ do postaci dziesiętnej, otrzymujemy postać dziesiętną $p_i$. Należy zwrócić uwagę, że $p_i$ jest podzielne przez $10^i$, 
            w związku z czym jej $i$ najmniej znaczących cyfr to zera (odpowiada to przesunięciom w lewo wyników pośrednich mnożenia pisemnego). Ostatecznie
        </p>

        $$
            p = \sum_{i = 0}^{l_b} p_i
        $$

        <p>
            gdzie cyfry zapisuj dziesiętnego każdej z liczb $p_i$ są znane. Zagadnienie sprowadza się do dokonania dodawania pisemnego tych liczb. Formalne 
            omówienie dodawania pisemnego zostało dokonane w temacie <router-link tag="a" :to="'/dodawanie'" class="link">Dodawanie</router-link>.
        </p>
    </div>

    </lesson-chapter>

  </lesson>
</template>

<script>
import LessonTitle from "../../../lesson/LessonTitle";
import LessonIntro from "../../../lesson/LessonIntro";
import LessonChapter from "../../../lesson/chapter/LessonChapter";
import Lesson from "../../../lesson/Lesson";
import ColumnarOperationTable from "../../../utils/columnar_operation_table/ColumnarOperationTable";

export default {
  name: "Mnozenie",
  data() {
    return {
      chapters: []
    };
  },
  components: {
    LessonIntro,
    LessonTitle,
    LessonChapter,
    Lesson,
    ColumnarOperationTable
  }
};
</script>

<style scoped>
</style>
