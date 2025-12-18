<template>
    <button @click="dropdownVisible = !dropdownVisible" class="color-picker-wrapper" @blur="dropdownVisible = false">
        <div><slot></slot></div>
        <div v-if="color">
            <div ref="fillColorPicker" class="color-picker ml-2" :style="{ background: color }"></div>
        </div>
        <table class="dropdown" v-if="dropdownVisible">
            <tr v-for="(row, i) in availableColors" :key="i">
                <td
                    v-for="(cell, j) in row"
                    :key="j"
                    :class="{ active: cell == color }"
                    @click="
                        choose(cell);
                        $event.stopPropagation();
                    "
                >
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

<script setup lang="ts">
import { colors } from '@/style/palette';
import { ref } from 'vue';

defineProps<{ color?: string | null }>();
const emit = defineEmits<{ (event: 'selected', value: string): void }>();

const dropdownVisible = ref(false);
const availableColors = Array.from({ length: Math.ceil(colors.length / 5) }, (_, i) =>
    colors.slice(i * 5, (i + 1) * 5),
) as string[][];

function choose(color: string) {
    emit('selected', color);
    dropdownVisible.value = false;
}
</script>

<style scoped lang="scss">
@use '@/style/global';
@use '@/style/colors';

.color-picker-wrapper {
    position: relative;
    gap: 10px;

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
