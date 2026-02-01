<template>
    <component
        :is="tagName"
        :class="{
            bold: marks && marks.some((m) => m.type == 'bold'),
            italic: marks && marks.some((m) => m.type == 'italic'),
            underline: marks && marks.some((m) => m.type == 'underline'),
            strike: marks && marks.some((m) => m.type == 'strike'),
            inline: text,
        }"
        :attrs="attrs"
        :style="{ color: attrs.color }"
    >
        <template v-if="text">
            {{ marks?.some((m) => m.type == 'number') ? '$' + text.replaceAll('%', '\\%') + '$' : text }}
        </template>
        <block-element v-for="(block, i) in children" :key="i" :content="block"></block-element>
    </component>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import type { Component } from 'vue';
import Image from './Image.vue';
import DefaultTable from './DefaultTable.vue';
import TableCell from './TableCell.vue';
import SemanticTag from './SemanticTag.vue';
import Proof from './Proof.vue';
import Example from './Example.vue';
import Formula from './Formula.vue';
import Problem from './Problem.vue';
import Expression from './Expression.vue';
import ExpressionInline from './ExpressionInline.vue';
import Geometry from './geometry/Geometry.vue';
import GeometryRectangle from './geometry/GeometryRectangle.vue';
import GeometryPolygon from './geometry/GeometryPolygon.vue';
import GeometryCircle from './geometry/GeometryCircle.vue';
import GeometryLine from './geometry/GeometryLine.vue';
import GeometryArc from './geometry/GeometryArc.vue';
import GeometryTextArea from './geometry/GeometryTextArea.vue';
import LessonLink from './Link.vue';
import BuiltInComponent from './BuiltInComponent.vue';
import CustomComponent from './CustomComponent.vue';
import Paragraph from './Paragraph.vue';
import { MarkData, NodeData, NodeType } from '../../models/lesson';

const props = defineProps<{ content: NodeData }>();
let type: NodeType;
const marks = ref<MarkData[] | undefined>([]);
const text = ref<string | undefined>('');
const children = ref<NodeData[]>([]);
const attrs = ref<{ [name: string]: any }>({});

const tagName = computed<string | Component>(() => {
    if (marks.value && marks.value.some((m) => m.type == 'comment')) {
        return 'comment';
    }
    if (marks.value && marks.value.some((m) => m.type == 'link')) {
        return LessonLink;
    }
    const typeToTag: Partial<{ [type in NodeType]: string | Component }> = {
        hardBreak: 'br',
        bulletList: 'ul',
        orderedList: 'ol',
        listItem: 'li',
        tableRow: 'tr',
        paragraph: Paragraph,
        image: Image,
        table: DefaultTable,
        tableCell: TableCell,
        semanticTag: SemanticTag,
        proof: Proof,
        example: Example,
        formula: Formula,
        expression: Expression,
        expressionInline: ExpressionInline,
        geometry: Geometry,
        rectangle: GeometryRectangle,
        polygon: GeometryPolygon,
        circle: GeometryCircle,
        line: GeometryLine,
        arc: GeometryArc,
        textArea: GeometryTextArea,
        component: BuiltInComponent,
        customElement: CustomComponent,
        problem: Problem,
    };
    return typeToTag[type] || 'div';
});

onMounted(() => {
    type = props.content.type;
    marks.value = props.content.marks;
    text.value = props.content.text;
    children.value = props.content.content || [];
    if (marks.value && marks.value.some((m) => m.type == 'comment')) {
        children.value = [props.content];
        text.value = '';
        if (children.value[0].marks) {
            children.value[0].marks = children.value[0].marks.filter((m) => m.type != 'comment');
        }
    } else if (type == 'customElement') {
        attrs.value = { code: props.content.content![0].text };
    } else if (type == 'table') {
        attrs.value = {
            columnWidths: children.value[0].content!.map((c) => c.attrs!.colwidth && c.attrs!.colwidth[0]),
        };
    } else {
        if (type == 'paragraph' && (!children.value.length || children.value.at(-1)?.type == 'hardBreak')) {
            children.value.push({ type: 'hardBreak' });
        }
        attrs.value = props.content.attrs || {};
    }
    if (marks.value) {
        marks.value.filter((m) => m.attrs).forEach((m) => Object.assign(attrs.value, m.attrs));
    }
});
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
