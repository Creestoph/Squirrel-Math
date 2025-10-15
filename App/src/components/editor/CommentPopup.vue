<template>
    <div class="comment-editor" :style="positionStyle">
        <textarea v-model="commentText" @paste.stop ref="commentEditor" @keydown.esc="close()"></textarea>
        <button
            @click="hidden = !hidden"
            class="mode-button"
            :class="{ 'visible-mode': !hidden }"
            :title="`Zmień tryb wyświetlania komentarza. 
    Ukryte komentarze wyświetlają się tylko po najechaniu myszą na odpowiadający fragment tekstu. 
    Komentarze widoczne sygnalizowane są przy pomocy symbolu pytajnika.
    Obecny tryb: ${hidden ? 'Ukryty' : 'Widoczny'}`"
        >
            Tryb: {{ hidden ? 'Ukryty' : 'Widoczny' }}
        </button>
        <button @click="close()" class="apply-button">Zatwierdź</button>
    </div>
</template>

<script>
export const allComments = {};

export default {
    props: ['id', 'pos'],
    data() {
        return {
            commentText: '',
            hidden: false,
            positionStyle: null,
        };
    },
    methods: {
        close() {
            this.save(this.id);
            this.$emit('closed');
        },
        save(id) {
            allComments[id].text = this.commentText;
            allComments[id].hidden = this.hidden;
        },
        setId() {
            if (!allComments[this.id]) {
                allComments[this.id] = {
                    text: '',
                    hidden: false,
                };
            }

            this.commentText = allComments[this.id].text;
            this.hidden = allComments[this.id].hidden;
            this.$nextTick(() => this.$refs.commentEditor.focus());
        },
        setPosition() {
            this.positionStyle = {
                left: this.pos.x + window.pageXOffset + 'px',
                top: this.pos.y + window.pageYOffset + 'px',
            };
        },
    },
    mounted() {
        this.setId();
        this.setPosition();
    },
    watch: {
        id: function (_curr, prev) {
            this.save(prev);
            this.setId();
        },
        pos: function () {
            this.setPosition();
        },
    },
};
</script>

<style scoped lang="scss">
@use '@/style/global';
@use '@/style/colors';

.comment-editor {
    display: inline-block;
    position: absolute;
    margin-left: -330px;
    margin-top: 12px;
    width: 250px;
    height: 170px;
    z-index: 2;
    background: black;
    border-radius: 15px 0 15px 15px;
    color: white;
    padding: 10px;

    textarea {
        display: block;
        outline: none;
        background: black;
        color: colors.$gray;
        border: none;
        width: 250px;
        height: 120px;
        margin-bottom: 10px;
        padding: 0;
        resize: none;
    }
    button {
        border-radius: 5px;
        padding: 5px 10px;
    }
    .mode-button {
        background: black;
        color: white;
        border: 1px solid white;
    }
    .apply-button {
        background: white;
        color: black;
        float: right;
    }

    &:after {
        content: '';
        position: absolute;
        right: -29px;
        top: 0;
        width: 0;
        height: 0;
        border-right: 30px solid transparent;
        border-top: 30px solid black;
    }
}
</style>
