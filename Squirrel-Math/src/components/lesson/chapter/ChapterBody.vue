<template>
<div class="chapter_mask">
  <div class="chapter_body">
    <slot></slot>
  </div>
</div>
</template>

<script>
    export default {
        name: "ChapterBody"
    }
</script>

<style scoped>
  .chapter_body
  {
    position: relative;
    border: 0px solid black;
    margin-bottom: 90px;
    margin-top: 0px;
    padding: 0 25px;
    box-shadow: inset 0 0 0 0 rgba(0, 0, 0, 0.3);
  }

  .chapter_body > *:first-child 
  {
    margin-top: 0;
  }

  .chapter_mask
  {
    overflow: hidden;
    position: relative;
    border: 0px solid black;
    margin: 0; 
    margin-bottom: 0px;
    margin-top: 0px;
    padding: 0px;
    box-shadow: inset 0 0 0 0 rgba(0, 0, 0, 0.3);
  }
</style>
