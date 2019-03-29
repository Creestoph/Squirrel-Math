<template>
  <div class="lesson">
    <div class="main">
      <router-link tag="a" :to="toggleShortRoute">
        <div class="bookmark-shadow">
          <div class="bookmark">{{toggleShortText}}</div>
        </div>
         <div class="bookmark-min">
          <div :class="fullClass">WERSJA PEŁNA</div>
          <div :class="shortClass">WERSJA SKRÓCONA</div>
        </div>
      </router-link>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import LessonTitle from "./LessonTitle";
import LessonIntro from "./LessonIntro";
import LessonChapter from "./chapter/LessonChapter";

export default {
  name: "Lesson",
  data() {
    return {
      toggleShortRoute: "",
      toggleShortText: "",
      fullClass: "",
      shortClass: "",
      chapters: []
    };
  },
  mounted() {
    if (this.$route.path.includes("-short"))
    {
      this.toggleShortRoute = this.$route.path.substr(0, this.$route.path.lastIndexOf("-"));
      this.toggleShortText = "WERSJA PEŁNA";
      this.shortClass = "active";
    }
    else
    {
      this.toggleShortRoute = this.$route.path + "-short";
      this.toggleShortText = "WERSJA SKRÓCONA";
      this.fullClass = "active";
    }
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
  },
  components: {
    LessonIntro,
    LessonTitle,
    LessonChapter
  }
};
</script>

<style scoped>
.lesson {
  background-color: #cccccc;
  /*background-image: url(".images/background.png");
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;*/
  margin: 0;
}

@media screen and (max-width: 1200px) {
  .main {
    position: relative;
    padding: 35px 6% 35px 6%;
    font-family: "Verdana";
    font-size: 1.08em;
    color: #000000;
    background: #fefefe;
  }
}

@media screen and (max-width: 500px) {
  .main {
    padding: 35px 0 35px 0;
  }
}

@media screen and (min-width: 1200px) {
  .main {
    max-width: 1100px;
    position: relative;
    margin-right: 14%;
    padding: 35px 6.5% 35px 19.5%;
    font-family: "Verdana";
    font-size: 1.08em;
    line-height: 1.7em;
    color: #000000;
    background: #fefefe;
    border-right: 3px solid black;
  }
}

.bookmark
{
	padding-left: 40px;
	padding-right: 40px;
	height: 60px;
	line-height: 60px;
	position: relative;
	background: black;
	color: white;
	font-weight: bold;
	font-family: "Segoe UI";
	transition: padding-right 0.4s;
}

@media screen and (min-width: 500px)
{
  .bookmark:before
  {
    content: "";
    position: absolute;
    left: -12px;
    bottom: 0;
    width: 25px;
    background: black;
    height: 50%;
    transform: skew(-40deg);
  }

  .bookmark:after
  {
    content: "";
    position: absolute;
    left: -12px;
    top: 0;
    width: 25px;
    background: black;
    height: 50%;
    transform: skew(40deg);
  }
}

.bookmark:hover
{
	padding-right: 100px;
	transition: padding-right 0.5s;
}

@media screen and (max-width: 1200px)
{
	.bookmark-shadow
	{
		float: right;
		overflow: auto;
		margin-right: -7%;
		margin-bottom: 30px;
		padding-left: 30px;
	}
}

@media screen and (min-width: 1200px)
{
	.bookmark-shadow
	{
		float: right;
		overflow: auto;
		box-shadow: 6px 3px 5px 0px rgba(0, 0, 0, 0.4);
		margin-right: -13%;
		margin-bottom: 30px;
		padding-left: 30px;
	}
}

@media screen and (max-width: 500px)
{
  .bookmark-shadow
  {
    display: none;
  }

  .bookmark-min div
  {
    background: black;
    color: white;
    width: 50%;
    float: left;
    height: 60px;
    line-height: 60px;
    margin-top: -35px;
    font-weight: bold;
	  font-family: "Segoe UI";
    text-align: center;
    margin-bottom: 2em;
  }

  .bookmark-min div.active
  {
      background: white;
      color: black;
  }
}

@media screen and (min-width: 500px)
{
  .bookmark-min
  {
    display: none;
  }
}
</style>
