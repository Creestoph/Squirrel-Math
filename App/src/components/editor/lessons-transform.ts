import { downloadFile } from '../utils/files';
import { idGenerator } from './nodes/Canvas/Shape';

export type NodeType =
    | 'title'
    | 'intro'
    | 'chapter'
    | 'semanticTag'
    | 'paragraph'
    | 'text'
    | 'bulletList'
    | 'orderedList'
    | 'listItem'
    | 'hardBreak'
    | 'example'
    | 'proof'
    | 'problem'
    | 'formula'
    | 'expression'
    | 'expressionInline'
    | 'image'
    | 'component'
    | 'customElement'
    | 'table'
    | 'tableRow'
    | 'tableCell'
    | 'geometry'
    | 'line'
    | 'circle'
    | 'rectangle'
    | 'polygon'
    | 'arc'
    | 'textArea';

export type MarkType = 'bold' | 'italic' | 'strike' | 'underline' | 'link' | 'textAlign' | 'comment' | 'number';

export interface MarkData {
    type: MarkType;
    attrs?: { [key: string]: any };
}

export interface NodeData {
    type: NodeType;
    attrs?: { [key: string]: any };
    content?: NodeData[];
    marks?: MarkData[];
    text?: string;
}

interface LessonVersionData {
    content: NodeData[];
}

export interface LessonData {
    long?: LessonVersionData;
    short?: LessonVersionData;
}

function transformNode(node: NodeData) {
    if (
        ['line', 'circle', 'rectangle', 'polygon', 'arc', 'textArea'].includes(node.type) &&
        node.attrs!.id === undefined
    ) {
        node.attrs!.id = idGenerator.next().value;
    }
}

function transformNodeAndChildren(node: NodeData) {
    transformNode(node);
    if (node.content) {
        node.content.forEach((child) => transformNodeAndChildren(child));
    }
}

export function transformAll() {
    import(`@/assets/current_lesson_graph.json`).then((file) => {
        const titles = [...file.default.map((lesson) => lesson.title), 'Demo'];
        titles.forEach(async (title, i) => {
            const lesson = (await import(`@/assets/lessons/${title}.json`)).default as LessonData;
            lesson.short?.content?.forEach((node) => transformNodeAndChildren(node));
            lesson.long?.content?.forEach((node) => transformNodeAndChildren(node));
            setTimeout(() => downloadFile(JSON.stringify(lesson), title, 'application/json'), i * 500);
        });
    });
}
