<template>
    <div class="text-center">
        <input
            style="width: 80%"
            type="text"
            v-model="inputString"
            @keyup="recalc()"
        />
        <div
            class="mask"
            :style="{ height: numberString === '' ? 0 : lastH + 'px' }"
        >
            <div class="center out" ref="out">
                {{ numberString }}
            </div>
        </div>
    </div>
</template>

<script>
import { numberToStr } from './number_to_str.js';

export default {
    name: 'NumberToString',
    data() {
        return {
            inputString: '',
            numberString: '',
            lastH: 0,
        };
    },
    methods: {
        recalc() {
            this.inputString = this.inputString
                .replace(/ /g, '')
                .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            this.numberString = numberToStr(this.inputString);
            this.$nextTick(() => {
                this.lastH = this.$refs.out.clientHeight;
            });
        },
    },
};
</script>

<style scoped lang="scss">
.mask {
    overflow: hidden;
    border: 1px solid #dddddd;
    border-top: none;
    width: 80%;
    display: block;
    margin-top: -10px;
    margin: auto;
    transition: 1s ease;
}
.out {
    padding: 30px 20px 30px 20px;
    font-size: 0.8em;
}
</style>
