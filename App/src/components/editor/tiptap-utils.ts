import { ResolvedPos } from '@tiptap/pm/model';
import { Editor } from '@tiptap/core';
import { EditorView } from '@tiptap/pm/view';

export function getSurroundingWord($pos: ResolvedPos): { from: number; to: number } | null {
    const parentText = $pos.parent.textBetween(0, $pos.parent.content.size, undefined, '\ufffc');

    if (!parentText) {
        return null;
    }

    const offset = $pos.parentOffset;

    const isWordChar = (ch: string) => /\w/.test(ch);

    let startOffset = offset;
    while (startOffset > 0 && isWordChar(parentText[startOffset - 1])) {
        startOffset--;
    }

    let endOffset = offset;
    while (endOffset < parentText.length && isWordChar(parentText[endOffset])) {
        endOffset++;
    }

    if (startOffset === endOffset) {
        return null;
    }

    return { from: $pos.start() + startOffset, to: $pos.start() + endOffset };
}

export function getLessonTitle(editor: Editor): string | null {
    return editor.state.doc?.content?.content?.[0]?.content?.content?.[0]?.text || null;
}

export function generateGUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

export function dropNewlines(event: ClipboardEvent, view: EditorView): boolean {
    const text = event.clipboardData?.getData('text/plain') ?? event.clipboardData?.getData('text') ?? '';
    const cleaned = text.replace(/\r\n/g, '\n').replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();
    event.preventDefault();
    view.dispatch(view.state.tr.insertText(cleaned));
    return true;
}
