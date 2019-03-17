<template>
  <div class = "menu">
      <div class="logo">
          <div>
              <div class="logo-black-cell" style="float: left"></div>
              <div class="logo-container-cell" style="float: left">
                <div class="logo-red-cell" style="float: left"></div>
                <div class="logo-red-cell" style="float: left"></div>
                <div class="logo-red-cell" style="float: left"></div>
                <div class="logo-red-cell" style="float: left"></div>
              </div>
              <div class="logo-black-cell" style="float: left; clear: left"></div>
              <div class="logo-black-cell" style="float: left"></div>
          </div>
      </div>
      <div class="logo-text">
        <span class="logo-text-1">squirrel</span>
        <span class="logo-text-2">math</span>
      </div>

    <router-link tag="a" to="/"><button class = "button_convey"><span>STRONA GŁÓWNA</span></button></router-link>
    <router-link tag="a" to="/tree"><button class = "button_convey"><span>DRZEWO</span></button></router-link>
  </div>
</template>

<script>

  export default {
    name: "Menu",
  }
</script>

<style scoped>
  .menu
  {
    color: #000000; 
    background: #FEFEFE;  
    top: 0px;
    border-bottom: 15px solid black; 
    width: 100%;
    margin: 0; 
    padding-top: 10px;
    padding-bottom: 10px;
    height: 100px;
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

  button.button_convey
  {
    background-color: rgba(0, 0, 0, 0);
    border: none;
    color: black;
    text-align: center;
    text-decoration: none;
    font-size: 1.3em;
    font-family: "Segoe UI";
    font-weight: bold;
    cursor: pointer;
    display: inline-block;
    padding: 0 20px;
    line-height: 100px;
    transition: all 0.5s;
    cursor: pointer;
    margin: 0 5px;
  }

  button.button_convey:hover
  {
    box-shadow: none;
  }

  button.button_convey span 
  {
    display: inline-block;
    position: relative;
    transition: 0.5s;
  }

  button.button_convey span:after 
  {
    content: '»';
    position: absolute;
    opacity: 0;
    top: 0;
    right: -20px;
    transition: 0.5s;
  }

  button.button_convey:hover span 
  {
    padding-right: 25px;
    text-shadow: 2px 2px #CCCCCC;
  }

  button.button_convey:hover span:after 
  {
    opacity: 1;
    right: 0;
  }

  button.button_convey span a
  {
    color: black;
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

    button.button_convey
    {
      line-height: 80px;
      font-size: 1.2em;
    }
  }
</style>
