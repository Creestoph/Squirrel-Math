<template>
    <router-link tag="a" :to="routeLongVersion == $route.path ? routeShortVersion : routeLongVersion">
    <div class="bookmark-shadow">
        <div class="bookmark">{{routeLongVersion == $route.path ? "WERSJA SKRÓCONA" : "WERSJA PEŁNA"}}</div>
    </div>
    <div class="bookmark-min">
        <div :class="routeLongVersion == $route.path ? 'active' : ''">WERSJA PEŁNA</div>
        <div :class="routeLongVersion == $route.path ? '' : 'active'">WERSJA SKRÓCONA</div>
    </div>
    </router-link>
</template>

<script>
export default {
  name: "LessonVersionButton",
  props: ["routeLongVersion", "routeShortVersion"]
};
</script>

<style scoped>

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
