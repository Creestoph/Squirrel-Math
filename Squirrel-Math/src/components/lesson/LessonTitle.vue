<template>
  <p class="lesson_title">
    <slot />
  </p>
</template>

<script>
    export default {
        name: "LessonTitle"
    }
</script>

<style scoped lang="scss">
  p.lesson_title
  {
    text-align: center;
    font-size: 3.2em;
    font-weight: bold;
    font-family: "Corbel";
    margin: 50px auto;
    clear:both;
    line-height: 1em;
  }
</style>
