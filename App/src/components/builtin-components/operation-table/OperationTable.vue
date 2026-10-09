<template>
    <div>
        <table class="operation-table center" @mouseout="reset()">
            <tbody>
                <tr>
                    <th />
                    <th v-for="(i, n) in 10" :key="n" :class="{ selected: loperand == n && active }">
                        {{ n }}
                    </th>
                </tr>
                <tr v-for="(i, n) in 10" :key="n">
                    <th :class="{ selected: roperand == n && active }">{{ n }}</th>
                    <td
                        v-for="(j, m) in 10"
                        :key="m"
                        :class="{
                            selected: (loperand == m || roperand == n) && active,
                            'selected-strong': loperand == m && roperand == n && active,
                        }"
                        @mouseover="set(m, n)"
                    >
                        {{ f(m, n) }}
                    </td>
                </tr>
            </tbody>
        </table>

        <p style="text-align: center" class="math" v-if="loperand !== -1 && roperand !== -1">
            {{ displayedText }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue';

const loperand = ref(0);
const roperand = ref(0);
const displayedText = ref('');
const props = withDefaults(
    defineProps<{
        defaultLoperand: number;
        defaultRoperand: number;
        f: (l: number, r: number) => number;
        print: (l: number, r: number, f: number) => string;
        active?: boolean;
    }>(),
    {
        defaultLoperand: -1,
        defaultRoperand: -1,
        f: () => 0,
        print: () => '',
        active: true,
    },
);

reset();

function set(lop: number, rop: number) {
    loperand.value = lop;
    roperand.value = rop;
    try {
        displayedText.value = props.print(loperand.value, roperand.value, props.f(loperand.value, roperand.value));
        nextTick(() => MathJax.Hub.Queue(['Typeset', MathJax.Hub]));
    } catch (e) {
        displayedText.value = `${e}`;
    }
}

function reset() {
    set(props.defaultLoperand, props.defaultRoperand);
}
</script>

<style scoped lang="scss">
@use '@/style/global';
@use '@/style/colors';

table.operation-table {
    text-align: center;
    border-collapse: collapse;
    border-style: hidden;

    td,
    th {
        height: 32px;
        width: 32px;

        &.selected {
            background: colors.$creamy;
        }
    }

    td {
        border: 1px solid colors.$half-gray;

        &.selected-strong {
            color: colors.$light-creamy;
            background: colors.$darker-main-red;
            border: 2px solid black;
        }
    }

    th {
        border: 2px solid black;
        color: colors.$darker-red;
    }

    tr:first-child th,
    tr:first-child td {
        border-top: none;
    }

    tr:last-child th,
    tr:last-child td {
        border-bottom: none;
    }

    th:first-child,
    td:first-child {
        border-left: none;
    }

    th:last-child,
    td:last-child {
        border-right: none;
    }
}
</style>
