<template>
    <table class="default-table" :style="{ minWidth: totalWidth ? totalWidth + 'px' : '' }">
        <colgroup>
            <col v-for="(width, i) in attrs.columnWidths" :key="i" :style="{ width: width + 'px' }" />
        </colgroup>
        <slot />
    </table>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{ attrs: { columnWidths: number[] } }>();

const totalWidth = computed<number | ''>(() =>
    props.attrs.columnWidths ? props.attrs.columnWidths.reduce((total, current) => total + current) : '',
);
</script>

<style scoped lang="scss">
.default-table {
    margin: 0 auto;

    > :slotted(tr) > td {
        padding: 0 2px;
        width: 26px;
        position: relative;
        border-style: solid;
        p {
            margin: 2px 0;
        }
    }
}
</style>
