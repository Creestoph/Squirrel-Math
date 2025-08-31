<template>
    <th
        :colspan="attrs.colspan"
        :rowspan="attrs.rowspan"
        :style="`background: ${attrs.background}; border-color: ${attrs.borderColor}; border-width: ${attrs.borderSize}px`"
    >
        <slot />
    </th>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';

@Component
export default class TableHeader extends Vue {
    @Prop() attrs?: any;
}
</script>
