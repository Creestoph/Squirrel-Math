<template>
    <div>
        <div class="input-wrapper">
            <input type="text" @keydown.enter="onStart" v-model="enteredValue" />
            <button @click="onStart" :disabled="!enteredValue"><icon>play</icon></button>
        </div>
        <div class="mask" ref="maskArea">
            <div class="step center" ref="stepArea">
                <button :style="{ visibility: hasPrev ? 'visible' : 'hidden' }" @click="onPrev()">
                    <icon class="icon">arrow_left</icon>
                </button>
                <div class="content" ref="contentArea">
                    <slot v-if="steps[step]" :stepData="steps[step]" />
                </div>
                <button :style="{ visibility: hasNext ? 'visible' : 'hidden' }" @click="onNext()">
                    <icon class="icon">arrow_right</icon>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" generic="Step">
import { computed, nextTick, ref } from 'vue';

const props = defineProps<{ generateSteps: (input: string) => Step[] }>();
const enteredValue = ref('');

const maskArea = ref<HTMLDivElement>(null!);
const stepArea = ref<HTMLDivElement>(null!);
const contentArea = ref<HTMLDivElement>(null!);

const step = ref<number>(0);
const steps = ref<Step[]>([]);
const hasNext = computed(() => step.value < steps.value.length - 1);
const hasPrev = computed(() => step.value > 0);

function onStart() {
    steps.value = props.generateSteps(enteredValue.value);
    step.value = 0;
    update();
}

function onNext() {
    step.value += 1;
    update();
}

function onPrev() {
    step.value -= 1;
    update();
}

function update() {
    nextTick(() => {
        MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
        maskArea.value.style.height = stepArea.value.style.height = contentArea.value.clientHeight + 10 + 'px';
    });
}
</script>

<style lang="scss">
@use '@/style/columnar-operation';
</style>

<style scoped lang="scss">
@use '@/style/colors';

.input-wrapper {
    border-radius: 10px;
    border: 1px solid colors.$darker-gray;
    display: flex;
    padding: 1px 30px 1px 10px;
    gap: 10px;
    position: relative;
    background-color: white;

    &:focus {
        border-color: colors.$darker-creamy;
        outline: none;
        box-shadow: 0 0 15px 0 colors.$creamy;
    }

    input {
        border: none;
        flex: 1;
        font-size: 0.9em;
    }

    button {
        position: absolute;
        height: 24px;
        padding: 5px 10px;
        border-radius: 10px;
        right: -1px;
        top: -4px;
        background-color: colors.$main-red;
        color: white;

        &[disabled] {
            background-color: colors.$gray;
            color: colors.$half-gray;
            cursor: not-allowed;
        }
    }
}

.mask {
    overflow: hidden;
    transition: height 1s ease;
    height: 0;
    border: 1px solid colors.$gray;
    box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.2);
    border-top: none;
    margin-top: -10px;
}

.step {
    display: flex;
    width: 100%;
    text-align: center;
    padding: 0;
    align-items: center;
    gap: 10px;

    button {
        height: 100%;
        width: 70px;

        .icon {
            width: 50px;
            height: 50px;
            color: colors.$darker-gray;
            transition: transform 0.5s;
        }

        &:hover .icon {
            color: colors.$half-gray;
            transform: scale(1.2);
        }
    }

    .content {
        flex: 1;
    }
}
</style>
