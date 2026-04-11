<template>
    <lesson>
        <lesson-title>Reguły redaktorskie</lesson-title>

        <lesson-intro>
            Aktualna, stale rozwijana lista konwencji, których należy się trzymać, tworząc treści lekcji. Na tym etapie
            przydatna głównie dla nas, autorów, żebyśmy się nie pogubili w sztuce : B.
        </lesson-intro>

        <lesson-chapter>
            <template #title>Formatowanie treści</template>
            <ul>
                <li>
                    Italika może być stosowana tylko do wprowadzania nowych pojęć, nie wolno jej używać w innych
                    przypadkach.
                </li>
                <li>Wytłuszczenie może być stosowane do zwiększenia siły pewnego wyrazu, położenia akcentu.</li>
                <li>
                    Jeśli jakiś fragment tekstu wymaga szczególnej uwagi, powinien być oznaczony głównym kolorem
                    czerwonym i opcjonalnie wytłuszczony. Niezależnie od tego, elementy zapisu matematycznego mogą
                    stosować różne kolory dla lepszej czytelności i przejrzystości.
                </li>
                <li>Elementy listy punktowanej lub numerowanej powinny kończyć się kropką lub średnikiem.</li>
                <li>
                    Przykłady objaśniające treści powinny być ujęte w takiej formie: jeżeli przykład jest bezpośrednio
                    użyty na potrzeby objaśnienia pewnego konceptu, może znaleźć się w akapicie głównej treści. W
                    przeciwnym razie, jeżeli przykłady nie są wprost potrzebne do zrozumienia treści, a raczej ją
                    uzupełniają i obrazują różne przypadki, to: a) powinny być wymienione w postaci listy punktowanej,
                    jeżeli każdy z nich jest krótki (1-2 linijki) i jest ich więcej niż jeden; b) w przeciwnym razie
                    należy użyć blokowego formatowania "przykład".
                </li>
                <li>
                    Zdania w komentarzach powinny zaczynać się z dużej litery i kończyć się kropką, chyba że jest
                    słuszny powód, by uczynić inaczej.
                </li>
                <li>Zwroty do czytelnika (ty, twój, ciebie) piszemy małą literą.</li>
                <li>
                    Użycie emotikonów nie jest dozwolone z wyjątkiem a) komentarzy, b) Bobera, dokładnie w takiej
                    formie: <code>: B</code>
                    (dwukropek, spacja, wielka litera B). Jeśli Bober kończy zdanie, powinna się po nim pojawić kropka.
                </li>
            </ul>
        </lesson-chapter>

        <lesson-chapter>
            <template #title>Konwencje matematyczne</template>
            <ul>
                <li>Zero jest liczbą naturalną.</li>
                <li>
                    Nazwy liczb powyżej duodecyliarda oparte są na spolszczonej konwencji
                    Conwaya-Guya-Wechslera-Miakinena, zgodnie z opisem w lekcji "Liczby".
                </li>
            </ul>
        </lesson-chapter>
    </lesson>
</template>

<script setup lang="ts">
import LessonTitle from './lesson/LessonTitle.vue';
import LessonIntro from './lesson/LessonIntro.vue';
import Lesson from './lesson/Lesson.vue';
import LessonChapter from './lesson/chapter/LessonChapter.vue';
</script>
