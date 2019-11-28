<template>
    <lesson routeShortVersion="/liczba-short" routeLongVersion="/liczba">
        <lesson-title-short>Liczba</lesson-title-short>    
        
        <lesson-chapter><template #title>Czym jest liczba</template>
        
        <p>
            Wyobraźmy sobie pasterza, który sprowadza owce do zagrody. Na początku zagroda z owcami jest pusta. Mówimy wtedy, że w 
            zagrodzie jest <i>zero</i> owiec. Do pustej zagrody wchodzi owca. Wtedy liczba owiec w zagrodzie wynosi <i>jeden</i>. Następnie do owcy 
            dołącza kolejna. W zagrodzie są <i>dwie</i> owce. Jeśli tendencja się utrzyma, następnie liczba owiec w zagrodzie będzie
            wynosić <i>trzy</i>, <i>cztery</i>, <i>pięć</i>, <i>sześć</i>, <i>siedem</i>, <i>osiem</i>, <i>dziewięć</i>. 
            Dla wygody zapisu matematycy używają w tym celu formy krótszej niż słowna – stosują <i>cyfry</i>.
        </p>
        
        <div class="row">
            <div class="col-lg">
                <table class = "sheep_small center">
                    <tr><td><img src="./.images/sheep.png"></td></tr>
                </table>
                <p style="text-align: center">jeden: $1$</p>

                <table class = "sheep_small center">
                    <tr><td><img src="./.images/sheep.png"><img src="./.images/sheep.png"></td></tr>
                </table>
                <p style="text-align: center">dwa: $2$</p>

                <table class = "sheep_small center">
                    <tr><td><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"></td></tr>
                </table>
                <p style="text-align: center">trzy: $3$</p>

                <table class = "sheep_small center">
                    <tr><td><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"></td></tr>
                </table>
                <p style="text-align: center">cztery: $4$</p>

                <table class = "sheep_small center">
                    <tr><td><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"></td></tr>
                </table>
                <p style="text-align: center">pięć: $5$</p>
            </div>

            <div class="col-lg">
                <table class = "sheep_small center">
                    <tr><td><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"></td></tr>
                </table>
                <p style="text-align: center">sześć: $6$</p>

                <table class = "sheep_small center">
                    <tr><td><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"></td></tr>
                </table>
                <p style="text-align: center">siedem: $7$</p>

                <table class = "sheep_small center">
                    <tr><td><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"></td></tr>
                </table>
                <p style="text-align: center">osiem: $8$</p>

                <table class = "sheep_small center">
                    <tr><td><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"></td></tr>
                </table>
                <p style="text-align: center">dziewięć: $9$</p>
                    
                <table class = "sheep_small center">
                    <tr><td><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"></td></tr>
                </table>
                <p style="text-align: center">dziesięć: $10$</p>

            </div>
        </div>

        <br><br><br><br>


         <div class="row">
            <div class="col-lg">
                <table class = "sheep_small center">
                    <tr><td><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"></td></tr>
                    <tr><td><img src="./.images/sheep.png"></td></tr>
                </table>
                <p style="text-align: center">jedenaście: $11$</p>

                <table class = "sheep_small center">
                    <tr><td><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"></td></tr>
                    <tr><td><img src="./.images/sheep.png"><img src="./.images/sheep.png"></td></tr>
                </table>
                <p style="text-align: center">dwanaście: $12$</p>

                <table class = "sheep_small center">
                    <tr><td><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"></td></tr>
                    <tr><td><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"></td></tr>
                </table>
                <p style="text-align: center">trzynaście: $13$</p>

                <table class = "sheep_small center">
                    <tr><td><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"></td></tr>
                    <tr><td><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"></td></tr>
                </table>
                <p style="text-align: center">czternaście: $14$</p>

                <table class = "sheep_small center">
                    <tr><td><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"></td></tr>
                    <tr><td><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"></td></tr>
                </table>
                <p style="text-align: center">piętnaście: $15$</p>
            </div>

            <div class="col-lg">
                <table class = "sheep_small center">
                    <tr><td><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"></td></tr>
                    <tr><td><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"></td></tr>
                </table>
                <p style="text-align: center">szesnaście: $16$</p>

                <table class = "sheep_small center">
                    <tr><td><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"></td></tr>
                    <tr><td><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"></td></tr>
                </table>
                <p style="text-align: center">siedemnaście: $17$</p>

                <table class = "sheep_small center">
                    <tr><td><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"></td></tr>
                    <tr><td><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"></td></tr>
                </table>
                <p style="text-align: center">osiemnaście: $18$</p>

                <table class = "sheep_small center">
                    <tr><td><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"></td></tr>
                    <tr><td><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"></td></tr>
                </table>
                <p style="text-align: center">dziewiętnaście: $19$</p>

                <table class = "sheep_small center">
                        <tr><td><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"></td></tr>
                        <tr><td><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"><img src="./.images/sheep.png"></td></tr>
                </table>
                <p style="text-align: center">dwadzieścia: $20$</p>
            </div>
        </div>

        <p>
            Pojęcie liczby najprościej uzmysłowić sobie poprzez ilość owiec w trzódce. Jednak liczba jako taka jest tworem znacznie bardziej 
            ogólnym i abstrakcyjnym niż owca. Liczba może dotyczyć jakiegokolwiek namacalnego obiektu. Możemy określić liczbę kupionych 
            samochodów, liczbę zjedzonych paluszków albo liczbę obalonych <comment text="+18">flaszek</comment>. 
            W matematyce jednak liczba występuje samodzielnie, jako twór 
            istniejący sam dla siebie i bez odniesienia do owiec ani flaszek. Matematyk po prostu przyjmuje, że jest coś takiego jak liczba jeden, 
            liczba dwa, liczba trzy itd., choć nic nie stoi na przeszkodzie, żeby dopowiedzieć sobie „jedna owca”, „dwie owce”, „trzy owce”. 
        </p>
        </lesson-chapter>

        <lesson-chapter><template #title>Jak zapisujemy kolejne liczby</template>  
        <br>
        <div class="row">
            <div class = "col-2">
                <tr><td align = "right" style="padding-right: 20px">$0$</td><td>zero</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$1$</td><td>jeden</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$2$</td><td>dwa</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$3$</td><td>trzy</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$4$</td><td>cztery</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$5$</td><td>pięć</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$6$</td><td>sześć</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$7$</td><td>siedem</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$8$</td><td>osiem</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$9$</td><td>dziewięć</td></tr>
            </div>

            <div class="col">
                <tr><td align = "right" style="padding-right: 20px">$10$</td><td>dziesięć</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$11$</td><td>jedenaście</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$12$</td><td>dwanaście</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$13$</td><td>trzynaście</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$14$</td><td>czternaście</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$15$</td><td>piętnaście</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$16$</td><td>szesnaście</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$17$</td><td>siedemnaście</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$18$</td><td>osiemnaście</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$19$</td><td>dziewiętnaście</td></tr>
            </div>

            <div class="col">
                <tr><td align = "right" style="padding-right: 20px">$20$</td><td>dwadzieścia</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$21$</td><td>dwadzieścia jeden</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$22$</td><td>dwadzieścia dwa</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$23$</td><td>dwadzieścia trzy</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$24$</td><td>dwadzieścia cztery</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$25$</td><td>dwadzieścia pięć</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$26$</td><td>dwadzieścia sześć</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$27$</td><td>dwadzieścia siedem</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$28$</td><td>dwadzieścia osiem</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$29$</td><td>dwadzieścia dziewięć</td></tr>
            </div>

            <div class="col">
                <tr><td align = "right" style="padding-right: 20px">$30$</td><td>trzydzieści</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$31$</td><td>trzydzieści jeden</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$32$</td><td>trzydzieści dwa</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$33$</td><td>trzydzieści trzy</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$34$</td><td>trzydzieści cztery</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$35$</td><td>trzydzieści pięć</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$36$</td><td>trzydzieści sześć</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$37$</td><td>trzydzieści siedem</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$38$</td><td>trzydzieści osiem</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$39$</td><td>trzydzieści dziewięć</td></tr>
            </div>
        </div>

        <p>
            Konstrukcja coraz większych liczb przebiega następująco: najpierw przebiegamy przez kolejne liczby od zera: $0, 1, 2, 3, 4, 5, 6, 7, 8, 9$ i docieramy
            do dziewiątki. Kolejne liczby mają zapis wykorzystujący dwie cyfry. Po lewej stronie będzie cyfra $1$, a po prawej ponownie kolejne cyfry od zera do 
            dziewięciu: $10, 11, 12, 13, ..., 19$. Następnie jedynka z przodu zamieni się na dwójkę, a po prawej stronie znowu będziemy przebiegać przez kolejne cyfry:
            $20, 21, 22, 23, ..., 29$. W następnych turach cyfry dziesiątek przyjmą postać $3, 4, 5, 6, 7, 8, 9$ aż w końcu dotrzemy do największej liczby 
            dwucyfrowej: $99$. 
            W tym momencie docieramy do liczby <i>sto</i>, która składa się z trzech symboli: $100$. Kolejne liczby, czyli sto jeden, sto dwa, sto trzy... będa posiadały 
            z przodu jedynkę, a następnie dwie cyfry, które zmieniają się zgodnie z dotychczasową regułą. W ten sposób otrzymamy liczby $100, 101, 102, 103, 104, 105, 
            106, 107, 108, 109, 110, 111, 112, 113, ..., 196, 197, 198, 199$. Przechodząc dalej, z pierwszej cyfry czynimy $2$ i resetujemy ostatnie dwie cyfry. 
            Podobnie postępujemy przy każdym takim cyklu: Jeśli ostatnie dwie cyfry są dzewiątkami, poprzedzającą cyfrę zwiększamy o jeden i resetujemy dziewiątki:
            $200, 201, 202, 203, ..., 298, 299, 300, 301, 302, ..., 997, 998, 999$. Kolejną liczbą jest tysiąc składający się z czterech cyfr: $1000$. Analogicznie 
            kontynuujemy proces tak długo, jak chcemy, osiągając liczby dowolnie duże.
        </p>

        <div class="row">
            <div class = "col-2">
                <tr><td align = "right" style="padding-right: 20px">$10$</td><td>dziesięć</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$20$</td><td>dwadzieścia</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$30$</td><td>trzydzieści</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$40$</td><td>czterdzieści</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$50$</td><td>pięćdziesiąt</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$60$</td><td>sześćdziesiąt</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$70$</td><td>siedemdziesiąt</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$80$</td><td>osiemdziesiąt</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$90$</td><td>dziewięćdziesiąt</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$100$</td><td>sto</td></tr>
            </div>

            <div class="col-2">
                <tr><td align = "right" style="padding-right: 20px">$100$</td><td>sto</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$200$</td><td>dwieście</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$300$</td><td>trzysta</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$400$</td><td>czterysta</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$500$</td><td>pięćset</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$600$</td><td>sześćset</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$700$</td><td>siedemset</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$800$</td><td>osiemset</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$900$</td><td>dziewięćset</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$1000$</td><td>tysiąć</td></tr>
            </div>

            <div class="col-3">
                <tr><td align = "right" style="padding-right: 20px">$1000$</td><td>tysiąć</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$2000$</td><td>dwa tysiące</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$3000$</td><td>trzy tysiące</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$4000$</td><td>cztery tysiące</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$5000$</td><td>pięć tysięcy</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$6000$</td><td>sześć tysięcy</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$7000$</td><td>siedem tysięcy</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$8000$</td><td>osiem tysięcy</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$9000$</td><td>dziewięć tysięcy</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$10\ 000$</td><td>dziesięć tysięcy</td></tr>
            </div>

            <div class="col-3.5">
                <tr><td align = "right" style="padding-right: 20px">$10\ 000$</td><td>dziesięć tysięcy</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$20\ 000$</td><td>dwadzieścia tysięcy</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$30\ 000$</td><td>trzydzieści tysięcy</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$40\ 000$</td><td>czterdzieści tysięcy</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$50\ 000$</td><td>pięćdziesiąt tysięcy</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$60\ 000$</td><td>sześćdziesiąt tysięcy</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$70\ 000$</td><td>siedemdziesiąt tysięcy</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$80\ 000$</td><td>osiemdziesiąt tysięcy</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$90\ 000$</td><td>dziewięćdziesiąt tysięcy</td></tr>
                <tr><td align = "right" style="padding-right: 20px">$100\ 000$</td><td>sto tysięcy</td></tr>
            </div>
        </div>

        <p>
            Aby poznać zapis słowny coraz większych liczb, skorzystaj z poniższego pola. Wpisz za pomocą cyfr dowolną liczbę, aby zobaczyć jej formę słowną.
        </p>
    
        <div style="text-align: center">
            <input style="width: 80%" type="text" id="number_to_str" />
            <center>
                <div id="out_mask" style="overflow: hidden; transition: height 1s ease; border: 1px solid #dddddd; border-top: none; width: 80%; display: block; margin-top: -10px">
                    <div class="center" id="out" style="padding: 30px 20px 30px 20px; font-size: 0.8em"></div>
                </div>
            </center>
        </div>

        </lesson-chapter>

        <lesson-chapter><template #title>Porównywanie liczb</template>  
        
        <table class = "center">
            <tr>
                <td style = "font-size: 80px">$67$</td>
                <td>
                    <svg height="100" width="100">
                        <defs>
                            <linearGradient id="gradient">
                                <stop offset="20%" stop-color="#C33" />
                                <stop offset="90%" stop-color="#833" />
                            </linearGradient>
                        </defs>
                        <polygon points="0,0 100,50 0,100"/>
                    </svg>
                </td>
                <td>$18$</td>
            </tr>
        </table>

        <p>
            Aby zapisać w skrócie, że jedna liczba jest większa od drugiej, stosujemy symbole:
        </p>

        <ul>
            <li>$7 \lt 8$ oznacza "liczba $7$ jest mniejsza niż liczba $8$"</li>
            <li>$67 \gt 18$ oznacza "liczba $67$ jest większa niż liczba $18$"</li>
            <li>$18 = 18$ oznacza "liczba $18$ jest taka sama, jak liczba $18$"</li>
            <li>$2 \leq 4$ oznacza "liczba $2$ jest nie większa niż liczba $4$"</li>
            <li>$6 \geq 4$ oznacza "liczba $6$ jest nie mniejsza niż liczba $4$"</li>
        </ul>
    </lesson-chapter>

    <lesson-chapter><template #title>Czy zero jest liczbą naturalną?</template>   
        <p>
        Wśród matematyków z różnych środowisk panuje niezgoda, czy $0$ powinno się uznawać za liczbę naturalną, czy nie. Według niektórych 
        liczby naturalne powinny zaczynać się od zera: $0$, $1$, $2$, $3$, $\dots$, a według innych od jedynki: $1$, $2$, $3$, $4$, $\dots$. 
        Jest to w pewnym sensie kwestia gustu i preferencji: czy według Ciebie kolejne przedmioty / wydarzenia / punkty regulaminu powinno numerować się 
        zaczynając od zera, czy od jedynki? Jeśli krzykniesz "start", a potem odliczasz, ile sekund minęło od startu, to w chwili wykrzyknięcia zaczniesz 
        odliczanie od zera, czy od jednej sekundy? 
        </p>

        <p> 
            Według matematyki Squirrel-Math zero jest liczbą naturalną.
        </p>
    </lesson-chapter>


    <lesson-chapter><template #title>Nowe pojęcia</template> 
        <p>
            <b>Liczby naturalne</b> to jeden ($1$), dwa ($2$), trzy ($3$), cztery ($4$), pięć ($5$), sześć ($6$), siedem ($7$), osiem ($8$), 
            dziewięć ($9$), dziesięć ($10$), jedenaście ($11$) i wszystkie kolejne.
        </p>
        <p>
            <b>Cyfry</b> służą do zapisu liczb. Wyróżniamy tylko dziesięć cyfr, są to symbole: $0$, $1$, $2$, $3$, $4$, $5$, $6$, $7$, $8$, $9$. Za ich pomocą 
            konstruuje się liczby o dowololnie dużych wartościach, jak np. $125$, $1003$, $67$, $8$.
        </p>
        <p>
            <b>Liczba jednocyfrowa</b> to liczba zapisywana przy pomocy jednej cyfry, czyli liczba od zera do dziewięciu, m.in. $4$, $0$.<br>
            <b>Liczba dwucyfrowa</b> to liczba zapisywana przy pomocy dwóch cyfr, czyli liczba od dziesięciu do dziewięćdziesięciu dziewięciu, m.in. $28$, $78$. Podobnie 
            określamy liczby trzycyfrowe, czterocyfrowe itd.
        </p>
        <p>
            <b>Cyfra jedności</b> to cyfra znajdująca się najbardziej z prawej strony w zapisie liczby naturalnej: $12\color{#dd3333}{1}, 434\color{#dd3333}{0}$. <br>
            <b>Cyfra dziesiątek</b> to cyfra na lewo od cyfry jedności: $1\color{#dd3333}{2}1, 43\color{#dd3333}{4}0$. <br>
            <b>Cyfra setek</b> to cyfra na lewo od cyfry dziesiątek: $\color{#dd3333}{1}21, 4\color{#dd3333}{3}40$. <br>
            <b>Cyfra tysięcy</b> to cyfra na lewo od cyfry setek: $\color{#dd3333}{4}340$. 
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
  name: "LiczbaShort",
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
	.sheep_big img
	{
		height: 70px;
	}

	.sheep_big
	{
		margin-bottom: -0.5em;
	}

	.sheep_small img
	{
		height: 30px;
	}

	.sheep_small
	{
		margin-bottom: -1em;
	}
</style>
