<template>
    <span>${{ attrs.mathJax }}$</span>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';

@Component
export default class ExpressionInline extends Vue { 
    @Prop() attrs?: any;  
}
</script>
