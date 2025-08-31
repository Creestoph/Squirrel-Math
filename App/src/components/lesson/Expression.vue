<template>
    <div>$${{ attrs.mathJax }}$$</div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';

@Component
export default class Expression extends Vue {
    @Prop() attrs?: any;
}
</script>
