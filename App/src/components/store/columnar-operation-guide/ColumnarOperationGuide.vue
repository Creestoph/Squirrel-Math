<template>
    <div>
        <zero-division-popup v-show="showZeroDivisionError" @close="showZeroDivisionError = false" />
        <p style="text-align: center">
            <input style="width: 85%" name="numberInput" type="text" ref="columnarOperationInput" />
        </p>
        <p style="text-align: center">
            <button class="button-red" style="float: center" @click="columnarOperationStart()">Start</button>
        </p>
        <div class="columnar-operation-script center" ref="columnarOperationArea">
            <table>
                <tr>
                    <td ref="buttonLeft" id="button-left" @click="prev()">
                        <svg height="0" width="30">
                            <defs>
                                <linearGradient id="gradient">
                                    <stop offset="20%" stop-color="#C33" />
                                    <stop offset="90%" stop-color="#833" />
                                </linearGradient>
                                <linearGradient id="hover-gradient">
                                    <stop offset="20%" stop-color="#A33" />
                                    <stop offset="90%" stop-color="#433" />
                                </linearGradient>
                            </defs>
                            <polygon points="20,0 0,30 20,60" />
                        </svg>
                    </td>
                    <td>
                        <div ref="table" class="no-selection" />
                        <p ref="commentElement" class="no-selection" />
                    </td>
                    <td ref="buttonRight" id="button-right" @click="next()">
                        <svg height="0" width="30">
                            <polygon points="0,0 20,30 0,60" />
                        </svg>
                    </td>
                </tr>
            </table>
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

const showZeroDivisionError = ref(false);
const table = ref<HTMLElement | null>(null);
const commentElement = ref<HTMLElement | null>(null);
const buttonRight = ref<HTMLElement | null>(null);
const buttonLeft = ref<HTMLElement | null>(null);
const columnarOperationInput = ref<HTMLInputElement | null>(null);
const columnarOperationArea = ref<HTMLDivElement | null>(null);

let columnarOperation: ColumnarOperation | null = null;

function columnarOperationStart() {
    let wrongInput = false;
    let operationType!:
        | typeof ColumnarAddition
        | typeof ColumnarSubtraction
        | typeof ColumnarMultiplication
        | typeof ColumnarDivision;

    if (
        props.operation === 'all' &&
        ['+', '-', '*', ':', '/'].filter((op) => columnarOperationInput.value!.value.includes(op)).length > 1
    ) {
        wrongInput = true;
    } else if (
        props.operation === 'addition' ||
        (props.operation === 'all' && columnarOperationInput.value!.value.includes('+'))
    ) {
        operationType = ColumnarAddition;
    } else if (
        props.operation === 'subtraction' ||
        (props.operation === 'all' && columnarOperationInput.value!.value.includes('-'))
    ) {
        operationType = ColumnarSubtraction;
    } else if (
        props.operation === 'multiplication' ||
        (props.operation === 'all' && columnarOperationInput.value!.value.includes('*'))
    ) {
        operationType = ColumnarMultiplication;
    } else if (
        props.operation === 'division' ||
        (props.operation === 'all' &&
            (columnarOperationInput.value!.value.includes(':') || columnarOperationInput.value!.value.includes('/')))
    ) {
        operationType = ColumnarDivision;
    } else {
        wrongInput = true;
    }

    if (wrongInput) {
        commentElement.value!.style.marginTop = '120px';
        buttonLeft.value!.style.visibility = 'hidden';
        buttonRight.value!.style.visibility = 'hidden';
        commentElement.value!.innerHTML = 'Wpisz jedno działanie do wykonania';
        table.value!.innerHTML = '';
        return;
    }
    columnarOperation = new operationType(table.value!, commentElement.value!, buttonLeft.value!, buttonRight.value!);
    try {
        columnarOperation.generateFromInput(columnarOperationInput.value!, columnarOperationArea.value!, props.floats);
        columnarOperation.start();
        MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
    } catch (err) {
        if (err instanceof ZeroDivisionError) {
            showZeroDivisionError.value = true;
        }
    }
}

function next() {
    columnarOperation!.next();
    MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
}

function prev() {
    columnarOperation!.prev();
    MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
}
</script>

<style scoped lang="scss">
.columnar-operation-script {
    border: 1px solid #888888;
    width: 80%;
    height: 0px;
    text-align: center;
    padding: 0; /*20px*/
    visibility: hidden;
    box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.2);

    table {
        width: 100%;
        height: 100%;
    }

    td {
        vertical-align: center;
    }
}

#button-left:hover,
#button-right:hover {
    transform: scale(1.2);

    polygon {
        fill: url(#hover-gradient);
    }
}

#buttonLeft + td {
    width: 75%;
    vertical-align: top;
}
</style>
