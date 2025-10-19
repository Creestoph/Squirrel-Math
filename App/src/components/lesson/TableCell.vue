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

<script setup lang="ts">
defineProps<{
    attrs: {
        colspan: number;
        rowspan: number;
        background: string;
        borderColor: string;
        borderLeft: number;
        borderRight: number;
        borderTop: number;
        borderBottom: number;
    };
}>();
</script>
