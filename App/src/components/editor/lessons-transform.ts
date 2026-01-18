import { LessonData, NodeData } from '@/models/lesson';
import { downloadFile } from '../../utils/files';
import { lessonTree } from '@/utils/lesson-tree';

function transformNode(node: NodeData) {
    const attrs = node.attrs!;
    if (node.type === 'component' && attrs.componentName === 'other') {
        attrs.componentName = attrs.args[0];
        attrs.args = [];
    } else if (node.type === 'component' && attrs.componentName === 'operation-table') {
        let temp = attrs.args[0];
        attrs.args[0] = attrs.args[2];
        attrs.args[2] = temp;
        temp = attrs.args[1];
        attrs.args[1] = attrs.args[3];
        attrs.args[3] = temp;
    } else if (node.type === 'component' && attrs.componentName === 'columnar-operation-table') {
        const operation = attrs.args[0];
        const numbers = attrs.args[1].map((f: any) => eval(f)) as string[][];

        let nodes: string[][] = [];

        if (operation === '+') {
            for (let i = 0; i < numbers.length; i++) {
                if (i === 0) {
                    nodes[i] = ['/c:', '/c:', ...numbers[i].map((n) => (n[0] === '/' ? `/c${n}` : `/c:${n}`))];
                } else if (i == numbers.length - 2) {
                    nodes[i] = ['/u:+', '/u:', ...numbers[i].map((n) => (n[0] === '/' ? `/u${n}` : `/u:${n}`))];
                } else {
                    nodes[i] = ['', '', ...numbers[i]];
                }
            }
        } else if (operation === '-') {
            for (let i = 0; i < numbers.length; i++) {
                if (i === 0 || i === 1) {
                    nodes[i] = ['/c:', '/c:', ...numbers[i].map((n) => (n[0] === '/' ? `/c${n}` : `/c:${n}`))];
                } else if (i == numbers.length - 2) {
                    nodes[i] = ['/u:-', '/u:', ...numbers[i].map((n) => (n[0] === '/' ? `/u${n}` : `/u:${n}`))];
                } else {
                    nodes[i] = ['', '', ...numbers[i]];
                }
            }
        } else {
            nodes = numbers;
        }

        nodes = nodes.map((row) =>
            row.map((r) => {
                if (r[0] === '/') {
                    const [styles, value] = r.split(':');
                    return styles.replaceAll('/', '') + '/' + value;
                }
                return r;
            }),
        );

        const maxSize = Math.max(...nodes.map((n) => n.length));
        nodes.forEach((n) =>
            Array(maxSize - n.length)
                .fill(0)
                .forEach(() => n.push('')),
        );

        attrs.args = [nodes.map((n) => n.join(';'))];
    }
}

function transformNodeAndChildren(node: NodeData) {
    transformNode(node);
    if (node.content) {
        node.content.forEach((child) => transformNodeAndChildren(child));
    }
}

export function transformAll() {
    [...lessonTree.allLessonNames(), 'Demo'].forEach(async (title, i) => {
        const lesson = (await import(`@/assets/lessons/${title}.json`)).default as LessonData;
        lesson.short?.content?.forEach((node) => transformNodeAndChildren(node));
        lesson.long?.content?.forEach((node) => transformNodeAndChildren(node));
        setTimeout(() => downloadFile(JSON.stringify(lesson), title, 'application/json'), i * 500);
    });
}
