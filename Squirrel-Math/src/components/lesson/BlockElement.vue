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
        :style="{ color: attrs.color }"
    >
        <template v-if="text">{{(marks && marks.some(m => m.type == 'number')) ? '$' + text + '$' : text}}</template>
        <block-element v-for="(block, i) in children" :key="i" :content="block"></block-element>
    </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';
import Graphics from "./Graphics.vue";
import DefaultTable from "./DefaultTable.vue";
import TableCell from "./TableCell.vue";
import TableHeader from "./TableHeader.vue";
import SemanticTag from './SemanticTag.vue';
import Proof from "./Proof.vue";
import Example from "./Example.vue";
import Formula from "./Formula.vue";
import Problem from "./Problem.vue";
import Expression from "./Expression.vue";
import ExpressionInline from "./ExpressionInline.vue";
import Geometry from "./geometry/Geometry.vue";
import GeometryRectangle from "./geometry/Rectangle.vue";
import GeometryTriangle from "./geometry/Triangle.vue";
import GeometryCircle from "./geometry/Circle.vue";
import GeometryLine from "./geometry/Line.vue";
import GeometryTextArea from "./geometry/TextArea.vue";
import LessonLink from "./Link.vue";
import BuiltInComponent from "./BuiltInComponent.vue";
import CustomComponent from "./CustomComponent.vue";
import Paragraph from "./Paragraph.vue";
import { MarkData, NodeData, NodeType } from '../editor/lessons-transform';

@Component({
    components: {
        Paragraph,
        Graphics,
        DefaultTable,
        TableCell,
        TableHeader,
        LessonLink,
        SemanticTag,
        Proof,
        Example,
        Formula,
        Problem,
        Expression,
        ExpressionInline,
        Geometry,
        GeometryRectangle,
        GeometryTriangle,
        GeometryCircle,
        GeometryLine,
        GeometryTextArea,
        BuiltInComponent,
        CustomComponent
    },
    name: 'block-element'
})
export default class BlockElement extends Vue { 
    @Prop() content!: NodeData;
    type!: NodeType;
    marks?: MarkData[] = [];
    text? = "";
    children: NodeData[] = [];
    attrs:  { [name: string]: any } = {};

    mounted() {
        this.type = this.content.type;
        this.marks = this.content.marks;
        this.text = this.content.text;
        this.children = this.content.content || [];
        if (this.marks && this.marks.some(m => m.type == 'comment')) {
            this.children = [this.content];
            this.text = '';
            if (this.children[0].marks)
                this.children[0].marks = this.children[0].marks.filter(m => m.type != 'comment');
        }
        else {
            if (this.type == 'paragraph') {
                if (!this.children.length || this.children && this.children[this.children.length - 1].type == 'hard_break')
                    this.children.push({ type: 'hard_break' });
            }
            if (this.type == 'custom_element') {
                this.attrs = { code: this.content.content![0].text };
            }
            else if (this.type == 'table') {
                this.attrs = { columnWidths: this.children[0].content!.map(c => c.attrs!.colwidth) };
            }
            else {
                this.attrs = this.content.attrs || {};
            }
        }
        if (this.marks)
            this.marks.filter(m => m.attrs).forEach(m => Object.assign(this.attrs, m.attrs));
    }

    get tagName() {
        if (this.marks && this.marks.some(m => m.type == 'comment'))
            return 'comment';
        if (this.marks && this.marks.some(m => m.type == 'link'))
            return 'lesson-link';
        const typeToTag: { [type in NodeType]?: string } = {
            paragraph: 'paragraph',
            hard_break: 'br',
            bullet_list: 'ul',
            ordered_list: 'ol',
            list_item: 'li',
            image: 'graphics',
            table: 'default-table',
            table_row: 'tr',
            table_header: 'table-header',
            table_cell: 'table-cell',
            semantic_tag: 'semantic-tag',
            proof: 'proof',
            example: 'example',
            formula: 'formula',
            expression: 'expression',
            expressionInline: 'expression-inline',
            geometry: 'geometry',
            rectangle: 'geometry-rectangle',
            triangle: 'geometry-triangle',
            circle: 'geometry-circle',
            line: 'geometry-line',
            text_area: 'geometry-text-area',
            component: 'built-in-component',
            custom_element: 'custom-component',
            problem: 'problem',
        };
        return typeToTag[this.type] || 'div';
    }  
}
</script>

<style scoped lang="scss">
.inline {
    display: inline;
    white-space: pre-wrap;
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
