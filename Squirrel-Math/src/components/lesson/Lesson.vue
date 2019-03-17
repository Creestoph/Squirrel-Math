<template>
  <div class="lesson">
    <div class="main">
      <router-link tag="a" to = "/dodawanie_short">
        <div class = "bookmark-shadow">
            <div class = "bookmark">
                WERSJA SKRÓCONA
            </div>
        </div>
      </router-link>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import LessonTitle from './LessonTitle'
  import LessonIntro from './LessonIntro'
  import LessonChapter from './chapter/LessonChapter'

  export default {
    name: "Lesson",
    data() {
      return {
        chapters: [],
      }
    },
    components:{
      LessonIntro,
      LessonTitle,
      LessonChapter
    }
  }
</script>

<style scoped>
  .lesson
  {
    background-color: #cccccc;
    /*background-image: url(".images/background.png");
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;*/
    margin: 0;
  }

  @media screen and (max-width: 1200px)
  {
    .main
    {
      position: relative; 
      padding: 35px 6% 35px 6%;
      font-family: "Verdana";
      font-size: 1.08em;
      color: #000000; 
      background: #FEFEFE; 
    }
  }


  @media screen and (min-width: 1200px)
  {
    .main
    {
      max-width: 1100px;
      position: relative; 
      margin-right: 14%; 
      padding: 35px 6.5% 35px 19.5%;
      font-family: "Verdana";
      font-size: 1.08em;
      line-height: 1.7em;
      color: #000000; 
      background: #FEFEFE; 
      border-right: 3px solid black;
    }
  }
</style>
