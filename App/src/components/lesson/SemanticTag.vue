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
.section + * {
    margin-top: 0 !important;
}
</style>
