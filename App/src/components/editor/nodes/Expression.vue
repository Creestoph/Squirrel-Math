<template>
    <node-view-wrapper>
        <div>
            <div v-show="!mathJax" class="math-placeholder" @click="edit()">Wprowadź wyrażenie matematyczne</div>
            <div v-show="mathJax" ref="output" class="math-display" @click="edit()"></div>
            <textarea
                v-if="displayPopup"
                v-model="mathJaxDirty"
                @paste.stop
                ref="mathEditor"
                class="math-editor"
                placeholder="Wprowadź kod MathJax"
                @blur="applyEdit()"
                @keydown.esc="applyEdit()"
            ></textarea>
        </div>
    </node-view-wrapper>
</template>

<script>
import Vue from 'vue';
import { NodeViewWrapper } from '@tiptap/vue-2';

export default Vue.extend({
    components: {
        NodeViewWrapper,
    },
    computed: {
        mathJax: {
            get() {
                return this.node.attrs.mathJax;
            },
            set(mathJax) {
                this.updateAttributes({ mathJax });
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
        },
        updateView() {
            this.displayPopup = false;
            this.$refs.output.innerHTML = '$$' + this.mathJax + '$$';
            this.$nextTick(() => MathJax.Hub.Queue(['Typeset', MathJax.Hub]));
        },
    },
});
</script>

<style scoped lang="scss">
@use '@/style/global';
@use '@/style/colors';
@use '@/style/fonts';

.math-placeholder {
    min-height: 27px;
    line-height: 27px;
    text-align: center;
    color: colors.$dark-gray;
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
    font-family: fonts.$geometric-font;
    color: colors.$half-gray;
}
::placeholder {
    color: colors.$dark-gray;
}
.math-editor:focus {
    display: block;
}
</style>
