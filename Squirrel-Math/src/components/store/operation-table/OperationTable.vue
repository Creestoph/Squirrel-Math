<template>
    <div>
        <table class="operation-table center" @mouseout="reset()">
            <tr>
                <th />
                <th
                    v-for="(i, n) in 10"
                    :key="n"
                    :class="{ selected: loperand == n && active }"
                >
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
                        'selected-strong':
                            loperand == m && roperand == n && active,
                    }"
                    @mouseover="set(m, n)"
                >
                    {{ f(m, n) }}
                </td>
            </tr>
        </table>

        <p style="text-align: center" class="math">
            {{
                print(
                    loperand.toString(),
                    roperand.toString(),
                    f(loperand, roperand).toString(),
                )
            }}
        </p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';

@Component
export default class OperationTable extends Vue {
    loperand: number = 0;
    roperand: number = 0;
    @Prop({ default: -1 }) defaultLoperand!: number;
    @Prop({ default: -1 }) defaultRoperand!: number;
    @Prop() f!: (l: number, r: number) => number;
    @Prop({
        default: () => '',
    })
    print!: (l: string, r: string, f: string) => string;
    @Prop({ default: true }) active!: boolean;

    created() {
        this.reset();
    }
    set(lop: number, rop: number) {
        this.loperand = lop;
        this.roperand = rop;
    }
    reset() {
        this.loperand = this.defaultLoperand;
        this.roperand = this.defaultRoperand;
    }
}
</script>

<style scoped lang="scss">
@import '@/style/global';

.selected {
    background: $creamy;
}

.selected-strong {
    background: $darker-main-red;
}

table.operation-table {
    text-align: center;
    border-collapse: collapse;
    border-style: hidden;

    td {
        height: 34px;
        width: 32px;
        border: 1px solid black;
    }

    th {
        height: 34px;
        width: 32px;
        border: 2px solid black;
        color: $darker-red;
    }
}
</style>
