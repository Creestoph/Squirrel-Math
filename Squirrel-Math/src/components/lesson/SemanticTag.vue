<template>
    <div class="section">
        <div class="type">{{ attrs.tags.join(' | ') }}</div>
        <div class="warning" v-if="attrs.required.length">
            Wymagana znajomość tematu: {{ attrs.required.join(', ') }}
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';

@Component
export default class SemanticTag extends Vue {
    @Prop() attrs?: any;
}
</script>

<style lang="scss">
.section + * {
    margin-top: 0 !important;
}
</style>
