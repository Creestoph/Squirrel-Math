<template>
    <lesson>
        <lesson-title>Witajcie!</lesson-title>

        <lesson-intro>
            <p>
                Oto wersja robocza naszego podręcznika. Projekt nie ma jeszcze oficjalnej nazwy, chwilowo nazywamy go
                <i>Squirrel-Math</i>, bo wszyscy (a przynajmniej my) kochamy wiewiórki.
            </p>

            <p>
                Squirrel-Math z założenia ma być podręcznikiem idealnym. Naszym celem jest skompletować całą wiedzę
                matematyczną od zera do poziomu uniwersyteckiego (włącznie? a może nawet dalej?) i przedstawić ją w
                sposób oczywisty, intuicyjny i uporządkowany. Nie ważne, jakie masz wymagania i czego oczekujesz od
                matematyki – powinieneś znaleźć to w naszym podręczniku.
            </p>

            <p>
                Przedsięwzięcie jest dość odważne, więc potrzebna jest nam Wasza pomoc. Będziemy stale uzupełniać tę
                stronę o kolejne lekcje. Pisząc je, ciężko uwzględnić zróżnicowane zapotrzebowania odbiorców, dlatego
                ogromną wartość będzie miała każda przesłana opinia.
            </p>

            <p>Interesują nas przede wszystkim następujące aspekty:</p>

            <ul>
                <li>Czy lekcje czyta się przyjemnie, czy nie są męczące, rozwlekłe, infantylne, chaotyczne... ?</li>
                <li>Czy przedstawione treści matematyczne są zrozumiałe (albo raczej: do bólu oczywiste)?</li>
                <li>Czy oprogramowanie nie zawiera błędów?</li>
                <li>Czy strona jest estetyczna i wizualnie przejrzysta? Czy design graficzny strony jest przyjazny?</li>
            </ul>

            <p>
                Bądźcie tak krytyczni, jak to możliwe. Jeśli cokolwiek w treści jest niejasne albo chociaż zmusza do
                dłuższej chwili zastanowienia – piszcie. Jeśli cokolwiek da się ująć lepiej albo używając innego
                przykładu – jesteśmy otwarci na sugestie. Męczcie stronę i próbujcie wycisnąć z niej wszystkie
                niedociągnięcia.
            </p>

            <p>
                W dowolnej sprawie możecie skontaktować się z nami na adres mailowy
                <a class="link" href="mailto: oblicze.calki@gmail.com">oblicze.calki@gmail.com</a>. Dzięki wszystkim tu
                obecnym za wkład w projekt. Podręcznik jest dla Was – stwórzmy go razem.
            </p>
        </lesson-intro>

        <lesson-chapter>
            <template #title> Krótko o strukturze strony </template>
            <p>
                Wiedza w podręczniku będzie uporządkowana na dwa sposoby: według „ścieżki dydaktycznej” oraz „ścieżki
                prawdy”. Pierwsza z nich ma na celu wyjaśnienie matematyki „na chłopski rozum” - odstąpimy od
                profesjonalizmu i matematycznego rygoru na rzecz przystępności; druga ścieżka będzie zimną i bardzo
                ścisłą reprezentacją struktur matematycznych, zaczynając od aksjomatów, kończąc na wysoko abstrakcyjnych
                tworach (coś w rodzaju Definicja - Twierdzenie - Dowód - Definicja - Twierdzenie - Dowód...). Póki co
                wszystkie dostępne materiały stanowią realizację „ścieżki dydaktycznej”.
            </p>

            <p>
                Ścieżka dydaktyczna będzie opierać się na „Drzewie lekcji”, które (z dużym marginesem błędu) prezentuje
                się tak:
            </p>

            <router-link target="_blank" :to="'/drzewoHD'">
                <img src="./.images/tree.png" width="100%" />
            </router-link>

            <p>
                Na czerwono zaznaczony jest fragment całego Drzewa, który mamy już dostępny na stronie - kliknij w duży
                czerwony przycisk, by je obejrzeć. Według naszej idei, lekcje znajdujące się wyżej w drzewie wymagają
                znajomości lekcji im podległych. Aby przystąpić do nauki „Kolejności wykonywania działań” trzeba
                zaznajomić się z „Dzieleniem” które z kolei wymaga opanowania „Odejmowania” i „Mnożenia”.
            </p>

            <p>
                Każda lekcja dostępna jest w „Wersji pełnej” i „Wersji skróconej”. Wersja pełna wyjaśnia zagadnienia
                dogłębnie, jest trochę bardziej nieformalna i znacznie dłuższa. Wersja skrócona ma służyć ludziom
                żyjącym w pośpiechu. Jak najwięcej wiedzy w jak najkrótszym czasie - żeby zdążyć przed sprawdzianem,
                żeby ogarnąć pojedyncze zagadnienie, żeby mieć to szybko z głowy...
            </p>

            <p>
                Większość lekcji zaopatrzona jest w dodatkowe komentarze. Częśc z nich to swego rodzaju „easter eggi” -
                cyniczne żarty, które można odkryć jedynie, najeżdżając na powiązane słowo lub zdanie (jak
                <comment text="To miejsce czeka na Twój cyniczny żart">TUTAJ</comment>). Komentarze, które pomagają w
                zrozumieniu trudnych pojęć / przekształceń matematycznych / dowodów będą zaznaczone na marginesie za
                pomocą <comment text="Mniej więcej takiego" :hidden="false"> czerwonego pytajnika</comment>.
            </p>

            <p>To chyba tyle. Teraz wyruszajmy na podbój świata.</p>

            <img style="display: block; margin: auto" src="@/assets/global-images/squirrel.png" width="60%" />
        </lesson-chapter>

        <lesson-chapter>
            <template #title>Kontrybucja</template>
            <p>
                Wszelka forma pomocy w rozwijaniu treści portalu jest mile widziana, włącznie z użyciem
                <router-link class="link" target="_blank" :to="'/editor'">edytora</router-link>, za pomocą którego można
                modyfikować treści istniejących lekcji lub tworzyć nowe. Wygenerowane pliki w formacie .json można
                śmiało podrzucać na naszego maila.
            </p>

            <p>Tworząc treści lekcji, zalecamy trzymać się reguł spisanych tutaj:</p>
            <ul>
                <li>
                    <router-link class="link" target="_blank" :to="'/conventions'">Reguły redaktorskie</router-link>
                </li>
            </ul>
            <p>Dzięki temu zachowamy spójność i estetykę całego podręcznika.</p>
        </lesson-chapter>
    </lesson>
</template>

<script setup lang="ts">
import LessonTitle from './lesson/LessonTitle.vue';
import LessonIntro from './lesson/LessonIntro.vue';
import LessonChapter from './lesson/chapter/LessonChapter.vue';
import Lesson from './lesson/Lesson.vue';
</script>
