<template>
  <div class="menu-trapeze" ref="logo">
    <div class="menu">
      <router-link
        tag="a"
        to="/"
      >
        <div class="logo">
          <div>
            <div
              class="logo-black-cell"
              style="float: left"
            />
            <div
              class="logo-container-cell"
              style="float: left"
            >
              <div
                class="logo-red-cell"
                style="float: left"
              />
              <div
                class="logo-red-cell"
                style="float: left"
              />
              <div
                class="logo-red-cell"
                style="float: left"
              />
              <div
                class="logo-red-cell"
                style="float: left"
              />
            </div>
            <div
              class="logo-black-cell"
              style="float: left; clear: left"
            />
            <div
              class="logo-black-cell"
              style="float: left"
            />
          </div>
        </div>
        <div class="logo-text" ref="logoText">
          <span class="logo-text-1">squirrel</span>
          <span class="logo-text-2">math</span>
        </div>
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
          if (!logo.classList.contains('small')) {
            logo.classList.toggle('small');
            this.$refs.logoText.style.display = 'none';
          }
        } 
        else {
          if (logo.classList.contains('small')) {
            logo.classList.toggle('small');
            setTimeout(_ => { 
              if (!logo.classList.contains('small')) 
                this.$refs.logoText.style.display = 'block'
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
    left: -130px;
    border-bottom: 7px solid black; 
    border-right: 9.9px solid black; 
    background: white; 
    transform: skew(-45deg);
    width: 450px;
    height: 120px;
    transition: all  $transition-length;
  }

 .menu-trapeze.small
  {
    width: 230px;
    height: 90px;
    border-bottom: 4px solid black;
    border-right: 5.65px solid black;
    transition: all $transition-length;

    .menu
    {
      padding: 0 0 0 90px;
      transition: padding $transition-length;
    }

    .menu .logo-black-cell, .menu .logo-container-cell
    {
      height: 20px;
      width: 20px;
      padding: 3px 3px 0 0;
      margin: 2px;
      transition: all $transition-length;
    }
  }

  .menu
  {
    color: black; 
    margin: 0; 
    padding: 10px 0 10px 100px;
    position: fixed;
    transform: skew(45deg);
    transition: padding $transition-length;
  }

  .menu button
  {
    float: left;
  }

  .menu .logo 
  {
    float: left;
  }

  .menu .logo > div
  {
    transform:  translateX(60px) translateY(24px) rotate(45deg);
  }

  .menu .logo-text
  {
    float: left;
    padding: 32px 50px 0 50px;
  }

  .menu .logo-text-1
  {
    font-weight: bold;
    font-family: $main-font;
    font-size: 1.5em;
    padding: -50px 0 0 400px;
    display: inline-block;
    color: $logo-red;
  }

  .menu .logo-text-2
  {
    font-weight: bold;
    font-family: $main-font;
    font-size: 1.5em;
    color: black;
  }

  .menu .logo-black-cell
  {
    height: 30px;
    width: 30px;
    background: black;
    border: 0px solid white;
    padding: 4px 4px 0 0;
    margin: 2px;
    transition: all $transition-length;
  }

  .menu .logo-container-cell
  {
    height: 30px;
    width: 30px;
    padding: 4px 4px 0 0;
    margin: 2px;
    background: none;
    border: none;
    transition: all $transition-length;
  }

  .menu .logo-red-cell
  {
    height: 40%;
    width: 40%;
    background: $logo-red;
    border: none;
    margin: 10% 10% 0 0;
  }
</style>
