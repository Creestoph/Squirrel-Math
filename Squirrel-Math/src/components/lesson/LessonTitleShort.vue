<template>
  <div>
    <p class="lesson_title_short">
      <slot />
    </p>

    <p class="lesson_subtitle">
      W pigułce
    </p>  
  </div>
</template>

<script>
    export default {
        name: "LessonTitleShort"
    }
</script>

<style scoped lang="scss">
@import "@/style/global";

  p.lesson_title_short
  {
      text-align: center;
      font-size: 3.2em;
      font-weight: bold;
      font-family: $secondary-font;
      margin: 50px auto 0 auto;
      clear:both;
      line-height: 1em;
  }

  p.lesson_subtitle
  {
      text-align: center;
      font-size: 1.6em;
      font-weight: bold;
      font-family: $secondary-font;
      margin: 0 auto 50px auto;
      clear: both;
  }
</style>
