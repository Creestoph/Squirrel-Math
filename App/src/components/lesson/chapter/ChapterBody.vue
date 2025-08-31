<template>
    <div class="chapter-mask" ref="chapterMask">
        <div class="chapter-body" ref="chapterBody">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import $ from 'jquery';
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';

@Component
export default class ChapterBody extends Vue {
    @Prop({ default: false }) initiallyZipped!: boolean;
    animate: boolean = true;
    maskHeight: number = 0;
    zipped: boolean = false;

    private mask!: JQuery<Element>;
    private body!: JQuery<Element>;
    mounted() {
        this.mask = $(this.$refs.chapterMask as Element);
        this.body = $(this.$refs.chapterBody as Element);
        this.$nextTick(() => {
            this.zipped = this.initiallyZipped;
            this.$emit('zipped', this.zipped);
            if (this.initiallyZipped) {
                this.maskHeight = this.mask.height()!;
                this.body.css('top', -this.maskHeight);
                this.mask.css('height', -this.maskHeight);
                this.mask.css('overflow', 'hidden');
            }
        });
    }

    toggleZip() {
        if (this.animate) {
            this.animate = false;
            if (this.zipped) {
                this.body.animate({ top: 0 }, 1100, 'swing', () => (this.animate = true));
                this.mask.animate({ height: '+=' + this.maskHeight }, 1100, 'swing', () => {
                    this.mask.css('overflow', 'visible');
                    this.mask.css('height', '');
                });
            } else {
                this.maskHeight = this.mask.height()!;
                this.body.animate({ top: '+=' + -this.maskHeight }, 1100, 'swing', () => (this.animate = true));
                this.mask.animate({ height: '+=' + -this.maskHeight }, 1100, 'swing', () =>
                    this.mask.css('overflow', 'hidden'),
                );
            }
            this.zipped = !this.zipped;
            this.$emit('zipped', this.zipped);
        }
    }
}
</script>

<style scoped lang="scss">
@import '@/style/chapter';
</style>
