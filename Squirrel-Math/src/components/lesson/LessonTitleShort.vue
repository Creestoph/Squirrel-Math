<template>
  <div>
    <h1 class="lesson-title-short" ref="content">
      <slot />
    </h1>

    <p class="lesson-subtitle">
      w pigułce
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

  .lesson-title-short
  {
      text-align: center;
      font-size: 3.2em;
      font-weight: bold;
      font-family: $secondary-font;
      margin: 50px auto 0 auto;
      clear:both;
      line-height: 1em;
  }

  .lesson-subtitle
  {
      text-align: center;
      font-size: 1.6em;
      font-weight: bold;
      font-family: $secondary-font;
      margin: 0 auto 50px auto;
      clear: both;
  }
</style>
