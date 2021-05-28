<template>
    <div v-if="visible" class="drafts-dialog">
        <div class="drafts-dialog-header">
            Wczytaj obraz
            <button @click="close()">x</button>
        </div>
        <div class="drafts-dialog-body">
            <span class="caption">Baza Squirrel-Math</span>
            <div class="images-gallery">
                <button v-for="(image, i) in globalImages" :key="i" @click="choose(image)">
                    <img :title="image.name" :alt="image.name" :src="image.src">
                </button>
            </div>
            <span class="caption">Obrazy w obrębie lekcji</span>
            <div class="images-gallery">
                <button v-for="(image, i) in lessonImages" :key="i" @click="choose(image)">
                    <img :title="image.name" :alt="image.name" :src="image.src">
                </button>
            </div>
            <label>
                Dodaj nowy
                <input type="file" @change="uploadImage($event.target.files)">
            </label>
        </div>
    </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import Vue from 'vue';

export interface Image {
    key: string,
    name: string;
    scoped: boolean;
    src?: string;
}

@Component
export default class ImagePicker extends Vue {    
    static globalImages: Image[] = [];
    static lessonImages: { [key: string]: Image } = {};

    visible = false;
    get globalImages() {
        return ImagePicker.globalImages;
    }

    get lessonImages() {
        return ImagePicker.lessonImages;
    }

    private onChoose?: (image: Image) => void;

    static srcOf(key: string, scoped: boolean): string {
        return scoped ? ImagePicker.lessonImages[key].src : require(`@/assets/global-images/${key}`);
    }

    constructor() {
        super()
        const global =  [
            { key: 'sheep.png', name: 'Owca' },
            { key: 'squirrel.png', name: 'Wiewiórka' }
        ];
        ImagePicker.globalImages = global.map(image => ({ ...image, src: ImagePicker.srcOf(image.key, false), scoped: false }));
    }

    open(callback: (image: Image) => void) {
        this.visible = true;
        this.onChoose = callback;
    }

    close() {
        this.visible = false;
    }

    choose(image: Image) {
        this.onChoose!(image);
        this.close();
    }

    uploadImage(files: FileList) {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            if (typeof fileReader.result === 'string') {
                const newImage = { src: fileReader.result, name: files[0].name, key: files[0].name, scoped: true };
                ImagePicker.lessonImages[newImage.key] = newImage;
                this.choose(newImage);
            }
        }
        fileReader.onerror = () => {
            console.log(fileReader.error);
        }
        fileReader.readAsDataURL(files[0]);
    }
}
</script>

<style scoped lang="scss">
@import "@/style/global";

.drafts-dialog {
    height: 460px;
}

.images-gallery {
    width: 100%;
    height: 140px;
}

img {
    float: left;
    margin: 10px;
    width: 140px;
    height: 105px;
    object-fit: contain;
    transition: transform 0.5s;
    cursor: pointer;

    &:hover {
        transform: scale(1.1);
    }
}

.caption {
    font-weight: bold;
    margin: 5px;
}

label {
    background: $main-red;
    padding: 5px 10px;
    margin: 10px 5px;
    color: white;
    cursor: pointer;

    &:hover {
        background: $dark-red;
    }

    input {
        display: none;
    }
}
</style>
