<template>
    <button class="wrapper" @click="dropdownVisible = !dropdownVisible">
        <slot name="placeholder"><div class="value">{{ selectedOption }}</div></slot>
        <div v-if="arrow" class="arrow-down"></div>
        <div class="dropdown" ref="dropdown" v-if="dropdownVisible" @click="select($event)" :style="opensToRight ? { left: '0' } : { right: '0' }">
            <slot></slot>
        </div>
    </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

withDefaults(defineProps<{ arrow?: boolean, opensToRight?: boolean }>(), {
    arrow: false,
    opensToRight: true,
});
const emit = defineEmits<{ (event: 'selected', value: string): void }>();

const selectedOption = ref(' ');
const dropdownVisible = ref(false);
const dropdown = ref<HTMLElement | null>(null);

function select(event: MouseEvent) {
    dropdownVisible.value = false;
    event.stopPropagation();

    const target = event.target as HTMLElement;
    if (target !== dropdown.value) {
        const value = target.getAttribute('value') ?? '';
        selectedOption.value = value;
        emit('selected', value);
    }
}
</script>

<style scoped lang="scss">
@use '@/style/global';
@use '@/style/colors';

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
    top: 100%;
    z-index: 2;
    max-height: 500px;
    overflow-y: auto;
    border: 1px solid colors.$gray;
}

.arrow-down {
    float: right;
    width: 0;
    height: 0;
    margin: 10px 0 10px 10px;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 7px solid white;
}
</style>
