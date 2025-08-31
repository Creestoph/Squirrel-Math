<template>
    <p :style="`text-align: ${attrs.textAlign}`"><slot /></p>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';

@Component
export default class Paragraph extends Vue {
    @Prop() attrs?: any;
}
</script>
