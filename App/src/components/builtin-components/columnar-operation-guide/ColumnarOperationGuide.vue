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
                    <div v-if="!error" ref="table" class="no-selection" />
                    <p class="no-selection" v-html="commentText"></p>
                </div>
                <button :style="{ visibility: hasNext ? 'visible' : 'hidden' }" @click="next()">
                    <icon class="icon">arrow_right</icon>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ColumnarAddition } from './columnar-operation/columnar-addition';
import { ColumnarSubtraction } from './columnar-operation/columnar-subtraction';
import { ColumnarDivision, ZeroDivisionError } from './columnar-operation/columnar-division';
import { ColumnarMultiplication } from './columnar-operation/columnar-multiplication';
import ZeroDivisionPopup from './columnar-operation/ZeroDivisionPopup.vue';
import { nextTick, ref } from 'vue';
import { ColumnarOperation } from '@/components/builtin-components/columnar-operation-guide/columnar-operation/columnar-operation';
import { ColumnarFactorization } from '@/components/builtin-components/columnar-operation-guide/columnar-operation/columnar-factorization';

const props = defineProps<{ operation: string; floats: boolean }>();

const enteredValue = ref('');
const hasNext = ref(false);
const hasPrev = ref(false);

const showZeroDivisionError = ref(false);
const commentText = ref('');
const error = ref<boolean>(false);
const table = ref<HTMLElement>(null!);
const columnarOperationArea = ref<HTMLDivElement>(null!);
const mask = ref<HTMLDivElement>(null!);
const mainContent = ref<HTMLDivElement>(null!);

let columnarOperation: ColumnarOperation | null = null;

function onStart() {
    error.value = false;
    let operationType!:
        | typeof ColumnarAddition
        | typeof ColumnarSubtraction
        | typeof ColumnarMultiplication
        | typeof ColumnarDivision
        | typeof ColumnarFactorization;

    const operatorsCount = ['+', '-', '*', ':', '/'].filter((op) => enteredValue.value.includes(op)).length;

    if (props.operation === 'factorization') {
        if (operatorsCount > 0) {
            error.value = true;
            commentText.value = 'Wpisz jedną liczbę naturalną do rozłożenia na czynniki pierwsze, np. 120.';
            update();
            return;
        }
        operationType = ColumnarFactorization;
    } else if (props.operation === 'all' && operatorsCount !== 1) {
        error.value = true;
        commentText.value = 'Wpisz jedno działanie do wykonania';
        update();
        return;
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
    }

    nextTick(() => {
        columnarOperation = new operationType(table.value);
        try {
            columnarOperation.generateFromInput(enteredValue.value, props.floats);
            commentText.value = columnarOperation.start();
            update();
        } catch (err: any) {
            if (err instanceof ZeroDivisionError) {
                showZeroDivisionError.value = true;
            }
            commentText.value = typeof err === 'string' ? err : err.message;
            error.value = true;
            update();
        }
    });
}

function next() {
    commentText.value = columnarOperation!.next();
    update();
}

function prev() {
    commentText.value = columnarOperation!.prev();
    update();
}

function update() {
    hasNext.value = columnarOperation?.hasNext() || false;
    hasPrev.value = columnarOperation?.hasPrev() || false;
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
        justify-content: center;
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
