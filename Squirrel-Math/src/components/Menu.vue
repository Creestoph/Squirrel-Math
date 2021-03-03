<template>
  <div>
    <div class="menu-trapeze" ref="logo">
      <router-link tag="a" to="/" class="menu-segment">
        <div class="logo">
          <div>
            <div class="logo-black-cell" style="float: left"/>
            <div class="logo-container-cell" style="float: left">
              <div class="logo-red-cell" style="float: left"/>
              <div class="logo-red-cell" style="float: left"/>
              <div class="logo-red-cell" style="float: left"/>
              <div class="logo-red-cell" style="float: left"/>
            </div>
            <div class="logo-black-cell" style="float: left; clear: left"/>
            <div class="logo-black-cell" style="float: left"/>
          </div>
        </div>
        <div class="menu-text">
          <span class="logo-text-1">squirrel</span>
          <span class="logo-text-2">math</span>
        </div>
      </router-link>
      <router-link tag="a" to="/editor" class="menu-segment">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 13h-4v-1h4v1zm2.318-4.288l3.301 3.299-4.369.989 1.068-4.288zm11.682-5.062l-7.268 7.353-3.401-3.402 7.267-7.352 3.402 3.401zm-6 8.916v.977c0 4.107-6 2.457-6 2.457s1.518 6-2.638 6h-7.362v-20h14.056l1.977-2h-18.033v24h10.189c3.163 0 9.811-7.223 9.811-9.614v-3.843l-2 2.023z"/></svg>        
        <div class="menu-text">edytor</div>
      </router-link>
    </div>
  </div>
</template>

<script>

  export default {
    name: "Menu",
    mounted() {
      addEventListener("scroll", this.resizeLogo)
      this.resizeLogo();
    },
    destroyed() {
      removeEventListener("scroll", this.resizeLogo)
    },
    methods: {
      resizeLogo() {
        var logo = this.$refs.logo
        if (document.body.scrollTop > 5 || document.documentElement.scrollTop > 5 || window.innerWidth < 700) {
          if (!logo.classList.contains('menu-small')) {
            logo.classList.toggle('menu-small');
            Array.from(document.getElementsByClassName('menu-text')).forEach(label => label.style.display = 'none');
          }
        } 
        else {
          if (logo.classList.contains('menu-small')) {
            logo.classList.toggle('menu-small');
            setTimeout(_ => { 
              if (!logo.classList.contains('menu-small')) 
                Array.from(document.getElementsByClassName('menu-text')).forEach(label => label.style.display = 'block');
            }, 500);
          }
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "@/style/global";
  $transition-length: 0.7s;

  .menu-trapeze 
  {
    position: fixed;
    top: 0px;
    left: -160px;
    transform: skew(-45deg);
    background: white;
    padding-left: 100px;
    transition: left $transition-length;
  }

  .menu-segment
  {
    border-bottom: 7px solid black; 
    border-right: 9.9px solid black; 
    float: left;
    height: 100px;
    transition: all $transition-length;
    padding: 15px 10px 15px 40px;
    line-height: 100px;
    
    > * {
      transform: skew(45deg);
    }
  }

  .menu-segment:nth-child(1)
  {
    width: 300px;
    background: white;
  }

  .menu-segment:nth-child(2)
  {
    width: 145px;
    background: $gray;
    color: $half-gray;
  }

  .logo 
  {
    float: left;
    margin-right: 60px;

    > div
    {
      transform: translateX(60px) translateY(24px) rotate(45deg);
    }

    .logo-black-cell
    {
      height: 30px;
      width: 30px;
      background: black;
      border: 0px solid white;
      padding: 4px 4px 0 0;
      margin: 2px;
      transition: all $transition-length;
    }

    .logo-container-cell
    {
      height: 30px;
      width: 30px;
      padding: 4px 4px 0 0;
      margin: 2px;
      background: none;
      border: none;
      transition: all $transition-length;
    }

    .logo-red-cell
    {
      height: 40%;
      width: 40%;
      background: $logo-red;
      border: none;
      margin: 10% 10% 0 0;
    } 
  }

  svg {
    float: left;
    fill: $half-gray;
    width: 50px;
    padding: 30px 0;
    transition: padding $transition-length;
  }

  .menu-text
  {
    float: left;
    font-family: $main-font;
    font-weight: bold;
    font-size: 1.5em;
    transition: all $transition-length;
  }

  .logo-text-1
  {
    color: $logo-red;
  }

  .logo-text-2
  {
    color: black;
  }

  .menu-trapeze.menu-small
  {
    left: -160px;

    .menu-segment 
    {
      border-bottom: 4px solid black;
      border-right: 5.65px solid black;
      height: 90px;
      padding: 0 20px 0 30px;

      &:first-child
      {
        width: 120px;
      }

      &:nth-child(2)
      {
        width: 60px;
      }
    }

    svg
    {
      padding: 20px 5px;
    }

    .logo-black-cell, .logo-container-cell
    {
      height: 20px;
      width: 20px;
      padding: 3px 3px 0 0;
      margin: 2px;
      transition: all $transition-length;
    }
  }
</style>
