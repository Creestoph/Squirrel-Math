import { ResolvedPos } from '@tiptap/pm/model';

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
