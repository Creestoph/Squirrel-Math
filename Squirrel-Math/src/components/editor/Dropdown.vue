<template>
    <button class="wrapper" @click="dropdownVisible = !dropdownVisible" @blur="dropdownVisible = false">
        <slot></slot> 
        <table class="dropdown" v-if="dropdownVisible">
            <tr v-for="(option, i) in options" :key="i" @click="$emit('selected', option); $event.stopPropagation()">
                <td>{{ option }}</td>
            </tr>
        </table>
    </button>
</template>

<script>
export default {
    name: "Dropdown",
    props: ["options"],
    data() {
        return {
            dropdownVisible: false,
        }
    }
};
</script>

<style scoped lang="scss">
@import "@/style/global";

.wrapper {
    position: relative;
}

.dropdown {
    position: absolute;
    left: 0;
    top: 100%;
    background: $gray;

    td {
        padding: 5px 10px;
        white-space: nowrap;
        text-align: left;
        &:hover {     
            background: $darker-gray;
        }
    }
}
</style>
