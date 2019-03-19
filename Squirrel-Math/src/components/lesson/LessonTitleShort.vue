<template>
    <div>
        <p class="lesson_title_short">
            <slot></slot>
        </p>

        <p class="lesson_subtitle">
            W pigułce
        </p>  
    </div>
</template>

<script>
    export default {
        name: "LessonTitleShort"
    }
</script>

<style scoped>
    p.lesson_title_short
    {
        text-align: center;
        font-size: 3.2em;
        font-weight: bold;
        font-family: "Corbel";
        margin: 50px auto 5px auto;
        clear:both;
    }

    p.lesson_subtitle
    {
        text-align: center;
        font-size: 1.6em;
        font-weight: bold;
        font-family: "Corbel";
        margin: 5px auto 50px auto;
        clear: both;
    }
</style>
