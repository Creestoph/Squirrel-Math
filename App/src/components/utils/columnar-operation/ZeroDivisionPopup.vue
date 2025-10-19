<template>
    <div class="modal" :style="{ backgroundColor: (modalDisplayCount === 3 && '#000000') || undefined }">
        <div class="modal-content" style="text-align: center">
            <p style="text-align: center">
                {{ text }}
                <br />
            </p>
            <button class="button-red" v-if="modalDisplayCount < 3" style="float: center" @click="closeModal()">
                {{ buttonText }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['close']);

const modalDisplayCount = ref(0);
const text = ref('');
const buttonText = ref('');

updateModal();

function updateModal() {
    if (modalDisplayCount.value === 0) {
        text.value = 'Nie wolno dzielić przez 0!';
        buttonText.value = 'Rozumiem';
    } else if (modalDisplayCount.value === 1) {
        text.value = 'Nie próbuj dzielić przez zero!';
        buttonText.value = 'Przepraszam';
    } else if (modalDisplayCount.value === 2) {
        text.value = 'Znowu dzielisz przez 0.';
        buttonText.value = 'Już nie będę';
    } else if (modalDisplayCount.value === 3) {
        text.value = '#$#A%64g@##@!!!\n%%@#%5HGF!\n-_$@^&amp;##$@%!!!!\n*$(&amp;#!!AK_==3??';
    }
}

function closeModal() {
    emit('close');
    modalDisplayCount.value++;
    updateModal();
}
</script>

<style scoped lang="scss">
.modal {
    display: block;
    position: fixed;
    z-index: 1;
    padding-top: 100px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.7);
}

.modal-content {
    background: #eeeeee;
    top: calc(50% - 200px);
    width: 50%;
    padding: 30px;
    margin: auto;

    p {
        white-space: pre-line;
    }
}
</style>
