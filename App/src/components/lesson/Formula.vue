<template>
    <div class="formula">
        <slot />
    </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import Vue from 'vue';

@Component
export default class Formula extends Vue {}
</script>

<style scoped lang="scss"></style>
