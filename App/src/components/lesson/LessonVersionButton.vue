<template>
    <div>
        <div class="bookmark-shadow">
            <div class="bookmark">
                {{ !shortMode ? 'WERSJA SKRÓCONA' : 'WERSJA PEŁNA' }}
            </div>
        </div>
        <div class="bookmark-min">
            <div :class="!shortMode ? 'active' : ''">WERSJA PEŁNA</div>
            <div :class="!shortMode ? '' : 'active'">WERSJA SKRÓCONA</div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{ shortMode: boolean }>();
</script>

<style scoped lang="scss">
@use '@/style/global';
@use '@/style/fonts';

.bookmark {
    padding-left: 40px;
    padding-right: 40px;
    height: 60px;
    line-height: 60px;
    position: relative;
    background: black;
    color: white;
    font-weight: bold;
    font-family: fonts.$secondary-font;
    transition: padding-right 0.4s;
    cursor: pointer;
}

@media screen and (min-width: 500px) {
    .bookmark:before {
        content: '';
        position: absolute;
        left: -12px;
        bottom: 0;
        width: 25px;
        background: black;
        height: 50%;
        transform: skew(-40deg);
    }

    .bookmark:after {
        content: '';
        position: absolute;
        left: -12px;
        top: 0;
        width: 25px;
        background: black;
        height: 50%;
        transform: skew(40deg);
    }
}

.bookmark:hover {
    padding-right: 100px;
    transition: padding-right 0.5s;
}

@media screen and (max-width: 1200px) {
    .bookmark-shadow {
        float: right;
        overflow: auto;
        margin: 65px -5px 30px 0;
        padding-left: 30px;
    }
}

@media screen and (min-width: 1200px) {
    .bookmark-shadow {
        float: right;
        overflow: auto;
        box-shadow: 6px 3px 5px 0px rgba(0, 0, 0, 0.4);
        margin: 35px -15px 30px 0;
        margin-bottom: 30px;
        padding-left: 30px;
    }
}

@media screen and (max-width: 500px) {
    .bookmark-shadow {
        display: none;
    }

    .bookmark-min div {
        background: black;
        color: white;
        width: 50%;
        float: left;
        height: 60px;
        line-height: 60px;
        font-weight: bold;
        font-family: fonts.$secondary-font;
        text-align: center;
    }

    .bookmark-min div.active {
        background: white;
        color: black;
    }
}

@media screen and (min-width: 501px) {
    .bookmark-min {
        display: none;
    }
}
</style>
