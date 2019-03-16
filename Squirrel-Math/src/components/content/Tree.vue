<template>    
<div>
    
        <router-link v-for="c in chapters" :key="c" tag="div" :to="'/' + c" class="btn btn-light">
          {{c}}
        </router-link>
</div>
</template>

<script>

  export default {
    name: "Tree",
    data(){
        return {
            chapters: ['dodawanie']
        }
    }
  }
</script>

<style scoped>

</style>
