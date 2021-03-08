<template>
  <h1 ref="content"><slot /></h1>
</template>

<script>
  export default {
    name: "LessonTitle"
  }
</script>

<style scoped lang="scss">
@import "@/style/global";

  h1
  {
    text-align: center;
    font-size: 3.2em;
    font-weight: bold;
    font-family: $secondary-font;
    margin: 50px auto;
    clear:both;
    line-height: 1em;
  }
</style>
