<template>
    <div>
        <zero-division-popup v-show="showZeroDivisionError" @close="showZeroDivisionError = false" />
        <div class="input-wrapper">
            <input type="text" @keydown.enter="onStart" v-model="enteredValue" />
            <button @click="onStart" :disabled="!enteredValue"><icon>play</icon></button>
        </div>
        <div class="mask" ref="mask">
            <div class="columnar-operation-script center" ref="columnarOperationArea">
                <button :style="{ visibility: hasPrev ? 'visible' : 'hidden' }" @click="prev()">
                    <icon class="icon">arrow_left</icon>
                </button>
                <div class="main-content" ref="mainContent">
                    <div ref="table" class="no-selection" />
                    <p ref="commentElement" class="no-selection" />
                </div>
                <button :style="{ visibility: hasNext ? 'visible' : 'hidden' }" @click="next()">
                    <icon class="icon">arrow_right</icon>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ColumnarAddition } from '../../utils/columnar-operation/columnar-addition';
import { ColumnarSubtraction } from '../../utils/columnar-operation/columnar-subtraction';
import { ColumnarDivision, ZeroDivisionError } from '../../utils/columnar-operation/columnar-division';
import { ColumnarMultiplication } from '../../utils/columnar-operation/columnar-multiplication';
import ZeroDivisionPopup from '../../utils/columnar-operation/ZeroDivisionPopup.vue';
import { ref } from 'vue';
import { ColumnarOperation } from '@/components/utils/columnar-operation/columnar-operation';
declare var MathJax: any;

const props = defineProps<{ operation: string; floats: boolean }>();

const enteredValue = ref('');
const hasNext = ref(false);
const hasPrev = ref(false);

const showZeroDivisionError = ref(false);
const table = ref<HTMLElement>(null!);
const commentElement = ref<HTMLElement>(null!);
const columnarOperationArea = ref<HTMLDivElement>(null!);
const mask = ref<HTMLDivElement>(null!);
const mainContent = ref<HTMLDivElement>(null!);

let columnarOperation: ColumnarOperation | null = null;

function onStart() {
    let wrongInput = false;
    let operationType!:
        | typeof ColumnarAddition
        | typeof ColumnarSubtraction
        | typeof ColumnarMultiplication
        | typeof ColumnarDivision;

    if (
        props.operation === 'all' &&
        ['+', '-', '*', ':', '/'].filter((op) => enteredValue.value.includes(op)).length > 1
    ) {
        wrongInput = true;
    } else if (props.operation === 'addition' || (props.operation === 'all' && enteredValue.value.includes('+'))) {
        operationType = ColumnarAddition;
    } else if (props.operation === 'subtraction' || (props.operation === 'all' && enteredValue.value.includes('-'))) {
        operationType = ColumnarSubtraction;
    } else if (
        props.operation === 'multiplication' ||
        (props.operation === 'all' && enteredValue.value.includes('*'))
    ) {
        operationType = ColumnarMultiplication;
    } else if (
        props.operation === 'division' ||
        (props.operation === 'all' && (enteredValue.value.includes(':') || enteredValue.value.includes('/')))
    ) {
        operationType = ColumnarDivision;
    } else {
        wrongInput = true;
    }

    if (wrongInput) {
        commentElement.value.style.marginTop = '120px';
        commentElement.value.innerHTML = 'Wpisz jedno działanie do wykonania';
        table.value.innerHTML = '';
        return;
    }
    columnarOperation = new operationType(table.value, commentElement.value);
    try {
        columnarOperation.generateFromInput(enteredValue.value, props.floats);
        columnarOperation.start();
        update();
    } catch (err) {
        if (err instanceof ZeroDivisionError) {
            showZeroDivisionError.value = true;
        }
    }
}

function next() {
    columnarOperation!.next();
    update();
}

function prev() {
    columnarOperation!.prev();
    update();
}

function update() {
    hasNext.value = columnarOperation!.hasNext();
    hasPrev.value = columnarOperation!.hasPrev();
    mask.value.style.height = columnarOperationArea.value.style.height = mainContent.value.clientHeight + 10 + 'px';
    MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
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
        top: -2px;
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

.columnar-operation-script {
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

    .main-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-height: 400px;

        div {
            flex: 1 1 auto;
            display: flex;
            align-items: center;
            padding: 30px 0 20px 0;
        }

        p {
            flex: 0 0 100px;
        }
    }
}
</style>
