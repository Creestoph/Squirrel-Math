<template>
    <router-link tag="a" :to="attrs.href" class="link">
        <slot />
    </router-link>
</template>

<script setup lang="ts">
defineProps<{ attrs: { href: string } }>();
</script>
