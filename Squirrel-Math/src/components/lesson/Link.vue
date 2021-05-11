<template>
    <router-link tag="a" :to="attrs.href" class="link">    
        <slot />
    </router-link>
</template>

<script lang="ts">
import { Prop, Component } from "vue-property-decorator";
import Vue from "vue";

@Component
export default class LessonLink extends Vue {
  @Prop() attrs?: { href: string };
}
</script>
