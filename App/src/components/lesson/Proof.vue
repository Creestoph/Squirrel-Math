<template>
    <div class="proof">
        <div class="proof-sticker">{{ attrs.label }}</div>
        <div class="warning" v-if="attrs.required.length">
            Wymagana znajomość tematu: {{ attrs.required.join(', ') }}
        </div>
        <slot />
    </div>
</template>

<script setup lang="ts">
defineProps<{ attrs: { label: string; required: string[] } }>();
</script>
