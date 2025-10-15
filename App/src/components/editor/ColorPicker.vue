<template>
    <button class="color-picker-wrapper" @blur="dropdownVisible = false">
        <div @click="dropdownVisible = !dropdownVisible"><slot></slot></div>
        <div v-if="color" @click="dropdownVisible = !dropdownVisible">
            <div ref="fillColorPicker" class="color-picker ml-2" :style="{ background: color }"></div>
        </div>
        <table class="dropdown" v-if="dropdownVisible">
            <tr v-for="(row, i) in availableColors" :key="i">
                <td v-for="(cell, j) in row" :key="j" :class="{ active: cell == color }" @click="choose(cell)">
                    <div
                        class="color-picker"
                        :class="{ 'no-color': cell == '#00000000' }"
                        :style="{ background: cell }"
                    ></div>
                </td>
            </tr>
        </table>
    </button>
</template>

<script>
import { colors } from '@/style/palette';

export default {
    name: 'ColorPicker',
    props: ['color'],
    data() {
        return {
            dropdownVisible: false,
            availableColors: Array.from({ length: Math.ceil(colors.length / 5) }, (_, i) =>
                colors.slice(i * 5, (i + 1) * 5),
            ),
        };
    },
    methods: {
        choose(color) {
            this.$emit('selected', color);
            this.dropdownVisible = false;
        },
    },
};
</script>

<style scoped lang="scss">
@use '@/style/global';
@use '@/style/colors';

.color-picker-wrapper {
    position: relative;

    > div {
        display: flex;
        align-items: center;
        height: 24px;
    }
}

.color-picker {
    width: 20px;
    height: 20px;
    border: 2px solid black;
}

.dropdown {
    position: absolute;
    display: block;
    clear: both;
    top: 44px;
    left: 0;
    background: colors.$gray;
    width: unset !important;
    padding: 5px;
    z-index: 1;

    td {
        border: none !important;
        padding: 0 5px !important;
        margin: 0 !important;
        min-width: unset !important;
        width: 30px !important;
        height: 34px;
        max-width: 100px !important;

        &.active {
            background: colors.$darker-gray;
        }

        &:hover {
            > div {
                width: 24px;
                height: 24px;
                border-width: 0;
                &.no-color::before {
                    width: 24px;
                    line-height: 24px;
                }
            }
        }

        > div.no-color {
            position: relative;
            &::before {
                content: '✖';
                position: absolute;
                top: 0;
                left: 0;
                line-height: 20px;
                width: 20px;
            }
        }
    }
}
</style>
