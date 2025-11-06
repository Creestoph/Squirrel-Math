<template>
    <router-link :to="attrs.href" class="link">
        <slot />
    </router-link>
</template>

<script setup lang="ts">
defineProps<{ attrs: { href: string } }>();
</script>
