<template>
    <td
        :colspan="attrs.colspan"
        :rowspan="attrs.rowspan"
        :style="`
            background: ${attrs.background};
            border-left-color: ${attrs.borderColorLeft};
            border-right-color: ${attrs.borderColorRight};
            border-top-color: ${attrs.borderColorTop};
            border-bottom-color: ${attrs.borderColorBottom};
            border-left-width: ${attrs.borderLeft}px;
            border-right-width: ${attrs.borderRight}px;
            border-top-width: ${attrs.borderTop}px;
            border-bottom-width: ${attrs.borderBottom}px;
        `"
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
        borderColorLeft: string;
        borderColorRight: string;
        borderColorTop: string;
        borderColorBottom: string;
        borderLeft: number;
        borderRight: number;
        borderTop: number;
        borderBottom: number;
    };
}>();
</script>
