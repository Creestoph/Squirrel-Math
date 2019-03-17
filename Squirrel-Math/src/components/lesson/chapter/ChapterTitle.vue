<template>
  <div>
    <div class="chapter_name" ref="main" :contenteditable="editable">
      <slot></slot>
    </div>
    <hr>
  </div>
</template>

<script>
    export default {
        name: "ChapterTitle",
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
