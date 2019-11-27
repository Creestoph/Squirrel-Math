<template>
  <div class="menu-trapeze">
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
        <div class="logo-text">
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
  }
</script>

<style scoped>
  .menu-trapeze 
  {
    position: absolute;
    top: 0px;
    left: -30px;
    border-bottom: 7px solid black; 
    border-right: 9.9px solid black; 
    background: #FEFEFE; 
    transform: skew(-45deg);
    width: 350px;
    height: 120px;
  }

  .menu
  {
    color: #000000; 
    margin: 0; 
    padding-top: 10px;
    padding-bottom: 10px;
    position: fixed;
    transform: skew(45deg);
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
    font-family: "Segoe UI";
    font-size: 1.5em;
    padding: -50px 0 0 400px;
    display: inline-block;
    color: #cc0000;
  }

  .menu .logo-text-2
  {
    font-weight: bold;
    font-family: "Segoe UI";
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
  }

  .menu .logo-container-cell
  {
    height: 30px;
    width: 30px;
    padding: 4px 4px 0 0;
    margin: 2px;
    background: none;
    border: none;
  }

  .menu .logo-red-cell
  {
    height: 40%;
    width: 40%;
    background: #cc0000;
    border: none;
    margin: 10% 10% 0 0;
  }

  @media screen and (max-width: 700px)
  {
    .menu
    {
      height: 80px;
      border-bottom: 10px solid black; 
    }

    .menu .logo 
    {
      margin-right: 50px;
    }

    .menu .logo-text
    {
      display: none;
    }

    .menu .logo-black-cell, .menu .logo-container-cell
    {
      height: 20px;
      width: 20px;
      padding: 3px 3px 0 0;
      margin: 2px;
    }
  }
</style>
