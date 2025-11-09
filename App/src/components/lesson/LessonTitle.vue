<template>
    <h1><slot /></h1>
</template>

<style scoped lang="scss">
@use '@/style/global';
@use '@/style/fonts';

h1 {
    text-align: center;
    font-size: 3.2em;
    font-weight: bold;
    font-family: fonts.$secondary-font;
    margin: 50px auto;
    clear: both;
    line-height: 1em;
}

@media screen and (max-width: 500px) {
    h1 {
        font-size: 2.7em;
    }
}
</style>
