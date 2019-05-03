<template>    
<div class="tree">
  <br>
  <ul>
    <li v-for="(value, key) in chapters" :key="key">
      <router-link  tag="a" :to="'/' + key" class="link">{{value}}</router-link>
    </li>
  </ul>
</div>
</template>

<script>

  export default {
    name: "Tree",
    data(){
        return {
            chapters: {
              'wprowadzenie': 'Wprowadzenie',
              'liczba': 'Liczba',
              'dodawanie': 'Dodawanie',
              'odejmowanie': 'Odejmowanie',
              'mnozenie': 'Mnożenie', 
              'dzielenie': 'Dzielenie', 
              'kolejnosc-wykonywania-dzialan': 'Kolejność wykonywania działań', 
              'podzielnosc-liczb': 'Podzielność liczb',
              'ulamki-zwykle': 'Ułamki zwykłe',
              'ulamki-dziesietne': 'Ułamki dziesiętne',
              'procenty': 'Procenty',
              'liczby-ujemne': 'Liczby ujemne',
              'wyrazenia-algebraiczne': 'Wyrażenia algebraiczne',
              'twierdzenia-i-dowody': 'Twierdzenia i dowody',
              'potegowanie': 'Potęgowanie',
              'pierwiastkowanie': 'Pierwiastkowanie',
              'dzialania-na-wyrazeniach-algebraicznych': 'Działania na wyrażeniach algebraicznych',
              'rownania-i-nierownosci': 'Równania i nierówności',
              'zbiory-liczbowe': 'Zbiory Liczbowe',
              'rownania-i-nierownosci-liniowe': 'Równania i nierówności liniowe'
            }
        }
    }
  }
</script>

<style scoped>
  .tree
  {
    background-color: #FFFFFF;
    font-family: "Segoe UI";
    font-size: 1em;
  }
</style>
