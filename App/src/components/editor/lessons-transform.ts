import { LessonData, NodeData } from '@/models/lesson';
import { downloadFile } from '../utils/files';
import { idGenerator } from './nodes/Canvas/Shape';

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
    import(`@/assets/current-lesson-graph.json`).then((file) => {
        const titles = [...file.default.map((lesson) => lesson.title), 'Demo'];
        titles.forEach(async (title, i) => {
            const lesson = (await import(`@/assets/lessons/${title}.json`)).default as LessonData;
            lesson.short?.content?.forEach((node) => transformNodeAndChildren(node));
            lesson.long?.content?.forEach((node) => transformNodeAndChildren(node));
            setTimeout(() => downloadFile(JSON.stringify(lesson), title, 'application/json'), i * 500);
        });
    });
}
