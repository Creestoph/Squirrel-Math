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
                    <div ref="globalImagesRow">
                        <button v-for="(image, i) in globalImages" :key="i" @click="choose(image)">
                            <img :title="image.name" :alt="image.name" :src="image.src" />
                        </button>
                    </div>
                </div>
                <button v-if="globalScrollable" @click="scrollGlobalLeft()">🢒</button>
            </div>
            <span class="caption">Obrazy w obrębie lekcji</span>
            <div class="images-gallery">
                <button v-if="localScrollable" @click="scrollLocalLeft()">🢐</button>
                <div class="images-row">
                    <div ref="localImagesRow">
                        <button v-for="(image, i) in lessonImages" :key="i">
                            <button
                                class="delete-image"
                                @click="
                                    onDeleteImage(image);
                                    $event.preventDefault();
                                "
                            >
                                ✖
                            </button>
                            <img :title="image.name" :alt="image.name" :src="image.src" @click="choose(image)" />
                        </button>
                    </div>
                </div>
                <button v-if="localScrollable" @click="scrollLocalRight()">🢒</button>
            </div>
            <label>
                Dodaj nowy
                <input type="file" @change="uploadImage($event.target.files)" />
            </label>
        </div>
    </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import Vue from 'vue';

export interface Image {
    key: string;
    name: string;
    scoped: boolean;
    src?: string;
}

@Component
export default class ImagePicker extends Vue {
    static globalImages: { [key: string]: Image } = {};
    static lessonImages: { [key: string]: Image } = {};

    visible = false;
    globalImages: { [key: string]: Image } = {};
    lessonImages: { [key: string]: Image } = {};

    private onChoose?: (image: Image) => void;
    private globalImagesScroll = 0;
    private lessonImagesScroll = 0;
    globalScrollable = false;
    localScrollable = false;

    static getImage(key: string): Image {
        return ImagePicker.lessonImages[key] || ImagePicker.globalImages[key];
    }

    constructor() {
        super();
        const global = [
            { key: 'sheep.png', name: 'Owca' },
            { key: 'squirrel.png', name: 'Wiewiórka' },
        ];
        global.forEach(
            (image) =>
                (ImagePicker.globalImages[image.key] = {
                    ...image,
                    src: require(`@/assets/global-images/${image.key}`),
                    scoped: false,
                }),
        );
        this.globalScrollable = Object.values(ImagePicker.globalImages).length > 5;
    }

    open(callback: (image: Image) => void) {
        this.visible = true;
        this.onChoose = callback;
        this.globalImages = ImagePicker.globalImages;
        this.lessonImages = ImagePicker.lessonImages;
        this.localScrollable = Object.values(this.lessonImages).length > 5;
        this.globalImagesScroll = 0;
        this.lessonImagesScroll = 0;
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
                const newImage = {
                    src: fileReader.result,
                    name: files[0].name,
                    key: files[0].name,
                    scoped: true,
                };
                ImagePicker.lessonImages[newImage.key] = newImage;
                this.choose(newImage);
            }
        };
        fileReader.onerror = () => {
            console.debug(fileReader.error);
        };
        fileReader.readAsDataURL(files[0]);
    }

    onDeleteImage(image: Image) {
        this.$emit('deleteImage', image);
    }

    deleteImage(image: Image) {
        delete ImagePicker.lessonImages[image.key];
        delete this.lessonImages[image.key];
        this.lessonImages = Object.assign({}, this.lessonImages);
        this.localScrollable = Object.values(this.lessonImages).length > 5;
    }

    scrollLocalLeft() {
        this.lessonImagesScroll = Math.min(this.lessonImagesScroll + 164, 0);
        (this.$refs.localImagesRow as HTMLElement).style.transform = `translateX(${this.lessonImagesScroll}px)`;
    }

    scrollLocalRight() {
        this.lessonImagesScroll = Math.max(
            this.lessonImagesScroll - 164,
            -(Object.values(ImagePicker.lessonImages).length - 5) * 164,
        );
        (this.$refs.localImagesRow as HTMLElement).style.transform = `translateX(${this.lessonImagesScroll}px)`;
    }

    scrollGlobalLeft() {
        this.globalImagesScroll = Math.min(this.globalImagesScroll + 164, 0);
        (this.$refs.localImagesRow as HTMLElement).style.transform = `translateX(${this.lessonImagesScroll}px)`;
    }

    scrollGlobalRight() {
        this.globalImagesScroll = Math.max(
            this.globalImagesScroll - 164,
            -(Object.values(ImagePicker.globalImages).length - 5) * 164,
        );
        (this.$refs.globalImagesRow as HTMLElement).style.transform = `translateX(${this.globalImagesScroll}px)`;
    }
}
</script>

<style scoped lang="scss">
@import '@/style/global';

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
