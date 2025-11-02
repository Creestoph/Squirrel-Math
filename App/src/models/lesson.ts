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

export interface LessonVersionData {
    content: NodeData[];
}

export interface ImageData {
    src: string;
    name: string;
}

export interface LessonData {
    long?: LessonVersionData;
    short?: LessonVersionData;
    comments?: { [id: string]: { text: string; hidden: boolean } };
    images?: { [key: string]: ImageData };
}
