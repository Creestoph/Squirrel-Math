<template>
    <td
        :colspan="attrs.colspan"
        :rowspan="attrs.rowspan"
        :style="`background: ${attrs.background}; border-color: ${attrs.borderColor}; border-left-width: ${attrs.borderLeft}px;
      border-right-width: ${attrs.borderRight}px; border-top-width: ${attrs.borderTop}px; border-bottom-width: ${attrs.borderBottom}px`"
    >
        <slot />
    </td>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';

@Component
export default class TableCell extends Vue {
    @Prop() attrs?: any;
}
</script>
