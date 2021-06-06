<template>
    <button class="wrapper" @click="dropdownVisible = !dropdownVisible">
        <div class="value"><slot name="placeholder">{{selectedOption}}</slot></div>
        <div v-if="array" class="array-down"></div> 
        <div class="dropdown" ref="dropdown" v-if="dropdownVisible" @click="select($event)">
            <slot></slot>
        </div>
    </button>
</template>

<script>
export default {
    name: "Dropdown",
    props: ["array"],
    data() {
        return {
            selectedOption: ' ',
            dropdownVisible: false,
        }
    },
    methods: {
        select(event) {
            this.dropdownVisible = false;
            event.stopPropagation();
            if (event.target != this.$refs.dropdown) {
                this.selectedOption = event.target.innerHTML;
                this.$emit('selected', this.selectedOption); 
            }
        }
    }
};
</script>

<style scoped lang="scss">
@import "@/style/global";

.wrapper {
    position: relative;
    text-align: left;
    display: flex;
    align-items: center;
}

.value {
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
}

.dropdown {
    position: absolute;
    left: 0;
    top: 100%;
    z-index: 2;
    max-height: 500px;
    overflow-y: auto;
    border: 1px solid $gray;
}

.array-down {
    float: right;
    width: 0; 
    height: 0; 
    margin: 10px 0 10px 10px;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 7px solid white;
}
</style>
