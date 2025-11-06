<template>
    <div>
        <interactive-tree />
        <router-view />
        <app-menu />
    </div>
</template>

<script setup lang="ts">
import AppMenu from './AppMenu.vue';
import InteractiveTree from './InteractiveTree.vue';
</script>
