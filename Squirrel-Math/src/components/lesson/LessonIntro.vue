<template>
  <div  ref="main" :contenteditable="editable">
    <slot></slot>
  </div>
</template>

<script>
    export default {
        name: "LessonIntro",
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
  div
  {
    padding: 0 25px;
    margin-bottom: 55px;
  }
</style>
