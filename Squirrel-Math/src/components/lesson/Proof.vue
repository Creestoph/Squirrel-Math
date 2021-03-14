<template>
    <div class="proof">
        <div class = "proof-sticker">{{ attrs.label }}</div>
        <slot/>
    </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';

@Component
export default class Proof extends Vue { 
    @Prop() attrs?: any;  
}
</script>

<style scoped lang="scss">
</style>

