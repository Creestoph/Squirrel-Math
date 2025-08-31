<template>
    <transition name="fade" v-show="visible">
        <div class="sm-tooltip" v-show="privVisible" :style="{ top: mousePos.y + 'px', left: mousePos.x + 'px' }">
            <slot />
        </div>
    </transition>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import Point from '@/components/utils/point';

@Component
export default class Tooltip extends Vue {
    mousePos: Point = new Point(0, 0);
    privVisible: boolean = false;
    currentTimeout: number = 0;
    @Prop({ default: new Point(0, 0) }) offset!: Point;
    @Prop({ default: 0 }) timeout!: number;
    @Prop({ default: false }) visible!: boolean;

    @Watch('visible')
    visibleChanged(val: boolean) {
        if (val) {
            this.currentTimeout = setTimeout(() => (this.privVisible = this.visible), this.timeout);
        } else {
            clearTimeout(this.currentTimeout);
            this.privVisible = false;
        }
    }

    mounted() {
        window.addEventListener('mousemove', this.onMouseOver);
    }

    destroyed() {
        window.removeEventListener('mousemove', this.onMouseOver);
    }

    onMouseOver(event: MouseEvent) {
        this.mousePos = new Point(Math.floor(event.clientX + this.offset.x), Math.floor(event.clientY + this.offset.y));
    }
}
</script>

<style scoped lang="scss">
.sm-tooltip {
    position: fixed;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>
