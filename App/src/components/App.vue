<template>
    <div>
        <interactive-tree />
        <router-view />
        <app-menu />
    </div>
</template>

<script lang="ts">
import AppMenu from './AppMenu.vue';
import InteractiveTree from './InteractiveTree.vue';

export default {
    name: 'App',
    components: {
        AppMenu,
        InteractiveTree,
    },
};
</script>

<style lang="scss">
@use '@/style/global';

/* https://stackoverflow.com/questions/34550467/why-is-there-a-default-margin-on-the-body-element/34550634 */
body {
    margin: 0;
    padding: 0;
}

* {
    box-sizing: content-box;
}
</style>
