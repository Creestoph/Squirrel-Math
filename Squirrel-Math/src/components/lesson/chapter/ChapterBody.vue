<template>
<div class="chapter_mask">
  <div class="chapter_body" ref="main" :contenteditable="editable">
    <slot></slot>
  </div>
</div>
</template>

<script>
    export default {
        name: "ChapterBody",
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
