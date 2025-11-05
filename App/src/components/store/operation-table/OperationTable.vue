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

        <p style="text-align: center" class="math">
            {{ print(loperand.toString(), roperand.toString(), f(loperand, roperand).toString()) }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const loperand = ref(0);
const roperand = ref(0);
const props = withDefaults(
    defineProps<{
        defaultLoperand: number;
        defaultRoperand: number;
        f: (l: number, r: number) => number;
        print: (l: string, r: string, f: string) => string;
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
}

function reset() {
    loperand.value = props.defaultLoperand;
    roperand.value = props.defaultRoperand;
}
</script>

<style scoped lang="scss">
@use '@/style/global';
@use '@/style/colors';

.selected {
    background: colors.$creamy;
}

.selected-strong {
    background: colors.$darker-main-red;
}

table.operation-table {
    text-align: center;
    border-collapse: collapse;
    border-style: hidden;

    td,
    th {
        height: 32px;
        width: 32px;
    }

    td {
        border: 1px solid black;
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
