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

<style scoped lang="scss">
  @import "@/style/global";

  .chapter_name
  {
    margin-bottom:-11px; /*3px*/
    line-height: 1.8em;
  }

  .chapter_name > div
  {
    position: relative;
    cursor: pointer;
    font-family: $secondary-font;
    font-size: 1.9em;
    font-weight: bold;
    margin-top: 9px; /*50px*/
    margin-bottom:-11px; /*-3px*/
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
