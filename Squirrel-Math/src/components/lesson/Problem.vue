<template>
    <div class="problem">
        <slot/>
    </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import Vue from 'vue';

@Component
export default class Problem extends Vue { }
</script>

<style scoped lang="scss">
</style>

