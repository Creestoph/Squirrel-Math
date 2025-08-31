<template>
    <table
        class="default-table"
        :style="{ minWidth: totalWidth ? totalWidth + 'px' : '' }"
    >
        <colgroup>
            <col
                v-for="(width, i) in attrs.columnWidths"
                :key="i"
                :style="{ width: width + 'px' }"
            />
        </colgroup>
        <slot />
    </table>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';

@Component
export default class DefaultTable extends Vue {
    @Prop() attrs?: { columnWidths: number[] };
    get totalWidth() {
        return this.attrs!.columnWidths
            ? this.attrs!.columnWidths.reduce(
                  (total, current) => total + current,
              )
            : '';
    }
}
</script>
