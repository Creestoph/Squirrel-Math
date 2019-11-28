<template>
  <div class="chapter_name">
    <div>
      <slot />
    </div>
    <hr>
  </div>
</template>

<script>
    export default {
        name: "ChapterTitle"
    }
</script>

<style scoped>
  .chapter_name
  {
    margin-bottom:-3px; /*11px*/
  }

  .chapter_name > div
  {
    position: relative;
    cursor: pointer;
    font-family: corbel;
    font-size: 1.9em;
    font-weight: bold;
    margin-top: 9px; /*50px*/
    margin-bottom:-3px; /*11px*/
  }

  .chapter_name > div + hr
  {
    width: 0%;
    border: 2px solid;
    border-color: white;
    transition: border-color 0.5s ease-in, width 0.4s;
    margin-left: 0px;
  }

  .chapter_name > div:hover + hr
  {
    width: 100%;
    border: 2px solid;
    border-color: black;
    transition: border-color 0.1s ease 0.2s, width 1s ease 0.2s;
    margin-left: 0px;
  }
</style>
