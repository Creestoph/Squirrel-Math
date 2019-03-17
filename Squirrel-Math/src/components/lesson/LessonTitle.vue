<template>
  <p class="lesson_title" ref="main" :contenteditable="editable">
    <slot></slot>
  </p>
</template>

<script>
    export default {
        name: "LessonTitle",
        props: ['serializer', 'editable'],
        mounted() {
          if (this.serializer){
            const t = this;
            this.serializer.get = function() { return t.$refs.main.innerHTML}
          }
        }
    }
</script>

<style scoped>

</style>
