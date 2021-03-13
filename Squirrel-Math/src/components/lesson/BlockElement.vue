<template>
    <div 
        :is="tagName"
        :class="{ 
            'bold': marks && marks.some(m => m.type == 'bold'), 
            'italic': marks && marks.some(m => m.type == 'italic'),
            'inline': text,
        }"
        :attrs="attrs"
    >
        <template v-if="text">{{(marks && marks.some(m => m.type == 'number')) ? '$' + text + '$' : text}}</template>
        <block-element v-for="(block, i) in children" :key="i" :content="block"></block-element>
    </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';
import TableCell from "./TableCell.vue";
import TableHeader from "./TableHeader.vue";
import Proof from "./Proof.vue";
import Example from "./Example.vue";
import Formula from "./Formula.vue";
import SemanticTag from './SemanticTag.vue';

@Component({
    components: {
        TableCell,
        TableHeader,
        Proof,
        Example,
        Formula,
        SemanticTag
    }
})
export default class BlockElement extends Vue { 
    @Prop() content?: any;
    type = "";
    marks = [];
    text = "";
    children = [];
    attrs = {};

    constructor() {
        super();
    }

    mounted() {
        this.type = this.content.type;
        this.marks = this.content.marks;
        this.text = this.content.text;
        this.attrs = this.content.attrs;
        this.children = this.content.content;
    }

    private typeToTag: {[type: string]: string} = {
        paragraph: 'p',
        bullet_list: 'ul',
        ordered_list: 'ol',
        list_item: 'li',
        table: 'table',
        table_row: 'tr',
        table_header: 'table-header',
        table_cell: 'table-cell',
        semantic_tag: 'semantic-tag',
        proof: 'proof',
        exampple: 'example',
        formula: 'formula'
    }

    get tagName() {
        return this.typeToTag[this.type] || 'div';
    }
  
}
</script>

<style scoped lang="scss">
.inline {
    display: inline;
}
.bold {
    font-weight: bold;
}
.italic {
    font-style: italic;
}
</style>
