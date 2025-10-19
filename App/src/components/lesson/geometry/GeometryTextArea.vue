<template>
    <div
        class="area"
        :style="{
            left: attrs.x + 0.5 + 'px',
            top: attrs.y + 2 + 'px',
            background: attrs.fillColor,
            border: `3px solid ${attrs.borderColor}`,
            width: attrs.width + 'px',
            height: attrs.height + 'px',
        }"
    >
        <div class="align-wrapper" :style="{ 'vertical-align': attrs.align, color: attrs.textColor }">
            <div class="content"><slot /></div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    attrs: {
        x: number;
        y: number;
        width: number;
        height: number;
        fillColor: string;
        borderColor: string;
        textColor: string;
        align: 'top' | 'middle' | 'bottom';
    };
}>();
</script>

<style scoped lang="scss">
@use '@/style/global';

.area {
    position: absolute;
    cursor: move;
    box-sizing: border-box;
    display: table;

    .content {
        box-sizing: border-box;
        padding: 5px;
        outline: none;
    }

    .align-wrapper {
        display: table-cell;
    }
}
</style>
<style lang="scss">
.area p {
    margin: 0;
}
</style>
