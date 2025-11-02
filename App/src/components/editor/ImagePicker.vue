<template>
    <div v-if="visible" class="drafts-dialog">
        <div class="drafts-dialog-header">
            Wczytaj obraz
            <button @click="close()">✖</button>
        </div>
        <div class="drafts-dialog-body">
            <span class="caption">Baza Squirrel-Math</span>
            <div class="images-gallery">
                <button v-if="globalScrollable" @click="scrollGlobalLeft()">🢐</button>
                <div class="images-row">
                    <div :style="{ transform: `translateX(${globalImagesScroll}px)` }">
                        <button v-for="(image, key) in globalImgs" :key="key" @click="choose(key)">
                            <img :title="image.name" :alt="image.name" :src="image.src" />
                        </button>
                    </div>
                </div>
                <button v-if="globalScrollable" @click="scrollGlobalRight()">🢒</button>
            </div>
            <span class="caption">Obrazy w obrębie lekcji</span>
            <div class="images-gallery">
                <button v-if="localScrollable" @click="scrollLocalLeft()">🢐</button>
                <div class="images-row">
                    <div :style="{ transform: `translateX(${lessonImagesScroll}px)` }">
                        <button v-for="(image, key) in lessonImgs" :key="key">
                            <button
                                class="delete-image"
                                @click="
                                    onDeleteImage(image);
                                    $event.preventDefault();
                                "
                            >
                                ✖
                            </button>
                            <img :title="image.name" :alt="image.name" :src="image.src" @click="choose(key)" />
                        </button>
                    </div>
                </div>
                <button v-if="localScrollable" @click="scrollLocalRight()">🢒</button>
            </div>
            <label>
                Dodaj nowy
                <input type="file" @change="uploadImage($event)" />
            </label>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { globalImages, lessonImages } from './shared-state';
import { ImageData } from '@/models/lesson';

const props = defineProps<{ visible: boolean }>();
const emit = defineEmits<{
    (event: 'select', value: string): void;
    (event: 'delete', value: ImageData, confirmedDelete: () => void): void;
    (event: 'close'): void;
}>();
const globalImgs = ref<{ [key: string]: ImageData }>({});
const lessonImgs = ref<{ [key: string]: ImageData }>({});
const globalScrollable = computed(() => Object.values(globalImages.value).length > 5);
const localScrollable = computed(() => Object.values(lessonImages.value).length > 5);

const globalImagesScroll = ref(0);
const lessonImagesScroll = ref(0);

watch(
    () => props.visible,
    () => {
        globalImgs.value = globalImages.value;
        lessonImgs.value = lessonImages.value;
        globalImagesScroll.value = 0;
        lessonImagesScroll.value = 0;
    },
);

function close() {
    emit('close');
}

function choose(key: string | number) {
    emit('select', key as string);
    close();
}

function uploadImage(event: Event) {
    const files = (event.target! as HTMLInputElement).files!;
    const fileReader = new FileReader();
    fileReader.onload = () => {
        if (typeof fileReader.result === 'string') {
            const newImage = {
                src: fileReader.result,
                name: files[0].name,
            };
            lessonImages.value[newImage.name] = newImage;
            choose(newImage.name);
        }
    };
    fileReader.onerror = () => console.debug(fileReader.error);
    fileReader.readAsDataURL(files[0]);
}

function onDeleteImage(image: ImageData) {
    emit('delete', image, () => {
        delete lessonImages.value[image.name];
        delete lessonImgs.value[image.name];
        lessonImgs.value = { ...lessonImgs.value };
    });
}

function scrollLocalLeft() {
    lessonImagesScroll.value = Math.min(lessonImagesScroll.value + 164, 0);
}

function scrollLocalRight() {
    lessonImagesScroll.value = Math.max(
        lessonImagesScroll.value - 164,
        -(Object.values(lessonImages.value).length - 5) * 164,
    );
}

function scrollGlobalLeft() {
    globalImagesScroll.value = Math.min(globalImagesScroll.value + 164, 0);
}

function scrollGlobalRight() {
    globalImagesScroll.value = Math.max(
        globalImagesScroll.value - 164,
        -(Object.values(globalImages.value).length - 5) * 164,
    );
}
</script>

<style scoped lang="scss">
@use '@/style/global';
@use '@/style/colors';

.drafts-dialog {
    width: 930px;
    height: 480px;
    left: calc(50% - 455px);
}

.images-gallery {
    width: 100%;
    height: 140px;
    > button {
        float: left;
        width: 30px;
        line-height: 100px;
        font-size: 6em;
        text-align: center;
        transition: transform 0.2s;
        &:hover {
            transform: scale(1.25);
        }
    }
    .images-row {
        float: left;
        width: 820px;
        overflow: hidden;
        > div {
            transition: transform 0.7s;
            width: max-content;
            > button {
                position: relative;
                padding: 0;
                width: 164px;
                height: 123px;
                .delete-image {
                    display: none;
                    position: absolute;
                    z-index: 2;
                    right: 0;
                    top: 0;
                    width: 30px;
                    height: 30px;
                    padding: 0;
                    background: rgba(200, 200, 200, 0.5);
                    color: black;
                }
                &:hover .delete-image {
                    display: block;
                }
            }
        }
    }
}

img {
    float: left;
    box-sizing: content-box;
    margin: 9px 12px;
    width: 140px;
    height: 105px;
    object-fit: contain;
    transition: transform 0.5s;
    cursor: pointer;

    &:hover {
        transform: scale(1.17);
    }
}

.caption {
    display: inline-block;
    font-weight: bold;
    margin: 10px 5px 0 5px;
}

label {
    background: colors.$main-red;
    padding: 5px 10px;
    margin: 10px 5px;
    color: white;
    cursor: pointer;

    &:hover {
        background: colors.$dark-red;
    }

    input {
        display: none;
    }
}
</style>
