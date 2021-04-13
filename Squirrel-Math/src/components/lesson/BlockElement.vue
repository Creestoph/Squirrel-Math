<template>
    <div 
        :is="tagName"
        :class="{ 
            'bold': marks && marks.some(m => m.type == 'bold'), 
            'italic': marks && marks.some(m => m.type == 'italic'),
            'underline': marks && marks.some(m => m.type == 'underline'),
            'strike': marks && marks.some(m => m.type == 'strike'),
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
import DefaultTable from "./DefaultTable.vue";
import TableCell from "./TableCell.vue";
import TableHeader from "./TableHeader.vue";
import SemanticTag from './SemanticTag.vue';
import Proof from "./Proof.vue";
import Example from "./Example.vue";
import Formula from "./Formula.vue";
import Expression from "./Expression.vue";
import Geometry from "./geometry/Geometry.vue";
import BuiltInComponent from "./BuiltInComponent.vue";
import CustomComponent from "./CustomComponent.vue";

@Component({
    components: {
        DefaultTable,
        TableCell,
        TableHeader,
        SemanticTag,
        Proof,
        Example,
        Formula,
        Expression,
        Geometry,
        BuiltInComponent,
        CustomComponent
    }
})
export default class BlockElement extends Vue { 
    @Prop() content?: any;
    type = "";
    marks = [];
    text = "";
    children = [];
    attrs: any = {};

    mounted() {
        this.type = this.content.type;
        this.marks = this.content.marks;
        this.text = this.content.text;
        if (this.type == 'custom_element') {
            this.attrs = { code: this.content.content[0].text };
        }
        else 
            this.attrs = this.content.attrs;
        this.children = this.content.content;
    }

    private typeToTag: {[type: string]: string} = {
        paragraph: 'p',
        bullet_list: 'ul',
        ordered_list: 'ol',
        list_item: 'li',
        table: 'default-table',
        table_row: 'tr',
        table_header: 'table-header',
        table_cell: 'table-cell',
        semantic_tag: 'semantic-tag',
        proof: 'proof',
        example: 'example',
        formula: 'formula',
        expression: 'expression',
        geometry: 'geometry',
        component: 'built-in-component',
        custom_element: 'custom-component',
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
.underline {
    text-decoration: underline;
}
.strike {
    text-decoration: line-through;
}
</style>
