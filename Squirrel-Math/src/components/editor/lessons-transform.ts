import { downloadFile } from "../utils/files";

export type NodeType = 'title' | 'intro' | 'chapter' | 'semantic_tag' | 'paragraph' | 'text' | 'bullet_list' | 'ordered_list' | 'list_item' | 'hard_break' |
    'example' | 'proof' | 'problem' | 'formula' | 'expression' | 'expressionInline' | 'image' | 'component' | 'custom_element' |
    'table' | 'table_row' | 'table_header' | 'table_cell' | 
    'geometry' | 'line' | 'circle' | 'rectangle' | 'polygon' | 'arc' | 'text_area';

export type MarkType = 'bold' | 'italic' | 'strike' | 'underline' | 'link' | 'textAlign' | 'comment';

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
    if (node.type == 'geometry' && node.attrs!.shapes) {
        const shapes = node.attrs!.shapes;
        if (shapes.length > 0 && !node.content)
            node.content = [];
        shapes.forEach((shape: any) => {
            const figureType = shape.type;
            delete shape.type;
            node.content!.push({ type: figureType, attrs: shape });
        });
        delete node.attrs!.shapes;
    }
}

function transformNodeAndChildren(node: NodeData) {
    transformNode(node);
    if (node.content)
        node.content.forEach(child => transformNodeAndChildren(child));
}

export function transformAll() {
    import(`@/assets/current_lesson_graph.json`).then(file => {
        const lessons = file.default;
        lessons.forEach(async (lessonSpecification, i) => {
            const lesson = await import(`@/assets/lessons/${lessonSpecification.title}.json`) as LessonData;
            if (lesson.short)
                lesson.short.content.forEach(node => transformNodeAndChildren(node));
            if (lesson.long)
                lesson.long.content.forEach(node => transformNodeAndChildren(node));
            setTimeout(() => {
                downloadFile(JSON.stringify(lesson), lessonSpecification.title, 'application/json');
            }, i*500);
            
        })
    });
}
