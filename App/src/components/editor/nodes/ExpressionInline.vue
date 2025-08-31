<template>
    <span>
        <span v-show="!mathJax" class="math-placeholder" @click="edit()">Wprowadź wyrażenie matematyczne</span>
        <span v-show="mathJax" ref="output" class="math-display" @click="edit()"></span>
        <textarea
            v-if="displayPopup"
            v-model="mathJaxDirty"
            @paste.stop
            ref="mathEditor"
            class="math-editor"
            placeholder="Wprowadź kod MathJax"
            @blur="applyEdit()"
        ></textarea>
    </span>
</template>

<script>
export default {
    props: ['node', 'updateAttrs', 'view'],
    computed: {
        mathJax: {
            get() {
                return this.node.attrs.mathJax;
            },
            set(mathJax) {
                this.updateAttrs({ mathJax });
            },
        },
    },
    data() {
        return {
            mathJaxDirty: '',
            displayPopup: false,
        };
    },
    mounted() {
        this.updateView();
        if (!this.mathJax) {
            this.edit();
        }
    },
    methods: {
        edit() {
            this.mathJaxDirty = this.mathJax;
            this.displayPopup = true;
            this.$nextTick(() => this.$refs.mathEditor.focus());
        },
        applyEdit() {
            this.mathJax = this.mathJaxDirty;
            this.updateView();
            this.$nextTick(() => {
                this.$refs.output.focus();
            });
        },
        updateView() {
            this.displayPopup = false;
            this.$refs.output.innerHTML = '$' + this.mathJax + '$';
            this.$nextTick(() => MathJax.Hub.Queue(['Typeset', MathJax.Hub]));
        },
    },
};
</script>

<style scoped lang="scss">
@import '@/style/global';

.math-placeholder {
    color: $dark-gray;
    cursor: pointer;
}
.math-display {
    outline: none;
}
.math-placeholder:hover,
.math-display:hover {
    background: rgba(0, 0, 0, 0.07);
    cursor: pointer;
}
.math-editor {
    width: 500px;
    height: 300px;
    z-index: 3;
    position: fixed;
    left: calc(50% - 240px);
    top: calc(50% - 140px);
    background: white;
    outline: none;
    box-shadow: 0 0 15px 15px rgba(0.4, 0.4, 0.4, 0.4);
    padding: 10px;
    font-family: $geometric-font;
    color: $half-gray;
}
::placeholder {
    color: $dark-gray;
}
.math-editor:focus {
    display: block;
}
</style>
