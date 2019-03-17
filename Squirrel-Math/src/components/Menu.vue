<template>
    <div>
          <router-link tag="div" to="/" class="btn btn-light">
          Home
        </router-link>          
        <router-link tag="div" to="/tree" class="btn btn-light">
          Tree
        </router-link>     
        <router-link tag="div" to="/editor" class="btn btn-light">
          Editor
        </router-link>
    </div>
</template>

<script>

  export default {
    name: "Menu",
  }
</script>

<style scoped>

</style>
