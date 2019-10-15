<template>
    <div>
        <ul>
            <li @click="$emit('addChapter')">Add Chapter</li>
            <li @click="$emit('test')">Test</li>
        </ul>
    </div> 
</template>

<script>

export default {
  name: "EditorMenu"
};
</script>

<style scoped>

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  li {
    display: inline;
    background-color: gray;
    cursor: pointer;
  }
</style>
