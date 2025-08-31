// https://stackoverflow.com/questions/49235964/vue-js-router-not-calling-beforerouteupdate-typescript
import Component from 'vue-class-component';
Component.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'beforeRouteUpdate',
]);
