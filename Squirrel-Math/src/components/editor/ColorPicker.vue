<template>
    <button class="color-picker-wrapper" @blur="dropdownVisible = false">
        <div @click="dropdownVisible = !dropdownVisible"><slot></slot></div> 
        <div v-if="color" @click="dropdownVisible = !dropdownVisible">
            <div ref="fillColorPicker" class="color-picker ml-2" :style="{ background: color }"></div>
        </div>
        <table class="dropdown" v-if="dropdownVisible">
            <tr v-for="(row, i) in availableColors" :key="i">
                <td v-for="(cell, j) in row" :key="j" :class="{ active: cell == color }" @click="choose(cell)">
                    <div class="color-picker" :style="{ background: cell }"></div>
                </td>
            </tr>
        </table>
    </button>
</template>

<script>
export default {
    name: "ColorPicker",
    props: ["color"],
    data() {
        return {
            dropdownVisible: false,
            availableColors: [
                ['#ef0000', '#dd3333', '#cc4444', '#aa0000', '#990000'],
                ['#fff0f0', '#f5e0e0', '#eedddd', '#eeaaaa', '#dd8888'],
                ['white', '#fefefe', '#f6f6f6', '#f2f2f2', '#eeeeee'],
                ['#e0e0e0', '#cccccc', '#aaaaaa', '#777777', 'black']
            ]
        }
    },
    methods: {
        choose(color) {
            this.$emit('selected', color);
            this.dropdownVisible = false;
        }
    }
};
</script>

<style scoped lang="scss">
@import "@/style/global";

.color-picker-wrapper {
    position: relative;

  > div {
    display: flex;
    align-items: center;
    height: 47px;
    line-height: 47px;
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
    top: 47px;
    left: 0;
    background: $gray;
    width: unset !important;
    padding: 5px;

    td {
        border: none !important;
        padding: 0 5px !important;
        margin: 0 !important;
        min-width: unset !important;
        width: 30px !important;
        height: 34px;
        max-width: 100px !important;

        &:hover {
            
            > div {
                width: 24px;
                height: 24px;
                border-width: 0;
            }
        }

        &.active {
            background: $darker-gray;
        }
    }


}
</style>
