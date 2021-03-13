<template>
    <div class="proof">
        <div class = "proof-sticker">Dowód</div>
        <slot/>
    </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import Vue from 'vue';

@Component
export default class Proof extends Vue { }
</script>

<style scoped lang="scss">
</style>

