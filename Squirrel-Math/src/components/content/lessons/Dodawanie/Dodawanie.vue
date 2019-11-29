<template>
  <lesson routeShortVersion="/dodawanie-short" routeLongVersion="/dodawanie">
    <lesson-title>Dodawanie</lesson-title>

    <lesson-intro>
      <p>
        Zgodnie z obietnicą zaczniemy poznawać <i>operacje</i>, zwane też <i>działaniami</i> na liczbach. „Przeprowadzanie operacji” w matematyce 
        znaczy mniej więcej tyle, co przyrządzanie zupy studenckiej. Wrzucasz dowolne składniki i patrzysz, co wyszło. 
        Przyjrzyjmy się takiej operacji, jak dodawanie liczb naturalnych.
      </p>
    </lesson-intro>

    <lesson-chapter><template #title>Dodawanie, czyli łączenie składników</template>
      <p class = "type">
        Intuicje
      </p>
          
      <p>
        Dodawanie to inaczej łączenie, powiększanie, scalanie mniejszych elementów w większą całość. 
        <comment text="Kulki zostały rzucone">Rozłóżmy na stole kulki.</comment>
      </p>
        
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
        Kulki rozłożyły się na dwie widoczne grupy. W grupie po lewej stronie widzimy dwie kulki. W grupie po prawej stronie są cztery kulki. Kiedy policzymy 
        po kolei wszystkie widoczne kulki, stwierdzimy, że jest ich sześć. Na tym polega właśnie magia dodawania. $2$ kulki oraz $4$ kulki to to samo, 
        co $6$ kulek. 
        Matematycy nie lubią używać zbyt wielu słów, więc zapiszą to spostrzeżenie krócej:
      </p>
        
      $$
        2\ \text{kulki} + 4\ \text{kulki} = 6\ \text{kulek}
      $$
        
      <p>
        Znaczek $+$ rozumiemy jako „oraz”, a znaczek $=$ jako „to to samo, co”. Znaczki te to pierwsze <i>symbole matematyczne</i>, z jakimi masz 
        <comment text="Czujesz ją?">przyjemność</comment> 
        się spotkać. Bardziej profesjonalnie symbol $+$ czytamy jako „dodać”. Mniej profesjonalnie jako „plus”. Symbol $=$ czytamy jako „równa się”. Ma on 
        dużo szerszą i ogólniejszą rolę, niż tylko opowiadanie o łączeniu kulek. Symbol $=$ mówi tyle, że po jego lewej stronie jest dokładnie to samo, co po 
        prawej stronie. Można na przykład zapisać, że 
      </p>
        
      $$
        2\ \text{kulki} = 2\ \text{kulki}
      $$
        
      <p>
        Pytanie tylko po co. Wróćmy lepiej do kulek, żeby oswoić się z nowym zapisem.
      </p>
        
      <p style="text-align: center">
        <svg height="150" width="800">
          <circle cx="280" cy="120" r="20" class = "draggable"></circle>
          <circle cx="190" cy="50" r="20" class = "draggable"></circle>
          <circle cx="540" cy="100" r="20" class = "draggable"></circle>
          <circle cx="600" cy="24" r="20" class = "draggable"></circle>
        </svg>
      </p>  
        
      <p style="margin-bottom: 0">
        Dwie kule po lewej, dwie kule po prawej, razem widzimy $4$ kule.
      </p>
        
      $$
        2\ \text{kule} + 2\ \text{kule} = 4\ \text{kule}
      $$
        
      <p style="text-align: center">
        <svg height="250" width="800">
          <circle cx="140" cy="130" r="20" class = "draggable"></circle>
          <circle cx="90" cy="170" r="20" class = "draggable"></circle>
          <circle cx="80" cy="210" r="20" class = "draggable"></circle>
          <circle cx="340" cy="100" r="20" class = "draggable"></circle>
          <circle cx="370" cy="150" r="20" class = "draggable"></circle>
          <circle cx="400" cy="90" r="20" class = "draggable"></circle>
          <circle cx="310" cy="180" r="20" class = "draggable"></circle>
          <circle cx="640" cy="130" r="20" class = "draggable"></circle>
          <circle cx="700" cy="160" r="20" class = "draggable"></circle>
          <circle cx="580" cy="200" r="20" class = "draggable"></circle>
          <circle cx="690" cy="100" r="20" class = "draggable"></circle>
          <circle cx="580" cy="100" r="20" class = "draggable"></circle>
          <circle cx="670" cy="220" r="20" class = "draggable"></circle>
        </svg>
      </p>  
        
      <p style="margin-bottom: 0">
        Trzy kule po lewej, cztery kule po środku, sześć kul po prawej. Razem $13$ kul.
      </p>
        
      $$
        3\ \text{kule} + 4\ \text{kule} + 6\ \text{kul} = 13\ \text{kul}
      $$
        
      <p>
          Jak już mówiliśmy, liczby w matematyce nie muszą odnosić się do żadnych konkretnych przedmiotów, takich jak kule. 
          Istnieją one niezależnie, po prostu jako liczby. Powyższe przykłady można zapisać ogólniej, bez powiązania z kulami:
      </p>
        
      $$2 + 4 = 6\\
      2 + 2 = 4\\
      3 + 4 + 6 = 13$$
        
      <p>
          Jeśli w trakcie nauki dodawania napotkasz trudności, zawsze możesz wyobrazić lub narysować sobie odpowiedni obrazek z 
          kulkami i policzyć je jedna po drugiej. 
      </p>
        
      <p>
          Dodawanie możemy rozumieć także jako powiększanie jednej liczby o drugą:
      </p>
      
      <div class="example">
        Jeśli pasterz miał dziesięć owiec i 
        postanowił dokupić siedem owiec, to teraz ma siedemnaście owiec.
          
        $$
          10 + 7 = 17
        $$
      </div>
      
      <div class="example">
        <comment text="To ile czasu spędzi w toalecie?">Jeśli pan Janusz zjadł na śniadanie $3$ golonki, na obiad $4$ golonki, a na kolację 
        $2$ golonki,</comment> 
        to w ciągu całego dnia zjadł $9$ golonek.
          
        $$
          3 + 4 + 2 = 9
        $$
      </div>
          
      <div class="example">
        Jeśli $5$ razy w ciągu dnia wypijesz dwie <comment text="soku">szklaneczki</comment>, to łącznie wypijesz $10$ szklaneczek.
          
        $$
          2 + 2 + 2 + 2 + 2 = 10
        $$
      </div>
    </lesson-chapter>

    <lesson-chapter><template #title>Nazewnictwo</template>    
      <p class = "type">
          Intuicje
      </p>
        
      <p>
          Być może kiedyś w życiu napotkasz następujący problem:
      </p>
        
      <p class="problem">
          Jaś zjadł 3 jabłka, a Małgosia 5 jabłek. <comment text="Tak naprawdę nie wiadomo. Niektóre jabłka mogły zjeść osobno.">
      Ile jabłek zjadły razem dzieci</comment>?
      </p>
          
      <p>
          Aby znaleźć odpowiedź na to intrygujące pytanie, musimy wykonać dodawanie, czyli <i>dodać</i> liczby $3$ i $5$. 
          Gdy podołamy wyzwaniu i otrzymamy w odpowiedzi $8$, dostaniemy <i>wynik</i> dodawania. W ogólności wykonanie dowolnego działania 
          na liczbach zwraca wynik działania. W przypadku dodawania liczby, które dodajemy, nazywamy <i>składnikami</i>, zaś 
          otrzymany wynik nazywamy <i>sumą</i>. Czasami samo dodawanie nazywamy też <i>sumowaniem</i>.
      </p>
          
      $$
          \text{składnik} + \text{składnik} = \text{suma}
      $$
        
      <ul>
          <li>W działaniu $2 + 3 = 5$ składnikami są $2$ i $3$, a wynikiem (sumą) $5$.</li>
          <li>W działaniu $3 + 5 + 7 = 15$ składnikami są $3$, $5$ i $7$, a wynikiem (sumą) $15$.</li>
          <li>W działaniu $14 = 9  + 5$ składnikami są $9$ i $5$, a wynikiem (sumą) $14$.</li>
      </ul>
    </lesson-chapter>

    <lesson-chapter><template #title>Własności dodawania</template>   
      <p class = "type">
          Rozszerzenie
      </p>
       
      <p>
          Dodawanie ma pewne specyficzne <comment text="Jak choćby to, że jest świetną zabawą">cechy, które ujawniają się niezależnie od 
          kontekstu</comment>. Przyjrzyjmy się ponownie kulkom:
      </p>
         
      <p style="text-align: center">
          <svg height="200" width="800">
              <circle cx="200" cy="90" r="20" class = "draggable"></circle>
              <circle cx="150" cy="170" r="20" class = "draggable"></circle>
              <circle cx="230" cy="120" r="20" class = "draggable"></circle>
              <circle cx="190" cy="40" r="20" class = "draggable"></circle>
              <circle cx="520" cy="120" r="20" class = "draggable"></circle>
              <circle cx="580" cy="40" r="20" class = "draggable"></circle>
              <circle cx="610" cy="160" r="20" class = "draggable"></circle>
              <circle cx="640" cy="100" r="20" class = "draggable"></circle>
              <circle cx="560" cy="80" r="20" class = "draggable"></circle>
          </svg>
      </p>
        
      <p>
          Dodając kulki po lewej stronie do kulek po prawej stronie, otrzymamy
      </p>
        
      $$
          4 + 5 = 9
      $$
        
      <p>
          Nic nie stoi jednak na przeszkodzie, by w porywie szaleństwa kulki po prawej stronie dodać do kulek po lewej stronie:
      </p>
        
      $$
          5 + 4 = 9
      $$
          
      <p>
          Jak widać, nie ma znaczenia, w jakiej kolejności dodamy do siebie liczby, a wynik otrzymamy taki sam. 
          Z tego powodu mówimy, że dodawanie jest <i>przemienne</i>.
      </p>
        
      <p style="text-align: center">
          <svg height="250" width="800">
              <circle cx="100" cy="90" r="20" class = "draggable"></circle>
              <circle cx="110" cy="160" r="20" class = "draggable"></circle>
              <circle cx="340" cy="110" r="20" class = "draggable"></circle>
              <circle cx="540" cy="100" r="20" class = "draggable"></circle>
              <circle cx="670" cy="90" r="20" class = "draggable"></circle>
              <circle cx="590" cy="90" r="20" class = "draggable"></circle>
              <circle cx="700" cy="130" r="20" class = "draggable"></circle>
              <circle cx="620" cy="130" r="20" class = "draggable"></circle>
              <circle cx="530" cy="160" r="20" class = "draggable"></circle>
          </svg>
      </p>
        
      <p>
          Gdy do dwóch kulek dodamy jedną, otrzymamy $3$ kulki. Jeśli do tych trzech kulek dołożymy jeszcze $6$, to będziemy mieli $9$ kulek.
      </p>
        
      $$
          1 + 2 = 3\\
          3 + 6 = 9
      $$
        
      <p>
          Patrząc z innej strony, gdy do sześciu kulek dołożymy jedną, otrzymamy $7$ kulek. Dołożenie do tych $7$ jeszcze dwóch da 
          nam razem $9$ kulek. 
      </p>
        
      $$
          6 + 1 = 7\\
          7 + 2 = 9
      $$
        
      <p>
          Kiedy dodajemy więcej niż dwa składniki, możemy sumować je parami w dowolnej kolejności. Dlatego mówimy, że 
          dodawanie jest <i>łączne</i>.
      </p>
    </lesson-chapter>

    <lesson-chapter id="columnar-addition-formal-proof"><template #title>Dodawanie w słupku</template>    
    <p class = "type">
        Warsztat
    </p>
      
    <p>
        Powiedzieliśmy trochę o samej teorii dodawania, ale cały czas nie wiemy, jak to robić w praktyce. Kiedy ktoś 
        zapyta nas o wynik dodawania $3 + 4$, to możemy w lewej ręce wyciągnąć $3$ palce, w prawej $4$ palce i policzyć, że razem 
        wyciągnęliśmy $7$ palców. Dodawanie liczb jednocyfrowych nie jest dużym wyzwaniem, szczególnie kiedy nabierze się wprawy. 
        Gdyby ktoś napotkał jednak problemy z dodawaniem liczb rzędu $8$ i $9$, spieszymy z pomocą i podsuwamy zgrabną tabelkę, zwaną 
        <i>tabliczką dodawania</i>. 
    </p>
      
    <br>

    <table class="operation_table center">
        <tr><th> </th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th></tr>
        <tr><th>0</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td></tr>
        <tr><th>1</th><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td></tr>
        <tr><th>2</th><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td></tr>
        <tr><th>3</th><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td></tr>
        <tr><th>4</th><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td></tr>
        <tr><th>5</th><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td></tr>
        <tr><th>6</th><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td></tr>
        <tr><th>7</th><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td></tr>
        <tr><th>8</th><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td></tr>
        <tr><th>9</th><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td></tr>
    </table>
    <br>    
    
    <p>
        Jeśli chcemy poznać wynik dodawania $8 + 9$, szukamy ósemki u góry wśród pogrubionych liczb, a dziewiątki po lewej wśród 
        pogrubionych liczb. Następnie jedziemy wzrokiem wzdłuż odpowiedniego rzędu i odpowiedniej kolumny i we wspólnej komórce 
        znajdujemy wynik $17$.
    </p>
      
    <br>
    <operation-table :defaultLoperand="8" :defaultRoperand="9" :f="function(a,b){return a+b}" :print="function(a,b,c){return a + ' + ' + b + ' = ' + c}"></operation-table>
      
    <p>
        Ponieważ dodawanie jest przemienne, możemy równie dobrze znaleźć dziewiątkę u góry i ósemkę po lewej – znowu trafimy na 
        wynik $17$.
    </p>
        
    <p>
        Większy problem z dodawaniem pojawia się wtedy, gdy chcemy dodać liczby dwucyfrowe lub jeszcze większe. Oczywiście 
        moglibyśmy rozszerzyć tabliczkę dodawania dalej niż do dziewiątki, jednak… bądźmy realistami. Bardziej pomocna 
        okazuje się technika <i>dodawania w słupku</i> zwana też <i>dodawaniem pisemnym</i>. Najlepiej nauczmy się jej na przykładach.
    </p>

    <div class="example">
        <p> 
            Bądźmy odważni i spróbujmy dodać $127$ oraz $32$. Piszemy dwie liczby jedna pod drugą tak, by cyfry jedności, 
            cyfry dziesiątek, cyfry setek itd. znajdowały się jedna pod drugą (wyrównujemy do prawej) i podkreślamy tak zapisane liczby. Pod kreską wkrótce 
            pojawi się wynik.
        </p>

        <columnar-operation-table :operation='"+"' :numbers='[[], ["1", "2", "7"], ["", "3", "2"], []]'></columnar-operation-table>

        <p>
            Poszukiwanie wyniku polega teraz na tym, by dodawać do siebie kolejne <comment text="Dobrze, masz rację. Dodajemy do siebie LICZBY 
            reprezentowane przez cyfry.">cyfry</comment> (jedności do jedności, dziesiątek do 
            dziesiątek itd. – w tej kolejności), a wynik dodawania zapisywać pod kreską. 
        </p>

        <ul>
            <li>$7 + 2 = 9$, więc pod siódemką i dwójką piszemy $9$.</li>
            <li>$2 + 3 = 5$, więc pod dwójką i trójką piszemy $5$.</li>
            <li>$1$ nie ma swojego towarzysza, więc przepisujemy ją w niezmienionej postaci.</li>
        </ul>
            
        <columnar-operation-table :operation='"+"' :numbers='[[], ["1", "2", "7"], ["", "3", "2"], ["1", "5", "9"]]'></columnar-operation-table>
            
        <p>
            Wynikiem dodawania $127 + 32$ jest $159$. Nie było tak źle, prawda?
        </p>
    </div>

    <div class="example">
        <p>
            Spróbujmy się zmierzyć z trochę trudniejszym 
            przypadkiem – dodajmy $256$ i $947$. Zaczynamy tak samo:
        </p>
        
        <columnar-operation-table :operation='"+"' :numbers='[[], ["2", "5", "6"], ["9", "4", "7"], []]'></columnar-operation-table>

        <p>
            Teraz dodajmy szóstkę do siódemki. Otrzymujemy $13$ – pojawia się problem, bo przecież nie zapiszemy dwóch cyfr pod 
            szóstką i siódemką. Zrobimy więc tak – rozbijmy $13$ na dwie cyfry, pod szóstką i siódemką napiszemy $3$, a $1$ przenieśmy do 
            następnej kolumny.
        </p>
        
        <columnar-operation-table :operation='"+"' :numbers='[["", "1", ""], ["2", "5", "6"], ["9", "4", "7"], ["", "", "3"]]'></columnar-operation-table>
        
        
        <p>
            Teraz dodajemy wszystkie trzy cyfry: $1$, $5$ i $4$ – dostajemy $10$. Ponieważ wynik jest dwucyfrowy, w 
            tej kolumnie piszemy $0$, 
            a $1$ przenosimy dalej.
        </p>

        <columnar-operation-table :operation='"+"' :numbers='[["1", "1", ""], ["2", "5", "6"], ["9", "4", "7"], ["", "0", "3"]]'></columnar-operation-table>
        
        <p>
            Dodajemy $1 + 2 + 9$. Wynik $12$ rozbijamy na $2$ i $1$.
        </p>
        
        <columnar-operation-table :operation='"+"' :numbers='[["1", "1", "1", ""], ["", "2", "5", "6"], ["", "9", "4", "7"], ["", "2", "0", "3"]]'></columnar-operation-table>
        
        <p>
            Przeniesiona jedynka jest samotna, więc przepisujemy ją bez zmian.
        </p>
        
        <columnar-operation-table :operation='"+"' :numbers='[["1", "1", "1", ""], ["", "2", "5", "6"], ["", "9", "4", "7"], ["1", "2", "0", "3"]]'></columnar-operation-table>
        
        <p>
            Dostaliśmy wynik: $256 + 947 = 1203$.
        </p>
    </div>

    <p>
      Jeśli dodawanie w słupku sprawia wrażenie <comment text="Masz problem z poprawnością polityczną?">czarnej magii</comment>, prześledź jeszcze dowolne własne przykłady:
    </p>  
      
    <columnar-operation :operation="'addition'" :floats="false"></columnar-operation>

    <p class ="type optional-hide">
      Rozszerzenie
    </p>
    <p class="warning">
        wymagana znajomość tematu: Kolejność wykonywania działań
    </p>  
    <div>
        <p>
            Być może jesteś ciekaw, dlaczego magiczna metoda dodawania w słupku jest matematycznie poprawna. Czemu jakieś dodawanie 
            cyfr w kolumnach i przepisywanie jedynek do kolejnej kolumny w ogóle działa? W pierwszym przykładzie $127 + 32 = 159$ 
            stosunkowo łatwo to zrozumieć. $127$ można zapisać jako $100 + 20 +7$, a $32$ jako $30 + 2$. W takim razie
        </p>
        
        $$
            127 + 32 = (100 + 20 + 7) + (30 + 2)
        $$
        
        <p>
            Ponieważ dodawanie jest przemienne, nie ma znaczenia kolejność zapisania składników. Ponieważ jest łączne, możemy rozłożyć nawiasy tak, jak nam wygodnie:
        </p>
        
        $$
            (100 + 20 + 7) + (30 + 2) = 100 + (20 + 30) + (7 + 2) = 100 + 50 + 9 = 159
        $$
        
        <p>
            W gruncie rzeczy to, co uczyniliśmy, to właśnie sumowanie cyfr jedności $(7 + 2)$, dziesiątek $(20 + 30)$ i 
            setek $(100)$, 
            by otrzymać wynik końcowy. Tak jak w słupku. Zobaczmy jeszcze jak działa $256 + 947 = 1203$:
        </p>

        <p style="text-align: center">
            $256 + 947 =$<br>
            $= (200 + 50 + 6) + (900 + 40 + 7) =$<br>
            <span class="comment_visible" id="ustalamy wygodną kolejność składników">$= (200 + 900) + (50 + 40) + (6 + 7) =$</span><br>
            <span class="comment_visible" id="dodajemy cyfry jedności">$= (200 + 900) + (50 + 40) + 13 =$</span><br>
            <span class="comment_visible" id="rozbijamy 13 na dwie cyfry">$= (200 + 900) + (50 + 40) + (10 + 3) =$</span><br>
            <span class="comment_visible" id="przenosimy jedynkę do następnej kolumny">$= (200 + 900) + (50 + 40 + 10) + 3 =$</span><br>
            <span class="comment_visible" id="dodajemy cyfry dziesiątek">$= (200 + 900) + 100 + 3 =$</span><br>
            <span class="comment_visible" id="przenosimy jedynkę do następnej kolumny">$= (200 + 900 + 100) + 0 + 3 =$</span><br>
            <span class="comment_visible" id="dodajemy cyfry setek">$= 1200 + 0 + 3 =$</span><br>
            <span class="comment_visible" id="rozbijamy 12 na 1 i 2">$= (1000 + 200) + 0 + 3 =$</span><br>
            $= 1000 + 200 + 0 + 3 =$<br>
            $1203$
        </p>
        
        <p>
            Ponieważ zależy nam na kompletności materiałów matematycznych zebranych na tej stronie, poniżej przedstawiamy formalne omówienie dodawania w słupku 
            wraz z czymś co matematycy nazywają "dowodem poprawności". W istocie jest to przerost formy nad treścią i generalnie nie polecamy nurkować w tę
            niepotrzebnie zawiłą matematykę. Szczególnie, jeśli dopiero rozpoczynasz swoją przygodę w świecie liczb.
        </p>
        
        <p class = "type">
            Formalnie
        </p>
        
        <p class = "warning">
            wymagana znajomość tematu: Szeregi liczbowe
        </p>
            
        <p>
            Formalnie algorytm dodawania pisemnego przedstawia się następująco. Dane są liczby $a_1, a_2, \dotsc, a_n$ o reprezentacjach dziesiętnych
            $a_i = \sum_{j = 0}^{l_i} 10^j a_{i, j}$, gdzie $l_i$ oznacza długość (liczbę cyfr) liczby $a_i$, zaś $a_{i, j} \in \{0, 1, 2, 3, 4, 5, 6, 7, 8, 9\}$. 
            Poszukiwana jest reprezentacja dziesiętna ich sumy $s = \sum_{i = 1}^{n} a_i$.
        </p>

        <p>
            Weźmy $l = \max\{l_1, l_2, \dotsc l_n \}$ i rozszerzmy zapis dziesiętny liczb $a_i$ do doługości $l$ cyfr (przez dopisanie odpowiedniej ilości
            zer z przodu): $a_i = \sum_{j = 0}^{l} 10^j a_{i, j}$, przy czym $a_{i, j} = 0$ dla $j > l_i$. Wtedy
        </p>

        $$ 
            s = \sum_{i = 1}^{n} a_i = \sum_{i = 1}^{n} \sum_{j = 0}^{l} 10^j a_{ij} = \sum_{j = 0}^{l} \sum_{i = 1}^{n} 10^j a_{ij} = 
            \sum_{j = 0}^{l} 10^j \sum_{i = 1}^{n} a_{ij}
        $$

        <p>
            Rozważmy wartość $\sum_{i = 1}^{n} a_{i, 0}$ (odpowada ona sumie cyfr jedności w dodawaniu pisemnym). Niech $r_1$ oznacza część
            całkowitą z dzielenia tej liczby przez $10$, zaś $s_0$ jej resztę z dzielenia przez $10$. Inaczej mówiąc, niech $\sum_{i = 1}^{n} a_{i, 0} = 10r_1 + s_0$.
            Mamy wtedy:
        </p>

        $$ 
            s = 10^0 \sum_{i = 1}^{n} a_{i, 0} + 10^1 \sum_{i = 1}^{n} a_{i, 1} + \dotsb + 10^l \sum_{i = 1}^{n} a_{i, l} = 
            10^0 \left(10r_1 + s_0 \right) + 10^1 \sum_{i = 1}^{n} a_{i, 1} + \dotsb + 10^l \sum_{i = 1}^{n} a_{i, l} = \\
            = 10^0s_0 + 10^1 \left(r_1 + \sum_{i = 1}^{n} a_{i, 1} \right) + \dotsb + 10^l \sum_{i = 1}^{n} a_{i, l}
        $$

        <p>
            Rozważmy wartość $r_1 + \sum_{i = 1}^{n} a_{i, 1}$ (odpowada ona sumie cyfr w kolumnie dziesiątek dodawania pisemnego). Niech $r_2$ oznacza część
            całkowitą z dzielenia tej liczby przez $10$, zaś $s_1$ jej resztę z dzielenia przez $10$, czyli $r_1 + \sum_{i = 1}^{n} a_{i, 1} = 10r_2 + s_1$.
            Mamy wtedy:
        </p>

        $$ 
            s = s_0 + 10^1 \left(r_1 + \sum_{i = 1}^{n} a_{i, 1} \right) + 10^2 \sum_{i = 1}^{n} a_{i, 2} + \dotsb + 10^l \sum_{i = 1}^{n} a_{i, l} = 
            s_0 + 10^1 \left(10r_2 + s_1 \right) + 10^2 \sum_{i = 1}^{n} a_{i, 2} + \dotsb + 10^l \sum_{i = 1}^{n} a_{i, l} = \\
            = s_0 + 10^1 s_1  + 10^2 \left( r_2 + \sum_{i = 1}^{n} a_{i, 2} \right) + \dotsb + 10^l \sum_{i = 1}^{n} a_{i, l}
        $$

        <p>
            Kontynuujemy postępowanie w kolejnych iteracjach aż do $l$-tego kroku. Na zasadzie indukcji otrzymujemy wtedy postać:
        </p>

        $$
            s =  s_0 + 10^1 s_1 + 10^2 s_2 + \dotsb +  10^l s_l + 10^{l+1}r_{l+1}
        $$

        <p>
            Rozwijając do postaci dziesiętnej liczbę $r_{l+1} = \sum_{j = 0}^{k} 10^j r_{l+1, j}$ otrzymujemy poszukiwaną reprezentację liczby $s$:
        </p>

        $$
            s =  s_0 + 10^1 s_1 + 10^2 s_2 + \dotsb +  10^l s_l + 10^{l+1} r_{l+1, 0} + 10^{l+2} r_{l+1, 1} + \dotsb + 10^{l+1 + k} r_{l+1, k}
        $$

        <p>
            Ponieważ liczby $s_0, s_1, \dotsc, s_l$ stanowią reszty z dzielenia przez $10$, mają reprezentację jednocyfrową. Stąd liczby 
            $s_0, s_1, \dotsc, s_l, r_{l+1, 0}, r_{l+1, 1}, \dotsc, r_{l+1, k}$ odpowiadają kolejnym (czytanym od prawej) cyfrom liczby $s$.
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
import OperationTable from "../../../utils/OperationTable"
import ColumnarOperation from "../../../utils/columnar_operation/ColumnarOperation"

export default {
  name: "Dodawanie",
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
    ColumnarOperationTable,
    OperationTable,
    ColumnarOperation
  }
};
</script>

<style scoped>
</style>
