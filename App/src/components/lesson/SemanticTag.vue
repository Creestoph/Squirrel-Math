<template>
    <div class="section">
        <div class="type">{{ attrs.tags.join(' | ') }}</div>
        <div class="warning" v-if="attrs.required.length">
            Wymagana znajomość tematu: {{ attrs.required.join(', ') }}
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{ attrs: { tags: string[]; required: string[] } }>();
</script>

<style scoped lang="scss">
@use '@/style/semantic-tag';
@use '@/style/colors';
@use '@/style/fonts';

.section {
    display: flex;
    align-items: center;

    + * {
        margin-top: 0 !important;
    }
}
.type:hover {
    background-color: colors.$darker-main-red;
    transition: background-color 0.1s;
}

.warning {
    font-family: fonts.$secondary-font;
    color: colors.$darker-gray;
    font-size: 0.9em;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    border-bottom: 2px solid colors.$main-red;
    border-top: 2px solid transparent;
    box-sizing: border-box;
}
</style>
