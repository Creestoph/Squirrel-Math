<template>
    <div ref="main" />
</template>

<script setup lang="ts">
import { DisplayTable } from '@/components/builtin-components/columnar-operation-guide/columnar-operation/display-table';
import { onMounted, ref } from 'vue';

const props = defineProps<{ numbers: string[] }>();
const main = ref<HTMLElement | null>(null);

onMounted(() => {
    new DisplayTable(props.numbers.map((n) => n.split(';'))).print(main.value!);
    MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
});
</script>

<style lang="scss">
@use '@/style/columnar-operation';
</style>
