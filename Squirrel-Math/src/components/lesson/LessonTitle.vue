<template>
  <p class="lesson_title" ref="main" :contenteditable="contenteditable">
    <slot></slot>
  </p>
</template>

<script>
    export default {
        name: "LessonTitle",
        props: ['serializer', 'contenteditable'],
        mounted() {
          if (this.serializer){
            const t = this;
            this.serializer.get = function() { return t.$refs.main.innerHTML}
          }
        }
    }
</script>

<style scoped>
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
