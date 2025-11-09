<template>
    <div ref="main" />
</template>

<script setup lang="ts">
import { DisplayTable } from '@/components/utils/columnar-operation/display-table';
import { onMounted, ref } from 'vue';
declare var MathJax: any;

const props = defineProps<{ operation: '+' | '-' | null; numbers: string[][] }>();
const main = ref<HTMLElement | null>(null);

onMounted(() => {
    DisplayTable.createFromTable(props.operation, props.numbers).print(main.value!);
    MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
});
</script>

<style lang="scss">
@use '@/style/columnar-operation';
</style>
