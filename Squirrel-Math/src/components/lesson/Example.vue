<template>
    <div class="example">
        <slot/>
    </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import Vue from 'vue';

@Component
export default class Example extends Vue { }
</script>

<style scoped lang="scss">
</style>

